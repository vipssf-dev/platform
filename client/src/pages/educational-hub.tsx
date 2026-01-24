import { motion } from "framer-motion";
import { 
  ClipboardCheck,
  FolderOpen,
  ArrowRight,
  School
} from "lucide-react";
import { Link } from "wouter";
import { SystemCard } from "@/components/system-card";

const educationalSystems = [
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
  }
];

export default function EducationalHub() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <School className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">الشؤون التعليمية</h1>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">أنظمة الشؤون التعليمية</h2>
          <p className="text-slate-600">أعمال الاختبارات والأعمال الفنية</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {educationalSystems.map((system, index) => (
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
