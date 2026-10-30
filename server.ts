import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { storage } from './server/storage.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logger
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Auth Middleware
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Harap login terlebih dahulu.' });
    }
    const token = authHeader.split(' ')[1];
    if (token !== 'pmii-jwt-token-2026' && !token.startsWith('pmii-')) {
      return res.status(403).json({ error: 'Token autentikasi tidak valid.' });
    }
    next();
  };

  // --- AUTH ENDPOINTS ---
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Default credentials for PMII Rayon FDK Admin
    if ((username === 'admin' || username === 'pmiirayonfdk') && (password === 'pmii2026' || password === 'admin123')) {
      return res.json({
        success: true,
        user: {
          username: username,
          name: 'BPH PMII Rayon FDK 2026-2027',
          role: 'superadmin',
          token: 'pmii-jwt-token-2026'
        }
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Username atau password pengurus salah. (Default: admin / pmii2026)'
    });
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes('pmii-jwt-token-2026')) {
      return res.json({
        authenticated: true,
        user: {
          username: 'admin',
          name: 'BPH PMII Rayon FDK 2026-2027',
          role: 'superadmin'
        }
      });
    }
    return res.json({ authenticated: false });
  });

  // --- STATS ENDPOINT ---
  app.get('/api/stats', (req: Request, res: Response) => {
    res.json(storage.getStats());
  });

  // --- ABOUT ENDPOINTS ---
  app.get('/api/about', (req: Request, res: Response) => {
    res.json(storage.getAbout());
  });

  app.put('/api/about', requireAuth, (req: Request, res: Response) => {
    const updated = storage.updateAbout(req.body);
    res.json({ success: true, data: updated });
  });

  // --- KOPRI ENDPOINTS ---
  app.get('/api/kopri', (req: Request, res: Response) => {
    res.json(storage.getKopri());
  });

  app.put('/api/kopri', requireAuth, (req: Request, res: Response) => {
    const updated = storage.updateKopri(req.body);
    res.json({ success: true, data: updated });
  });

  // --- TEAM / PENGURUS ENDPOINTS ---
  app.get('/api/team', (req: Request, res: Response) => {
    res.json(storage.getTeam());
  });

  app.post('/api/team', requireAuth, (req: Request, res: Response) => {
    const newMember = storage.addTeamMember(req.body);
    res.status(201).json({ success: true, data: newMember });
  });

  app.put('/api/team/:id', requireAuth, (req: Request, res: Response) => {
    const updated = storage.updateTeamMember(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Pengurus tidak ditemukan' });
    res.json({ success: true, data: updated });
  });

  app.delete('/api/team/:id', requireAuth, (req: Request, res: Response) => {
    const deleted = storage.deleteTeamMember(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Pengurus tidak ditemukan' });
    res.json({ success: true });
  });

  // --- ARTICLES / BERITA ENDPOINTS ---
  app.get('/api/articles', (req: Request, res: Response) => {
    res.json(storage.getArticles());
  });

  app.post('/api/articles', requireAuth, (req: Request, res: Response) => {
    const newArticle = storage.addArticle(req.body);
    res.status(201).json({ success: true, data: newArticle });
  });

  app.put('/api/articles/:id', requireAuth, (req: Request, res: Response) => {
    const updated = storage.updateArticle(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Berita tidak ditemukan' });
    res.json({ success: true, data: updated });
  });

  app.delete('/api/articles/:id', requireAuth, (req: Request, res: Response) => {
    const deleted = storage.deleteArticle(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Berita tidak ditemukan' });
    res.json({ success: true });
  });

  app.post('/api/articles/:id/view', (req: Request, res: Response) => {
    const views = storage.incrementArticleViews(req.params.id);
    res.json({ success: true, views });
  });

  // --- DOWNLOAD FILES ENDPOINTS ---
  app.get('/api/downloads', (req: Request, res: Response) => {
    res.json(storage.getDownloads());
  });

  app.post('/api/downloads', requireAuth, (req: Request, res: Response) => {
    const newDl = storage.addDownload(req.body);
    res.status(201).json({ success: true, data: newDl });
  });

  app.put('/api/downloads/:id', requireAuth, (req: Request, res: Response) => {
    const updated = storage.updateDownload(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'File tidak ditemukan' });
    res.json({ success: true, data: updated });
  });

  app.delete('/api/downloads/:id', requireAuth, (req: Request, res: Response) => {
    const deleted = storage.deleteDownload(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'File tidak ditemukan' });
    res.json({ success: true });
  });

  app.post('/api/downloads/:id/track', (req: Request, res: Response) => {
    const count = storage.trackDownload(req.params.id);
    res.json({ success: true, count });
  });

  // --- GALLERY ENDPOINTS ---
  app.get('/api/gallery', (req: Request, res: Response) => {
    res.json(storage.getGallery());
  });

  app.post('/api/gallery', requireAuth, (req: Request, res: Response) => {
    const newItem = storage.addGallery(req.body);
    res.status(201).json({ success: true, data: newItem });
  });

  app.put('/api/gallery/:id', requireAuth, (req: Request, res: Response) => {
    const updated = storage.updateGallery(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Foto tidak ditemukan' });
    res.json({ success: true, data: updated });
  });

  app.delete('/api/gallery/:id', requireAuth, (req: Request, res: Response) => {
    const deleted = storage.deleteGallery(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Foto tidak ditemukan' });
    res.json({ success: true });
  });

  // --- SUBSCRIBER & CONTACT ---
  app.post('/api/newsletter', (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Email tidak valid' });
    }
    const added = storage.addSubscriber(email);
    res.json({ success: true, message: added ? 'Berhasil berlangganan newsletter!' : 'Email sudah terdaftar.' });
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi.' });
    }
    storage.addMessage({ name, email, subject: subject || 'Pesan Umum', message });
    res.json({ success: true, message: 'Pesan Anda telah berhasil dikirim ke pengurus PMII Rayon FDK!' });
  });

  app.get('/api/messages', requireAuth, (req: Request, res: Response) => {
    res.json(storage.getMessages());
  });

  // --- VITE MIDDLEWARE / STATIC FILES ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PMII Rayon FDK Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal Server Start Error:', err);
});
