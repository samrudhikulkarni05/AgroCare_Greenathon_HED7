
import React, { useState } from 'react';
import { X, User, Lock, Sprout, ArrowRight, Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '../services/dbService';
import { User as UserType } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [name, setName] = useState(''); // Only for register
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        if (!name || !username || !pin) {
          setError("Please fill all fields");
          setIsLoading(false);
          return;
        }
        const result = await registerUser(username, pin, name);
        if (result.success && result.user) {
          onLoginSuccess(result.user);
          onClose();
        } else {
          setError(result.message);
        }
      } else {
        if (!username || !pin) {
          setError("Please enter username and PIN");
          setIsLoading(false);
          return;
        }
        const result = await loginUser(username, pin);
        if (result.success && result.user) {
          onLoginSuccess(result.user);
          onClose();
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="bg-green-700 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sprout size={100} />
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold mb-1">
            {isRegistering ? 'Join Farmer Family' : 'Welcome Back'}
          </h2>
          <p className="text-green-100 text-sm">
            {isRegistering ? 'Create your secure account' : 'Login to see your history'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}

          {isRegistering && (
             <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Your Name</label>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
                <User size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ram Kumar" 
                  className="bg-transparent w-full outline-none text-slate-800"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Username / Mobile</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
              <User size={18} className="text-slate-400" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="9876543210" 
                className="bg-transparent w-full outline-none text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Security PIN</label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
              <Lock size={18} className="text-slate-400" />
              <input 
                type="password" 
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="1234" 
                className="bg-transparent w-full outline-none text-slate-800"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-700/30 hover:bg-green-800 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
               <>
                 <Loader2 size={20} className="animate-spin" />
                 Processing...
               </>
            ) : (
               <>
                 {isRegistering ? 'Register Account' : 'Login Now'}
                 <ArrowRight size={20} />
               </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-sm text-slate-600">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="font-bold text-green-700 ml-1 hover:underline"
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
