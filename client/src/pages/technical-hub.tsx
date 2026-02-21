import { motion } from "framer-motion";
import { 
  Calendar,
  FolderOpen,
  FileText,
  PenTool,
  UserCheck,
  School
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { HubLayout } from "@/components/hub-layout";

const technicalSystems = [
  {
    title: "الجداول المدرسية",
    description: "استعراض جداول المعلمين والفصول الدراسية.",
    icon: Calendar,
    href: "https://school-timetables.riyadhplatform.tech",
    color: "bg-violet-500"
  },
  {
    title: "متابعة ملفات الإنجاز (OneDrive)",
    description: "بوابة متابعة ملفات الإنجاز الرقمية للمعلمين والطلاب.",
    icon: FolderOpen,
    href: "https://portfolio.riyadhplatform.tech",
    color: "bg-sky-500"
  },
  {
    title: "سجلات المتابعة",
    description: "نظام متابعة سجلات متابعة الطلاب.",
    icon: FileText,
    href: "https://records.riyadhplatform.tech",
    color: "bg-amber-500"
  },
  {
    title: "متابعة الأعمال التحريرية",
    description: "رصد ومتابعة الأعمال التحريرية للفصل الدراسي الأول.",
    icon: PenTool,
    href: "https://supervision.riyadhplatform.tech",
    color: "bg-orange-500"
  },
  {
    title: "الزيارات الفنية",
    description: "متابعة الزيارات الفنية للمعلمين.",
    icon: UserCheck,
    href: "https://supervision-visit.riyadhplatform.tech",
    color: "bg-teal-500"
  }
];

export default function TechnicalHub() {
  return (
    <HubLayout
      title="متابعة الأعمال الفنية"
      subtitle="مدرسة الرياض الابتدائية"
      description="أنظمة متابعة الأعمال الفنية"
      icon={School}
      iconColor="bg-gradient-to-br from-orange-500 to-amber-600"
      breadcrumbs={[
        { label: "الشؤون التعليمية", href: "/educational" },
        { label: "الأعمال الفنية" }
      ]}
      backHref="/educational"
      backLabel="العودة للشؤون التعليمية"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {technicalSystems.map((system, index) => (
          <motion.div
            key={system.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <SystemCard {...system} mode="grid" />
          </motion.div>
        ))}
      </div>
    </HubLayout>
  );
}
