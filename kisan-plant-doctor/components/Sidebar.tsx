
import React from 'react';
import { 
  X, MapPin, Home, Globe, Clock, CloudSun, 
  ChevronRight, Leaf, 
  BookOpen, Heart, User as UserIcon,
  Camera, Database, LogOut, LogIn, ShieldAlert, FileText
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckCrop: () => void;
  onFindExperts: () => void;
  onReset: () => void;
  onChangeLanguage: () => void;
  onShowHistory: () => void;
  onShowWeather: () => void;
  onShowAdmin: () => void;
  onShowDocs?: () => void;
  user: User | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onCheckCrop,
  onFindExperts, 
  onReset, 
  onChangeLanguage,
  onShowHistory,
  onShowWeather,
  onShowAdmin,
  onShowDocs,
  user,
  onLoginClick,
  onLogoutClick
}) => {
  const isAdmin = user?.username === 'sakshiadmin';

  return (
    <>
      <style>{`
        @keyframes menu-item-fade {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .menu-item-animate {
          opacity: 0;
          animation: menu-item-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.15s; }
        .delay-3 { animation-delay: 0.2s; }
        .delay-4 { animation-delay: 0.25s; }
        .delay-5 { animation-delay: 0.3s; }
        .delay-6 { animation-delay: 0.35s; }
        .delay-7 { animation-delay: 0.4s; }
        .delay-8 { animation-delay: 0.45s; }
      `}</style>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-500"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-2xl z-[70] flex flex-col transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 bg-[#064e3b] text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 opacity-10">
            <Leaf size={160} />
          </div>
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                <Leaf size={24} className="text-lime-400" />
              </div>
              <h2 className="font-black text-2xl tracking-tighter">Kisan<span className="text-lime-400">Doctor</span></h2>
            </div>
            <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
              <X size={24} />
            </button>
          </div>
          
          <div className="menu-item-animate flex items-center gap-5 bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-lg relative z-10">
            <div className={`w-14 h-14 ${isAdmin ? 'bg-amber-400' : 'bg-lime-400'} text-[#064e3b] rounded-[1.2rem] flex items-center justify-center font-black text-2xl shadow-inner`}>
              {isAdmin ? <ShieldAlert size={24} /> : <UserIcon size={24} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-xl truncate leading-tight">{user ? user.name : 'Farmer Friend'}</p>
              <div className="flex items-center gap-2 mt-1">
                 <div className={`w-2 h-2 rounded-full ${user ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></div>
                 <p className="text-[9px] uppercase font-black tracking-[0.2em] opacity-60">
                   {isAdmin ? 'System Administrator' : user ? 'Authenticated Session' : 'Guest Mode'}
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 p-6 space-y-2 overflow-y-auto bg-[#FDFBF7]">
          <button onClick={() => { onReset(); onClose(); }} className="menu-item-animate delay-1 w-full flex items-center justify-between p-4 rounded-2xl text-[#064e3b] hover:bg-emerald-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-[#064e3b] group-hover:text-white transition-all"><Home size={22} /></div>
              <span className="font-black">Main Page</span>
            </div>
            <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
          </button>

          <button onClick={() => { onCheckCrop(); onClose(); }} className="menu-item-animate delay-2 w-full flex items-center justify-between p-4 rounded-2xl text-[#064e3b] hover:bg-emerald-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-[#064e3b] group-hover:text-white transition-all"><Camera size={22} /></div>
              <span className="font-black">Check Crop</span>
            </div>
            <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
          </button>

          <button onClick={() => { onShowWeather(); onClose(); }} className="menu-item-animate delay-3 w-full flex items-center justify-between p-4 rounded-2xl text-[#064e3b] hover:bg-emerald-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-[#064e3b] group-hover:text-white transition-all"><CloudSun size={22} /></div>
              <span className="font-black">Weather Today</span>
            </div>
            <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
          </button>

          {/* Only show "My Old Checks" if logged in */}
          {user && (
            <button onClick={() => { onShowHistory(); onClose(); }} className="menu-item-animate delay-4 w-full flex items-center justify-between p-4 rounded-2xl text-[#064e3b] hover:bg-emerald-50 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-[#064e3b] group-hover:text-white transition-all"><Clock size={22} /></div>
                <span className="font-black">My Old Checks</span>
              </div>
              <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
            </button>
          )}

          <button onClick={() => { onChangeLanguage(); onClose(); }} className="menu-item-animate delay-5 w-full flex items-center justify-between p-4 rounded-2xl text-[#064e3b] hover:bg-emerald-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-[#064e3b] group-hover:text-white transition-all"><Globe size={22} /></div>
              <span className="font-black">Change Language</span>
            </div>
            <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
          </button>

          <button onClick={() => { onShowDocs?.(); onClose(); }} className="menu-item-animate delay-6 w-full flex items-center justify-between p-4 rounded-2xl text-[#064e3b] hover:bg-emerald-50 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:bg-[#064e3b] group-hover:text-white transition-all"><FileText size={22} /></div>
              <span className="font-black">Project Brief</span>
            </div>
            <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
          </button>

          {isAdmin && (
            <button onClick={() => { onShowAdmin(); onClose(); }} className="menu-item-animate delay-7 w-full flex items-center justify-between p-4 rounded-2xl text-amber-700 bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-amber-100 group-hover:bg-amber-700 group-hover:text-white transition-all"><Database size={22} /></div>
                <span className="font-black">Admin Panel</span>
              </div>
              <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 transition-all" />
            </button>
          )}
          
          <div className="pt-8 px-4 space-y-4">
            {!user ? (
              <button 
                onClick={() => { onLoginClick?.(); onClose(); }} 
                className="w-full bg-[#064e3b] text-white py-4 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                <LogIn size={20} /> Farmer Login
              </button>
            ) : (
              <button 
                onClick={() => { onLogoutClick?.(); onClose(); }} 
                className="w-full bg-rose-50 text-rose-600 border border-rose-100 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-transform active:scale-95"
              >
                <LogOut size={20} /> Logout Account
              </button>
            )}

            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <BookOpen size={14} className="text-emerald-600" /> Important Tips
               </h4>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3 text-xs text-slate-700 font-bold">
                   <div className="w-2 h-2 bg-lime-500 rounded-full mt-1 flex-shrink-0"></div>
                   Take leaf photos in bright sun.
                 </li>
                 <li className="flex items-start gap-3 text-xs text-slate-700 font-bold">
                   <div className="w-2 h-2 bg-lime-500 rounded-full mt-1 flex-shrink-0"></div>
                   Your data is safe and private.
                 </li>
               </ul>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-white border-t border-slate-100 text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
            <span>Helping Indian Farmers</span>
            <Heart size={12} className="text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
