/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Volume2, ShieldCheck, HelpCircle } from "lucide-react";

interface KontakProps {
  onShowNotification: (message: string, type: "success" | "info") => void;
}

export default function KontakView({ onShowNotification }: KontakProps) {
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    phone: "",
    category: "ASPIRASI",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSent, setSuccessSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      onShowNotification("Pastikan nama dan isi pesan sudah terisi!", "info");
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessSent(true);
      onShowNotification("Aspirasi/Laporan berhasil dikirim ke sekretariat desa!", "success");
      // Reset after success
      setFormData({
        name: "",
        nik: "",
        phone: "",
        category: "ASPIRASI",
        message: "",
      });
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Page Header */}
      <section className="text-center space-y-3 px-2 max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-extrabold text-[#0B2F5C] leading-tight select-none">
          Hubungi Kami
        </h2>
        <p className="text-sm text-gray-500 font-normal leading-relaxed">
          Punya pertanyaan, keluhan, aspirasi, atau memerlukan informasi lebih lanjut? Tim Hubungan Masyarakat Desa Mandiri siap mendengarkan dan melayani Anda.
        </p>
      </section>

      {/* Grid: Map and Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Side: Contact Information & Map (cols-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-5">
            <h3 className="font-display font-bold text-base text-gray-900 border-b border-gray-100 pb-3">
              Informasi Penghubung
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-5 w-5 text-[#BF8F00] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-800">Alamat Balai Desa</p>
                  <p className="text-xs text-gray-500 font-normal leading-relaxed">
                    Jl. Raya Utama No. 88, Desa Mandiri, Kecamatan Sawangan, Kabupaten Nusantara
                  </p>
                </div>
              </div>

              {/* Call Center */}
              <div className="flex items-start space-x-3.5">
                <Phone className="h-5 w-5 text-[#BF8F00] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-800">Telepon & WhatsApp</p>
                  <p className="text-xs text-gray-500 font-normal leading-relaxed">
                    +62 21-8291-3829 (Telepon Kantor)<br />
                    +62 812-3456-7890 (Aduan WA Cepat)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3.5">
                <Mail className="h-5 w-5 text-[#BF8F00] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-800">Email Surat Resmi</p>
                  <p className="text-xs text-[#0B2F5C] font-semibold hover:underline cursor-pointer">
                    sekretariat@desamandiri.go.id
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3.5 border-t border-gray-50 pt-4">
                <Clock className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-gray-800">Jam Layanan Kantor</p>
                  <p className="text-xs text-gray-500 font-normal leading-relaxed">
                    Senin - Jum'at: 08:00 - 15:30 WIB<br />
                    Sabtu, Minggu, & Libur Nasional: Tutup
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-sm space-y-3">
            <h4 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest">
              Lokasi Peta Kantor Desa
            </h4>
            
            {/* Interactive styled Map Placeholder */}
            <div className="h-44 w-full bg-slate-100 rounded-lg overflow-hidden relative border border-gray-200">
              {/* Fake grid lines and roads for customized modern micro-map design */}
              <div className="absolute inset-0 bg-[#e5e9f0]" />
              <div className="absolute left-1/2 top-0 bottom-0 w-6 bg-white rotate-12 opacity-80" />
              <div className="absolute top-1/3 left-0 right-0 h-6 bg-white -rotate-12 opacity-80" />
              
              {/* Highlight Pin */}
              <div className="absolute left-[54%] top-[40%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="bg-[#0B2F5C] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap mb-1">
                  Balai Desa Mandiri
                </div>
                <div className="h-4.5 w-4.5 rounded-full bg-[#BF8F00] flex items-center justify-center border-2 border-white shadow animate-bounce">
                  <MapPin className="h-2.5 w-2.5 text-white" />
                </div>
              </div>
              
              {/* Bottom tag */}
              <div className="absolute bottom-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-gray-100 text-[8px] font-mono font-bold text-gray-500">
                LAT: -6.4024 • LON: 106.7782
              </div>
            </div>

            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="referrer" 
              className="inline-flex items-center text-[11px] font-bold text-[#0B2F5C] hover:text-[#BF8F00] transition-colors hover:underline space-x-1"
            >
              <span>Buka di Google Maps</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Feedback Form (cols-7) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-gray-150 p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-bold text-base md:text-lg text-gray-900 border-b border-gray-100 pb-3 mb-6">
              Kirim Aspirasi & Aduan Cepat
            </h3>

            {successSent ? (
              <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-6 text-center space-y-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-emerald-900">Pesan Pengaduan Diterima</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto mt-1 font-normal">
                    Terima kasih atas laporan Anda. Aspirasi Anda telah terdaftar secara resmi di Hubmas Desa dengan nomor lacak: <strong className="font-mono">#ADM-{Math.floor(1000 + Math.random() * 9000)}</strong>. Kami akan segera menindaklanjutinya.
                  </p>
                </div>
                <button
                  id="contact-reset-btn"
                  onClick={() => setSuccessSent(false)}
                  className="bg-[#0B2F5C] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#072447] active:scale-95 transition-all outline-none"
                >
                  Kirim Pesan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Nama Lengkap *</label>
                    <input
                      id="contact-input-name"
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0B2F5C] focus:bg-white transition-all font-sans"
                    />
                  </div>

                  {/* NIK field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">NIK (Sesuai KTP)</label>
                    <input
                      id="contact-input-nik"
                      type="text"
                      maxLength={16}
                      placeholder="Optional, untuk verifikasi"
                      value={formData.nik}
                      onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0B2F5C] focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone No */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">No. Telepon / WA</label>
                    <input
                      id="contact-input-phone"
                      type="tel"
                      placeholder="Contoh: 081234567xx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0B2F5C] focus:bg-white transition-all font-sans"
                    />
                  </div>

                  {/* Category select */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Kategori Pengaduan</label>
                    <select
                      id="contact-select-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0B2F5C] focus:bg-white transition-all font-sans"
                    >
                      <option value="ASPIRASI">Aspirasi Pembangunan</option>
                      <option value="KELUHAN">Keluhan Layanan</option>
                      <option value="PERMINTAAN_INFO">Permintaan Informasi</option>
                      <option value="LAINNYA">Lain-lain</option>
                    </select>
                  </div>
                </div>

                {/* Message body */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Isi Laporan / Pesan *</label>
                  <textarea
                    id="contact-input-message"
                    required
                    rows={4}
                    placeholder="Tuliskan secara lengkap pengaduan, kritik, atau saran Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#0B2F5C] focus:bg-white transition-all font-sans resize-none"
                  />
                </div>

                {/* Disclaimer */}
                <div className="flex items-start space-x-2 bg-slate-50 p-3 rounded-lg border border-gray-100 text-[10px] text-gray-500 leading-normal font-normal">
                  <Volume2 className="h-4 w-4 text-[#BF8F00] shrink-0 mt-0.5" />
                  <span>
                    <strong>Pemberitahuan:</strong> Pemerintah Desa Mandiri menjamin kerahasiaan identitas pelapor untuk aduan atau masukan tertentu demi menjaga kenyamanan gotong royong warga.
                  </span>
                </div>

                {/* Submit button */}
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0B2F5C] hover:bg-[#072447] text-white py-3 rounded-lg text-xs font-bold transition-all active:scale-98 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Mengirimkan Aspirasi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Kirim Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
