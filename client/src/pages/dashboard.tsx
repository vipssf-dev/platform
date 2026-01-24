import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  FolderOpen,
  School,
  LayoutGrid,
  List,
  LogOut,
  Trophy,
  Bus,
  ClipboardCheck,
  HeartHandshake,
  Stethoscope
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import heroBg from "@assets/generated_images/soft_childhood_education_background_with_books_and_crayons.png";
import schoolLogo from "@assets/شعار_الرياض_مفرغ_1766472209642.png";
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
    title: "أعمال الاختبارات",
    description: "تسليم الأسئلة ومتابعة أعمال الاختبارات وتحليل النتائج.",
    icon: ClipboardCheck,
    href: "/exams",
    color: "bg-indigo-500",
    isInternal: true
  },
  {
    title: "متابعة الأعمال الفنية",
    description: "الجداول والملفات والسجلات والأعمال التحريرية.",
    icon: FolderOpen,
    href: "/technical",
    color: "bg-orange-500",
    isInternal: true
  },
  {
    title: "النشاط الطلابي",
    description: "منصة شاملة لمتابعة وتنظيم الفعاليات والأنشطة الطلابية المدرسية.",
    icon: Trophy,
    href: "https://activities.riyadhplatform.tech",
    color: "bg-yellow-500"
  },
  {
    title: "التوجيه الطلابي",
    description: "نظام متابعة خطة التوجيه الطلابي والأعمال المتعلقة بالموجه الطلابي.",
    icon: HeartHandshake,
    href: "https://counselor.riyadhplatform.tech",
    color: "bg-teal-500"
  },
  {
    title: "الإشراف الصحي",
    description: "متابعة أعمال وخطط المشرف الصحي والبرامج الصحية المدرسية.",
    icon: Stethoscope,
    href: "https://health.riyadhplatform.tech",
    color: "bg-pink-500"
  },
  {
    title: "مخالفات الحافلات المدرسية",
    description: "رصد مخالفات الطلاب في الحافلة المدرسية لضمان سلامتهم وانضباطهم.",
    icon: Bus,
    href: "https://bus.riyadhplatform.tech",
    color: "bg-red-500"
  }
];

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setLocation("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <School className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">مدرسة الرياض الابتدائية</h1>
              <p className="text-sm text-slate-500">العام الدراسي 1447هـ</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
             <div className="flex gap-1 bg-slate-100 p-1 rounded-lg ml-2">
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
               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
             >
               <LogOut className="w-4 h-4" />
               <span className="hidden md:inline">تسجيل خروج</span>
             </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
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
            <div className="mb-8 w-auto h-24 md:h-32 bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg inline-block">
              <img 
                src={schoolLogo} 
                alt="شعار الهيئة الملكية للجبيل وينبع" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">منصة الرياض الإلكترونية</h2>
            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
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

      {/* Systems Grid */}
      <main className="container mx-auto px-4 py-12 -mt-16 relative z-10">
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
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
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 1447 مدرسة الرياض الابتدائية - جميع الحقوق محفوظة</p>
          <p className="text-sm mt-2 text-slate-400">تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
