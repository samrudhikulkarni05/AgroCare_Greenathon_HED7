
import React from 'react';
import { Leaf, Menu, X } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  isWidget?: boolean;
  onCloseWidget?: () => void;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isWidget, onCloseWidget, onLogoClick }) => {
  return (
    <header className="bg-green-700 text-white p-4 shadow-md sticky top-0 z-50 no-print">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className={`flex items-center gap-2 ${onLogoClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
          onClick={onLogoClick}
          role={onLogoClick ? "button" : undefined}
          aria-label="Go to Home"
        >
          <div className="bg-white p-1.5 rounded-full shadow-sm">
            <Leaf className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Kisan Plant Doctor</h1>
            {!isWidget && <p className="text-xs text-green-100 opacity-90">Your Smart Farming Expert</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick} className="p-2 hover:bg-green-600 rounded-lg transition-colors" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
          {isWidget && onCloseWidget && (
            <button 
              onClick={onCloseWidget} 
              className="p-2 hover:bg-green-600 rounded-lg transition-colors"
              aria-label="Close Widget"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
