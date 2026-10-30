import React from 'react';
import { KopriContent } from '../types';
import { Sparkles, Heart, BookOpen, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

interface KopriSectionProps {
  kopri: KopriContent;
  onNavigateTeam: () => void;
}

export const KopriSection: React.FC<KopriSectionProps> = ({ kopri, onNavigateTeam }) => {
  return (
    <section id="kopri" className="py-20 bg-gradient-to-b from-[#0a1128] via-[#0d1536] to-[#0a1128] text-white border-t border-white/10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC107]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Korps PMII Putri (KOPRI)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            KOPRI Mahbub Rayon FDK
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            "{kopri.tagline}"
          </p>
        </div>

        {/* Top Hero Card for KOPRI with Logo */}
        <div className="bg-[#002B7F]/40 border border-pink-400/20 rounded-3xl p-6 sm:p-10 mb-12 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo Emblem Container */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative p-4">
                <img
                  src="/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png"
                  alt="Emblem KOPRI Mahbub Rayon FDK"
                  className="h-44 sm:h-52 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="mt-3 text-xs font-bold text-pink-300 tracking-wider uppercase">
                KOPRI Mahbub Rayon Dakwah dan Komunikasi
              </span>
              <span className="text-[11px] text-slate-400">
                UIN Sunan Gunung Djati Cabang Kota Bandung
              </span>
            </div>

            {/* Profile & History Text */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Laboratorium Kepemimpinan Perempuan Nahdliyyah
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed text-justify">
                {kopri.profile}
              </p>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC107] mb-1">
                  Sejarah Singkat & Akar Perjuangan
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {kopri.history}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={onNavigateTeam}
                  className="px-5 py-2.5 bg-[#FFC107] text-[#002B7F] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#F4B400] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Lihat Pengurus KOPRI 2026-2027</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi KOPRI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Visi */}
          <div className="md:col-span-5 bg-gradient-to-br from-pink-900/30 to-[#002B7F]/40 border border-pink-400/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-2">
                Arah Cita-Cita
              </span>
              <h3 className="text-xl font-bold text-white mb-3">Visi KOPRI Rayon FDK</h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-pink-400 pl-3">
                "{kopri.vision}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
              <span>Fokus Gerakan</span>
              <span className="text-pink-300 font-semibold">Keadilan Gender Transformatif</span>
            </div>
          </div>

          {/* Misi */}
          <div className="md:col-span-7 bg-[#002B7F]/30 border border-white/10 rounded-2xl p-6 sm:p-8">
            <span className="text-xs font-bold text-[#FFC107] uppercase tracking-wider block mb-2">
              Langkah Konkret
            </span>
            <h3 className="text-xl font-bold text-white mb-4">Misi Pengkaderan & Advokasi KOPRI</h3>
            <div className="space-y-3">
              {kopri.missions.map((mission, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-pink-400 shrink-0 mt-1" />
                  <p className="text-sm text-slate-200 leading-snug">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program Unggulan KOPRI */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Program Unggulan KOPRI Mahbub FDK
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inovasi ruang bertumbuh bagi kader putri dakwah dan komunikasi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kopri.programs.map((program) => (
              <div
                key={program.id}
                className="bg-[#002B7F]/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-pink-400/40 hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-pink-300 uppercase tracking-wider">
                      {program.badge}
                    </span>
                    <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {program.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {program.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#FFC107] font-semibold">
                  KOPRI Rayon FDK
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
