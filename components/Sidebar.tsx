
import React from 'react';
import { X, MapPin, Home, Globe } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFindExperts: () => void;
  onReset: () => void;
  onChangeLanguage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onFindExperts, onReset, onChangeLanguage }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[70] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-green-700 text-white">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={onClose} className="p-1 hover:bg-green-600 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-2">
           <button 
            onClick={() => { onReset(); onClose(); }}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-green-700 transition-colors"
          >
            <Home size={20} />
            <span className="font-medium">Home / New Chat</span>
          </button>

          <button 
            onClick={() => { onChangeLanguage(); onClose(); }}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-green-700 transition-colors"
          >
            <Globe size={20} />
            <span className="font-medium">Change Language</span>
          </button>

          <button 
            onClick={() => { onFindExperts(); onClose(); }}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-green-700 transition-colors"
          >
            <MapPin size={20} />
            <span className="font-medium">Find Local Experts</span>
          </button>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-center text-slate-400">
            Kisan Plant Doctor<br/>v1.1
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
