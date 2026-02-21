import { motion } from "framer-motion";
import { 
  Calculator,
  ClipboardList,
  BookOpen,
  Building2,
  School
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { HubLayout } from "@/components/hub-layout";

const schoolAffairsSystems = [
  {
    title: "النظام المالي",
    description: "إدارة العمليات المالية والميزانية المدرسية بكفاءة عالية.",
    icon: Calculator,
    href: "https://financial.riyadhplatform.tech",
    color: "bg-emerald-500"
  },
  {
    title: "متابعة المهام - المساعدين الإداريين",
    description: "نظام تنظيم ومتابعة المهام اليومية للطاقم الإداري.",
    icon: ClipboardList,
    href: "https://tasks.riyadhplatform.tech",
    color: "bg-blue-500"
  },
  {
    title: "مركز مصادر التعلم",
    description: "عرض خطط وبرامج مركز مصادر التعلم والأنشطة التعليمية.",
    icon: BookOpen,
    href: "https://learning.riyadhplatform.tech",
    color: "bg-cyan-500"
  },
  {
    title: "المبنى المدرسي",
    description: "متابعة أعمال صيانة المبنى المدرسي.",
    icon: Building2,
    href: "https://maintenance.riyadhplatform.tech",
    color: "bg-stone-500"
  }
];

export default function SchoolAffairsHub() {
  return (
    <HubLayout
      title="الشؤون المدرسية"
      subtitle="مدرسة الرياض الابتدائية"
      description="أنظمة الشؤون المدرسية"
      icon={School}
      iconColor="bg-gradient-to-br from-emerald-500 to-green-600"
      breadcrumbs={[{ label: "الشؤون المدرسية" }]}
      backHref="/dashboard"
      backLabel="العودة للرئيسية"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {schoolAffairsSystems.map((system, index) => (
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
