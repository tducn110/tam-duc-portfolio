import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { specialTraits } from "@/features/portfolio/data/portfolio.data";
import { colorMap } from "@/shared/lib/tokens";
import { renderIcon } from "../../lib/iconMap";
import { Typography, Surface } from "@/shared/ui";

export function SpecialTraitsAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2 relative">
      {specialTraits.map((t, i) => {
        const c = colorMap[t.color];
        const isHovered = hoveredIndex === i;
        
        return (
          <motion.div
            key={t.trait}
            layout
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Background Glow when hovered */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  layoutId="activeTraitBg"
                  className={`absolute inset-0 ${c.bg} opacity-20`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            <Surface
              variant="frost"
              className={`p-4 border transition-colors duration-300 ${isHovered ? c.border : "border-whisper/5"}`}
            >
              <motion.div layout className="flex items-center gap-4">
                <motion.div
                  layout
                  className={`w-10 h-10 rounded-lg ${isHovered ? c.bg : "bg-whisper/5"} border ${isHovered ? c.border : "border-whisper/10"} ${isHovered ? c.text : "text-slate"} flex items-center justify-center flex-shrink-0 transition-colors duration-300`}
                >
                  {renderIcon(t.iconName, 18)}
                </motion.div>
                
                <motion.div layout className="flex-1">
                  <Typography
                    as="h3"
                    variant="subheading"
                    className={`!text-base font-display italic font-normal tracking-[-0.015em] transition-colors duration-300 ${isHovered ? "text-white" : "text-whisper"}`}
                  >
                    {t.trait}
                  </Typography>
                  
                  <AnimatePresence mode="popLayout">
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <Typography variant="bodySm" color="ghost" className="opacity-80 !text-[13px]">
                          {t.desc}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </Surface>
          </motion.div>
        );
      })}
    </div>
  );
}
