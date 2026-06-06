import { motion } from "motion/react";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import { gradients } from "@/shared/lib/tokens";
import { links } from "../../lib/links";
import { Eyebrow } from "@/shared/ui";
import { useReveal } from "../../hooks/useReveal";
import { SplitText } from "../shared/SplitText";
import { Magnetic } from "../shared/Magnetic";
import { ctaContent } from "../../data/cta";

import { ContactForm } from "@/features/contact/components/ContactForm";
import { Section, Container, Surface, Typography } from "@/shared/ui";

export function CTASection() {
  const { ref, visible } = useReveal();

  return (
    <Section id="contact">
      <Container ref={ref} size="wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Surface
            variant="glow"
            className="relative overflow-hidden border border-violet/25"
            style={{
              background: gradients.cosmicB,
              boxShadow: "0 0 80px rgba(175,80,255,0.25), 0 32px 80px -24px rgba(64,24,96,0.7), 0 1px 0 rgba(247,249,250,0.1) inset",
            }}
          >
            <div
              className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full opacity-60 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(175,80,255,0.4), transparent 60%)" }}
            />
            <div
              className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] rounded-full opacity-60 pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(108,75,214,0.35), transparent 60%)" }}
            />

            <div className="relative">
              <Eyebrow color="violet">{ctaContent.eyebrow}</Eyebrow>
              
              <div className="grid md:grid-cols-2 gap-12 items-center text-left mt-6">
                <div className="space-y-6">
                  <Typography
                    as="h2"
                    variant="display"
                    className="text-whisper !text-[clamp(2rem,5vw,3.5rem)] !leading-[1.05] !tracking-[-0.04em]"
                  >
                    <SplitText variant="interactive" duration={0.8} stagger={0.035}>
                      {ctaContent.headingPart1}
                    </SplitText>{" "}
                    <span className="text-violet drop-shadow-[0_0_15px_rgba(175,80,255,0.45)] inline-block">
                      <SplitText variant="interactive" duration={0.8} stagger={0.035} delay={0.2}>
                        {ctaContent.headingHighlight}
                      </SplitText>
                    </span>
                  </Typography>
                  <Typography
                    variant="body"
                    color="ghost"
                    className="opacity-70 !text-[1.05rem] !leading-[1.65]"
                  >
                    {ctaContent.description}
                  </Typography>

                  <div className="flex flex-wrap gap-3">
                    <Magnetic>
                      <a
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-violet text-whisper text-[13px] hover:bg-violet/90 transition-all violet-glow font-sans font-bold tracking-[0.02em]"
                      >
                        <Github size={14} /> {ctaContent.btnGithub}
                        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href={links.mailto}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg frost-strong text-whisper text-[13px] hover:border-violet/50 transition-all font-sans font-medium"
                      >
                        <Mail size={14} /> {ctaContent.btnMail}
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a
                        href="/admin"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg frost-strong text-violet text-[13px] hover:border-violet/50 transition-all font-sans font-medium"
                      >
                        {ctaContent.btnAdmin}
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </Surface>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-whisper/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span
                className="relative w-8 h-8 rounded-lg flex items-center justify-center text-whisper"
                style={{ background: "linear-gradient(135deg, var(--color-deep-violet) 0%, var(--color-cosmic-violet-a) 100%)" }}
              >
                <Typography as="span" variant="display" className="!text-[12px] italic !tracking-[-0.04em] font-normal">
                  {ctaContent.logoText}
                </Typography>
              </span>
              <Typography variant="monoEyebrow" className="!text-[11px] text-ghost/60 !tracking-[0.12em] normal-case">
                <span className="text-whisper font-bold">
                  {ctaContent.footerName}
                </span>
                {ctaContent.footerSub}
              </Typography>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate hover:text-violet transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href={`mailto:${links.email}`}
                className="text-slate hover:text-violet transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
