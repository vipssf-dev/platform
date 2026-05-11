import { motion } from "framer-motion";
import { ArrowRight, Home, ChevronLeft, LucideIcon } from "lucide-react";
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

export function HubLayout({ title, subtitle, description, icon: Icon, breadcrumbs, backHref, backLabel, children }: HubLayoutProps) {
  return (
    <div className="min-h-screen font-sans bg-islamic-pattern-subtle" dir="rtl"
      style={{ background: "#FDFBF5" }}>

      {/* Header */}
      <header className="sticky top-0 z-50"
        style={{
          background: "linear-gradient(135deg, #0B5E3A 0%, #0D7A4E 60%, #083D27 100%)",
          borderBottom: "1px solid rgba(201,168,76,0.3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)"
        }}>

        {/* Top gold line */}
        <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #F0D87A, #C9A84C, transparent)" }} />

        {/* Islamic pattern overlay in header */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

        <div className="relative container mx-auto px-3 sm:px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Gold-bordered icon */}
            <div className="p-2 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.4)",
              }}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#F0D87A" }} />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-white" data-testid="text-hub-title">{title}</h1>
              <p className="text-[10px] sm:text-xs" style={{ color: "rgba(201,168,76,0.65)" }}>{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/">
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.12)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                data-testid="button-home">
                <Home className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </button>
            </Link>
            <Link href={backHref}>
              <button className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #A0762A)",
                  color: "#0B3D24",
                  boxShadow: "0 2px 10px rgba(201,168,76,0.3)",
                }}
                data-testid="button-back">
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline">{backLabel}</span>
                <span className="sm:hidden">رجوع</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" }} />
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-3 sm:px-4 pt-3 sm:pt-4">
        <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs overflow-x-auto pb-1" data-testid="nav-breadcrumbs">
          <Link href="/" className="flex items-center gap-1 flex-shrink-0 transition-colors font-medium hover:opacity-70"
            style={{ color: "#0B5E3A" }}>
            <Home className="w-3 h-3" />
            <span>الرئيسية</span>
          </Link>
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
              <ChevronLeft className="w-3 h-3" style={{ color: "#C9A84C" }} />
              {item.href ? (
                <Link href={item.href} className="hover:opacity-70 transition-colors" style={{ color: "#0B5E3A" }}>{item.label}</Link>
              ) : (
                <span className="font-bold" style={{ color: "#0B5E3A" }}>{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Main */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#0B3D24" }}
            data-testid="text-hub-heading">{description}</h2>
          {/* Gold arabesque divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 opacity-40" style={{ background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <polygon points="12,0 15,4.5 24,6 15,7.5 12,12 9,7.5 0,6 9,4.5" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.7" />
            </svg>
            <div className="h-px w-12 opacity-40" style={{ background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
        </motion.div>

        {children}
      </main>

      {/* Footer */}
      <footer className="py-5 mt-8"
        style={{
          background: "linear-gradient(135deg, #0B5E3A, #083D27)",
          borderTop: "1px solid rgba(201,168,76,0.2)"
        }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
            <span className="text-sm font-bold text-white">مدرسة الرياض الابتدائية</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A84C" }} />
          </div>
          <p className="text-xs" style={{ color: "rgba(201,168,76,0.5)" }}>© 1447 جميع الحقوق محفوظة</p>
          <p className="text-[10px] mt-1" style={{ color: "rgba(201,168,76,0.3)" }}>تصميم وتطوير: صالح سفر الغامدي</p>
        </div>
      </footer>
    </div>
  );
}
