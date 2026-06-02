import { motion } from "motion/react";
import { fonts, colorMap, gradients } from "../../lib/tokens";
import { identityCards, type IdentityCardData } from "../../data/portfolio";
import { SectionHeading } from "../shared/SectionHeading";
import { AnimatedSection } from "../shared/AnimatedSection";
import { useTilt } from "../../hooks/useTilt";
import { fadeUp, staggerContainer } from "../../lib/motion";

function IdentityCard({ card, index }: { card: IdentityCardData; index: number }) {
  const tilt = useTilt(5);
  const c = colorMap[card.color];
  const useGradient = index === 1;

  return (
    <motion.div variants={fadeUp}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className={`group relative p-7 h-full cursor-default overflow-hidden ${useGradient ? "" : "frost"}`}
        style={{
          borderRadius: "19.2px",
          transition: "transform 0.25s ease, box-shadow 0.3s ease",
          background: useGradient ? gradients.cosmicB : undefined,
          boxShadow: useGradient
            ? "0 24px 64px -16px rgba(64,24,96,0.6), 0 1px 0 rgba(247,249,250,0.1) inset"
            : "0 1px 0 rgba(247,249,250,0.06) inset",
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
            {card.icon}
          </div>
          <div className="text-right">
            <div
              className="text-[9px] text-[#6b6b6b] mb-0.5"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.22em" }}
            >
              {card.stat.label}
            </div>
            <div
              className={`text-xl ${c.text}`}
              style={{ fontFamily: fonts.display, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em" }}
            >
              {card.stat.value}
            </div>
          </div>
        </div>

        <h3
          className="text-3xl text-[#f7f9fa] mb-1"
          style={{ fontFamily: fonts.display, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.025em" }}
        >
          {card.title}
        </h3>
        <p
          className={`text-[11px] mb-4 ${c.text}`}
          style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
        >
          {card.subtitle}
        </p>
        <p
          className="text-[#f0f0f0]/75 mb-5"
          style={{ fontFamily: fonts.body, fontSize: "0.95rem", lineHeight: 1.6 }}
        >
          {card.text}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span
              key={t}
              className={`px-2.5 py-0.5 text-[10px] rounded-full ${c.bg} ${c.text} border ${c.border} backdrop-blur-sm`}
              style={{ fontFamily: fonts.mono, fontWeight: 400 }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function IdentitySection() {
  return (
    <AnimatedSection id="identity" className="py-24 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <SectionHeading
            eyebrow="Three sides of me"
            eyebrowColor="violet"
            title="Who I am,"
            italicWord="honestly."
            description="Not one neat label — three real ones, stacked. Each shapes how I think and ship today."
          />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-5"
        >
          {identityCards.map((card, i) => (
            <IdentityCard key={card.title} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
