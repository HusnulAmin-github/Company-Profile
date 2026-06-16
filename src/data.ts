/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Officer, NewsArticle, DocumentDownload, FAQItem, VillageStats } from "./types";

export const VILLAGE_STATS: VillageStats = {
  population: 3450,
  dusunCount: 8,
  activeUmkm: 124,
  areaHa: 450,
};

export const VILLAGE_OFFICERS: Officer[] = [
  {
    id: "officer-1",
    name: "Budi Santoso, S.E.",
    role: "KEPALA DESA",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
    period: "2024-2029"
  },
  {
    id: "officer-2",
    name: "Siti Aminah, S.A.P.",
    role: "Sekretaris Desa",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    period: "2024-2029"
  },
  {
    id: "officer-3",
    name: "Ahmad Yani",
    role: "Kaur Keuangan",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    period: "2024-2029"
  },
  {
    id: "officer-4",
    name: "Dewi Lestari",
    role: "Kasi Pemerintahan",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80",
    period: "2024-2029"
  },
  {
    id: "officer-5",
    name: "Rudi Hartono",
    role: "Kasi Kesejahteraan",
    image: "", // empty image trigger to show customized silhouette with user icon
    period: "2024-2029"
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    category: "SOSIAL",
    date: "12 Oktober 2024",
    title: "Penyaluran Bantuan Langsung Tunai (BLT) Tahap IV",
    description: "Pemerintah Desa Mandiri telah menyelesaikan penyaluran BLT Tahap IV kepada 150 Keluarga Penerima Manfaat...",
    content: `Pemerintah Desa Mandiri telah merampungkan penyaluran program Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap IV untuk tahun anggaran berjalan. Sebanyak 150 Keluarga Penerima Manfaat (KPM) menerima bantuan tunai ini secara langsung di Balai Pertemuan Desa Mandiri.

Penyaluran ini dipimpin langsung oleh Kepala Desa Budi Santoso, S.E., beserta jajaran perangkat desa, BPD, dan didampingi Bhabinkamtibmas setempat untuk menjamin ketertiban dan kelancaran proses distribusi.

Dalam sambutannya, Kepala Desa menyatakan bahwa bantuan sosial ini difokuskan kepada warga rentan miskin ekstrem, lansia mandiri, dan warga yang mengidap penyakit menahun. Diharapkan dana stimulan tersebut dapat langsung dimanfaatkan untuk memenuhi kebutuhan pokok pangan sehari-hari, meningkatkan daya beli masyarakat lokal, serta membantu kelangsungan sekolah anak-anak.

Proses administrasi penyaluran dilakukan berbasis tanda pengenal digital terintegrasi sehingga meminimalkan antrean panjang dan mempercepat proses verifikasi data KPM secara transparan.`,
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
    author: "Siti Aminah, S.A.P.",
    reads: 342
  },
  {
    id: "news-2",
    category: "LINGKUNGAN",
    date: "08 Oktober 2024",
    title: "Jadwal Kerja Bakti Massal Persiapan Musim Penghujan",
    description: "Menghadapi musim penghujan, seluruh warga dihimbau untuk mengikuti kerja bakti pembersihan saluran air di masin...",
    content: `Sebagai langkah antisipasi dini menghadapi datangnya siklus musim penghujan ekstrem, Pemerintah Desa Mandiri bersama Ketua RW/RT menginisiasi kegiatan kerja bakti gotong royong massal di seluruh delapan wilayah dusun.

Fokus utama dari kerja bakti kali ini adalah normalisasi saluran drainase primer, pembersihan gorong-gorong yang tersumbat endapan sedimentasi lumpur, pemangkasan dahan pohon yang berisiko patah menimpa kabel listrik atau rumah warga, serta pemberantasan sarang nyamuk melalui gerakan 3M Plus.

"Kegiatan gotong royong ini merupakan warisan luhur gotong royong yang menjadi pilar nama 'Desa Mandiri'. Kita harus bahu-membahu membersihkan rute aliran air agar tidak terjadi genangan di pekarangan maupun jalan desa," kata Rudi Hartono selaku Kepala Seksi Kesejahteraan.

Pemerintah desa menyediakan logistik berupa kantong sampah organik dan anorganik, cangkul tambahan, serta hidangan makanan ringan tradisional hasil swadaya ibu-ibu PKK dusun untuk menyemangati para warga yang terjun ke lapangan.`,
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    author: "Rudi Hartono",
    reads: 198
  },
  {
    id: "news-3",
    category: "PENDIDIKAN",
    date: "05 Oktober 2024",
    title: "Pelatihan Literasi Digital untuk UMKM Desa",
    description: "Program peningkatan kapasitas pelaku UMKM lokal dalam memanfaatkan platform e-commerce dan media sosial...",
    content: `Guna mendongkrak omzet penjualan dan memperluas pangsa pasar bagi produk-produk unggulan lokal, seksi pemerintahan bersama relawan pemuda menyelenggarakan Pelatihan Literasi Digital bagi 50 pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) Desa Mandiri.

Pelatihan berkala ini menitikberatkan pada kurikulum aplikatif, seperti cara memotret produk agar estetik bermodalkan smartphone, penyusunan narasi promosi yang persuasif, tata cara membuka toko digital di platform e-commerce nasional, hingga pendaftaran izin usaha mikro melalui sistem Online Single Submission (OSS).

Dewi Lestari selaku Kasi Pemerintahan mengungkapkan, "Modernisasi ekonomi desa dimulai dari kesiapan SDM pengusahanya. Melalui bekal literasi digital ini, keripik pisang, anyaman bambu, dan kopi lokal produksi Desa Mandiri dapat dinikmati oleh pembeli dari perkotaan dengan skema pembayaran nontunai yang aman."

Dalam sesi praktek, para pelaku usaha juga diajarkan cara mendaftarkan produk mereka di peta Google Maps untuk mempermudah wisata kuliner lokal dikunjungi pelancong dari luar daerah.`,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    author: "Dewi Lestari",
    reads: 412
  },
  {
    id: "news-4",
    category: "PEMBANGUNAN",
    date: "28 September 2024",
    title: "Rehabilitasi Jembatan Tani Dusun Sukamaju Rampung",
    description: "Akses jalur distribusi pupuk dan hasil panen kini semakin lancar berkat perbaikan jembatan penghubung perkebunan...",
    content: `Kabar gembira datang bagi para petani di Dusun Sukamaju. Proyek rehabilitasi Jembatan Tani yang menghubungkan area perkampungan dengan kawasan persawahan blok selatan seluas 45 hektar kini telah tuntas 100% dan diresmikan penggunaannya.

Sebelumnya jembatan kayu tersebut mengalami lapuk di bagian fondasi sehingga rawan dilalui kendaraan roda dua pembawa hasil pertanian. Dengan menggunakan alokasi Dana Desa bidang infrastruktur fisik, jembatan ini dibangun kembali menggunakan konstruksi cor beton bertulang yang kokoh dan tahan lama.

"Kini truk pengangkut pupuk dan motor roda tiga hasil panen padi/jagung tidak perlu memutar arah sejauh 3 kilometer lagi. Ini akan memangkas ongkos logistik pertanian kami," ujar salah satu perwakilan kelompok tani setempat dengan antusias.

Jembatan baru ini juga dilengkapi dengan pagar pembatas keamanan di kedua sisinya untuk kenyamanan anak-anak sekolah yang menyeberang jalur pertanian.`,
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80",
    author: "Budi Santoso, S.E.",
    reads: 278
  }
];

