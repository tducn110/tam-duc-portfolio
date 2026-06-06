import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { colorMap } from "@/shared/lib/tokens";
import type { Project } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "../../data/sections";
import { Surface, Typography } from "@/shared/ui";
import { renderIcon } from "../../lib/iconMap";
import { ProjectAbstract } from "./ProjectAbstract";
import { useTilt } from "../../hooks/useTilt";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const c = colorMap[project.color as keyof typeof colorMap];
  const tilt = useTilt(5);

  return (
    <div className="h-full">
      <Surface
        variant="ghost"
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        className="group relative p-6 h-full cursor-default overflow-hidden bg-card border-border/10 spotlight-border-card"
        style={{
          boxShadow: "0 1px 0 rgba(247,249,250,0.04) inset",
          transition: "transform 0.25s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 0 0 1px ${c.solid}55, 0 24px 48px -16px ${c.glow}, 0 1px 0 rgba(247,249,250,0.06) inset`;
        }}
        onMouseLeave={(e) => {
          tilt.onMouseLeave();
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 1px 0 rgba(247,249,250,0.04) inset";
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${c.bg} border ${c.border} ${c.text} transition-transform duration-300 group-hover:rotate-6`}
            >
              {renderIcon(project.iconName, 18)}
            </div>
            <Typography
              variant="monoEyebrow"
              className={`!text-[10px] ${c.text} !tracking-[0.2em] font-normal`}
            >
              {project.role}
            </Typography>
          </div>
          <Typography variant="monoEyebrow" className="!text-[10px] text-slate !tracking-[0.15em] normal-case">
            #{String(index + 1).padStart(2, "0")}
          </Typography>
        </div>

        <div
          className="relative h-32 rounded-xl mb-5 overflow-hidden border border-whisper/5 flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${c.glow}, rgba(9,9,9,0.4) 70%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(247,249,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(247,249,250,0.04) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative w-full h-full flex items-center justify-center">
            <ProjectAbstract variant={project.abstractVariant} color={project.abstractColor} />
          </div>
        </div>

        <Typography
          as="h3"
          variant="subheading"
          className="text-2xl text-whisper mb-3 font-display italic font-normal tracking-[-0.02em]"
        >
          {project.title}
        </Typography>

        <div className="space-y-2.5 mb-5">
          <div className="flex gap-3">
            <Typography
              variant="monoEyebrow"
              className={`!text-[9.5px] ${c.text} flex-shrink-0 w-14 pt-[3px] !tracking-[0.2em] font-normal`}
            >
              {sectionsContent.projects.problemLabel}
            </Typography>
            <Typography variant="bodySm" color="ghost" className="flex-1 opacity-65 !text-[0.9rem] !leading-[1.55]">
              {project.problem}
            </Typography>
          </div>
          <div className="flex gap-3">
            <Typography
              variant="monoEyebrow"
              className={`!text-[9.5px] ${c.text} flex-shrink-0 w-14 pt-[3px] !tracking-[0.2em] font-normal`}
            >
              {sectionsContent.projects.builtLabel}
            </Typography>
            <Typography variant="bodySm" color="ghost" className="flex-1 opacity-80 !text-[0.9rem] !leading-[1.55]">
              {project.built}
            </Typography>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full bg-whisper/5 text-ghost/70 border border-whisper/10 font-mono font-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-whisper/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ghost/70 hover:text-whisper transition-colors"
          >
            <Typography variant="monoEyebrow" className="!text-[11px] !text-inherit flex items-center gap-1.5 !tracking-[0.15em] font-normal">
              <Github size={12} /> {sectionsContent.projects.sourceLabel}
            </Typography>
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 ${c.text} hover:underline underline-offset-4`}
            >
              <Typography variant="monoEyebrow" className="!text-[11px] !text-inherit flex items-center gap-1.5 !tracking-[0.15em] font-normal">
                <ExternalLink size={12} /> {sectionsContent.projects.demoLabel}
              </Typography>
            </a>
          )}
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={16} className={c.text} />
          </span>
        </div>
      </Surface>
    </div>
  );
}
