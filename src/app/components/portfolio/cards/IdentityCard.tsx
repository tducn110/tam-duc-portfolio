import { motion } from "motion/react";
import { colorMap, gradients } from "@/shared/lib/tokens";
import type { IdentityCardData } from "@/features/portfolio/data/portfolio.data";
import { useTilt } from "../../../hooks/useTilt";
import { fadeUp } from "@/shared/lib/motion";
import { Surface, Typography } from "@/shared/ui";
import { renderIcon } from "../../../lib/iconMap";

export function IdentityCard({ card, index }: { card: IdentityCardData; index: number }) {
  const tilt = useTilt(5);
  const c = colorMap[card.color];
  const useGradient = index === 1;

  return (
    <motion.div variants={fadeUp}>
      <Surface
        variant={useGradient ? "glow" : "frost"}
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group relative p-7 h-full cursor-default overflow-hidden spotlight-border-card"
        style={{
          transition: "transform 0.25s ease, box-shadow 0.3s ease",
          background: useGradient ? gradients.cosmicB : undefined,
          boxShadow: useGradient
            ? "0 24px 64px -16px rgba(64,24,96,0.6), 0 1px 0 rgba(247,249,250,0.1) inset"
            : undefined,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${c.solid}, transparent)` }}
        />
        <div
          className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
          style={{ background: c.glow }}
        />

        <div className="relative flex items-start justify-between mb-5">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.bg} border ${c.border} ${c.text} transition-transform duration-300 group-hover:rotate-6 backdrop-blur-md`}
          >
            {renderIcon(card.iconName, 22)}
          </div>
          <div className="text-right">
            <Typography variant="monoEyebrow" className="!text-[9px] text-slate mb-0.5 !tracking-[0.22em] normal-case">
              {card.stat.label}
            </Typography>
            <Typography as="div" variant="heading" className={`!text-xl italic font-normal !tracking-[-0.02em] ${c.text}`}>
              {card.stat.value}
            </Typography>
          </div>
        </div>

        <Typography as="h3" variant="subheading" className="text-xl text-whisper mb-1 font-display italic font-normal tracking-[-0.015em] relative">
          {card.title}
        </Typography>
        <Typography variant="monoEyebrow" className="!text-[10px] text-violet mb-4 relative !tracking-[0.2em] font-normal">
          {card.subtitle}
        </Typography>

        <Typography variant="bodySm" color="ghost" className="opacity-70 mb-6 !leading-[1.6] relative !text-[0.92rem]">
          {card.text}
        </Typography>

        <div className="flex flex-wrap gap-1.5 relative">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full bg-midnight/30 text-ghost/70 border border-whisper/10 font-mono font-normal"
            >
              {tag}
            </span>
          ))}
        </div>
      </Surface>
    </motion.div>
  );
}
