import { Article, DownloadFile, GalleryItem, KopriContent, AboutContent, TeamMember } from '../types';

export const INITIAL_ABOUT: AboutContent = {
  pmiiDescription:
    'Pergerakan Mahasiswa Islam Indonesia (PMII) lahir dari kesadaran historis kaum muda nahdliyin pada tanggal 17 April 1960 di Surabaya. Sebagai organisasi kemahasiswaan independen yang berlandaskan paham keislaman Ahlussunnah wal Jama’ah (Aswaja) dan kebangsaan Indonesia, PMII senantiasa konsisten melahirkan kader intelektual transformatif yang siap mengabdi demi kemaslahatan umat dan bangsa.',
  pmiiPurpose:
    'Terbentuknya pribadi muslim Indonesia yang bertaqwa kepada Allah SWT, berbudi luhur, berilmu, cakap dan bertanggung jawab mengamalkan ilmunya serta komitmen memperjuangkan cita-cita kemerdekaan Indonesia.',
  rayonFdkVision:
    'Terwujudnya PMII Rayon Fakultas Dakwah dan Komunikasi yang progresif, berintegritas tinggi, unggul dalam penguasaan media dakwah digital, serta tanggap terhadap dinamika sosial-advokasi kampus UIN Sunan Gunung Djati Bandung.',
  rayonFdkMissions: [
    'Menanamkan dan mengamalkan nilai-nilai Islam Ahlussunnah wal Jama’ah an-Nahdliyyah serta Nilai Dasar Pergerakan (NDP) di lingkungan kampus.',
    'Menyelenggarakan sistem kaderisasi formal (MAPABA, PKD), informal, dan non-formal yang adaptif terhadap era transformasi digital dan komunikasi.',
    'Memperkuat kapasitas keilmuan dakwah, jurnalistik, public speaking, dan advokasi sosial mahasiswa Fakultas Dakwah dan Komunikasi.',
    'Membangun jejaring kolaborasi strategis dengan ormawa kampus, alumni, masyarakat sipil, dan lembaga dakwah Islam Nusantara.'
  ],
  triMoto: [
    { title: 'Dzikir', desc: 'Senantiasa mengingat Allah SWT dalam setiap hembusan nafas dan gerak langkah pergerakan.' },
    { title: 'Fikir', desc: 'Mengasah nalar kritis, analitis, dan intelektual dalam merespons realitas sosial.' },
    { title: 'Amal Sholeh', desc: 'Mengejawantahkan ilmu dan gagasan ke dalam tindakan konkret demi kemaslahatan bersama.' }
  ],
  triKomitmen: [
    { title: 'Kejujuran', desc: 'Integritas moral dan komitmen terhadap kebenaran hakiki.' },
    { title: 'Kebenaran', desc: 'Menjunjung objektivitas dan prinsip keadilan dalam berpikir dan bertindak.' },
    { title: 'Keadilan', desc: 'Berpihak kepada kaum mustadh’afin dan mewujudkan tatanan sosial yang berkeadilan.' }
  ],
  triKhidmat: [
    { title: 'Taqwa Kepada Allah SWT', desc: 'Fondasi utama spiritualitas kader pergerakan.' },
    { title: 'Berbakti Kepada Nusa & Bangsa', desc: 'Pengabdian tulus untuk keutuhan dan kemajuan Negara Kesatuan Republik Indonesia.' },
    { title: 'Loyalitas Terhadap Organisasi', desc: 'Menjaga marwah, tertib organisasi, dan kesinambungan perjuangan PMII.' }
  ],
  kopriBrief:
    'Korps PMII Putri (KOPRI) Mahbub Rayon Fakultas Dakwah dan Komunikasi adalah wadah pengkaderan dan perjuangan hak-hak perempuan berbasis nilai keadilan gender Islam (mabadi’ khaira ummah). KOPRI Rayon FDK aktif mengawal wacana kesetaraan, kepemimpinan perempuan muslimah, dan pencegahan kekerasan berbasis gender di lingkungan perguruan tinggi.'
};

