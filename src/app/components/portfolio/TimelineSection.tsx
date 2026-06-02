import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fonts, colorMap } from "../../lib/tokens";
import { timeline, type TimelineStep } from "../../data/portfolio";
import { SectionHeading } from "../shared/SectionHeading";
import { AnimatedSection } from "../shared/AnimatedSection";

function Step({ step, index, total }: { step: TimelineStep; index: number; total: number }) {
  const c = colorMap[step.color];
  const isRight = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-5 md:gap-0 ${
        isRight ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6">
        <div
          className={`w-10 h-10 rounded-xl frost-strong flex items-center justify-center border ${c.border}`}
          style={{ boxShadow: `0 0 24px ${c.glow}` }}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${c.bar}`} style={{ boxShadow: `0 0 8px ${c.solid}` }} />
        </div>
      </div>
      <div
        className={`md:w-[calc(50%-2.5rem)] ${
          isRight ? "md:mr-auto md:pr-6" : "md:ml-auto md:pl-6"
        } flex-1 md:flex-none`}
      >
        <div
          className="frost p-6 relative overflow-hidden"
          style={{
            borderRadius: "19.2px",
            boxShadow: "0 1px 0 rgba(247,249,250,0.06) inset",
          }}
        >
          <div
            className="absolute top-0 left-0 w-1 h-full"
            style={{ background: `linear-gradient(180deg, ${c.solid}, transparent)` }}
          />
          <div className="flex items-baseline justify-between mb-3">
            <span
              className={`text-[10px] ${c.text} px-2.5 py-1 rounded-full ${c.bg} border ${c.border}`}
              style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
            >
              {step.time}
            </span>
            <span
              className="text-[10px] text-[#6b6b6b]"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.15em" }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3
            className="text-3xl text-[#f7f9fa] mb-2"
            style={{ fontFamily: fonts.display, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.025em" }}
          >
            {step.phase}
          </h3>
          <p
            className="text-[#f0f0f0]/70"
            style={{ fontFamily: fonts.body, fontSize: "0.95rem", lineHeight: 1.6 }}
          >
            {step.text}
          </p>
        </div>
      </div>
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </motion.div>
  );
}

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <AnimatedSection id="timeline" className="py-24 md:py-32 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#4823b4]/15 blur-[140px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative">
        <div className="mb-14 md:mb-16 text-center">
          <SectionHeading
            eyebrow="The journey · 2022 → now"
            eyebrowColor="cosmic"
            title="Scattered ideas to"
            italicWord="shipped systems."
            align="center"
            description="The actual arc — from no structure to thinking in products."
          />
        </div>
        <div ref={containerRef} className="relative">
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-[#f7f9fa]/[0.08]" />
          <motion.div
            className="absolute left-[20px] md:left-1/2 top-0 w-px origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(180deg, #af50ff, #6c4bd6, #401860)",
              boxShadow: "0 0 12px rgba(175,80,255,0.5)",
            }}
          />
          <div className="flex flex-col gap-10">
            {timeline.map((step, i) => (
              <Step key={step.phase} step={step} index={i} total={timeline.length} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
