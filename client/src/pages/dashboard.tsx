import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  School,
  LayoutGrid,
  List,
  LogOut,
  ClipboardCheck,
  HeartHandshake,
  BarChart3,
  Search,
  X,
  Clock,
  Sparkles,
  Calculator,
  ClipboardList,
  BookOpen,
  Building2,
  Trophy,
  Stethoscope,
  Bus,
  Brain,
  Award,
  Dumbbell,
  Gem,
  FileQuestion,
  FolderOpen,
  Calendar,
  FileText,
  PenTool,
  UserCheck,
  ExternalLink,
  Menu,
  ScrollText,
  BrainCircuit
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { KPIDashboard } from "@/components/kpi-dashboard";
import platformBanner from "@assets/riyadh_platform_banner_new.png";
import accreditationLogo from "@assets/تنزيل_1766861652266.jpg";

const systems = [
  {
    title: "الشؤون المدرسية",
    description: "النظام المالي ومتابعة المهام والمبنى المدرسي.",
    icon: School,
    href: "/school-affairs",
    color: "bg-emerald-500",
    isInternal: true
  },
  {
    title: "الشؤون التعليمية",
    description: "أعمال الاختبارات ومتابعة الأعمال الفنية.",
    icon: ClipboardCheck,
    href: "/educational",
    color: "bg-indigo-500",
    isInternal: true
  },
  {
    title: "شؤون الطلاب",
    description: "النشاط والتوجيه والإشراف الصحي والحافلات وصعوبات التعلم ومصادر التعلم.",
    icon: HeartHandshake,
    href: "/students",
    color: "bg-amber-500",
    isInternal: true
  }
];

