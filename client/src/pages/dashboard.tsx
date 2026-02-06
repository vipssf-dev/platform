import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  School,
  LayoutGrid,
  List,
  LogOut,
  ClipboardCheck,
  HeartHandshake,
  BarChart3
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
    description: "النشاط والتوجيه والإشراف الصحي والحافلات.",
    icon: HeartHandshake,
    href: "/students",
    color: "bg-yellow-500",
    isInternal: true
  }
];

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showKPI, setShowKPI] = useState(true);
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg">
              <School className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-slate-900">مدرسة الرياض الابتدائية</h1>
              <p className="text-[10px] sm:text-xs text-slate-500">العام الدراسي 1447هـ</p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 items-center">
             <div className="hidden sm:flex gap-1 bg-slate-100 p-1 rounded-lg ml-2">
               <button 
                 onClick={() => setShowKPI(!showKPI)}
                 className={`p-1.5 sm:p-2 rounded-md transition-colors ${showKPI ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 title="مؤشرات الإنجاز"
                 data-testid="button-toggle-kpi"
               >
                 <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
               <button 
                 onClick={() => setViewMode('grid')}
                 className={`p-1.5 sm:p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 title="عرض شبكي"
                 data-testid="button-view-grid"
               >
                 <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={`p-1.5 sm:p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 title="عرض قائمة"
                 data-testid="button-view-list"
               >
                 <List className="w-4 h-4 sm:w-5 sm:h-5" />
               </button>
             </div>
             
             <button 
               onClick={handleLogout}
               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
               data-testid="button-logout"
             >
               <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">تسجيل خروج</span>
             </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <div className="relative w-full overflow-hidden bg-[#070b14]">
        <div className="relative w-full h-[200px] sm:h-[260px] md:h-[320px]">
          <img 
            src={platformBanner} 
            alt="منصة الرياض الإلكترونية" 
            className="absolute inset-0 w-full h-full object-cover object-center"
            data-testid="img-platform-banner"
          />
          
          {/* Platform title - centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <h2 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-1 sm:mb-2"
                style={{ 
                  textShadow: '0 0 60px rgba(59,130,246,0.5), 0 0 120px rgba(59,130,246,0.3), 0 2px 4px rgba(0,0,0,0.5)',
                  fontFamily: 'Cairo, sans-serif'
                }}
                data-testid="text-platform-title"
              >
                منصة الرياض الإلكترونية
              </h2>
              <p 
                className="text-lg sm:text-xl md:text-2xl font-bold text-blue-300/80 tracking-widest mb-3 sm:mb-4"
                style={{ 
                  textShadow: '0 0 30px rgba(59,130,246,0.4), 0 1px 3px rgba(0,0,0,0.4)',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.15em'
                }}
                data-testid="text-platform-subtitle"
              >
                RiyadhPlatform
              </p>
              <div className="w-32 sm:w-44 md:w-56 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent mb-3 sm:mb-4" />
              <p 
                className="text-[11px] sm:text-sm md:text-base text-blue-200/60 font-medium max-w-xl"
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

          {/* Accreditation seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 flex items-center justify-center overflow-hidden">
              <img 
                src={accreditationLogo} 
                alt="شعار الاعتماد" 
                className="w-full h-full object-cover"
                data-testid="img-accreditation"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* KPI Dashboard */}
      {showKPI && (
        <section className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 -mt-4 sm:-mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-3 sm:p-5 mb-4 sm:mb-6"
          >
            <KPIDashboard />
          </motion.div>
        </section>
      )}

      {/* Systems Grid */}
      <main className={`container mx-auto px-2 sm:px-4 py-4 sm:py-6 ${!showKPI ? '-mt-4 sm:-mt-8' : ''} relative z-10`}>
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 sm:py-6 mt-6 sm:mt-10">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p className="text-xs sm:text-sm">© 1447 مدرسة الرياض الابتدائية - جميع الحقوق محفوظة</p>
          <p className="text-[10px] sm:text-xs mt-1.5 text-slate-400">تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
