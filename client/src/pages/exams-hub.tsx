import { motion } from "framer-motion";
import { 
  FileQuestion, 
  ClipboardCheck,
  BarChart3,
  School
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { HubLayout } from "@/components/hub-layout";

const examSystems = [
  {
    title: "تسليم أسئلة الاختبارات",
    description: "سجل متابعة تسليم واستلام أسئلة اختبارات نهاية الفصل.",
    icon: FileQuestion,
    href: "https://exams-qs.riyadhplatform.tech",
    color: "bg-purple-500"
  },
  {
    title: "متابعة أعمال اختبارات نهاية الفصل الدراسي",
    description: "نظام متابعة سير أعمال الاختبارات النهائية ورصد الإنجاز.",
    icon: ClipboardCheck,
    href: "https://exam-followup.riyadhplatform.tech",
    color: "bg-indigo-500"
  },
  {
    title: "تحليل نتائج الاختبارات",
    description: "تحليل شامل لنتائج اختبارات الطلاب ومؤشرات الأداء.",
    icon: BarChart3,
    href: "https://exam-analysis.riyadhplatform.tech",
    color: "bg-rose-500"
  }
];

export default function ExamsHub() {
  return (
    <HubLayout
      title="أعمال الاختبارات"
      subtitle="مدرسة الرياض الابتدائية"
      description="أنظمة الاختبارات"
      icon={School}
      iconColor="bg-gradient-to-br from-purple-500 to-indigo-600"
      breadcrumbs={[
        { label: "الشؤون التعليمية", href: "/educational" },
        { label: "أعمال الاختبارات" }
      ]}
      backHref="/educational"
      backLabel="العودة للشؤون التعليمية"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {examSystems.map((system, index) => (
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
