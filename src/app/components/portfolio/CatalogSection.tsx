import React, { useState, useRef, useMemo, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Flame, Check } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Section, Container, Surface, Typography, SectionHeading } from "@/shared/ui";
import { staggerContainer, fadeUp } from "@/shared/lib/motion";
import { colorMap, type ColorKey, fonts } from "@/shared/lib/tokens";
import { Magnetic } from "../shared/Magnetic";

/* ─────────────────────────── Content ─────────────────────────── */

type Category = "Landing" | "Portfolio" | "Business" | "Event";

interface CatalogItem {
  id: string;
  name: string;
  description: string;
  category: Category;
  features: string[];
  price: string;
  color: ColorKey;
  popular: boolean;
}

const catalogContent = {
  eyebrow: "Template catalog",
  title: "Bộ sưu tập",
  italicWord: "template sẵn có.",
  description:
    "Duyệt qua bộ sưu tập template được thiết kế chuyên nghiệp — sẵn sàng tuỳ biến cho mọi nhu cầu từ landing page, portfolio đến website doanh nghiệp.",
  items: [
    {
      id: "tpl-001",
      name: "Nebula Landing",
      description: "Landing page hiện đại với hiệu ứng parallax & hero animation ấn tượng.",
      category: "Landing" as Category,
      features: ["Parallax hero", "Responsive 100%", "Dark/Light mode", "SEO tối ưu"],
      price: "1.200.000₫",
      color: "violet" as ColorKey,
      popular: true,
    },
    {
      id: "tpl-002",
      name: "Folio Minimal",
      description: "Portfolio tối giản dành cho designer & developer thể hiện dự án cá nhân.",
      category: "Portfolio" as Category,
      features: ["Gallery masonry", "Project showcase", "Contact form"],
      price: "900.000₫",
      color: "cosmic" as ColorKey,
      popular: false,
    },
    {
      id: "tpl-003",
      name: "Enterprise Pro",
      description: "Giao diện doanh nghiệp chuyên nghiệp với dashboard & CMS tích hợp.",
      category: "Business" as Category,
      features: ["Admin panel", "Multi-language", "Analytics dashboard", "CMS tích hợp"],
      price: "2.500.000₫",
      color: "indigo" as ColorKey,
      popular: true,
    },
    {
      id: "tpl-004",
      name: "EventX",
      description: "Template sự kiện với countdown, lịch trình & đăng ký trực tuyến.",
      category: "Event" as Category,
      features: ["Countdown timer", "Schedule builder", "Đăng ký online"],
      price: "800.000₫",
      color: "mauve" as ColorKey,
      popular: false,
    },
    {
      id: "tpl-005",
      name: "SaaS Launch",
      description: "Trang giới thiệu sản phẩm SaaS với pricing table & feature comparison.",
      category: "Landing" as Category,
      features: ["Pricing table", "Feature grid", "Testimonials", "CTA sections"],
      price: "1.800.000₫",
      color: "steel" as ColorKey,
      popular: true,
    },
    {
      id: "tpl-006",
      name: "Creative Studio",
      description: "Portfolio sáng tạo với layout bất đối xứng & motion effects mượt mà.",
      category: "Portfolio" as Category,
      features: ["Asymmetric layout", "Cursor follower", "Smooth transitions"],
      price: "1.500.000₫",
      color: "cosmic" as ColorKey,
      popular: false,
    },
  ] as CatalogItem[],
};

const filterTabs = ["Tất cả", "Landing", "Portfolio", "Business", "Event"] as const;

/* ─────────────────────────── Marquee Data ─────────────────────────── */

const showcaseNames = [
  "Nebula Landing",
  "Folio Minimal",
  "Enterprise Pro",
  "EventX",
  "SaaS Launch",
  "Creative Studio",
  "Starter Kit",
  "Blog Starter",
  "Agency Pro",
  "E-Commerce Starter",
];

/* ─────────────────────────── Component ─────────────────────────── */

