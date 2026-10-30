import React, { useState } from 'react';
import { ArrowUp, Instagram, Music2, Mail, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await api.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#001f5c] text-white border-t border-white/15 relative">
      {/* Top Footer persis sesuai brief */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <img
              src="/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png"
              alt="Logo PMII Rayon FDK"
              className="h-14 w-auto object-contain"
            />
            <div>
              <div className="font-mono text-base sm:text-lg font-bold text-[#FFC107]">
                rayondakom2025@gmail.com
              </div>
              <p className="text-xs text-slate-300 max-w-md mt-1 leading-relaxed">
                Pergerakan Mahasiswa Islam Indonesia (PMII) Rayon Fakultas Dakwah dan Komunikasi Komisariat UIN Sunan Gunung Djati Cabang Kota Bandung.
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/pmiirayonfdk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram PMII Rayon FDK"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FFC107] hover:text-[#002B7F] text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com/@pmiirayonfdk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok PMII Rayon FDK"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FFC107] hover:text-[#002B7F] text-white transition-colors"
            >
              <Music2 className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 3 Columns as requested: Column 1 (Useful Links), Column 2 (Social Media), Column 3 (Newsletter) */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Column 1: Useful Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> Team (Struktur Pengurus)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kopri')}
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> KOPRI (Korps PMII Putri)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> Gallery Kegiatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> Contact & Sekretariat
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Social Media */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
              Social Media
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a
                  href="https://instagram.com/pmiirayonfdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> Instagram: @pmiirayonfdk
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@pmiirayonfdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> TikTok: @pmiirayonfdk
                </a>
              </li>
              <li>
                <a
                  href="mailto:rayondakom2025@gmail.com"
                  className="hover:text-[#FFC107] transition-colors flex items-center gap-1.5 font-mono text-xs"
                >
                  <span className="text-[#FFC107] font-bold">&gt;</span> Email: rayondakom2025@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
              Newsletter
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dapatkan buletin pergerakan, jadwal kajian dakwah, serta rilis berkas kaderisasi langsung ke inbox Anda.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Terima kasih! Email Anda telah terdaftar.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan alamat email..."
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-2 bg-[#FFC107] text-[#002B7F] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#F4B400] transition-colors cursor-pointer"
                >
                  {loading ? 'Mendaftarkan...' : 'Langganan Sekarang'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Floating Back-To-Top Button */}
      <div className="border-t border-white/10 bg-[#001742] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} PMII Rayon Fakultas Dakwah dan Komunikasi UIN SGD Bandung. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Dzikir, Fikir, Amal Sholeh</span>
            <span aria-hidden="true">·</span>
            <span>Kota Bandung</span>
          </div>
        </div>
      </div>

      {/* Floating Back-To-Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="fixed bottom-6 right-6 z-40 p-3 bg-[#FFC107] text-[#002B7F] hover:bg-[#F4B400] rounded-full shadow-2xl transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5 text-[#002B7F] font-bold" />
      </button>
    </footer>
  );
};
