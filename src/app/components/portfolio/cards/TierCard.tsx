"use client";

import { useRef, useCallback } from "react";
import { motion, useInView, type Variants } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Sparkles, Zap, Layers, ArrowUpRight } from "lucide-react";
import { colorMap, gradients, type ColorKey } from "@/shared/lib/tokens";
import { fadeUp } from "@/shared/lib/motion";
import { pricingContent } from "@/features/pricing/data/pricing.data";
import { Surface, Typography } from "@/shared/ui";

/* ─────────────────────── Types ─────────────────────── */

export type Tier = {
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
};

/* ─────────────────── Icon Mapping ──────────────────── */

const iconsMap: Record<string, React.ReactNode> = {
  Basic: <Zap size={16} />,
  Standard: <Layers size={16} />,
  Premium: <Sparkles size={16} />,
};

/* ────────────── Motion Variant Helpers ─────────────── */

const includeItemVariants: Variants = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const timelineFlipVariants: Variants = {
  hidden: { rotateX: -90, opacity: 0 },
  show: {
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const priceRevealVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const ctaArrowVariants: Variants = {
  rest: { x: 0, y: 0 },
  hover: {
    x: 3,
    y: -3,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

/* ──────────────── Main TierCard Component ─────────── */

export function TierCard({ tier }: { tier: Tier }) {
  const c = colorMap[tier.color];
  const isRec = tier.recommended;
  const icon = iconsMap[tier.name];

  /* ── Refs ── */
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const iconBoxRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-60px" });

  /* ── GSAP 3D Tilt + Spotlight ── */
  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalised -1 → 1
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      // 3D tilt — max ±5 degrees
      gsap.to(card, {
        rotateY: normX * 5,
        rotateX: normY * -5,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Update CSS custom properties for spotlight-border-card
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      // Move the radial spotlight gradient
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          background: `radial-gradient(320px circle at ${x}px ${y}px, ${c.glow}, transparent 70%)`,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });

      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: cardRef });

  /* ── Icon box hover rotation via GSAP ── */
  const handleIconEnter = useCallback(() => {
    if (iconBoxRef.current) {
      gsap.to(iconBoxRef.current, {
        rotate: 12,
        scale: 1.1,
        duration: 0.35,
        ease: "back.out(2)",
      });
    }
  }, []);

  const handleIconLeave = useCallback(() => {
    if (iconBoxRef.current) {
      gsap.to(iconBoxRef.current, {
        rotate: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    }
  }, []);

  return (
    <motion.div
      ref={inViewRef}
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="h-full"
      style={{ perspective: 800 }}
    >
      <div
        ref={cardRef}
        className={`relative h-full will-change-transform spotlight-border-card ${
          isRec ? "rarity-epic" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── Radial spotlight overlay ── */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1] opacity-0"
          style={{ mixBlendMode: "screen" }}
        />

        <Surface
          variant={isRec ? "glow" : "frost"}
          className="relative p-6 md:p-7 flex flex-col h-full overflow-hidden"
          style={{
            background: isRec ? gradients.cosmicB : undefined,
            border: isRec ? `1px solid ${c.solid}` : undefined,
            boxShadow: isRec
              ? `0 0 60px ${c.glow}, 0 24px 64px -16px rgba(64,24,96,0.7), 0 1px 0 rgba(247,249,250,0.1) inset`
              : undefined,
          }}
        >
          {/* ── Recommended badge ── */}
          {isRec && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.3,
              }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] text-whisper bg-violet violet-glow"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.22em",
                fontWeight: 400,
                textTransform: "uppercase",
              }}
            >
              {pricingContent.recommendedLabel}
            </motion.div>
          )}

          {/* ── Header: icon + timeline ── */}
          <div className="flex items-center justify-between mb-4">
            <div
              ref={iconBoxRef}
              onMouseEnter={handleIconEnter}
              onMouseLeave={handleIconLeave}
              className={`w-10 h-10 rounded-lg ${c.bg} border ${c.border} ${c.text} flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors duration-200`}
            >
              {icon}
            </div>

            {/* Timeline badge with flip animation on mount */}
            <motion.span
              variants={timelineFlipVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className={`text-[10px] px-2.5 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.2em",
                fontWeight: 400,
                textTransform: "uppercase",
                transformOrigin: "center bottom",
              }}
            >
              {tier.timeline}
            </motion.span>
          </div>

          {/* ── Tier name + tagline ── */}
          <Typography
            as="h3"
            variant="heading"
            className={`mb-1 !text-[1.75rem] italic font-normal !tracking-[-0.025em] ${
              isRec ? "gradient-text-violet" : "text-whisper"
            }`}
          >
            {tier.name}
          </Typography>
          <Typography
            variant="body"
            color="ghost"
            className="opacity-60 mb-5 !text-[0.95rem] !leading-[1.45]"
          >
            {tier.tagline}
          </Typography>

          {/* ── Price block with counting reveal ── */}
          <div className="mb-5 pb-5 border-b border-whisper/10">
            <motion.div
              variants={priceRevealVariants}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              <Typography
                as="div"
                variant="display"
                className={`!text-[2.25rem] !leading-[1] !tracking-[-0.035em] font-light ${
                  isRec ? "gradient-text-violet counter-glow" : "text-whisper"
                }`}
              >
                {tier.price}
              </Typography>
            </motion.div>
            <Typography
              variant="monoEyebrow"
              className="text-slate mt-1.5 !text-[10px] !tracking-[0.15em] uppercase"
            >
              {tier.priceNote}
            </Typography>
          </div>

          {/* ── Audience ── */}
          <Typography
            variant="monoEyebrow"
            className="!text-[11px] text-ghost/55 mb-4 !tracking-[0.1em] normal-case"
          >
            <span className={`${c.text} uppercase tracking-[0.2em]`}>FOR</span>{" "}
            · {tier.audience}
          </Typography>

          {/* ── Includes list with stagger ── */}
          <ul className="flex flex-col gap-2.5 mb-6 flex-1">
            {tier.includes.map((item, i) => (
              <motion.li
                key={item}
                custom={i}
                variants={includeItemVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="flex items-start gap-2.5 text-[13px] text-ghost/85 font-sans"
                style={{ lineHeight: 1.5 }}
              >
                <Check
                  size={14}
                  className={`${c.text} mt-0.5 flex-shrink-0`}
                />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* ── Excludes ── */}
          {tier.excludes && (
            <div className="mb-6 pt-4 border-t border-whisper/[0.06]">
              <Typography
                variant="monoEyebrow"
                className="text-slate mb-2 !text-[10px] !tracking-[0.2em] uppercase font-normal"
              >
                {pricingContent.excludesLabel}
              </Typography>
              <Typography
                variant="body"
                className="text-ghost/55 !text-[11.5px] !leading-[1.65]"
              >
                {tier.excludes.join(" · ")}
              </Typography>
            </div>
          )}

          {/* ── CTA button ── */}
          <motion.a
            href="#contact"
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className={`
              group relative inline-flex items-center justify-center gap-2
              px-4 py-3 rounded-lg text-[13px] font-sans font-bold tracking-[0.02em]
              cursor-pointer overflow-hidden
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60
              focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
              ${
                isRec
                  ? "bg-violet text-whisper hover:bg-[#c06aff] active:bg-[#9b3ee0]"
                  : `frost-strong ${c.text} hover:border-violet/50 active:bg-white/[0.06]`
              }
            `}
          >
            {/* Shimmer sweep overlay on hover */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 shimmer-sweep pointer-events-none transition-opacity duration-300"
              aria-hidden="true"
            />

            {/* Button scale lift on hover */}
            <motion.span
              className="relative z-[1] inline-flex items-center gap-2"
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.03 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {tier.cta}
              <motion.span
                variants={ctaArrowVariants}
                className="inline-flex"
              >
                <ArrowUpRight size={14} />
              </motion.span>
            </motion.span>
          </motion.a>
        </Surface>
      </div>
    </motion.div>
  );
}
