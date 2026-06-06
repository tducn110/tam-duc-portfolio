export const parallaxPresets = {
  background: { y: 120, scrub: 1.2 },
  midground: { y: 64, scrub: 0.8 },
  foreground: { y: 24, scrub: 0.4 },
} as const;

export type ParallaxLayer = keyof typeof parallaxPresets;
