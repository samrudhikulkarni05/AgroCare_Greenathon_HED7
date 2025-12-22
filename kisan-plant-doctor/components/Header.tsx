import React from 'react';
import { Leaf, Menu, Sparkles } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogoClick }) => {
  return (
    <header className="bg-[#064e3b]/95 backdrop-blur-md text-white px-6 py-4 shadow-xl sticky top-0 z-50 no-print border-b border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className={`flex items-center gap-3 ${onLogoClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
          onClick={onLogoClick}
          role={onLogoClick ? "button" : undefined}
          aria-label="Go to Home"
        >
          <div className="bg-white p-2 rounded-2xl shadow-lg">
            <Leaf className="w-5 h-5 text-[#064e3b]" />
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight tracking-tight">Kisan<span className="text-emerald-400">Doctor</span></h1>
            <div className="flex items-center gap-1.5 opacity-60">
              <Sparkles size={10} className="text-lime-400" />
              <p className="text-[9px] uppercase font-black tracking-[0.2em]">Engineering Digital Bharat</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onMenuClick} 
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10" 
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;