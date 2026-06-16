/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FileText, Download, Check, HelpCircle, ChevronDown, ChevronUp, Clock, Info, ShieldCheck, AlertCircle } from "lucide-react";
import { TEMPLATE_DOCUMENTS, FAQ_ITEMS } from "../data";

interface LayananViewProps {
  onStartSubmission: (serviceName: string) => void;
  onShowNotification: (message: string, type: "success" | "info") => void;
}

export default function LayananView({ onStartSubmission, onShowNotification }: LayananViewProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleDownload = (docId: string, title: string) => {
    setDownloadingId(docId);
    onShowNotification(`Mengunduh dokumen: ${title}...`, "info");
    
    setTimeout(() => {
      setDownloadingId(null);
      onShowNotification(`Dokumen "${title}" berhasil diunduh!`, "success");
    }, 1500);
  };

  return (
    <div className="space-y-10 pb-10">
      {/* 1. Page Header */}
      <section className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm text-left relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-5 select-none pointer-events-none">
          <FileText className="h-56 w-56 text-[#0B2F5C]" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-black text-[#0B2F5C] leading-tight">
            Layanan Publik
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-normal leading-relaxed">
            Panduan lengkap dan unduhan formulir untuk berbagai keperluan administrasi desa. Kami berkomitmen memberikan pelayanan yang cepat, transparan, dan mudah diakses oleh seluruh warga Desa Mandiri.
          </p>
        </div>
      </section>

      {/* 2. Panduan Pengajuan Dokumen Section */}
      <section id="panduan-pengajuan-section" className="space-y-6 text-left">
        <h3 className="font-display font-black text-lg md:text-xl text-[#0B2F5C] flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-[#BF8F00] rounded-full inline-block"></span>
          <span>Panduan Pengajuan Dokumen</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Pengajuan KTP Baru */}
          <div className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-gray-900">
                Pengajuan KTP Baru
              </h4>
              <p className="text-xs text-gray-500 font-normal leading-relaxed">
                <strong>Syarat:</strong> Fotokopi KK, Surat Pengantar RT/RW, dan Pas Foto 3x4 (2 lembar). Proses pengerjaan 3-5 hari kerja di kantor desa.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                id="layanan-ktp-detail-btn"
                onClick={() => onStartSubmission("Pengajuan KTP Baru")}
                className="w-full text-center bg-[#0B2F5C] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#072447] active:scale-98 transition-all"
              >
                Lihat Detail & Ajukan
              </button>
            </div>
          </div>

          {/* Card 2: Surat Keterangan Domisili */}
          <div className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-850 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-gray-900">
                Surat Keterangan Domisili
              </h4>
              <p className="text-xs text-gray-500 font-normal leading-relaxed">
                <strong>Syarat:</strong> Fotokopi KTP, KK, dan Surat Pengantar RT/RW setempat. Dokumen dapat ditunggu jika pejabat berwenang ada di tempat.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                id="layanan-domisili-detail-btn"
                onClick={() => onStartSubmission("Surat Keterangan Domisili")}
                className="w-full text-center bg-[#0B2F5C] text-white py-2 rounded-lg text-xs font-bold hover:bg-[#072447] active:scale-98 transition-all"
              >
                Lihat Detail & Ajukan
              </button>
            </div>
          </div>

          {/* Card 3: Pembuatan Kartu Keluarga */}
          <div className="bg-white border border-[#BF8F00] border-2 rounded-xl overflow-hidden shadow-md flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-amber-55 text-[#BF8F00] bg-opacity-10 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-gray-950">
                Pembuatan Kartu Keluarga
              </h4>
              <p className="text-xs text-gray-600 font-normal leading-relaxed">
                Untuk KK baru (pecah KK/menikah) wajib melampirkan Buku Nikah asli dan fotokopi KTP suami istri. Formulir pendaftaran dapat diisi secara digital.
              </p>
            </div>
            <div className="p-4 bg-amber-50/50 border-t border-amber-100">
              <button
                id="layanan-kk-submit-btn"
                onClick={() => onStartSubmission("Pembuatan Kartu Keluarga")}
                className="w-full text-center bg-[#BF8F00] text-white py-2 rounded-lg text-xs font-bold hover:bg-yellow-700 active:scale-98 transition-all"
              >
                Mulai Pengajuan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Unduhan Formulir Section */}
      <section id="unduhan-formulir-section" className="space-y-4 text-left">
        <h3 className="font-display font-black text-lg md:text-xl text-[#0B2F5C] flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-[#BF8F00] rounded-full inline-block"></span>
          <span>Unduhan Formulir</span>
        </h3>
        
        <p className="text-xs text-gray-500 font-normal leading-relaxed">
          Silakan unduh formulir yang diperlukan sebelum datang ke kantor desa untuk mempercepat proses pelayanan adminduk.
        </p>

        <div className="space-y-3 max-w-2xl bg-white p-4 border border-gray-150 rounded-xl shadow-sm">
          {TEMPLATE_DOCUMENTS.map((doc) => {
            const isDownloading = downloadingId === doc.id;
            return (
              <div
                key={doc.id}
                id={`doc-row-${doc.id}`}
                className="flex items-center justify-between p-3.5 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="h-9 w-9 rounded bg-red-50 text-red-600 flex items-center justify-center uppercase font-mono font-bold text-[10px]">
                    {doc.format}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-gray-900 leading-snug">
                      {doc.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-semibold">{doc.format} • {doc.size}</p>
                  </div>
                </div>

                <button
                  id={`btn-download-${doc.id}`}
                  onClick={() => handleDownload(doc.id, doc.title)}
                  disabled={isDownloading}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                    isDownloading
                      ? "bg-slate-100 text-slate-400 border-slate-200"
                      : "bg-white border-gray-200 text-[#0B2F5C] hover:bg-[#0B2F5C] hover:text-white"
                  }`}
                  aria-label="Unduh Formulir"
                >
                  {isDownloading ? (
                    <div className="h-4.5 w-4.5 rounded-full border-2 border-[#0B2F5C] border-t-transparent animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section id="faq-section" className="space-y-4 text-left">
        <h3 className="font-display font-black text-lg md:text-xl text-[#0B2F5C] flex items-center space-x-2">
          <span className="h-5 w-1.5 bg-[#BF8F00] rounded-full inline-block"></span>
          <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
        </h3>

        <div className="space-y-3 max-w-3xl">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-row-${faq.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all text-left"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 focus:outline-none text-left"
                >
                  <span className="font-display font-bold text-xs md:text-sm text-gray-900 leading-relaxed pr-4">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#BF8F00] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-slate-50/50">
                    <p className="text-xs text-gray-600 font-normal leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
