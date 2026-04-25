import PptxGenJS from "pptxgenjs";
import { fileURLToPath } from "url";
import path from "path";
import { mkdirSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../client/public");
mkdirSync(outDir, { recursive: true });

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 inches (widescreen)
pptx.rtlMode = true;

// ─── Shared helpers ────────────────────────────────────────────────────────
const FONT = "Arial";          // Cairo isn't embedded; Arial is the safest RTL-capable font
const BG_DARK   = "0F172A";
const BG_BLUE   = "1E3A8A";
const BG_GREEN  = "064E3B";
const BG_VIOLET = "2E1065";
const BG_AMBER  = "78350F";
const BG_CYAN   = "0E7490";
const BG_RED    = "7F1D1D";
const BG_FINAL  = "1E3A8A";

const ACCENT_BLUE   = "60A5FA";
const ACCENT_GREEN  = "34D399";
const ACCENT_VIOLET = "C4B5FD";
const ACCENT_AMBER  = "FCD34D";
const ACCENT_CYAN   = "67E8F9";
const ACCENT_RED    = "F87171";
const WHITE         = "FFFFFF";
const GRAY          = "94A3B8";
const LIGHT_GRAY    = "CBD5E1";

function slide(bg) {
  const s = pptx.addSlide();
  s.background = { fill: bg };
  return s;
}

function addLabel(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? 0.4, y: opts.y ?? 0.25,
    w: opts.w ?? 12.5, h: opts.h ?? 0.45,
    fontSize: opts.size ?? 12,
    color: opts.color ?? GRAY,
    bold: opts.bold ?? false,
    align: "center",
    fontFace: FONT,
    rtlMode: true,
  });
}

function addTitle(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? 0.4, y: opts.y ?? 0.9,
    w: opts.w ?? 12.5, h: opts.h ?? 1.0,
    fontSize: opts.size ?? 36,
    color: opts.color ?? WHITE,
    bold: true,
    align: "center",
    fontFace: FONT,
    rtlMode: true,
  });
}

function addBody(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? 1.0, y: opts.y ?? 2.0,
    w: opts.w ?? 11.3, h: opts.h ?? 0.5,
    fontSize: opts.size ?? 14,
    color: opts.color ?? LIGHT_GRAY,
    align: "center",
    fontFace: FONT,
    rtlMode: true,
  });
}

function roundedBox(s, opts = {}) {
  s.addShape(pptx.ShapeType.roundRect, {
    x: opts.x, y: opts.y, w: opts.w, h: opts.h,
    fill: { color: opts.fill ?? "1E293B" },
    line: { color: opts.line ?? "334155", width: 1 },
    rectRadius: opts.radius ?? 0.12,
  });
}

