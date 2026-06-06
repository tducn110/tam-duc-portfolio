export const motionQueries = {
  desktop: "(min-width: 768px)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktopMotion: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
} as const;

export const revealPresets = {
  sectionIntro: {
    from: { opacity: 0, y: 28 },
    to: { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
  },
  slideIn: {
    from: { autoAlpha: 0, y: 48, filter: "blur(16px)" },
    to: { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power3.out" },
  },
  slideOut: {
    autoAlpha: 0,
    y: -36,
    filter: "blur(14px)",
    duration: 0.38,
    ease: "power2.inOut",
  },
} as const;
