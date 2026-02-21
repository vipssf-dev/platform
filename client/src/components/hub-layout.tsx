import { motion } from "framer-motion";
import { ArrowRight, School, Home, ChevronLeft, LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HubLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  breadcrumbs: BreadcrumbItem[];
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}

export function HubLayout({ title, subtitle, description, icon: Icon, iconColor, breadcrumbs, backHref, backLabel, children }: HubLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 font-sans" dir="rtl">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`p-1.5 sm:p-2 rounded-xl shadow-lg ${iconColor}`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-slate-900" data-testid="text-hub-title">{title}</h1>
              <p className="text-[10px] sm:text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors" data-testid="button-home">
                <Home className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </button>
            </Link>
            <Link href={backHref}>
              <button className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" data-testid="button-back">
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline">{backLabel}</span>
                <span className="sm:hidden">رجوع</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 overflow-x-auto pb-1" data-testid="nav-breadcrumbs">
          <Link href="/" className="hover:text-slate-600 transition-colors flex items-center gap-1 flex-shrink-0">
            <Home className="w-3 h-3" />
            <span>الرئيسية</span>
          </Link>
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
              <ChevronLeft className="w-3 h-3 text-slate-300" />
              {item.href ? (
                <Link href={item.href} className="hover:text-slate-600 transition-colors">{item.label}</Link>
              ) : (
                <span className="text-slate-600 font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5" data-testid="text-hub-heading">{description}</h2>
          <div className="w-16 h-1 bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full mx-auto" />
        </motion.div>

        {children}
      </main>

      <footer className="bg-white border-t border-slate-200/60 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-slate-500">© 1447 مدرسة الرياض الابتدائية - جميع الحقوق محفوظة</p>
          <p className="text-[10px] mt-1 text-slate-400">تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
