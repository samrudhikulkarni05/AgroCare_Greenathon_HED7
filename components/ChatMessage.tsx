
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import DiagnosisResult from './DiagnosisResult';
import { Phone, MapPin, User, Bot, Play } from 'lucide-react';

interface Props {
  message: ChatMessageType;
  onViewReport: (diagnosis: any, image: string | undefined) => void;
}

const ChatMessage: React.FC<Props> = ({ message, onViewReport }) => {
  const isUser = message.role === 'user';
  
  // Render User Message
  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-fade-in">
        <div className="max-w-[85%] bg-green-100 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm border border-green-200">
           {message.content.imageUri && (
             <img src={message.content.imageUri} alt="User upload" className="w-full h-40 object-cover rounded-lg mb-2 border border-green-200" />
           )}
           {message.content.audioUri && (
             <div className="flex items-center gap-2 text-green-800 text-sm italic mb-1">
               <Play size={14} className="fill-green-800" /> Audio Message Sent
             </div>
           )}
           {message.content.text && (
             <p className="text-green-900 whitespace-pre-wrap">{message.content.text}</p>
           )}
        </div>
        <div className="w-8 h-8 ml-2 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-green-700" />
        </div>
      </div>
    );
  }

  // Render Bot Message
  const response = message.content.botResponse;
  if (!response) return null;

  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="w-8 h-8 mr-2 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
        <Bot size={16} className="text-slate-600" />
      </div>
      
      <div className="max-w-[90%] space-y-3">
        {/* Simple Text Response */}
        <div className="bg-white rounded-2xl rounded-tl-none px-5 py-4 shadow-sm border border-slate-100 text-slate-800 whitespace-pre-wrap">
          {response.text_response}
        </div>

        {/* Diagnosis Card */}
        {response.type === 'DIAGNOSIS' && response.diagnosis_data && (
           <div className="w-full">
             <DiagnosisResult 
               data={response.diagnosis_data}
               onFindExperts={() => {}} // Experts are handled via chat now
               onViewReport={() => onViewReport(response.diagnosis_data, message.content.imageUri)} 
               onReset={() => {}} 
               isCompact={true}
             />
           </div>
        )}

        {/* Expert List */}
        {response.type === 'EXPERT_LIST' && response.experts_data && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <div className="bg-amber-50 p-3 border-b border-amber-100">
               <h4 className="font-bold text-amber-900 flex items-center gap-2">
                 <MapPin size={16} /> Nearby Experts Found
               </h4>
             </div>
             <div className="divide-y divide-slate-100">
               {response.experts_data.map((expert, idx) => (
                 <div key={idx} className="p-4 hover:bg-slate-50">
                    <div className="flex justify-between items-start">
                      <div>
                         <p className="font-bold text-slate-800">{expert.name}</p>
                         <p className="text-xs text-slate-500 uppercase">{expert.role} • {expert.type}</p>
                      </div>
                      <a href={`tel:${expert.contact}`} className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200">
                        <Phone size={16} />
                      </a>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{expert.address}</p>
                 </div>
               ))}
             </div>
          </div>
        )}
        
        {/* Ask Location Trigger (Visual cue mostly, as text handles it) */}
        {response.type === 'ASK_LOCATION_FOR_EXPERTS' && (
           <div className="flex gap-2 text-xs text-slate-500 italic ml-2">
             <span>waiting for location details...</span>
           </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
