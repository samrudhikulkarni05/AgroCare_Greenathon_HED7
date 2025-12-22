
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, FileText, Search, User } from 'lucide-react';
import { FarmerReport } from '../types';
import { getUserReports } from '../services/dbService';

interface HistoryViewProps {
  userId: string;
  userName?: string;
  onBack: () => void;
  onSelectReport: (report: FarmerReport) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ userId, userName, onBack, onSelectReport }) => {
  const [reports, setReports] = useState<FarmerReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getUserReports(userId);
        setReports(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-slate-50 z-10 py-4 border-b border-slate-200 mb-4 px-1">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">My History</h2>
            {userName && (
              <p className="text-xs text-green-700 font-medium flex items-center gap-1">
                <User size={10} />
                {userName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <p className="font-medium">No records found</p>
            <p className="text-sm">Your past diagnoses will appear here.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div 
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 flex gap-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden border border-slate-100">
                 {report.imageUri ? (
                   <img src={report.imageUri} alt={report.crop} className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                     <FileText size={24} />
                   </div>
                 )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                 <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800 text-lg truncate">{report.crop}</h3>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(report.timestamp).toLocaleDateString()}
                    </span>
                 </div>
                 <p className="text-sm font-medium text-red-600 truncate mb-1">{report.diagnosis.disease_name}</p>
                 <p className="text-xs text-slate-500 truncate">{report.symptoms}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
