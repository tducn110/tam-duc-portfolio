import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { timeline } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "../../data/sections";
import { SectionHeading } from "@/shared/ui";
import { Section, Container } from "@/shared/ui";
import { TimelineStep } from "./cards/TimelineStep";

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="timeline" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/95 via-midnight/72 to-midnight/96" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(175,80,255,0.22),transparent_42%)]" />
      </div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-[#4823b4]/15 blur-[140px] pointer-events-none" />
      <Container size="wide" className="relative">
        <div className="mb-14 md:mb-16 text-center max-w-[800px] mx-auto">
          <SectionHeading
            eyebrow={sectionsContent.timeline.eyebrow}
            eyebrowColor="cosmic"
            title={sectionsContent.timeline.title}
            italicWord={sectionsContent.timeline.italicWord}
            align="center"
            description={sectionsContent.timeline.description}
          />
        </div>
        <div ref={containerRef} className="relative mx-auto max-w-[800px]">
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-whisper/[0.08]" />
          <motion.div
            className="absolute left-[20px] md:left-1/2 top-0 w-px origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(180deg, var(--color-deep-violet), var(--color-cosmic-violet-a), #401860)",
              boxShadow: "0 0 12px rgba(175,80,255,0.5)",
            }}
          />
          <div className="flex flex-col gap-10">
            {timeline.map((step, i) => (
              <TimelineStep key={step.phase} step={step} index={i} total={timeline.length} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
