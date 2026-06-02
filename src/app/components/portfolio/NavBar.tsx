import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { fonts } from "../../lib/tokens";
import { links } from "../../lib/links";
import { navItems } from "../../data/portfolio";
import { Magnetic } from "../shared/Magnetic";

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
          ? "bg-[#090909]/80 backdrop-blur-xl border-b border-[#f7f9fa]/[0.06]"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <Magnetic range={25} speed={0.4}>
          <a href="#" className="flex items-center gap-2.5 group">
            <span
              className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#f7f9fa] violet-glow"
              style={{
                background: "linear-gradient(135deg, #af50ff 0%, #6c4bd6 100%)",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.display,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "14px",
                  letterSpacing: "-0.04em",
                }}
              >
                td
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#af50ff] ring-2 ring-[#090909]" />
            </span>
            <span
              className="text-[15px] text-[#f7f9fa] group-hover:text-[#af50ff] transition-colors"
              style={{ fontFamily: fonts.display, fontWeight: 400, letterSpacing: "-0.02em", fontStyle: "italic" }}
            >
              tdu._cn
            </span>
          </a>
        </Magnetic>

        {/* Desktop nav */}
        <div
          className="hidden md:flex items-center gap-1 px-1.5 py-1 rounded-full frost-strong"
          style={{ fontFamily: fonts.body }}
        >
          {navItems.map((item) => (
            <Magnetic key={item.id} range={15} speed={0.3}>
              <a
                href={`#${item.id}`}
                className="px-3.5 py-1.5 text-[12px] rounded-full text-[#f0f0f0]/70 hover:text-[#af50ff] hover:bg-[#af50ff]/[0.10] transition-all inline-block"
                style={{ fontWeight: 400, letterSpacing: "0.02em" }}
              >
                {item.label}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Mobile compact menu */}
        <div
          className="md:hidden flex items-center gap-1 px-1 py-1 rounded-full frost-strong"
          style={{ fontFamily: fonts.body }}
        >
          {[
            { id: "projects", label: "Projects" },
            { id: "timeline", label: "Story" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-2.5 py-1 text-[11px] rounded-full text-[#f0f0f0]/75"
              style={{ fontWeight: 400 }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <Magnetic range={20} speed={0.35}>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#af50ff] text-[#f7f9fa] text-[12px] hover:bg-[#af50ff]/85 transition-all duration-200"
            style={{ fontFamily: fonts.body, fontWeight: 700, letterSpacing: "0.04em" }}
          >
            <Github size={13} />
            GITHUB
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}
