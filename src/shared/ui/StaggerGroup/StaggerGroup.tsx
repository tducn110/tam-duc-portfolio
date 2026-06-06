import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "@/shared/lib/cn";

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export interface StaggerGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  children: ReactNode;
  staggerDelay?: number;
  once?: boolean;
  viewportMargin?: string;
}

export const StaggerGroup = forwardRef<HTMLDivElement, StaggerGroupProps>(
  ({ className, children, staggerDelay = 0.1, once = true, viewportMargin = "-50px", ...props }, ref) => {
    const customVariants: Variants = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={customVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: viewportMargin }}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

StaggerGroup.displayName = "StaggerGroup";

export const StaggerItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { variants?: Variants }>(
  ({ className, children, variants = staggerItemVariants, ...props }, ref) => {
    return (
      <motion.div ref={ref} className={cn(className)} variants={variants} {...(props as any)}>
        {children}
      </motion.div>
    );
  }
);

StaggerItem.displayName = "StaggerItem";