export const INITIAL_KOPRI: KopriContent = {
  tagline: 'KOPRI Mandiri, Berdaya, dan Memimpin Peradaban Berkeadilan',
  profile:
    'Korps PMII Putri (KOPRI) didirikan pada tanggal 25 November 1967 di Semarang sebagai sayap pergerakan mahasiswi Islam Indonesia. Di lingkungan Rayon Fakultas Dakwah dan Komunikasi UIN Sunan Gunung Djati Bandung, KOPRI Mahbub mendedikasikan diri sebagai laboratorium kepemimpinan perempuan yang kritis, cakap berdakwah, santun, dan progresif.',
  history:
    'Perjalanan KOPRI berakar dari kebutuhan ruang kaderisasi afirmatif bagi kader putri PMII agar memiliki kemandirian bersuara, berdialektika, dan berkontribusi strategis di pucuk kepemimpinan publik dan dakwah keumatan.',
  vision:
    'Mewujudkan kader Korps PMII Putri Rayon FDK yang berwawasan gender transformatif, mandiri secara intelektual dan ekonomi, serta menjadi teladan dakwah inklusif di era kontemporer.',
  missions: [
    'Menginternalisasi nilai-nilai keadilan gender berbasis perspektif Islam rahmatan lil ‘alamin.',
    'Mengakselerasi pembinaan potensi kader putri dalam bidang riset komunikasi, literasi dakwah, dan kewirausahaan kreatif.',
    'Menjadi garda terdepan advokasi pendampingan korban kekerasan seksual dan perundungan di ranah kampus.',
    'Menyelenggarakan Sekolah Islam Gender (SIG) yang berkualitas dan terukur.'
  ],
  sigTitle: 'Sekolah Islam Gender (SIG)',
  sigDescription:
    'Kaderisasi formal tingkat pertama KOPRI yang membekali kader dengan pemahaman teologis, sosiologis, dan historis mengenai relasi gender dalam Islam serta instrumen analisis sosial feminis kebangsaan.',
  programs: [
    {
      id: 'p1',
      title: 'Sekolah Islam Gender (SIG)',
      description: 'Pengkaderan formal KOPRI dengan materi tafsir ayat-ayat kesetaraan, fiqh nisa, dan advokasi perempuan.',
      badge: 'Kaderisasi Wajib'
    },
    {
      id: 'p2',
      title: 'KOPRI Ngaji Kitab Kuning & Gender',
      description: 'Kajian dwimingguan membedah kitab Uqud al-Lujjayn, Qira’ah Mubadalah, dan karya ulama perempuan.',
      badge: 'Kajian Rutin'
    },
    {
      id: 'p3',
      title: 'Kelas Literasi Digital & Public Speaking',
      description: 'Pelatihan pembuatan konten dakwah ramah perempuan, podcast sahabati, dan retorika panggung.',
      badge: 'Skill Lab'
    },
    {
      id: 'p4',
      title: 'Posko Sahabat Tanggap (Satgas PPKS)',
      description: 'Layanan ruang aman, pendampingan konseling sebaya, dan advokasi kasus bagi mahasiswi.',
      badge: 'Advokasi Sosial'
    }
  ]
};

