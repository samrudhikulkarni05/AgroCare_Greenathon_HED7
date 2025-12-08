import React from 'react';
import { DiagnosisData } from '../types';
import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';

interface DiagnosisResultProps {
  data: DiagnosisData;
  onFindExperts: () => void;
  onViewReport: () => void;
  onReset: () => void;
  isCompact?: boolean;
}

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ data, onFindExperts, onViewReport, onReset, isCompact = false }) => {
  const isHighConfidence = data.confidence === 'HIGH';

  return (
    <div className={`space-y-4 animate-fade-in ${isCompact ? 'w-full' : ''}`}>
      {/* Status Banner */}
      <div className={`p-4 rounded-xl flex items-start gap-3 border ${
        isHighConfidence 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        {isHighConfidence ? (
          <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <h3 className="font-bold text-lg">{data.disease_name}</h3>
          <p className="text-sm opacity-90">
            {isHighConfidence 
              ? `Detected in ${data.crop_detected}` 
              : `Unsure. Possibly ${data.disease_name}.`}
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h4 className="font-semibold text-slate-900 mb-2">Cause & Symptoms</h4>
        <p className="text-slate-600 leading-relaxed text-sm">{data.explanation}</p>
      </div>

      {/* Treatment */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          Treatment 
          {data.is_safe_organic && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Organic</span>}
        </h4>
        <ul className="space-y-2">
          {data.treatment_steps.map((step, idx) => (
            <li key={idx} className="flex gap-2 text-slate-700 text-sm">
              <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prevention - Only show if not compact or if critical */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <h4 className="font-semibold text-blue-900 mb-2">Prevention Tips</h4>
        <ul className="list-disc pl-5 space-y-1 text-blue-800 text-sm">
          {data.prevention_tips.slice(0, 3).map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3 pt-2">
        <button 
          onClick={onViewReport}
          className="flex items-center justify-center gap-2 bg-slate-800 text-white p-3 rounded-lg font-medium hover:bg-slate-900 shadow-sm text-sm"
        >
          <FileText className="w-4 h-4" />
          View Report
        </button>
      </div>
    </div>
  );
};

export default DiagnosisResult;