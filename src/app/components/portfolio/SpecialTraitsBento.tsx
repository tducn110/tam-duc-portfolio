import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { specialTraits } from "@/features/portfolio/data/portfolio.data";
import { colorMap } from "@/shared/lib/tokens";
import { renderIcon } from "../../lib/iconMap";
import { Typography, Surface } from "@/shared/ui";

export function SpecialTraitsBento() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="h-[300px] flex gap-2 relative w-full">
      {specialTraits.map((t, i) => {
        const c = colorMap[t.color];
        const isHovered = hoveredIndex === i;
        const isAnyHovered = hoveredIndex !== null;

        // Determine width based on state
        // If hovered: 60%
        // If not hovered but something is: 13.33%
        // If nothing hovered: 25%
        let flexWidth = "25%";
        if (isHovered) flexWidth = "60%";
        else if (isAnyHovered) flexWidth = "13.33%";

        return (
          <motion.div
            key={t.trait}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ width: flexWidth }}
            className="h-full relative cursor-pointer"
          >
            <Surface
              variant={isHovered ? "glow" : "frost"}
              className={`w-full h-full p-4 overflow-hidden flex flex-col justify-end transition-colors duration-500 ${
                isHovered ? c.border : "border-whisper/5"
              }`}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className={`absolute inset-0 ${c.bg} opacity-20 pointer-events-none`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon floating top/center */}
              <motion.div
                layout
                className={`absolute transition-all duration-500 ease-out flex items-center justify-center rounded-xl backdrop-blur-md border ${
                  isHovered ? "top-4 left-4 w-12 h-12" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                } ${isHovered ? c.bg : "bg-whisper/5"} ${isHovered ? c.border : "border-whisper/10"} ${isHovered ? c.text : "text-slate"}`}
              >
                {renderIcon(t.iconName, isHovered ? 20 : 16)}
              </motion.div>

              {/* Text Content */}
              <motion.div
                layout
                className={`relative z-10 flex flex-col gap-1 transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0 absolute bottom-0"
                }`}
              >
                <Typography
                  as="h3"
                  variant="subheading"
                  className="text-white !text-lg font-display italic font-normal tracking-[-0.015em] whitespace-nowrap"
                >
                  {t.trait}
                </Typography>
                <Typography variant="bodySm" color="ghost" className="opacity-80 !text-[13px] line-clamp-3">
                  {t.desc}
                </Typography>
              </motion.div>
              
              {/* Vertical Text when collapsed */}
              <motion.div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="text-[12px] font-display uppercase tracking-[0.2em] text-whisper opacity-50 transform -rotate-90 whitespace-nowrap mt-16">
                  {t.trait}
                </span>
              </motion.div>
            </Surface>
          </motion.div>
        );
      })}
    </div>
  );
}
