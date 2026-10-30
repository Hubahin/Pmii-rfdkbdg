import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Newspaper,
  Users,
  FileDown,
  Sparkles,
  Info,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Upload,
  Image as ImageIcon,
  Camera,
  Link as LinkIcon,
  RotateCcw
} from 'lucide-react';
import { AboutContent, Article, DownloadFile, GalleryItem, KopriContent, TeamMember } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  about: AboutContent;
  kopri: KopriContent;
  team: TeamMember[];
  articles: Article[];
  downloads: DownloadFile[];
  gallery: GalleryItem[];
  onDataChanged: () => void;
}

const PRESET_IMAGES = [
  { label: 'Karakter PMII', url: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png' },
  { label: 'Logo Rayon FDK', url: '/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png' },
  { label: 'Logo KOPRI', url: '/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  about: initialAbout,
  kopri: initialKopri,
  team: initialTeam,
  articles: initialArticles,
  downloads: initialDownloads,
  gallery: initialGallery,
  onDataChanged
}) => {
  const { isAdminOpen, setIsAdminOpen, user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'articles' | 'team' | 'downloads' | 'gallery' | 'kopri' | 'about'>('articles');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Articles state
  const [articleList, setArticleList] = useState<Article[]>(initialArticles);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Kaderisasi' as Article['category'],
    summary: '',
    content: '',
    thumbnailUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    author: 'Biro Infokom Rayon FDK',
    publishedAt: 'Oktober 2026'
  });

  // Team state
  const [teamList, setTeamList] = useState<TeamMember[]>(initialTeam);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    category: 'bph' as TeamMember['category'],
    subCategory: 'Badan Pengurus Harian',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: '',
    tiktok: '',
    order: 1
  });

  // Downloads state
  const [downloadList, setDownloadList] = useState<DownloadFile[]>(initialDownloads);
  const [editingDownload, setEditingDownload] = useState<DownloadFile | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadForm, setDownloadForm] = useState({
    title: '',
    category: 'Modul MAPABA' as DownloadFile['category'],
    fileUrl: '',
    fileSize: '2.5 MB',
    fileType: 'PDF' as DownloadFile['fileType'],
    description: ''
  });

  // Gallery state
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(initialGallery);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Kaderisasi' as GalleryItem['category'],
    imageUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    date: 'Oktober 2026',
    description: ''
  });

  // KOPRI state
  const [kopriData, setKopriData] = useState<KopriContent>(initialKopri);
  const [isKopriSaving, setIsKopriSaving] = useState(false);

  // About state
  const [aboutData, setAboutData] = useState<AboutContent>(initialAbout);
  const [isAboutSaving, setIsAboutSaving] = useState(false);

  useEffect(() => {
    setArticleList(initialArticles);
    setTeamList(initialTeam);
    setDownloadList(initialDownloads);
    setGalleryList(initialGallery);
    setKopriData(initialKopri);
    setAboutData(initialAbout);
    loadStats();
  }, [initialArticles, initialTeam, initialDownloads, initialGallery, initialKopri, initialAbout]);

  const loadStats = async () => {
    const s = await api.getStats();
    setStats(s);
  };

  const showNotify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  // Helper for processing local file uploads to Data URL
  const processImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showNotify('error', 'Ukuran foto maksimal 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSuccess(reader.result);
        showNotify('success', `Foto "${file.name}" berhasil diunggah!`);
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isAdminOpen) return null;

  // --- ARTICLE CRUD ---
  const handleOpenAddArticle = () => {
    setEditingArticle(null);
    setArticleForm({
      title: '',
      category: 'Kaderisasi',
      summary: '',
      content: '',
      thumbnailUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
      author: 'Biro Infokom Rayon FDK',
      publishedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    });
    setIsArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticle(art);
    setArticleForm({
      title: art.title,
      category: art.category,
      summary: art.summary,
      content: art.content,
      thumbnailUrl: art.thumbnailUrl,
      author: art.author,
      publishedAt: art.publishedAt
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await api.updateArticle(editingArticle.id, articleForm);
        showNotify('success', 'Berita & foto thumbnail berhasil diperbarui!');
      } else {
        await api.createArticle(articleForm);
        showNotify('success', 'Berita baru dengan foto berhasil ditambahkan!');
      }
      setIsArticleModalOpen(false);
      onDataChanged();
    } catch {
      showNotify('error', 'Gagal menyimpan artikel');
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      await api.deleteArticle(id);
      showNotify('success', 'Berita telah dihapus.');
      onDataChanged();
    }
  };

  // --- TEAM CRUD ---
  const handleOpenAddTeam = () => {
    setEditingTeam(null);
    setTeamForm({
      name: '',
      role: '',
      category: 'bph',
      subCategory: 'Badan Pengurus Harian',
      period: '2026-2027',
      photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
      instagram: 'https://instagram.com/pmiirayonfdk',
      tiktok: 'https://tiktok.com/@pmiirayonfdk',
      order: teamList.length + 1
    });
    setIsTeamModalOpen(true);
  };

  const handleOpenEditTeam = (m: TeamMember) => {
    setEditingTeam(m);
    setTeamForm({
      name: m.name,
      role: m.role,
      category: m.category,
      subCategory: m.subCategory || '',
      period: m.period,
      photoUrl: m.photoUrl,
      instagram: m.instagram || '',
      tiktok: m.tiktok || '',
      order: m.order
    });
    setIsTeamModalOpen(true);
  };

  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeam) {
        await api.updateTeamMember(editingTeam.id, teamForm);
        showNotify('success', 'Data & foto pengurus berhasil diperbarui!');
      } else {
        await api.createTeamMember(teamForm);
        showNotify('success', 'Pengurus baru dengan foto berhasil ditambahkan!');
      }
      setIsTeamModalOpen(false);
      onDataChanged();
    } catch {
      showNotify('error', 'Gagal menyimpan data pengurus');
    }
  };

  const handleDeleteTeam = async (id: string) => {
    if (confirm('Hapus anggota pengurus ini?')) {
      await api.deleteTeamMember(id);
      showNotify('success', 'Data pengurus telah dihapus.');
      onDataChanged();
    }
  };

  // --- DOWNLOAD CRUD ---
  const handleOpenAddDownload = () => {
    setEditingDownload(null);
    setDownloadForm({
      title: '',
      category: 'Modul MAPABA',
      fileUrl: 'https://pmii-dakom.org/download/berkas.pdf',
      fileSize: '3.0 MB',
      fileType: 'PDF',
      description: ''
    });
    setIsDownloadModalOpen(true);
  };

  const handleOpenEditDownload = (dl: DownloadFile) => {
    setEditingDownload(dl);
    setDownloadForm({
      title: dl.title,
      category: dl.category,
      fileUrl: dl.fileUrl,
      fileSize: dl.fileSize,
      fileType: dl.fileType,
      description: dl.description
    });
    setIsDownloadModalOpen(true);
  };

  const handleSaveDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingDownload) {
        await api.updateDownload(editingDownload.id, {
          ...downloadForm,
          uploadDate: editingDownload.uploadDate
        });
        showNotify('success', 'Dokumen unduhan diperbarui!');
      } else {
        await api.createDownload({
          ...downloadForm,
          uploadDate: new Date().toISOString().split('T')[0]
        });
        showNotify('success', 'Dokumen baru berhasil ditambahkan!');
      }
      setIsDownloadModalOpen(false);
      onDataChanged();
    } catch {
      showNotify('error', 'Gagal menyimpan berkas download');
    }
  };

  const handleDeleteDownload = async (id: string) => {
    if (confirm('Hapus berkas unduhan ini?')) {
      await api.deleteDownload(id);
      showNotify('success', 'Dokumen unduhan dihapus.');
      onDataChanged();
    }
  };

  // --- GALLERY CRUD ---
  const handleOpenAddGallery = () => {
    setEditingGallery(null);
    setGalleryForm({
      title: '',
      category: 'Kaderisasi',
      imageUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
      date: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
      description: ''
    });
    setIsGalleryModalOpen(true);
  };

  const handleOpenEditGallery = (g: GalleryItem) => {
    setEditingGallery(g);
    setGalleryForm({
      title: g.title,
      category: g.category,
      imageUrl: g.imageUrl,
      date: g.date,
      description: g.description
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingGallery) {
        await api.updateGallery(editingGallery.id, galleryForm);
        showNotify('success', 'Foto galeri berhasil diperbarui!');
      } else {
        await api.createGallery(galleryForm);
        showNotify('success', 'Foto kegiatan baru berhasil ditambahkan ke galeri!');
      }
      setIsGalleryModalOpen(false);
      onDataChanged();
    } catch {
      showNotify('error', 'Gagal menyimpan foto galeri');
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (confirm('Hapus foto kegiatan ini dari galeri?')) {
      await api.deleteGallery(id);
      showNotify('success', 'Foto kegiatan telah dihapus dari galeri.');
      onDataChanged();
    }
  };

  // --- KOPRI SAVE ---
  const handleSaveKopri = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsKopriSaving(true);
    try {
      await api.updateKopri(kopriData);
      showNotify('success', 'Konten Halaman KOPRI berhasil disimpan!');
      onDataChanged();
    } catch {
      showNotify('error', 'Gagal memperbarui data KOPRI');
    } finally {
      setIsKopriSaving(false);
    }
  };

  // --- ABOUT SAVE ---
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAboutSaving(true);
    try {
      await api.updateAbout(aboutData);
      showNotify('success', 'Konten About & Visi Rayon berhasil disimpan!');
      onDataChanged();
    } catch {
      showNotify('error', 'Gagal memperbarui About Section');
    } finally {
      setIsAboutSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsAdminOpen(false)}
      />

      <div className="relative bg-[#002B7F] text-white border border-[#FFC107]/40 rounded-3xl max-w-6xl w-full h-[92vh] flex flex-col shadow-2xl z-10 overflow-hidden">
        {/* Top Bar of CMS */}
        <div className="px-6 py-4 bg-[#071330] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png"
              alt="PMII"
              className="h-10 w-auto object-contain"
            />
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Dashboard CMS PMII Rayon FDK
              </h2>
              <p className="text-xs text-[#FFC107]">
                Selamat datang, <b>{user?.name || 'Pengurus'}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logout();
                setIsAdminOpen(false);
              }}
              className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold hover:bg-red-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Alert */}
        {notification && (
          <div
            className={`px-6 py-2.5 text-xs font-medium flex items-center gap-2 shrink-0 ${
              notification.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-[#002060] px-6 py-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'articles', label: 'Manajemen Berita', icon: Newspaper, count: articleList.length },
            { id: 'team', label: 'Struktur Pengurus & KOPRI', icon: Users, count: teamList.length },
            { id: 'gallery', label: 'Manajemen Galeri', icon: ImageIcon, count: galleryList.length },
            { id: 'downloads', label: 'File Download', icon: FileDown, count: downloadList.length },
            { id: 'kopri', label: 'Halaman KOPRI', icon: Sparkles },
            { id: 'about', label: 'About & Visi Rayon', icon: Info },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#FFC107] text-[#002B7F] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded-full font-mono">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0a1128]/95">
          {/* TAB 1: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Manajemen Berita & Artikel</h3>
                  <p className="text-xs text-slate-400">
                    Tambah, perbarui berita, dan unggah foto thumbnail artikel.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddArticle}
                  className="px-4 py-2 bg-[#FFC107] text-[#002B7F] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#F4B400] transition-colors cursor-pointer w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Berita & Foto</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#002B7F]/20">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#002060] text-slate-300 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Foto</th>
                      <th className="p-3.5">Judul Berita</th>
                      <th className="p-3.5">Kategori</th>
                      <th className="p-3.5">Penulis</th>
                      <th className="p-3.5">Tanggal</th>
                      <th className="p-3.5">Views</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {articleList.map((art) => (
                      <tr key={art.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={art.thumbnailUrl}
                            alt=""
                            className="w-12 h-10 object-contain rounded bg-black/20 p-1 border border-white/10"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-white max-w-xs truncate">
                          {art.title}
                        </td>
                        <td className="p-3.5 text-[#FFC107] font-semibold">{art.category}</td>
                        <td className="p-3.5 text-slate-300">{art.author}</td>
                        <td className="p-3.5 font-mono text-slate-400">{art.publishedAt}</td>
                        <td className="p-3.5 font-mono text-slate-300">{art.views}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditArticle(art)}
                            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                            title="Edit Berita & Foto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-pointer"
                            title="Hapus Berita"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TEAM MANAGEMENT */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Manajemen Struktur Pengurus & KOPRI
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kelola nama pengurus, jabatan, divisi, dan tambahkan foto pengurus secara langsung.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddTeam}
                  className="px-4 py-2 bg-[#FFC107] text-[#002B7F] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#F4B400] transition-colors cursor-pointer w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pengurus & Foto</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#002B7F]/20">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#002060] text-slate-300 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Foto</th>
                      <th className="p-3.5">Nama Pengurus</th>
                      <th className="p-3.5">Jabatan</th>
                      <th className="p-3.5">Kategori / Divisi</th>
                      <th className="p-3.5">Periode</th>
                      <th className="p-3.5">Urutan</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {teamList.map((m) => (
                      <tr key={m.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={m.photoUrl}
                            alt=""
                            className="w-10 h-12 object-contain rounded bg-black/20 p-1 border border-white/10"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-white">{m.name}</td>
                        <td className="p-3.5 italic text-slate-300">{m.role}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              m.category === 'kopri'
                                ? 'bg-pink-500/20 text-pink-300'
                                : m.category === 'bph'
                                ? 'bg-[#FFC107]/20 text-[#FFC107]'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {m.category} ({m.subCategory})
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-400">{m.period}</td>
                        <td className="p-3.5 font-mono text-slate-300">{m.order}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditTeam(m)}
                            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                            title="Edit Pengurus & Foto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeam(m.id)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-pointer"
                            title="Hapus Pengurus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Manajemen Galeri Kegiatan</h3>
                  <p className="text-xs text-slate-400">
                    Tambah foto dokumentasi kegiatan MAPABA, SIG KOPRI, diskusi, dan aksi sosial.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddGallery}
                  className="px-4 py-2 bg-[#FFC107] text-[#002B7F] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#F4B400] transition-colors cursor-pointer w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Foto Kegiatan</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryList.map((g) => (
                  <div
                    key={g.id}
                    className="bg-[#002B7F]/30 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div className="h-44 bg-black/40 flex items-center justify-center p-2 relative overflow-hidden">
                      <img
                        src={g.imageUrl}
                        alt={g.title}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-[#FFC107] text-[#002B7F] px-2 py-0.5 rounded">
                        {g.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-slate-400 font-mono mb-1">{g.date}</div>
                        <h4 className="font-bold text-sm text-white line-clamp-1">{g.title}</h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">{g.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditGallery(g)}
                          className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-500/30 flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-200 rounded-lg text-xs font-semibold hover:bg-red-500/30 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DOWNLOADS MANAGEMENT */}
          {activeTab === 'downloads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Manajemen File Unduhan</h3>
                  <p className="text-xs text-slate-400">
                    Kelola modul MAPABA, PKD, AD/ART, produk hukum KOPRI, dan berkas administrasi.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddDownload}
                  className="px-4 py-2 bg-[#FFC107] text-[#002B7F] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#F4B400] transition-colors cursor-pointer w-fit"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Berkas</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#002B7F]/20">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#002060] text-slate-300 font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">Judul Dokumen</th>
                      <th className="p-3.5">Kategori</th>
                      <th className="p-3.5">Format & Ukuran</th>
                      <th className="p-3.5">Unduhan</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {downloadList.map((dl) => (
                      <tr key={dl.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-bold text-white max-w-sm truncate">{dl.title}</td>
                        <td className="p-3.5 text-[#FFC107]">{dl.category}</td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {dl.fileType} · {dl.fileSize}
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{dl.downloadCount}</td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditDownload(dl)}
                            className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer"
                            title="Edit Dokumen"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDownload(dl.id)}
                            className="p-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-pointer"
                            title="Hapus Dokumen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: KOPRI CMS */}
          {activeTab === 'kopri' && (
            <form onSubmit={handleSaveKopri} className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-lg font-bold text-white">Manajemen Halaman KOPRI</h3>
                <p className="text-xs text-slate-400">
                  Perbarui narasi profil, visi, misi, dan tagline Korps PMII Putri Rayon FDK.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Tagline KOPRI
                  </label>
                  <input
                    type="text"
                    value={kopriData.tagline}
                    onChange={(e) => setKopriData({ ...kopriData, tagline: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Profil KOPRI Mahbub FDK
                  </label>
                  <textarea
                    rows={4}
                    value={kopriData.profile}
                    onChange={(e) => setKopriData({ ...kopriData, profile: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Sejarah Singkat KOPRI
                  </label>
                  <textarea
                    rows={3}
                    value={kopriData.history}
                    onChange={(e) => setKopriData({ ...kopriData, history: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Visi KOPRI
                  </label>
                  <textarea
                    rows={2}
                    value={kopriData.vision}
                    onChange={(e) => setKopriData({ ...kopriData, vision: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Misi KOPRI (1 per baris)
                  </label>
                  <textarea
                    rows={4}
                    value={kopriData.missions.join('\n')}
                    onChange={(e) =>
                      setKopriData({
                        ...kopriData,
                        missions: e.target.value.split('\n').filter((m) => m.trim().length > 0)
                      })
                    }
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isKopriSaving}
                className="px-6 py-2.5 bg-[#FFC107] text-[#002B7F] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#F4B400] transition-colors cursor-pointer"
              >
                {isKopriSaving ? 'Menyimpan...' : 'Simpan Konten KOPRI'}
              </button>
            </form>
          )}

          {/* TAB 6: ABOUT CMS */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveAbout} className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Manajemen About Section & Halaman Depan
                </h3>
                <p className="text-xs text-slate-400">
                  Kelola deskripsi PMII, Tujuan PMII (Pasal 4 AD), Visi Rayon FDK, dan Misi.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Deskripsi Singkat PMII
                  </label>
                  <textarea
                    rows={3}
                    value={aboutData.pmiiDescription}
                    onChange={(e) => setAboutData({ ...aboutData, pmiiDescription: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Tujuan PMII (Pasal 4 AD PMII)
                  </label>
                  <textarea
                    rows={3}
                    value={aboutData.pmiiPurpose}
                    onChange={(e) => setAboutData({ ...aboutData, pmiiPurpose: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Visi Rayon Fakultas Dakwah & Komunikasi
                  </label>
                  <textarea
                    rows={3}
                    value={aboutData.rayonFdkVision}
                    onChange={(e) => setAboutData({ ...aboutData, rayonFdkVision: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Misi Rayon FDK (1 per baris)
                  </label>
                  <textarea
                    rows={4}
                    value={aboutData.rayonFdkMissions.join('\n')}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        rayonFdkMissions: e.target.value.split('\n').filter((m) => m.trim().length > 0)
                      })
                    }
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#FFC107]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Profil Singkat KOPRI di Halaman Depan
                  </label>
                  <textarea
                    rows={3}
                    value={aboutData.kopriBrief}
                    onChange={(e) => setAboutData({ ...aboutData, kopriBrief: e.target.value })}
                    className="w-full bg-[#002060] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAboutSaving}
                className="px-6 py-2.5 bg-[#FFC107] text-[#002B7F] font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#F4B400] transition-colors cursor-pointer"
              >
                {isAboutSaving ? 'Menyimpan...' : 'Simpan Konten Halaman Depan'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* MODAL ARTICLE FORM DENGAN FITUR TAMBAH / UNGGAH FOTO */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setIsArticleModalOpen(false)}
          />
          <div className="relative bg-[#002060] border border-white/20 rounded-2xl max-w-2xl w-full p-6 text-white z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {editingArticle ? 'Edit Berita & Foto Thumbnail' : 'Tambah Berita & Foto Baru'}
            </h3>
            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Judul artikel berita..."
                />
              </div>

              {/* FOTO THUMBNAIL ARTIKEL BERITA */}
              <div className="p-4 bg-[#0a1128]/70 border border-white/15 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#FFC107] flex items-center gap-1.5 uppercase tracking-wider">
                    <Camera className="w-4 h-4" />
                    <span>Foto Thumbnail Berita</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Pilih file atau masukkan link</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview Box */}
                  <div className="w-32 h-24 bg-black/40 rounded-lg border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                    {articleForm.thumbnailUrl ? (
                      <img
                        src={articleForm.thumbnailUrl}
                        alt="Preview"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-500" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    {/* File Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="px-3.5 py-1.5 bg-[#FFC107] hover:bg-[#F4B400] text-[#002B7F] font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Unggah Foto dari Perangkat</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            processImageUpload(e, (url) =>
                              setArticleForm({ ...articleForm, thumbnailUrl: url })
                            )
                          }
                        />
                      </label>
                    </div>

                    {/* Image URL text input */}
                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={articleForm.thumbnailUrl}
                        onChange={(e) =>
                          setArticleForm({ ...articleForm, thumbnailUrl: e.target.value })
                        }
                        placeholder="Atau tempel URL gambar di sini..."
                        className="w-full bg-[#001742] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    {/* Presets */}
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-slate-400">Preset:</span>
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            setArticleForm({ ...articleForm, thumbnailUrl: preset.url })
                          }
                          className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, category: e.target.value as any })
                    }
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Kaderisasi">Kaderisasi</option>
                    <option value="KOPRI">KOPRI</option>
                    <option value="Opini">Opini</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Advokasi">Advokasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ringkasan Singkat (Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Isi Konten Berita Lengkap *
                </label>
                <textarea
                  rows={6}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC107] text-[#002B7F] font-bold rounded-xl text-xs cursor-pointer"
                >
                  Simpan Berita & Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TEAM FORM DENGAN FITUR UNGGAH FOTO PENGURUS */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setIsTeamModalOpen(false)}
          />
          <div className="relative bg-[#002060] border border-white/20 rounded-2xl max-w-lg w-full p-6 text-white z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {editingTeam ? 'Edit Pengurus & Foto' : 'Tambah Pengurus & Foto Baru'}
            </h3>
            <form onSubmit={handleSaveTeam} className="space-y-4">
              {/* FOTO PENGURUS UPLOAD & PREVIEW */}
              <div className="p-4 bg-[#0a1128]/70 border border-white/15 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#FFC107] flex items-center gap-1.5 uppercase tracking-wider">
                    <Camera className="w-4 h-4" />
                    <span>Foto Profil Pengurus</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Format JPG / PNG</span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Poster-styled Photo Frame Preview */}
                  <div className="w-24 h-28 bg-[#002B7F] rounded-lg border-2 border-[#FFC107] flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {teamForm.photoUrl ? (
                      <img
                        src={teamForm.photoUrl}
                        alt="Foto Pengurus"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <Users className="w-8 h-8 text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <label className="px-3.5 py-1.5 bg-[#FFC107] hover:bg-[#F4B400] text-[#002B7F] font-bold text-xs rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Foto Pengurus</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          processImageUpload(e, (url) =>
                            setTeamForm({ ...teamForm, photoUrl: url })
                          )
                        }
                      />
                    </label>

                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={teamForm.photoUrl}
                        onChange={(e) =>
                          setTeamForm({ ...teamForm, photoUrl: e.target.value })
                        }
                        placeholder="Atau URL foto pengurus..."
                        className="w-full bg-[#001742] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-slate-400">Preset:</span>
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setTeamForm({ ...teamForm, photoUrl: preset.url })}
                          className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Lengkap Pengurus *
                </label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Contoh: Sahabat Ahmad Fauzan M., S.Sos."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Jabatan *
                </label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Contoh: Ketua Rayon FDK / Ketua KOPRI"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori Pengurus
                  </label>
                  <select
                    value={teamForm.category}
                    onChange={(e) =>
                      setTeamForm({ ...teamForm, category: e.target.value as any })
                    }
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="bph">BPH Rayon FDK</option>
                    <option value="kopri">KOPRI Mahbub FDK</option>
                    <option value="biro">Biro Rayon</option>
                    <option value="demisioner">Demisioner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Divisi / Sub-Kategori
                  </label>
                  <input
                    type="text"
                    value={teamForm.subCategory}
                    onChange={(e) => setTeamForm({ ...teamForm, subCategory: e.target.value })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                    placeholder="Badan Pengurus Harian"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Periode
                  </label>
                  <input
                    type="text"
                    value={teamForm.period}
                    onChange={(e) => setTeamForm({ ...teamForm, period: e.target.value })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nomor Urut Tampil
                  </label>
                  <input
                    type="number"
                    value={teamForm.order}
                    onChange={(e) => setTeamForm({ ...teamForm, order: Number(e.target.value) })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Link Instagram
                </label>
                <input
                  type="text"
                  value={teamForm.instagram}
                  onChange={(e) => setTeamForm({ ...teamForm, instagram: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Link TikTok
                </label>
                <input
                  type="text"
                  value={teamForm.tiktok}
                  onChange={(e) => setTeamForm({ ...teamForm, tiktok: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="https://tiktok.com/@username"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC107] text-[#002B7F] font-bold rounded-xl text-xs cursor-pointer"
                >
                  Simpan Pengurus & Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL GALLERY FORM DENGAN FITUR UNGGAH FOTO KEGIATAN */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setIsGalleryModalOpen(false)}
          />
          <div className="relative bg-[#002060] border border-white/20 rounded-2xl max-w-lg w-full p-6 text-white z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {editingGallery ? 'Edit Foto Kegiatan Galeri' : 'Tambah Foto Kegiatan Baru'}
            </h3>
            <form onSubmit={handleSaveGallery} className="space-y-4">
              {/* FOTO KEGIATAN UPLOAD & PREVIEW */}
              <div className="p-4 bg-[#0a1128]/70 border border-white/15 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#FFC107] flex items-center gap-1.5 uppercase tracking-wider">
                    <Camera className="w-4 h-4" />
                    <span>File Foto Kegiatan</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Pilih file foto</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-24 bg-black/40 rounded-lg border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                    {galleryForm.imageUrl ? (
                      <img
                        src={galleryForm.imageUrl}
                        alt="Preview Galeri"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-500" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="px-3.5 py-1.5 bg-[#FFC107] hover:bg-[#F4B400] text-[#002B7F] font-bold text-xs rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Unggah Foto dari HP / Komputer</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          processImageUpload(e, (url) =>
                            setGalleryForm({ ...galleryForm, imageUrl: url })
                          )
                        }
                      />
                    </label>

                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={galleryForm.imageUrl}
                        onChange={(e) =>
                          setGalleryForm({ ...galleryForm, imageUrl: e.target.value })
                        }
                        placeholder="Atau URL gambar kegiatan..."
                        className="w-full bg-[#001742] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="text-slate-400">Preset:</span>
                      {PRESET_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setGalleryForm({ ...galleryForm, imageUrl: preset.url })}
                          className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Kegiatan / Judul Foto *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Contoh: Pembukaan MAPABA Raya FDK 2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori Kegiatan
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) =>
                      setGalleryForm({ ...galleryForm, category: e.target.value as any })
                    }
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Kaderisasi">Kaderisasi</option>
                    <option value="KOPRI">KOPRI</option>
                    <option value="Keagamaan">Keagamaan</option>
                    <option value="Diskusi">Diskusi</option>
                    <option value="Aksi & Advokasi">Aksi & Advokasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Waktu / Tanggal
                  </label>
                  <input
                    type="text"
                    value={galleryForm.date}
                    onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                    placeholder="Contoh: Oktober 2026"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Keterangan Singkat
                </label>
                <textarea
                  rows={3}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Penjelasan ringkas mengenai momen kegiatan..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC107] text-[#002B7F] font-bold rounded-xl text-xs cursor-pointer"
                >
                  Simpan Foto Galeri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DOWNLOAD FORM */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setIsDownloadModalOpen(false)}
          />
          <div className="relative bg-[#002060] border border-white/20 rounded-2xl max-w-lg w-full p-6 text-white z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {editingDownload ? 'Edit Berkas Unduhan' : 'Tambah Berkas Baru'}
            </h3>
            <form onSubmit={handleSaveDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Dokumen *
                </label>
                <input
                  type="text"
                  required
                  value={downloadForm.title}
                  onChange={(e) => setDownloadForm({ ...downloadForm, title: e.target.value })}
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Contoh: Modul Silabus MAPABA FDK 2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori Dokumen
                  </label>
                  <select
                    value={downloadForm.category}
                    onChange={(e) =>
                      setDownloadForm({ ...downloadForm, category: e.target.value as any })
                    }
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Modul MAPABA">Modul MAPABA</option>
                    <option value="Materi PKD">Materi PKD</option>
                    <option value="Konstitusi & Hukum">Konstitusi & Hukum</option>
                    <option value="Produk Hukum KOPRI">Produk Hukum KOPRI</option>
                    <option value="Administrasi & SK">Administrasi & SK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Format File
                  </label>
                  <select
                    value={downloadForm.fileType}
                    onChange={(e) =>
                      setDownloadForm({ ...downloadForm, fileType: e.target.value as any })
                    }
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ukuran File
                  </label>
                  <input
                    type="text"
                    value={downloadForm.fileSize}
                    onChange={(e) => setDownloadForm({ ...downloadForm, fileSize: e.target.value })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                    placeholder="3.2 MB"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    URL / Tautan File
                  </label>
                  <input
                    type="text"
                    value={downloadForm.fileUrl}
                    onChange={(e) => setDownloadForm({ ...downloadForm, fileUrl: e.target.value })}
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Berkas
                </label>
                <textarea
                  rows={3}
                  value={downloadForm.description}
                  onChange={(e) =>
                    setDownloadForm({ ...downloadForm, description: e.target.value })
                  }
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2 text-sm text-white"
                  placeholder="Keterangan singkat mengenai isi dokumen..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="px-4 py-2 bg-white/10 rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFC107] text-[#002B7F] font-bold rounded-xl text-xs cursor-pointer"
                >
                  Simpan Berkas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
