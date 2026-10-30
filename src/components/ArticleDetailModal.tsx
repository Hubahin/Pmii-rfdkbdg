import React from 'react';
import { Article } from '../types';
import { X, Calendar, Eye, User, Share2, Bookmark } from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#002B7F] text-white border border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header Bar */}
        <div className="sticky top-0 bg-[#002B7F]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between z-20">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFC107]">
            {article.category} · Portal Berita PMII FDK
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Hero inside modal */}
        <div className="relative w-full h-64 sm:h-80 bg-black/40 overflow-hidden flex items-center justify-center">
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png';
            }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata: Tanggal Rilis | Jumlah Views */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FFC107]" />
              {article.publishedAt}
            </span>
            <span aria-hidden="true">|</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#FFC107]" />
              {article.views} views
            </span>
            <span aria-hidden="true">|</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FFC107]" />
              {article.author}
            </span>
          </div>

          {/* Judul Berita */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>

          {/* Lead Summary */}
          <p className="text-base text-slate-200 font-medium italic border-l-2 border-[#FFC107] pl-4 py-1">
            {article.summary}
          </p>

          {/* Full Content */}
          <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-4 whitespace-pre-line text-justify">
            {article.content}
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-slate-400">
            <div>Redaksi: Biro Media & Infokom PMII Rayon FDK</div>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Tautan artikel berhasil disalin!');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
