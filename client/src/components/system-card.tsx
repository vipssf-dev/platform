import { motion } from "framer-motion";
import { LucideIcon, ExternalLink, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export function SystemCard({ title, description, icon: Icon, href, color, mode = 'grid', isInternal = false }: SystemCardProps) {
  const cardContent = (
    <Card className={`${mode === 'list' ? 'border-transparent shadow-sm hover:shadow-md' : 'h-full border-transparent shadow-md hover:shadow-xl'} transition-all duration-300 overflow-hidden group bg-white/80 backdrop-blur-sm hover:bg-white`}>
      {mode === 'grid' && <div className={`h-2 w-full ${color}`} />}
      {mode === 'list' ? (
        <>
          <div className="flex items-center p-4 gap-4">
            <div className={`p-3 rounded-lg flex-shrink-0 ${color.replace('bg-', 'bg-opacity-10 bg-')} text-${color.replace('bg-', '')}`}>
              <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-grow min-w-0">
              <CardTitle className="text-lg font-bold text-slate-800 mb-1 truncate">{title}</CardTitle>
              <CardDescription className="text-sm text-slate-600 truncate">
                {description}
              </CardDescription>
            </div>
            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {isInternal ? <ChevronLeft className="w-5 h-5 text-muted-foreground" /> : <ExternalLink className="w-5 h-5 text-muted-foreground" />}
            </div>
          </div>
          <div className={`h-1 w-full ${color}`} />
        </>
      ) : (
        <>
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex justify-between items-start">
              <div className={`p-2 sm:p-3 rounded-lg ${color.replace('bg-', 'bg-opacity-10 bg-')} text-${color.replace('bg-', '')}`}>
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${color.replace('bg-', 'text-')}`} />
              </div>
              {isInternal ? <ChevronLeft className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" /> : <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
            <CardTitle className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-slate-800">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {description}
            </CardDescription>
            <div className="mt-4 sm:mt-6">
              <span className={`text-xs sm:text-sm font-medium ${color.replace('bg-', 'text-')} flex items-center gap-2`}>
                {isInternal ? 'عرض الأنظمة' : 'الدخول للنظام'}
                <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
              </span>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );

  if (isInternal) {
    return (
      <motion.div
        whileHover={{ y: mode === 'grid' ? -5 : 0, x: mode === 'list' ? -5 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link href={href} className={`block ${mode === 'grid' ? 'h-full' : 'w-full'}`}>
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: mode === 'grid' ? -5 : 0, x: mode === 'list' ? -5 : 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className={`block ${mode === 'grid' ? 'h-full' : 'w-full'}`}>
        {cardContent}
      </a>
    </motion.div>
  );
}
