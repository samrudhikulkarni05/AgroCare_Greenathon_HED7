import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, CloudRain, Sun, Wind, Droplets, MapPin, Calendar, ExternalLink, CloudSun, Search, Navigation, Sparkles, RefreshCcw, LocateFixed, CloudDrizzle, Mic, StopCircle } from 'lucide-react';
import { WeatherData } from '../types';
import { getWeatherForecast } from '../services/geminiService';
import { LANGUAGES } from '../constants';

interface WeatherViewProps {
  onBack: () => void;
  language: string;
}

const WEATHER_CACHE_KEY = 'kisan_weather_v2';
const WEATHER_LANG_KEY = 'kisan_weather_lang';
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

const WeatherView: React.FC<WeatherViewProps> = ({ onBack, language }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  // Use a ref to store the recognition instance to prevent garbage collection
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const initWeather = async () => {
      // 1. Check Cache
      const saved = localStorage.getItem(WEATHER_CACHE_KEY);
      const savedTime = localStorage.getItem(WEATHER_CACHE_KEY + '_time');
      const savedLang = localStorage.getItem(WEATHER_LANG_KEY);
      
      const isStale = !savedTime || (Date.now() - parseInt(savedTime) > CACHE_EXPIRY);
      const isDifferentLang = savedLang !== language;

      if (saved && !isStale && !isDifferentLang) {
        setWeather(JSON.parse(saved));
        setLoading(false);
      } else {
        // Stop loading immediately to ask user for location (No Auto-Detect)
        setLoading(false);
      }
    };

    initWeather();
    
    // Cleanup recognition on unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  const detectLocation = () => {
    setLoading(true);
    setError(null);
    setIsSyncing(true);

    if (!navigator.geolocation) {
       setError("GPS not supported. Please search by name.");
       setLoading(false);
       setIsSyncing(false);
       return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await getWeatherForecast({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          }, language);
          saveAndSetWeather(data);
        } catch (err) {
           console.error("GPS Weather Fetch failed", err);
           setError("Could not get weather for this location. Try searching.");
           setLoading(false);
           setIsSyncing(false);
        }
      },
      (err) => {
         console.warn("Geolocation denied or failed", err);
         let msg = "Location permission needed.";
         if (err.code === 1) msg = "Please allow location access or search below.";
         else if (err.code === 2) msg = "Location unavailable. Try searching.";
         else if (err.code === 3) msg = "Location request timed out. Try searching.";
         
         setError(msg);
         setLoading(false);
         setIsSyncing(false);
      },
      { 
        timeout: 10000, 
        enableHighAccuracy: false, // Use Coarse location for speed
        maximumAge: 300000 
      }
    );
  };

  const saveAndSetWeather = (data: WeatherData) => {
    setWeather(data);
    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(WEATHER_CACHE_KEY + '_time', Date.now().toString());
    localStorage.setItem(WEATHER_LANG_KEY, language);
    setLoading(false);
    setIsSyncing(false);
    setError(null);
  };

  const handleManualSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherForecast({ query: searchQuery }, language);
      saveAndSetWeather(data);
      setSearchQuery('');
    } catch (err) {
      setError("Location not found. Please check spelling.");
      setLoading(false);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      // Abort any previous instance
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      
      const langCode = LANGUAGES.find(l => l.name === language)?.code || 'en';
      recognition.lang = langCode + '-IN'; 
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setError(null);

      recognition.onstart = () => setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'network') {
          setError("Internet connection needed for voice.");
        } else if (event.error === 'not-allowed') {
          setError("Microphone permission denied.");
        } else if (event.error === 'no-speech') {
          setError("Didn't hear anything. Try again.");
        } else {
          setError("Voice input failed. Please type.");
        }
      };

      recognition.onend = () => setIsListening(false);

      try {
        recognition.start();
      } catch (e) {
        console.error("Failed to start recognition:", e);
        setIsListening(false);
      }
    } else {
      setError("Voice input not supported in this browser.");
    }
  };

  const handleVoiceInput = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      startListening();
    }
  };

  // State: Loading (Only when actively fetching)
  if (loading && !weather) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fade-in">
        <div className="relative mb-6">
           <div className="absolute inset-0 bg-amber-200 blur-xl rounded-full opacity-50 animate-pulse"></div>
           <CloudSun className="text-amber-500 relative z-10" size={64} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Fetching Weather...</h3>
        <p className="text-sm text-slate-500">Connecting to satellite...</p>
      </div>
    );
  }

  // State: Input Screen (Default when no weather data)
  if (!weather) {
    return (
       <div className="h-screen flex flex-col p-6 animate-fade-in bg-slate-50">
          <button onClick={onBack} className="self-start p-2 hover:bg-slate-200 rounded-full mb-8">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center border border-slate-100 w-full relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full blur-2xl opacity-50"></div>
                
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                   <MapPin className="text-green-600" size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2 relative z-10">Kisan Weather</h3>
                <p className="text-slate-500 mb-8 font-medium leading-relaxed text-sm relative z-10">
                   Where is your farm located?
                </p>

                {error && (
                  <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 text-left animate-pulse">
                    <div className="w-1 h-8 bg-red-400 rounded-full flex-shrink-0"></div>
                    {error}
                  </div>
                )}

                <form onSubmit={handleManualSearch} className="mb-6">
                  <div className={`flex items-center gap-2 bg-slate-50 border-2 rounded-2xl px-4 py-3 transition-all ${isListening ? 'border-red-400 ring-4 ring-red-100' : 'border-slate-200 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100'}`}>
                     <Search size={20} className="text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Type or Speak Village..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="bg-transparent w-full outline-none text-slate-800 font-bold placeholder:font-normal placeholder:text-slate-400 text-lg"
                     />
                     <button 
                       type="button" 
                       onClick={handleVoiceInput}
                       className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                     >
                       {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
                     </button>
                  </div>
                  <button type="submit" disabled={!searchQuery.trim()} className="mt-4 w-full bg-green-700 text-white py-4 rounded-2xl font-black text-sm hover:bg-green-800 transition-all shadow-lg shadow-green-700/20 disabled:opacity-50 active:scale-95">
                     Check Weather
                  </button>
                </form>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or</span></div>
                </div>

                <button 
                   onClick={detectLocation}
                   className="w-full bg-slate-50 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-slate-200"
                >
                   <LocateFixed size={18} />
                   Use GPS Location
                </button>
             </div>
          </div>
       </div>
    );
  }

  // State: Weather Display
  return (
    <div className="pb-10 animate-fade-in px-1">
      {/* Dynamic Header */}
      <div className="sticky top-0 bg-slate-50/90 backdrop-blur-md z-20 py-4 flex items-center justify-between border-b border-slate-200 mb-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800">Weather</h2>
              {isSyncing && (
                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full animate-pulse font-bold">
                  <RefreshCcw size={10} className="animate-spin" /> LIVE
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-500 flex items-center gap-1">
              <MapPin size={10} /> {weather.location}
            </p>
          </div>
        </div>
        <button onClick={detectLocation} className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Update Location">
          <Navigation size={20} />
        </button>
      </div>

      {/* Manual Search Bar (Compact in View Mode) */}
      <div className="mb-6">
        <form onSubmit={handleManualSearch} className="flex gap-2">
          <div className={`relative flex-1 bg-white border-2 border-slate-200 rounded-xl px-3 py-2 flex items-center transition-all ${isListening ? 'border-red-400' : 'focus-within:border-green-500'}`}>
            <Search className="text-slate-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Change Village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-slate-800 text-sm font-semibold"
            />
            <button 
              type="button" 
              onClick={handleVoiceInput}
              className={`p-1.5 rounded-full ml-1 ${isListening ? 'bg-red-500 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              {isListening ? <StopCircle size={14} /> : <Mic size={14} />}
            </button>
          </div>
          <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-black transition-all">
            Go
          </button>
        </form>
        {error && <p className="text-red-500 text-[10px] mt-2 ml-2 font-bold">{error}</p>}
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-[2rem] p-6 text-white shadow-xl mb-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-10">
          <CloudSun size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-pulse' : 'bg-green-400'}`}></span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                  {isSyncing ? 'Updating Data...' : 'Live Satellite Data'}
                </span>
             </div>
             <a href={weather.map_url} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <ExternalLink size={16} className="text-white" />
             </a>
          </div>

          <div className="flex items-center gap-5 mb-6">
            <h3 className="text-6xl font-black tracking-tighter">{weather.current_temp}</h3>
            <div>
              <p className="text-lg font-bold leading-tight">{weather.condition}</p>
              <p className="text-green-200 text-[10px] font-medium uppercase mt-1 flex items-center gap-1">
                <MapPin size={10} /> {weather.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10 flex flex-col items-center justify-center text-center">
              <Droplets size={16} className="text-blue-300 mb-1" />
              <p className="text-[9px] text-green-100 uppercase font-bold opacity-70">Humidity</p>
              <p className="text-sm font-bold">{weather.humidity}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10 flex flex-col items-center justify-center text-center">
              <CloudDrizzle size={16} className="text-cyan-300 mb-1" />
              <p className="text-[9px] text-green-100 uppercase font-bold opacity-70">Rain</p>
              <p className="text-sm font-bold">{weather.precipitation || '0%'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10 flex flex-col items-center justify-center text-center">
              <Wind size={16} className="text-green-300 mb-1" />
              <p className="text-[9px] text-green-100 uppercase font-bold opacity-70">Wind</p>
              <p className="text-sm font-bold">{weather.wind_speed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advice Box */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 flex gap-3 shadow-sm">
        <div className="bg-amber-100 p-2 rounded-full h-fit flex-shrink-0">
           <Sparkles className="text-amber-600" size={18} />
        </div>
        <div>
           <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Farming Tip</h4>
           <p className="text-amber-900 text-sm leading-relaxed font-bold">
             "{weather.agri_advice}"
           </p>
        </div>
      </div>

      {/* Forecast */}
      <div className="mb-8">
        <h4 className="text-slate-800 font-bold text-sm mb-4 px-1 flex justify-between items-center">
          <span>Next 5 Days</span>
          <Calendar size={14} className="text-slate-400" />
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl p-2 text-center shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{day.day}</p>
              <div className="flex justify-center my-1">
                {day.condition.toLowerCase().includes('rain') ? <CloudRain size={16} className="text-blue-500" /> : <Sun size={16} className="text-amber-500" />}
              </div>
              <p className="text-xs font-black text-slate-800">{day.temp}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center pb-8">
        <a href={weather.map_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-green-700 hover:text-green-800 hover:underline">
            Open in Google Maps <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

export default WeatherView;