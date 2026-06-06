export type ColorKey = "steel" | "violet" | "mauve" | "indigo" | "teal" | "amber" | "rose" | "slate";

export interface Tier {
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
  recommended?: boolean;
}

export const pricingContent = {
  eyrow: "Service & pricing", // Match the original (or fix spelling to eyebrow, wait, the original was "eyebrow: 'Service & pricing'")
  eyebrow: "Service & pricing",
  title: "Ba gói,",
  italicWord: "ba mức cam kết.",
  description: "Template khi cần nhanh · Custom khi cần đúng nhu cầu · System khi cần vận hành và mở rộng. Giá rõ ràng, scope rõ ràng, không tính giờ.",
  addonEyebrow: "/// Add-on · cộng thêm khi cần",
  addonSub: "vnd · trên mỗi gói",
  bottomNote: "Báo giá cuối phụ thuộc vào scope, deadline và mức độ tuỳ biến. Liên hệ để mình estimate cụ thể cho dự án của bạn.",
  excludesLabel: "Không bao gồm",
  recommendedLabel: "Recommended",
  
  tiers: [
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
      color: "steel" as const,
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
      color: "violet" as const,
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
      color: "mauve" as const,
    },
  ] as Tier[],
  
  addons: [
    { label: "Thêm trang", price: "+200k – 500k / trang" },
    { label: "Form nâng cao", price: "+300k – 800k" },
    { label: "CMS quản lý nội dung", price: "+1tr – 3tr" },
    { label: "Email notification", price: "+500k – 1tr" },
    { label: "Dashboard admin", price: "+2tr+" },
    { label: "Đa ngôn ngữ", price: "+1tr+" },
  ]
};