export const TEMPLATE_DOCUMENTS: DocumentDownload[] = [
  {
    id: "doc-1",
    title: "Formulir F-1.21 (Permohonan KTP Baru)",
    format: "PDF",
    size: "124 KB"
  },
  {
    id: "doc-2",
    title: "Blangko Surat Pengantar RT/RW",
    format: "PDF",
    size: "85 KB"
  },
  {
    id: "doc-3",
    title: "Formulir Keterangan Tidak Mampu (SKTM)",
    format: "PDF",
    size: "150 KB"
  }
];

export const REPORT_DOCUMENTS: DocumentDownload[] = [
  {
    id: "rep-1",
    title: "Laporan APBDes Semester 1 2024",
    format: "PDF",
    size: "2.4 MB"
  },
  {
    id: "rep-2",
    title: "Rincian Penggunaan Dana Desa 2023",
    format: "PDF",
    size: "3.1 MB"
  },
  {
    id: "rep-3",
    title: "Data Terbuka Anggaran (Excel)",
    format: "XLSX",
    size: "1.2 MB"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Berapa lama proses pembuatan Surat Keterangan Usaha (SKU)?",
    answer: "Proses administrasi pembuatan Surat Keterangan Usaha (SKU) di kantor pelayanan Desa Mandiri memakan waktu sekitar 1 sampai 2 hari kerja setelah dokumen persyaratan (seperti Surat Pengantar RT/RW, fotokopi KTP, fotokopi KK, dan foto lokasi usaha) dinyatakan lengkap."
  },
  {
    id: "faq-2",
    question: "Apakah layanan administrasi di kantor desa dikenakan biaya?",
    answer: "Tidak. Sesuai dengan Peraturan Desa Mandiri tentang keterbukaan dan anti pungli, seluruh pelayanan pengurusan dokumen kependudukan seperti pembuatan Surat Pengantar KTP, Kartu Keluarga, SKTM, maupun surat keterangan lainnya diberikan secara gratis (Rp 0) tanpa biaya apa pun."
  },
  {
    id: "faq-3",
    question: "Jam berapa pelayanan kantor desa buka?",
    answer: "Loket pelayanan administrasi terpadu Kantor Desa Mandiri dibuka setiap hari Senin hingga Jum'at, pukul 08:00 WIB sampai dengan 15:30 WIB. Istirahat pelayanan berlangsung pukul 12:00 - 13:00 WIB (khusus Jum'at 11:30 - 13:00 WIB)."
  },
  {
    id: "faq-4",
    question: "Bagaimana cara mengajukan pengaduan masyarakat?",
    answer: "Anda dapat mengajukan aspirasi, laporan keluhan, maupun saran pembangunan secara langsung melalui menu 'Kontak Kami' di aplikasi ini, menelepon call center desa, atau memasukkan surat tertulis ke kotak pengaduan fisik di serambi Balai Desa Mandiri."
  }
];
