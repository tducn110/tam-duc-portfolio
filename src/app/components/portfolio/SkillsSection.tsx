import { motion } from "motion/react";
import { fonts, colorMap, gradients } from "../../lib/tokens";
import {
  skills,
  techChips,
  tierDots,
  specialTraits,
  type Tier,
} from "../../data/portfolio";
import { links } from "../../lib/links";
import { SectionHeading } from "../shared/SectionHeading";
import { AnimatedSection } from "../shared/AnimatedSection";
import { staggerContainer, fadeUp } from "../../lib/motion";
import type { ColorKey } from "../../lib/tokens";
import { LinuxTerminal } from "./LinuxTerminal";

function SkillRow({
  label,
  tier,
  color,
  evidence,
}: {
  label: string;
  tier: Tier;
  color: ColorKey;
  evidence: string;
}) {
  const c = colorMap[color];
  const dots = tierDots[tier];

  return (
    <motion.div variants={fadeUp}>
      <div className="flex justify-between items-baseline mb-1.5">
        <span
          className="text-[#f7f9fa]"
          style={{ fontFamily: fonts.body, fontWeight: 500, fontSize: "0.92rem" }}
        >
          {label}
        </span>
        <span
          className={`text-[10px] ${c.text} px-2 py-0.5 rounded-full ${c.bg} border ${c.border}`}
          style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
        >
          {tier}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`h-1 w-8 rounded-full ${
                i <= dots ? c.bar : "bg-[#f7f9fa]/[0.08]"
              }`}
              style={i <= dots ? { boxShadow: `0 0 6px ${c.glow}` } : undefined}
            />
          ))}
        </div>
        <span
          className="text-[10px] text-[#6b6b6b] truncate"
          style={{ fontFamily: fonts.mono, letterSpacing: "0.06em" }}
        >
          {evidence}
        </span>
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <AnimatedSection id="skills" className="py-24 md:py-32 relative">
      <div className="absolute top-20 right-0 w-[460px] h-[460px] rounded-full bg-[#af50ff]/12 blur-[130px] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative">
        <div className="mb-14 md:mb-16 text-center">
          <SectionHeading
            eyebrow="My current build"
            eyebrowColor="violet"
            title="Capability,"
            italicWord="not bragging."
            align="center"
          />
          <p
            className="text-[#f0f0f0]/65 mt-6 mx-auto"
            style={{ fontFamily: fonts.body, fontSize: "1rem", lineHeight: 1.65, maxWidth: "58ch" }}
          >
            Tiers based on what I actually ship on{" "}
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#af50ff] hover:underline underline-offset-4"
              style={{ fontWeight: 500 }}
            >
              github.com/tducn110
            </a>{" "}
            — not self-rated percentages.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="frost p-6 md:p-8"
            style={{
              borderRadius: "19.2px",
              boxShadow: "0 1px 0 rgba(247,249,250,0.06) inset",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className="text-[10px] text-[#af50ff]"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" }}
              >
                /// Capability matrix
              </span>
              <span
                className="text-[10px] text-[#6b6b6b]"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.12em" }}
              >
                v1.2 · 2026
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {skills.map((s) => (
                <SkillRow key={s.label} label={s.label} tier={s.tier} color={s.color} evidence={s.evidence} />
              ))}
            </div>
            <div
              className="flex flex-wrap gap-x-4 gap-y-1 pt-5 mt-5 border-t border-[#f7f9fa]/[0.08] text-[10px] text-[#6b6b6b]"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.08em" }}
            >
              <span><span className="text-[#af50ff]">●●●●●</span> Core</span>
              <span><span className="text-[#af50ff]">●●●●</span> Strong</span>
              <span><span className="text-[#af50ff]">●●●</span> Active</span>
              <span><span className="text-[#af50ff]">●●</span> Growing</span>
              <span><span className="text-[#af50ff]">●</span> Exploring</span>
            </div>
          </motion.div>

          <div className="flex flex-col gap-6">
            <div
              className="frost p-6 md:p-8"
              style={{
                borderRadius: "19.2px",
                boxShadow: "0 1px 0 rgba(247,249,250,0.06) inset",
              }}
            >
              <div
                className="text-[10px] text-[#6c4bd6] mb-5"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" }}
              >
                /// Tech stack
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-wrap gap-1.5"
              >
                {techChips.map((chip, i) => {
                  const colors: ColorKey[] = ["violet", "cosmic", "mauve", "steel", "slate"];
                  const color = colors[i % colors.length];
                  const c = colorMap[color];
                  return (
                    <motion.span
                      key={chip}
                      variants={fadeUp}
                      className={`px-3 py-1 rounded-full text-[11px] border ${c.border} ${c.bg} ${c.text} backdrop-blur-sm`}
                      style={{ fontFamily: fonts.mono, fontWeight: 400 }}
                    >
                      {chip}
                    </motion.span>
                  );
                })}
              </motion.div>
            </div>

            <div
              className="p-6 md:p-8 relative overflow-hidden border border-[#af50ff]/25"
              style={{
                borderRadius: "19.2px",
                background: gradients.cosmicB,
                boxShadow: "0 24px 64px -16px rgba(64,24,96,0.6)",
              }}
            >
              <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-60"
                style={{ background: "radial-gradient(circle, rgba(175,80,255,0.45), transparent)" }}
              />
              <div
                className="text-[10px] text-[#af50ff] mb-5 relative"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" }}
              >
                /// Special traits
              </div>
              <div className="flex flex-col gap-3.5 relative">
                {specialTraits.map((t) => {
                  const c = colorMap[t.color];
                  return (
                    <div key={t.trait} className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-8 h-8 rounded-lg ${c.bg} border ${c.border} ${c.text} flex items-center justify-center flex-shrink-0 backdrop-blur-sm`}
                      >
                        {t.icon}
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-[#f7f9fa] text-base"
                          style={{ fontFamily: fonts.display, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.015em" }}
                        >
                          {t.trait}
                        </div>
                        <div
                          className="text-[#f0f0f0]/60 text-[12px]"
                          style={{ fontFamily: fonts.body }}
                        >
                          {t.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Linux Terminal */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="mb-6">
            <span
              className="text-[10px] text-[#af50ff]"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.22em", fontWeight: 400, textTransform: "uppercase" }}
            >
              /// Interactive System Shell
            </span>
            <p
              className="text-[#f0f0f0]/50 mt-2 text-[12px]"
              style={{ fontFamily: fonts.body }}
            >
              Click inside the window and type commands like <span className="text-[#a78bfa] font-mono">help</span> or <span className="text-[#a78bfa] font-mono">neofetch</span>.
            </p>
          </div>
          <LinuxTerminal />
        </div>
      </div>
    </AnimatedSection>
  );
}
