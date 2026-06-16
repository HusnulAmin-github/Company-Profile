/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BarChart3, Download, ExternalLink, Globe, HelpCircle, Info, ShieldCheck, Mail, Send, Check } from "lucide-react";
import { REPORT_DOCUMENTS } from "../data";

interface TransparansiViewProps {
  onOpenRequestInfoModal: () => void;
  onShowNotification: (message: string, type: "success" | "info") => void;
}

export default function TransparansiView({ onOpenRequestInfoModal, onShowNotification }: TransparansiViewProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (docId: string, title: string) => {
    setDownloadingId(docId);
    onShowNotification(`Mengunduh laporan: ${title}...`, "info");
    
    setTimeout(() => {
      setDownloadingId(null);
      onShowNotification(`Laporan "${title}" berhasil diunduh!`, "success");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0B2F5C] to-[#0d3466] text-white rounded-xl p-8 shadow-md text-left select-none relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
          <BarChart3 className="h-64 w-64 text-white" />
        </div>

        <div className="relative z-10 space-y-3 max-w-3xl">
          <span className="inline-block rounded bg-[#BF8F00] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            Keterbukaan Informasi
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-black">
            Transparansi Anggaran
          </h2>
          <p className="text-xs md:text-sm text-blue-100 font-normal leading-relaxed">
            Laporan terbuka APBDes (Anggaran Pendapatan dan Belanja Desa) Tahun 2024 sebagai bentuk komitmen tata kelola pemerintahan desa yang akuntabel dan partisipatif bagi pembangunan masyarakat Desa Mandiri.
          </p>
        </div>
      </section>

      {/* Primary Financial Overview Cards */}
      <section id="fin-cards-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-1.5 relative overflow-hidden">
          <div className="flex items-center space-x-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            <span>Total Pendapatan</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black text-gray-900 leading-tight">
            Rp 1.450.000.000
          </h3>
          <p className="text-[10px] text-gray-400 mt-1 leading-normal font-normal">
            Berasal dari Dana Desa, ADD, PADes, & Bantuan Provinsi.
          </p>
        </div>

        {/* Card 2: Total Belanja */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-1.5 relative overflow-hidden">
          <div className="flex items-center space-x-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-rose-500 inline-block" />
            <span>Total Belanja</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black text-rose-600 leading-tight">
            Rp 1.380.500.000
          </h3>
          <p className="text-[10px] text-gray-400 mt-1 leading-normal font-normal">
            Dialokasikan untuk pembangunan fisik, gaji, & pemberdayaan.
          </p>
        </div>

        {/* Card 3: SiLPA */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-1.5 relative overflow-hidden">
          <div className="flex items-center space-x-1.5 text-gray-400 font-bold text-[10px] uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
            <span>Sisa Lebih Perhitungan (SiLPA)</span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black text-amber-600 leading-tight">
            Rp 69.500.000
          </h3>
          <p className="text-[10px] text-gray-400 mt-1 leading-normal font-normal">
            Sisa lebih pembiayaan anggaran tahun berjalan masuk kas desa.
          </p>
        </div>
      </section>

      {/* Rincian Pendapatan Desa */}
      <section id="income-breakdown-section" className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm text-left">
        <h4 className="font-display font-black text-base md:text-lg text-[#0B2F5C] mb-5">
          Rincian Pendapatan Desa
        </h4>

        <div className="space-y-5">
          {/* Item 1: DD */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>Dana Desa (DD)</span>
              <span className="text-[#0B2F5C]">60%</span>
            </div>
            {/* Styled progress bar matching screenshot (Dark Blue) */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0B2F5C] rounded-full transition-all duration-1000" style={{ width: "60%" }} />
            </div>
            <p className="text-[11px] text-gray-500 font-bold">Rp 870.000.000</p>
          </div>

          {/* Item 2: ADD */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>Alokasi Dana Desa (ADD)</span>
              <span className="text-slate-500">25%</span>
            </div>
            {/* Styled progress bar matching screenshot (Slate Blue) */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-slate-500 rounded-full transition-all duration-1000" style={{ width: "25%" }} />
            </div>
            <p className="text-[11px] text-gray-500 font-bold">Rp 362.500.000</p>
          </div>

          {/* Item 3: PADes */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span>Pendapatan Asli Desa (PADes)</span>
              <span className="text-[#8B7500]">15%</span>
            </div>
            {/* Styled progress bar matching screenshot (Gold Brown) */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#8B7500] rounded-full transition-all duration-1000" style={{ width: "15%" }} />
            </div>
            <p className="text-[11px] text-gray-500 font-bold">Rp 217.500.000</p>
          </div>
        </div>
      </section>

      {/* Alokasi Belanja Desa */}
      <section id="expense-allocation" className="space-y-4 text-left">
        <h4 className="font-display font-black text-base md:text-lg text-[#0B2F5C]">
          Alokasi Belanja Desa
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Pembangunan Desa", value: "Rp 650.000.000", bg: "bg-blue-50/50 hover:bg-blue-50 border-blue-100" },
            { label: "Pemberdayaan Masyarakat", value: "Rp 320.500.000", bg: "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100" },
            { label: "Penyelenggaraan Pemerintahan", value: "Rp 280.000.000", bg: "bg-indigo-50/50 hover:bg-indigo-50 border-indigo-100" },
            { label: "Penanggulangan Bencana", value: "Rp 130.000.000", bg: "bg-rose-50/50 hover:bg-rose-50 border-rose-100" },
          ].map((item, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-xl flex items-center justify-between transition-colors ${item.bg}`}
            >
              <span className="text-xs font-bold text-gray-700">{item.label}</span>
              <span className="font-display font-bold text-sm text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dokumen Laporan */}
      <section id="report-download-section" className="space-y-4 text-left">
        <h4 className="font-display font-black text-base md:text-lg text-[#0B2F5C] flex items-center space-x-1.5">
          <Globe className="h-5 w-5 text-[#BF8F00]" />
          <span>Dokumen Laporan Terbuka</span>
        </h4>
        <p className="text-xs text-gray-500 font-normal leading-relaxed">
          Unduh dokumen rincian penggunaan Dana Desa dan laporan pertanggungjawaban APBDes resmi untuk mendukung pengawasan publik yang kredibel.
        </p>

        <div className="bg-white p-5 border border-gray-150 rounded-xl shadow-sm space-y-4 max-w-2xl">
          <div className="space-y-3">
            {REPORT_DOCUMENTS.map((doc) => {
              const isDownloading = downloadingId === doc.id;
              
              return (
                <div
                  key={doc.id}
                  id={`repr-doc-${doc.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3 text-left">
                    <div className="h-9 w-9 rounded bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-[10px] uppercase">
                      {doc.format}
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-xs text-gray-800 leading-snug">
                        {doc.title}
                      </h5>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{doc.format} • {doc.size}</span>
                    </div>
                  </div>

                  <button
                    id={`btn-dl-repr-${doc.id}`}
                    onClick={() => handleDownload(doc.id, doc.title)}
                    disabled={isDownloading}
                    className="h-8 w-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#0B2F5C] hover:text-white hover:border-[#0B2F5C] transition-all"
                  >
                    {isDownloading ? (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <button
              id="request-public-info-btn"
              onClick={onOpenRequestInfoModal}
              className="w-full text-center bg-[#8B7500] hover:bg-amber-800 text-white py-3 rounded-lg text-xs font-bold transition-all active:scale-98 cursor-pointer shadow-sm"
            >
              Minta Informasi Publik
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
