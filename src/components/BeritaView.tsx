/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Filter, Calendar, BookOpen, ThumbsUp, MessageSquare, ChevronRight, User, CornerDownRight } from "lucide-react";
import { NEWS_ARTICLES } from "../data";
import { NewsArticle } from "../types";

interface BeritaViewProps {
  onSelectArticle: (article: NewsArticle) => void;
}

interface LocalComment {
  articleId: string;
  id: string;
  author: string;
  content: string;
  date: string;
}

export default function BeritaView({ onSelectArticle }: BeritaViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("SEMUA");

  const categories = ["SEMUA", "SOSIAL", "LINGKUNGAN", "PENDIDIKAN", "PEMBANGUNAN"];

  // Filter articles based on category and search query
  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === "SEMUA" || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "SOSIAL": return "bg-sky-50 text-sky-800 border-sky-100";
      case "LINGKUNGAN": return "bg-emerald-50 text-emerald-800 border-emerald-100";
      case "PENDIDIKAN": return "bg-indigo-50 text-indigo-800 border-indigo-100";
      case "PEMBANGUNAN": return "bg-amber-50 text-amber-800 border-amber-100";
      default: return "bg-slate-50 text-slate-800 border-slate-100";
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Search and Category Filters */}
      <section className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
          <input
            id="news-search-input"
            type="text"
            placeholder="Cari berita atau pengumuman desa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-[#0B2F5C] focus:bg-white transition-all font-sans"
          />
        </div>

        {/* Categories Scrolling Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`news-cat-btn-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-wide uppercase border whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#0B2F5C] text-white border-[#0B2F5C]"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {cat === "SEMUA" ? "Semua Berita" : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Articles List */}
      <section className="space-y-6 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-black text-lg text-[#0B2F5C]">
            Arsip Berita ({filteredArticles.length})
          </h3>
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("SEMUA"); }} 
              className="text-xs text-red-500 font-bold hover:underline"
            >
              Reset FIler
            </button>
          )}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="space-y-5">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                id={`news-list-card-${article.id}`}
                onClick={() => onSelectArticle(article)}
                className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all group"
              >
                {/* News Image Side */}
                <div className="relative h-44 md:h-auto md:w-60 bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover group-hover:scale-105 duration-300 pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* News Copy Side */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold tracking-wider uppercase border px-2 py-0.5 rounded ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{article.date}</span>
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-gray-900 group-hover:text-[#0B2F5C] transition-colors leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-xs text-gray-500 line-clamp-3 font-normal leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  {/* Read action */}
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-4">
                    <span className="text-xs font-extrabold text-[#BF8F00] flex items-center space-x-1">
                      <span>Selengkapnya</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div className="flex items-center text-gray-400 text-[10px] font-bold space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{article.reads} Reads</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <Filter className="mx-auto h-8 w-8 text-gray-300 mb-2" />
            <p className="text-sm text-gray-500 font-semibold">Berita tidak ditemukan</p>
            <p className="text-xs text-gray-400 mt-1">Gunakan kata kunci pencarian yang lain atau ganti filter kategori.</p>
          </div>
        )}
      </section>
    </div>
  );
}
