
import React, { useState, useRef } from 'react';
import { Camera, Mic, Send, X, Paperclip, StopCircle } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string, img: string | null, audio: string | null, audioMime: string) => void;
  isLoading: boolean;
  selectedLanguage: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, selectedLanguage }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<string | null>(null);
  const [audioMimeType, setAudioMimeType] = useState<string>('audio/webm');
  const [isRecording, setIsRecording] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 
                       MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '';
      
      const mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      setAudioMimeType(mediaRecorder.mimeType);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setAudioBlob(reader.result as string);
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone access needed.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSend = () => {
    if (!text.trim() && !image && !audioBlob) return;
    onSend(text, image, audioBlob, audioMimeType);
    setText('');
    setImage(null);
    setAudioBlob(null);
  };

  return (
    <div className="bg-white border-t border-slate-200 p-3">
      {/* Previews */}
      {(image || audioBlob) && (
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
          {image && (
            <div className="relative h-16 w-16 flex-shrink-0">
              <img src={image} className="h-full w-full object-cover rounded-lg border border-slate-300" alt="preview" />
              <button onClick={() => setImage(null)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"><X size={12} /></button>
            </div>
          )}
          {audioBlob && (
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-200 text-xs text-green-800">
              <Mic size={12} /> Audio Ready
              <button onClick={() => setAudioBlob(null)} className="text-red-500 ml-1"><X size={12} /></button>
            </div>
          )}
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-end gap-2">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-3 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Camera size={24} />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </button>

        <button 
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
        </button>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Type in ${selectedLanguage}...`}
          className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 max-h-32 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none text-slate-800"
          rows={1}
          style={{ minHeight: '48px' }}
        />

        <button 
          onClick={handleSend}
          disabled={isLoading || (!text.trim() && !image && !audioBlob)}
          className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:hover:bg-green-600 transition-colors shadow-sm"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
