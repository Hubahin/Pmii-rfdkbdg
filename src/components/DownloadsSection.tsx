import React, { useState } from 'react';
import { DownloadFile } from '../types';
import { FileText, Download, Search, CheckCircle2, FileArchive, Sparkles } from 'lucide-react';
import { api } from '../services/api';

interface DownloadsSectionProps {
  downloads: DownloadFile[];
  onRefresh: () => void;
}

export const DownloadsSection: React.FC<DownloadsSectionProps> = ({ downloads, onRefresh }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const categories = [
    'Semua',
    'Modul MAPABA',
    'Materi PKD',
    'Konstitusi & Hukum',
    'Produk Hukum KOPRI',
    'Administrasi & SK',
  ];

  const filtered = downloads.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (file: DownloadFile) => {
    await api.trackDownload(file.id);
    setDownloadSuccessId(file.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
    onRefresh();

    // Trigger fake or real download
    const link = document.createElement('a');
    link.href = file.fileUrl || '#';
    link.download = `${file.title.replace(/\s+/g, '_')}.${file.fileType.toLowerCase()}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="downloads" className="py-20 bg-[#070d1e] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
            PUSAT ARSIP & SUMBER DAYA
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Dokumen & Berkas Organisasi
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Unduh AD/ART, modul kaderisasi formal MAPABA & PKD, pedoman keperempuanan KOPRI, format administrasi, dan surat keputusan.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#002B7F]/40 border border-white/15 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FFC107] text-[#002B7F] font-bold shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama dokumen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a1128] border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFC107]"
            />
          </div>
        </div>

        {/* Document List / Table */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 text-slate-400 text-sm">
              Tidak ada dokumen yang sesuai dengan pencarian Anda.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-[#002B7F]/30 border border-white/10 hover:border-[#FFC107]/60 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* File info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/10 text-[#FFC107] shrink-0 mt-0.5">
                    {item.fileType === 'ZIP' ? (
                      <FileArchive className="w-6 h-6" />
                    ) : (
                      <FileText className="w-6 h-6" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                      <span className="text-[#FFC107] font-semibold">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Format: {item.fileType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.fileSize}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Download Action & Stats */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                  <div className="text-right text-xs text-slate-400 font-mono tabular-nums">
                    <span className="block font-bold text-white">{item.downloadCount}</span>
                    <span>unduhan</span>
                  </div>

                  <button
                    onClick={() => handleDownload(item)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                      downloadSuccessId === item.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#FFC107] text-[#002B7F] hover:bg-[#F4B400] shadow-md'
                    }`}
                  >
                    {downloadSuccessId === item.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mengunduh...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Unduh File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
