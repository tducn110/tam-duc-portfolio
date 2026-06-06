export type TemplateCategory = "Event" | "Portfolio" | "Beauty" | "Course" | "Cafe" | "Product";

export interface TemplatePackage {
  name: string;
  price: string;
  description: string;
}

export interface TemplateItem {
  slug: string;
  name: string;
  category: TemplateCategory;
  tagline: string;
  bestFor: string;
  priceFrom: string;
  delivery: string;
  demoUrl: string;
  accent: "violet" | "cosmic" | "steel" | "mauve" | "amber" | "teal";
  sections: string[];
  includes: string[];
  packages: TemplatePackage[];
}

export const templateCategories: Array<TemplateCategory | "All"> = [
  "All",
  "Event",
  "Portfolio",
  "Beauty",
  "Course",
  "Cafe",
  "Product",
];

export const templatePackages: TemplatePackage[] = [
  {
    name: "Basic",
    price: "500k",
    description: "Đổi text, ảnh, màu, deploy link. Hợp với trang gọn và nội dung đã sẵn sàng.",
  },
  {
    name: "Standard",
    price: "900k",
    description: "Gói khuyên dùng: form liên hệ, responsive kỹ, nút Zalo/Facebook, 2 lần sửa.",
  },
  {
    name: "Plus",
    price: "1.5tr",
    description: "Thêm animation nhẹ, SEO cơ bản, domain setup và tối ưu nhiều section hơn.",
  },
];

export const templateItems: TemplateItem[] = [
  {
    slug: "eventflow",
    name: "EventFlow",
    category: "Event",
    tagline: "Landing page cho workshop, talkshow, CLB và sự kiện nhỏ.",
    bestFor: "CLB, workshop, event sinh viên, lớp học ngắn hạn",
    priceFrom: "500k",
    delivery: "1-2 ngày",
    demoUrl: "#",
    accent: "violet",
    sections: ["Hero", "Agenda", "Speaker", "Ticket", "FAQ", "Register"],
    includes: ["Form đăng ký", "CTA deadline", "Thông tin địa điểm", "Mobile-first"],
    packages: templatePackages,
  },
  {
    slug: "personalpro",
    name: "PersonalPro",
    category: "Portfolio",
    tagline: "Portfolio gọn, đẹp, có case study và CTA liên hệ rõ ràng.",
    bestFor: "Developer, designer, photographer, sinh viên xin việc",
    priceFrom: "500k",
    delivery: "1-2 ngày",
    demoUrl: "#",
    accent: "steel",
    sections: ["Hero", "Projects", "About", "Skills", "Resume", "Contact"],
    includes: ["Project cards", "Social links", "CV CTA", "Responsive layout"],
    packages: templatePackages,
  },
  {
    slug: "beautybook",
    name: "BeautyBook",
    category: "Beauty",
    tagline: "Trang đặt lịch cho spa, nail, makeup, salon với visual sang trọng.",
    bestFor: "Spa nhỏ, nail, makeup artist, salon tóc",
    priceFrom: "900k",
    delivery: "2 ngày",
    demoUrl: "#",
    accent: "mauve",
    sections: ["Hero", "Services", "Gallery", "Price", "Reviews", "Booking"],
    includes: ["Nút đặt lịch", "Gallery ảnh", "Bảng giá", "Zalo/Facebook CTA"],
    packages: templatePackages,
  },
  {
    slug: "courselead",
    name: "CourseLead",
    category: "Course",
    tagline: "Landing thu thập lead cho khóa học, gia sư, IELTS và lớp lập trình.",
    bestFor: "Gia sư, trung tâm nhỏ, lớp IELTS, khóa học online",
    priceFrom: "900k",
    delivery: "2 ngày",
    demoUrl: "#",
    accent: "cosmic",
    sections: ["Hero", "Outcome", "Curriculum", "Teacher", "Pricing", "Lead form"],
    includes: ["Lead form", "Lộ trình học", "Phản hồi học viên", "FAQ tư vấn"],
    packages: templatePackages,
  },
  {
    slug: "cafemenu",
    name: "CafeMenu",
    category: "Cafe",
    tagline: "Mini site cho quán cafe, trà sữa, quán ăn nhỏ có menu và bản đồ.",
    bestFor: "Cafe, F&B nhỏ, quán ăn địa phương, popup store",
    priceFrom: "500k",
    delivery: "1-2 ngày",
    demoUrl: "#",
    accent: "amber",
    sections: ["Hero", "Menu", "Signature", "Gallery", "Location", "Social"],
    includes: ["Menu nhanh", "Google Maps", "Ảnh quán", "Social CTA"],
    packages: templatePackages,
  },
  {
    slug: "productdrop",
    name: "ProductDrop",
    category: "Product",
    tagline: "Landing bán một sản phẩm, pre-order hoặc local brand drop.",
    bestFor: "Mỹ phẩm, quần áo, đồ handmade, sản phẩm mới, pre-order",
    priceFrom: "900k",
    delivery: "2 ngày",
    demoUrl: "#",
    accent: "teal",
    sections: ["Hero", "Benefits", "Product", "Proof", "Offer", "Order form"],
    includes: ["CTA mua hàng", "Product gallery", "Giá ưu đãi", "Form đặt hàng"],
    packages: templatePackages,
  },
];

export const catalogScope = {
  included: [
    "Thay đổi nội dung, hình ảnh, màu sắc, logo có sẵn",
    "Deploy link thật và tối ưu hiển thị responsive di động",
    "Sửa lỗi hiển thị phát sinh trong 7 ngày sau bàn giao",
    "Hướng dẫn cập nhật thông tin cơ bản cho website",
  ],
  excluded: [
    "Không thiết kế logo mới, viết nội dung hay mua tên miền trả phí",
    "Không bao gồm hệ thống quản lý, thanh toán trực tuyến, database phức tạp",
    "Không custom cấu trúc layout lớn khác biệt nhiều so với mẫu gốc",
    "Bàn giao mã nguồn (source code) riêng biệt nếu khách hàng có yêu cầu",
  ],
};
