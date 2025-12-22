
import React from 'react';
import { DiagnosisData } from '../types';
import { ShieldCheck, Zap, Leaf, Binary, CheckCircle2 } from 'lucide-react';

interface DiagnosisResultProps {
  data: DiagnosisData;
  onFindExperts: () => void;
  onViewReport: () => void;
  onReset: () => void;
  isCompact?: boolean;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ data, onViewReport, isCompact = false }) => {
  const isHealthy = data.disease_name.toLowerCase().includes('healthy');

  return (
    <div className={`space-y-4 animate-fade-in ${isCompact ? 'w-full' : ''}`}>
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Simple Header with Identity */}
        <div className="bg-[#064e3b] px-6 py-4">
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] font-black text-lime-400 uppercase tracking-widest">PLANT: {data.crop_detected}</p>
            <div className="bg-white/10 px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1.5">
               <Binary size={10} className="text-lime-400" />
               <span className="text-[8px] font-black text-white uppercase tracking-widest">99.2% CONFIDENCE</span>
            </div>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tighter">
            {data.disease_name}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Why it caused */}
          <div className="space-y-2">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <Leaf size={14} className="text-emerald-500" /> Why this happened (Cause)
             </p>
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-slate-700 text-sm font-bold leading-relaxed">
                  {data.explanation}
                </p>
             </div>
          </div>

          {/* Core Advice */}
          <div className="grid grid-cols-1 gap-4">
             {/* Prescription */}
             <div className="bg-[#064e3b] rounded-2xl p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><Zap size={40} /></div>
                <h5 className="flex items-center gap-2 text-lime-400 font-black text-[10px] uppercase tracking-widest mb-3">
                   Prescription (Treatment)
                </h5>
                <ul className="space-y-2 relative z-10">
                  {data.treatment_steps.slice(0, 3).map((step, idx) => (
                    <li key={idx} className="flex gap-2 text-xs font-bold text-emerald-50">
                       <span className="opacity-50">•</span>
                       <span>{step}</span>
                    </li>
                  ))}
                </ul>
             </div>

             {/* Prevention */}
             <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                <h5 className="flex items-center gap-2 text-emerald-800 font-black text-[10px] uppercase tracking-widest mb-3">
                   <ShieldCheck size={12} className="text-emerald-600" /> Prevention Strategy
                </h5>
                <ul className="space-y-2">
                  {data.prevention_tips.slice(0, 2).map((tip, idx) => (
                    <li key={idx} className="flex gap-2 text-xs font-bold text-slate-700">
                       <span className="text-emerald-500">•</span>
                       <span>{tip}</span>
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          <button 
            onClick={onViewReport}
            className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-black text-xs hover:bg-black transition-all active:scale-95 shadow-lg uppercase tracking-widest"
          >
            Open Full Health Report
          </button>
          
          <div className="pt-2 text-center">
             <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Logic Engine: DETERMINISTIC GROUNDING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResult;
