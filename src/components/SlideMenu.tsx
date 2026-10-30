import React from 'react';
import {
  X,
  Home,
  Info,
  Target,
  Sparkles,
  Users,
  Image,
  Newspaper,
  FileDown,
  Mail,
  LogIn,
  Shield,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SlideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const SlideMenu: React.FC<SlideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const { isAuthenticated, user, setIsLoginModalOpen, setIsAdminOpen, logout } = useAuth();

  if (!isOpen) return null;

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, desc: 'Beranda Utama Organisasi' },
    { id: 'about', label: 'About', icon: Info, desc: 'Profil PMII & Rayon FDK' },
    { id: 'mission', label: 'Mission', icon: Target, desc: 'Tri Moto, Tri Komitmen & Tri Khidmat' },
    { id: 'kopri', label: 'KOPRI', icon: Sparkles, desc: 'Profil & Kegiatan Korps PMII Putri', highlight: true },
    { id: 'gallery', label: 'Gallery', icon: Image, desc: 'Dokumentasi Aksi & Pengkaderan' },
    { id: 'team', label: 'Team', icon: Users, desc: 'Struktur Pengurus Rayon & KOPRI' },
    { id: 'news', label: 'Update', icon: Newspaper, desc: 'Berita Terkini & Esai Opini' },
    { id: 'downloads', label: 'File Download', icon: FileDown, desc: 'AD/ART, Modul MAPABA & Berkas' },
    { id: 'contact', label: 'Contact', icon: Mail, desc: 'Sekretariat & Hubungi Kami' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide Drawer Content */}
      <div className="relative w-full max-w-md bg-[#002B7F] text-white h-full overflow-y-auto shadow-2xl flex flex-col z-10 border-l border-white/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/15 flex items-center justify-between bg-[#0a1128]/70">
          <div className="flex items-center gap-3">
            <img
              src="/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png"
              alt="PMII FDK Logo"
              className="h-11 w-auto object-contain"
            />
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white leading-tight">
                PMII RAYON FDK
              </h2>
              <p className="text-[11px] text-[#FFC107] font-medium tracking-wide">
                UIN Sunan Gunung Djati Bandung
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Menu"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Session Bar if Logged In */}
        {isAuthenticated && (
          <div className="px-6 py-3 bg-[#FFC107]/15 border-b border-[#FFC107]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#FFC107]" />
              <span className="text-xs font-semibold text-[#FFC107]">
                Pengurus: {user?.username}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                setIsAdminOpen(true);
              }}
              className="text-xs bg-[#FFC107] text-[#002B7F] px-2.5 py-1 rounded font-bold hover:bg-[#F4B400]"
            >
              CMS Panel
            </button>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 py-4 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  item.highlight
                    ? 'bg-gradient-to-r from-amber-500/20 to-transparent border border-[#FFC107]/30 hover:border-[#FFC107]'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2 rounded-lg ${
                      item.highlight
                        ? 'bg-[#FFC107] text-[#002B7F]'
                        : 'bg-white/10 text-white group-hover:bg-[#FFC107] group-hover:text-[#002B7F] transition-colors'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm tracking-wide text-white group-hover:text-[#FFC107] transition-colors flex items-center gap-2">
                      {item.label}
                      {item.highlight && (
                        <span className="text-[10px] uppercase font-bold bg-[#FFC107] text-[#002B7F] px-1.5 py-0.5 rounded">
                          Khusus
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300 line-clamp-1">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-[#FFC107] group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}

          <div className="pt-4 border-t border-white/10">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/20 text-red-200 border border-red-500/30 font-semibold text-sm hover:bg-red-500/30 transition-colors"
              >
                Logout Pengurus
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#FFC107] text-[#002B7F] font-bold text-sm hover:bg-[#F4B400] transition-colors shadow-md"
              >
                <LogIn className="w-4 h-4" />
                Login Pengurus
              </button>
            )}
          </div>
        </div>

        {/* Footer info inside Drawer */}
        <div className="p-6 bg-[#0a1128]/80 border-t border-white/10 text-xs text-slate-300">
          <p className="font-semibold text-white">Sekretariat PMII Rayon FDK</p>
          <p className="mt-1 text-slate-400">
            Jl. A.H. Nasution No. 105, Cibiru, Kota Bandung, Jawa Barat
          </p>
          <div className="mt-3 flex items-center gap-4 text-slate-300">
            <a
              href="https://instagram.com/pmiirayonfdk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FFC107] transition-colors"
            >
              Instagram
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://tiktok.com/@pmiirayonfdk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FFC107] transition-colors"
            >
              TikTok
            </a>
            <span className="text-white/20">|</span>
            <span className="text-slate-400">rayondakom2025@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
