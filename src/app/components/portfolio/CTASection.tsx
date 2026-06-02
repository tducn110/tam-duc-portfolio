import { motion } from "motion/react";
import { Github, Mail, ArrowUpRight } from "lucide-react";
import { fonts, gradients } from "../../lib/tokens";
import { links } from "../../lib/links";
import { Eyebrow } from "../shared/Chip";
import { useReveal } from "../../hooks/useReveal";
import { SplitText } from "../shared/SplitText";
import { Magnetic } from "../shared/Magnetic";

import { ContactForm } from "@/features/contact/components/ContactForm";

export function CTASection() {
  const { ref, visible } = useReveal();

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-8 md:p-14 overflow-hidden border border-[#af50ff]/25"
          style={{
            borderRadius: "32px",
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
            <Eyebrow color="violet">Let&apos;s connect</Eyebrow>
            
            <div className="grid md:grid-cols-2 gap-12 items-center text-left mt-6">
              {/* Left Column: text and links */}
              <div className="space-y-6">
                <h2
                  className="text-[#f7f9fa]"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 300,
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                  }}
                >
                  <SplitText variant="interactive" duration={0.8} stagger={0.035}>
                    Want to see what I&apos;m
                  </SplitText>{" "}
                  <span className="text-[#af50ff] drop-shadow-[0_0_15px_rgba(175,80,255,0.45)] inline-block">
                    <SplitText variant="interactive" duration={0.8} stagger={0.035} delay={0.2}>
                      building next?
                    </SplitText>
                  </span>
                </h2>
                <p
                  className="text-[#f0f0f0]/70"
                  style={{ fontFamily: fonts.body, fontSize: "1.05rem", lineHeight: 1.65 }}
                >
                  Explore my projects, follow my GitHub, or reach out for
                  collaboration, internship, or just to talk tech and strategy.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Magnetic>
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#af50ff] text-[#f7f9fa] text-[13px] hover:bg-[#af50ff]/90 transition-all violet-glow"
                      style={{ fontFamily: fonts.body, fontWeight: 700, letterSpacing: "0.02em" }}
                    >
                      <Github size={14} /> GitHub
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={links.mailto}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg frost-strong text-[#f7f9fa] text-[13px] hover:border-[#af50ff]/50 transition-all"
                      style={{ fontFamily: fonts.body, fontWeight: 500 }}
                    >
                      <Mail size={14} /> Direct Mail
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href="/admin"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg frost-strong text-[#af50ff] text-[13px] hover:border-[#af50ff]/50 transition-all"
                      style={{ fontFamily: fonts.body, fontWeight: 500 }}
                    >
                      Admin Leads
                    </a>
                  </Magnetic>
                </div>
              </div>

              {/* Right Column: the gorgeous reactive ContactForm */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-[#f7f9fa]/[0.08]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span
                className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#f7f9fa]"
                style={{ background: "linear-gradient(135deg, #af50ff 0%, #6c4bd6 100%)" }}
              >
                <span
                  style={{
                    fontFamily: fonts.display,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "12px",
                    letterSpacing: "-0.04em",
                  }}
                >
                  td
                </span>
              </span>
              <div
                className="text-[11px] text-[#f0f0f0]/60"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.12em" }}
              >
                <span className="text-[#f7f9fa]" style={{ fontWeight: 700 }}>
                  TAM DUC
                </span>{" "}
                · DEVELOPER / GAMER / AI-ERA BUILDER · © 2026
              </div>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b6b6b] hover:text-[#af50ff] transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href={`mailto:${links.email}`}
                className="text-[#6b6b6b] hover:text-[#af50ff] transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
