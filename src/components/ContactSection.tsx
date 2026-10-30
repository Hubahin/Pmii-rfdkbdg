import React, { useState } from 'react';
import { Mail, MapPin, Send, Instagram, Music2, Phone, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<{ loading: boolean; success: boolean; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, msg: 'Harap lengkapi semua bidang yang wajib.' });
      return;
    }

    setStatus({ loading: true, success: false, msg: 'Mengirim pesan...' });
    try {
      const res = await api.sendContact(formData);
      if (res.success) {
        setStatus({ loading: false, success: true, msg: res.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, msg: 'Gagal mengirim pesan. Silakan coba lagi.' });
      }
    } catch {
      setStatus({ loading: false, success: false, msg: 'Terjadi kesalahan jaringan.' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#0a1128] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-[#FFC107] uppercase">
            HUBUNGI PENGURUS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Kontak & Sekretariat Rayon
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Silaturahim terbuka bagi mahasiswa baru, kader dakwah, pengurus komisariat, serta mitra strategis pergerakan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Card Left */}
          <div className="lg:col-span-5 bg-[#002B7F]/40 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                PMII Rayon Fakultas Dakwah & Komunikasi
              </h3>
              <p className="text-xs text-[#FFC107] font-semibold uppercase tracking-wider">
                Komisariat UIN SGD Cabang Kota Bandung
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-200">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/10 text-[#FFC107] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider mb-0.5">
                    Alamat Sekretariat:
                  </strong>
                  <span>
                    Jl. A.H. Nasution No. 105, Cipadung, Kec. Cibiru, Kota Bandung, Jawa Barat 40614
                    (Dekat Kampus 1 UIN Sunan Gunung Djati Bandung)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/10 text-[#FFC107] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider mb-0.5">
                    Surat Elektronik (Email):
                  </strong>
                  <a
                    href="mailto:rayondakom2025@gmail.com"
                    className="text-[#FFC107] hover:underline font-mono"
                  >
                    rayondakom2025@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/10 text-[#FFC107] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-xs uppercase tracking-wider mb-0.5">
                    Layanan Humas & Kaderisasi:
                  </strong>
                  <span className="font-mono text-slate-300">
                    +62 812-2456-7890 (Humas Rayon FDK)
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs font-semibold text-slate-300 block mb-3">
                Kanal Media Sosial Resmi:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/pmiirayonfdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-[#FFC107] hover:text-[#002B7F] text-xs font-bold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@pmiirayonfdk</span>
                </a>
                <a
                  href="https://tiktok.com/@pmiirayonfdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-[#FFC107] hover:text-[#002B7F] text-xs font-bold transition-colors"
                >
                  <Music2 className="w-4 h-4" />
                  <span>@pmiirayonfdk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Card Right */}
          <div className="lg:col-span-7 bg-[#002B7F]/30 border border-white/15 rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-2">Kirim Pesan / Aspirasi</h3>
            <p className="text-xs text-slate-300 mb-6">
              Punya pertanyaan seputar MAPABA, Sekolah Islam Gender (SIG) KOPRI, atau ajakan audiensi? Tuliskan pesan Anda di bawah ini.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Sahabat Wildan"
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Aktif *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC107]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Subjek Pesan
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Contoh: Pendaftaran MAPABA / Konsultasi Advokasi"
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Isi Pesan *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan pesan, aspirasi, atau pertanyaan Anda..."
                  className="w-full bg-[#0a1128] border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FFC107]"
                />
              </div>

              {status && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    status.success
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {status.success && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span>{status.msg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status?.loading}
                className="w-full sm:w-auto px-8 py-3 bg-[#FFC107] hover:bg-[#F4B400] text-[#002B7F] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status?.loading ? 'Mengirim...' : 'Kirim Pesan'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
