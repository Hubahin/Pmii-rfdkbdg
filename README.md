# Website Organisasi PMII Rayon Fakultas Dakwah dan Komunikasi
### Komisariat UIN Sunan Gunung Djati Cabang Kota Bandung
**Periode Kepengurusan 2026–2027**

Website resmi organisasi lengkap (Frontend & Backend) yang dibangun dengan standar modern, responsif, dan terintegrasi dengan CMS Admin untuk pengelolaan konten organisasi.

---

## 🎨 Desain Visual & Identitas Organisasi
- **Skema Warna Resmi**: Biru Tua PMII (`#002B7F` / `#0a1128`), Kuning Gold (`#FFC107` / `#F4B400`), Putih & Hitam.
- **Logo Resmi**:
  - Logo PMII Rayon Fakultas Dakwah dan Komunikasi UIN SGD Bandung (`/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png`)
  - Logo KOPRI Mahbub Rayon FDK (`/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png`)
  - Karakter Maskot "Sahabat PMII" & "Sahabati PMII" (`/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png`)

---

## 🚀 Fitur Halaman & Struktur Navigasi (Slide-out Menu)
1. **Header / Navigation Bar**: Logo PMII Rayon FDK, nama branding organisasi, navigasi desktop, tombol akses Portal Pengurus, dan Hamburger Menu.
2. **Hero Section**: Gradasi biru tua, headline *"Upgrade Your Knowledge and Skills with PMII"*, sub-headline resmi, tombol kapsul kuning *"Get Started"*, serta kartu maskot Sahabat & Sahabati PMII.
3. **About Section**: Profil sejarah PMII (berdiri 17 April 1960), Tujuan PMII (Pasal 4 Anggaran Dasar), Visi & Misi Rayon FDK, serta overview KOPRI.
4. **Mission Section**: Penjelasan doktrin organisasi: Tri Moto (Dzikir, Fikir, Amal Sholeh), Tri Komitmen (Kejujuran, Kebenaran, Keadilan), dan Tri Khidmat.
5. **KOPRI Section**: Halaman & modul khusus Korps PMII Putri (KOPRI) Mahbub Rayon FDK (Sejarah, Visi, Misi, dan Program Unggulan seperti Sekolah Islam Gender).
6. **Team (Struktur Pengurus & KOPRI Periode 2026–2027)**: Frame foto berlatar poster khas PMII, banner nama lengkap bold biru, jabatan italic, ikon Instagram & TikTok, serta pemisah section khusus Badan Pengurus KOPRI.
7. **News / Article Section (Update)**: Card berita modern dengan thumbnail, metadata tanggal rilis & counter views, judul bold biru, tombol "Read More →", serta modal pembaca artikel lengkap.
8. **File Download (Pusat Arsip)**: Berkas AD/ART, modul MAPABA, materi PKD, produk hukum KOPRI, format administrasi RTK dengan filter kategori dan download tracker.
9. **Gallery Section**: Dokumentasi foto kegiatan MAPABA, SIG KOPRI, Khotmil Quran, Diskusi Reboan, dan Aksi Mahasiswa dengan fitur lightbox preview.
10. **Contact Section**: Info sekretariat di Jl. A.H. Nasution No. 105 Cibiru, email `rayondakom2025@gmail.com`, dan formulir kirim pesan interaktif.
11. **Footer**: Identitas domain/email, media sosial, tautan cepat, formulir newsletter, hak cipta, dan tombol floating Back-To-Top.

---

## 🔐 Sistem Backend & CMS Admin
- **Halaman Login Pengurus**: Akses autentikasi pengurus via tombol *"Login Pengurus"* di navbar atau menu samping.
- **Kredensial Default Uji Coba**:
  - **Username**: `admin` (atau `pmiirayonfdk`)
  - **Password**: `pmii2026`
