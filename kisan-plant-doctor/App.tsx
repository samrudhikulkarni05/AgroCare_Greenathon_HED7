
import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LanguageSelector from './components/LanguageSelector';
import AuthModal from './components/AuthModal';
import WeatherView from './components/WeatherView';
import HistoryView from './components/HistoryView';
import ReportCard from './components/ReportCard';
import AdminUserList from './components/AdminUserList';
import DocsView from './components/DocsView';
import { AppView, User, ChatMessage as ChatMessageType, BotResponse, FarmerReport } from './types';
import { sendChatMessage } from './services/geminiService';
import { saveUserHistory, loadUserHistory, saveReport, initDB } from './services/dbService';
import { Leaf, Sparkles, Smile, Sprout } from 'lucide-react';

const APP_LANG_KEY = 'kisan_app_language';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string | null>(() => localStorage.getItem(APP_LANG_KEY));
  const [view, setView] = useState<AppView | 'LANDING' | 'LANGUAGE_SELECT'>('LANDING');
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("Analyzing...");
  const [activeReport, setActiveReport] = useState<FarmerReport | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setupApp = async () => {
      await initDB();
    };
    setupApp();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, view]);

  useEffect(() => {
    if (user) {
      loadUserHistory(user.id).then(h => setMessages(h));
    } else {
      setMessages([]);
    }
  }, [user]);

  const handleSend = async (text: string, image: string | null, audio: string | null) => {
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: { text, imageUri: image || undefined, audioUri: audio || undefined },
      timestamp: new Date()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    if (image) {
      setStatusMessage("Kisan Doctor is scanning the leaf...");
    } else {
      setStatusMessage("Kisan Doctor is thinking...");
    }

    try {
      const response = await sendChatMessage(newMessages, image, audio, text, language || 'English');

      const botMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: { text: response.text_response, botResponse: response },
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, botMsg];
      setMessages(finalMessages);
      
      if (user) {
        saveUserHistory(user.id, finalMessages);
      }

      if (response.type === 'DIAGNOSIS' && response.diagnosis_data) {
        const report: FarmerReport = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          crop: response.diagnosis_data.crop_detected,
          symptoms: text || "Image Scan",
          diagnosis: response.diagnosis_data,
          imageUri: image || undefined
        };
        
        if (user) {
          saveReport(user.id, report);
        }
        
        setTimeout(() => {
          setActiveReport(report);
          setView(AppView.REPORT);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      language ? setView(AppView.CHAT) : setView('LANGUAGE_SELECT');
    }
  };

  const renderViewContent = () => {
    if (view === 'LANDING') return (
      <LandingPage 
        onStart={handleStart} 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user} 
      />
    );
    
    if (view === 'LANGUAGE_SELECT') return (
      <LanguageSelector onSelect={l => { setLanguage(l); localStorage.setItem(APP_LANG_KEY, l); setView(AppView.CHAT); }} />
    );

    return (
      <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} onLogoClick={() => setView('LANDING')} />
        <main className="flex-1 overflow-hidden flex flex-col relative">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:px-8 max-w-4xl mx-auto w-full no-scrollbar">
            {view === AppView.CHAT && (
              <div className="space-y-6 pb-24">
                {messages.length === 0 && (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="bg-emerald-600 w-24 h-24 rounded-[3rem] flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                       <div className="absolute inset-0 bg-white opacity-10 rounded-[3rem]"></div>
                       <Smile className="text-white" size={48} />
                    </div>
                    <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter">
                      Namaste, {user?.name || 'Farmer'}!
                    </h3>
                    <p className="text-slate-500 font-bold max-w-xs mx-auto text-sm leading-relaxed mb-8">
                      I am your Kisan Plant Doctor. Send me a photo of your plant or just type your question to get started.
                    </p>
                    {!user && (
                      <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="bg-emerald-100 text-emerald-800 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-200 transition-all mb-8"
                      >
                        Login to Save Progress
                      </button>
                    )}
                    <div className="flex items-center justify-center gap-3">
                       <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                          <Sprout size={16} className="text-emerald-600" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Expert Care for Your Crops</span>
                       </div>
                    </div>
                  </div>
                )}
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} onViewReport={(d, img) => { setActiveReport({ id: 'v-'+Date.now(), timestamp: new Date().toISOString(), crop: d.crop_detected, symptoms: 'Manual View', diagnosis: d, imageUri: img }); setView(AppView.REPORT); }} />)}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-[#064e3b] rounded-[2rem] rounded-tl-none px-6 py-4 shadow-xl border border-white/10 flex items-center gap-4">
                      <div className="relative w-3 h-3">
                         <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-30"></div>
                         <div className="absolute inset-0.5 bg-lime-400 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{statusMessage}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {view === AppView.REPORT && activeReport && <ReportCard report={activeReport} onBack={() => setView(AppView.CHAT)} />}
            {view === AppView.HISTORY && user && <HistoryView userId={user.id} userName={user.name} onBack={() => setView(AppView.CHAT)} onSelectReport={r => { setActiveReport(r); setView(AppView.REPORT); }} />}
            {view === AppView.WEATHER && <WeatherView onBack={() => setView(AppView.CHAT)} language={language || 'English'} />}
            {view === AppView.ADMIN && <AdminUserList onBack={() => setView(AppView.CHAT)} />}
            {view === AppView.DOCS && <DocsView onBack={() => setView(AppView.CHAT)} />}
          </div>
          {view === AppView.CHAT && <div className="max-w-4xl mx-auto w-full sticky bottom-0 z-30 px-4 pb-4"><div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden"><ChatInput onSend={handleSend} isLoading={isLoading} selectedLanguage={language || 'English'} /></div></div>}
        </main>
      </div>
    );
  };

  return (
    <div className="antialiased text-slate-900 bg-[#FDFBF7] min-h-screen">
      {renderViewContent()}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onCheckCrop={() => setView(AppView.CHAT)} 
        onFindExperts={() => { setView(AppView.CHAT); handleSend("Find experts", null, null); }} 
        onReset={() => { setMessages([]); setView('LANDING'); }} 
        onChangeLanguage={() => setView('LANGUAGE_SELECT')} 
        onShowHistory={() => setView(AppView.HISTORY)} 
        onShowWeather={() => setView(AppView.WEATHER)} 
        onShowAdmin={() => setView(AppView.ADMIN)} 
        onShowDocs={() => setView(AppView.DOCS)}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={() => { setUser(null); setMessages([]); setView('LANDING'); }}
      />
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onLoginSuccess={(u) => {
            setUser(u);
            setIsAuthModalOpen(false);
            if (view === 'LANDING') {
              language ? setView(AppView.CHAT) : setView('LANGUAGE_SELECT');
            }
          }} 
        />
      )}
    </div>
  );
};

export default App;
