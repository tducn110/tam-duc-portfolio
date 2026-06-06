import { skills, tierDots, type Tier } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "../../data/sections";
import { links } from "../../lib/links";
import { SectionHeading } from "@/shared/ui";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinuxTerminal } from "./LinuxTerminal";
import { Section, Container, Surface, Typography, StaggerGroup } from "@/shared/ui";
import { SkillRow } from "./cards/SkillRow";
import { TechPhysicsCanvas } from "./TechPhysicsCanvas";
import { SpecialTraitsBento } from "./SpecialTraitsBento";


gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Frontend craft",
    note: "UI stack + product interface work",
    items: ["TypeScript · React · Next.js", "UI · Tailwind · Design Systems"],
  },
  {
    title: "Backend systems",
    note: "API, data, and persistence",
    items: ["API & Backend (Hono, Node)", "PostgreSQL · Drizzle ORM"],
  },
  {
    title: "Architecture & workflow",
    note: "How projects get planned and shipped",
    items: ["AI-Augmented Workflow", "System Architecture"],
  },
  {
    title: "Game logic",
    note: "Interactive systems and competitive thinking",
    items: ["Unity · C# · ShaderLab", "Game Sense (TFT / LoL)"],
  },
] as const;
export function SkillsSection() {
  const sContent = sectionsContent.skills;
  const skillByLabel = new Map(skills.map((skill) => [skill.label, skill]));
  const groupedSkills = skillGroups.map((group) => ({
    ...group,
    skills: group.items
      .map((label) => skillByLabel.get(label))
      .filter((skill): skill is (typeof skills)[number] => Boolean(skill)),
  }));
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Column Parallax on scroll
    gsap.to(leftColRef.current, {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(rightColRef.current, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: sectionRef });

  return (
    <Section id="skills" ref={sectionRef as any}>
      <div className="absolute top-20 right-0 w-[460px] h-[460px] rounded-full bg-violet/12 blur-[130px] pointer-events-none" />
      <Container className="relative">
        <div className="mb-14 md:mb-16 text-center">
          <SectionHeading
            eyebrow={sContent.eyebrow}
            eyebrowColor="violet"
            title={sContent.title}
            italicWord={sContent.italicWord}
            align="center"
          />
          <Typography
            as="p"
            variant="body"
            color="ghost"
            className="mt-6 mx-auto opacity-65 !leading-[1.65] max-w-[58ch]"
          >
            {sContent.descPart1}
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet hover:underline underline-offset-4 font-medium"
            >
              {sContent.descLink}
            </a>
            {sContent.descPart2}
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div ref={leftColRef}>
            <Surface variant="frost">
              <StaggerGroup once viewportMargin="-60px">
                <div className="flex items-center justify-between mb-6">
                <Typography variant="monoEyebrow" className="!text-[10px] text-violet !tracking-[0.22em] font-normal">
                  {sContent.matrixEyebrow}
                </Typography>
                <Typography variant="monoEyebrow" className="!text-[10px] text-slate !tracking-[0.12em] normal-case">
                  {sContent.matrixVersion}
                </Typography>
              </div>
              <div className="grid gap-3">
                {groupedSkills.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl border border-whisper/10 bg-whisper/[0.025] p-3.5 transition-colors duration-300 hover:border-violet/20 hover:bg-whisper/[0.04]"
                  >
                    <div className="flex flex-col gap-1 border-b border-whisper/10 pb-3 sm:flex-row sm:items-end sm:justify-between">
                      <Typography variant="monoEyebrow" className="!text-[10px] text-whisper !tracking-[0.16em] font-normal">
                        {group.title}
                      </Typography>
                      <Typography variant="bodySm" className="text-slate !text-[12px] !leading-[1.35]">
                        {group.note}
                      </Typography>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {group.skills.map((s) => (
                        <SkillRow key={s.label} label={s.label} tier={s.tier} color={s.color} evidence={s.evidence} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 pt-5 mt-5 border-t border-whisper/10">
                {(["Core", "Strong", "Active", "Growing", "Exploring"] as Tier[]).map((t) => (
                  <Typography as="span" variant="monoEyebrow" className="!text-[10px] text-slate !tracking-[0.08em] normal-case" key={t}>
                    <span className="text-violet">{"●".repeat(tierDots[t])}</span> {t}
                  </Typography>
                ))}
              </div>
            </StaggerGroup>
          </Surface>
          </div>

          <div ref={rightColRef} className="flex flex-col gap-6">
            <Surface variant="frost" className="p-1">
              <div className="p-4 pb-0 flex justify-between items-center z-10 relative pointer-events-none">
                <Typography variant="monoEyebrow" className="!text-[10px] text-cosmic-a !tracking-[0.22em] font-normal">
                  {sContent.techEyebrow}
                </Typography>
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
                  <Typography variant="monoEyebrow" className="!text-[9px] text-violet !tracking-[0.1em] font-normal opacity-70">
                    PHYSICS ACTIVE
                  </Typography>
                </div>
              </div>
              <TechPhysicsCanvas />
            </Surface>

            {/* Special Traits Bento */}
            <div className="mt-2">
              <Typography variant="monoEyebrow" className="!text-[10px] text-violet mb-5 !tracking-[0.22em] font-normal pl-2">
                {sContent.traitsEyebrow}
              </Typography>
              <SpecialTraitsBento />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <div className="mb-6">
            <Typography variant="monoEyebrow" className="!text-[10px] text-violet !tracking-[0.22em] font-normal">
              {sContent.shellEyebrow}
            </Typography>
            <Typography variant="bodySm" color="ghost" className="opacity-50 mt-2 !text-[12px]">
              {sContent.shellDescPart1}
              <span className="text-cosmic-a font-mono">{sContent.shellCommandHelp}</span>
              {sContent.shellDescPart2}
              <span className="text-cosmic-a font-mono">{sContent.shellCommandNeofetch}</span>
              {sContent.shellDescPart3}
            </Typography>
          </div>
          <LinuxTerminal />
        </div>
      </Container>
    </Section>
  );
}
