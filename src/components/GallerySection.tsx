import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image as ImageIcon, X, Calendar, Tag } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Kaderisasi', 'KOPRI', 'Keagamaan', 'Diskusi', 'Aksi & Advokasi'];

  const filtered =
    activeCategory === 'Semua'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-[#070d1e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
            DOKUMENTASI KEGIATAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Galeri Rekam Jejak Rayon
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Momen historis pengkaderan MAPABA, Sekolah Islam Gender, kajian literasi dakwah, dan khidmat sosial.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#FFC107] text-[#002B7F] font-bold shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative bg-[#002B7F]/40 border border-white/10 rounded-2xl overflow-hidden hover:border-[#FFC107]/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="h-60 w-full bg-[#001f5c] p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png';
                  }}
                />
              </div>

              <div className="p-5 bg-[#001c52]">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-[#FFC107] font-semibold">{item.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#FFC107] transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          />
          <div className="relative bg-[#002B7F] text-white border border-white/20 rounded-2xl max-w-2xl w-full p-6 shadow-2xl z-10">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-72 w-full bg-black/40 rounded-xl overflow-hidden flex items-center justify-center p-4 mb-4">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="text-xs font-mono text-[#FFC107] mb-1">
              {selectedPhoto.category} · {selectedPhoto.date}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{selectedPhoto.title}</h3>
            <p className="text-sm text-slate-200 leading-relaxed">{selectedPhoto.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};
