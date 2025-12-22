import React from 'react';
import { LANGUAGES } from '../constants';
import { Leaf, Sparkles, Globe } from 'lucide-react';

interface Props {
  onSelect: (langName: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[100px] -mr-48 -mt-48 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-100 rounded-full blur-[100px] -ml-48 -mb-48 opacity-60"></div>

      <div className="mb-12 text-center relative z-10 animate-fade-in">
        <div className="bg-[#064e3b] p-4 rounded-3xl inline-block mb-6 shadow-2xl hover:rotate-12 transition-transform duration-500">
          <Leaf className="w-10 h-10 text-lime-400" />
        </div>
        <h1 className="text-4xl font-serif font-black text-[#064e3b] mb-3 tracking-tighter">Choose Your Voice</h1>
        <p className="text-slate-500 font-bold mb-1 flex items-center justify-center gap-2">
          <Globe size={16} className="text-emerald-600" /> Select language to continue
        </p>
        <p className="text-emerald-600/60 text-xs font-black uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
          <Sparkles size={12} /> Digital Bharat Initiative
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl relative z-10">
        {LANGUAGES.map((lang, idx) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.name)}
            className="group flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-md border border-slate-200 rounded-[2.5rem] shadow-sm hover:border-[#064e3b] hover:shadow-2xl hover:bg-white hover:-translate-y-2 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <span className="text-2xl font-black text-[#064e3b] mb-2 group-hover:scale-110 transition-transform">{lang.nativeName}</span>
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-hover:text-emerald-600 transition-colors">{lang.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-16 text-center relative z-10">
        <div className="flex items-center gap-3 px-6 py-2.5 bg-white rounded-full border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-[0.3em] text-[#064e3b]">
           <span>Secure & Private AI for Farmers</span>
           <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;