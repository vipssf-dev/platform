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
import heroBg from "@assets/generated_images/soft_childhood_education_background_with_books_and_crayons.png";
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
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg">
              <School className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-slate-900">مدرسة الرياض الابتدائية</h1>
              <p className="text-xs sm:text-sm text-slate-500">العام الدراسي 1447هـ</p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 items-center">
             <div className="hidden sm:flex gap-1 bg-slate-100 p-1 rounded-lg ml-2">
               <button 
                 onClick={() => setShowKPI(!showKPI)}
                 className={`p-2 rounded-md transition-colors ${showKPI ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 title="مؤشرات الإنجاز"
               >
                 <BarChart3 className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => setViewMode('grid')}
                 className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 title="عرض شبكي"
               >
                 <LayoutGrid className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}
                 title="عرض قائمة"
               >
                 <List className="w-5 h-5" />
               </button>
             </div>
             
             <button 
               onClick={handleLogout}
               className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
             >
               <LogOut className="w-4 h-4" />
               <span className="hidden sm:inline">تسجيل خروج</span>
             </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[220px] sm:h-[280px] md:h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 to-blue-900/65" />
        <div className="relative container mx-auto px-4 h-full flex justify-between items-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-start"
          >
            <div className="mb-4 sm:mb-6 md:mb-8 bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 md:p-5 shadow-lg inline-block">
              <School className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">منصة الرياض الإلكترونية</h2>
            <p className="text-sm sm:text-base md:text-xl text-blue-100 max-w-2xl leading-relaxed">
              منصة موحدة لجميع الأنظمة الإدارية والتعليمية لتسهيل العمل ورفع الكفاءة.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block ml-8"
          >
            <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 flex items-center justify-center overflow-hidden">
                <img 
                    src={accreditationLogo} 
                    alt="شعار الاعتماد" 
                    className="w-full h-full object-cover"
                />
            </div>
          </motion.div>
        </div>
      </div>

      {/* KPI Dashboard */}
      {showKPI && (
        <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 -mt-8 sm:-mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6"
          >
            <KPIDashboard />
          </motion.div>
        </section>
      )}

      {/* Systems Grid */}
      <main className={`container mx-auto px-3 sm:px-4 py-6 sm:py-8 ${!showKPI ? '-mt-8 sm:-mt-16' : ''} relative z-10`}>
        <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
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
      <footer className="bg-white border-t border-slate-200 py-4 sm:py-8 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p className="text-sm sm:text-base">© 1447 مدرسة الرياض الابتدائية - جميع الحقوق محفوظة</p>
          <p className="text-xs sm:text-sm mt-2 text-slate-400">تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
