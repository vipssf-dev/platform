import { motion } from "framer-motion";
import { Home, School } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-sans px-4 relative overflow-hidden bg-islamic-pattern"
      dir="rtl"
      style={{ background: "linear-gradient(135deg, #062618 0%, #0B5E3A 45%, #083D27 100%)" }}
    >
      {/* Islamic geometric pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-100 pointer-events-none" />

      {/* Gold glow top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }} />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #F0D87A, #C9A84C, transparent)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        {/* Big 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-6"
        >
          <div
            className="text-[120px] sm:text-[160px] font-black leading-none select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "2px rgba(201,168,76,0.3)",
              textShadow: "0 0 80px rgba(201,168,76,0.15)"
            }}
            data-testid="text-404"
          >
            404
          </div>
          {/* Gold star overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-30">
              <polygon points="40,2 50,28 78,28 56,46 64,72 40,56 16,72 24,46 2,28 30,28"
                fill="none" stroke="#C9A84C" strokeWidth="1.5" />
              <polygon points="40,12 48,32 68,32 53,44 59,64 40,52 21,64 27,44 12,32 32,32"
                fill="none" stroke="#F0D87A" strokeWidth="0.8" />
              <circle cx="40" cy="40" r="8" fill="#C9A84C" opacity="0.6" />
            </svg>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-16 opacity-40" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
          <div className="h-px w-16 opacity-40" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
        </div>

        <h1
          className="text-xl sm:text-2xl font-black text-white mb-2"
          style={{ textShadow: "0 0 30px rgba(201,168,76,0.3)" }}
          data-testid="text-not-found-title"
        >
          الصفحة غير موجودة
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(201,168,76,0.55)" }}>
          عذراً، الصفحة التي تبحث عنها غير متاحة
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-base transition-all"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C)",
              color: "#0B3D24",
              boxShadow: "0 4px 24px rgba(201,168,76,0.35)"
            }}
            data-testid="button-go-home"
          >
            <Home className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 mt-14 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="p-1 rounded-lg" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)" }}>
            <School className="w-3.5 h-3.5" style={{ color: "#F0D87A" }} />
          </div>
          <span className="text-xs font-bold text-white">مدرسة الرياض الابتدائية</span>
        </div>
        <p className="text-[11px]" style={{ color: "rgba(201,168,76,0.3)" }}>تصميم وتطوير: صالح سفر الغامدي</p>
      </motion.div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
    </div>
  );
}
