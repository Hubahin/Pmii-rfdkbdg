export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'bph' | 'biro' | 'kopri' | 'demisioner';
  subCategory?: string;
  period: string;
  photoUrl: string;
  instagram?: string;
  tiktok?: string;
  order: number;
}

export interface Article {
  id: string;
  title: string;
  category: 'Kaderisasi' | 'Opini' | 'Kegiatan' | 'KOPRI' | 'Advokasi';
  summary: string;
  content: string;
  thumbnailUrl: string;
  author: string;
  publishedAt: string;
  views: number;
  featured?: boolean;
}

export interface DownloadFile {
  id: string;
  title: string;
  category: 'Konstitusi & Hukum' | 'Modul MAPABA' | 'Materi PKD' | 'Produk Hukum KOPRI' | 'Administrasi & SK';
  fileUrl: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'ZIP';
  downloadCount: number;
  uploadDate: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kaderisasi' | 'KOPRI' | 'Aksi & Advokasi' | 'Keagamaan' | 'Diskusi';
  imageUrl: string;
  date: string;
  description: string;
}

export interface KopriContent {
  tagline: string;
  profile: string;
  history: string;
  vision: string;
  missions: string[];
  sigTitle: string;
  sigDescription: string;
  programs: {
    id: string;
    title: string;
    description: string;
    badge: string;
  }[];
}

export interface AboutContent {
  pmiiDescription: string;
  pmiiPurpose: string;
  rayonFdkVision: string;
  rayonFdkMissions: string[];
  triMoto: { title: string; desc: string }[];
  triKomitmen: { title: string; desc: string }[];
  triKhidmat: { title: string; desc: string }[];
  kopriBrief: string;
}

export interface UserSession {
  username: string;
  name: string;
  role: 'superadmin' | 'pengurus';
  token: string;
}
