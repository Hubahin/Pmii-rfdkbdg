import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Instagram, Music2, Shield, Users, Sparkles, ExternalLink } from 'lucide-react';

interface TeamSectionProps {
  team: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  const [filter, setFilter] = useState<'all' | 'bph' | 'kopri' | 'biro'>('all');

  const bphMembers = team.filter((m) => m.category === 'bph');
  const kopriMembers = team.filter((m) => m.category === 'kopri');
  const biroMembers = team.filter((m) => m.category === 'biro');

  const filteredMembers =
    filter === 'all'
      ? team
      : filter === 'bph'
      ? bphMembers
      : filter === 'kopri'
      ? kopriMembers
      : biroMembers;

  const renderCard = (member: TeamMember) => {
    return (
      <div
        key={member.id}
        className="group relative bg-[#002B7F]/60 border border-white/15 rounded-2xl overflow-hidden hover:border-[#FFC107] transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
      >
        {/* Poster Top Banner with PMII Decorative Accent */}
        <div className="relative h-64 w-full bg-gradient-to-b from-[#002B7F] via-[#091b42] to-[#0a1128] overflow-hidden flex items-center justify-center p-4">
          {/* Subtle PMII Pattern / 9-Stars Background Watermark */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFC107_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Corner Period Badge */}
          <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-[#FFC107] bg-black/40 border border-[#FFC107]/30 px-2 py-0.5 rounded">
            {member.period}
          </div>

          {/* Member Photo Frame with PMII Poster Styling */}
          <div className="relative z-10 w-44 h-48 rounded-xl overflow-hidden flex items-center justify-center border-2 border-white/20 group-hover:border-[#FFC107] transition-colors bg-[#002B7F]/40 shadow-inner">
            <img
              src={member.photoUrl || '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png'}
              alt={member.name}
              className="w-full h-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // fallback to character
                (e.target as HTMLImageElement).src = '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png';
              }}
            />
          </div>
        </div>

        {/* Banner Nama Lengkap Pengurus (Bold Biru) & Jabatan (Italic) */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-[#002060]">
          <div>
            {/* Division Tag */}
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FFC107] block mb-1">
              {member.subCategory || 'Pengurus Rayon'}
            </span>

            {/* Nama Banner (Bold Biru) */}
            <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-[#FFC107] transition-colors leading-snug">
              {member.name}
            </h3>

            {/* Jabatan (Italic) */}
            <p className="text-xs sm:text-sm italic text-slate-300 font-medium mt-1">
              {member.role}
            </p>
          </div>

          {/* Social Media Links (Instagram & TikTok) */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">Media Sosial:</span>
            <div className="flex items-center gap-3">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${member.name}`}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#002B7F] text-slate-200 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {member.tiktok && (
                <a
                  href={member.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`TikTok ${member.name}`}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#002B7F] text-slate-200 transition-colors"
                >
                  <Music2 className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="team" className="py-20 bg-[#0a1128] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sub-header & Judul Utama persis sesuai brief */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
            STRUKTUR
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">
            PMII RAYON FDK & KOPRI PERIODE 2026-2027
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Komposisi Badan Pengurus Harian Rayon, Pengurus KOPRI Mahbub, dan Biro Pengembangan Organisasi
          </p>

          {/* Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'Semua Pengurus' },
              { id: 'bph', label: 'BPH Rayon FDK' },
              { id: 'kopri', label: 'Badan Pengurus KOPRI' },
              { id: 'biro', label: 'Biro-Biro Rayon' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#FFC107] text-[#002B7F] shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => renderCard(member))}
        </div>

        {/* Pemisah / Section Khusus untuk Badan Pengurus KOPRI Rayon FDK */}
        {filter === 'all' && (
          <div className="mt-20 pt-16 border-t border-pink-400/30">
            <div className="bg-gradient-to-r from-pink-950/40 via-[#002B7F]/40 to-pink-950/40 border border-pink-400/30 rounded-3xl p-6 sm:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-pink-400/20">
                <div className="flex items-center gap-4 text-center md:text-left">
                  <img
                    src="/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png"
                    alt="KOPRI FDK Logo"
                    className="h-16 w-auto object-contain"
                  />
                  <div>
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-wider block">
                      Section Khusus
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      Badan Pengurus KOPRI Rayon FDK 2026-2027
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Mengemban mandat kepemimpinan keperempuanan dan keadilan gender Islam.
                    </p>
                  </div>
                </div>

                <div className="text-xs font-medium text-pink-200 bg-pink-500/20 border border-pink-400/30 px-3 py-1.5 rounded-xl">
                  KOPRI Mahbub FDK
                </div>
              </div>

              {/* Grid khusus KOPRI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kopriMembers.map((member) => renderCard(member))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
