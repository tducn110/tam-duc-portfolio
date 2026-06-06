import { useMemo, useState, useRef } from "react";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Filter, ShieldCheck, Monitor, Layers, Star, Zap, Sparkles, Smartphone } from "lucide-react";
import { Link } from "react-router";
import { catalogScope, templateCategories, templateItems, templatePackages, type TemplateCategory, type TemplateItem } from "@/features/templates/data/templateCatalog.data";
import { colorMap, gradients } from "@/shared/lib/tokens";
import { Container, Surface, Typography } from "@/shared/ui";
import { ThreeBackground } from "../components/portfolio/ThreeBackground";
import { CursorHalo } from "../hooks/useCursorHalo";
import { SplitText } from "../components/shared/SplitText";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Visual Mockup inside the sticky browser/phone viewport
function BrowserMockupScreen({ template, isSelected, previewDevice }: { template: TemplateItem; isSelected: boolean; previewDevice: "desktop" | "mobile" }) {
  const isMobileView = previewDevice === "mobile";

  const content = () => {
    switch (template.slug) {
      case "eventflow":
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-5 text-white bg-gradient-to-br from-[#120a2a] via-[#1a0e3c] to-[#070312] select-none h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[9px] font-black tracking-[0.25em] text-violet-400">EVENTFLOW</span>
              <span className="rounded-full bg-violet-500/20 border border-violet-500/30 px-2 py-0.5 text-[8px] text-violet-300 font-mono">15.07.2026</span>
            </div>
            
            <div className="my-auto flex flex-col gap-1.5 py-2">
              <span className="text-[8px] uppercase tracking-[0.22em] text-violet-400 font-mono">DEV SUMMIT</span>
              <h4 className={`${isMobileView ? "text-lg" : "text-2xl"} font-bold leading-tight font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-violet-300`}>
                Tech Leaders Summit
              </h4>
              <p className="text-[10.5px] opacity-75 font-sans leading-relaxed text-zinc-300">
                Khám phá tương lai của AI, Web & Cloud cùng 12 diễn giả từ OpenAI, Google và DeepMind.
              </p>
              
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8px] text-slate-300 font-mono">12 Speakers</span>
                <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8px] text-slate-300 font-mono">Còn 50 vé</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-1.5 items-stretch sm:items-center rounded-xl bg-white/5 border border-white/10 p-1.5">
              <div className="h-7 flex-1 rounded-lg bg-white/5 border border-white/10 text-[8px] flex items-center px-2 text-white/40 font-sans">nhap_email@email.com</div>
              <div className="h-7 px-3 bg-violet-600 hover:bg-violet-700 transition-colors rounded-lg text-[9px] font-bold flex items-center justify-center cursor-default whitespace-nowrap">Đăng ký</div>
            </div>
          </div>
        );
      case "personalpro":
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-5 text-zinc-100 bg-[#0b0f19] select-none h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-200 tracking-tight">alex_rivera.dev</span>
              <span className="flex items-center gap-1 text-[8px] text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            </div>

            <div className={`my-auto flex ${isMobileView ? "flex-col text-center" : "flex-row"} gap-3 items-center py-2`}>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-black text-base shadow-lg shrink-0">
                AR
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-slate-100 tracking-tight">Alex Rivera</div>
                <div className="text-[9px] text-slate-400 font-mono">Senior Web Architect</div>
                <div className="flex flex-wrap gap-1 mt-1 justify-center lg:justify-start">
                  {["React", "NextJS"].map((t) => (
                    <span key={t} className="rounded bg-slate-800/80 border border-slate-700/55 px-1.5 py-0.2 text-[8px] text-slate-300 font-mono">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-2 flex flex-col gap-0.5">
                <div className="text-[9px] font-bold text-slate-200 truncate">AI Platform V2</div>
                <div className="text-[7.5px] text-slate-500 font-mono">NextJS & RLS</div>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-2 flex flex-col gap-0.5">
                <div className="text-[9px] font-bold text-slate-200 truncate">Payment Hub</div>
                <div className="text-[7.5px] text-slate-500 font-mono">Stripe API</div>
              </div>
            </div>
          </div>
        );
      case "beautybook":
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-5 bg-[#FAF7F2] text-[#4A3B32] select-none h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E2DCD5] pb-2">
              <span className="text-[9px] font-serif font-bold tracking-[0.2em] text-[#6E5544]">L'ATELIER BEAUTÉ</span>
              <span className="text-[8px] text-[#8C7666] font-serif italic hidden sm:block">Đà Nẵng</span>
            </div>

            <div className="my-auto text-center flex flex-col gap-1 py-2">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#8C7666] font-semibold">SPA & CLINIC</span>
              <h4 className={`${isMobileView ? "text-base" : "text-lg"} font-serif text-[#3A2D24] italic font-normal`}>
                Liệu trình chăm sóc chuyên sâu
              </h4>
              <p className="text-[10px] text-[#7A695C] italic max-w-[280px] mx-auto leading-normal">
                Spa thảo dược Organic giúp hồi phục làn da tổn thương nhanh chóng.
              </p>
            </div>

            <div className={`flex ${isMobileView ? "flex-col" : "flex-row"} gap-2`}>
              <div className="flex-1 bg-white border border-[#E2DCD5] rounded-xl p-2 flex flex-col gap-0.5 shadow-sm">
                <div className="text-[9px] font-bold text-[#4A3B32] truncate">Massage Thảo Dược</div>
                <div className="text-[8px] text-[#8C7666] font-mono">60 Phút · 350k</div>
              </div>
              <div className="flex-1 bg-white border border-[#E2DCD5] rounded-xl p-2 flex flex-col gap-0.5 shadow-sm">
                <div className="text-[9px] font-bold text-[#4A3B32] truncate">Gội Đầu Dưỡng Sinh</div>
                <div className="text-[8px] text-[#8C7666] font-mono">45 Phút · 180k</div>
              </div>
            </div>
          </div>
        );
      case "courselead":
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-5 text-white bg-gradient-to-br from-[#06334f] via-[#0b486d] to-[#031d2e] select-none h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[9px] font-mono tracking-widest text-sky-400">SKY ACADEMY</span>
              <span className="rounded bg-sky-500/20 border border-sky-400/30 px-2 py-0.2 text-[8px] text-sky-300 font-mono font-bold">PRO</span>
            </div>

            <div className="my-auto flex flex-col gap-1.5 py-2">
              <h4 className={`${isMobileView ? "text-base" : "text-lg"} font-bold tracking-tight leading-snug`}>
                Chinh Phục Next.js 15 & Serverless
              </h4>
              <p className="text-[10px] text-sky-200/80 leading-relaxed max-w-[300px]">
                Xây dựng hệ thống Serverless API hoàn chỉnh, bảo mật cơ sở dữ liệu Supabase RLS.
              </p>
            </div>

            <div className="space-y-1.5 bg-white/5 border border-white/10 rounded-xl p-2.5">
              <div className="flex items-center gap-2 text-[9px] text-sky-100">
                <Check size={10} className="text-sky-400 flex-shrink-0" />
                <span>15 giờ học HD thực chiến</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] text-sky-100">
                <Check size={10} className="text-sky-400 flex-shrink-0" />
                <span>Hỏi đáp 1-1 qua Discord</span>
              </div>
            </div>
          </div>
        );
      case "cafemenu":
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-5 bg-[#161412] text-[#E7E2DC] select-none h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#302B26] pb-2">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#C5A880]">THE BEANERY</span>
              <span className="text-[8px] text-[#A2978B] font-mono bg-[#A2978B]/10 px-1.5 py-0.2 rounded">OPEN</span>
            </div>

            <div className="my-auto space-y-2 py-2">
              <div className="flex items-baseline justify-between border-b border-[#302B26] border-dashed pb-1">
                <div>
                  <div className="text-[9px] font-bold text-[#E7E2DC]">Cold Brew Coffee</div>
                  <div className="text-[7.5px] text-[#8C8072] truncate max-w-[120px]">Ủ lạnh 16 tiếng thơm sâu</div>
                </div>
                <span className="text-[9px] font-mono text-[#C5A880] font-bold">45k</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-[#302B26] border-dashed pb-1">
                <div>
                  <div className="text-[9px] font-bold text-[#E7E2DC]">Caramel Latte</div>
                  <div className="text-[7.5px] text-[#8C8072] truncate max-w-[120px]">Signature Espresso ngậy</div>
                </div>
                <span className="text-[9px] font-mono text-[#C5A880] font-bold">50k</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[8px] text-[#8C8072] pt-1.5 border-t border-[#302B26]">
              <span className="truncate max-w-[150px]">📍 120 Bạch Đằng, Đà Nẵng</span>
              <span className="hidden sm:inline">Wifi</span>
            </div>
          </div>
        );
      case "productdrop":
        return (
          <div className="absolute inset-0 flex flex-col justify-between p-5 bg-[#080808] text-white select-none h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[9px] font-black tracking-[0.2em] text-[#F39C12]">STUDIO DROP</span>
              <span className="text-[8px] text-rose-500 font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-0.2 rounded font-mono animate-pulse">50 PCS</span>
            </div>

            <div className="my-auto flex items-center justify-between gap-3 py-2">
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-xs font-black uppercase tracking-tight text-white truncate">Heavyweight Hoodie</span>
                <span className="text-[8.5px] text-zinc-400 leading-tight">Cotton 100%, định lượng 400 GSM đứng dáng.</span>
                <span className="text-[10px] font-mono font-bold text-[#F39C12] mt-0.5">499k</span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center relative shrink-0">
                <svg className="w-7 h-7 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 9l8-4 8 4M4 9v8l8 4 8-4V9M4 9l8 4 8-4" />
                </svg>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex gap-1 shrink-0">
                {["M", "L"].map((sz) => (
                  <span key={sz} className="w-6 h-6 border border-zinc-800 bg-zinc-900/60 rounded-md text-[8px] font-bold flex items-center justify-center cursor-default">{sz}</span>
                ))}
              </div>
              <div className="flex-1 h-6 rounded-md bg-[#F39C12] text-black text-[9px] font-black flex items-center justify-center tracking-wider cursor-default">
                ORDER NOW
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-out will-change-transform ${
        isSelected
          ? "opacity-100 scale-100 rotate-0 pointer-events-auto"
          : "opacity-0 scale-95 -rotate-1 pointer-events-none"
      }`}
    >
      {content()}
    </div>
  );
}

// 3D Tilt Card effect wrapper
function TiltCard({ children, className, isLightMode }: { children: React.ReactNode; className?: string; isLightMode: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(cardRef.current, {
      rotateX: -y * 0.05,
      rotateY: x * 0.05,
      transformPerspective: 1200,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div style={{ transform: "translateZ(20px)" }} className="h-full">
        {children}
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | "All">("All");
  const [activeTemplateSlug, setActiveTemplateSlug] = useState("eventflow");
  const [isLightMode, setIsLightMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "All") return templateItems;
    return templateItems.filter((template) => template.category === activeCategory);
  }, [activeCategory]);

  // Set up ScrollTriggers for scroll-controlled screen swapping
  useGSAP(() => {
    ScrollTrigger.getAll().forEach(st => st.kill());

    templateItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: `#card-${item.slug}`,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => setActiveTemplateSlug(item.slug),
        onEnterBack: () => setActiveTemplateSlug(item.slug),
      });

      // Card entrance animation on scroll
      gsap.fromTo(
        `#card-${item.slug}`,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `#card-${item.slug}`,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Animate sections headers
    const sections = gsap.utils.toArray(".animate-section");
    sections.forEach((sec: any) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: containerRef, dependencies: [filteredTemplates] });

  const activeColorToken = useMemo(() => {
    const activeItem = templateItems.find(t => t.slug === activeTemplateSlug);
    return colorMap[activeItem?.accent || "violet"];
  }, [activeTemplateSlug]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      }}
    >
      <main
        ref={containerRef}
        className={`min-h-screen overflow-hidden transition-colors duration-500 relative ${
          isLightMode ? "bg-zinc-50 text-zinc-900" : "bg-[#090909] text-whisper"
        }`}
      >
        {/* Galaxy Background consistent with Portfolio layout */}
        {!isLightMode && <ThreeBackground />}
        <CursorHalo />

        {/* Back and Theme Toggle Bar */}
        <div className="absolute top-6 left-0 right-0 z-50">
          <Container className="flex items-center justify-between">
            <Link
              to="/"
              className={`group inline-flex items-center gap-2 text-[12px] font-medium transition-colors ${
                isLightMode ? "text-zinc-600 hover:text-violet" : "text-ghost/65 hover:text-violet"
              }`}
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              <span>Quay lại Portfolio</span>
            </Link>

            <button
              onClick={() => setIsLightMode(!isLightMode)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-[10px] font-mono tracking-widest transition-all duration-300 ${
                isLightMode
                  ? "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 shadow-sm"
                  : "border-whisper/10 bg-whisper/[0.04] text-ghost/85 hover:border-violet/40 hover:text-white"
              }`}
            >
              {isLightMode ? "DARK MODE 🌙" : "LIGHT MODE ☀️"}
            </button>
          </Container>
        </div>

        {/* Hero Section with Parallax Depth */}
        <section className={`relative pt-32 pb-16 md:pt-40 md:pb-24 border-b transition-colors duration-500 ${
          isLightMode ? "bg-white border-zinc-200/80" : "border-whisper/[0.06]"
        }`}>
          <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isLightMode
              ? "bg-[radial-gradient(circle_at_50%_0%,rgba(175,80,255,0.06),transparent_45%)]"
              : "bg-[radial-gradient(circle_at_50%_0%,rgba(175,80,255,0.18),transparent_42%)]"
          }`} />
          
          <Container className="relative">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <Typography variant="monoEyebrow" className="mb-4 !text-[10px] text-violet !tracking-[0.24em] font-bold">
                  CATALOG LANDING PAGE
                </Typography>
                <h1 className="leading-[0.88] tracking-[-0.05em] overflow-hidden py-1">
                  <SplitText
                    className={`italic font-normal tracking-[-0.05em] !text-[clamp(2.8rem,7.5vw,6.5rem)] leading-none ${
                      isLightMode ? "text-zinc-900" : "text-whisper"
                    }`}
                    variant="reveal-up"
                  >
                    Chọn mẫu, sửa nhanh.
                  </SplitText>
                </h1>
              </div>
              <div className="lg:pb-3">
                <Typography
                  variant="body"
                  className={`max-w-[50ch] !text-[1.02rem] !leading-[1.7] ${
                    isLightMode ? "text-zinc-600" : "text-ghost opacity-70"
                  }`}
                >
                  Tuyển tập các cấu trúc Landing Page thực chiến, tối ưu hóa tỷ lệ chuyển đổi, tải trang nhanh và đầy đủ hiệu ứng tương tác cao cấp.
                </Typography>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-violet/30 bg-violet/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-violet font-semibold">Từ 500k</span>
                  <span className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] ${
                    isLightMode ? "border-zinc-200 bg-zinc-100 text-zinc-500" : "border-whisper/10 bg-whisper/[0.04] text-ghost/65"
                  }`}>1-2 ngày bàn giao</span>
                  <span className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] ${
                    isLightMode ? "border-zinc-200 bg-zinc-100 text-zinc-500" : "border-whisper/10 bg-whisper/[0.04] text-ghost/65"
                  }`}>Tối ưu di động</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Interactive Split-Scroll Showcase */}
        <section className="relative py-20 md:py-28">
          <Container>
            {/* Filter controls */}
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-section">
              <div className={`inline-flex items-center gap-2.5 ${isLightMode ? "text-zinc-600" : "text-ghost/75"}`}>
                <Filter size={15} className="text-violet" />
                <Typography variant="monoEyebrow" className="!text-[10px] !tracking-[0.2em] font-bold">BỘ LỌC DANH MỤC</Typography>
              </div>
              <div className="flex flex-wrap gap-2">
                {templateCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      // Reset screen to first of the filtered elements
                      const firstFiltered = category === "All" 
                        ? templateItems[0] 
                        : templateItems.find(t => t.category === category);
                      if (firstFiltered) setActiveTemplateSlug(firstFiltered.slug);
                    }}
                    className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                      activeCategory === category
                        ? "border-violet bg-violet/15 text-violet shadow-sm"
                        : isLightMode
                          ? "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                          : "border-whisper/10 bg-whisper/[0.03] text-ghost/55 hover:border-violet/35 hover:text-ghost"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Split scroll Grid */}
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
              
              {/* Sticky Mockup Viewer (Left Side) */}
              <div className="lg:sticky lg:top-28 z-20 flex flex-col gap-4 order-last lg:order-first">
                
                {/* Device Selector Tabs to fix vertical/horizontal viewport constraints */}
                <div className="flex items-center justify-between mb-1 px-1">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewDevice("desktop")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all border ${
                        previewDevice === "desktop"
                          ? "border-violet bg-violet/10 text-violet"
                          : isLightMode
                            ? "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-800"
                            : "border-whisper/10 bg-whisper/[0.03] text-ghost/60 hover:text-white"
                      }`}
                    >
                      <Monitor size={10} /> DESKTOP BROWSER
                    </button>
                    <button
                      onClick={() => setPreviewDevice("mobile")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono tracking-wider transition-all border ${
                        previewDevice === "mobile"
                          ? "border-violet bg-violet/10 text-violet"
                          : isLightMode
                            ? "border-zinc-200 bg-white text-zinc-500 hover:text-zinc-800"
                            : "border-whisper/10 bg-whisper/[0.03] text-ghost/60 hover:text-white"
                      }`}
                    >
                      <Smartphone size={10} /> MOBILE VIEW (KHUNG DỌC)
                    </button>
                  </div>
                </div>

                {/* Decorative ambient color glow behind the browser */}
                <div
                  className="absolute -inset-4 rounded-[28px] opacity-15 blur-[60px] pointer-events-none transition-all duration-700"
                  style={{
                    background: activeColorToken ? activeColorToken.solid : "#af50ff",
                  }}
                />

                {/* Adaptive Device Window Frame */}
                {previewDevice === "desktop" ? (
                  /* Desktop Browser Mockup Frame */
                  <div
                    className={`w-full h-[360px] sm:h-[420px] rounded-[22px] border overflow-hidden relative shadow-2xl transition-all duration-500 ${
                      isLightMode
                        ? "bg-white border-zinc-200/80 shadow-zinc-300/40"
                        : "bg-[#0b0f19]/90 border-whisper/10 shadow-[#030303]/80"
                    }`}
                  >
                    {/* Browser Header Bar */}
                    <div className={`h-11 flex items-center justify-between px-5 border-b relative z-30 transition-colors ${
                      isLightMode ? "bg-zinc-100/70 border-zinc-200" : "bg-[#0e1422] border-whisper/5"
                    }`}>
                      <div className="flex gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <div className={`h-6 rounded-md px-10 text-[9.5px] font-mono flex items-center justify-center tracking-wide w-2/3 truncate max-w-[320px] ${
                        isLightMode ? "bg-zinc-200/50 text-zinc-500" : "bg-[#080d16] text-[#6b7c96]"
                      }`}>
                        https://tamduc.me/templates/{activeTemplateSlug}
                      </div>
                      <div className="flex items-center gap-1 opacity-40">
                        <Monitor size={12} />
                      </div>
                    </div>

                    {/* Previews content */}
                    <div className="absolute inset-0 top-11 z-10 group overflow-hidden">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-20 pointer-events-none flex items-center justify-center">
                        <span className="bg-black/85 border border-white/10 rounded-full px-3 py-1 text-[9px] text-white tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100 uppercase">
                          Hover to Interact
                        </span>
                      </div>

                      <div className="h-full relative overflow-y-auto group-hover:scale-[1.01] transition-transform duration-500">
                        {templateItems.map((template) => (
                          <BrowserMockupScreen
                            key={template.slug}
                            template={template}
                            isSelected={activeTemplateSlug === template.slug}
                            previewDevice="desktop"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Vertical Phone Mockup Frame (Crucial for mobile templates) */
                  <div
                    className={`w-[260px] h-[450px] mx-auto rounded-[42px] border-[8px] overflow-hidden relative shadow-2xl transition-all duration-500 ${
                      isLightMode
                        ? "bg-white border-zinc-800 shadow-zinc-400/40"
                        : "bg-[#0b0f19] border-zinc-800 shadow-[#030303]/90"
                    }`}
                  >
                    {/* Speaker Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-zinc-800 rounded-b-2xl z-40 flex items-center justify-center gap-1">
                      <span className="w-8 h-1 rounded-full bg-zinc-700 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 inline-block" />
                    </div>

                    {/* Phone home indicator bar at bottom */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-24 bg-zinc-700 rounded-full z-40 pointer-events-none" />

                    {/* Previews content */}
                    <div className="absolute inset-0 z-10 group overflow-hidden">
                      <div className="h-full relative overflow-y-auto pt-4 pb-4">
                        {templateItems.map((template) => (
                          <BrowserMockupScreen
                            key={template.slug}
                            template={template}
                            isSelected={activeTemplateSlug === template.slug}
                            previewDevice="mobile"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub title helper text under mockup */}
                <div className="text-center">
                  <Typography variant="monoEyebrow" className="!text-[9px] text-slate !tracking-[0.12em] uppercase font-normal">
                    * Rê chuột hoặc chạm vào khung để giả lập cuộn dọc website
                  </Typography>
                </div>
              </div>

              {/* Scrolling Details (Right Side) */}
              <div className="flex flex-col gap-10">
                {filteredTemplates.map((template) => {
                  const isSelected = activeTemplateSlug === template.slug;
                  const c = colorMap[template.accent];

                  return (
                    <div
                      key={template.slug}
                      id={`card-${template.slug}`}
                      className="scroll-mt-36"
                    >
                      <TiltCard isLightMode={isLightMode}>
                        <Surface
                          variant={isLightMode ? "default" : "frost"}
                          className={`p-6 sm:p-8 rounded-[24px] border transition-all duration-500 flex flex-col gap-6 cursor-pointer ${
                            isSelected
                              ? isLightMode
                                ? "bg-white border-zinc-300 shadow-lg ring-1 ring-zinc-200"
                                : "bg-[#110c22]/70 border-violet/40 shadow-[0_30px_60px_rgba(0,0,0,0.5)] scale-[1.01]"
                              : isLightMode
                                ? "bg-white/40 border-zinc-200/50 opacity-60 hover:opacity-100 shadow-sm"
                                : "bg-zinc-900/40 border-whisper/5 opacity-40 hover:opacity-90 shadow-none"
                          }`}
                          style={{
                            boxShadow: isSelected && !isLightMode
                              ? `0 0 50px ${c.glow}, 0 20px 50px -10px rgba(0,0,0,0.7)`
                              : undefined
                          }}
                        >
                          {/* Header section of the card */}
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className={`inline-block font-mono text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-0.5 rounded-full border ${c.bg} ${c.text} ${c.border} mb-3.5`}>
                                {template.category}
                              </span>
                              <Typography
                                as="h3"
                                variant="subheading"
                                className={`!text-2.5xl italic font-normal tracking-[-0.03em] transition-colors ${
                                  isSelected
                                    ? isLightMode ? "text-zinc-900" : "text-whisper"
                                    : isLightMode ? "text-zinc-700" : "text-ghost"
                                }`}
                              >
                                {template.name}
                              </Typography>
                            </div>
                            
                            <div className="text-right">
                              <Typography variant="monoEyebrow" className="!text-[8px] text-slate !tracking-[0.18em] uppercase">
                                Giá mẫu gốc
                              </Typography>
                              <div className={`font-display text-3xl italic font-bold tracking-tight ${c.text}`}>
                                {template.priceFrom}
                              </div>
                            </div>
                          </div>

                          {/* Tagline */}
                          <Typography
                            variant="bodySm"
                            className={`!text-[13.5px] !leading-[1.6] ${
                              isSelected
                                ? isLightMode ? "text-zinc-800" : "text-zinc-200"
                                : isLightMode ? "text-zinc-500" : "text-ghost/60"
                            }`}
                          >
                            {template.tagline}
                          </Typography>

                          {/* Fitting recommendation box */}
                          <div className={`rounded-xl border p-4 transition-all duration-500 ${
                            isSelected
                              ? isLightMode
                                ? "border-zinc-200 bg-zinc-50/70"
                                : "border-whisper/10 bg-midnight/50"
                              : isLightMode
                                ? "border-zinc-200/50 bg-zinc-50/20"
                                : "border-whisper/5 bg-[#121212]/30"
                          }`}>
                            <Typography variant="monoEyebrow" className="mb-1 !text-[9px] text-slate !tracking-[0.2em] font-bold">
                              DÙNG CHO PHÂN KHÚC
                            </Typography>
                            <Typography
                              variant="bodySm"
                              className={`!text-[12.5px] !leading-[1.5] ${
                                isSelected ? (isLightMode ? "text-zinc-700" : "text-ghost/90") : "text-slate"
                              }`}
                            >
                              {template.bestFor}
                            </Typography>
                          </div>

                          {/* Inclusions checklist */}
                          <div className="space-y-2">
                            <Typography variant="monoEyebrow" className="!text-[9px] text-slate !tracking-[0.2em] font-bold mb-1.5">
                              TÍNH NĂNG NỔI BẬT
                            </Typography>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                              {template.includes.map((inc) => (
                                <div key={inc} className="flex gap-2 text-ghost/75 items-center">
                                  <Check size={13} className={`${c.text} flex-shrink-0`} />
                                  <Typography
                                    variant="bodySm"
                                    className={`!text-[12px] ${
                                      isSelected ? (isLightMode ? "text-zinc-600" : "text-zinc-300") : "text-zinc-500"
                                    }`}
                                  >
                                    {inc}
                                  </Typography>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action CTA Buttons */}
                          <div className={`flex items-center gap-2 border-t pt-5 mt-2 transition-colors ${
                            isLightMode ? "border-zinc-100" : "border-whisper/10"
                          }`}>
                            <a
                              href={template.demoUrl}
                              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-[12px] font-bold transition-all ${
                                isLightMode
                                  ? "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
                                  : "border-whisper/10 bg-whisper/[0.04] text-whisper hover:border-violet/50 hover:bg-whisper/10"
                              }`}
                            >
                              Xem Demo Live <ExternalLink size={13} />
                            </a>
                            <a
                              href={`mailto:n.tduc011006dn@gmail.com?subject=Chon template ${template.name}`}
                              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border ${c.border} ${c.bg} px-3 py-3 text-[12px] font-bold ${c.text} transition-all hover:scale-[1.02] shadow-sm`}
                            >
                              Chọn Mẫu Này <ArrowUpRight size={13} />
                            </a>
                          </div>
                        </Surface>
                      </TiltCard>
                    </div>
                  );
                })}
              </div>

            </div>
          </Container>
        </section>

        {/* Scope and Policies Section */}
        <section className="relative py-16 md:py-24 border-t border-b border-whisper/[0.06]">
          <Container className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="animate-section">
              <TiltCard isLightMode={isLightMode}>
                <Surface
                  variant={isLightMode ? "default" : "glow"}
                  className={`p-6 md:p-8 rounded-[24px] ${
                    isLightMode ? "bg-white border-zinc-200 text-zinc-900 shadow-sm" : "text-white"
                  }`}
                >
                  <div className="mb-5 inline-flex items-center gap-2 text-violet">
                    <ShieldCheck size={16} />
                    <Typography variant="monoEyebrow" className="!text-[10px] !tracking-[0.22em] font-bold">SCOPE RÕ RÀNG</Typography>
                  </div>
                  <Typography
                    as="h2"
                    variant="heading"
                    className={`mb-4 !text-4xl italic font-normal !tracking-[-0.035em] ${isLightMode ? "text-zinc-900" : "text-white"}`}
                  >
                    Template rẻ vì không custom lớn.
                  </Typography>
                  <Typography
                    variant="body"
                    className={`!text-[13.5px] !leading-[1.65] ${isLightMode ? "text-zinc-500" : "text-ghost opacity-70"}`}
                  >
                    Các mẫu thiết kế đã được xây dựng sẵn cấu trúc tối ưu. Khi bạn chọn mua, mình sẽ hỗ trợ thay đổi nội dung, màu sắc, font chữ và logo miễn phí. Với các thay đổi lớn về layout, thêm tính năng cơ sở dữ liệu riêng, mình sẽ báo giá chi tiết theo scope yêu cầu.
                  </Typography>
                </Surface>
              </TiltCard>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="animate-section">
                <Surface
                  variant={isLightMode ? "default" : "frost"}
                  className={`p-6 rounded-[20px] h-full ${
                    isLightMode ? "bg-white border-zinc-200 text-zinc-900 shadow-sm" : "text-white"
                  }`}
                >
                  <Typography variant="monoEyebrow" className="mb-4 !text-[10.5px] text-violet !tracking-[0.22em] font-bold">BAO GỒM TRONG GÓI</Typography>
                  <div className="space-y-3.5">
                    {catalogScope.included.map((item) => (
                      <div key={item} className="flex gap-3">
                        <Check size={15} className="mt-0.5 flex-shrink-0 text-violet" />
                        <Typography
                          variant="bodySm"
                          className={`!text-[13px] !leading-[1.55] ${isLightMode ? "text-zinc-700" : "text-ghost/75"}`}
                        >
                          {item}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Surface>
              </div>

              <div className="animate-section">
                <Surface
                  variant={isLightMode ? "default" : "frost"}
                  className={`p-6 rounded-[20px] h-full ${
                    isLightMode ? "bg-white border-zinc-200 text-zinc-900 shadow-sm" : "text-white"
                  }`}
                >
                  <Typography variant="monoEyebrow" className="mb-4 !text-[10.5px] text-slate !tracking-[0.22em] font-bold">KHÔNG BAO GỒM</Typography>
                  <div className="space-y-3.5">
                    {catalogScope.excluded.map((item) => (
                      <div key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate" />
                        <Typography
                          variant="bodySm"
                          className={`!text-[13px] !leading-[1.55] ${isLightMode ? "text-zinc-500" : "text-ghost/60"}`}
                        >
                          {item}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Surface>
              </div>
            </div>
          </Container>
        </section>

        {/* Pricing tiers and packages details */}
        <section className="relative py-20 md:py-28">
          <Container>
            <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between animate-section">
              <div>
                <Typography variant="monoEyebrow" className="mb-2.5 !text-[10px] text-violet !tracking-[0.22em] font-bold">BẢNG GIÁ DỊCH VỤ</Typography>
                <Typography
                  as="h2"
                  variant="heading"
                  className={`!text-4xl italic font-normal !tracking-[-0.035em] ${isLightMode ? "text-zinc-900" : "text-white"}`}
                >
                  Giá template & Phí tinh chỉnh
                </Typography>
              </div>
              <Typography
                variant="bodySm"
                className={`max-w-[42ch] !text-[12px] !leading-[1.6] ${isLightMode ? "text-zinc-500" : "text-ghost opacity-55"}`}
              >
                Gói Standard được khuyến nghị cho mọi nhu cầu cơ bản của dự án nhỏ. Chi phí tối thiểu 500k áp dụng khi nội dung của bạn đã sẵn sàng hoàn toàn.
              </Typography>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {templatePackages.map((pkg, index) => (
                <div key={pkg.name} className="animate-section">
                  <TiltCard isLightMode={isLightMode} className="h-full">
                    <div
                      className={`rounded-[22px] border p-6 flex flex-col justify-between h-full transition-all duration-500 ${
                        index === 1
                          ? isLightMode 
                            ? "border-violet/40 bg-violet-50/30 shadow-md shadow-violet-100"
                            : "border-violet/45 bg-violet/10 shadow-[0_20px_40px_rgba(175,80,255,0.06)]"
                          : isLightMode
                            ? "border-zinc-200 bg-white hover:border-zinc-300 shadow-sm"
                            : "border-whisper/10 bg-whisper/[0.025]"
                      }`}
                    >
                      <div>
                        <div className="mb-5 flex items-center justify-between">
                          <Typography
                            variant="monoEyebrow"
                            className={`!text-[10px] !tracking-[0.18em] font-bold ${isLightMode ? "text-zinc-500" : "text-ghost/60"}`}
                          >
                            {pkg.name}
                          </Typography>
                          {index === 1 && (
                            <span className="rounded-full bg-violet border border-violet-400/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-whisper font-semibold">
                              Khuyên dùng
                            </span>
                          )}
                        </div>
                        <div className={`mb-4 font-display text-4.5xl italic font-bold ${isLightMode ? "text-zinc-900" : "text-whisper"}`}>
                          {pkg.price}
                        </div>
                      </div>
                      <Typography
                        variant="bodySm"
                        className={`!text-[13px] !leading-[1.65] ${isLightMode ? "text-zinc-600" : "text-ghost opacity-70"}`}
                      >
                        {pkg.description}
                      </Typography>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </ReactLenis>
  );
}
