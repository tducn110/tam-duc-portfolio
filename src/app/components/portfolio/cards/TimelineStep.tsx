import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { colorMap } from "@/shared/lib/tokens";
import { type TimelineStep as TimelineStepType } from "@/features/portfolio/data/portfolio.data";
import { Surface, Typography } from "@/shared/ui";
import { useTilt } from "@/app/hooks/useTilt";

export function TimelineStep({ step, index, total }: { step: TimelineStepType; index: number; total: number }) {
  const c = colorMap[step.color];
  const isRight = index % 2 === 0;
  const { ref, onMouseMove, onMouseLeave } = useTilt(3);
  const stepRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    isRight ? ["28px", "-24px"] : ["18px", "-34px"]
  );

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex items-start gap-5 md:gap-0 ${
        isRight ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6">
        <div
          className={`w-10 h-10 rounded-xl frost-strong flex items-center justify-center border ${c.border} transition-shadow duration-500 group-hover:shadow-[0_0_30px_rgba(175,80,255,0.4)]`}
        >
          <div className={`w-2.5 h-2.5 rounded-full ${c.bar} animate-pulse`} style={{ boxShadow: `0 0 12px ${c.solid}` }} />
        </div>
        
        {/* Connecting Line (Desktop only) */}
        <div 
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 ${
            isRight ? "-right-8" : "-left-8"
          }`}
          style={{ 
            background: `linear-gradient(${isRight ? '90deg' : '270deg'}, ${c.solid}, transparent)` 
          }}
        />
      </div>
      <motion.div
        style={{ y: cardY }}
        className={`md:w-[calc(50%-2.5rem)] ${
          isRight ? "md:mr-auto md:pr-6" : "md:ml-auto md:pl-6"
        } flex-1 md:flex-none`}
      >
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="will-change-transform"
        >
          <Surface variant="frost" className="p-6 relative overflow-hidden spotlight-border-card transition-colors duration-500 group-hover:bg-midnight/60">
            <div
              className="absolute top-0 left-0 w-1 h-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(180deg, ${c.solid}, transparent)` }}
            />
            <div className="flex items-baseline justify-between mb-3">
              <Typography
                as="span"
                variant="monoEyebrow"
                className={`!text-[10px] ${c.text} px-2.5 py-1 rounded-full ${c.bg} border ${c.border} uppercase !tracking-[0.2em] font-bold`}
              >
                {step.time}
              </Typography>
              <Typography
                as="span"
                variant="monoEyebrow"
                className="!text-[10px] text-slate normal-case !tracking-[0.15em]"
              >
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </Typography>
            </div>
            <Typography
              as="h3"
              variant="heading"
              className="text-whisper mb-2 !text-3xl italic font-normal !tracking-[-0.025em] transition-colors duration-300 group-hover:text-neon-glow-violet"
            >
              {step.phase}
            </Typography>
            <Typography
              variant="body"
              color="ghost"
              className="opacity-70 group-hover:opacity-90 transition-opacity duration-300 !text-[0.95rem] !leading-[1.6]"
            >
              {step.text}
            </Typography>
          </Surface>
        </div>
      </motion.div>
      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </motion.div>
  );
}
