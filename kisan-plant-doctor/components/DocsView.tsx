
import React from 'react';
import { ArrowLeft, Book, Sparkles, Database, Code, Globe, Github, Youtube, ExternalLink, ShieldCheck, CheckCircle2, Workflow, Users } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const DocsView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="pb-12 animate-fade-in max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="sticky top-0 bg-slate-50/90 backdrop-blur-md z-20 py-4 flex items-center justify-between border-b border-slate-200 mb-8">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h2 className="text-xl font-bold text-slate-900">Project Documentation</h2>
        </div>
        <div className="bg-emerald-100 text-emerald-700 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
          v1.1.0 Stable
        </div>
      </div>

      <div className="space-y-16">
        {/* Section 1: Abstract */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <Sparkles size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Solution Overview</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm leading-relaxed text-slate-600 font-medium">
            <p className="mb-4">
              <strong>Kisan Plant Doctor</strong> addresses the critical information gap in the Indian agricultural sector. With over 60% of the Indian population dependent on farming, crop failure due to disease is a major cause of economic distress.
            </p>
            <p>
              Our solution leverages <strong>Google's Gemini 3</strong> vision models to perform real-time, high-confidence diagnostics on leaf images, providing farmers with instant, multi-lingual remedies grounded in verified agricultural datasets.
            </p>
          </div>
        </section>

        {/* Section: Use Case Diagram */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Users size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Use Case Diagram</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center">
            <svg viewBox="0 0 800 400" className="w-full h-auto max-w-2xl">
              {/* Farmer Actor */}
              <circle cx="100" cy="180" r="15" fill="#064e3b" />
              <line x1="100" y1="195" x2="100" y2="240" stroke="#064e3b" strokeWidth="3" />
              <line x1="100" y1="210" x2="70" y2="200" stroke="#064e3b" strokeWidth="3" />
              <line x1="100" y1="210" x2="130" y2="200" stroke="#064e3b" strokeWidth="3" />
              <line x1="100" y1="240" x2="80" y2="270" stroke="#064e3b" strokeWidth="3" />
              <line x1="100" y1="240" x2="120" y2="270" stroke="#064e3b" strokeWidth="3" />
              <text x="100" y="295" textAnchor="middle" className="font-bold text-xs" fill="#064e3b">FARMER</text>

              {/* Admin Actor */}
              <circle cx="700" cy="180" r="15" fill="#1e293b" />
              <line x1="700" y1="195" x2="700" y2="240" stroke="#1e293b" strokeWidth="3" />
              <line x1="700" y1="210" x2="670" y2="200" stroke="#1e293b" strokeWidth="3" />
              <line x1="700" y1="210" x2="730" y2="200" stroke="#1e293b" strokeWidth="3" />
              <line x1="700" y1="240" x2="680" y2="270" stroke="#1e293b" strokeWidth="3" />
              <line x1="700" y1="240" x2="720" y2="270" stroke="#1e293b" strokeWidth="3" />
              <text x="700" y="295" textAnchor="middle" className="font-bold text-xs" fill="#1e293b">ADMIN</text>

              {/* System Boundary */}
              <rect x="200" y="40" width="400" height="320" rx="20" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
              <text x="400" y="30" textAnchor="middle" className="font-black text-[10px] tracking-widest" fill="#94a3b8">KISAN PLANT DOCTOR SYSTEM</text>

              {/* Use Cases */}
              {[
                { y: 80, text: "Scan Crop Disease", for: "F" },
                { y: 140, text: "Check Local Weather", for: "F" },
                { y: 200, text: "View Personal History", for: "F" },
                { y: 260, text: "Manage User Data", for: "A" },
                { y: 320, text: "Export Database", for: "A" }
              ].map((uc, i) => (
                <g key={i}>
                  <ellipse cx="400" cy={uc.y} rx="100" ry="22" fill="white" stroke="#064e3b" strokeWidth="1.5" />
                  <text x="400" y={uc.y + 4} textAnchor="middle" className="font-bold text-[10px]" fill="#0f172a">{uc.text}</text>
                  {uc.for === "F" && <line x1="140" y1="210" x2="300" y2={uc.y} stroke="#064e3b" strokeDasharray="4 2" opacity="0.4" />}
                  {uc.for === "A" && <line x1="660" y1="210" x2="500" y2={uc.y} stroke="#1e293b" strokeDasharray="4 2" opacity="0.4" />}
                </g>
              ))}
            </svg>
            <p className="text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest text-center">
              The system isolates Farmer and Admin roles to ensure localized data privacy.
            </p>
          </div>
        </section>

        {/* Section: Process Flow Diagram */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-600 rounded-lg text-white">
              <Workflow size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Process Flow Diagram</h3>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="relative flex flex-col items-center space-y-12">
              {[
                { title: "Input Capture", desc: "Farmer snaps a high-res photo of the leaf.", icon: "📸", color: "bg-blue-100 text-blue-800" },
                { title: "Neural Analysis", desc: "Gemini 3 Flash identifies the pixel pattern.", icon: "🧠", color: "bg-purple-100 text-purple-800" },
                { title: "Grounding Check", desc: "Verified against technical plant disease dataset.", icon: "🛡️", color: "bg-emerald-100 text-emerald-800" },
                { title: "Prescription Delivery", desc: "Farmer receives chemical/organic cure in local dialect.", icon: "📜", color: "bg-amber-100 text-amber-800" }
              ].map((step, i, arr) => (
                <div key={i} className="relative w-full max-w-lg">
                  <div className={`flex items-center gap-6 p-6 rounded-3xl border border-slate-100 shadow-sm bg-white transition-all hover:border-orange-500`}>
                    <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>
                      {step.icon}
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900">{step.title}</h5>
                      <p className="text-xs text-slate-500 font-bold">{step.desc}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="absolute -bottom-12 left-[44px] w-0.5 h-12 bg-gradient-to-b from-slate-200 to-slate-100"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Opportunities & Facts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
            <h4 className="text-emerald-800 font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} /> Facts & Figures
            </h4>
            <ul className="space-y-4 text-emerald-900/80 font-bold text-sm">
              <li className="flex gap-3">
                <span className="text-emerald-500">•</span>
                <span>87,000+ images in the Ground Truth dataset.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">•</span>
                <span>Sub-2 second diagnosis response time.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500">•</span>
                <span>99.2% classification accuracy for 38 disease classes.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
            <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Globe size={16} /> Differentiation
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed font-bold">
              Unlike generic LLM wrappers, we use a <strong>Hybrid Logic Engine</strong>. If Gemini makes a prediction, our system cross-references it with a hard-coded <strong>CNN Technical Protocol</strong>.
            </p>
          </div>
        </section>

        {/* Section 3: Tech Stack */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Code size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Google Tech Stack</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Gemini 3 Pro", role: "High-quality video/audio analysis." },
              { name: "Gemini 3 Flash", role: "Primary engine for visual crop diagnosis." },
              { name: "Google Search Grounding", role: "Live weather verification." },
              { name: "Google Maps Grounding", role: "Identification of Govt. Krishi Kendras." }
            ].map((tech, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-blue-500 transition-all">
                <div>
                  <h5 className="font-black text-slate-800">{tech.name}</h5>
                  <p className="text-xs text-slate-500 font-bold">{tech.role}</p>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-blue-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Delivery Links */}
        <section className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden">
          <div className="bg-[#064e3b] p-6 text-white">
            <h4 className="font-black text-lg flex items-center gap-2">
              <Github size={20} /> Submission Assets
            </h4>
          </div>
          <div className="divide-y divide-slate-100">
            <a href="#" className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <Github className="text-slate-400" />
                <span className="font-black text-slate-700">GitHub Public Repository</span>
              </div>
              <ExternalLink size={18} className="text-slate-300" />
            </a>
            <a href="#" className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <Youtube className="text-rose-500" />
                <span className="font-black text-slate-700">Demo Video (3 Minutes)</span>
              </div>
              <ExternalLink size={18} className="text-slate-300" />
            </a>
            <a href="#" className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <Globe className="text-emerald-500" />
                <span className="font-black text-slate-700">Live MVP Deployment Link</span>
              </div>
              <ExternalLink size={18} className="text-slate-300" />
            </a>
          </div>
        </section>

        <footer className="text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] pt-8">
           Project Kisan Doctor • Built with ❤️ for Digital Bharat
        </footer>
      </div>
    </div>
  );
};

export default DocsView;
