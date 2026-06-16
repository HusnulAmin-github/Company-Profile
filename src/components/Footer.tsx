/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  setTab: (tab: string) => void;
  openModal: (type: string) => void;
}

export default function Footer({ setTab, openModal }: FooterProps) {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-10 pb-20 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800 text-left">
          {/* Column 1: Village Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-[#BF8F00]" />
              <span className="font-display font-bold text-lg text-white tracking-wide">
                Desa Mandiri
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              Pusat informasi dan layanan digital terpadu Pemerintah Desa Mandiri untuk melayani masyarakat dengan transparan, akuntabel, dan efisien. Dukung kami menuju Desa Cerdas berkelanjutan.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Peta Situs & Tautan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="foot-link-beranda"
                  onClick={() => setTab("beranda")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  id="foot-link-berita"
                  onClick={() => setTab("berita")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Berita Terkini
                </button>
              </li>
              <li>
                <button
                  id="foot-link-layanan"
                  onClick={() => setTab("layanan")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Layanan Publik
                </button>
              </li>
              <li>
                <button
                  id="foot-link-transparansi"
                  onClick={() => setTab("transparansi")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Transparansi Dana
                </button>
              </li>
              <li>
                <button
                  id="foot-link-peta-situs"
                  onClick={() => openModal("peta-situs")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Peta Situs
                </button>
              </li>
              <li>
                <button
                  id="foot-link-privasi"
                  onClick={() => openModal("kebijakan-privasi")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button
                  id="foot-link-kontak"
                  onClick={() => setTab("kontak")}
                  className="hover:text-[#BF8F00] transition-colors focus:outline-none"
                >
                  Kontak Kami
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Address info */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Kantor Pusat Layanan
            </h4>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#BF8F00] shrink-0 mt-0.5" />
                <span>
                  Jl. Raya Utama No. 88, Desa Mandiri, Kecamatan Sawangan, Kabupaten Nusantara
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#BF8F00] shrink-0" />
                <span>+62 21-8291-3829</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#BF8F00] shrink-0" />
                <span>info@desamandiri.go.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer and copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 space-y-4 md:space-y-0">
          <p className="text-center md:text-left text-gray-400 font-medium">
            © 2024 Pemerintah Desa Mandiri. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex space-x-4 text-gray-400">
            <span className="hover:text-white cursor-pointer" onClick={() => openModal("syarat")}>Syarat penggunaan</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => openModal("kebijakan-privasi")}>Informasi Publik</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
