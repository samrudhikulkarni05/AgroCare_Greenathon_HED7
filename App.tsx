
import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import ReportCard from './components/ReportCard';
import LanguageSelector from './components/LanguageSelector';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import { sendChatMessage } from './services/geminiService';
import { AppView, ChatMessage as ChatMessageType, FarmerReport, DiagnosisData } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.CHAT);
  // Show landing page initially
  const [showLanding, setShowLanding] = useState(true);
  const [language, setLanguage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Widget State
  const [isWidget, setIsWidget] = useState(false);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Report State
  const [reportData, setReportData] = useState<FarmerReport | null>(null);

  useEffect(() => {
    // Check if running in widget mode via URL params
    const params = new URLSearchParams(window.location.search);
    const widgetMode = params.get('mode') === 'widget';
    setIsWidget(widgetMode);
    
    // If it's a widget, skip the landing page to be less intrusive
    if (widgetMode) {
      setShowLanding(false);
    }
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleLanguageSelect = (selectedLang: string) => {
    setLanguage(selectedLang);
    // Add initial greeting
    setMessages([{
      id: 'welcome',
      role: 'model',
      content: {
        botResponse: {
          type: 'CONVERSATION',
          text_response: `Namaste! I am Kisan Plant Doctor. I can help you in ${selectedLang}. Send me a photo of your crop or ask a question.`
        }
      },
      timestamp: new Date()
    }]);
  };

  const handleSend = async (text: string, img: string | null, audio: string | null, audioMime: string) => {
    if (!language) return;

    // 1. Add User Message
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: { text, imageUri: img || undefined, audioUri: audio || undefined },
      timestamp: new Date()
    };
    
    // Optimistic update
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsTyping(true);

    try {
      // 2. Call API
      const response = await sendChatMessage(newHistory, img, audio, text, language, audioMime);

      // 3. Add Bot Message
      const botMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: { botResponse: response },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: { 
          botResponse: { 
            type: 'CONVERSATION', 
            text_response: "Sorry, I am facing a network issue. Please try again." 
          } 
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFindExpertsTrigger = () => {
    // Simulate user asking for experts to trigger the AI's logic
    handleSend("Please find local agricultural experts near me.", null, null, "");
  };

  const handleReset = () => {
    setMessages([]);
    // Language is kept, but chat is cleared. Re-initiate welcome.
    if (language) {
       setMessages([{
        id: 'welcome_reset',
        role: 'model',
        content: {
          botResponse: {
            type: 'CONVERSATION',
            text_response: `Chat cleared. How can I help you with your crops now?`
          }
        },
        timestamp: new Date()
      }]);
    }
  };

  const handleChangeLanguage = () => {
    setLanguage(null);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleViewReport = (diagnosis: DiagnosisData, imageUri?: string) => {
    setReportData({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      crop: diagnosis.crop_detected,
      symptoms: "Discussed in chat",
      diagnosis: diagnosis,
      imageUri: imageUri
    });
    setView(AppView.REPORT);
  };

  const handleCloseWidget = () => {
    // Send message to parent window (embed.js) to hide the iframe
    if (window.parent) {
      window.parent.postMessage({ type: 'KISAN_WIDGET_CLOSE' }, '*');
    }
  };

  const handleLogoClick = () => {
    setShowLanding(true);
    setView(AppView.CHAT);
    setIsSidebarOpen(false);
  };

  // 1. Landing Page View
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  // 2. Language Selection View
  if (!language) {
    return <LanguageSelector onSelect={handleLanguageSelect} />;
  }

  // 3. Main Application View (Chat or Report)
  return (
    <div className={`h-screen flex flex-col bg-slate-50 ${isWidget ? 'text-sm' : ''}`}>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onFindExperts={handleFindExpertsTrigger}
        onReset={handleReset}
        onChangeLanguage={handleChangeLanguage}
      />
      
      {view === AppView.REPORT && reportData ? (
        <>
          <Header 
            onMenuClick={() => setIsSidebarOpen(true)} 
            isWidget={isWidget}
            onCloseWidget={handleCloseWidget}
            onLogoClick={handleLogoClick}
          />
          <main className="container mx-auto max-w-lg px-4 pt-6 bg-slate-50 min-h-screen">
            <ReportCard report={reportData} onBack={() => setView(AppView.CHAT)} />
          </main>
        </>
      ) : (
        <>
          <Header 
            onMenuClick={() => setIsSidebarOpen(true)}
            isWidget={isWidget}
            onCloseWidget={handleCloseWidget}
            onLogoClick={handleLogoClick}
          />
          {/* Chat Area */}
          <main className="flex-1 overflow-y-auto p-4 container mx-auto max-w-lg pb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessage 
                  key={msg.id} 
                  message={msg} 
                  onViewReport={(diag, img) => handleViewReport(diag, img || msg.content.imageUri)} 
                />
              ))}
              
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-500 text-sm ml-4 animate-pulse">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </main>

          {/* Input Area */}
          <div className="container mx-auto max-w-lg">
            <ChatInput 
              onSend={handleSend} 
              isLoading={isTyping} 
              selectedLanguage={language} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