const allSubSystems = [
  { title: "النظام المالي", icon: Calculator, href: "https://financial.riyadhplatform.tech", category: "الشؤون المدرسية" },
  { title: "متابعة المهام", icon: ClipboardList, href: "https://tasks.riyadhplatform.tech", category: "الشؤون المدرسية" },
  { title: "مصادر التعلم", icon: BookOpen, href: "https://learning.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "المبنى المدرسي", icon: Building2, href: "https://maintenance.riyadhplatform.tech", category: "الشؤون المدرسية" },
  { title: "تسليم الأسئلة", icon: FileQuestion, href: "https://exams-qs.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "متابعة الاختبارات", icon: ClipboardCheck, href: "https://exam-followup.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "تحليل النتائج", icon: BarChart3, href: "https://exam-analysis.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "الجداول المدرسية", icon: Calendar, href: "https://school-timetables.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "ملفات الإنجاز", icon: FolderOpen, href: "https://portfolio.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "سجلات المتابعة", icon: FileText, href: "https://records.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "الأعمال التحريرية", icon: PenTool, href: "https://supervision.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "الزيارات الفنية", icon: UserCheck, href: "https://supervision-visit.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "الرخصة المهنية", icon: Award, href: "https://license.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "تدريبات نافس", icon: Dumbbell, href: "https://nafs.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "رياض بيرلز", icon: Gem, href: "https://prils.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "الأدلة واللوائح", icon: ScrollText, href: "https://regulations.riyadhplatform.tech", category: "الشؤون التعليمية" },
  { title: "النشاط الطلابي", icon: Trophy, href: "https://activities.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "التوجيه الطلابي", icon: HeartHandshake, href: "https://counselor.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "الإشراف الصحي", icon: Stethoscope, href: "https://health.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "مخالفات الحافلات", icon: Bus, href: "https://bus.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "صعوبات التعلم", icon: Brain, href: "https://special-edu.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "بنك الأسئلة الذكي", icon: BrainCircuit, href: "https://quizflow.riyadhplatform.tech", category: "الشؤون التعليمية" },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "مساء الخير";
  return "مساء النور";
}

function getHijriDate(): string {
  try {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  } catch { return ""; }
}

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showKPI, setShowKPI] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setLocation("/login");
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allSubSystems.filter(s => s.title.includes(searchQuery) || s.category.includes(searchQuery));
  }, [searchQuery]);

  const greeting = useMemo(() => getGreeting(), []);
  const hijriDate = useMemo(() => getHijriDate(), []);

  return (
    <div className="min-h-screen font-sans bg-islamic-pattern-subtle" dir="rtl" style={{ background: "#FDFBF5" }}>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50"
        style={{
          background: "linear-gradient(135deg, #0B5E3A 0%, #0D7A4E 55%, #083D27 100%)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)"
        }}>

        {/* Gold top line */}
        <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #F0D87A, #C9A84C, transparent)" }} />

        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

        <div className="relative container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)" }}>
              <School className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#F0D87A" }} />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black text-white leading-tight" data-testid="text-school-name">
                مدرسة الرياض الابتدائية
              </h1>
              <p className="text-[10px] sm:text-xs" style={{ color: "rgba(201,168,76,0.6)" }} data-testid="text-school-year">
                العام الدراسي 1447هـ
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-1.5 sm:gap-2 items-center">

            {/* Mobile search */}
            <button onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg transition-colors sm:hidden"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
              data-testid="button-search-mobile">
              <Search className="w-4 h-4" />
            </button>

            {/* Desktop search */}
            <div className="hidden sm:flex relative">
              <div className="relative">
                <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "rgba(201,168,76,0.6)" }} />
                <input
                  type="text"
                  placeholder="بحث في الأنظمة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 lg:w-60 h-9 pr-9 pl-3 text-sm rounded-lg focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: "#fff",
                  }}
                  data-testid="input-search-desktop"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute top-1/2 left-2 -translate-y-1/2" style={{ color: "rgba(201,168,76,0.6)" }}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {searchQuery && searchResults.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 w-72 rounded-xl overflow-hidden z-50"
                    style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
                    {searchResults.map((item, i) => (
                      <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 transition-colors border-b border-slate-100 last:border-0"
                        style={{ color: "#1A2B1F" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#FDFBF5"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                        data-testid={`link-search-result-${i}`}>
                        <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#0B5E3A" }} />
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.category}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 mr-auto flex-shrink-0" style={{ color: "#C9A84C" }} />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View controls */}
            <div className="hidden sm:flex gap-0.5 rounded-lg p-1" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <button onClick={() => setShowKPI(!showKPI)}
                className="p-1.5 sm:p-2 rounded-md transition-colors"
                style={{ background: showKPI ? "rgba(201,168,76,0.3)" : "transparent", color: showKPI ? "#F0D87A" : "rgba(255,255,255,0.6)" }}
                title="مؤشرات الإنجاز" data-testid="button-toggle-kpi">
                <BarChart3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('grid')}
                className="p-1.5 sm:p-2 rounded-md transition-colors"
                style={{ background: viewMode === 'grid' ? "rgba(201,168,76,0.3)" : "transparent", color: viewMode === 'grid' ? "#F0D87A" : "rgba(255,255,255,0.6)" }}
                title="عرض شبكي" data-testid="button-view-grid">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')}
                className="p-1.5 sm:p-2 rounded-md transition-colors"
                style={{ background: viewMode === 'list' ? "rgba(201,168,76,0.3)" : "transparent", color: viewMode === 'list' ? "#F0D87A" : "rgba(255,255,255,0.6)" }}
                title="عرض قائمة" data-testid="button-view-list">
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
              data-testid="button-mobile-menu">
              <Menu className="w-4 h-4" />
            </button>

            {/* Logout */}
            <button onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-lg transition-all"
              style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.25)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.15)"}
              data-testid="button-logout">
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="relative h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden"
              style={{ background: "rgba(8,61,39,0.97)", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="p-3 space-y-2">
                <div className="flex gap-1 p-1 rounded-lg w-fit" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <button onClick={() => { setShowKPI(!showKPI); setMobileMenuOpen(false); }}
                    className="p-2 rounded-md text-xs flex items-center gap-1.5 transition-colors"
                    style={{ background: showKPI ? "rgba(201,168,76,0.25)" : "transparent", color: showKPI ? "#F0D87A" : "rgba(255,255,255,0.6)" }}>
                    <BarChart3 className="w-3.5 h-3.5" /> المؤشرات
                  </button>
                  <button onClick={() => { setViewMode('grid'); setMobileMenuOpen(false); }}
                    className="p-2 rounded-md text-xs flex items-center gap-1.5 transition-colors"
                    style={{ background: viewMode === 'grid' ? "rgba(201,168,76,0.25)" : "transparent", color: viewMode === 'grid' ? "#F0D87A" : "rgba(255,255,255,0.6)" }}>
                    <LayoutGrid className="w-3.5 h-3.5" /> شبكي
                  </button>
                  <button onClick={() => { setViewMode('list'); setMobileMenuOpen(false); }}
                    className="p-2 rounded-md text-xs flex items-center gap-1.5 transition-colors"
                    style={{ background: viewMode === 'list' ? "rgba(201,168,76,0.25)" : "transparent", color: viewMode === 'list' ? "#F0D87A" : "rgba(255,255,255,0.6)" }}>
                    <List className="w-3.5 h-3.5" /> قائمة
                  </button>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg w-full transition-colors"
                  style={{ color: "#fca5a5", background: "rgba(239,68,68,0.12)" }}>
                  <LogOut className="w-4 h-4" /> تسجيل خروج
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile search bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden"
              style={{ background: "rgba(8,61,39,0.97)", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(201,168,76,0.5)" }} />
                  <input type="text" placeholder="بحث في الأنظمة..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus
                    className="w-full h-10 pr-9 pl-9 text-sm rounded-lg focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,168,76,0.25)", color: "#fff" }}
                    data-testid="input-search-mobile" />
                  <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="absolute top-1/2 left-3 -translate-y-1/2" style={{ color: "rgba(201,168,76,0.5)" }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {searchQuery && searchResults.length > 0 && (
                  <div className="mt-2 rounded-lg overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)" }}>
                    {searchResults.map((item, i) => (
                      <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50">
                        <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#0B5E3A" }} />
                        <span className="text-sm font-medium text-slate-800 truncate">{item.title}</span>
                        <ExternalLink className="w-3 h-3 mr-auto flex-shrink-0" style={{ color: "#C9A84C" }} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== BANNER ===== */}
      <div className="relative w-full overflow-hidden" style={{ background: "#070b14" }}>
        <div className="relative w-full h-[180px] sm:h-[240px] md:h-[300px]">
          <img src={platformBanner} alt="منصة الرياض الإلكترونية"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager" data-testid="img-platform-banner" />

          {/* Dark overlay with green tint */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,94,58,0.65) 0%, rgba(0,0,0,0.4) 50%, rgba(11,94,58,0.5) 100%)" }} />

          {/* Islamic pattern overlay */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

          {/* Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center">

              {/* Gold geometric divider top */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <polygon points="8,0 10,5.5 16,8 10,10.5 8,16 6,10.5 0,8 6,5.5" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.8" />
                </svg>
                <div className="h-px w-10 opacity-50" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2"
                style={{ textShadow: "0 0 60px rgba(201,168,76,0.4), 0 2px 4px rgba(0,0,0,0.6)", fontFamily: "Cairo, sans-serif" }}
                data-testid="text-platform-title">
                منصة الرياض الإلكترونية
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-bold tracking-widest mb-3"
                style={{ color: "#E8C96A", textShadow: "0 0 30px rgba(201,168,76,0.5)", letterSpacing: "0.14em" }}
                data-testid="text-platform-subtitle">
                RiyadhPlatform
              </p>

              {/* Gold line */}
              <div className="w-24 sm:w-40 md:w-52 h-[1.5px] mb-2 sm:mb-3" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

              <p className="text-[11px] sm:text-sm text-white/60 font-medium max-w-md"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)", fontFamily: "Cairo, sans-serif" }}
                data-testid="text-platform-description">
                منصة موحدة لجميع الأنظمة الإدارية والتعليمية لمتابعة الأداء ورفع الكفاءة
              </p>
            </motion.div>
          </div>

          {/* Accreditation logo */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden"
              style={{ border: "1.5px solid rgba(201,168,76,0.5)", boxShadow: "0 0 16px rgba(201,168,76,0.2)" }}>
              <img src={accreditationLogo} alt="شعار الاعتماد" className="w-full h-full object-cover" loading="lazy" data-testid="img-accreditation" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== GREETING STRIP ===== */}
      <div className="container mx-auto px-3 sm:px-4 -mt-4 sm:-mt-5 relative z-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(201,168,76,0.25)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
          }}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}>
              <Sparkles className="w-4 h-4" style={{ color: "#C9A84C" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#0B3D24" }} data-testid="text-greeting">{greeting}، مدير النظام</p>
              <p className="text-[10px] sm:text-xs text-slate-400" data-testid="text-date">{hijriDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#0B5E3A" }} />
              <Clock className="w-3.5 h-3.5" />
              <span>{allSubSystems.length} تطبيق متاح</span>
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <span>3 أقسام رئيسية</span>
          </div>
        </motion.div>
      </div>

      {/* ===== KPI SECTION ===== */}
      <AnimatePresence>
        {showKPI && (
          <motion.section initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="container mx-auto px-3 sm:px-4 py-4 sm:py-5 relative z-10 overflow-hidden">
            <div className="rounded-xl p-3 sm:p-5"
              style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <KPIDashboard />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ===== MAIN SECTIONS ===== */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 relative z-10">
        {/* Section title */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-5 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #C9A84C, #0B5E3A)" }} />
            <h3 className="text-base sm:text-lg font-bold" style={{ color: "#0B3D24" }} data-testid="text-sections-title">الأقسام الرئيسية</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mr-3">اختر القسم للوصول إلى الأنظمة الفرعية</p>
        </div>

        <div className={`grid gap-3 sm:gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
          {systems.map((system, index) => (
            <motion.div key={system.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}>
              <SystemCard {...system} mode={viewMode} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* ===== QUICK ACCESS ===== */}
      <section className="container mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
        <div className="rounded-2xl p-4 sm:p-6"
          style={{
            background: "linear-gradient(135deg, rgba(11,94,58,0.06) 0%, rgba(201,168,76,0.06) 100%)",
            border: "1px solid rgba(201,168,76,0.2)",
          }}>
          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #C9A84C, #0B5E3A)" }} />
            <h4 className="text-sm sm:text-base font-bold" style={{ color: "#0B3D24" }} data-testid="text-quick-access-title">
              الوصول السريع لجميع الأنظمة
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {allSubSystems.map((item, i) => (
              <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl transition-all group"
                style={{ background: "#fff", border: "1px solid rgba(201,168,76,0.15)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(11,94,58,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.15)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                data-testid={`link-quick-${i}`}>
                <item.icon className="w-4 h-4 flex-shrink-0 transition-colors" style={{ color: "#0B5E3A" }} />
                <span className="text-[11px] sm:text-xs font-medium text-slate-700 truncate">{item.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: "linear-gradient(135deg, #0B5E3A, #083D27)", borderTop: "1px solid rgba(201,168,76,0.2)" }}
        className="py-5 sm:py-6">
        {/* Top gold line */}
        <div className="h-[1px] mb-5" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 opacity-30" style={{ background: "#C9A84C" }} />
            <div className="p-1.5 rounded-lg" style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
              <School className="w-4 h-4" style={{ color: "#F0D87A" }} />
            </div>
            <span className="text-sm font-bold text-white">مدرسة الرياض الابتدائية</span>
            <div className="h-px w-8 opacity-30" style={{ background: "#C9A84C" }} />
          </div>
          <p className="text-xs" style={{ color: "rgba(201,168,76,0.4)" }} data-testid="text-footer-copyright">© 1447 جميع الحقوق محفوظة</p>
          <p className="text-[10px] mt-1" style={{ color: "rgba(201,168,76,0.25)" }} data-testid="text-footer-developer">تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
