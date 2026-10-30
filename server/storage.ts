import fs from 'fs';
import path from 'path';
import { INITIAL_ABOUT, INITIAL_ARTICLES, INITIAL_DOWNLOADS, INITIAL_GALLERY, INITIAL_KOPRI, INITIAL_TEAM } from '../src/data/initialData.ts';
import { AboutContent, Article, DownloadFile, GalleryItem, KopriContent, TeamMember } from '../src/types/index.ts';

interface DatabaseSchema {
  about: AboutContent;
  kopri: KopriContent;
  team: TeamMember[];
  articles: Article[];
  downloads: DownloadFile[];
  gallery: GalleryItem[];
  subscribers: string[];
  messages: Array<{ id: string; name: string; email: string; subject: string; message: string; date: string }>;
}

const DATA_DIR = path.resolve(process.cwd(), 'server');
const DATA_FILE = path.join(DATA_DIR, 'data.json');

function initializeData(): DatabaseSchema {
  return {
    about: INITIAL_ABOUT,
    kopri: INITIAL_KOPRI,
    team: INITIAL_TEAM,
    articles: INITIAL_ARTICLES,
    downloads: INITIAL_DOWNLOADS,
    gallery: INITIAL_GALLERY,
    subscribers: ['sahabat.dakom@uinsgd.ac.id'],
    messages: [
      {
        id: 'msg-1',
        name: 'Kader Rayon Ushuluddin',
        email: 'kader.ushuluddin@uinsgd.ac.id',
        subject: 'Kolaborasi Kajian Lintas Fakultas',
        message: 'Salam silaturahim sahabat, kami mengajak sahabat-sahabati Rayon FDK untuk mengadakan bedah buku bersama.',
        date: '2026-10-28'
      }
    ]
  };
}

export class StorageService {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Could not read existing data.json, initializing fresh data:', err);
    }

    const initial = initializeData();
    this.saveDataDirect(initial);
    return initial;
  }

  private saveDataDirect(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to data.json:', err);
    }
  }

  public save() {
    this.saveDataDirect(this.data);
  }

  // About
  public getAbout(): AboutContent {
    return this.data.about;
  }
  public updateAbout(payload: Partial<AboutContent>): AboutContent {
    this.data.about = { ...this.data.about, ...payload };
    this.save();
    return this.data.about;
  }

  // KOPRI
  public getKopri(): KopriContent {
    return this.data.kopri;
  }
  public updateKopri(payload: Partial<KopriContent>): KopriContent {
    this.data.kopri = { ...this.data.kopri, ...payload };
    this.save();
    return this.data.kopri;
  }

  // Team
  public getTeam(): TeamMember[] {
    return this.data.team.sort((a, b) => a.order - b.order);
  }
  public addTeamMember(member: Omit<TeamMember, 'id'>): TeamMember {
    const newMember: TeamMember = {
      ...member,
      id: 't-' + Date.now()
    };
    this.data.team.push(newMember);
    this.save();
    return newMember;
  }
  public updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
    const idx = this.data.team.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.data.team[idx] = { ...this.data.team[idx], ...updates };
    this.save();
    return this.data.team[idx];
  }
  public deleteTeamMember(id: string): boolean {
    const initLen = this.data.team.length;
    this.data.team = this.data.team.filter((m) => m.id !== id);
    if (this.data.team.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Articles
  public getArticles(): Article[] {
    return this.data.articles;
  }
  public addArticle(article: Omit<Article, 'id' | 'views'>): Article {
    const newArticle: Article = {
      ...article,
      id: 'art-' + Date.now(),
      views: 0
    };
    this.data.articles.unshift(newArticle);
    this.save();
    return newArticle;
  }
  public updateArticle(id: string, updates: Partial<Article>): Article | null {
    const idx = this.data.articles.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    this.data.articles[idx] = { ...this.data.articles[idx], ...updates };
    this.save();
    return this.data.articles[idx];
  }
  public deleteArticle(id: string): boolean {
    const initLen = this.data.articles.length;
    this.data.articles = this.data.articles.filter((a) => a.id !== id);
    if (this.data.articles.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }
  public incrementArticleViews(id: string): number {
    const article = this.data.articles.find((a) => a.id === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.save();
      return article.views;
    }
    return 0;
  }

  // Downloads
  public getDownloads(): DownloadFile[] {
    return this.data.downloads;
  }
  public addDownload(dl: Omit<DownloadFile, 'id' | 'downloadCount'>): DownloadFile {
    const newDownload: DownloadFile = {
      ...dl,
      id: 'dl-' + Date.now(),
      downloadCount: 0
    };
    this.data.downloads.unshift(newDownload);
    this.save();
    return newDownload;
  }
  public updateDownload(id: string, updates: Partial<DownloadFile>): DownloadFile | null {
    const idx = this.data.downloads.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    this.data.downloads[idx] = { ...this.data.downloads[idx], ...updates };
    this.save();
    return this.data.downloads[idx];
  }
  public deleteDownload(id: string): boolean {
    const initLen = this.data.downloads.length;
    this.data.downloads = this.data.downloads.filter((d) => d.id !== id);
    if (this.data.downloads.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }
  public trackDownload(id: string): number {
    const dl = this.data.downloads.find((d) => d.id === id);
    if (dl) {
      dl.downloadCount = (dl.downloadCount || 0) + 1;
      this.save();
      return dl.downloadCount;
    }
    return 0;
  }

  // Gallery
  public getGallery(): GalleryItem[] {
    return this.data.gallery;
  }
  public addGallery(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const newItem: GalleryItem = {
      ...item,
      id: 'g-' + Date.now()
    };
    this.data.gallery.unshift(newItem);
    this.save();
    return newItem;
  }
  public updateGallery(id: string, updates: Partial<GalleryItem>): GalleryItem | null {
    const idx = this.data.gallery.findIndex((g) => g.id === id);
    if (idx === -1) return null;
    this.data.gallery[idx] = { ...this.data.gallery[idx], ...updates };
    this.save();
    return this.data.gallery[idx];
  }
  public deleteGallery(id: string): boolean {
    const initLen = this.data.gallery.length;
    this.data.gallery = this.data.gallery.filter((g) => g.id !== id);
    if (this.data.gallery.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // Subscribers
  public addSubscriber(email: string): boolean {
    if (!this.data.subscribers.includes(email)) {
      this.data.subscribers.push(email);
      this.save();
      return true;
    }
    return false;
  }

  // Messages
  public addMessage(msg: { name: string; email: string; subject: string; message: string }): void {
    this.data.messages.unshift({
      id: 'msg-' + Date.now(),
      ...msg,
      date: new Date().toISOString().split('T')[0]
    });
    this.save();
  }
  public getMessages() {
    return this.data.messages;
  }

  public getStats() {
    return {
      totalArticles: this.data.articles.length,
      totalTeam: this.data.team.length,
      totalDownloads: this.data.downloads.length,
      totalGallery: this.data.gallery.length,
      totalSubscribers: this.data.subscribers.length,
      totalMessages: this.data.messages.length,
      totalViews: this.data.articles.reduce((acc, curr) => acc + (curr.views || 0), 0)
    };
  }
}

export const storage = new StorageService();
