import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onExploreDownloads: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreDownloads }) => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#002B7F] via-[#091b40] to-[#0a1128] text-white"
    >
      {/* Background Subtle Geometric Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#002B7F] rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#FFC107] rounded-full blur-3xl opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Lead Tag / Kicker (Text unboxed) */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FFC107]">
              <span>Taqwa, Intelektual, Profesional</span>
              <span aria-hidden="true">·</span>
              <span>Ahlussunnah wal Jama'ah</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Upgrade Your Knowledge and Skills with{' '}
              <span className="text-[#FFC107] underline decoration-[#FFC107]/40 underline-offset-4">
                PMII
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We are Indonesian Moslem Student Movement - Rayon Fakultas Dakwah dan Komunikasi UIN Sunan Gunung Djati Cabang Kota Bandung
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Primary Yellow Capsule CTA */}
              <button
                onClick={onGetStarted}
                className="px-8 py-3.5 bg-[#FFC107] hover:bg-[#F4B400] text-[#002B7F] font-extrabold text-sm sm:text-base rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#FFC107]/20 flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 text-[#002B7F]" />
              </button>

              {/* Secondary Clean Action */}
              <button
                onClick={onExploreDownloads}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm sm:text-base rounded-full border border-white/20 transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#FFC107]" />
                <span>Unduh Modul & Dokumen</span>
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                  1960
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Berdiri Sejak 17 April</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-[#FFC107] font-mono tabular-nums">
                  5 Jurusan
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Komunikasi & Dakwah</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tabular-nums">
                  1.000+
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Kader & Alumni Aktif</div>
              </div>
            </div>
          </div>

          {/* Right Column: Character Illustration Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#FFC107]/40 via-blue-500/20 to-transparent rounded-3xl blur-lg opacity-75" />

              <div className="relative bg-[#002B7F]/80 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
                {/* Official Character Image */}
                <div className="relative w-full flex items-center justify-center py-2">
                  <img
                    src="/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png"
                    alt="Sahabat & Sahabati PMII Rayon FDK"
                    className="w-full max-w-[320px] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Character Badges / Titles */}
                <div className="w-full mt-4 pt-4 border-t border-white/15 flex items-center justify-around">
                  <div className="flex flex-col items-center">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#FFC107]">
                      Sahabat PMII
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">Intelektual & Kritis</span>
                  </div>
                  <div className="h-8 w-px bg-white/20" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#FFC107]">
                      Sahabati PMII
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">KOPRI Berdaya</span>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-300 italic">
                  "Dzikir, Fikir, dan Amal Sholeh untuk Umat & Bangsa"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
