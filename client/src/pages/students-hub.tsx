import { motion } from "framer-motion";
import { 
  Trophy,
  HeartHandshake,
  Stethoscope,
  Bus,
  ArrowRight,
  School
} from "lucide-react";
import { Link } from "wouter";
import { SystemCard } from "@/components/system-card";

const studentsSystems = [
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

export default function StudentsHub() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <School className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">شؤون الطلاب</h1>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">أنظمة شؤون الطلاب</h2>
          <p className="text-slate-600">النشاط والتوجيه والإشراف الصحي والحافلات</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentsSystems.map((system, index) => (
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
