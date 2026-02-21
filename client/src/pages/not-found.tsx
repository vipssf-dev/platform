import { motion } from "framer-motion";
import { Home, School } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 font-sans px-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-8xl sm:text-9xl font-black text-slate-200 mb-4" data-testid="text-404">404</div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2" data-testid="text-not-found-title">الصفحة غير موجودة</h1>
        <p className="text-sm text-slate-500 mb-8">عذراً، الصفحة التي تبحث عنها غير متاحة</p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-l from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all" data-testid="button-go-home">
            <Home className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </button>
        </Link>
      </motion.div>
      
      <div className="mt-12 text-center text-sm text-slate-400">
        <div className="flex items-center justify-center gap-2 mb-1">
          <School className="w-4 h-4" />
          <span>مدرسة الرياض الابتدائية</span>
        </div>
        <p className="text-xs">تصميم وتطوير: صالح سفر الغامدي</p>
      </div>
    </div>
  );
}
