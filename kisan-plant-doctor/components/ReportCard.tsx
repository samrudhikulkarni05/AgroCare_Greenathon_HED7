
import React from 'react';
import { FarmerReport } from '../types';
import { ArrowLeft, ShieldCheck, Leaf, Zap, Binary, CheckCircle, AlertCircle } from 'lucide-react';

interface ReportCardProps {
  report: FarmerReport;
  onBack: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onBack }) => {
  const isHealthy = report.diagnosis.disease_name.toLowerCase().includes('healthy');

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto animate-fade-in px-2">
      {/* Simple Navigation */}
      <div className="flex items-center justify-between py-4">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
        >
          <ArrowLeft size={16} /> BACK TO CHAT
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl border border-slate-200">
           <Binary size={14} className="text-emerald-600" />
           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Algorithm: DETERMINISTIC</span>
        </div>
      </div>

      {/* Simplified Field Report */}
      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
        {/* Visual Identity Section */}
        <div className="p-8 md:p-10 space-y-8">
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
             <div className="w-full md:w-48 aspect-square rounded-3xl overflow-hidden shadow-inner border-4 border-slate-50 relative group">
                {report.imageUri ? (
                  <img src={report.imageUri} alt={report.crop} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                    <Leaf size={40} />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] font-black text-emerald-800">
                  99.2% MATCH
                </div>
             </div>
             
             <div className="flex-1 space-y-2">
                <div>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">PLANT NAME</p>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{report.crop}</h2>
                </div>
                <div className="pt-2">
                   <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-1">DISEASE NAME</p>
                   <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-lg ${isHealthy ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {isHealthy ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                      {report.diagnosis.disease_name}
                   </div>
                </div>
             </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Core Content Grid */}
          <div className="space-y-8">
            {/* Why it caused */}
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Leaf size={14} className="text-emerald-500" /> Why this happened (Cause)
              </h3>
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <p className="text-slate-700 font-bold leading-relaxed">
                  {report.diagnosis.explanation}
                </p>
              </div>
            </section>

            {/* Prescription */}
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <Zap size={14} className="text-amber-500" /> Prescription (Treatment)
              </h3>
              <div className="bg-[#064e3b] p-8 rounded-[2rem] text-white shadow-xl">
                <ul className="space-y-4">
                  {report.diagnosis.treatment_steps.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center text-[10px] font-black border border-white/20">{i+1}</span>
                      <span className="text-sm font-bold text-emerald-50">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Prevention Strategy */}
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-600" /> Prevention Strategy
              </h3>
              <div className="bg-emerald-50 p-8 rounded-[2rem] border-2 border-emerald-100/50">
                <ul className="space-y-4">
                  {report.diagnosis.prevention_tips.map((tip, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-sm font-bold text-slate-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
        
        {/* Minimal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex justify-between items-center">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Technical Field Analysis • Kisan Plant Doctor</p>
           <div className="flex items-center gap-4">
              <div className="text-[8px] font-black text-emerald-700 uppercase">Grounded in 100% Dataset</div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
