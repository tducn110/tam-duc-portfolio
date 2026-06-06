import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ArrowUpRight, Telescope, Eye, Sparkles } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/shared/ui";
import { staggerContainer, fadeUp } from "@/shared/lib/motion";
import { pricingContent } from "@/features/pricing/data/pricing.data";
import { Section, Container, Surface, Typography } from "@/shared/ui";
import { TierCard } from "./cards/TierCard";
import { Magnetic } from "../shared/Magnetic";
import { colorMap } from "@/shared/lib/tokens";
import { RefractorScene } from "./RefractorScene";

// ─── Animated Counter Component ────────────────────────────────────────────────
function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
    </motion.span>
  );
}

// ─── Floating Lens Flare Element ───────────────────────────────────────────────
function LensFlare() {
  return (
    <div className="absolute pointer-events-none z-0">
      <motion.div
        className="w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(175,80,255,0.25) 0%, rgba(108,75,214,0.1) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ─── Addon Row with hover animation ────────────────────────────────────────────
function AddonRow({ label, price, index }: { label: string; price: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4, backgroundColor: "rgba(175,80,255,0.04)" }}
      className="flex items-baseline justify-between gap-3 py-2.5 px-2 -mx-2 rounded-lg border-b border-dashed border-whisper/[0.08] cursor-default transition-colors"
    >
      <Typography as="span" variant="body" className="text-ghost/85 !text-[13px] font-medium">
        {label}
      </Typography>
      <Typography
        as="span"
        variant="monoEyebrow"
        className="text-violet !text-[12px] whitespace-nowrap normal-case font-normal"
      >
        {price}
      </Typography>
    </motion.div>
  );
}

// ─── Main Pricing Section ──────────────────────────────────────────────────────
export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // GSAP parallax effects on scroll
  useGSAP(
    () => {
      // Parallax blobs
      gsap.to(".pricing-blob-1", {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(".pricing-blob-2", {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Heading reveal
      gsap.fromTo(
        ".pricing-heading-reveal",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <Section
      id="pricing"
      className="py-24 md:py-36 relative overflow-hidden"
      ref={sectionRef as any}
    >
      {/* ─── Decorative background blobs ─── */}
      <div className="pricing-blob-1 absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-cosmic-a/12 blur-[160px] pointer-events-none" />
      <div className="pricing-blob-2 absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-violet/10 blur-[140px] pointer-events-none" />

      {/* Scanline overlay for cybernetic feel */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

      <Container className="relative z-10">
        {/* ─── Section Heading ─── */}
        <div ref={headingRef} className="mb-16 md:mb-20 text-center pricing-heading-reveal">
          <SectionHeading
            eyebrow={pricingContent.eyebrow}
            eyebrowColor="cosmic"
            title={pricingContent.title}
            italicWord={pricingContent.italicWord}
            align="center"
          />
          <Typography
            variant="body"
            color="ghost"
            className="opacity-65 mt-6 mx-auto !text-[1rem] !leading-[1.65] max-w-[60ch]"
          >
            {pricingContent.description}
          </Typography>

          {/* Decorative lens separator */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-violet/40" />
            <Telescope size={16} className="text-violet animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet/40" />
          </motion.div>
        </div>

        {/* ─── 3D Refractor Telescope Hero ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto mb-16 -mt-8 relative z-0"
        >
          <RefractorScene />
        </motion.div>

        {/* ─── Pricing Cards Grid ─── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-5 md:gap-6 mb-16"
        >
          {pricingContent.tiers.map((t, i) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </motion.div>

        {/* ─── Add-ons Panel ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Surface variant="frost" className="p-6 md:p-8 relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 shimmer-sweep pointer-events-none opacity-40" />

            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <Typography
                  variant="monoEyebrow"
                  className="text-violet !text-[10px] !tracking-[0.22em] uppercase font-normal"
                >
                  {pricingContent.addonEyebrow}
                </Typography>
                <Typography
                  variant="monoEyebrow"
                  className="text-slate hidden md:inline !text-[10px] !tracking-[0.12em] normal-case"
                >
                  {pricingContent.addonSub}
                </Typography>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-0">
                {pricingContent.addons.map((a, i) => (
                  <AddonRow key={a.label} label={a.label} price={a.price} index={i} />
                ))}
              </div>
              <Typography
                variant="body"
                className="text-slate mt-5 !text-[11.5px] !leading-[1.6]"
              >
                {pricingContent.bottomNote}
              </Typography>
            </div>
          </Surface>
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Magnetic>
            <Link
              to="/templates"
              className="group relative overflow-hidden inline-flex items-center gap-2.5 rounded-xl border border-violet/35 bg-violet/10 px-6 py-3.5 text-[13px] font-semibold text-violet transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet/15 hover:border-violet/60 hover:shadow-[0_0_30px_rgba(175,80,255,0.2)] focus:outline-none focus:ring-2 focus:ring-violet/50 focus:ring-offset-2 focus:ring-offset-[#090909] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-violet/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                <Eye size={14} />
                Browse template catalog
              </span>
              <ArrowUpRight
                size={14}
                className="relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Magnetic>

          <Magnetic>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg text-ghost/70 hover:text-violet text-[13px] transition-all hover:bg-white/5 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-violet/30 active:scale-[0.97]"
            >
              <Sparkles size={14} className="group-hover:animate-pulse" />
              Yêu cầu tuỳ chỉnh riêng
            </a>
          </Magnetic>
        </motion.div>
      </Container>
    </Section>
  );
}
