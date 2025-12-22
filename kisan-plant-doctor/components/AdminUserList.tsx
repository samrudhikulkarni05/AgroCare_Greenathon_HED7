import React, { useEffect, useState } from 'react';
import { getAllUsers, downloadDatabase } from '../services/dbService';
import { ArrowLeft, User, Phone, ShieldCheck, Database, Download } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const AdminUserList: React.FC<Props> = ({ onBack }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="pb-8 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-slate-50 z-10 py-4 border-b border-slate-200 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Admin Panel</h2>
            <p className="text-xs text-slate-500 font-bold flex items-center gap-1">
              <Database size={12} /> Local SQLite Database
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => downloadDatabase()}
          className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg hover:bg-emerald-800 transition-all active:scale-95"
        >
          <Download size={14} />
          DOWNLOAD DB
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 text-white p-6">
          <h3 className="text-lg font-black flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> Registered Farmers
          </h3>
          <p className="text-slate-400 text-sm">Total Count: {users.length}</p>
        </div>

        {loading ? (
           <div className="p-8 text-center text-slate-500">Loading database...</div>
        ) : users.length === 0 ? (
           <div className="p-12 text-center text-slate-400 font-bold">No farmers registered yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {users.map(u => (
              <div key={u.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      <User size={18} className="text-emerald-600" /> 
                      {u.name}
                    </h4>
                    <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-2">
                      <Phone size={14} /> {u.username}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-xs font-black inline-block mb-2">
                      PIN: {u.pin}
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Active: {new Date(u.last_active).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;