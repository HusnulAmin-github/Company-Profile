/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Shield, ArrowLeft, Calendar, User, ThumbsUp, MessageSquare, 
  Search, X, ChevronRight, Download, Upload, AlertCircle, CheckCircle, 
  Share2, Heart, ExternalLink, RefreshCw, BarChart, FileText, ClipboardList
} from "lucide-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";

// Views
import BerandaView from "./components/BerandaView";
import BeritaView from "./components/BeritaView";
import LayananView from "./components/LayananView";
import ProfilView from "./components/ProfilView";
import TransparansiView from "./components/TransparansiView";
import KontakView from "./components/KontakView";

// Data & Types
import { NEWS_ARTICLES, VILLAGE_OFFICERS, TEMPLATE_DOCUMENTS, FAQ_ITEMS } from "./data";
import { NewsArticle, Submission } from "./types";

interface ArticleComment {
  articleId: string;
  id: string;
  author: string;
  content: string;
  date: string;
}

interface MusyawarahVote {
  id: string;
  title: string;
  category: string;
  votes: number;
  proposedBy: string;
}

export default function App() {
  const [currentTab, setTab] = useState<string>("beranda");
  
  // Immersive news detail article view state
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  
  // Article liking persistence & comments
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});
  const [allComments, setAllComments] = useState<ArticleComment[]>([
    {
      articleId: "news-1",
      id: "comment-1",
      author: "Hendra Wijaya",
      content: "Alhamdulillah sangat membantu pembagian BLT ini untuk mencukupi bahan pangan keluarga di kondisi saat ini.",
      date: "12 Oktober 2024"
    },
    {
      articleId: "news-1",
      id: "comment-2",
      author: "Suryadi",
      content: "Alur kerjanya sudah rapi dan tertib tidak perlu antre panjang berjam-jam seperti pembagian bansos sebelumnya.",
      date: "13 Oktober 2024"
    },
    {
      articleId: "news-2",
      id: "comment-3",
      author: "Prasetyo Edi",
      content: "Siap berpartisipasi bawa cangkul dan arit sendiri dari rumah! RW 04 siap bersihkan saluran primer.",
      date: "09 Oktober 2024"
    }
  ]);
  const [commentNameInput, setCommentNameInput] = useState("");
  const [commentContentInput, setCommentContentInput] = useState("");

  // Search popup state
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Public document applications wizard state
  const [activeSubmitService, setActiveSubmitService] = useState<string | null>(null);
  const [submissionStep, setSubmissionStep] = useState<1 | 2>(1);
  const [submissionForm, setSubmissionForm] = useState({
    name: "",
    nik: "",
    kk: "",
    phone: "",
    fileName: "",
  });
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    queue: number;
    estimatedDays: string;
  } | null>(null);

  // Past local-storage submissions tracking
  const [mySubmissions, setMySubmissions] = useState<Submission[]>([]);

  // Public Info request variables (Screenshot 3 Action)
  const [requestInfoOpen, setRequestInfoOpen] = useState(false);
  const [infoForm, setInfoForm] = useState({
    name: "",
    nik: "",
    address: "",
    phone: "",
    reason: "",
    documentType: "APBDes Lengkap"
  });
  const [requestReceipt, setRequestReceipt] = useState<string | null>(null);

  // Musyawarah (Hero Banner Detail & Interactive Voting Board)
  const [musyawarahOpen, setMusyawarahOpen] = useState(false);
  const [musyawarahVotes, setMusyawarahVotes] = useState<MusyawarahVote[]>([
    { id: "v-1", title: "Penyempurnaan Sumur Bor Air Bersih Dusun 3", category: "Kesehatan", votes: 48, proposedBy: "Sugeng (RT 02)" },
    { id: "v-2", title: "Pemasangan Lampu LED Penerangan Jalan Umum", category: "Infrastruktur", votes: 32, proposedBy: "Karang Taruna" },
    { id: "v-3", title: "Pengadaan Timbangan Pintar & PMT Posyandu Balita", category: "Kesehatan", votes: 29, proposedBy: "Ibu-Ibu PKK" },
    { id: "v-4", title: "Pelatihan Keterampilan Menenun & Pemasaran Online", category: "Ekonomi", votes: 15, proposedBy: "Kaur Ekonomi" }
  ]);
  const [myVotes, setMyVotes] = useState<Record<string, boolean>>({});
  const [newSuggestion, setNewSuggestion] = useState("");
  const [newSuggestionCategory, setNewSuggestionCategory] = useState("Infrastruktur");

  // Footers terms/sitemap modals info
  const [infoModalType, setInfoModalType] = useState<string | null>(null);

  // Floating notifications
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  // Fetch initial collections from localStorage
  useEffect(() => {
    const savedSubs = localStorage.getItem("desa_mandiri_subs");
    if (savedSubs) {
      setMySubmissions(JSON.parse(savedSubs));
    } else {
      // Seed a default history sub
      const defaultSubs: Submission[] = [
        {
          id: "SUB-8291",
          serviceName: "Surat Keterangan Domisili",
          applicantName: "Hendra Wijaya",
          applicantNik: "3216092801xxxxxx",
          status: "SELESAI",
          submittedAt: "01 Juni 2026"
        }
      ];
      localStorage.setItem("desa_mandiri_subs", JSON.stringify(defaultSubs));
      setMySubmissions(defaultSubs);
    }

    const savedLikes = localStorage.getItem("desa_mandiri_likes");
    if (savedLikes) {
      setLikedArticles(JSON.parse(savedLikes));
    }
  }, []);

  const triggerNotification = (message: string, type: "success" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const increaseArticleReads = (articleId: string) => {
    // Simulated increment locally
    const article = NEWS_ARTICLES.find(a => a.id === articleId);
    if (article) {
      article.reads += 1;
    }
  };

  const handleSelectArticle = (article: NewsArticle) => {
    increaseArticleReads(article.id);
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLikeArticle = (articleId: string) => {
    const nextStates = {
      ...likedArticles,
      [articleId]: !likedArticles[articleId]
    };
    setLikedArticles(nextStates);
    localStorage.setItem("desa_mandiri_likes", JSON.stringify(nextStates));
    
    if (nextStates[articleId]) {
      triggerNotification("Artikel disukai! Kritik/dukungan tersimpan ke statistik.", "success");
    }
  };

  const handleAddComment = (e: React.FormEvent, articleId: string) => {
    e.preventDefault();
    if (!commentNameInput.trim() || !commentContentInput.trim()) {
      triggerNotification("Tolong isi nama dan komentar Anda!", "info");
      return;
    }

    const newComment: ArticleComment = {
      articleId,
      id: `comment-${Date.now()}`,
      author: commentNameInput.trim(),
      content: commentContentInput.trim(),
      date: "Hari Ini"
    };

    setAllComments([newComment, ...allComments]);
    setCommentNameInput("");
    setCommentContentInput("");
    triggerNotification("Komentar Anda diterbitkan di bawah persetujuan moderator!", "success");
  };

  // Submission handles
  const handleSubmissionNext = () => {
    if (!submissionForm.name || !submissionForm.nik || !submissionForm.kk) {
      triggerNotification("Pastikan semua kolom identitas terisi!", "info");
      return;
    }
    if (submissionForm.nik.length < 16) {
      triggerNotification("Format NIK tidak valid (harus 16 digit)!", "info");
      return;
    }
    setSubmissionStep(2);
  };

  const handleFileChangeSimulate = () => {
    const names = ["kk_scan.pdf", "pengantar_rt_rw.jpg", "ktp_photo.png", "buku_nikah_scan_page1.pdf"];
    const chosen = names[Math.floor(Math.random() * names.length)];
    setSubmissionForm({
      ...submissionForm,
      fileName: chosen
    });
    triggerNotification(`File "${chosen}" berhasil ditautkan sebagai lampiran.`, "success");
  };

  const handleSubmitApplication = () => {
    if (!submissionForm.fileName) {
      triggerNotification("Harap lampirkan/upload dokumen prasyarat terlebih dahulu!", "info");
      return;
    }

    const uniqueId = `SUB-${Math.floor(1000 + Math.random() * 9000)}`;
    const queueNo = Math.floor(4 + Math.random() * 12);
    
    // Add to historic submissions
    const newSubmission: Submission = {
      id: uniqueId,
      serviceName: activeSubmitService || "Layanan Publik",
      applicantName: submissionForm.name,
      applicantNik: `${submissionForm.nik.substring(0, 8)}********`,
      status: "DIPROSES",
      submittedAt: "Hari ini"
    };

    const updated = [newSubmission, ...mySubmissions];
    setMySubmissions(updated);
    localStorage.setItem("desa_mandiri_subs", JSON.stringify(updated));

    setSubmittedReceipt({
      id: uniqueId,
      queue: queueNo,
      estimatedDays: activeSubmitService === "Surat Keterangan Domisili" ? "1-2 Hari Kerja" : "3-5 Hari Kerja"
    });

    triggerNotification("Berkas formulir berhasil diunggah!", "success");
  };

  const handleCloseSubmission = () => {
    setActiveSubmitService(null);
    setSubmissionStep(1);
    setSubmissionForm({ name: "", nik: "", kk: "", phone: "", fileName: "" });
    setSubmittedReceipt(null);
  };

  // Request Public Info handle (Transparansi)
  const handleInfoRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!infoForm.name || !infoForm.reason) {
      triggerNotification("Harap lengkapi nama dan alasan permohonan!", "info");
      return;
    }

    const trackingCode = `PPID-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestReceipt(trackingCode);
    triggerNotification("Permohonan Informasi Publik didaftarkan!", "success");
  };

  const handleCloseInfoRequest = () => {
    setRequestInfoOpen(false);
    setInfoForm({ name: "", nik: "", address: "", phone: "", reason: "", documentType: "APBDes Lengkap" });
    setRequestReceipt(null);
  };

  // Musyawarah interactive handles
  const handleVoteSuggestion = (id: string) => {
    if (myVotes[id]) {
      // Remove vote
      setMusyawarahVotes(
        musyawarahVotes.map((v) => (v.id === id ? { ...v, votes: v.votes - 1 } : v))
      );
      setMyVotes({ ...myVotes, [id]: false });
      triggerNotification("Dukungan suara Anda ditarik kembali.", "info");
    } else {
      // Give vote
      setMusyawarahVotes(
        musyawarahVotes.map((v) => (v.id === id ? { ...v, votes: v.votes + 1 } : v))
      );
      setMyVotes({ ...myVotes, [id]: true });
      triggerNotification("Terima kasih! Suara Anda terdaftar sebagai delegasi.", "success");
    }
  };

  const handleCreateSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuggestion.trim()) return;

    const fresh: MusyawarahVote = {
      id: `v-${Date.now()}`,
      title: newSuggestion.trim(),
      category: newSuggestionCategory,
      votes: 1,
      proposedBy: "Saya (Warga Mandiri)"
    };

    setMusyawarahVotes([fresh, ...musyawarahVotes]);
    setMyVotes({ ...myVotes, [fresh.id]: true });
    setNewSuggestion("");
    triggerNotification("Gagasan baru Anda telah diterbitkan ke papan Musyawarah!", "success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-800">
      
      {/* 1. Header Section */}
      <Header 
        currentTab={currentTab} 
        setTab={(tab) => { setTab(tab); setSelectedArticle(null); }} 
        onSearchOpen={() => setSearchOpen(true)} 
      />

      {/* Floating Interactive Toast notification */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-white border border-gray-150 rounded-xl shadow-xl px-4 py-3 flex items-center space-x-3 text-left animate-bounce">
          {notification.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-[#BF8F00] shrink-0" />
          )}
          <span className="text-xs font-semibold text-gray-700 leading-snug">
            {notification.message}
          </span>
        </div>
      )}

      {/* 2. Main Content Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Article detail overlay (renders when user clicks reading card) */}
        {selectedArticle ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden text-left max-w-4xl mx-auto">
            {/* Header / Back Action */}
            <div className="p-4 bg-gray-50 border-b border-gray-150 flex items-center justify-between">
              <button
                id="article-back-btn"
                onClick={() => setSelectedArticle(null)}
                className="flex items-center space-x-1.5 text-xs font-bold text-gray-600 hover:text-[#0B2F5C] focus:outline-none"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Berita</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleLikeArticle(selectedArticle.id)}
                  className={`p-2 rounded-full border transition-all ${
                    likedArticles[selectedArticle.id]
                      ? "bg-rose-50 text-rose-500 border-rose-200"
                      : "bg-white border-gray-205 text-gray-400 hover:text-rose-500"
                  }`}
                  aria-label="Sukai Artikel"
                >
                  <Heart className={`h-4.5 w-4.5 ${likedArticles[selectedArticle.id] ? "fill-current" : ""}`} />
                </button>
                
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    triggerNotification("Tautan berita disalin ke papan klip!", "success");
                  }}
                  className="p-2 rounded-full border border-gray-200 bg-white text-gray-400 hover:text-[#0B2F5C]"
                  aria-label="Bagikan"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Main Cover Banner */}
            <div className="relative h-56 sm:h-[400px] w-full bg-slate-100">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="h-full w-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                <span className="inline-block bg-[#BF8F00] text-black text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded">
                  {selectedArticle.category}
                </span>
                <h3 className="font-display text-lg sm:text-2xl font-bold leading-tight max-w-2xl">
                  {selectedArticle.title}
                </h3>
              </div>
            </div>

            {/* Meta Info */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[#0B2F5C]">
                    {selectedArticle.author.substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{selectedArticle.author}</p>
                    <p className="text-[10px] text-gray-400">Hubmas & Penulis Resmi</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 font-semibold">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    <span>{selectedArticle.date}</span>
                  </span>
                  <span className="flex items-center space-x-1 font-semibold">
                    <ThumbsUp className="h-3.5 w-3.5 text-gray-400" />
                    <span>{likedArticles[selectedArticle.id] ? "Disukai Anda" : "Bermanfaat"}</span>
                  </span>
                  <span className="flex items-center space-x-1 font-semibold">
                    <MessageSquare className="h-3.5 w-3.5 text-gray-400" />
                    <span>{allComments.filter((c) => c.articleId === selectedArticle.id).length} Komentar</span>
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="text-sm md:text-base leading-relaxed text-gray-700 font-normal space-y-4">
                {selectedArticle.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Interactive Comments Area */}
              <div className="border-t border-gray-150 pt-8 space-y-6">
                <h4 className="font-display font-bold text-sm md:text-base text-gray-900 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-[#BF8F00]" />
                  <span>Komentar Warga ({allComments.filter((c) => c.articleId === selectedArticle.id).length})</span>
                </h4>

                {/* Form to leave comments */}
                <form 
                  onSubmit={(e) => handleAddComment(e, selectedArticle.id)}
                  className="bg-slate-50 border border-gray-200 rounded-xl p-4 space-y-3"
                >
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider text-left">Suarakan Pendapat atau Pertanyaan Anda</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      id="comment-name-input"
                      type="text"
                      required
                      placeholder="Nama asli Anda (Contoh: Budi Santoso)"
                      value={commentNameInput}
                      onChange={(e) => setCommentNameInput(e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0B2F5C]"
                    />
                    <span className="text-[10px] text-gray-400 flex items-center justify-start md:justify-end">
                      * Seluruh komentar dimoderasi sesuai UU ITE.
                    </span>
                  </div>

                  <textarea
                    id="comment-content-input"
                    required
                    rows={3}
                    placeholder="Masukkan pesan atau kritik saran yang membagun..."
                    value={commentContentInput}
                    onChange={(e) => setCommentContentInput(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#0B2F5C] resize-none"
                  />

                  <button
                    id="comment-submit-btn"
                    type="submit"
                    className="bg-[#0B2F5C] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#072447] transition-all cursor-pointer"
                  >
                    Kirim Komentar
                  </button>
                </form>

                {/* Listing of comments */}
                <div className="space-y-4">
                  {allComments.filter((c) => c.articleId === selectedArticle.id).length > 0 ? (
                    allComments
                      .filter((c) => c.articleId === selectedArticle.id)
                      .map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-3 p-3.5 bg-white border border-gray-100 rounded-lg text-left">
                          <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <User className="h-4.5 w-4.5" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-gray-800">{comment.author}</span>
                              <span className="text-[9px] text-gray-400 font-semibold">{comment.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 font-normal leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-4 text-xs text-gray-400">
                      Belum ada komentar untuk berita ini. Jadilah yang pertama berkomentar secara tertib!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Primary routing layout tabs */
          <>
            {currentTab === "beranda" && (
              <BerandaView 
                setTab={setTab} 
                onSelectArticle={handleSelectArticle}
                onOpenMusyawarahModal={() => setMusyawarahOpen(true)}
              />
            )}
            
            {currentTab === "berita" && (
              <BeritaView onSelectArticle={handleSelectArticle} />
            )}
            
            {currentTab === "profil" && (
              <ProfilView />
            )}

            {currentTab === "layanan" && (
              <div className="space-y-8">
                <LayananView 
                  onStartSubmission={(svcName) => {
                    setActiveSubmitService(svcName);
                    setSubmissionStep(1);
                  }}
                  onShowNotification={triggerNotification}
                />

                {/* Submissions History Grid in Layanan Tab  */}
                <section id="submission-history-section" className="border-t border-gray-200 pt-8 text-left space-y-4">
                  <div className="flex items-center space-x-2">
                    <ClipboardList className="h-5 w-5 text-[#0B2F5C]" />
                    <h3 className="font-display font-black text-lg md:text-xl text-[#0B2F5C]">
                      Daftar Pengajuan Anda ({mySubmissions.length})
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 max-w-xl font-normal leading-relaxed">
                    Setiap pendaftaran dokumen baru yang Anda selesaikan via simulator akan terekam secara lokal di bawah ini beserta status verifikasi.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mySubmissions.map((sub) => (
                      <div key={sub.id} className="bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-between shadow-xs">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                              {sub.id}
                            </span>
                            <span className="text-[9px] text-gray-400 font-bold">{sub.submittedAt}</span>
                          </div>
                          <h4 className="font-display font-bold text-xs text-gray-900 leading-snug">
                            {sub.serviceName}
                          </h4>
                          <p className="text-[10px] text-gray-500">Pendaftar: {sub.applicantName}</p>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          sub.status === 'SELESAI' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-amber-50 text-[#BF8F00]'
                        }`}>
                          • {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {currentTab === "transparansi" && (
              <TransparansiView 
                onOpenRequestInfoModal={() => setRequestInfoOpen(true)}
                onShowNotification={triggerNotification}
              />
            )}

            {currentTab === "kontak" && (
              <KontakView onShowNotification={triggerNotification} />
            )}
          </>
        )}
      </main>

      {/* 3. Footer Section */}
      <Footer setTab={(tab) => { setTab(tab); setSelectedArticle(null); }} openModal={setInfoModalType} />

      {/* 4. Bottom Navbar (visible on mobile only) */}
      <BottomNav currentTab={currentTab} setTab={(tab) => { setTab(tab); setSelectedArticle(null); }} />

      {/* ————————————————— MODALS AND DIALOGS SYSTEM ————————————————— */}

      {/* MODAL 1: Search Overlay Dialog */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2F5C]/95 backdrop-blur-md flex flex-col p-4 text-white">
          <div className="mx-auto w-full max-w-3xl flex flex-col h-full pt-8 space-y-6">
            
            {/* Top Close Search Input */}
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <div className="flex-1 relative mr-4">
                <Search className="absolute left-1 top-3 h-5 w-5 text-[#BF8F00]" />
                <input
                  id="global-modal-search"
                  type="text"
                  autoFocus
                  placeholder="Ketik apa saja (contoh: bansos, KTP, APBDes, dll)..."
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none pl-8 pr-4 py-2 font-display text-base md:text-lg text-white focus:outline-none placeholder-white/40"
                />
              </div>

              <button
                onClick={() => { setSearchOpen(false); setGlobalSearchQuery(""); }}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 active:scale-95 transition-all outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Live Search Matching Results */}
            <div className="flex-1 overflow-y-auto space-y-5 text-left">
              <p className="text-[10px] text-white/50 uppercase font-black tracking-widest leading-none">HASIL PENELUSURAN LIVE</p>
              
              {globalSearchQuery.trim() === "" ? (
                <div className="space-y-4">
                  <p className="text-xs text-gray-300">Pencarian Cepat Populer :</p>
                  <div className="flex flex-wrap gap-2 select-none">
                    {["BLT", "Kerja Bakti", "Domisili", "KTP Mandiri", "Struktur Organisasi", "Dana Desa"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setGlobalSearchQuery(term)}
                        className="bg-white/5 border border-white/10 hover:bg-white/10 text-xs px-3.5 py-1.5 rounded-full transition-all text-white outline-none"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Match 1: Articles */}
                  {NEWS_ARTICLES.filter(
                    a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
                         a.description.toLowerCase().includes(globalSearchQuery.toLowerCase())
                  ).map((art) => (
                    <div 
                      key={art.id}
                      onClick={() => {
                        handleSelectArticle(art);
                        setSearchOpen(false);
                        setGlobalSearchQuery("");
                      }}
                      className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors"
                    >
                      <span className="text-[9px] bg-[#BF8F00] text-black font-extrabold px-2 py-0.5 rounded uppercase">Berita</span>
                      <h4 className="font-display font-bold text-xs md:text-sm text-white mt-1.5">{art.title}</h4>
                      <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5">{art.description}</p>
                    </div>
                  ))}

                  {/* Match 2: FAQ queries */}
                  {FAQ_ITEMS.filter(
                    f => f.question.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                         f.answer.toLowerCase().includes(globalSearchQuery.toLowerCase())
                  ).map((f) => (
                    <div 
                      key={f.id}
                      onClick={() => {
                        setTab("layanan");
                        setSearchOpen(false);
                        setGlobalSearchQuery("");
                      }}
                      className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer transition-colors"
                    >
                      <span className="text-[9px] bg-sky-950 border border-sky-850 text-sky-400 font-extrabold px-2 py-0.5 rounded uppercase">FAQ Layanan</span>
                      <h4 className="font-display font-bold text-xs md:text-sm text-white mt-1.5">{f.question}</h4>
                      <p className="text-[10px] text-gray-300 line-clamp-1 mt-0.5">{f.answer}</p>
                    </div>
                  ))}

                  {/* Empty warning */}
                  {NEWS_ARTICLES.filter(a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase())).length === 0 &&
                   FAQ_ITEMS.filter(f => f.question.toLowerCase().includes(globalSearchQuery.toLowerCase())).length === 0 && (
                     <div className="text-center py-10 text-xs text-white/50">
                       Tidak ditemukan berkas yang cocok dengan "{globalSearchQuery}". Coba ejaan bahasa Indonesia baku yang lain.
                     </div>
                   )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Public Doc Submission Form Wizard / Simulator */}
      {activeSubmitService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden text-left border border-gray-150 animate-in fade-in-50">
            {/* Header */}
            <div className="bg-[#0B2F5C] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm leading-snug">Silakan Isi Formulir</h3>
                <p className="text-[10px] text-blue-200 mt-0.5">SIPAD Online • {activeSubmitService}</p>
              </div>
              {!submittedReceipt && (
                <button
                  onClick={handleCloseSubmission}
                  className="rounded-full p-1.5 text-white/80 hover:bg-white/10 focus:outline-none"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              )}
            </div>

            {/* Receipt output screen */}
            {submittedReceipt ? (
              <div className="p-6 text-center space-y-5">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-gray-900">Pengajuan Terkirim Sukses!</h4>
                  <p className="text-xs text-gray-500 leading-normal max-w-xs mx-auto font-normal">
                    Dokumen Anda terdaftar secara sah di antrean verifikasi petugas Desa Mandiri.
                  </p>
                </div>

                {/* Receipt credentials */}
                <div className="rounded-xl border border-gray-150 bg-gray-50 p-4 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gray-150 pb-1.5 font-semibold text-gray-700">
                    <span>ID Pengajuan:</span>
                    <span className="font-mono text-[#0B2F5C]">{submittedReceipt.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-1.5">
                    <span>Petugas Verifikasi:</span>
                    <span>Siti Aminah, S.A.P.</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-150 pb-1.5">
                    <span>Estimasi Selesai:</span>
                    <span className="font-bold text-gray-800">{submittedReceipt.estimatedDays}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-[#BF8F00] font-bold">
                    <span>Sisa Antrean Hari ini:</span>
                    <span>{submittedReceipt.queue} Berkas</span>
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 font-normal leading-normal">
                  * Simpan kode ID Pengajuan Di atas untuk ditunjukkan ke petugas verifikasi saat pengambilan dokumen fisik di Balai Desa Mandiri.
                </div>

                <button
                  id="receipt-close-btn"
                  onClick={handleCloseSubmission}
                  className="w-full bg-[#0B2F5C] hover:bg-[#072447] text-white py-2.5 rounded-lg text-xs font-bold transition-all outline-none"
                >
                  Selesai & Keluar
                </button>
              </div>
            ) : (
              /* Core submission stages */
              <div className="p-6 space-y-4">
                {submissionStep === 1 ? (
                  <>
                    <h4 className="text-[10px] font-bold text-[#BF8F00] uppercase tracking-wider">Tahap 1: Identitas Pemohon</h4>
                    
                    <div className="space-y-4 text-xs font-normal">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Nama Lengkap Pemohon *</label>
                        <input
                          id="submit-form-name"
                          type="text"
                          required
                          placeholder="Sesuai KTP"
                          value={submissionForm.name}
                          onChange={(e) => setSubmissionForm({ ...submissionForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs"
                        />
                      </div>

                      {/* NIK input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">NIK Kependudukan (16 digit) *</label>
                        <input
                          id="submit-form-nik"
                          type="text"
                          required
                          maxLength={16}
                          placeholder="Masukkan 16 digit NIK"
                          value={submissionForm.nik}
                          onChange={(e) => setSubmissionForm({ ...submissionForm, nik: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs"
                        />
                      </div>

                      {/* KK number */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Nomor Kartu Keluarga *</label>
                        <input
                          id="submit-form-kk"
                          type="text"
                          required
                          maxLength={16}
                          placeholder="Nomor KK 16 Digit"
                          value={submissionForm.kk}
                          onChange={(e) => setSubmissionForm({ ...submissionForm, kk: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs"
                        />
                      </div>

                      {/* Phone number */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase font-bold">Nomor WhatsApp Aktif *</label>
                        <input
                          id="submit-form-phone"
                          type="tel"
                          required
                          placeholder="Contoh: 0812xxxxxxxx"
                          value={submissionForm.phone}
                          onChange={(e) => setSubmissionForm({ ...submissionForm, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      id="submit-form-next-btn"
                      onClick={handleSubmissionNext}
                      className="w-full bg-[#0B2F5C] text-white py-3 rounded-lg text-xs font-bold hover:bg-[#072447] mt-3"
                    >
                      Lanjutkan ke Tahap Berkas
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="text-[10px] font-bold text-[#BF8F00] uppercase tracking-wider">Tahap 2: Unggah Berkas Persyaratan</h4>
                    
                    <div className="space-y-4">
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        Persyaratan berkas digital wajib diunggah dalam format PDF atau Gambar JPG/PNG (Max 5MB).
                      </p>

                      <div className="border-2 border-dashed border-gray-200 hover:border-[#BF8F00] hover:bg-slate-50 rounded-xl p-6 text-center select-none transition-colors">
                        <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                        <span className="text-xs font-bold text-gray-800">Tautkan Berkas Digital Dokumen</span>
                        <p className="text-[10px] text-gray-400 mt-1">KK copy, Surat Pengantar dan Berkas Pendukung</p>
                        
                        <button
                          id="simulate-upload-btn"
                          onClick={handleFileChangeSimulate}
                          type="button"
                          className="mt-4 bg-[#BF8F00] hover:bg-yellow-700 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg"
                        >
                          Klik Simulasi Pilih File
                        </button>
                      </div>

                      {submissionForm.fileName && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-emerald-800 font-bold leading-none">
                          <span className="truncate max-w-[240px]">{submissionForm.fileName}</span>
                          <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded uppercase">READY</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <button
                        onClick={() => setSubmissionStep(1)}
                        className="py-3 border border-gray-200 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all text-center"
                      >
                        Kembali
                      </button>
                      <button
                        id="submit-form-final-btn"
                        onClick={handleSubmitApplication}
                        className="py-3 bg-[#0B2F5C] hover:bg-[#072447] text-white rounded-lg text-xs font-bold transition-all text-center"
                      >
                        Kirim Berkas
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Minta Informasi Publik (Transparansi View Action) */}
      {requestInfoOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden text-left border border-gray-150 animate-in fade-in-50">
            <div className="bg-[#8B7500] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-sm">Permohonan Informasi Publik</h3>
                <p className="text-[10px] text-amber-100">PPID Pembantu Desa Mandiri • UU KIP No. 14 Tahun 2008</p>
              </div>
              {!requestReceipt && (
                <button onClick={handleCloseInfoRequest} className="rounded-full p-1.5 text-white/80 hover:bg-white/10 focus:outline-none">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {requestReceipt ? (
              <div className="p-6 text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-[#8B7500] mx-auto" />
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900">Registrasi Terverifikasi!</h4>
                  <p className="text-xs text-gray-500 mt-1 font-normal leading-relaxed">
                    Permintaan rincian data Anda telah resmi terdaftar dalam keterbukan data daerah. Petugas PPID kami akan meninjau kelayakan dalam <strong>7 hari kerja</strong>.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-150 rounded-xl p-4 text-xs space-y-1 text-left font-normal text-amber-900">
                  <p><strong>Nama Pemohon:</strong> {infoForm.name}</p>
                  <p><strong>Dokumen Diminta:</strong> {infoForm.documentType}</p>
                  <p><strong>Nomor Registrasi Lacak:</strong> <strong className="font-mono text-[#0B2F5C]">{requestReceipt}</strong></p>
                </div>

                <button 
                  onClick={handleCloseInfoRequest}
                  className="w-full bg-[#0B2F5C] hover:bg-[#072447] text-white py-2.5 rounded-lg text-xs font-bold transition-all"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={handleInfoRequestSubmit} className="p-6 space-y-4">
                <p className="text-[10px] text-gray-500 font-normal leading-normal">
                  Sesuai ketentuan, pemohon wajib melampirkan identitas yang memadai untuk melakukan permintaan rincian laporan anggaran desa.
                </p>

                <div className="space-y-3 text-xs font-normal">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Nama Lengkap Pemohon *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Nama sesuai KTP"
                      value={infoForm.name}
                      onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* NIK */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase font-bold">NIK KTP *</label>
                      <input 
                        type="text" 
                        required 
                        maxLength={16}
                        placeholder="NIK 16 digit"
                        value={infoForm.nik}
                        onChange={(e) => setInfoForm({ ...infoForm, nik: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2"
                      />
                    </div>
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase font-bold">No. WhasApp *</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="Telepon aktif"
                        value={infoForm.phone}
                        onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Document type select */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Jenis Informasi yang Diminta</label>
                    <select
                      value={infoForm.documentType}
                      onChange={(e) => setInfoForm({ ...infoForm, documentType: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-xs"
                    >
                      <option value="APBDes Lengkap">Rincian APBDes Lengkap (PDF)</option>
                      <option value="LPJ Fisik">Laporan Pertanggungjawaban Pembangunan Fisik</option>
                      <option value="Daftar KPM Bansos">Arsip Penerima Manfaat BLT/Bansos</option>
                    </select>
                  </div>

                  {/* Reason text */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Tujuan & Alasan Permasalahan Dokumen *</label>
                    <textarea 
                      required 
                      rows={3}
                      placeholder="Contoh: Digunakan untuk keperluan riset akademis, kajian transparansi RT setempat..."
                      value={infoForm.reason}
                      onChange={(e) => setInfoForm({ ...infoForm, reason: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={handleCloseInfoRequest}
                    className="py-2.5 border border-gray-200 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="py-2.5 bg-[#8B7500] hover:bg-amber-800 text-white rounded-lg text-xs font-bold"
                  >
                    Kirim Permohonan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: Musyawarah Perencanaan Suggestion Board & Voting Platform */}
      {musyawarahOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden text-left border border-gray-150 flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="bg-[#0B2F5C] text-white p-5 flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <span className="inline-block bg-[#BF8F00] text-black text-[9px] font-extrabold px-2 py-0.5 rounded uppercase font-semibold">
                  Musrenbang 2024
                </span>
                <h3 className="font-display font-black text-sm">Aspirasi Program Pembangunan</h3>
              </div>
              <button 
                onClick={() => setMusyawarahOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10 text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Scrolling suggestions content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <p className="text-xs text-gray-500 font-normal leading-relaxed">
                Tinjau atau berikan dukungan suara Anda pada gagasan pembangunan infrastruktur dan pemberdayaan masyarakat yang diusulkan oleh perwakilan RT/RW Desa Mandiri. Gagasan dengan dukungan terbanyak akan diprioritaskan di rapat pleno desa berikutnya.
              </p>

              {/* Add Suggestion Form */}
              <form 
                onSubmit={handleCreateSuggestion}
                className="bg-slate-50 border border-gray-200 rounded-xl p-4 space-y-3"
              >
                <h4 className="text-[10px] font-bold text-[#0B2F5C] uppercase tracking-wider">Usulkan Gagasan Baru Anda</h4>
                
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    id="new-suggest-input"
                    type="text"
                    required
                    placeholder="Contoh: Perbaikan parit air limbah RW 03..."
                    value={newSuggestion}
                    onChange={(e) => setNewSuggestion(e.target.value)}
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                  />
                  
                  <select
                    value={newSuggestionCategory}
                    onChange={(e) => setNewSuggestionCategory(e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs select-none"
                  >
                    <option value="Infrastruktur">Infrastruktur</option>
                    <option value="Kesehatan">Kesehatan</option>
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Kebudayaan">Kebudayaan</option>
                  </select>
                </div>

                <button
                  id="musyawarah-submit-btn"
                  type="submit"
                  className="bg-[#BF8F00] hover:bg-yellow-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer"
                >
                  Terbitkan Gagasan
                </button>
              </form>

              {/* Suggestions List */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Papan Dukungan Gagasan</h4>
                
                {musyawarahVotes.map((v) => {
                  const hasVoted = !!myVotes[v.id];
                  return (
                    <div 
                      key={v.id} 
                      className="border border-gray-150 rounded-xl p-4 bg-white flex items-center justify-between hover:border-gray-200 transition-colors"
                    >
                      <div className="space-y-1 pr-4 flex-1 text-left">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[9px] font-extrabold bg-[#0B2F5C]/10 text-[#0B2F5C] px-2 py-0.5 rounded">
                            {v.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold text-xs font-normal">
                            Diusulkan: {v.proposedBy}
                          </span>
                        </div>
                        <h5 className="font-display font-bold text-xs text-gray-950 font-semibold leading-snug">
                          {v.title}
                        </h5>
                      </div>

                      <button
                        id={`btn-vote-${v.id}`}
                        onClick={() => handleVoteSuggestion(v.id)}
                        className={`flex flex-col items-center justify-center h-14 w-14 rounded-lg border transition-all ${
                          hasVoted
                            ? "bg-rose-50 text-rose-600 border-rose-200"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                        }`}
                        aria-label="Upvote"
                      >
                        <Heart className={`h-4.5 w-4.5 ${hasVoted ? "fill-current" : ""}`} />
                        <span className="text-xs font-bold leading-none mt-1">{v.votes}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom button */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button 
                onClick={() => setMusyawarahOpen(false)}
                className="bg-[#0B2F5C] text-white font-bold text-xs px-5 py-2 rounded-lg"
              >
                Selesai Meninjau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Footers Static Information Modals (Sitemaps, Privacy Clauses, Usage Rules) */}
      {infoModalType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden text-left border border-gray-150 animate-in fade-in-50">
            <div className="bg-[#1A1A1A] text-white p-5 flex items-center justify-between">
              <h3 className="font-display font-bold text-sm">
                {infoModalType === "peta-situs" && "Peta Situs Lengkap"}
                {infoModalType === "kebijakan-privasi" && "Kebijakan Privasi & Keamanan"}
                {infoModalType === "syarat" && "Syarat Penggunaan SIPAD"}
              </h3>
              <button 
                onClick={() => setInfoModalType(null)}
                className="text-white hover:text-gray-400 focus:outline-none"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-gray-600 leading-relaxed font-normal">
              {infoModalType === "peta-situs" && (
                <div className="space-y-3 text-left">
                  <p>Berikut peta jaringan menu dan sub-halaman digital Desa Mandiri terintegrasi :</p>
                  <ul className="space-y-2.5 font-semibold text-gray-800">
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-[#BF8F00] rounded-full inline-block" />
                      <span>Beranda utama (Slider aspirasi, stats, and 3 berita terbaru)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-[#BF8F00] rounded-full inline-block" />
                      <span>Arsip berita (Pencarian berita, and filter multikategori)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-[#BF8F00] rounded-full inline-block" />
                      <span>Layanan publik digital (Adminduk instan, form download, and accordions FAQ)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-[#BF8F00] rounded-full inline-block" />
                      <span>Profil lembaga (Visi, misi check, and detail officers hierarchy)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-[#BF8F00] rounded-full inline-block" />
                      <span>Anggaran terbuka (Dashboard pendapatan kotor, belanja, and e-transparansi)</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span className="h-1.5 w-1.5 bg-[#BF8F00] rounded-full inline-block" />
                      <span>Kontak & helpcenter (Open aduan, map koordinat, WA, and email)</span>
                    </li>
                  </ul>
                </div>
              )}

              {infoModalType === "kebijakan-privasi" && (
                <div className="space-y-3 text-left">
                  <p>Undang-Undang Perlindungan Data Pribadi menjamin kerahasiaan digital warga Desa Mandiri :</p>
                  <p>1. Data identitas nomor NIK dan nomor KK pemohon dalam pengajuan berkas tidak didaftarkan secara permanen di server global, melainkan disimpan dengan enkripsi browser lokal (localStorage).</p>
                  <p>2. Kritik, keluhan, maupun nomor telepon seluler tidak disebarluaskan untuk kepentingan komersial.</p>
                  <p>3. Desa Mandiri berkomitmen mewujudkan transparansi data publik (APBDes) tanpa mengungkap transaksi individu/kelompok rentan.</p>
                </div>
              )}

              {infoModalType === "syarat" && (
                <div className="space-y-3 text-left border-gray-100">
                  <p>Syarat-syarat pemanfaatan simulator portal resmi administrasi Desa Mandiri :</p>
                  <p>1. Warga diwajibkan mendaftarkan aduan, usulan, dan aspirasi menggunakan identitas nama asli.</p>
                  <p>2. Dilarang mengunggah berkas tiruan atau dokumen yang melanggar hukum.</p>
                  <p>3. Penyalahgunaan portal digital untuk pencemaran nama baik kepala desa atau aparatur desa dapat dikenakan penalti sanksi administratif dan adat.</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-right">
              <button 
                onClick={() => setInfoModalType(null)}
                className="bg-[#0B2F5C] hover:bg-[#072447] text-white px-4 py-2 rounded-lg text-xs font-bold"
              >
                Pahami
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
