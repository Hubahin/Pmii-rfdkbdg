import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, LogIn, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenSlideMenu: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSlideMenu, activeSection }) => {
  const { isAuthenticated, user, setIsLoginModalOpen, setIsAdminOpen } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'KOPRI', href: '#kopri' },
    { label: 'Team', href: '#team' },
    { label: 'Update', href: '#news' },
    { label: 'Downloads', href: '#downloads' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#002B7F]/95 backdrop-blur-md shadow-lg border-b border-[#FFC107]/20 py-3'
          : 'bg-[#002B7F] py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Zone (Left) */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-lg p-1"
          >
            <img
              src="/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png"
              alt="Logo PMII Rayon FDK"
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FFC107] transition-colors leading-none">
                PMII RAYON FDK
              </span>
              <span className="text-[11px] font-medium text-slate-300 tracking-wider uppercase mt-1 hidden sm:block">
                UIN Sunan Gunung Djati Bandung
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Zone 2) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors whitespace-nowrap py-1 relative ${
                  activeSection === item.href.slice(1)
                    ? 'text-[#FFC107]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC107] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Zone (Right): Admin Button & Hamburger */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#FFC107] text-[#002B7F] font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#F4B400] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Shield className="w-4 h-4" />
                <span>Dashboard CMS</span>
              </button>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#FFC107]/40 text-[#FFC107] hover:bg-[#FFC107]/10 font-semibold text-xs rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
              >
                <LogIn className="w-4 h-4" />
                <span>Login Pengurus</span>
              </button>
            )}

            {/* Hamburger Button (Open Slide-out Menu) */}
            <button
              onClick={onOpenSlideMenu}
              aria-label="Buka Menu Navigasi"
              className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
