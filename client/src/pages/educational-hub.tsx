import { motion } from "framer-motion";
import { 
  ClipboardCheck,
  FolderOpen,
  School,
  Award,
  Dumbbell,
  Gem,
  ScrollText,
  BrainCircuit,
  TrendingUp
} from "lucide-react";
import { SystemCard } from "@/components/system-card";
import { HubLayout } from "@/components/hub-layout";

const educationalSystems = [
  {
    title: "أعمال الاختبارات",
    description: "تسليم الأسئلة ومتابعة أعمال الاختبارات وتحليل النتائج.",
    icon: ClipboardCheck,
    href: "/exams",
    color: "bg-indigo-500",
    isInternal: true
  },
  {
    title: "متابعة الأعمال الفنية",
    description: "الجداول والملفات والسجلات والأعمال التحريرية.",
    icon: FolderOpen,
    href: "/technical",
    color: "bg-orange-500",
    isInternal: true
  },
  {
    title: "اختبار الرخصة المهنية المحاكي",
    description: "نظام محاكاة اختبار الرخصة المهنية للمعلمين والتدريب عليه.",
    icon: Award,
    href: "https://license.riyadhplatform.tech",
    color: "bg-purple-500"
  },
  {
    title: "تدريبات نافس",
    description: "منصة التدريبات والتمارين التنافسية لتطوير مهارات الطلاب.",
    icon: Dumbbell,
    href: "https://nafs.riyadhplatform.tech",
    color: "bg-sky-500"
  },
  {
    title: "رياض بيرلز",
    description: "منصة رياض بيرلز للمحتوى التعليمي والموارد الرقمية.",
    icon: Gem,
    href: "https://prils.riyadhplatform.tech",
    color: "bg-rose-500"
  },
  {
    title: "الأدلة واللوائح للتعليم العام 2026",
    description: "مرجع شامل لأدلة ولوائح التعليم العام لعام 2026.",
    icon: ScrollText,
    href: "https://regulations.riyadhplatform.tech",
    color: "bg-teal-500"
  },
  {
    title: "بنك الأسئلة الذكي",
    description: "منصة ذكية لإنشاء وإدارة بنك أسئلة متكامل للاختبارات والتقييمات.",
    icon: BrainCircuit,
    href: "https://quizflow.riyadhplatform.tech",
    color: "bg-emerald-500"
  },
  {
    title: "بوابة تحليل نتائج اختبارات نهاية الفصل الدراسي الثاني",
    description: "تحليل شامل لنتائج اختبارات نهاية الفصل الدراسي الثاني ومؤشرات الأداء.",
    icon: TrendingUp,
    href: "https://analyze.riyadhplatform.tech",
    color: "bg-cyan-500"
  }
];

export default function EducationalHub() {
  return (
    <HubLayout
      title="الشؤون التعليمية"
      subtitle="مدرسة الرياض الابتدائية"
      description="أنظمة الشؤون التعليمية"
      icon={School}
      iconColor="bg-gradient-to-br from-indigo-500 to-purple-600"
      breadcrumbs={[{ label: "الشؤون التعليمية" }]}
      backHref="/dashboard"
      backLabel="العودة للرئيسية"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 max-w-3xl mx-auto">
        {educationalSystems.map((system, index) => (
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
