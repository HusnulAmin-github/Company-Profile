/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { FileText, BarChart3, Users, Home, Store, Map, ArrowRight, BookOpen, MessageSquare, Heart } from "lucide-react";
import { NEWS_ARTICLES, VILLAGE_STATS } from "../data";
import { NewsArticle } from "../types";
import { motion } from "motion/react";

interface BerandaViewProps {
  setTab: (tab: string) => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenMusyawarahModal: () => void;
}

export default function BerandaView({ setTab, onSelectArticle, onOpenMusyawarahModal }: BerandaViewProps) {
  // Take first 3 news items for the home screen list
  const featuredArticles = NEWS_ARTICLES.slice(0, 3);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "SOSIAL":
        return "bg-sky-900 text-white";
      case "LINGKUNGAN":
        return "bg-emerald-800 text-white";
      case "PENDIDIKAN":
        return "bg-indigo-900 text-white";
      case "PEMBANGUNAN":
        return "bg-amber-800 text-white";
      default:
        return "bg-slate-700 text-slate-100";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Kegiatan Utama (Hero Banner) */}
      <section 
        id="home-hero-section"
        className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl cursor-pointer group"
        onClick={onOpenMusyawarahModal}
      >
        <div className="absolute inset-0 bg-black/50 z-10 transition-opacity group-hover:bg-black/40" />
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
          alt="Musyawarah Perencanaan Pembangunan Desa"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
        />
        
        {/* Banner Details */}
        <div className="relative z-20 flex flex-col justify-end p-6 md:p-10 min-h-[220px] md:min-h-[360px] space-y-3">
          <div>
            <span className="inline-block rounded bg-[#BF8F00] px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-black">
              KEGIATAN UTAMA
            </span>
          </div>
          
          <h2 className="font-display text-xl md:text-3xl font-bold leading-tight tracking-tight max-w-2xl text-white">
            Musyawarah Perencanaan Pembangunan Desa 2024
          </h2>
          
          <p className="text-xs md:text-sm text-gray-200 max-w-xl font-normal leading-relaxed">
            Menyatukan tekad, menyaring gagasan warga, dan menyusun program kerja prioritas bersama demi masa depan Desa Mandiri yang inklusif, makmur dan digital.
          </p>

          <div className="pt-2 flex items-center text-[#BF8F00] text-xs font-semibold space-x-1 hover:underline">
            <span>Selengkapnya</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* 2. Featured Action Cards */}
      <section id="home-actions-section" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Action 1: Layanan Administrasi */}
        <div
          id="home-action-layanan"
          onClick={() => setTab("layanan")}
          className="flex items-center space-x-4 bg-[#0B2F5C] text-white p-5 rounded-xl shadow-md cursor-pointer hover:bg-[#082447] active:scale-[0.99] transition-all group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-display font-bold text-sm md:text-md text-white">
              Layanan Administrasi
            </h3>
            <p className="text-xs text-blue-200 mt-0.5 font-normal">
              Surat Keterangan, Pengantar KTP, KK.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#BF8F00] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Action 2: Transparansi Dana */}
        <div
          id="home-action-transparansi"
          onClick={() => setTab("transparansi")}
          className="flex items-center space-x-4 bg-white text-gray-800 p-5 rounded-xl border border-gray-200 shadow-md cursor-pointer hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all group"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-[#BF8F00]">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-display font-bold text-sm md:text-md text-gray-900">
              Transparansi Dana
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 font-normal">
              Laporan APBDes dan Realisasi Anggaran.
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-[#BF8F00] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </section>

      {/* 3. Berita Terkini Section */}
      <section id="home-news-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg md:text-xl font-bold text-[#0B2F5C] flex items-center space-x-2">
            <span className="h-5 w-1.5 bg-[#BF8F00] rounded-full inline-block"></span>
            <span>Berita Terkini</span>
          </h2>
          <button
            id="home-news-see-all-btn"
            onClick={() => setTab("berita")}
            className="flex items-center text-xs font-semibold text-[#0B2F5C] hover:text-[#BF8F00] transition-colors space-x-1"
          >
            <span>LIHAT SEMUA</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* News Cards Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              id={`home-news-card-${article.id}`}
              className="flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="relative h-44 w-full bg-gray-150 overflow-hidden">
                <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover hover:scale-105 duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 text-left">
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold">{article.date}</span>
                  <h3 className="font-display font-bold text-sm text-gray-900 line-clamp-2 mt-1 mb-2 hover:text-[#0B2F5C]">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-3 font-normal leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between">
                  <button
                    onClick={() => onSelectArticle(article)}
                    className="text-xs font-bold text-[#BF8F00] hover:text-[#0b2545] transition-colors hover:underline"
                  >
                    Baca Selengkapnya
                  </button>
                  <div className="flex items-center text-gray-400 space-x-1.5 text-[10px] font-semibold">
                    <BookOpen className="h-3 w-3" />
                    <span>{article.reads}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Statistics Section */}
      <section 
        id="home-stats-section"
        className="rounded-xl bg-[#0B2F5C] text-white p-8 md:p-10 shadow-lg relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Map className="h-64 w-64 text-white" />
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Stat 1: Penduduk */}
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Users className="h-5 w-5 text-[#BF8F00]" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
              {VILLAGE_STATS.population.toLocaleString("id-ID")}
            </span>
            <span className="text-[10px] md:text-xs text-blue-200 uppercase tracking-widest mt-1 font-semibold">
              Total Penduduk
            </span>
          </div>

          {/* Stat 2: Dusun */}
          <div className="flex flex-col items-center justify-center p-2 pt-8 md:pt-2 text-center">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Home className="h-5 w-5 text-[#BF8F00]" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
              {VILLAGE_STATS.dusunCount}
            </span>
            <span className="text-[10px] md:text-xs text-blue-200 uppercase tracking-widest mt-1 font-semibold">
              Jumlah Dusun
            </span>
          </div>

          {/* Stat 3: UMKM */}
          <div className="flex flex-col items-center justify-center p-2 pt-8 md:pt-2 text-center">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Store className="h-5 w-5 text-[#BF8F00]" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
              {VILLAGE_STATS.activeUmkm}
            </span>
            <span className="text-[10px] md:text-xs text-blue-200 uppercase tracking-widest mt-1 font-semibold">
              UMKM Aktif
            </span>
          </div>

          {/* Stat 4: Luas */}
          <div className="flex flex-col items-center justify-center p-2 pt-8 md:pt-2 text-center">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Map className="h-5 w-5 text-[#BF8F00]" />
            </div>
            <span className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
              {VILLAGE_STATS.areaHa}
            </span>
            <span className="text-[10px] md:text-xs text-blue-200 uppercase tracking-widest mt-1 font-semibold">
              Luas Area (HA)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
