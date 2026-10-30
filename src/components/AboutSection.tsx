import React from 'react';
import { AboutContent } from '../types';
import { Compass, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  about: AboutContent;
  onExploreKopri: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about, onExploreKopri }) => {
  return (
    <section id="about" className="py-20 bg-[#0a1128] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-bold tracking-widest text-[#FFC107] uppercase">
            Mengenal Organisasi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pergerakan Mahasiswa Islam Indonesia
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Rayon Fakultas Dakwah dan Komunikasi Komisariat UIN Sunan Gunung Djati Cabang Kota Bandung
          </p>
        </div>

        {/* Top Split: Deskripsi PMII & Tujuan PMII */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Deskripsi Sejarah PMII */}
          <div className="lg:col-span-7 bg-[#002B7F]/40 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-[#FFC107] text-[#002B7F] rounded-xl font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Tentang PMII & Landasan Gerakan</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed text-justify">
                {about.pmiiDescription}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <span className="font-bold text-white block">Manhaj Al-Fikr:</span>
                Ahlussunnah wal Jama’ah (Aswaja)
              </div>
              <div>
                <span className="font-bold text-white block">Landasan Moral:</span>
                Nilai Dasar Pergerakan (NDP)
              </div>
            </div>
          </div>

          {/* Tujuan PMII (Pasal 4 AD PMII) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#002B7F] to-[#0a1b42] border border-[#FFC107]/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-[#FFC107] text-[#002B7F] rounded-xl font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Tujuan PMII</h3>
              </div>
              <p className="text-xs text-[#FFC107] font-semibold uppercase tracking-wider mb-2">
                Pasal 4 Anggaran Dasar (AD) PMII
              </p>
              <blockquote className="text-slate-100 text-base sm:text-lg italic font-medium leading-relaxed border-l-2 border-[#FFC107] pl-4">
                "{about.pmiiPurpose}"
              </blockquote>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 text-xs text-slate-300 flex items-center justify-between">
              <span>Orientasi Kader</span>
              <span className="font-semibold text-[#FFC107]">Intelektual & Berintegritas</span>
            </div>
          </div>
        </div>

        {/* Middle: Visi & Misi Rayon FDK */}
        <div className="bg-[#002B7F]/30 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-[#FFC107] uppercase tracking-wider">
              Arah Strategis Rayon
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Visi Rayon Fakultas Dakwah dan Komunikasi
            </h3>
            <p className="text-slate-200 mt-3 text-base leading-relaxed">
              {about.rayonFdkVision}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">
              Misi Pengembangan Rayon FDK:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {about.rayonFdkMissions.map((mission, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/15 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FFC107] shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-200 leading-snug">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profil Khusus KOPRI (Korps PMII Putri) */}
        <div className="bg-gradient-to-r from-[#002B7F]/60 via-[#1e1e4a]/60 to-[#002B7F]/60 border border-pink-400/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* KOPRI Emblem Logo */}
            <div className="md:col-span-3 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-pink-500/20 rounded-full blur-md opacity-75" />
                <img
                  src="/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png"
                  alt="Logo KOPRI Rayon FDK"
                  className="relative h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* KOPRI Text & Button */}
            <div className="md:col-span-9 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-300">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Korps PMII Putri (KOPRI) Mahbub Rayon FDK</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Kepemimpinan & Keadilan Gender Islam
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                {about.kopriBrief}
              </p>
              <div>
                <button
                  onClick={onExploreKopri}
                  className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Pelajari Profil & Program KOPRI Selengkapnya →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
