import { motion } from "framer-motion";
import { LucideIcon, ExternalLink, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

interface SystemCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  mode?: 'grid' | 'list';
  isInternal?: boolean;
}

const colorMap: Record<string, { icon: string; glow: string; accent: string }> = {
  'bg-emerald-500': { icon: '#0B5E3A', glow: 'rgba(11,94,58,0.15)', accent: '#0D7A4E' },
  'bg-indigo-500': { icon: '#312e81', glow: 'rgba(49,46,129,0.15)', accent: '#4338ca' },
  'bg-amber-500': { icon: '#92400e', glow: 'rgba(146,64,14,0.15)', accent: '#d97706' },
  'bg-yellow-500': { icon: '#78350f', glow: 'rgba(120,53,15,0.12)', accent: '#ca8a04' },
  'bg-blue-500': { icon: '#1e3a8a', glow: 'rgba(30,58,138,0.15)', accent: '#2563eb' },
  'bg-cyan-500': { icon: '#164e63', glow: 'rgba(22,78,99,0.15)', accent: '#0891b2' },
  'bg-stone-500': { icon: '#44403c', glow: 'rgba(68,64,60,0.15)', accent: '#78716c' },
  'bg-teal-500': { icon: '#134e4a', glow: 'rgba(19,78,74,0.15)', accent: '#0d9488' },
  'bg-pink-500': { icon: '#831843', glow: 'rgba(131,24,67,0.15)', accent: '#ec4899' },
  'bg-red-500': { icon: '#7f1d1d', glow: 'rgba(127,29,29,0.15)', accent: '#ef4444' },
  'bg-purple-500': { icon: '#4c1d95', glow: 'rgba(76,29,149,0.15)', accent: '#9333ea' },
  'bg-rose-500': { icon: '#881337', glow: 'rgba(136,19,55,0.15)', accent: '#f43f5e' },
  'bg-violet-500': { icon: '#4c1d95', glow: 'rgba(76,29,149,0.15)', accent: '#8b5cf6' },
  'bg-sky-500': { icon: '#0c4a6e', glow: 'rgba(12,74,110,0.15)', accent: '#0ea5e9' },
  'bg-orange-500': { icon: '#7c2d12', glow: 'rgba(124,45,18,0.15)', accent: '#f97316' },
};

function getColors(color: string) {
  return colorMap[color] || colorMap['bg-emerald-500'];
}

export function SystemCard({ title, description, icon: Icon, href, color, mode = 'grid', isInternal = false }: SystemCardProps) {
  const colors = getColors(color);

  const cardContent = (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white transition-all duration-300 group
        ${mode === 'list' ? '' : 'h-full'}`}
      style={{
        border: "1px solid rgba(201,168,76,0.18)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${colors.glow}, 0 0 0 1px rgba(201,168,76,0.3), 0 2px 12px rgba(0,0,0,0.08)`;
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.18)";
      }}
      data-testid={`card-system-${title}`}
    >
      {/* Top gold accent line */}
      <div className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${colors.accent}, #C9A84C)` }} />

      {/* Subtle Islamic pattern watermark */}
      <div className="absolute inset-0 bg-islamic-pattern-subtle opacity-50 pointer-events-none" />

      {mode === 'list' ? (
        <div className="relative flex items-center p-4 gap-4">
          <div className="p-3 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${colors.glow}`, border: `1px solid ${colors.glow}` }}>
            <Icon className="w-6 h-6" style={{ color: colors.icon }} />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-base font-bold truncate" style={{ color: "#1A2B1F" }}>{title}</h3>
            <p className="text-sm text-slate-500 truncate mt-0.5">{description}</p>
          </div>
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-0 group-hover:-translate-x-1">
            {isInternal
              ? <ChevronLeft className="w-5 h-5" style={{ color: "#C9A84C" }} />
              : <ExternalLink className="w-5 h-5" style={{ color: "#C9A84C" }} />}
          </div>
        </div>
      ) : (
        <div className="relative p-5 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${colors.glow}, rgba(201,168,76,0.08))`,
                border: `1px solid rgba(201,168,76,0.15)`,
              }}>
              <Icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: colors.icon }} />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
              {isInternal
                ? <ChevronLeft className="w-5 h-5" style={{ color: "#C9A84C" }} />
                : <ExternalLink className="w-4 h-4" style={{ color: "#C9A84C" }} />}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "#1A2B1F" }}>{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">{description}</p>

          {/* Gold CTA */}
          <div className="flex items-center gap-1.5 text-sm font-bold transition-all duration-300"
            style={{ color: "#C9A84C" }}>
            <span>{isInternal ? 'عرض الأنظمة' : 'الدخول للنظام'}</span>
            <span className="group-hover:-translate-x-1.5 transition-transform duration-300 inline-block">←</span>
          </div>
        </div>
      )}
    </div>
  );

  if (isInternal) {
    return (
      <motion.div whileHover={{ y: mode === 'grid' ? -4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
        <Link href={href} className={`block ${mode === 'grid' ? 'h-full' : 'w-full'}`}>
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: mode === 'grid' ? -4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
      <a href={href} target="_blank" rel="noopener noreferrer" className={`block ${mode === 'grid' ? 'h-full' : 'w-full'}`}>
        {cardContent}
      </a>
    </motion.div>
  );
}
