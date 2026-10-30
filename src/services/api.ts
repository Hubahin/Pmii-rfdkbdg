import { AboutContent, Article, DownloadFile, GalleryItem, KopriContent, TeamMember, UserSession } from '../types';
import { INITIAL_ABOUT, INITIAL_ARTICLES, INITIAL_DOWNLOADS, INITIAL_GALLERY, INITIAL_KOPRI, INITIAL_TEAM } from '../data/initialData';

const BASE_URL = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('pmii_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Auth
  async login(username: string, password: string): Promise<{ success: boolean; user?: UserSession; error?: string }> {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('pmii_token', data.user.token);
        localStorage.setItem('pmii_user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Login gagal' };
    } catch {
      // Offline fallback
      if (username === 'admin' && (password === 'pmii2026' || password === 'admin123')) {
        const fallbackUser: UserSession = {
          username: 'admin',
          name: 'BPH PMII Rayon FDK 2026-2027',
          role: 'superadmin',
          token: 'pmii-jwt-token-2026'
        };
        localStorage.setItem('pmii_token', fallbackUser.token);
        localStorage.setItem('pmii_user', JSON.stringify(fallbackUser));
        return { success: true, user: fallbackUser };
      }
      return { success: false, error: 'Username atau password salah (admin / pmii2026)' };
    }
  },

  logout() {
    localStorage.removeItem('pmii_token');
    localStorage.removeItem('pmii_user');
  },

  getCurrentUser(): UserSession | null {
    try {
      const stored = localStorage.getItem('pmii_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // About
  async getAbout(): Promise<AboutContent> {
    try {
      const res = await fetch(`${BASE_URL}/about`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error fetching about, using initial:', e);
    }
    return INITIAL_ABOUT;
  },

  async updateAbout(data: Partial<AboutContent>): Promise<AboutContent> {
    const res = await fetch(`${BASE_URL}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result.data;
  },

  // KOPRI
  async getKopri(): Promise<KopriContent> {
    try {
      const res = await fetch(`${BASE_URL}/kopri`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error fetching kopri, using initial:', e);
    }
    return INITIAL_KOPRI;
  },

  async updateKopri(data: Partial<KopriContent>): Promise<KopriContent> {
    const res = await fetch(`${BASE_URL}/kopri`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result.data;
  },

  // Team
  async getTeam(): Promise<TeamMember[]> {
    try {
      const res = await fetch(`${BASE_URL}/team`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error fetching team, using initial:', e);
    }
    return INITIAL_TEAM;
  },

  async createTeamMember(member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    const res = await fetch(`${BASE_URL}/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(member)
    });
    const result = await res.json();
    return result.data;
  },

  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
    const res = await fetch(`${BASE_URL}/team/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(member)
    });
    const result = await res.json();
    return result.data;
  },

  async deleteTeamMember(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.ok;
  },

  // Articles
  async getArticles(): Promise<Article[]> {
    try {
      const res = await fetch(`${BASE_URL}/articles`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error fetching articles, using initial:', e);
    }
    return INITIAL_ARTICLES;
  },

  async createArticle(article: Omit<Article, 'id' | 'views'>): Promise<Article> {
    const res = await fetch(`${BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(article)
    });
    const result = await res.json();
    return result.data;
  },

  async updateArticle(id: string, article: Partial<Article>): Promise<Article> {
    const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(article)
    });
    const result = await res.json();
    return result.data;
  },

  async deleteArticle(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/articles/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.ok;
  },

  async incrementArticleView(id: string): Promise<void> {
    try {
      await fetch(`${BASE_URL}/articles/${id}/view`, { method: 'POST' });
    } catch {
      // silent
    }
  },

  // Downloads
  async getDownloads(): Promise<DownloadFile[]> {
    try {
      const res = await fetch(`${BASE_URL}/downloads`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error fetching downloads, using initial:', e);
    }
    return INITIAL_DOWNLOADS;
  },

  async createDownload(dl: Omit<DownloadFile, 'id' | 'downloadCount'>): Promise<DownloadFile> {
    const res = await fetch(`${BASE_URL}/downloads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(dl)
    });
    const result = await res.json();
    return result.data;
  },

  async updateDownload(id: string, dl: Partial<DownloadFile>): Promise<DownloadFile> {
    const res = await fetch(`${BASE_URL}/downloads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(dl)
    });
    const result = await res.json();
    return result.data;
  },

  async deleteDownload(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/downloads/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.ok;
  },

  async trackDownload(id: string): Promise<void> {
    try {
      await fetch(`${BASE_URL}/downloads/${id}/track`, { method: 'POST' });
    } catch {
      // silent
    }
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/gallery`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API error fetching gallery, using initial:', e);
    }
    return INITIAL_GALLERY;
  },

  async createGallery(item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> {
    const res = await fetch(`${BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(item)
    });
    const result = await res.json();
    return result.data;
  },

  async updateGallery(id: string, item: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`${BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(item)
    });
    const result = await res.json();
    return result.data;
  },

  async deleteGallery(id: string): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.ok;
  },

  // Newsletter & Contact
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await res.json();
  },

  async sendContact(payload: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  },

  async getStats(): Promise<Record<string, number>> {
    try {
      const res = await fetch(`${BASE_URL}/stats`);
      if (res.ok) return await res.json();
    } catch {
      // silent
    }
    return {
      totalArticles: 4,
      totalTeam: 12,
      totalDownloads: 6,
      totalGallery: 5,
      totalSubscribers: 12,
      totalViews: 1203
    };
  }
};
