
import React, { useRef } from 'react';
import { Leaf, ArrowRight, Mail, Linkedin, Sun, Cloud, Wheat, Sprout, Wind, Flower, Heart, MapPin, Zap, Globe, ShieldCheck, Smile, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-green-100 selection:text-green-800 overflow-x-hidden flex flex-col">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes drift {
          from { transform: translateX(-150px); }
          to { transform: translateX(100vw); }
        }
        @keyframes sun-path {
          0% { transform: translate(-20vw, 150px) scale(0.9); }
          50% { transform: translate(30vw, -100px) scale(1.0); } 
          100% { transform: translate(90vw, 150px) scale(0.9); }
        }
        @keyframes blob-bounce {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        
        /* 
           FARM VIBE SKY CYCLE 
        */
        @keyframes sky-cycle {
          0% { background-position: 0% 100%; } /* Sunrise/Set: Purple/Peach */
          50% { background-position: 0% 0%; }   /* Noon: Blue */
          100% { background-position: 0% 100%; } /* Sunrise/Set */
        }

        .dynamic-sky {
          background: linear-gradient(
            180deg, 
            #bae6fd 0%, #e0f2fe 20%, #f0f9ff 40%,       /* NOON: Pastel Blue/Cyan */
            #fef3c7 50%, #ffedd5 60%,                   /* TRANSITION: Pale Cream/Peach */
            #e9d5ff 70%, #fae8ff 85%, #ffe4e6 100%      /* SUNRISE: Soft Lavender/Pink */
          );
          background-size: 100% 400%;
          animation: sky-cycle 60s ease-in-out infinite;
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-sun-move { animation: sun-path 60s linear infinite alternate; }
        .animate-blob { animation: blob-bounce 12s infinite ease-in-out alternate; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
        .animate-sway { animation: sway 3s ease-in-out infinite; transform-origin: bottom center; }
        
        .cloud-1 { animation: drift 60s linear infinite; }
        .cloud-2 { animation: drift 80s linear infinite; animation-delay: -25s; }
        .cloud-3 { animation: drift 100s linear infinite; animation-delay: -10s; }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Navigation Bar - Removed "Launch App" button */}
      <nav className="absolute top-0 w-full z-50 px-4 py-4 md:px-6 md:py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-sm border border-emerald-100 group cursor-pointer hover:scale-105 transition-transform">
            <div className="bg-[#15803d] p-1.5 rounded-full group-hover:rotate-180 transition-transform duration-700">
              <Leaf className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="font-bold text-[#14532d] tracking-tight text-sm md:text-base">Kisan Plant Doctor</span>
          </div>
          {/* Button removed here as requested */}
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden dynamic-sky">
        
        {/* Sky Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 md:left-10 animate-sun-move z-0 opacity-100">
             <div className="relative">
               <Sun size={80} className="text-[#FBBF24] fill-[#fef3c7] md:w-[110px] md:h-[110px]" />
               <div className="absolute inset-0 bg-[#FBBF24] blur-[60px] md:blur-[80px] opacity-60 rounded-full scale-150"></div>
             </div>
          </div>
          <div className="absolute top-12 left-[-50px] cloud-1 blur-[1px] opacity-90 scale-75 md:scale-100">
             <Cloud size={180} fill="white" stroke="none" />
          </div>
          <div className="absolute top-36 right-[-50px] cloud-2 blur-[2px] opacity-80 scale-75 md:scale-100">
             <Cloud size={220} fill="white" stroke="none" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 md:px-6 text-center mt-20 md:mt-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-[#ECFDF5]/60 backdrop-blur-md text-[#14532d] text-xs md:text-sm font-bold mb-6 md:mb-8 border border-[#14532d]/20 shadow-sm animate-float">
            <Wind className="w-3 h-3 md:w-4 md:h-4 text-[#15803d]" />
            AI Powered Agriculture
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-black text-[#022c22] mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-sm opacity-0 animate-fade-up">
            Healthy Crops, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#15803d] to-[#4d7c0f]">
              Happy Farmers
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-[#1a2e05] mb-8 md:mb-8 max-w-xl md:max-w-2xl mx-auto font-medium leading-relaxed bg-white/40 backdrop-blur-md rounded-xl py-2 px-4 opacity-0 animate-fade-up delay-100 shadow-sm border border-white/50">
            Expert guidance for your fields, straight to your phone.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up delay-200 mb-8 md:mb-10">
            {/* Green Main Button */}
            <button 
              onClick={onStart}
              className="group bg-[#15803d] hover:bg-[#166534] text-white px-8 py-4 md:px-10 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all shadow-xl shadow-green-700/20 flex items-center gap-3 hover:-translate-y-1 hover:shadow-2xl active:scale-95 w-full md:w-auto justify-center border-2 border-[#16a34a]/50"
            >
              Heal Your Crop
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* TINY FEATURE BOXES */}
          <div className="flex flex-wrap justify-center gap-3 opacity-0 animate-fade-up delay-300 max-w-4xl mx-auto">
             {[
               { icon: Smile, label: "100% Free", color: "text-green-600", bg: "bg-green-50" },
               { icon: Zap, label: "Instant AI", color: "text-amber-600", bg: "bg-amber-50" },
               { icon: Globe, label: "Multilingual", color: "text-blue-600", bg: "bg-blue-50" },
               { icon: ShieldCheck, label: "Safe & Secure", color: "text-emerald-600", bg: "bg-emerald-50" },
               { icon: MapPin, label: "Local Help", color: "text-rose-600", bg: "bg-rose-50" }
             ].map((item, idx) => (
               <div key={idx} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm hover:scale-105 transition-transform cursor-default">
                  <div className={`p-1.5 rounded-lg ${item.bg}`}>
                    <item.icon size={16} className={item.color} />
                  </div>
                  <span className="text-sm font-bold text-[#14532d] whitespace-nowrap">{item.label}</span>
               </div>
             ))}
          </div>

        </div>

        {/* INDIAN FARM LANDSCAPE (Vector Style) */}
        <div className="relative w-full mt-auto pointer-events-none z-10 -mb-1">
          <svg className="w-full h-auto min-h-[250px] md:min-h-[400px]" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            {/* Layer 1: Distant Western Ghats */}
            <path fill="#3f6212" fillOpacity="0.8" d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128V320H0V224Z"></path>
            
            {/* Layer 2: Mid Hills with Lush Greenery */}
            <path fill="#4d7c0f" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,234.7C672,256,768,288,864,282.7C960,277,1056,235,1152,213.3C1248,192,1344,192,1392,192L1440,192V320H0V288Z"></path>

            {/* Layer 3: Foreground Fields (Mustard/Sarson & Greenery) - Clean No Dirt */}
            <path fill="#65a30d" fillOpacity="1" d="M0,320L60,304C120,288,240,256,360,250.7C480,245,600,267,720,282.7C840,299,960,309,1080,309.3C1200,309,1320,299,1380,293.3L1440,288V320H0V320Z"></path>
            
            {/* Mustard Flowers (Yellow Dots) */}
            <g fill="#eab308" opacity="0.8">
               <circle cx="50" cy="310" r="3" />
               <circle cx="80" cy="290" r="2" />
               <circle cx="150" cy="300" r="4" />
               <circle cx="200" cy="280" r="3" />
               <circle cx="250" cy="315" r="3" />
               <circle cx="350" cy="270" r="4" />
               <circle cx="450" cy="290" r="5" />
               <circle cx="650" cy="310" r="4" />
               <circle cx="950" cy="315" r="3" />
               <circle cx="1150" cy="310" r="3" />
               <circle cx="1250" cy="305" r="5" />
               <circle cx="1350" cy="300" r="4" />
            </g>

            {/* ROW OF WOODEN FENCE GATES - Light Brown */}
            <g transform="translate(0, 265)">
               {/* Posts repeating every 115px */}
               {Array.from({ length: 14 }).map((_, i) => (
                 <g key={i} transform={`translate(${i * 115 - 40}, 0)`}>
                    {/* Post */}
                    <rect x="0" y="0" width="10" height="55" fill="#B45309" rx="1" />
                    {/* Horizontal Rails connecting to next post */}
                    <rect x="10" y="15" width="105" height="6" fill="#D97706" />
                    <rect x="10" y="35" width="105" height="6" fill="#D97706" />
                    {/* Cross bar detail */}
                    <path d="M10,18 L115,38" stroke="#D97706" strokeWidth="3" opacity="0.6" />
                 </g>
               ))}
               
               {/* Center Gate Feature (Larger/Distinct) */}
               <g transform="translate(650, -10)">
                  {/* Left Main Post */}
                  <rect x="0" y="0" width="14" height="70" fill="#92400E" rx="2" />
                  {/* Right Main Post */}
                  <rect x="140" y="0" width="14" height="70" fill="#92400E" rx="2" />
                  
                  {/* Gate Door */}
                  <rect x="14" y="10" width="126" height="50" fill="none" stroke="#B45309" strokeWidth="2" />
                  <rect x="14" y="20" width="126" height="8" fill="#F59E0B" /> {/* Light Brown/Amber */}
                  <rect x="14" y="45" width="126" height="8" fill="#F59E0B" />
                  <path d="M20,24 L134,49" stroke="#B45309" strokeWidth="4" />
                  <path d="M20,49 L134,24" stroke="#B45309" strokeWidth="4" />
               </g>
            </g>
          </svg>
        </div>
      </div>

      {/* BODY SECTION (HOW IT WORKS) */}
      <div className="relative -mt-1 z-20 h-16 md:h-24 w-full overflow-hidden bg-[#FDFBF7]">
         {/* This spacer helps blend the SVG above with the body background */}
      </div>

      <div ref={featuresRef} className="pb-12 md:pb-24 pt-4 px-4 md:px-6 bg-[#FDFBF7] relative z-20 overflow-hidden">
        
        {/* Organic Blobs */}
        <div className="absolute top-20 left-10 w-72 md:w-96 h-72 md:h-96 bg-[#d9f99d]/30 rounded-full blur-[60px] md:blur-[80px] -z-10 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 md:w-96 h-72 md:h-96 bg-[#fed7aa]/30 rounded-full blur-[60px] md:blur-[80px] -z-10 animate-blob" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          
          <div className="text-center mb-12 md:mb-20 relative z-10">
            <div className="inline-block mb-3 bg-[#fef3c7] text-[#92400e] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-[#fde68a]">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#14532d] mb-4 md:mb-6">How it Works</h2>
            <div className="w-16 md:w-24 h-1.5 bg-gradient-to-r from-[#65a30d] to-[#15803d] mx-auto rounded-full mb-4 md:mb-6"></div>
            <p className="text-[#57534e] text-base md:text-lg max-w-2xl mx-auto">
              Blending nature's wisdom with modern AI.
            </p>
          </div>

          {/* Desktop Connecting String */}
          <div className="hidden md:block absolute top-[280px] left-0 w-full h-32 -z-1 opacity-60 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none">
                {/* Wavy Path */}
                <path 
                  id="stringPath"
                  d="M 166,60 C 266,20 400,100 500,60 C 600,20 733,100 833,60" 
                  fill="none" 
                  stroke="#d6d3d1" 
                  strokeWidth="3" 
                  strokeDasharray="12 12"
                  strokeLinecap="round"
                />
                {/* Moving Dot */}
                <circle r="6" fill="#ca8a04">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href="#stringPath" />
                  </animateMotion>
                </circle>
             </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {/* Step 1 */}
            <div className="relative p-8 md:p-10 rounded-[2rem] bg-white border border-[#e7e5e4] shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 group overflow-hidden opacity-0 animate-fade-up delay-100 cursor-default">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffedd5] rounded-bl-[100%] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#ffedd5] rounded-2xl rotate-3 flex items-center justify-center mb-6 md:mb-8 group-hover:rotate-12 transition-transform">
                <Sprout className="w-8 h-8 md:w-10 md:h-10 text-[#c2410c] group-hover:animate-wiggle" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#44403c] mb-2 md:mb-3 group-hover:text-[#c2410c] transition-colors">1. Snap Photo</h3>
              <p className="text-[#78716c] leading-relaxed text-sm md:text-base">Take a photo of the affected plant or soil.</p>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 md:p-10 rounded-[2rem] bg-white border border-[#e7e5e4] shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-300 group overflow-hidden opacity-0 animate-fade-up delay-200 cursor-default">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#dcfce7] rounded-bl-[100%] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#dcfce7] rounded-2xl -rotate-2 flex items-center justify-center mb-6 md:mb-8 group-hover:-rotate-12 transition-transform">
                <Flower className="w-8 h-8 md:w-10 md:h-10 text-[#15803d] group-hover:animate-wiggle" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#44403c] mb-2 md:mb-3 group-hover:text-[#15803d] transition-colors">2. AI Diagnosis</h3>
              <p className="text-[#78716c] leading-relaxed text-sm md:text-base">Our system identifies diseases instantly.</p>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 md:p-10 rounded-[2rem] bg-white border border-[#e7e5e4] shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 group overflow-hidden opacity-0 animate-fade-up delay-300 cursor-default">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#fef9c3] rounded-bl-[100%] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#fef9c3] rounded-2xl rotate-2 flex items-center justify-center mb-6 md:mb-8 group-hover:rotate-12 transition-transform">
                <Wheat className="w-8 h-8 md:w-10 md:h-10 text-[#ca8a04] group-hover:animate-wiggle" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#44403c] mb-2 md:mb-3 group-hover:text-[#ca8a04] transition-colors">3. Get Cure</h3>
              <p className="text-[#78716c] leading-relaxed text-sm md:text-base">Receive expert steps for a healthy harvest.</p>
            </div>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div ref={teamRef} className="py-12 md:py-24 px-4 md:px-6 bg-white border-t border-[#e7e5e4] flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
             <div className="inline-block p-3 rounded-full bg-[#ecfccb] mb-4 animate-bounce">
                <Leaf className="w-6 h-6 text-[#4d7c0f]" />
             </div>
             <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#14532d] mb-4">Cultivated By</h2>
             <p className="text-[#57534e] text-base md:text-lg max-w-2xl mx-auto">
               Rooted in technology, growing for the future.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "Sakshi Tamshetti", 
                initials: "ST", 
                bg: "bg-[#fff1f2]", 
                border: "border-[#ffe4e6]", 
                text: "text-[#be123c]",
                hoverBorder: "group-hover:border-[#fda4af]",
                email: "sakshitamshetti@gmail.com"
              },
              { 
                name: "Samruddhi Kulkarni", 
                initials: "SK", 
                bg: "bg-[#f0f9ff]", 
                border: "border-[#e0f2fe]", 
                text: "text-[#0369a1]",
                hoverBorder: "group-hover:border-[#7dd3fc]"
              },
              { 
                name: "Pramila Chandanshive", 
                initials: "PC", 
                bg: "bg-[#fffbeb]", 
                border: "border-[#fef3c7]", 
                text: "text-[#b45309]",
                hoverBorder: "group-hover:border-[#fcd34d]"
              },
              { 
                name: "Rutuja Raut", 
                initials: "RR", 
                bg: "bg-[#ecfdf5]", 
                border: "border-[#d1fae5]", 
                text: "text-[#047857]",
                hoverBorder: "group-hover:border-[#6ee7b7]"
              }
            ].map((member, idx) => (
              <div key={idx} className={`rounded-[2rem] p-8 text-center ${member.bg} border-2 ${member.border} ${member.hoverBorder} hover:shadow-lg transition-all duration-300 group hover:-translate-y-2 cursor-pointer`}>
                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className={`text-xl font-bold ${member.text}`}>{member.initials}</span>
                </div>
                
                <h3 className="font-bold text-[#44403c] text-lg mb-4">{member.name}</h3>
                
                <div className="flex justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-white/60 rounded-full text-slate-400 hover:text-[#0284c7] hover:bg-white transition-all shadow-sm hover:scale-110">
                      <Linkedin size={18} />
                   </button>
                   {member.email ? (
                     <a href={`mailto:${member.email}`} className="p-2 bg-white/60 rounded-full text-slate-400 hover:text-[#e11d48] hover:bg-white transition-all shadow-sm hover:scale-110">
                        <Mail size={18} />
                     </a>
                   ) : (
                     <button className="p-2 bg-white/60 rounded-full text-slate-400 hover:text-[#e11d48] hover:bg-white transition-all shadow-sm hover:scale-110">
                        <Mail size={18} />
                     </button>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUTE FOOTER */}
      <div className="relative mt-auto">
        {/* Wave Separator */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 -mt-10 md:-mt-16 z-10">
            <svg className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#1a2e05]"></path>
            </svg>
        </div>

        <footer className="bg-[#1a2e05] text-[#ecfccb] pt-12 pb-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left">
            
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 mb-2">
                 <div className="bg-[#ecfccb] p-1.5 rounded-full">
                    <Leaf className="w-5 h-5 text-[#1a2e05]" />
                 </div>
                 <span className="font-bold text-white text-xl tracking-tight">Kisan Plant Doctor</span>
              </div>
              <p className="text-sm opacity-80 max-w-xs">Helping farmers grow better, <br/>one diagnosis at a time.</p>
            </div>

            {/* Quick Links */}
            <div className="flex gap-8 text-sm font-medium">
                <button onClick={onStart} className="hover:text-white hover:underline transition-colors">Start App</button>
                <button onClick={() => scrollTo(featuresRef)} className="hover:text-white hover:underline transition-colors">How it Works</button>
                <button onClick={() => scrollTo(teamRef)} className="hover:text-white hover:underline transition-colors">Our Team</button>
            </div>

            {/* Credits */}
            <div className="flex flex-col items-center md:items-end gap-1 text-sm">
               <div className="flex items-center gap-1.5 bg-[#ffffff]/10 px-4 py-2 rounded-full border border-[#ffffff]/10">
                  <span className="opacity-90">Grown with</span> 
                  <Heart className="w-4 h-4 text-[#ecfccb] fill-[#ecfccb] animate-pulse" />
                  <span className="opacity-90">in India</span>
               </div>
            </div>

          </div>
        </footer>
      </div>

    </div>
  );
};

export default LandingPage;
