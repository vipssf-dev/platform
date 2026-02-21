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

const colorMap: Record<string, { bg: string; text: string; light: string; border: string; shadow: string }> = {
  'bg-emerald-500': { bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', shadow: 'shadow-emerald-500/10' },
  'bg-indigo-500': { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200', shadow: 'shadow-indigo-500/10' },
  'bg-amber-500': { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200', shadow: 'shadow-amber-500/10' },
  'bg-yellow-500': { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-200', shadow: 'shadow-yellow-500/10' },
  'bg-blue-500': { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-blue-500/10' },
  'bg-cyan-500': { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-50', border: 'border-cyan-200', shadow: 'shadow-cyan-500/10' },
  'bg-stone-500': { bg: 'bg-stone-500', text: 'text-stone-600', light: 'bg-stone-50', border: 'border-stone-200', shadow: 'shadow-stone-500/10' },
  'bg-teal-500': { bg: 'bg-teal-500', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200', shadow: 'shadow-teal-500/10' },
  'bg-pink-500': { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50', border: 'border-pink-200', shadow: 'shadow-pink-500/10' },
  'bg-red-500': { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200', shadow: 'shadow-red-500/10' },
  'bg-purple-500': { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200', shadow: 'shadow-purple-500/10' },
  'bg-rose-500': { bg: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-200', shadow: 'shadow-rose-500/10' },
  'bg-violet-500': { bg: 'bg-violet-500', text: 'text-violet-600', light: 'bg-violet-50', border: 'border-violet-200', shadow: 'shadow-violet-500/10' },
  'bg-sky-500': { bg: 'bg-sky-500', text: 'text-sky-600', light: 'bg-sky-50', border: 'border-sky-200', shadow: 'shadow-sky-500/10' },
  'bg-orange-500': { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200', shadow: 'shadow-orange-500/10' },
};

function getColors(color: string) {
  return colorMap[color] || { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200', shadow: 'shadow-blue-500/10' };
}

export function SystemCard({ title, description, icon: Icon, href, color, mode = 'grid', isInternal = false }: SystemCardProps) {
  const colors = getColors(color);
  
  const cardContent = (
    <div className={`relative overflow-hidden rounded-xl border bg-white transition-all duration-300 group
      ${mode === 'list' ? 'hover:shadow-lg' : 'h-full hover:shadow-xl'} 
      hover:${colors.border} ${colors.shadow}`}
      data-testid={`card-system-${title}`}
    >
      {mode === 'grid' && (
        <div className={`h-1.5 w-full ${colors.bg}`} />
      )}
      
      {mode === 'list' ? (
        <div className="flex items-center p-4 gap-4">
          <div className={`p-3 rounded-xl flex-shrink-0 ${colors.light}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-0.5 truncate">{title}</h3>
            <p className="text-sm text-slate-500 truncate">{description}</p>
          </div>
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[-4px]">
            {isInternal ? <ChevronLeft className="w-5 h-5 text-slate-400" /> : <ExternalLink className="w-5 h-5 text-slate-400" />}
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${colors.light} transition-transform duration-300 group-hover:scale-110`}>
              <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.text}`} />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
              {isInternal ? <ChevronLeft className="w-5 h-5 text-slate-400" /> : <ExternalLink className="w-5 h-5 text-slate-400" />}
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">{description}</p>
          <div className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.text}`}>
            <span>{isInternal ? 'عرض الأنظمة' : 'الدخول للنظام'}</span>
            <span className="group-hover:translate-x-[-4px] transition-transform duration-300">←</span>
          </div>
        </div>
      )}
    </div>
  );

  if (isInternal) {
    return (
      <motion.div
        whileHover={{ y: mode === 'grid' ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Link href={href} className={`block ${mode === 'grid' ? 'h-full' : 'w-full'}`}>
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: mode === 'grid' ? -4 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className={`block ${mode === 'grid' ? 'h-full' : 'w-full'}`}>
        {cardContent}
      </a>
    </motion.div>
  );
}
