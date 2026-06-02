import { motion } from "motion/react";
import { Check, Sparkles, Zap, Layers, ArrowUpRight } from "lucide-react";
import { fonts, colorMap, gradients } from "../../lib/tokens";
import { SectionHeading } from "../shared/SectionHeading";
import { AnimatedSection } from "../shared/AnimatedSection";
import { staggerContainer, fadeUp } from "../../lib/motion";
import type { ColorKey } from "../../lib/tokens";

type Tier = {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  timeline: string;
  audience: string;
  includes: string[];
  excludes?: string[];
  cta: string;
  color: ColorKey;
  icon: React.ReactNode;
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Basic",
    tagline: "Template when you need speed.",
    price: "500k – 1tr",
    priceNote: "VND · trọn gói",
    timeline: "1–3 ngày",
    audience: "Cá nhân, CLB, tiệm nhỏ, sự kiện nhỏ",
    includes: [
      "1 template có sẵn",
      "3–5 trang cơ bản",
      "Responsive mobile",
      "Điền nội dung khách gửi",
      "Form liên hệ cơ bản",
      "Deploy lên Vercel/Netlify",
      "1–2 lần chỉnh sửa nhỏ",
    ],
    excludes: ["Thiết kế riêng", "CMS / admin", "Database / logic phức tạp"],
    cta: "Chọn gói Basic",
    color: "steel",
    icon: <Zap size={16} />,
  },
  {
    name: "Standard",
    tagline: "Custom when you need fit.",
    price: "2.500.000đ",
    priceNote: "VND · trọn gói",
    timeline: "3–7 ngày",
    audience: "Shop nhỏ, dự án sinh viên, landing page bán hàng",
    includes: [
      "Tư vấn yêu cầu + sitemap",
      "Prototype / layout demo",
      "Code giao diện theo nhu cầu",
      "3–5 trang, responsive",
      "Form contact / apply",
      "Tối ưu tốc độ + SEO cơ bản",
      "3–5 vòng chỉnh sửa trong scope",
      "Deploy production",
    ],
    cta: "Chọn gói Standard",
    color: "violet",
    icon: <Layers size={16} />,
    recommended: true,
  },
  {
    name: "Premium",
    tagline: "System when you need growth.",
    price: "5tr – 10tr+",
    priceNote: "VND · báo giá theo scope",
    timeline: "7–21 ngày",
    audience: "Dự án cần CMS, CRM, form, email, dashboard",
    includes: [
      "Discovery + phân tích nghiệp vụ",
      "Wireframe + prototype",
      "UI design theo brand",
      "Frontend + backend / API",
      "Database + CMS quản lý nội dung",
      "CRM mini cho khách apply",
      "Email notification (Resend)",
      "Admin dashboard + auth",
      "Bảo hành kỹ thuật 14–30 ngày",
    ],
    cta: "Yêu cầu báo giá",
    color: "mauve",
    icon: <Sparkles size={16} />,
  },
];

const addons: { label: string; price: string }[] = [
  { label: "Thêm trang", price: "+200k – 500k / trang" },
  { label: "Form nâng cao", price: "+300k – 800k" },
  { label: "CMS quản lý nội dung", price: "+1tr – 3tr" },
  { label: "Email notification", price: "+500k – 1tr" },
  { label: "Dashboard admin", price: "+2tr+" },
  { label: "Đa ngôn ngữ", price: "+1tr+" },
];

