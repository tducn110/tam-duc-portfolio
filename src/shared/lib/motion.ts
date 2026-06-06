import type { Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease },
  },
};

export const cardHover = {
  rest: { y: 0, transition: { duration: 0.25, ease } },
  hover: { y: -6, transition: { duration: 0.25, ease } },
};

export const buttonHover = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.25, ease } },
};

export const lineReveal: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.2, ease },
  },
};

export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: -90, scale: 0.8 },
  show: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

export const catalogCardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.96,
    transition: { duration: 0.25, ease },
  },
};

