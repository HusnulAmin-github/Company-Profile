/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Officer {
  id: string;
  name: string;
  role: string;
  image: string;
  period: string;
}

export interface NewsArticle {
  id: string;
  category: "SOSIAL" | "LINGKUNGAN" | "PENDIDIKAN" | "PEMBANGUNAN";
  date: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  reads: number;
}

export interface DocumentDownload {
  id: string;
  title: string;
  format: "PDF" | "XLSX" | "DOCX";
  size: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface VillageStats {
  population: number;
  dusunCount: number;
  activeUmkm: number;
  areaHa: number;
}

export interface Submission {
  id: string;
  serviceName: string;
  applicantName: string;
  applicantNik: string;
  status: "DIPROSES" | "SELESAI" | "DITOLAK";
  submittedAt: string;
}