function TierCard({ tier }: { tier: Tier }) {
  const c = colorMap[tier.color];
  const isRec = tier.recommended;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`relative p-6 md:p-7 flex flex-col ${isRec ? "" : "frost"}`}
      style={{
        borderRadius: "19.2px",
        background: isRec ? gradients.cosmicB : undefined,
        border: isRec ? `1px solid ${c.solid}` : undefined,
        boxShadow: isRec
          ? `0 0 60px ${c.glow}, 0 24px 64px -16px rgba(64,24,96,0.7), 0 1px 0 rgba(247,249,250,0.1) inset`
          : "0 1px 0 rgba(247,249,250,0.06) inset",
      }}
    >
      {isRec && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] text-[#f7f9fa] bg-[#af50ff] violet-glow"
          style={{ fontFamily: fonts.mono, letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" }}
        >
          Recommended
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${c.bg} border ${c.border} ${c.text} flex items-center justify-center backdrop-blur-md`}>
          {tier.icon}
        </div>
        <span
          className={`text-[10px] px-2.5 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}
          style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
        >
          {tier.timeline}
        </span>
      </div>

      <h3
        className="text-[#f7f9fa] mb-1"
        style={{
          fontFamily: fonts.display,
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "1.75rem",
          letterSpacing: "-0.025em",
        }}
      >
        {tier.name}
      </h3>
      <p
        className="text-[#f0f0f0]/60 mb-5"
        style={{ fontFamily: fonts.body, fontSize: "0.95rem", lineHeight: 1.45 }}
      >
        {tier.tagline}
      </p>

      <div className="mb-5 pb-5 border-b border-[#f7f9fa]/[0.08]">
        <div
          className="text-[#f7f9fa]"
          style={{
            fontFamily: fonts.display,
            fontWeight: 300,
            fontSize: "2.25rem",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          {tier.price}
        </div>
        <div
          className="text-[#6b6b6b] mt-1.5"
          style={{ fontFamily: fonts.mono, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}
        >
          {tier.priceNote}
        </div>
      </div>

      <div
        className="text-[11px] text-[#f0f0f0]/55 mb-4"
        style={{ fontFamily: fonts.mono, letterSpacing: "0.1em" }}
      >
        <span className={c.text} style={{ textTransform: "uppercase", letterSpacing: "0.2em" }}>FOR</span> · {tier.audience}
      </div>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {tier.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[13px] text-[#f0f0f0]/85"
            style={{ fontFamily: fonts.body, lineHeight: 1.5 }}
          >
            <Check size={14} className={`${c.text} mt-0.5 flex-shrink-0`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {tier.excludes && (
        <div className="mb-6 pt-4 border-t border-[#f7f9fa]/[0.06]">
          <div
            className="text-[10px] text-[#6b6b6b] mb-2"
            style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
          >
            Không bao gồm
          </div>
          <div
            className="text-[11.5px] text-[#f0f0f0]/55"
            style={{ fontFamily: fonts.body, lineHeight: 1.65 }}
          >
            {tier.excludes.join(" · ")}
          </div>
        </div>
      )}

      <a
        href="#contact"
        className={`group inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[13px] transition-all ${
          isRec
            ? "bg-[#af50ff] text-[#f7f9fa] hover:bg-[#af50ff]/90"
            : `frost-strong ${c.text} hover:border-[#af50ff]/50`
        }`}
        style={{ fontFamily: fonts.body, fontWeight: 700, letterSpacing: "0.02em" }}
      >
        {tier.cta}
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.div>
  );
}

export function PricingSection() {
  return (
    <AnimatedSection id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#6c4bd6]/12 blur-[140px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative">
        <div className="mb-14 md:mb-16 text-center">
          <SectionHeading
            eyebrow="Service & pricing"
            eyebrowColor="cosmic"
            title="Ba gói,"
            italicWord="ba mức cam kết."
            align="center"
          />
          <p
            className="text-[#f0f0f0]/65 mt-6 mx-auto"
            style={{ fontFamily: fonts.body, fontSize: "1rem", lineHeight: 1.65, maxWidth: "60ch" }}
          >
            Template khi cần nhanh · Custom khi cần đúng nhu cầu · System khi cần vận
            hành và mở rộng. Giá rõ ràng, scope rõ ràng, không tính giờ.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-5 md:gap-6 mb-14"
        >
          {tiers.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </motion.div>

        <div
          className="frost p-6 md:p-8"
          style={{ borderRadius: "19.2px", boxShadow: "0 1px 0 rgba(247,249,250,0.06) inset" }}
        >
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[10px] text-[#af50ff]"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" }}
            >
              /// Add-on · cộng thêm khi cần
            </span>
            <span
              className="text-[10px] text-[#6b6b6b] hidden md:inline"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.12em" }}
            >
              vnd · trên mỗi gói
            </span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5">
            {addons.map((a) => (
              <div
                key={a.label}
                className="flex items-baseline justify-between gap-3 py-2 border-b border-dashed border-[#f7f9fa]/[0.08]"
              >
                <span className="text-[#f0f0f0]/85 text-[13px]" style={{ fontFamily: fonts.body, fontWeight: 500 }}>
                  {a.label}
                </span>
                <span
                  className="text-[#af50ff] text-[12px] whitespace-nowrap"
                  style={{ fontFamily: fonts.mono, fontWeight: 400 }}
                >
                  {a.price}
                </span>
              </div>
            ))}
          </div>
          <p
            className="text-[11.5px] text-[#6b6b6b] mt-5"
            style={{ fontFamily: fonts.body, lineHeight: 1.6 }}
          >
            Báo giá cuối phụ thuộc vào scope, deadline và mức độ tuỳ biến. Liên hệ để
            mình estimate cụ thể cho dự án của bạn.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
