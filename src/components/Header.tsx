/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, Search, X, HelpCircle, Shield, FileText, Info, Phone, Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onSearchOpen: () => void;
}

export default function Header({ currentTab, setTab, onSearchOpen }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { id: "beranda", label: "Beranda", icon: Info },
    { id: "berita", label: "Berita Terkini", icon: Calendar },
    { id: "layanan", label: "Layanan Publik", icon: FileText },
    { id: "profil", label: "Profil Desa", icon: Shield },
    { id: "transparansi", label: "Transparansi Dana", icon: HelpCircle },
    { id: "kontak", label: "Hubungi Kami", icon: Phone },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B2F5C] text-white shadow-md select-none">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Left: Hamburger menu */}
          <button
            id="header-menu-btn"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full p-2 hover:bg-white/10 active:scale-95 transition-all text-white focus:outline-none"
            aria-label="Buka Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Center: Title */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-display text-lg font-bold tracking-wider text-white">
              Desa Mandiri
            </h1>
            <span className="text-[9px] uppercase tracking-widest text-[#BF8F00] font-semibold">
              Kecamatan Sawangan
            </span>
          </div>

          {/* Right: Search trigger */}
          <button
            id="header-search-btn"
            onClick={onSearchOpen}
            className="rounded-full p-2 hover:bg-white/10 active:scale-95 transition-all text-white focus:outline-none"
            aria-label="Cari Informasi"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Sidebar Drawer Container */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 top-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white shadow-2xl"
            >
              {/* Drawer Premium Banner */}
              <div className="bg-[#0B2F5C] p-6 text-white pb-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                  <Shield className="h-40 w-40 text-white" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-[#BF8F00] flex items-center justify-center font-display font-bold text-white text-md">
                      M
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-md leading-tight">Masyarakat Mandiri</h3>
                      <p className="text-[10px] text-gray-300">Sistem Portal Desa Terpadu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="rounded-full p-1.5 hover:bg-white/10 active:scale-95 transition-all text-white focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8">
                  <p className="text-xs text-white/80">Selamat Datang di</p>
                  <h4 className="font-display font-semibold text-lg text-white">Desa Mandiri Online</h4>
                  <p className="text-[10px] text-[#BF8F00] font-semibold tracking-wide">VERSI 2.0.4 • STABLE</p>
                </div>
              </div>

              {/* Navigation Items (Middle) */}
              <div className="flex-1 overflow-y-auto px-2 py-4">
                <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">MENU UTAMA</p>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`drawer-nav-item-${item.id}`}
                        onClick={() => {
                          setTab(item.id);
                          setDrawerOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all ${
                          isActive
                            ? "bg-[#0B2F5C]/10 text-[#0B2F5C] font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className={`h-5 w-5 ${isActive ? "text-[#0B2F5C]" : "text-gray-400"}`} />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {isActive && <div className="h-1.5 w-1.5 rounded-full bg-[#BF8F00]" />}
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-8 border-t border-gray-100 pt-4 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">INFORMASI KONTAK</p>
                  <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-700">Kantor Balai Desa Mandiri</p>
                    <p>Jl. Raya Utama No. 88, Kec. Sawangan</p>
                    <p className="pt-1.5">No. Tlp: (021) 8291-3829</p>
                    <p>Email: info@desamandiri.go.id</p>
                  </div>
                </div>
              </div>

              {/* Footer (Bottom) */}
              <div className="border-t border-gray-100 p-4 text-center">
                <span className="text-[10px] text-gray-400 font-medium">© 2026 Desa Mandiri • Sawangan</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