export function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState<string>("Tất cả");
  const marqueeRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () =>
      activeFilter === "Tất cả"
        ? catalogContent.items
        : catalogContent.items.filter((i) => i.category === activeFilter),
    [activeFilter],
  );

  /* ── GSAP marquee ── */
  const duplicatedShowcase = [...showcaseNames, ...showcaseNames, ...showcaseNames, ...showcaseNames];

  useGSAP(
    () => {
      gsap.to(".catalog-marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    },
    { scope: marqueeRef },
  );

  return (
    <Section id="catalog">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-violet/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-cosmic-a/8 blur-[140px] pointer-events-none" />

      <Container className="relative">
        {/* ── Header ── */}
        <div className="mb-14 md:mb-16 text-center">
          <SectionHeading
            eyebrow={catalogContent.eyebrow}
            eyebrowColor="violet"
            title={catalogContent.title}
            italicWord={catalogContent.italicWord}
            align="center"
          />
          <Typography
            variant="body"
            color="ghost"
            className="opacity-65 mt-6 mx-auto !text-[1rem] !leading-[1.65] max-w-[60ch]"
          >
            {catalogContent.description}
          </Typography>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filterTabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`
                relative px-5 py-2.5 rounded-xl text-[13px] font-sans font-semibold
                transition-colors duration-200 outline-none
                focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight
                ${
                  activeFilter === tab
                    ? "text-whisper"
                    : "text-slate hover:text-ghost hover:bg-whisper/[0.06]"
                }
              `}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {activeFilter === tab && (
                <motion.span
                  layoutId="catalog-tab-indicator"
                  className="absolute inset-0 rounded-xl bg-violet/15 border border-violet/30"
                  style={{ boxShadow: `0 0 20px ${colorMap.violet.glow}` }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </motion.button>
          ))}
        </div>

        {/* ── Catalog Grid ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)", transition: { duration: 0.3 } }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <CatalogCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── GSAP Horizontal Showcase Strip ── */}
        <div className="mb-14">
          <Typography
            variant="monoEyebrow"
            className="!text-[10px] text-violet !tracking-[0.22em] font-normal text-center mb-5"
          >
            Template Showcase
          </Typography>

          <div
            ref={marqueeRef}
            className="relative overflow-hidden rounded-2xl border border-whisper/[0.06] bg-midnight/60 backdrop-blur-md"
          >
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-midnight to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-midnight to-transparent z-10 pointer-events-none" />

            <div className="py-5 flex items-center gap-4 w-max catalog-marquee-track">
              {duplicatedShowcase.map((name, idx) => {
                const colors: ColorKey[] = ["violet", "cosmic", "indigo", "mauve", "steel"];
                const color = colors[idx % colors.length];
                const c = colorMap[color];
                return (
                  <div
                    key={`${name}-${idx}`}
                    className={`flex-shrink-0 px-5 py-3 rounded-xl border backdrop-blur-sm ${c.border} ${c.bg} transition-all duration-300 hover:scale-105 cursor-default`}
                  >
                    <Typography
                      as="span"
                      variant="monoEyebrow"
                      className={`!text-[11px] ${c.text} !tracking-[0.08em] normal-case font-medium whitespace-nowrap`}
                    >
                      {name}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center">
          <Magnetic>
            <Link to="/templates">
              <motion.span
                className="
                  group inline-flex items-center gap-2.5 rounded-xl
                  border border-violet/35 bg-violet/10 px-7 py-3.5
                  text-[14px] font-semibold text-violet font-sans
                  transition-all duration-300
                  hover:bg-violet/20 hover:border-violet/50 hover:shadow-[0_0_30px_rgba(175,80,255,0.2)]
                  active:scale-95
                  focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight
                  outline-none cursor-pointer
                "
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Xem tất cả template
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.span>
            </Link>
          </Magnetic>
        </div>
      </Container>
    </Section>
  );
}

/* ─────────────────────────── Card Sub-Component ─────────────────────────── */

function CatalogCard({ item }: { item: CatalogItem }) {
  const c = colorMap[item.color];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group h-full cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Spotlight border on hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${c.glow}, transparent 40%)`,
        }}
      />

      <Surface
        variant="frost"
        className="relative h-full flex flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)]"
      >
        {/* Popular badge */}
        {item.popular && (
          <motion.div
            className="absolute top-4 right-4 z-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#af50ff]/20 border border-[#af50ff]/40 text-[#af50ff]">
              <Flame size={11} />
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                HOT
              </span>
            </span>
          </motion.div>
        )}

        {/* Category badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] border backdrop-blur-md ${c.border} ${c.bg} ${c.text}`}
            style={{
              fontFamily: fonts.mono,
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {item.category}
          </span>
        </div>

        {/* Name */}
        <Typography
          as="h3"
          variant="subheading"
          className="text-whisper !text-[1.15rem] font-display italic font-normal tracking-[-0.015em] mb-2"
        >
          {item.name}
        </Typography>

        {/* Description */}
        <Typography variant="bodySm" color="ghost" className="opacity-60 !text-[13px] !leading-[1.6] mb-5">
          {item.description}
        </Typography>

        {/* Features */}
        <div className="flex-1 mb-5">
          <ul className="flex flex-col gap-1.5">
            {item.features.map((feat, i) => (
              <motion.li
                key={feat}
                className="flex items-center gap-2 text-ghost/70"
                initial={{ opacity: 0, x: -8 }}
                animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.6, x: 0 }}
                transition={{ delay: hovered ? i * 0.06 : 0, duration: 0.3 }}
              >
                <Check size={12} className={c.text} />
                <span
                  style={{
                    fontFamily: fonts.body,
                    fontSize: "12.5px",
                    lineHeight: 1.5,
                  }}
                >
                  {feat}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-whisper/[0.08]">
          <Typography
            as="span"
            variant="monoEyebrow"
            className={`!text-[14px] ${c.text} !tracking-[0.02em] normal-case font-bold`}
          >
            {item.price}
          </Typography>

          <motion.button
            className={`
              inline-flex items-center gap-1.5 px-4 py-2 rounded-lg
              text-[12px] font-sans font-semibold
              border transition-all duration-200 outline-none cursor-pointer
              ${c.border} ${c.bg} ${c.text}
              hover:brightness-125
              focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight
            `}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            Xem chi tiết
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </Surface>
    </div>
  );
}
