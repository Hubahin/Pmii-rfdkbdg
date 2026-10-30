import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, User, Key, ShieldCheck, AlertCircle } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(username, password);
    setLoading(false);
    if (!res.success) {
      setError(res.error || 'Username atau password salah.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsLoginModalOpen(false)}
      />

      <div className="relative bg-[#002B7F] text-white border border-[#FFC107]/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-[#FFC107] text-[#002B7F] shadow-lg mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Login Pengurus</h2>
          <p className="text-xs text-slate-300 mt-1">
            Portal Khusus Pengurus PMII Rayon FDK & KOPRI Mahbub
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
              Username Pengurus
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Contoh: admin"
                className="w-full bg-[#0a1128] border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC107]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a1128] border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC107]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFC107] hover:bg-[#F4B400] text-[#002B7F] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard CMS'}
          </button>
        </form>
      </div>
    </div>
  );
};
