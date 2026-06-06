import { forwardRef } from "react";
import { motion, type Variants } from "motion/react";
import { sectionReveal } from "@/shared/lib/motion";
import { cn } from "@/shared/lib/cn";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  variants?: Variants;
  once?: boolean;
  margin?: string;
  animate?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section({
  id,
  className,
  variants = sectionReveal,
  once = true,
  margin = "-80px",
  animate = true,
  children,
  ...props
}: SectionProps, ref) {
  if (!animate) {
    return (
      <section ref={ref} id={id} className={cn("py-24 md:py-32 relative", className)} {...props}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("py-24 md:py-32 relative", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={variants}
      {...(props as object)}
    >
      {children}
    </motion.section>
  );
});
