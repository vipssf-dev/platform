import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Calculator, 
  ClipboardList, 
  FileQuestion, 
  PenTool, 
  FolderOpen,
  School,
  LayoutDashboard,
  LayoutGrid,
  List,
  BarChart3,
  LogOut,
  Trophy,
  Bus,
  ClipboardCheck
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import heroBg from "@assets/generated_images/soft_childhood_education_background_with_books_and_crayons.png";
import schoolLogo from "@assets/شعار_الرياض_مفرغ_1766472209642.png";

const systems = [
  {
    title: "النظام المالي",
    description: "إدارة العمليات المالية والميزانية المدرسية بكفاءة عالية.",
    icon: Calculator,
    href: "https://financial-system.replit.app",
    color: "bg-emerald-500"
  },
  {
    title: "متابعة المهام - المساعدين الإداريين",
    description: "نظام تنظيم ومتابعة المهام اليومية للطاقم الإداري.",
    icon: ClipboardList,
    href: "https://data-mover--vipssf.replit.app",
    color: "bg-blue-500"
  },
  {
    title: "تسليم أسئلة الاختبارات",
    description: "سجل متابعة تسليم واستلام أسئلة اختبارات نهاية الفصل.",
    icon: FileQuestion,
    href: "https://data-transfer--vipssf.replit.app",
    color: "bg-purple-500"
  },
  {
    title: "متابعة أعمال اختبارات نهاية الفصل الدراسي",
    description: "نظام متابعة سير أعمال الاختبارات النهائية ورصد الإنجاز.",
    icon: ClipboardCheck,
    href: "https://exam-followup.replit.app/",
    color: "bg-indigo-500"
  },
  {
    title: "متابعة الأعمال التحريرية",
    description: "رصد ومتابعة الأعمال التحريرية للفصل الدراسي الأول.",
    icon: PenTool,
    href: "https://mtbaa-laaml-lt-hryry-lf-sl-lwl-1447--vipssf.replit.app",
    color: "bg-orange-500"
  },
  {
    title: "متابعة ملفات الإنجاز (OneDrive)",
    description: "بوابة متابعة ملفات الإنجاز الرقمية للمعلمين والطلاب.",
    icon: FolderOpen,
    href: "https://Portfolio-followup.replit.app",
    color: "bg-sky-500"
  },
  {
    title: "تحليل نتائج اختبارات",
    description: "تحليل شامل لنتائج اختبارات الطلاب ومؤشرات الأداء.",
    icon: BarChart3,
    href: "https://Exam-Analysis-Riyadh.replit.app",
    color: "bg-rose-500"
  },
  {
    title: "النشاط الطلابي لمتابعة أنشطة المدرسة",
    description: "منصة شاملة لمتابعة وتنظيم الفعاليات والأنشطة الطلابية المدرسية.",
    icon: Trophy,
    href: "https://student-actives.replit.app/",
    color: "bg-yellow-500"
  },
  {
    title: "مخالفات الحافلات المدرسية",
    description: "رصد مخالفات الطلاب في الحافلة المدرسية لضمان سلامتهم وانضباطهم.",
    icon: Bus,
    href: "https://bus-violations.replit.app",
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
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
        </div>
      </footer>
    </div>
  );
}
