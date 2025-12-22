
import React, { useRef, useEffect, useState } from 'react';
import { 
  Leaf, Sun, Globe, ShieldCheck, Zap, Sparkles, 
  Menu, ChevronRight, Camera, Linkedin, Mail, User as UserIcon, Github, ArrowUpRight
} from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onMenuClick: () => void;
  onLoginClick?: () => void;
  user: any;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onMenuClick, onLoginClick, user }) => {
  const howToRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-emerald-100 selection:text-emerald-800 overflow-x-hidden flex flex-col">
      <style>{`
        @keyframes reveal-up {
          0% { opacity: 0; transform: translateY(40px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-reveal { animation: reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        
        .shimmer-text {
          background: linear-gradient(90deg, #059669, #10b981, #34d399, #059669);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        /* Moving Sun Animation */
        @keyframes sun-journey {
          0% { left: -10%; top: 20%; transform: rotate(0deg); }
          50% { left: 110%; top: 15%; transform: rotate(180deg); }
          100% { left: -10%; top: 20%; transform: rotate(360deg); }
        }

        /* Sky Gradient Animation */
        @keyframes sky-transition {
          0% { background: linear-gradient(135deg, #fff1f2 0%, #fae8ff 100%); }
          33% { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); }
          66% { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); }
          100% { background: linear-gradient(135deg, #fff1f2 0%, #fae8ff 100%); }
        }

        .animate-sky {
          animation: sky-transition 20s ease-in-out infinite;
        }

        .animate-sun-move {
          animation: sun-journey 25s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-[#064e3b] p-2 rounded-2xl shadow-lg transition-transform group-hover:rotate-12 group-hover:scale-110">
              <Leaf className="w-5 h-5 text-lime-400" />
            </div>
            <span className="font-black text-[#064e3b] tracking-tighter text-2xl">Kisan<span className="text-emerald-500">Doctor</span></span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollTo(howToRef)} className="text-[#064e3b] font-bold hover:text-emerald-600 transition-colors text-xs uppercase tracking-[0.2em]">How We Help</button>
              <button onClick={() => scrollTo(teamRef)} className="text-[#064e3b] font-bold hover:text-emerald-600 transition-colors text-xs uppercase tracking-[0.2em]">Our Team</button>
            </div>
            {!user ? (
              <button 
                onClick={onLoginClick}
                className="hidden sm:flex items-center gap-2 bg-[#064e3b] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg"
              >
                <UserIcon size={14} />
                Farmer Login
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-100 font-black text-xs">
                <UserIcon size={14} />
                {user.name}
              </div>
            )}
            <button onClick={onMenuClick} className="p-2 text-[#064e3b] hover:bg-emerald-50 rounded-full transition-colors"><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col overflow-hidden animate-sky">
        <div className="absolute animate-sun-move z-0 opacity-40 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-200 blur-3xl rounded-full scale-150"></div>
            <Sun className="text-amber-400 w-24 h-24 md:w-32 md:h-32" />
          </div>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center w-full pt-48 md:pt-56">
          <div className="opacity-0 animate-reveal inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white glass-card text-[#064e3b] text-xs font-black mb-10 border border-emerald-100 shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            SMART CROP CHECK • HELPING OUR FARMERS
          </div>
          
          <h1 className="opacity-0 animate-reveal delay-100 text-6xl md:text-8xl font-serif font-black text-[#064e3b] mb-8 tracking-tighter leading-[0.9] drop-shadow-sm">
            Healthy Crops. <br/>
            <span className="shimmer-text">Strong Farmers.</span>
          </h1>
          
          <p className="opacity-0 animate-reveal delay-200 text-lg md:text-xl text-[#064e3b]/80 mb-12 max-w-2xl mx-auto font-semibold leading-relaxed">
            Send a photo, get an instant check, and find the best cure. 
            Helping Indian farmers with simple and smart technology.
          </p>

          <div className="opacity-0 animate-reveal delay-300 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="group relative bg-[#064e3b] text-white px-12 py-5 rounded-3xl text-lg font-black transition-all shadow-2xl hover:bg-black hover:-translate-y-1 active:scale-95 w-full sm:w-auto flex items-center justify-center gap-4"
            >
              Start Health Check
              <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            </button>
            {!user && (
              <button 
                onClick={onLoginClick}
                className="sm:hidden w-full bg-white text-[#064e3b] border-2 border-slate-200 px-12 py-5 rounded-3xl text-lg font-black"
              >
                Farmer Login
              </button>
            )}
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="relative w-full mt-auto pointer-events-none z-10 -mb-2">
          <svg className="w-full h-auto min-h-[250px]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#064e3b" fillOpacity="1" d="M0,192L60,208C120,224,240,256,360,250.7C480,245,600,203,720,202.7C840,203,960,245,1080,240C1200,235,1320,224,1380,218.7L1440,213.3V320H0V192Z"></path>
          </svg>
        </div>
      </div>

      {/* How We Help Section */}
      <section ref={howToRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block animate-reveal">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#064e3b] mb-6 tracking-tight">
              From Photo to <span className="text-emerald-500">Cure</span>
            </h2>
            <div className="w-20 h-1.5 bg-lime-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { 
                icon: <Camera />, 
                title: "Snap Photo", 
                desc: "Click a clear photo of the affected plant part.",
                color: "bg-blue-50 text-blue-600 border-blue-100"
              },
              { 
                icon: <Globe />, 
                title: "Choose Language", 
                desc: "Select Hindi, Marathi, or any local language.",
                color: "bg-purple-50 text-purple-600 border-purple-100"
              },
              { 
                icon: <Zap />, 
                title: "Instant Check", 
                desc: "AI identifies the disease in seconds.",
                color: "bg-amber-50 text-amber-600 border-amber-100"
              },
              { 
                icon: <ShieldCheck />, 
                title: "Get Medicine", 
                desc: "Receive treatment steps and organic cures.",
                color: "bg-emerald-50 text-emerald-600 border-emerald-100"
              }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#064e3b] text-white rounded-full flex items-center justify-center font-black text-xs border-4 border-white z-20 shadow-md">
                  {i + 1}
                </div>
                <div className="bg-white rounded-[2rem] p-8 h-full border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:-translate-y-3 flex flex-col items-center text-center relative overflow-hidden z-10">
                   <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${item.color}`}>
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32 })}
                   </div>
                   <h3 className="text-xl font-black text-slate-800 mb-3">{item.title}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 bg-[#064e3b] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-lime-400 font-black text-sm uppercase tracking-[0.5em] mb-4 block">The People Behind This</span>
             <h2 className="text-4xl md:text-5xl font-serif font-black mb-4 tracking-tighter">Cultivated By</h2>
             <div className="w-16 h-1.5 bg-lime-400 mx-auto rounded-full mb-6"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            {[
              { name: "Samruddhi Kulkarni", initials: "SK", linkedin: "https://www.linkedin.com/in/samrudhi-kulkarni-b85991251" },
              { name: "Sakshi Tamshetti", initials: "ST", linkedin: "https://www.linkedin.com/in/sakshi-t-311123256" },
              { name: "Pramila Chandanshive", initials: "PC", linkedin: "https://www.linkedin.com/in/pramila-c-ab3103256" },
              { name: "Rutuja Raut", initials: "RR", linkedin: "https://www.linkedin.com/in/rutuja-raut-7926a7256/" }
            ].map((member, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 group text-center flex flex-col items-center shadow-lg h-full">
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto bg-[#064e3b] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl border border-white/5">
                   <span className="text-lg md:text-2xl font-black text-lime-400">{member.initials}</span>
                </div>
                <h3 className="text-sm md:text-lg font-black mb-4 leading-tight min-h-[2.5rem] flex items-center justify-center">{member.name}</h3>
                <div className="flex justify-center gap-3 mt-auto w-full">
                   <a href={member.linkedin} target="_blank" className="flex-1 bg-white/5 hover:bg-white/20 py-2 rounded-xl text-emerald-400 hover:text-white transition-colors flex items-center justify-center">
                     <Linkedin size={18} />
                   </a>
                   <a href="mailto:sakshitamshetti@gmail.com" className="flex-1 bg-white/5 hover:bg-white/20 py-2 rounded-xl text-emerald-400 hover:text-white transition-colors flex items-center justify-center">
                     <Mail size={18} />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractive Footer */}
      <footer className="bg-[#022c22] text-white pt-20 pb-10 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="grid grid-cols-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border-r border-b border-white"></div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            {/* Brand Column */}
            <div className="max-w-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-2xl shadow-xl">
                  <Leaf className="w-6 h-6 text-[#064e3b]" />
                </div>
                <span className="font-black text-2xl tracking-tighter">Kisan<span className="text-emerald-400">Doctor</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-semibold">
                Advancing the backbone of Bharat through high-confidence AI plant pathology. Ensuring food security one leaf at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              <div>
                <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-6">Navigation</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-slate-300 hover:text-emerald-400 font-bold transition-colors">Home</button></li>
                  <li><button onClick={onStart} className="text-slate-300 hover:text-emerald-400 font-bold transition-colors">Check Health</button></li>
                  <li><button onClick={() => scrollTo(howToRef)} className="text-slate-300 hover:text-emerald-400 font-bold transition-colors">Our Mission</button></li>
                  <li><button onClick={() => scrollTo(teamRef)} className="text-slate-300 hover:text-emerald-400 font-bold transition-colors">Our Team</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-emerald-400 font-black text-xs uppercase tracking-widest mb-6">Connect with AgroCare</h4>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <a href="https://www.linkedin.com/in/sakshi-t-311123256" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg" title="LinkedIn">
                      <Linkedin size={22} />
                    </a>
                    <a href="https://github.com/sakshitamshetti" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-lg" title="GitHub">
                      <Github size={22} />
                    </a>
                    <a href="mailto:sakshitamshetti@gmail.com" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg" title="Email">
                      <Mail size={22} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full mb-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                © 2025 Kisan Plant Doctor • Built for Bharat
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/5 px-6 py-2.5 rounded-full border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