export const INITIAL_TEAM: TeamMember[] = [
  // BPH Rayon FDK
  {
    id: 't1',
    name: 'Sahabat Ahmad Fauzan M., S.Sos.',
    role: 'Ketua Rayon FDK',
    category: 'bph',
    subCategory: 'Badan Pengurus Harian',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 1
  },
  {
    id: 't2',
    name: 'Sahabat Muhammad Rizky Al-Ghazali',
    role: 'Wakil Ketua I (Kaderisasi)',
    category: 'bph',
    subCategory: 'Badan Pengurus Harian',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 2
  },
  {
    id: 't3',
    name: 'Sahabat Wildan Maulana Malik',
    role: 'Wakil Ketua II (Gerakan & Advokasi)',
    category: 'bph',
    subCategory: 'Badan Pengurus Harian',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 3
  },
  {
    id: 't4',
    name: 'Sahabat Fikri Haikal',
    role: 'Sekretaris Rayon',
    category: 'bph',
    subCategory: 'Badan Pengurus Harian',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 4
  },
  {
    id: 't5',
    name: 'Sahabati Nabila Putri Wardani',
    role: 'Bendahara Rayon',
    category: 'bph',
    subCategory: 'Badan Pengurus Harian',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 5
  },
  // KOPRI Rayon FDK
  {
    id: 't6',
    name: 'Sahabati Siti Sarah Aulia, S.I.Kom.',
    role: 'Ketua KOPRI Rayon FDK',
    category: 'kopri',
    subCategory: 'Badan Pengurus KOPRI Mahbub',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 6
  },
  {
    id: 't7',
    name: 'Sahabati Fatimah Azzahra',
    role: 'Wakil Ketua KOPRI (Kaderisasi)',
    category: 'kopri',
    subCategory: 'Badan Pengurus KOPRI Mahbub',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 7
  },
  {
    id: 't8',
    name: 'Sahabati Annisa Nur Rahmah',
    role: 'Sekretaris KOPRI',
    category: 'kopri',
    subCategory: 'Badan Pengurus KOPRI Mahbub',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 8
  },
  {
    id: 't9',
    name: 'Sahabati Dinda Larasati',
    role: 'Bendahara KOPRI',
    category: 'kopri',
    subCategory: 'Badan Pengurus KOPRI Mahbub',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 9
  },
  // Biro-biro
  {
    id: 't10',
    name: 'Sahabat Rayhan Pratama',
    role: 'Koordinator Biro Media & Infokom Dakwah',
    category: 'biro',
    subCategory: 'Biro Komunikasi & Informasi',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 10
  },
  {
    id: 't11',
    name: 'Sahabat Dimas Arya Sena',
    role: 'Koordinator Biro Advokasi Kebijakan Kampus',
    category: 'biro',
    subCategory: 'Biro Gerakan & Advokasi',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 11
  },
  {
    id: 't12',
    name: 'Sahabati Melani Kusuma',
    role: 'Koordinator Biro Kajian Gender KOPRI',
    category: 'kopri',
    subCategory: 'Biro KOPRI',
    period: '2026-2027',
    photoUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    instagram: 'https://instagram.com/pmiirayonfdk',
    tiktok: 'https://tiktok.com/@pmiirayonfdk',
    order: 12
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'MAPABA Raya FDK 2026: Membentuk Kader Mujahid Berdaya Saing Digital',
    category: 'Kaderisasi',
    summary:
      'Masa Penerimaan Anggota Baru (MAPABA) PMII Rayon Fakultas Dakwah dan Komunikasi UIN SGD Bandung sukses melahirkan puluhan kader militan yang siap berdiaspora di kancah dakwah digital.',
    content: `Kegiatan Masa Penerimaan Anggota Baru (MAPABA) PMII Rayon Fakultas Dakwah dan Komunikasi Komisariat UIN Sunan Gunung Djati Cabang Kota Bandung diselenggarakan dengan khidmat dan penuh antusiasme. Mengusung tema "Internalisasi Nilai Dasar Pergerakan dalam Menghadapi Disrupsi Komunikasi dan Dakwah Kontemporer", kaderisasi formal tingkat pertama ini menjadi gerbang awal lahirnya mujahid-mujahidah pergerakan.

Ketua Rayon FDK dalam sambutannya menegaskan bahwa mahasiswa dakwah memiliki amanah ganda: sebagai penjaga marwah Islam moderat (Aswaja an-Nahdliyyah) sekaligus kreator narasi damai di media sosial.

"Kader PMII FDK tidak boleh gagap teknologi. Justru ruang digital adalah mimbar dakwah masa kini yang wajib kita kuasai dengan karya, narasi ilmiah, dan integritas moral," tegasnya di hadapan ratusan peserta.

Rangkaian materi yang disampaikan meliputi Ke-PMII-an, Nilai Dasar Pergerakan (NDP), ASWAJA sebagai Manhaj al-Fikr wal Harakah, Sejarah Bangsa, serta Analisis Sosial dasar. Acara ditutup dengan prosesi pembaiatan yang mengharukan dan penyerahan sertifikat anggota baru.`,
    thumbnailUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    author: 'Biro Infokom Rayon FDK',
    publishedAt: '24 Oktober 2026',
    views: 428,
    featured: true
  },
  {
    id: 'art-2',
    title: 'KOPRI Mahbub FDK Gelar Sekolah Islam Gender: Meneguhkan Kepemimpinan Sahabati',
    category: 'KOPRI',
    summary:
      'Sekolah Islam Gender (SIG) Rayon FDK 2026 menghadirkan narasumber pakar fiqh keadilan gender dan aktivis perempuan Jawa Barat untuk mengurai problem relasi kuasa di institusi pendidikan.',
    content: `Korps PMII Putri (KOPRI) Mahbub Rayon Fakultas Dakwah dan Komunikasi UIN Sunan Gunung Djati Bandung sukses menyelenggarakan Sekolah Islam Gender (SIG). Kegiatan ini dihadiri puluhan sahabati dari berbagai utusan rayon se-Komisariat UIN SGD dan cabang di wilayah Bandung Raya.

Ketua KOPRI FDK menyampaikan bahwa SIG bukanlah semata agenda formalitas organisasi, melainkan ruang pembongkaran stereotip dan penguatan basis argumentasi keislaman ramah perempuan.

"Kita mengkaji secara komprehensif bagaimana Islam sejak awal diturunkan membawa misi pembebasan perempuan dari kungkungan jahiliyah. Sahabati PMII harus mandiri, artikulatif, dan memiliki keberanian memimpin," ungkapnya.

Fokus bahasan SIG mencakup Konsep Dasar Gender & Seksualitas, Fiqh Keadilan Hakiki Perempuan, Sejarah Gerakan Perempuan di Indonesia, hingga teknik investigasi dan pendampingan korban pelecehan seksual di lingkungan akademik.`,
    thumbnailUrl: '/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png',
    author: 'KOPRI Mahbub FDK',
    publishedAt: '18 Oktober 2026',
    views: 312,
    featured: false
  },
  {
    id: 'art-3',
    title: 'Mengakarkan Nilai Aswaja dalam Komunikasi Dakwah Multikultural',
    category: 'Opini',
    summary:
      'Refleksi kader pergerakan mengenai pentingnya prinsip Tawasuth, Tawazun, Tasamuh, dan Ta’adul dalam memproduksi konten dakwah di era algoritma media sosial yang polaristik.',
    content: `Perkembangan ruang komunikasi saat ini kerap kali diwarnai oleh politik identitas, ujaran kebencian, dan narasi intoleran yang mengaburkan keindahan ajaran Islam. Bagi kader PMII Fakultas Dakwah dan Komunikasi, situasi ini menuntut kehadiran model dakwah yang sejuk, inklusif, dan dialogis.

Empat pilar Aswaja—Tawasuth (moderat), Tawazun (seimbang), Tasamuh (toleran), dan Ta'adul (adil)—bukan sekadar hafalan materi kaderisasi, melainkan kompas moral dalam setiap kalimat yang kita tulis, visual yang kita rancang, serta video yang kita siarkan.

Dakwah bil hal dan dakwah bil qalam di era sekarang bertransformasi menjadi dakwah digital. Mari manfaatkan platform digital untuk menyebarkan kasih sayang Islam yang rahmatan lil 'alamin.`,
    thumbnailUrl: '/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png',
    author: 'Sahabat Ahmad Fauzan',
    publishedAt: '12 Oktober 2026',
    views: 265,
    featured: false
  },
  {
    id: 'art-4',
    title: 'Sekolah Advokasi Mahasiswa: Mengawal Kebijakan UKT dan Fasilitas Kampus',
    category: 'Advokasi',
    summary:
      'Biro Gerakan & Advokasi Rayon FDK mengadakan konsolidasi dan pelatihan riset kebijakan guna memperjuangkan transparansi penyesuaian UKT bagi mahasiswa kurang mampu.',
    content: `Sebagai agen kontrol sosial dan penyambung lidah mahasiswa, Biro Gerakan dan Advokasi PMII Rayon Dakwah dan Komunikasi menggelar workshop advokasi anggaran dan investigasi kebijakan kampus.

Peserta diajarkan teknik pemetaan stakeholder, penyusunan legal drafting, audiensi konstruktif dengan pimpinan dekanat, serta perumusan petisi berbasis data akurat.

Langkah ini membuktikan dedikasi PMII yang tidak hanya berkutat pada ranah wacana, melainkan hadir nyata membela hak-hak mahasiswa dakwah agar tidak ada yang putus kuliah karena kendala ekonomi.`,
    thumbnailUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    author: 'Biro Advokasi FDK',
    publishedAt: '05 Oktober 2026',
    views: 198,
    featured: false
  }
];

