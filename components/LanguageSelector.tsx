import React from 'react';
import { LANGUAGES } from '../constants';
import { Leaf } from 'lucide-react';

interface Props {
  onSelect: (langName: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center animate-fade-in">
        <div className="bg-green-700 p-3 rounded-full inline-block mb-4 shadow-lg">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">Kisan Plant Doctor</h1>
        <p className="text-slate-600">Select your language to continue</p>
        <p className="text-slate-500 text-sm mt-1">आगे बढ़ने के लिए अपनी भाषा चुनें</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.name)}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-slate-100 rounded-2xl shadow-sm hover:border-green-500 hover:shadow-md hover:bg-green-50 transition-all duration-200"
          >
            <span className="text-xl font-bold text-slate-800 mb-1">{lang.nativeName}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{lang.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-12 text-center text-slate-400 text-xs">
        <p>AI-Powered Crop Disease Detection</p>
      </div>
    </div>
  );
};

export default LanguageSelector;