function boxWithText(s, bx, by, bw, bh, icon, title, subtitle, accentColor) {
  roundedBox(s, { x: bx, y: by, w: bw, h: bh, fill: "1E293B", line: accentColor ?? "334155", radius: 0.12 });
  s.addText(icon, { x: bx, y: by + 0.18, w: bw, h: 0.5, fontSize: 22, align: "center", fontFace: FONT });
  s.addText(title, { x: bx + 0.1, y: by + 0.72, w: bw - 0.2, h: 0.4, fontSize: 12, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
  if (subtitle) {
    s.addText(subtitle, { x: bx + 0.05, y: by + 1.12, w: bw - 0.1, h: 0.3, fontSize: 9, color: GRAY, align: "center", fontFace: FONT, rtlMode: true });
  }
}

function stat(s, bx, by, num, label, color) {
  roundedBox(s, { x: bx, y: by, w: 3.4, h: 1.5, fill: "1E293B80", line: "334155", radius: 0.15 });
  s.addText(num,   { x: bx, y: by + 0.15, w: 3.4, h: 0.8, fontSize: 40, color: color ?? ACCENT_BLUE, bold: true, align: "center", fontFace: FONT });
  s.addText(label, { x: bx, y: by + 0.95, w: 3.4, h: 0.4, fontSize: 12, color: GRAY, align: "center", fontFace: FONT, rtlMode: true });
}

function tag(s, text, x, y, fill, lineColor) {
  s.addShape(pptx.ShapeType.roundRect, { x, y, w: 2.5, h: 0.4, fill: { color: fill ?? "1E3A8A" }, line: { color: lineColor ?? ACCENT_BLUE, width: 1 }, rectRadius: 0.2 });
  s.addText(text, { x, y: y + 0.04, w: 2.5, h: 0.33, fontSize: 11, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
}

function compareItem(s, text, x, y, good) {
  const icon = good ? "✓" : "✗";
  const col  = good ? ACCENT_GREEN : ACCENT_RED;
  s.addText(icon + "  " + text, {
    x, y, w: 5.0, h: 0.35,
    fontSize: 11, color: LIGHT_GRAY, align: "right",
    fontFace: FONT, rtlMode: true,
    bullet: false,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_BLUE);

  // Gradient overlay shape
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 7.5, fill: { type: "solid", color: "0F172A", alpha: 30 } });

  addLabel(s, "🏫  مدرسة الرياض الابتدائية — العام الدراسي 1447هـ", { y: 0.6, size: 13, color: "93C5FD" });

  s.addText("منصة الرياض الإلكترونية", {
    x: 0.5, y: 1.3, w: 12.3, h: 1.6,
    fontSize: 52, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true,
  });

  addBody(s, "بوابة موحدة لجميع الأنظمة الإدارية والتعليمية", { y: 3.0, size: 18, color: "93C5FD" });

  // Divider line
  s.addShape(pptx.ShapeType.rect, { x: 5.5, y: 3.6, w: 2.3, h: 0.05, fill: { color: ACCENT_BLUE } });

  stat(s, 1.0, 4.2, "21", "تطبيق إلكتروني", ACCENT_BLUE);
  stat(s, 5.0, 4.2, "3",  "أقسام رئيسية",   ACCENT_GREEN);
  stat(s, 9.0, 4.2, "∞",  "وصول 24/7",       ACCENT_VIOLET);

  tag(s, "✅  متصل بالإنترنت", 2.0, 6.2, "064E3B", ACCENT_GREEN);
  tag(s, "🔒  آمن ومحمي",     5.1, 6.2, "1E3A8A", ACCENT_BLUE);
  tag(s, "📊  بيانات فورية",  8.2, 6.2, "2E1065", ACCENT_VIOLET);

  s.addText("منصة الرياض الإلكترونية — riyadhplatform.tech", {
    x: 0, y: 7.2, w: 13.33, h: 0.28, fontSize: 9, color: "374151", align: "center", fontFace: FONT,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 2 — OVERVIEW
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_DARK);

  addLabel(s, "نظرة عامة", { y: 0.3, size: 13, color: GRAY });
  addTitle(s, "هيكل منصة الرياض الإلكترونية", { y: 0.65, size: 32 });
  addBody(s, "منصة موحدة تجمع جميع الأنظمة تحت سقف رقمي واحد مع لوحة مؤشرات مباشرة لمتابعة الإنجاز", { y: 1.7, size: 13, color: GRAY });

  // Hub shape
  roundedBox(s, { x: 5.2, y: 2.4, w: 2.9, h: 1.0, fill: "1E40AF", line: ACCENT_BLUE, radius: 0.15 });
  s.addText("🌐  لوحة المؤشرات\nالرئيسية", { x: 5.2, y: 2.45, w: 2.9, h: 0.9, fontSize: 13, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });

  // Three hub boxes
  const hubs = [
    { x: 0.4,  y: 3.8, fill: "064E3B", line: ACCENT_GREEN,  icon: "🏫", t: "الشؤون المدرسية",  sub: "3 تطبيقات" },
    { x: 5.2,  y: 3.8, fill: "2E1065", line: ACCENT_VIOLET, icon: "📚", t: "الشؤون التعليمية", sub: "11 تطبيقاً" },
    { x: 9.9,  y: 3.8, fill: "78350F", line: ACCENT_AMBER,  icon: "🎓", t: "شؤون الطلاب",      sub: "6 تطبيقات" },
  ];
  hubs.forEach(h => {
    roundedBox(s, { x: h.x, y: h.y, w: 3.1, h: 1.5, fill: h.fill, line: h.line, radius: 0.15 });
    s.addText(h.icon, { x: h.x, y: h.y + 0.1, w: 3.1, h: 0.55, fontSize: 26, align: "center", fontFace: FONT });
    s.addText(h.t,   { x: h.x + 0.1, y: h.y + 0.65, w: 2.9, h: 0.45, fontSize: 14, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
    s.addText(h.sub, { x: h.x + 0.1, y: h.y + 1.1,  w: 2.9, h: 0.3,  fontSize: 11, color: GRAY, align: "center", fontFace: FONT, rtlMode: true });
  });

  // Connecting lines
  s.addShape(pptx.ShapeType.line, { x: 1.95, y: 3.4, w: 0, h: 0.4, line: { color: ACCENT_GREEN,  width: 1.5, dashType: "dash" } });
  s.addShape(pptx.ShapeType.line, { x: 6.65, y: 3.4, w: 0, h: 0.4, line: { color: ACCENT_VIOLET, width: 1.5, dashType: "dash" } });
  s.addShape(pptx.ShapeType.line, { x: 11.45,y: 3.4, w: 0, h: 0.4, line: { color: ACCENT_AMBER,  width: 1.5, dashType: "dash" } });

  roundedBox(s, { x: 0.4, y: 5.6, w: 12.5, h: 0.65, fill: "1E3A8A30", line: "1E3A8A", radius: 0.1 });
  s.addText("🔗  جميع التطبيقات مترابطة عبر نطاق  riyadhplatform.tech  وتُعرض في لوحة مؤشرات مباشرة", {
    x: 0.5, y: 5.68, w: 12.3, h: 0.5, fontSize: 12, color: "93C5FD", align: "center", fontFace: FONT, rtlMode: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 3 — SCHOOL AFFAIRS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_GREEN);

  addLabel(s, "القسم الأول", { y: 0.3, size: 13, color: ACCENT_GREEN });
  addTitle(s, "الشؤون المدرسية", { y: 0.65, size: 36, color: ACCENT_GREEN });
  addBody(s, "تغطي الجانب الإداري والمالي والبنية التحتية للمدرسة", { y: 1.6, size: 14 });

  const apps = [
    { icon: "💰", t: "النظام المالي",           sub: "إدارة الإيرادات والمصروفات", url: "financial.riyadhplatform.tech" },
    { icon: "📋", t: "متابعة المهام الإدارية",  sub: "تتبع مهام المساعدين",       url: "tasks.riyadhplatform.tech" },
    { icon: "🏗️", t: "المبنى المدرسي",          sub: "متابعة الصيانة والمرافق",    url: "maintenance.riyadhplatform.tech" },
  ];
  apps.forEach((a, i) => {
    const bx = 0.8 + i * 4.1;
    roundedBox(s, { x: bx, y: 2.4, w: 3.6, h: 2.8, fill: "0D3B2E", line: ACCENT_GREEN, radius: 0.15 });
    s.addText(a.icon, { x: bx, y: 2.55, w: 3.6, h: 0.7, fontSize: 30, align: "center", fontFace: FONT });
    s.addText(a.t,    { x: bx + 0.1, y: 3.28, w: 3.4, h: 0.55, fontSize: 15, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
    s.addText(a.sub,  { x: bx + 0.1, y: 3.85, w: 3.4, h: 0.4,  fontSize: 11, color: ACCENT_GREEN, align: "center", fontFace: FONT, rtlMode: true });
    s.addText(a.url,  { x: bx + 0.1, y: 4.28, w: 3.4, h: 0.3,  fontSize: 9,  color: "475569", align: "center", fontFace: "Courier New" });
  });

  tag(s, "✅  رصيد مالي فوري",   1.5, 5.55, "064E3B", ACCENT_GREEN);
  tag(s, "✅  متابعة 63+ مهمة",  5.4, 5.55, "064E3B", ACCENT_GREEN);
  tag(s, "✅  جدولة الصيانة",    9.3, 5.55, "064E3B", ACCENT_GREEN);
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 4 — EDUCATIONAL AFFAIRS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_VIOLET);

  addLabel(s, "القسم الثاني", { y: 0.3, size: 13, color: ACCENT_VIOLET });
  addTitle(s, "الشؤون التعليمية", { y: 0.65, size: 36, color: ACCENT_VIOLET });
  addBody(s, "11 تطبيقاً تُغطي دورة الاختبارات والأعمال الفنية والتطوير المهني", { y: 1.6, size: 14 });

  const eduApps = [
    { icon: "📝", t: "تسليم الأسئلة" },
    { icon: "🔍", t: "متابعة الاختبارات" },
    { icon: "📊", t: "تحليل النتائج" },
    { icon: "🗓️", t: "الجداول المدرسية" },
    { icon: "📁", t: "ملفات الإنجاز" },
    { icon: "📒", t: "سجلات المتابعة" },
    { icon: "✍️", t: "الأعمال التحريرية" },
    { icon: "🔬", t: "الزيارات الفنية" },
    { icon: "🏆", t: "الرخصة المهنية" },
    { icon: "💪", t: "تدريبات نافس" },
    { icon: "💎", t: "رياض بيرلز" },
  ];

  const cols = 4, cardW = 2.9, cardH = 1.4, gapX = 0.3, gapY = 0.25;
  const startX = (13.33 - (cols * cardW + (cols - 1) * gapX)) / 2;

  eduApps.forEach((a, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const bx = startX + col * (cardW + gapX);
    const by = 2.3 + row * (cardH + gapY);
    roundedBox(s, { x: bx, y: by, w: cardW, h: cardH, fill: "1A0A40", line: ACCENT_VIOLET, radius: 0.12 });
    s.addText(a.icon, { x: bx, y: by + 0.1,  w: cardW, h: 0.5,  fontSize: 22, align: "center", fontFace: FONT });
    s.addText(a.t,    { x: bx + 0.1, y: by + 0.65, w: cardW - 0.2, h: 0.6, fontSize: 11, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 5 — STUDENT AFFAIRS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_AMBER);

  addLabel(s, "القسم الثالث", { y: 0.3, size: 13, color: ACCENT_AMBER });
  addTitle(s, "شؤون الطلاب", { y: 0.65, size: 36, color: ACCENT_AMBER });
  addBody(s, "6 تطبيقات تشمل جميع جوانب رعاية الطالب داخل المدرسة", { y: 1.6, size: 14 });

  const stuApps = [
    { icon: "🏅", t: "النشاط الطلابي",     url: "activities" },
    { icon: "🤝", t: "التوجيه الطلابي",    url: "counselor" },
    { icon: "🏥", t: "الإشراف الصحي",      url: "health" },
    { icon: "🚌", t: "مخالفات الحافلات",   url: "bus" },
    { icon: "🧠", t: "صعوبات التعلم",       url: "special-edu" },
    { icon: "📚", t: "مركز مصادر التعلم",  url: "learning" },
  ];

  const cardW = 3.7, cardH = 1.8, gapX = 0.5;
  const startX = (13.33 - (3 * cardW + 2 * gapX)) / 2;

  stuApps.forEach((a, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const bx = startX + col * (cardW + gapX);
    const by = 2.2 + row * (cardH + 0.3);
    roundedBox(s, { x: bx, y: by, w: cardW, h: cardH, fill: "4A1A00", line: ACCENT_AMBER, radius: 0.15 });
    s.addText(a.icon, { x: bx, y: by + 0.15, w: cardW, h: 0.65, fontSize: 28, align: "center", fontFace: FONT });
    s.addText(a.t,    { x: bx + 0.1, y: by + 0.85, w: cardW - 0.2, h: 0.55, fontSize: 13, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
    s.addText(a.url + ".riyadhplatform.tech", { x: bx + 0.1, y: by + 1.42, w: cardW - 0.2, h: 0.25, fontSize: 8, color: "78716C", align: "center", fontFace: "Courier New" });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 6 — TIME SAVINGS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_CYAN);

  addLabel(s, "كفاءة الإنفاق", { y: 0.3, size: 13, color: ACCENT_CYAN });
  addTitle(s, "⏱️  توفير الوقت", { y: 0.65, size: 34 });
  addBody(s, "تحويل العمليات الورقية التقليدية إلى رقمية يُقلّص وقت الإنجاز بصورة جوهرية", { y: 1.6, size: 13, color: GRAY });

  // Before box
  roundedBox(s, { x: 0.4, y: 2.2, w: 5.4, h: 2.9, fill: "3B0A0A", line: ACCENT_RED, radius: 0.15 });
  s.addText("❌  قبل المنصة", { x: 0.5, y: 2.3, w: 5.2, h: 0.45, fontSize: 15, color: ACCENT_RED, bold: true, align: "center", fontFace: FONT, rtlMode: true });
  const befores = ["طباعة وتوزيع الأسئلة يدوياً (ساعات)", "تسجيل المهام في سجلات ورقية يومياً", "إعداد التقارير المالية يدوياً كل شهر", "متابعة المخالفات ورقياً", "انتظار الموافقات عبر البريد الداخلي"];
  befores.forEach((t, i) => {
    s.addText("✗  " + t, { x: 0.5, y: 2.85 + i * 0.43, w: 5.2, h: 0.38, fontSize: 11, color: LIGHT_GRAY, align: "right", fontFace: FONT, rtlMode: true });
  });

  // Arrow
  s.addText("⚡", { x: 5.9, y: 3.3, w: 1.5, h: 1.0, fontSize: 40, align: "center", fontFace: FONT });

  // After box
  roundedBox(s, { x: 7.5, y: 2.2, w: 5.4, h: 2.9, fill: "0A2E1A", line: ACCENT_GREEN, radius: 0.15 });
  s.addText("✅  مع المنصة", { x: 7.6, y: 2.3, w: 5.2, h: 0.45, fontSize: 15, color: ACCENT_GREEN, bold: true, align: "center", fontFace: FONT, rtlMode: true });
  const afters = ["تسليم الأسئلة إلكترونياً في دقائق", "تحديث المهام لحظياً من أي جهاز", "تقارير مالية تلقائية فورية", "رصد المخالفات وتحليلها آنياً", "موافقة ومتابعة رقمية فورية"];
  afters.forEach((t, i) => {
    s.addText("✓  " + t, { x: 7.6, y: 2.85 + i * 0.43, w: 5.2, h: 0.38, fontSize: 11, color: LIGHT_GRAY, align: "right", fontFace: FONT, rtlMode: true });
  });

  // Numbers
  const nums = [["75%", "تقليص وقت إعداد التقارير"], ["90%", "تسريع تسليم الأسئلة"], ["24/7", "وصول مستمر بلا توقف"]];
  nums.forEach(([v, l], i) => {
    const bx = 0.9 + i * 3.9;
    roundedBox(s, { x: bx, y: 5.35, w: 3.5, h: 1.0, fill: "1E293B", line: "334155", radius: 0.12 });
    s.addText(v, { x: bx, y: 5.4,  w: 3.5, h: 0.5, fontSize: 28, color: ACCENT_CYAN, bold: true, align: "center", fontFace: FONT });
    s.addText(l, { x: bx, y: 5.9,  w: 3.5, h: 0.35, fontSize: 11, color: GRAY, align: "center", fontFace: FONT, rtlMode: true });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 7 — EFFORT SAVINGS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_DARK);

  addLabel(s, "كفاءة الإنفاق", { y: 0.3, size: 13, color: GRAY });
  addTitle(s, "💪  توفير الجهد", { y: 0.65, size: 34 });
  addBody(s, "الاستغناء عن الأعمال الورقية المكررة وتوحيد البيانات في مكان واحد", { y: 1.6, size: 13, color: GRAY });

  const benefits = [
    { icon: "📊", t: "لوحة مؤشرات مركزية",    d: "عرض إحصاءات الأنظمة الـ21 في شاشة واحدة بدلاً من مراجعة كل نظام على حدة" },
    { icon: "🔍", t: "البحث الموحد الفوري",    d: "إيجاد أي تطبيق فورياً عبر شريط البحث بدلاً من التنقل بين عدة مواقع" },
    { icon: "📱", t: "وصول من أي جهاز",        d: "العمل من الجوال أو الحاسب أو اللوح في أي وقت دون الحاجة للتواجد في المدرسة" },
    { icon: "🔄", t: "تحديث البيانات تلقائياً", d: "البيانات تتحدث كل دقيقة دون تدخل بشري مما يُلغي الجهد اليدوي المتكرر" },
    { icon: "📋", t: "إلغاء ازدواجية العمل",   d: "بيانات الطلاب والمعلمين تُدار مرة واحدة وتظهر في جميع الأنظمة المترابطة" },
    { icon: "⚡", t: "اتخاذ قرار أسرع",        d: "المسؤول يرى نسبة الإنجاز والحالة الفورية لكل نظام دون انتظار التقارير" },
  ];

  const cardW = 5.9, cardH = 1.2, gapX = 0.5, gapY = 0.25;
  benefits.forEach((b, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const bx = 0.4 + col * (cardW + gapX);
    const by = 2.2 + row * (cardH + gapY);
    roundedBox(s, { x: bx, y: by, w: cardW, h: cardH, fill: "1E293B", line: "334155", radius: 0.12 });
    s.addText(b.icon, { x: bx + 0.15, y: by + 0.2, w: 0.8, h: 0.8, fontSize: 24, align: "center", fontFace: FONT });
    s.addText(b.t, { x: bx + 1.0, y: by + 0.1, w: cardW - 1.2, h: 0.45, fontSize: 13, color: WHITE, bold: true, align: "right", fontFace: FONT, rtlMode: true });
    s.addText(b.d, { x: bx + 1.0, y: by + 0.55, w: cardW - 1.2, h: 0.55, fontSize: 10, color: GRAY, align: "right", fontFace: FONT, rtlMode: true });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 8 — FINANCIAL SAVINGS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_RED);

  addLabel(s, "كفاءة الإنفاق", { y: 0.3, size: 13, color: ACCENT_RED });
  addTitle(s, "💰  توفير المال", { y: 0.65, size: 34 });
  addBody(s, "الرقمنة الشاملة تُخفّض التكاليف التشغيلية بشكل مباشر وغير مباشر", { y: 1.6, size: 13, color: GRAY });

  const costs = [
    { icon: "🖨️", pct: "-80%", lbl: "تكاليف الطباعة",  d: "الأسئلة والتقارير والنماذج أصبحت رقمية بالكامل" },
    { icon: "📦", pct: "-70%", lbl: "تكاليف الأرشفة", d: "لا حاجة لملفات ورقية أو خزائن للتخزين" },
    { icon: "🚗", pct: "-60%", lbl: "تكاليف التنقل",   d: "الاجتماعات والمراسلات رقمية عن بُعد" },
  ];

  costs.forEach((c, i) => {
    const bx = 0.5 + i * 4.25;
    roundedBox(s, { x: bx, y: 2.3, w: 3.8, h: 2.8, fill: "3B0A0A", line: ACCENT_RED, radius: 0.15 });
    s.addText(c.icon, { x: bx, y: 2.45, w: 3.8, h: 0.65, fontSize: 30, align: "center", fontFace: FONT });
    s.addText(c.pct,  { x: bx, y: 3.15, w: 3.8, h: 0.7,  fontSize: 36, color: ACCENT_RED, bold: true, align: "center", fontFace: FONT });
    s.addText(c.lbl,  { x: bx + 0.1, y: 3.88, w: 3.6, h: 0.4,  fontSize: 14, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
    s.addText(c.d,    { x: bx + 0.1, y: 4.3,  w: 3.6, h: 0.65, fontSize: 11, color: GRAY,  align: "center", fontFace: FONT, rtlMode: true });
  });

  roundedBox(s, { x: 0.5, y: 5.35, w: 12.3, h: 0.95, fill: "0A2E1A30", line: "22C55E", radius: 0.12 });
  s.addText("💡  أثر إضافي:", { x: 0.7, y: 5.43, w: 2.0, h: 0.38, fontSize: 12, color: ACCENT_GREEN, bold: true, align: "right", fontFace: FONT, rtlMode: true });
  s.addText("توفير ساعات عمل إضافية يُعادل تكلفة عمالة إضافية — المنصة تؤدي دور مساعد إداري رقمي متاح باستمرار", {
    x: 0.7, y: 5.82, w: 11.9, h: 0.4, fontSize: 12, color: LIGHT_GRAY, align: "center", fontFace: FONT, rtlMode: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 9 — REAL NUMBERS
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_GREEN);

  addLabel(s, "أرقام حقيقية من المنصة", { y: 0.3, size: 13, color: ACCENT_GREEN });
  addTitle(s, "📈  ما تحقق فعلياً", { y: 0.65, size: 34, color: ACCENT_GREEN });
  addBody(s, "بيانات مباشرة من أنظمة المنصة تعكس مستوى الإنجاز الفعلي", { y: 1.6, size: 13, color: GRAY });

  const realNums = [
    { v: "73%", l: "نسبة إنجاز المهام الإدارية\n(46 من 63 مهمة)" },
    { v: "83%", l: "نسبة إنجاز برامج مصادر التعلم\n(10 من 12 برنامجاً)" },
    { v: "80%", l: "نسبة إنجاز برامج التوجيه\n(8 من 10 برامج)" },
    { v: "79%", l: "نسبة إنجاز الأنشطة الطلابية\n(19 من 24 نشاطاً)" },
  ];
  realNums.forEach(({ v, l }, i) => {
    const bx = 0.35 + i * 3.2;
    roundedBox(s, { x: bx, y: 2.3, w: 2.9, h: 1.7, fill: "0D3B2E", line: ACCENT_GREEN, radius: 0.15 });
    s.addText(v, { x: bx, y: 2.4, w: 2.9, h: 0.7, fontSize: 34, color: ACCENT_GREEN, bold: true, align: "center", fontFace: FONT });
    s.addText(l, { x: bx + 0.1, y: 3.12, w: 2.7, h: 0.8, fontSize: 10, color: GRAY, align: "center", fontFace: FONT, rtlMode: true });
  });

  const tagData = ["📚  198 كتاب مسجل", "🤝  44 إعارة منفذة", "🏥  55 حالة صحية موثقة", "🚌  51 مخالفة مرصودة"];
  tagData.forEach((t, i) => {
    const bx = 0.35 + i * 3.2;
    roundedBox(s, { x: bx, y: 4.25, w: 2.9, h: 0.6, fill: "064E3B", line: ACCENT_GREEN, radius: 0.1 });
    s.addText(t, { x: bx, y: 4.3, w: 2.9, h: 0.5, fontSize: 11, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
  });

  // Donut-style decorative progress
  roundedBox(s, { x: 0.35, y: 5.1, w: 12.6, h: 0.85, fill: "0A2E1A", line: "064E3B", radius: 0.1 });
  s.addText("متوسط نسبة الإنجاز العامة عبر الأنظمة الـ21 تتجاوز  78%  — مؤشر كفاءة مرتفع يعكس التزام الفريق", {
    x: 0.5, y: 5.22, w: 12.3, h: 0.6, fontSize: 13, color: ACCENT_GREEN, bold: true, align: "center", fontFace: FONT, rtlMode: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 10 — CONCLUSION
// ═══════════════════════════════════════════════════════════════════════
{
  const s = slide(BG_FINAL);

  addLabel(s, "الخلاصة", { y: 0.3, size: 13, color: GRAY });

  s.addText("منصة الرياض.. ليست رفاهية", { x: 0.5, y: 0.85, w: 12.3, h: 0.9, fontSize: 38, color: WHITE, bold: true, align: "center", fontFace: FONT, rtlMode: true });
  s.addText("بل ضرورة إدارية", { x: 0.5, y: 1.65, w: 12.3, h: 0.9, fontSize: 38, color: ACCENT_BLUE, bold: true, align: "center", fontFace: FONT, rtlMode: true });

  s.addShape(pptx.ShapeType.rect, { x: 5.5, y: 2.65, w: 2.3, h: 0.06, fill: { color: ACCENT_BLUE } });

  const points = [
    { icon: "⏱️", t: "توفير الوقت — الإنجاز بدقائق بدلاً من ساعات" },
    { icon: "💪", t: "توفير الجهد — بيانات مركزية بلا ازدواجية أو تكرار" },
    { icon: "💰", t: "توفير المال — تقليص الطباعة والأرشفة والتنقل" },
    { icon: "📊", t: "قرارات أفضل — مؤشرات فورية تدعم صانع القرار" },
  ];
  points.forEach((p, i) => {
    const by = 2.95 + i * 0.85;
    roundedBox(s, { x: 1.5, y: by, w: 10.3, h: 0.7, fill: "1E293B", line: "334155", radius: 0.12 });
    s.addText(p.icon, { x: 1.6, y: by + 0.08, w: 0.6, h: 0.55, fontSize: 22, align: "center", fontFace: FONT });
    s.addText(p.t,    { x: 2.3, y: by + 0.12, w: 9.3, h: 0.5,  fontSize: 14, color: WHITE, align: "right", fontFace: FONT, rtlMode: true });
  });

  s.addText("تصميم وتطوير: صالح سفر الغامدي  |  منصة الرياض الإلكترونية 1447هـ", {
    x: 0.5, y: 7.05, w: 12.3, h: 0.35, fontSize: 10, color: "374151", align: "center", fontFace: FONT, rtlMode: true,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SAVE
// ═══════════════════════════════════════════════════════════════════════
const outPath = path.join(outDir, "riyadh-platform-presentation.pptx");
await pptx.writeFile({ fileName: outPath });
console.log("✅  PPTX saved to:", outPath);
