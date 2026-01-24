import { motion } from "framer-motion";
import { 
  Calculator,
  ClipboardList,
  BookOpen,
  Building2,
  ArrowRight,
  School
} from "lucide-react";
import { Link } from "wouter";
import { SystemCard } from "@/components/system-card";

const schoolAffairsSystems = [
  {
    title: "النظام المالي",
    description: "إدارة العمليات المالية والميزانية المدرسية بكفاءة عالية.",
    icon: Calculator,
    href: "https://financial.riyadhplatform.tech",
    color: "bg-emerald-500"
  },
  {
    title: "متابعة المهام - المساعدين الإداريين",
    description: "نظام تنظيم ومتابعة المهام اليومية للطاقم الإداري.",
    icon: ClipboardList,
    href: "https://tasks.riyadhplatform.tech",
    color: "bg-blue-500"
  },
  {
    title: "مركز مصادر التعلم",
    description: "عرض خطط وبرامج مركز مصادر التعلم والأنشطة التعليمية.",
    icon: BookOpen,
    href: "https://learning.riyadhplatform.tech",
    color: "bg-cyan-500"
  },
  {
    title: "المبنى المدرسي",
    description: "متابعة أعمال صيانة المبنى المدرسي.",
    icon: Building2,
    href: "https://maintenance.riyadhplatform.tech",
    color: "bg-stone-500"
  }
];

export default function SchoolAffairsHub() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <School className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">الشؤون المدرسية</h1>
              <p className="text-sm text-slate-500">مدرسة الرياض الابتدائية</p>
            </div>
          </div>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-2">أنظمة الشؤون المدرسية</h2>
          <p className="text-slate-600">إدارة الشؤون المالية والإدارية ومصادر التعلم والمبنى</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolAffairsSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SystemCard {...system} mode="grid" />
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            تطوير وتصميم: <span className="text-white font-medium">صالح سفر الغامدي</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
