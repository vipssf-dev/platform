import { motion } from "framer-motion";
import { 
  Calculator, 
  ClipboardList, 
  FileQuestion, 
  PenTool, 
  FolderOpen,
  School,
  LayoutDashboard,
  Bell,
  BarChart3
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import heroBg from "@assets/generated_images/modern_abstract_school_administration_background_with_soft_blue_geometry.png";
import schoolLogo from "@assets/GQkIaRAWgAAQDHL_1765454447820.jpg";

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
    title: "متابعة الأعمال التحريرية",
    description: "رصد ومتابعة الأعمال التحريرية للفصل الدراسي الأول.",
    icon: PenTool,
    href: "https://mtbaa-laaml-lt-hryry-lf-sl-lwl-1447--vipssf.replit.app",
    color: "bg-orange-500"
  },
  {
    title: "ملفات الإنجاز (OneDrive)",
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
  }
];

export default function Dashboard() {
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
          <div className="flex gap-4">
             <button className="p-2 text-slate-500 hover:text-primary transition-colors">
               <Bell className="w-6 h-6" />
             </button>
             <button className="p-2 text-slate-500 hover:text-primary transition-colors">
               <LayoutDashboard className="w-6 h-6" />
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-blue-900/80" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1 shadow-lg overflow-hidden">
              <img 
                src={schoolLogo} 
                alt="شعار مدرسة الرياض" 
                className="w-full h-full object-cover"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <SystemCard {...system} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 1447 مدرسة الرياض الابتدائية - جميع الحقوق محفوظة</p>
          <p className="text-sm mt-2">تم التطوير بواسطة وحدة تقنية المعلومات</p>
        </div>
      </footer>
    </div>
  );
}
