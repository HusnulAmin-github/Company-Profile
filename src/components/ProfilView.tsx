/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Eye, Bookmark, Award, HelpCircle, Users, CheckCircle2, User } from "lucide-react";
import { VILLAGE_OFFICERS } from "../data";

export default function ProfilView() {
  return (
    <div className="space-y-10 pb-10">
      {/* 1. Page Header */}
      <section className="text-center space-y-3 px-2 max-w-2xl mx-auto">
        <h2 className="font-display text-3xl font-extrabold text-[#0B2F5C] leading-tight select-none">
          Profil Desa Mandiri
        </h2>
        <p className="text-sm text-gray-500 font-normal leading-relaxed">
          Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan yang berdedikasi melayani masyarakat Desa Mandiri dengan transparansi dan efisiensi.
        </p>
      </section>

      {/* 2. Visi Card */}
      <section id="visi-section" className="relative bg-white rounded-xl border border-gray-100 p-6 shadow-md overflow-hidden text-left">
        {/* Abstract Eye Logo in background like in the screenshot */}
        <div className="absolute right-0 top-0 -translate-y-4 translate-x-4 opacity-[0.06] select-none pointer-events-none">
          <Eye className="h-44 w-44 text-[#0B2F5C]" />
        </div>

        <div className="flex items-center space-x-2 text-[#0B2F5C] mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50">
            <Eye className="h-5 w-5 text-amber-500" />
          </div>
          <h3 className="font-display font-black text-xl tracking-tight">Visi</h3>
        </div>

        <p className="font-display text-md md:text-lg text-gray-800 font-medium italic leading-relaxed pl-1 max-w-xl">
          "Menjadi Desa yang Inovatif, Transparan, dan Sejahtera Berlandaskan Gotong Royong pada Tahun 2030."
        </p>
      </section>

      {/* 3. Misi Card */}
      <section id="misi-section" className="bg-[#0B2F5C] text-white rounded-xl p-8 shadow-md relative overflow-hidden text-left">
        <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 opacity-5 pointer-events-none">
          <Bookmark className="h-36 w-36 text-white" />
        </div>

        <div className="flex items-center space-x-2.5 text-[#BF8F00] mb-6">
          <Bookmark className="h-6 w-6 fill-current" />
          <h3 className="font-display font-black text-2xl tracking-tight">Misi</h3>
        </div>

        <ul className="space-y-4 md:space-y-5">
          {[
            "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat dan akurat.",
            "Mendorong pertumbuhan ekonomi desa melalui pemberdayaan UMKM dan BUMDes.",
            "Meningkatkan transparansi tata kelola pemerintahan desa dan partisipasi masyarakat.",
            "Memelihara kelestarian lingkungan dan budaya lokal nusantara."
          ].map((misi, index) => (
            <li key={index} className="flex items-start space-x-3.5 group">
              <CheckCircle2 className="h-5 w-5 text-[#BF8F00] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-sm md:text-base text-gray-100 font-normal leading-relaxed">
                {misi}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Sejarah Singkat Card */}
      <section id="sejarah-section" className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm text-left relative">
        <div className="absolute top-6 left-6 flex space-x-1.5 opacity-30">
          <div className="h-1.5 w-1.5 rounded-full bg-[#0B2F5C]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#BF8F00]" />
        </div>

        <div className="flex items-center space-x-2 text-[#0B2F5C] mb-5 pl-4">
          <h3 className="font-display font-black text-xl tracking-tight">Sejarah Singkat</h3>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
          <p>
            Desa Mandiri didirikan pada awal abad ke-20 oleh pemukim yang mencari lahan subur di lereng bukit. Pada awalnya, desa ini dikenal sebagai pusat pertanian lokal dengan komoditas utama padi dan palawija. Nama "Mandiri" diadopsi pada tahun 1950 untuk mencerminkan semangat kemandirian warganya setelah masa kemerdekaan Republik Indonesia secara utuh.
          </p>
          <p>
            Seiring berjalannya waktu, Desa Mandiri mengalami perkembangan pesat. Pada tahun 2010, desa ini mulai mengintegrasikan teknologi informasi dalam sistem administrasinya, menjadikannya salah satu desa pelopor <strong>"Smart Village"</strong> di kabupaten ini. Kini, Desa Mandiri terus berkembang menyeimbangkan kemajuan teknologi dengan pelestarian budaya gotong royong warisan leluhur.
          </p>
        </div>
      </section>

      {/* 5. Struktur Organisasi Section */}
      <section id="struktur-section" className="space-y-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center space-x-2 text-[#0B2F5C]">
            <Users className="h-5 w-5 text-[#0B2F5C]" />
            <h3 className="font-display font-black text-xl md:text-2xl tracking-tight">
              Struktur Organisasi
            </h3>
          </div>
          <span className="inline-block bg-[#FFEAA7] text-[#BF8F00] text-xs font-bold px-3 py-1 rounded">
            Periode 2024-2029
          </span>
        </div>

        {/* Officers display cards (matching screenshot ordering/types) */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {VILLAGE_OFFICERS.map((officer, index) => {
            const isLeader = index === 0;
            const isSecretary = index === 1;
            
            return (
              <div 
                key={officer.id}
                id={`officer-card-${officer.id}`}
                className={`bg-white rounded-xl border border-gray-150 p-6 shadow-sm flex flex-col items-center justify-center text-center transition-all hover:shadow-md ${
                  isLeader ? "border-[#BF8F00] border-2 max-w-sm mx-auto" : "max-w-xs mx-auto"
                }`}
              >
                {/* Image Avatar */}
                <div className="relative h-28 w-28 rounded-full bg-slate-100 overflow-hidden mb-4 border-2 border-slate-200">
                  {officer.image ? (
                    <img 
                      src={officer.image} 
                      alt={officer.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-150 text-gray-400">
                      <User className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Info details */}
                <h4 className="font-display font-bold text-base text-gray-900 leading-tight">
                  {officer.name}
                </h4>
                <p className="text-xs uppercase text-gray-500 font-bold tracking-widest mt-1">
                  {officer.role}
                </p>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  Desa Mandiri • {officer.period}
                </span>

                {isLeader && (
                  <div className="mt-3 inline-flex items-center space-x-1 bg-amber-50 rounded-full px-3 py-0.5 text-[9px] font-bold text-[#BF8F00] uppercase tracking-wide">
                    <Award className="h-3 w-3" />
                    <span>Pimpinan Desa</span>
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
