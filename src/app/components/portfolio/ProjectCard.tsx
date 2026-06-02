import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { fonts, colorMap } from "../../lib/tokens";
import type { Project } from "../../data/portfolio";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const c = colorMap[project.color];

  return (
    <div className="h-full">
      <div
        className="group relative frost p-6 h-full cursor-default overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
        style={{
          borderRadius: "19.2px",
          boxShadow: "0 1px 0 rgba(247,249,250,0.04) inset",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 0 0 1px ${c.solid}55, 0 24px 48px -16px ${c.glow}, 0 1px 0 rgba(247,249,250,0.06) inset`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 1px 0 rgba(247,249,250,0.04) inset";
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${c.bg} border ${c.border} ${c.text} transition-transform duration-300 group-hover:rotate-6`}
            >
              {project.icon}
            </div>
            <span
              className={`text-[10px] ${c.text}`}
              style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
            >
              {project.role}
            </span>
          </div>
          <span
            className="text-[10px] text-[#6b6b6b]"
            style={{ fontFamily: fonts.mono, letterSpacing: "0.15em" }}
          >
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Abstract preview */}
        <div
          className="relative h-32 rounded-xl mb-5 overflow-hidden border border-[#f7f9fa]/[0.06] flex items-center justify-center"
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
            {project.abstract}
          </div>
        </div>

        <h3
          className="text-2xl text-[#f7f9fa] mb-3"
          style={{ fontFamily: fonts.display, fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.02em" }}
        >
          {project.title}
        </h3>

        {/* Case study mini */}
        <div className="space-y-2.5 mb-5">
          <div className="flex gap-3">
            <span
              className={`text-[9.5px] ${c.text} flex-shrink-0 w-14 pt-[3px]`}
              style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
            >
              Problem
            </span>
            <p
              className="text-[#f0f0f0]/65 flex-1"
              style={{ fontFamily: fonts.body, fontSize: "0.9rem", lineHeight: 1.55 }}
            >
              {project.problem}
            </p>
          </div>
          <div className="flex gap-3">
            <span
              className={`text-[9.5px] ${c.text} flex-shrink-0 w-14 pt-[3px]`}
              style={{ fontFamily: fonts.mono, letterSpacing: "0.2em", fontWeight: 400, textTransform: "uppercase" }}
            >
              Built
            </span>
            <p
              className="text-[#f0f0f0]/80 flex-1"
              style={{ fontFamily: fonts.body, fontSize: "0.9rem", lineHeight: 1.55 }}
            >
              {project.built}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full bg-[#f7f9fa]/[0.05] text-[#f0f0f0]/70 border border-[#f7f9fa]/[0.08]"
              style={{ fontFamily: fonts.mono, fontWeight: 400 }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-[#f7f9fa]/[0.06]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-[#f0f0f0]/70 hover:text-[#f7f9fa] transition-colors"
            style={{ fontFamily: fonts.mono, letterSpacing: "0.15em", fontWeight: 400, textTransform: "uppercase" }}
          >
            <Github size={12} /> Source
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-[11px] ${c.text} hover:underline underline-offset-4`}
              style={{ fontFamily: fonts.mono, letterSpacing: "0.15em", fontWeight: 400, textTransform: "uppercase" }}
            >
              <ExternalLink size={12} /> Live demo
            </a>
          )}
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={16} className={c.text} />
          </span>
        </div>
      </div>
    </div>
  );
}
