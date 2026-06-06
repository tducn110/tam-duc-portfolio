import { motion } from "motion/react";
import { identityCards } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "../../data/sections";
import { SectionHeading } from "@/shared/ui";
import { AnimatedSection } from "../shared/AnimatedSection";
import { staggerContainer } from "@/shared/lib/motion";
import { IdentityCard } from "./cards/IdentityCard";

export function IdentitySection() {
  return (
    <AnimatedSection id="identity" className="py-24 md:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="mb-14 md:mb-16 max-w-2xl">
          <SectionHeading
            eyebrow={sectionsContent.identity.eyebrow}
            eyebrowColor="violet"
            title={sectionsContent.identity.title}
            italicWord={sectionsContent.identity.italicWord}
            description={sectionsContent.identity.description}
          />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-5"
        >
          {identityCards.map((card, i) => (
            <IdentityCard key={card.title} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
