import { useState } from 'react';
import { apiCall } from '../utils/api';

interface AuthFormProps {
  onSuccess: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const response = await apiCall(endpoint, {
        username: form.username,
        password: form.password
      });

      console.log("✅ Server Response:", response);

      if (response && response.access_token) {
        localStorage.setItem('stockflow_token', response.access_token);
        localStorage.setItem('stockflow_username', response.username);
      }

      onSuccess();
    } catch (error: any) {
      setErrorMsg(error.message || 'Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="text-center mb-2">
          <h2 className="text-[20px] font-semibold text-slate-800">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-slate-500 text-[14px] mt-1">
            {isLogin ? 'Log in to continue to your dashboard.' : 'Sign up to start optimizing your inventory.'}
          </p>
        </div>

        {errorMsg && (
          <div className="px-4 py-3 bg-red-50/50 text-red-600 rounded-xl text-[14px] font-medium border border-red-100 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMsg}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="block text-[13px] font-semibold text-slate-600 mb-1.5 ml-1">Username</label>
            <input 
              type="text" 
              required 
              minLength={3}
              maxLength={50}
              placeholder="e.g. store_admin" 
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none transition-all duration-200 text-[15px] text-slate-800 placeholder:text-slate-400" 
            />
          </div>

          <div className="relative">
            <div className="flex justify-between items-center mb-1.5 ml-1 mr-1">
              <label className="block text-[13px] font-semibold text-slate-600">Password</label>
              {isLogin && <a href="#" className="text-[12px] text-indigo-500 hover:text-indigo-600 font-medium">Forgot?</a>}
            </div>
            <input 
              type="password" 
              required 
              minLength={6}
              placeholder="••••••••" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 rounded-2xl outline-none transition-all duration-200 text-[15px] text-slate-800 placeholder:text-slate-400" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full mt-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.2)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            isLogin ? 'Log In' : 'Create Account'
          )}
        </button>

        <div className="text-center mt-2">
          <span className="text-[14px] text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setForm({username:'', password:''}); }}
            className="text-[14px] text-slate-900 font-semibold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </form>
    </div>
  );
}