export const INITIAL_DOWNLOADS: DownloadFile[] = [
  {
    id: 'dl-1',
    title: 'AD/ART PMII (Anggaran Dasar & Anggaran Rumah Tangga) Terkini',
    category: 'Konstitusi & Hukum',
    fileUrl: 'https://pmii.id/dokumen/ad-art-pmii.pdf',
    fileSize: '2.4 MB',
    fileType: 'PDF',
    downloadCount: 384,
    uploadDate: '2026-08-15',
    description: 'Konstitusi induk organisasi PMII hasil Kongres Nasional terbaru sebagai pedoman normatif gerakan.'
  },
  {
    id: 'dl-2',
    title: 'Modul & Silabus MAPABA PMII Rayon Fakultas Dakwah dan Komunikasi',
    category: 'Modul MAPABA',
    fileUrl: 'https://pmii-dakom.org/download/modul-mapaba-fdk-2026.pdf',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    downloadCount: 612,
    uploadDate: '2026-09-01',
    description: 'Buku panduan peserta dan fasilitator Masa Penerimaan Anggota Baru Rayon FDK UIN SGD Bandung.'
  },
  {
    id: 'dl-3',
    title: 'Buku Pedoman Kaderisasi KOPRI & Materi Pokok SIG (Sekolah Islam Gender)',
    category: 'Produk Hukum KOPRI',
    fileUrl: 'https://kopri.pmii.id/pedoman-sig.pdf',
    fileSize: '3.1 MB',
    fileType: 'PDF',
    downloadCount: 295,
    uploadDate: '2026-07-20',
    description: 'Silabus resmi kurikulum keperempuanan KOPRI, materi fiqh kesetaraan, dan instrumen analisis gender.'
  },
  {
    id: 'dl-4',
    title: 'Materi Pelatihan Kader Dasar (PKD) PMII Cabang Kota Bandung',
    category: 'Materi PKD',
    fileUrl: 'https://pmiikotabandung.or.id/modul-pkd.pdf',
    fileSize: '5.2 MB',
    fileType: 'PDF',
    downloadCount: 420,
    uploadDate: '2026-06-11',
    description: 'Modul pengkaderan formal tingkat kedua bagi kader mujahid yang hendak menjadi pengurus rayon & komisariat.'
  },
  {
    id: 'dl-5',
    title: 'Format Administrasi, Persuratan & LPJ RTK Rayon FDK',
    category: 'Administrasi & SK',
    fileUrl: 'https://pmii-dakom.org/download/format-administrasi-fdk.zip',
    fileSize: '1.8 MB',
    fileType: 'ZIP',
    downloadCount: 180,
    uploadDate: '2026-08-30',
    description: 'Template surat resmi kop rayon, proposal kegiatan dakwah, formulir pendaftaran, dan LPJ standar.'
  },
  {
    id: 'dl-6',
    title: 'Pedoman Penulisan Karya Opini & Modul Jurnalisme Dakwah Digital',
    category: 'Administrasi & SK',
    fileUrl: 'https://pmii-dakom.org/download/jurnalisme-dakwah-pmii.pdf',
    fileSize: '2.1 MB',
    fileType: 'PDF',
    downloadCount: 220,
    uploadDate: '2026-09-18',
    description: 'Panduan praktis kader dalam mempublikasikan artikel opini di media massa dan portal pergerakan.'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Pembukaan MAPABA Raya Rayon FDK',
    category: 'Kaderisasi',
    imageUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    date: 'Oktober 2026',
    description: 'Prosesi pembukaan Masa Penerimaan Anggota Baru dihadiri pimpinan dekanat dan alumni dakwah.'
  },
  {
    id: 'g-2',
    title: 'Sekolah Islam Gender (SIG) KOPRI Mahbub',
    category: 'KOPRI',
    imageUrl: '/public/assets/aistudio/4_20261025_010207_0001_0cda6422.png',
    date: 'Oktober 2026',
    description: 'Forum dialektika sahabati membedah ayat-ayat kesetaraan dan kepemimpinan publik perempuan.'
  },
  {
    id: 'g-3',
    title: 'Khatmil Qur’an & Doa Bersama Rayon FDK',
    category: 'Keagamaan',
    imageUrl: '/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png',
    date: 'September 2026',
    description: 'Tradisi tahlil dan khotmil qur’an rutin di sekretariat PMII Rayon FDK Cibiru.'
  },
  {
    id: 'g-4',
    title: 'Diskusi Reboan: Membedah Media Dakwah Kontemporer',
    category: 'Diskusi',
    imageUrl: '/public/assets/aistudio/Icon_Character_PMII_74be1e0b.png',
    date: 'September 2026',
    description: 'Kajian rutin intelektual mengupas tren komunikasi dan strategi dakwah berbasis kecerdasan buatan.'
  },
  {
    id: 'g-5',
    title: 'Aksi Solidaritas & Advokasi Mahasiswa',
    category: 'Aksi & Advokasi',
    imageUrl: '/public/assets/aistudio/3_20261025_010207_0000_a87cdfe9.png',
    date: 'Agustus 2026',
    description: 'Pendampingan mahasiswa baru dan advokasi penurunan UKT di gedung rektorat UIN SGD Bandung.'
  }
];
