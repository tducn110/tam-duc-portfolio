// dope.security — Celestial Command Center tokens

export const celestial = {
  midnight: "#090909",
  whisper: "#f7f9fa",
  ghost: "#f0f0f0",
  slate: "#6b6b6b",
  steel: "#475467",
  violet: "#af50ff",
  cosmicA: "#6c4bd6",
  cosmicB: "#401860",
  indigo: "#4823b4",
  mauve: "#634e78",
} as const;

export const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Karla', ui-sans-serif, system-ui, sans-serif",
  mono: "'Space Mono', ui-monospace, monospace",
} as const;

// Reduced palette — dope.security uses mono base + single violet accent.
// All non-"violet" keys collapse toward steel/slate for the monochrome feel,
// with violet reserved for primary action/emphasis.
export const colorMap = {
  violet: {
    border: "border-[#af50ff]/40",
    bg: "bg-[#af50ff]/12",
    text: "text-[#af50ff]",
    bar: "bg-[#af50ff]",
    solid: "#af50ff",
    glow: "rgba(175,80,255,0.30)",
  },
  cosmic: {
    border: "border-[#6c4bd6]/40",
    bg: "bg-[#6c4bd6]/15",
    text: "text-[#a78bfa]",
    bar: "bg-[#6c4bd6]",
    solid: "#6c4bd6",
    glow: "rgba(108,75,214,0.28)",
  },
  indigo: {
    border: "border-[#4823b4]/45",
    bg: "bg-[#4823b4]/15",
    text: "text-[#a78bfa]",
    bar: "bg-[#4823b4]",
    solid: "#4823b4",
    glow: "rgba(72,35,180,0.30)",
  },
  mauve: {
    border: "border-[#634e78]/45",
    bg: "bg-[#634e78]/18",
    text: "text-[#c4b5d4]",
    bar: "bg-[#634e78]",
    solid: "#634e78",
    glow: "rgba(99,78,120,0.28)",
  },
  steel: {
    border: "border-[#475467]/45",
    bg: "bg-[#475467]/15",
    text: "text-[#f0f0f0]",
    bar: "bg-[#475467]",
    solid: "#475467",
    glow: "rgba(71,84,103,0.25)",
  },
  slate: {
    border: "border-[#6b6b6b]/30",
    bg: "bg-[#6b6b6b]/10",
    text: "text-[#6b6b6b]",
    bar: "bg-[#6b6b6b]",
    solid: "#6b6b6b",
    glow: "rgba(107,107,107,0.20)",
  },
  whisper: {
    border: "border-[#f7f9fa]/20",
    bg: "bg-[#f7f9fa]/06",
    text: "text-[#f7f9fa]",
    bar: "bg-[#f7f9fa]",
    solid: "#f7f9fa",
    glow: "rgba(247,249,250,0.15)",
  },
  // Back-compat aliases for older data files
  amethyst: {
    border: "border-[#af50ff]/40",
    bg: "bg-[#af50ff]/12",
    text: "text-[#af50ff]",
    bar: "bg-[#af50ff]",
    solid: "#af50ff",
    glow: "rgba(175,80,255,0.30)",
  },
  sky: {
    border: "border-[#6c4bd6]/40",
    bg: "bg-[#6c4bd6]/15",
    text: "text-[#a78bfa]",
    bar: "bg-[#6c4bd6]",
    solid: "#6c4bd6",
    glow: "rgba(108,75,214,0.28)",
  },
  teal: {
    border: "border-[#475467]/45",
    bg: "bg-[#475467]/15",
    text: "text-[#f0f0f0]",
    bar: "bg-[#475467]",
    solid: "#475467",
    glow: "rgba(71,84,103,0.25)",
  },
  amber: {
    border: "border-[#af50ff]/35",
    bg: "bg-[#af50ff]/10",
    text: "text-[#af50ff]",
    bar: "bg-[#af50ff]",
    solid: "#af50ff",
    glow: "rgba(175,80,255,0.22)",
  },
  rose: {
    border: "border-[#634e78]/40",
    bg: "bg-[#634e78]/15",
    text: "text-[#c4b5d4]",
    bar: "bg-[#634e78]",
    solid: "#634e78",
    glow: "rgba(99,78,120,0.25)",
  },
} as const;

export type ColorKey = keyof typeof colorMap;

export const surface = {
  card: "0 1px 0 rgba(247,249,250,0.06) inset, 0 24px 64px -16px rgba(0,0,0,0.6)",
  subtle: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
  violetGlow: "0 0 40px rgba(175, 80, 255, 0.25)",
};

export const gradients = {
  hero: `radial-gradient(ellipse at 20% 30%, rgba(108, 75, 214, 0.45), transparent 55%),
         radial-gradient(ellipse at 80% 70%, rgba(175, 80, 255, 0.25), transparent 60%),
         radial-gradient(ellipse at 50% 100%, rgba(64, 24, 96, 0.6), transparent 70%),
         #090909`,
  cosmicA: "radial-gradient(circle closest-corner at 10% 50%, rgb(108, 75, 214), rgba(0, 0, 0, 0) 55%)",
  cosmicB: "linear-gradient(90deg, rgb(64, 24, 96), rgb(72, 35, 180) 50%, rgb(99, 78, 120))",
};

// Back-compat alias for legacy imports
export const gleapColors = celestial;
