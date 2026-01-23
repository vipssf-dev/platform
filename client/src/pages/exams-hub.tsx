import { motion } from "framer-motion";
import { 
  FileQuestion, 
  ClipboardCheck,
  BarChart3,
  ArrowRight,
  School
} from "lucide-react";
import { Link } from "wouter";
import { SystemCard } from "@/components/system-card";

const examSystems = [
  {
    title: "تسليم أسئلة الاختبارات",
    description: "سجل متابعة تسليم واستلام أسئلة اختبارات نهاية الفصل.",
    icon: FileQuestion,
    href: "https://exams-qs.riyadhplatform.tech",
    color: "bg-purple-500"
  },
  {
    title: "متابعة أعمال اختبارات نهاية الفصل الدراسي",
    description: "نظام متابعة سير أعمال الاختبارات النهائية ورصد الإنجاز.",
    icon: ClipboardCheck,
    href: "https://exam-followup.riyadhplatform.tech",
    color: "bg-indigo-500"
  },
  {
    title: "تحليل نتائج الاختبارات",
    description: "تحليل شامل لنتائج اختبارات الطلاب ومؤشرات الأداء.",
    icon: BarChart3,
    href: "https://exam-analysis.riyadhplatform.tech",
    color: "bg-rose-500"
  }
];

export default function ExamsHub() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <School className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">أعمال الاختبارات</h1>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">أنظمة الاختبارات</h2>
          <p className="text-slate-600">إدارة ومتابعة جميع أعمال الاختبارات</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examSystems.map((system, index) => (
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
