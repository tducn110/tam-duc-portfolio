import { Github, ArrowUpRight } from "lucide-react";
import { links } from "../../lib/links";
import { projects } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "../../data/sections";
import { SectionHeading } from "@/shared/ui";
import { Section, Container, Typography } from "@/shared/ui";
import { FeaturedProjectCarousel } from "./projects/FeaturedProjectCarousel";

export function ProjectsSection() {
  return (
    <Section id="projects" animate={false} className="overflow-visible py-20 md:py-24">
      <Container className="relative z-10">
        <div className="mb-8 flex flex-col gap-5 md:mb-0 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={sectionsContent.projects.eyebrow}
            eyebrowColor="cosmic"
            title={sectionsContent.projects.title}
            italicWord={sectionsContent.projects.italicWord}
            description={sectionsContent.projects.description}
          />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 self-start whitespace-nowrap text-ghost/62 transition-all duration-300 hover:text-violet hover:tracking-widest"
          >
            <Typography variant="monoEyebrow" className="flex items-center gap-1.5 !text-[12px] !text-inherit !tracking-[0.18em] font-normal">
              <Github size={14} className="transition-transform group-hover:scale-110" /> {sectionsContent.projects.btnLabel}
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Typography>
          </a>
        </div>
      </Container>

      <FeaturedProjectCarousel projects={projects} />
    </Section>
  );
}
