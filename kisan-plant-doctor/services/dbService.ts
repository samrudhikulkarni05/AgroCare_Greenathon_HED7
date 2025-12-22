import { User, ChatMessage, FarmerReport } from '../types';

let dbInstance: any = null;
let dbPromise: Promise<any> | null = null;

// --- INDEXED DB STORAGE ADAPTER (For handling large SQLite files) ---
const IDB_NAME = 'KisanPlantDoctorDB';
const IDB_STORE = 'sqlite_file_store';
const IDB_KEY = 'kisan.sqlite';

const getIDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    request.onsuccess = (event: any) => resolve(event.target.result);
    request.onerror = (event: any) => reject(event.target.error);
  });
};

const saveToIDB = async (data: Uint8Array) => {
  const db = await getIDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    const request = store.put(data, IDB_KEY);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const loadFromIDB = async (): Promise<Uint8Array | null> => {
  const db = await getIDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const request = store.get(IDB_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

// --- SQLITE INITIALIZATION ---

export const initDB = async () => {
  if (dbInstance) return dbInstance;
  
  if (!dbPromise) {
    dbPromise = new Promise(async (resolve, reject) => {
      // @ts-ignore
      if (!window.initSqlJs) {
        reject("SQLite library not loaded. Check internet connection.");
        return;
      }
      
      try {
        // @ts-ignore
        const SQL = await window.initSqlJs({
          locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const savedData = await loadFromIDB();
        let db;
        
        if (savedData) {
          try {
            db = new SQL.Database(savedData);
          } catch (e) {
            console.error("DB Corrupt, creating new:", e);
            db = new SQL.Database();
          }
        } else {
          db = new SQL.Database();
        }
        
        // 1. Create Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE,
          pin TEXT,
          name TEXT,
          last_active INTEGER
        )`);
        
        // 2. Create History Table
        db.run(`CREATE TABLE IF NOT EXISTS history (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          message_json TEXT,
          timestamp INTEGER,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // 3. Create Reports Table
        db.run(`CREATE TABLE IF NOT EXISTS reports (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          crop TEXT,
          disease_name TEXT,
          report_json TEXT,
          timestamp INTEGER,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // 4. Pre-seed Admin User (Ensures sakshiadmin exists on app load)
        const adminCheck = db.exec("SELECT id FROM users WHERE username='sakshiadmin'");
        if (adminCheck.length === 0) {
            console.log("Creating default admin account...");
            db.run("INSERT INTO users (id, username, pin, name, last_active) VALUES (:id, :username, :pin, :name, :last)", {
              ':id': 'admin-seed',
              ':username': 'sakshiadmin',
              ':pin': '12345',
              ':name': 'Sakshi Admin',
              ':last': Date.now()
            });
            // We need to persist this change to IDB immediately
            const data = db.export();
            await saveToIDB(data);
        }
        
        dbInstance = db;
        resolve(db);
      } catch (err) {
        reject(err);
      }
    });
  }
  
  return dbPromise;
};

const persistDB = async () => {
  try {
    const db = await initDB();
    const data = db.export();
    await saveToIDB(data);
    console.log("💾 Database persisted to IndexedDB.");
  } catch (e) {
    console.error("❌ Failed to persist database:", e);
  }
};

// --- AUTHENTICATION ---

export const getLastActiveUser = async (): Promise<User | null> => {
  try {
    const db = await initDB();
    // Get the most recently active user
    const stmt = db.prepare("SELECT * FROM users ORDER BY last_active DESC LIMIT 1");
    if (stmt.step()) {
      const result = stmt.getAsObject();
      stmt.free();
      return { id: result.id, username: result.username, name: result.name };
    }
    stmt.free();
    return null;
  } catch (e) {
    return null;
  }
};

export const registerUser = async (username: string, pin: string, name: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const db = await initDB();
    
    // Security Restriction for Admin: Prevent overwriting admin via register
    if (username === 'sakshiadmin') {
      return { success: false, message: "Admin account is reserved. Please Log In." };
    }
    
    const stmt = db.prepare("SELECT count(*) as count FROM users WHERE username = :username");
    const result = stmt.getAsObject({':username': username});
    stmt.free();
    
    if (result.count > 0) {
      return { success: false, message: "Username/Mobile already exists." };
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      name
    };

    db.run("INSERT INTO users (id, username, pin, name, last_active) VALUES (:id, :username, :pin, :name, :last)", {
      ':id': newUser.id,
      ':username': username,
      ':pin': pin,
      ':name': name,
      ':last': Date.now()
    });
    
    await persistDB();
    
    return { success: true, message: "Registration successful!", user: newUser };
  } catch (e) {
    console.error("SQLite Error:", e);
    return { success: false, message: "Database Error: Could not register." };
  }
};

export const loginUser = async (username: string, pin: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    const db = await initDB();
    
    const stmt = db.prepare("SELECT * FROM users WHERE username = :username AND pin = :pin");
    const result = stmt.getAsObject({':username': username, ':pin': pin});
    stmt.free();

    if (result && result.id) {
      // Update last active
      db.run("UPDATE users SET last_active = :last WHERE id = :id", {
        ':last': Date.now(),
        ':id': result.id
      });
      await persistDB();

      return {
        success: true,
        message: "Login successful!",
        user: { id: result.id, username: result.username, name: result.name }
      };
    }
    return { success: false, message: "Invalid Mobile Number or PIN." };
  } catch (e) {
    console.error("SQLite Error:", e);
    return { success: false, message: "Login failed due to system error." };
  }
};

export const getAllUsers = async (): Promise<any[]> => {
  try {
    const db = await initDB();
    const stmt = db.prepare("SELECT * FROM users ORDER BY last_active DESC");
    const users = [];
    while(stmt.step()) {
      users.push(stmt.getAsObject());
    }
    stmt.free();
    return users;
  } catch(e) {
    console.error("Failed to fetch all users", e);
    return [];
  }
};

// --- CHAT HISTORY ---

export const saveUserHistory = async (userId: string, messages: ChatMessage[]) => {
  try {
    const db = await initDB();
    db.run("BEGIN TRANSACTION");
    // Simple approach: clear old history for this user and rewrite (efficient enough for local SQLite)
    db.run("DELETE FROM history WHERE user_id = :uid", {':uid': userId});
    
    const stmt = db.prepare("INSERT INTO history (id, user_id, message_json, timestamp) VALUES (:id, :uid, :json, :ts)");
    messages.forEach(msg => {
      stmt.run({
        ':id': msg.id,
        ':uid': userId,
        ':json': JSON.stringify(msg),
        ':ts': msg.timestamp.getTime()
      });
    });
    stmt.free();
    db.run("COMMIT");
    await persistDB();
  } catch (e) {
    console.error("Failed to save history:", e);
    try { dbInstance.run("ROLLBACK"); } catch {}
  }
};

export const loadUserHistory = async (userId: string): Promise<ChatMessage[]> => {
  try {
    const db = await initDB();
    const stmt = db.prepare("SELECT message_json FROM history WHERE user_id = :uid ORDER BY timestamp ASC", {':uid': userId});
    const messages: ChatMessage[] = [];
    while(stmt.step()) {
      const row = stmt.getAsObject();
      const msg = JSON.parse(row.message_json);
      msg.timestamp = new Date(msg.timestamp);
      messages.push(msg);
    }
    stmt.free();
    return messages;
  } catch (e) {
    return [];
  }
};

// --- REPORTS ---

export const saveReport = async (userId: string, report: FarmerReport) => {
  try {
    const db = await initDB();
    db.run("INSERT OR REPLACE INTO reports (id, user_id, crop, disease_name, report_json, timestamp) VALUES (:id, :uid, :crop, :disease, :json, :ts)", {
      ':id': report.id,
      ':uid': userId,
      ':crop': report.crop,
      ':disease': report.diagnosis.disease_name,
      ':json': JSON.stringify(report),
      ':ts': new Date(report.timestamp).getTime()
    });
    await persistDB();
    console.log(`✅ Report saved for user ${userId}: ${report.diagnosis.disease_name}`);
  } catch (e) {
    console.error("Failed to save report:", e);
  }
};

export const getUserReports = async (userId: string): Promise<FarmerReport[]> => {
  try {
    const db = await initDB();
    const stmt = db.prepare("SELECT report_json FROM reports WHERE user_id = :uid ORDER BY timestamp DESC", {':uid': userId});
    const reports: FarmerReport[] = [];
    while(stmt.step()) {
      const row = stmt.getAsObject();
      const rep = JSON.parse(row.report_json);
      reports.push(rep);
    }
    stmt.free();
    return reports;
  } catch (e) {
    console.error("Failed to load reports:", e);
    return [];
  }
};

// --- ADMIN FEATURES ---

export const downloadDatabase = async () => {
  try {
    const db = await initDB();
    const binaryArray = db.export();
    
    // Create a blob from the binary data
    const blob = new Blob([binaryArray], { type: 'application/x-sqlite3' });
    
    // Create temporary link and click it
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `kisan_plant_doctor_backup_${new Date().toISOString().split('T')[0]}.sqlite`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    console.log("✅ Database downloaded successfully");
  } catch (e) {
    console.error("Failed to download database:", e);
    alert("Error downloading database");
  }
};