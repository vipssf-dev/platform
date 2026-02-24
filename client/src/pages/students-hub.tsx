import { motion } from "framer-motion";
import { 
  Trophy,
  HeartHandshake,
  Stethoscope,
  Bus,
  School,
  Brain
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { HubLayout } from "@/components/hub-layout";

const studentsSystems = [
  {
    title: "النشاط الطلابي",
    description: "منصة شاملة لمتابعة وتنظيم الفعاليات والأنشطة الطلابية المدرسية.",
    icon: Trophy,
    href: "https://activities.riyadhplatform.tech",
    color: "bg-amber-500"
  },
  {
    title: "التوجيه الطلابي",
    description: "نظام متابعة خطة التوجيه الطلابي والأعمال المتعلقة بالموجه الطلابي.",
    icon: HeartHandshake,
    href: "https://counselor.riyadhplatform.tech",
    color: "bg-teal-500"
  },
  {
    title: "الإشراف الصحي",
    description: "متابعة أعمال وخطط المشرف الصحي والبرامج الصحية المدرسية.",
    icon: Stethoscope,
    href: "https://health.riyadhplatform.tech",
    color: "bg-pink-500"
  },
  {
    title: "مخالفات الحافلات المدرسية",
    description: "رصد مخالفات الطلاب في الحافلة المدرسية لضمان سلامتهم وانضباطهم.",
    icon: Bus,
    href: "https://bus.riyadhplatform.tech",
    color: "bg-red-500"
  },
  {
    title: "صعوبات التعلم",
    description: "متابعة برامج وخطط صعوبات التعلم والتربية الخاصة للطلاب.",
    icon: Brain,
    href: "https://special-edu.riyadhplatform.tech",
    color: "bg-violet-500"
  }
];

export default function StudentsHub() {
  return (
    <HubLayout
      title="شؤون الطلاب"
      subtitle="مدرسة الرياض الابتدائية"
      description="أنظمة شؤون الطلاب"
      icon={School}
      iconColor="bg-gradient-to-br from-amber-500 to-orange-600"
      breadcrumbs={[{ label: "شؤون الطلاب" }]}
      backHref="/dashboard"
      backLabel="العودة للرئيسية"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {studentsSystems.map((system, index) => (
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
