import React from 'react';
import { AboutContent } from '../types';
import { Flame, Shield, HeartHandshake } from 'lucide-react';

interface MissionSectionProps {
  about: AboutContent;
}

export const MissionSection: React.FC<MissionSectionProps> = ({ about }) => {
  return (
    <section id="mission" className="py-20 bg-[#070d1e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-bold tracking-widest text-[#FFC107] uppercase">
            Fondasi Gerakan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Doktrin & Khidmat Pergerakan
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Tiga pilar doktrinal yang menjiwai setiap denyut kader PMII dalam berfikir, bersikap, dan bertindak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tri Moto */}
          <div className="bg-[#002B7F]/40 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#FFC107]/40 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#FFC107] text-[#002B7F] rounded-xl font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#FFC107] font-bold block">
                    Pilar Pertama
                  </span>
                  <h3 className="text-xl font-bold text-white">Tri Moto PMII</h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Pedoman spiritual dan intelektual kader dalam meniti jalan pengabdian.
              </p>

              <div className="space-y-4">
                {about.triMoto.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#FFC107] pl-3 py-1">
                    <h4 className="text-sm font-bold text-[#FFC107]">{item.title}</h4>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400">
              Prinsip Keseimbangan Nalar & Ruhani
            </div>
          </div>

          {/* Tri Komitmen */}
          <div className="bg-[#002B7F]/40 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#FFC107]/40 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#FFC107] text-[#002B7F] rounded-xl font-bold">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#FFC107] font-bold block">
                    Pilar Kedua
                  </span>
                  <h3 className="text-xl font-bold text-white">Tri Komitmen</h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Keteguhan moral dalam memperjuangkan keadilan sosial dan kebenaran.
              </p>

              <div className="space-y-4">
                {about.triKomitmen.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-amber-400 pl-3 py-1">
                    <h4 className="text-sm font-bold text-[#FFC107]">{item.title}</h4>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400">
              Integritas Keberpihakan Sosial
            </div>
          </div>

          {/* Tri Khidmat */}
          <div className="bg-[#002B7F]/40 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#FFC107]/40 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[#FFC107] text-[#002B7F] rounded-xl font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#FFC107] font-bold block">
                    Pilar Ketiga
                  </span>
                  <h3 className="text-xl font-bold text-white">Tri Khidmat</h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-6">
                Arah pengabdian tanpa batas untuk agama, bangsa, dan marwah organisasi.
              </p>

              <div className="space-y-4">
                {about.triKhidmat.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-sky-400 pl-3 py-1">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-400">
              Loyalitas & Dedikasi Kebangsaan
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
