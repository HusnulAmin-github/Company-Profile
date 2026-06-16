/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Home, FileText, Newspaper, UserCheck, PhoneCall } from "lucide-react";

interface BottomNavProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function BottomNav({ currentTab, setTab }: BottomNavProps) {
  const tabs = [
    { id: "beranda", label: "Beranda", icon: Home },
    { id: "berita", label: "Berita", icon: Newspaper },
    { id: "layanan", label: "Layanan", icon: FileText },
    { id: "profil", label: "Profil", icon: UserCheck },
    { id: "kontak", label: "Kontak", icon: PhoneCall },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id || (tab.id === 'layanan' && currentTab === 'transparansi');
          
          return (
            <button
              key={tab.id}
              id={`bottom-nav-${tab.id}`}
              onClick={() => setTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full py-1 text-center font-sans tracking-wide transition-all active:scale-95 text-gray-500 focus:outline-none"
            >
              <div 
                className={`flex items-center justify-center p-1.5 rounded-full transition-all ${
                  isActive 
                    ? "bg-[#0B2F5C] text-white" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span 
                className={`text-[10px] sm:text-xs mt-1 transition-all ${
                  isActive 
                    ? "font-semibold text-[#0B2F5C]" 
                    : "text-gray-500 font-normal"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
