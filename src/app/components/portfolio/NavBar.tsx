import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { Link } from "react-router";
import { links } from "../../lib/links";
import { navItems, navConfig, mobileNavItems } from "@/features/portfolio/data/portfolio.data";
import { Magnetic } from "../shared/Magnetic";
import { Typography } from "@/shared/ui";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-midnight/80 backdrop-blur-xl border-b border-whisper/[0.06]"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <Magnetic range={25} speed={0.4}>
          <a href="#" className="flex items-center gap-2.5 group">
            <span
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-whisper violet-glow"
              style={{
                background: "linear-gradient(135deg, var(--color-deep-violet) 0%, var(--color-cosmic-violet-a) 100%)",
              }}
            >
              <Typography as="span" variant="heading" className="!text-[14px] italic font-normal !tracking-[-0.04em]">
                {navConfig.logoText}
              </Typography>
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-violet ring-2 ring-midnight" />
            </span>
            <Typography
              as="span"
              variant="heading"
              className="text-whisper group-hover:text-violet transition-colors !text-[15px] italic font-normal !tracking-[-0.02em]"
            >
              {navConfig.logoName}
            </Typography>
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 px-1.5 py-1 rounded-full frost-strong font-sans">
          {navItems.map((item) => {
            const isRoute = item.id === "labs" || item.id === "templates";
            return (
              <Magnetic key={item.id} range={15} speed={0.3}>
                {isRoute ? (
                  <Link
                    to={`/${item.id}`}
                    className="px-3.5 py-1.5 text-[12px] rounded-full text-ghost/70 hover:text-violet hover:bg-violet/10 transition-all inline-block font-normal tracking-[0.02em]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    className="px-3.5 py-1.5 text-[12px] rounded-full text-ghost/70 hover:text-violet hover:bg-violet/10 transition-all inline-block font-normal tracking-[0.02em]"
                  >
                    {item.label}
                  </a>
                )}
              </Magnetic>
            );
          })}
        </div>

        {/* Mobile compact menu */}
        <div className="md:hidden flex items-center gap-1 px-1 py-1 rounded-full frost-strong font-sans">
          {mobileNavItems.map((item) => {
            const isRoute = item.id === "labs" || item.id === "templates";
            return isRoute ? (
              <Link
                key={item.id}
                to={`/${item.id}`}
                className="px-2.5 py-1 text-[11px] rounded-full text-ghost/75 font-normal"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-2.5 py-1 text-[11px] rounded-full text-ghost/75 font-normal"
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Magnetic range={20} speed={0.35}>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet text-whisper text-[12px] hover:bg-violet/85 transition-all duration-200 font-sans font-bold tracking-[0.04em]"
            >
              <Github size={13} />
              {navConfig.githubLabel}
            </a>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
}
