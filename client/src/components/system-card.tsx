import { motion } from "framer-motion";
import { LucideIcon, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SystemCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export function SystemCard({ title, description, icon: Icon, href, color }: SystemCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        <Card className="h-full border-transparent shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white/80 backdrop-blur-sm hover:bg-white">
          <div className={`h-2 w-full ${color}`} />
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-lg ${color.replace('bg-', 'bg-opacity-10 bg-')} text-${color.replace('bg-', '')}`}>
                <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
              </div>
              <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <CardTitle className="mt-4 text-xl font-bold text-slate-800">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-slate-600 leading-relaxed">
              {description}
            </CardDescription>
            <div className="mt-6">
              <span className={`text-sm font-medium ${color.replace('bg-', 'text-')} flex items-center gap-2`}>
                الدخول للنظام 
                <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}
