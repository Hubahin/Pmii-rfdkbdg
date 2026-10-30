import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowRight, Eye, Calendar } from 'lucide-react';
import { ArticleDetailModal } from './ArticleDetailModal';
import { api } from '../services/api';

interface NewsSectionProps {
  articles: Article[];
  onRefresh: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles, onRefresh }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = ['Semua', 'Kaderisasi', 'KOPRI', 'Opini', 'Advokasi'];

  const filtered =
    selectedCategory === 'Semua'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const handleReadArticle = async (article: Article) => {
    setActiveArticle(article);
    await api.incrementArticleView(article.id);
    onRefresh();
  };

  return (
    <section id="news" className="py-20 bg-[#0a1128] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
            UPDATE & WARTA PERGERAKAN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Kabar Berita & Opini Kader
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Informasi terkini seputar dinamika kaderisasi, wacana gender keperempuanan KOPRI, rilis advokasi, dan gagasan intelektual.
          </p>

          {/* Category Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FFC107] text-[#002B7F] font-bold shadow-sm'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 text-slate-900 group"
            >
              <div>
                {/* Modern Gambar Thumbnail di Atas */}
                <div className="relative h-52 w-full bg-[#002B7F] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={article.thumbnailUrl}
                    alt={article.title}
                    className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png';
                    }}
                  />
                  {/* Category unboxed tag on top right */}
                  <div className="absolute top-3 right-3 text-[11px] font-bold tracking-wider uppercase bg-[#FFC107] text-[#002B7F] px-2.5 py-1 rounded shadow">
                    {article.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  {/* Meta Data: Tanggal Rilis | Jumlah Views persis sesuai brief */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-700" />
                      {article.publishedAt}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">
                      |
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-blue-700" />
                      {article.views} Views
                    </span>
                  </div>

                  {/* Judul Berita Bold Warna Biru */}
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#002B7F] group-hover:text-blue-800 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Brief Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Link "Read More →" persis sesuai brief */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleReadArticle(article)}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-[#002B7F] hover:text-[#F4B400] transition-colors pt-3 border-t border-slate-100 w-full cursor-pointer"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <ArticleDetailModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
};