- **Dashboard CMS Admin (`/admin`)**:
  - **CRUD Berita & Artikel**: Tambah, edit, dan hapus artikel berita, summary, konten lengkap, serta **unggah foto thumbnail langsung** dari HP/komputer atau via link gambar dengan preview.
  - **CRUD Struktur Pengurus & KOPRI**: Tambah, edit, dan hapus pengurus Rayon, KOPRI, dan biro-biro, serta **unggah foto pengurus** dengan live poster preview khas PMII.
  - **CRUD Galeri Foto Kegiatan**: Menu manajemen galeri untuk **menambahkan foto kegiatan**, memilih kategori, tanggal, deskripsi, dan upload foto dari file lokal atau URL.
  - **CRUD File Download**: Tambah, edit, dan hapus berkas unduhan (PDF, ZIP, DOCX) beserta kategorinya.
  - **CMS Halaman KOPRI**: Pengeditan langsung profil, sejarah, visi, misi, dan tagline KOPRI.
  - **CMS About Section**: Pengeditan langsung deskripsi PMII, Pasal 4 AD, dan Visi-Misi Rayon FDK.
  - **Ringkasan Statistik**: Total artikel, jumlah pengurus, total foto galeri, total berkas, dan total views pembaca.

---

## 📁 Struktur Folder Proyek
```text
├── index.html                   # Entry point HTML & Google Fonts
├── metadata.json                # Metadata aplikasi AI Studio
├── package.json                 # Dependency Node.js & scripts dev/start
├── server.ts                    # Backend Express + Vite middleware
├── server/
│   ├── storage.ts               # Storage service (JSON persistence)
│   └── data.json                # Basis data lokal tersimpan
├── src/
│   ├── main.tsx                 # React DOM bootstrap
│   ├── App.tsx                  # Root layout & page integration
│   ├── index.css                # Tailwind CSS v4 setup & custom scrollbar
│   ├── types/
│   │   └── index.ts             # TypeScript interfaces (Article, Team, Download, KOPRI)
│   ├── data/
│   │   └── initialData.ts       # Data awal lengkap PMII Rayon FDK
│   ├── context/
│   │   └── AuthContext.tsx      # State manajemen sesi login & modal CMS
│   ├── services/
│   │   └── api.ts               # Client API service ke backend Express
│   └── components/
│       ├── Navbar.tsx           # Navigasi utama & logo PMII
│       ├── SlideMenu.tsx        # Drawer menu slide-out 10 poin
│       ├── Hero.tsx             # Hero section & ilustrasi Sahabat/Sahabati
│       ├── AboutSection.tsx     # Profil PMII, AD ART, Visi FDK
│       ├── MissionSection.tsx   # Tri Moto, Tri Komitmen, Tri Khidmat
│       ├── KopriSection.tsx     # Profil, visi, dan program KOPRI
│       ├── TeamSection.tsx      # Struktur Pengurus 2026-2027 & KOPRI
│       ├── DownloadsSection.tsx # Arsip modul MAPABA & berkas download
│       ├── NewsSection.tsx      # Warta berita & esai opini
│       ├── ArticleDetailModal.tsx # Modal baca artikel & view counter
│       ├── GallerySection.tsx   # Dokumentasi foto & lightbox
│       ├── ContactSection.tsx   # Alamat sekretariat & form kontak
│       ├── Footer.tsx           # Footer 3 kolom, newsletter, back-to-top
│       ├── LoginModal.tsx       # Modal login pengurus
│       └── AdminDashboard.tsx   # Panel CMS CRUD lengkap
└── public/
    └── assets/
        └── aistudio/            # Logo PMII Rayon FDK, KOPRI, & maskot
```

---

## 🛠️ Petunjuk Instalasi & Menjalankan Website

### 1. Menjalankan di Lingkungan Pengembangan (Development)
```bash
# Pastikan dependensi telah terinstal
npm install

# Jalankan server full-stack (Express API + Vite Dev Server pada port 3000)
npm run dev
```
Buka browser di `http://localhost:3000`.

### 2. Membangun & Menjalankan untuk Produksi (Production)
```bash
# Build frontend aset statis
npm run build

# Jalankan server Node.js produksi
npm start
```

---
*Taqwa, Intelektual, Profesional — Dzikir, Fikir, Amal Sholeh.*
