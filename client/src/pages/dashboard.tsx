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
  FileQuestion,
  FolderOpen,
  Calendar,
  FileText,
  PenTool,
  UserCheck,
  ChevronLeft,
  ExternalLink,
  Menu,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { KPIDashboard } from "@/components/kpi-dashboard";
import platformBanner from "@assets/riyadh_platform_banner_new.png";
import accreditationLogo from "@assets/تنزيل_1766861652266.jpg";

const systems = [
  {
    title: "الشؤون المدرسية",
    description: "النظام المالي والمهام ومصادر التعلم والمبنى المدرسي.",
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
    description: "النشاط والتوجيه والإشراف الصحي والحافلات وصعوبات التعلم.",
    icon: HeartHandshake,
    href: "/students",
    color: "bg-amber-500",
    isInternal: true
  }
];

const allSubSystems = [
  { title: "النظام المالي", icon: Calculator, href: "https://financial.riyadhplatform.tech", category: "الشؤون المدرسية" },
  { title: "متابعة المهام", icon: ClipboardList, href: "https://tasks.riyadhplatform.tech", category: "الشؤون المدرسية" },
  { title: "مصادر التعلم", icon: BookOpen, href: "https://learning.riyadhplatform.tech", category: "الشؤون المدرسية" },
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
  { title: "النشاط الطلابي", icon: Trophy, href: "https://activities.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "التوجيه الطلابي", icon: HeartHandshake, href: "https://counselor.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "الإشراف الصحي", icon: Stethoscope, href: "https://health.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "مخالفات الحافلات", icon: Bus, href: "https://bus.riyadhplatform.tech", category: "شؤون الطلاب" },
  { title: "صعوبات التعلم", icon: Brain, href: "https://special-edu.riyadhplatform.tech", category: "شؤون الطلاب" },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "مساء الخير";
  return "مساء النور";
}

function getHijriDate(): string {
  try {
    return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  } catch {
    return "";
  }
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
    return allSubSystems.filter(s => 
      s.title.includes(searchQuery) || s.category.includes(searchQuery)
    );
  }, [searchQuery]);

  const greeting = useMemo(() => getGreeting(), []);
  const hijriDate = useMemo(() => getHijriDate(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans" dir="rtl">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 sm:p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <School className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-slate-900" data-testid="text-school-name">مدرسة الرياض الابتدائية</h1>
              <p className="text-[10px] sm:text-xs text-slate-500" data-testid="text-school-year">العام الدراسي 1447هـ</p>
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 items-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors sm:hidden"
              data-testid="button-search-mobile"
            >
              <Search className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex relative">
              <div className="relative">
                <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="بحث في الأنظمة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 h-9 pr-9 pl-3 text-sm bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white transition-all"
                  data-testid="input-search-desktop"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute top-1/2 left-2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {searchQuery && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50"
                  >
                    {searchResults.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                        data-testid={`link-search-result-${i}`}
                      >
                        <item.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.category}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-300 mr-auto flex-shrink-0" />
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setShowKPI(!showKPI)}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${showKPI ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                title="مؤشرات الإنجاز"
                data-testid="button-toggle-kpi"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                title="عرض شبكي"
                data-testid="button-view-grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                title="عرض قائمة"
                data-testid="button-view-list"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              data-testid="button-mobile-menu"
            >
              <Menu className="w-4 h-4" />
            </button>
             
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden border-t border-slate-200 bg-white overflow-hidden"
            >
              <div className="p-3 space-y-2">
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                  <button onClick={() => { setShowKPI(!showKPI); setMobileMenuOpen(false); }} className={`p-2 rounded-md transition-colors text-xs flex items-center gap-1.5 ${showKPI ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
                    <BarChart3 className="w-3.5 h-3.5" /> المؤشرات
                  </button>
                  <button onClick={() => { setViewMode('grid'); setMobileMenuOpen(false); }} className={`p-2 rounded-md transition-colors text-xs flex items-center gap-1.5 ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
                    <LayoutGrid className="w-3.5 h-3.5" /> شبكي
                  </button>
                  <button onClick={() => { setViewMode('list'); setMobileMenuOpen(false); }} className={`p-2 rounded-md transition-colors text-xs flex items-center gap-1.5 ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
                    <List className="w-3.5 h-3.5" /> قائمة
                  </button>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors">
                  <LogOut className="w-4 h-4" /> تسجيل خروج
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden border-t border-slate-200 bg-white overflow-hidden"
            >
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="بحث في الأنظمة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full h-10 pr-9 pl-9 text-sm bg-slate-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    data-testid="input-search-mobile"
                  />
                  <button onClick={() => { setSearchQuery(""); setShowSearch(false); }} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {searchQuery && searchResults.length > 0 && (
                  <div className="mt-2 bg-white rounded-lg border border-slate-200 overflow-hidden">
                    {searchResults.map((item, i) => (
                      <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 border-b border-slate-100 last:border-0">
                        <item.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm text-slate-800 truncate">{item.title}</span>
                        <ExternalLink className="w-3 h-3 text-slate-300 mr-auto flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="relative w-full overflow-hidden bg-[#070b14]">
        <div className="relative w-full h-[180px] sm:h-[240px] md:h-[300px]">
          <img 
            src={platformBanner} 
            alt="منصة الرياض الإلكترونية" 
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            data-testid="img-platform-banner"
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-2"
                style={{ 
                  textShadow: '0 0 60px rgba(59,130,246,0.5), 0 0 120px rgba(59,130,246,0.3), 0 2px 4px rgba(0,0,0,0.5)',
                  fontFamily: 'Cairo, sans-serif'
                }}
                data-testid="text-platform-title"
              >
                منصة الرياض الإلكترونية
              </h2>
              <p 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-wider mb-2 sm:mb-3"
                style={{ 
                  textShadow: '0 0 50px rgba(59,130,246,0.6), 0 0 100px rgba(59,130,246,0.4), 0 2px 4px rgba(0,0,0,0.5)',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.12em',
                  color: '#93c5fd',
                }}
                data-testid="text-platform-subtitle"
              >
                RiyadhPlatform
              </p>
              <div className="w-28 sm:w-40 md:w-52 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent mb-2 sm:mb-3" />
              <p 
                className="text-[10px] sm:text-sm md:text-base text-blue-200/60 font-medium max-w-xl"
                style={{ 
                  textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  fontFamily: 'Cairo, sans-serif'
                }}
                data-testid="text-platform-description"
              >
                منصة موحدة لجميع الأنظمة الإدارية والتعليمية لمتابعة الأداء ورفع الكفاءة
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6"
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-18 md:h-18 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 flex items-center justify-center overflow-hidden">
              <img 
                src={accreditationLogo} 
                alt="شعار الاعتماد" 
                className="w-full h-full object-cover"
                loading="lazy"
                data-testid="img-accreditation"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 -mt-4 sm:-mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-slate-200/60 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-50">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800" data-testid="text-greeting">{greeting}، مدير النظام</p>
              <p className="text-[10px] sm:text-xs text-slate-400" data-testid="text-date">{hijriDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>20 تطبيق متاح</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            <span>3 أقسام رئيسية</span>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showKPI && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container mx-auto px-3 sm:px-4 py-4 sm:py-5 relative z-10 overflow-hidden"
          >
            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-3 sm:p-5">
              <KPIDashboard />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <main className={`container mx-auto px-3 sm:px-4 py-4 sm:py-6 relative z-10`}>
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1" data-testid="text-sections-title">الأقسام الرئيسية</h3>
          <p className="text-xs sm:text-sm text-slate-500">اختر القسم للوصول إلى الأنظمة الفرعية</p>
        </div>
        <div className={`grid gap-3 sm:gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SystemCard {...system} mode={viewMode} />
            </motion.div>
          ))}
        </div>
      </main>

      <section className="container mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 p-4 sm:p-6">
          <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-3" data-testid="text-quick-access-title">الوصول السريع لجميع الأنظمة</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {allSubSystems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 p-2.5 sm:p-3 bg-white rounded-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-md transition-all group"
                data-testid={`link-quick-${i}`}
              >
                <item.icon className="w-4 h-4 text-blue-500 flex-shrink-0 group-hover:text-blue-600" />
                <span className="text-[11px] sm:text-xs font-medium text-slate-700 truncate group-hover:text-slate-900">{item.title}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200/60 py-5 sm:py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-lg">
              <School className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-700">مدرسة الرياض الابتدائية</span>
          </div>
          <p className="text-xs text-slate-500" data-testid="text-footer-copyright">© 1447 جميع الحقوق محفوظة</p>
          <p className="text-[10px] mt-1.5 text-slate-400" data-testid="text-footer-developer">تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
