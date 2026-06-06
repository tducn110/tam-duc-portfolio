import { links } from "@/app/lib/links";

export type IconName =
  | "Code2"
  | "Brain"
  | "Gamepad2"
  | "Terminal"
  | "Globe"
  | "Sparkles"
  | "GraduationCap"
  | "MapPin"
  | "Github"
  | "Trophy"
  | "Hammer"
  | "Zap"
  | "Star"
  | "Cpu";
export type AbstractVariant = "dots" | "bars" | "grid" | "rune";

export type ColorKey = "steel" | "violet" | "mauve" | "indigo" | "teal" | "amber" | "rose" | "slate";

// ─── Hero badges ──────────────────────────────────────────────────────────────
export interface HeroBadge {
  label: string;
  color: ColorKey;
  pos: string;
}

export const heroBadges: HeroBadge[] = [
  { label: "20 yrs old", color: "indigo", pos: "top-4 left-2" },
  { label: "GPA 3.8", color: "teal", pos: "top-10 right-4" },
  { label: "TFT Master", color: "amber", pos: "top-1/3 -left-6" },
  { label: "LoL Iron III", color: "slate", pos: "top-1/3 -right-4" },
  { label: "AI Builder", color: "violet", pos: "bottom-1/3 left-0" },
  { label: "Web Dev", color: "indigo", pos: "bottom-1/3 right-0" },
  { label: "CSE Student", color: "teal", pos: "bottom-8 left-10" },
  { label: "Game Dev", color: "amber", pos: "bottom-4 right-10" },
];

// ─── Proof strip ──────────────────────────────────────────────────────────────
export interface ProofItem {
  label: string;
  iconName: IconName;
  color: ColorKey;
}

export const proofItems: ProofItem[] = [
  { label: "CSE Student", iconName: "GraduationCap", color: "indigo" },
  { label: "Da Nang, Vietnam", iconName: "MapPin", color: "teal" },
  { label: "14 GitHub repos", iconName: "Github", color: "slate" },
  { label: "GPA 3.8", iconName: "Star", color: "violet" },
  { label: "TFT Master", iconName: "Trophy", color: "amber" },
  { label: "Web + Game experiments", iconName: "Hammer", color: "rose" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  role: string;
  problem: string;
  built: string;
  tech: string[];
  github: string;
  demo?: string;
  iconName: IconName;
  color: ColorKey;
  abstractVariant: AbstractVariant;
  abstractColor: string;
}

export const projects: Project[] = [
  {
    title: "Finance Tracker V3",
    role: "Team Lead · Backend · Architecture",
    problem:
      "Personal finance is hard to track across multiple wallets, recurring bills, and shifting budgets.",
    built:
      "Multi-wallet tracking, AI quick input, budget-first system, recurring bills, savings goals, and analytics. Designed, led, and shipped to production.",
    tech: [
      "Next.js",
      "TypeScript",
      "Hono API",
      "PostgreSQL",
      "Drizzle",
      "Firebase",
      "Turborepo",
      "Vercel",
    ],
    github: links.projects.financeTracker,
    demo: links.projects.financeTracker,
    iconName: "Terminal",
    color: "indigo",
    abstractVariant: "bars",
    abstractColor: "#f1ccff",
  },
  {
    title: "PingBall Landing Page",
    role: "UI · Event Website",
    problem:
      "An event tournament needed a focused landing page that worked across devices and converted visitors.",
    built:
      "Responsive layout, clear CTA hierarchy, and event information architecture — small, sharp, and ships.",
    tech: ["TypeScript", "Tailwind CSS", "Responsive UI", "Event Design"],
    github: links.projects.pingBall,
    iconName: "Globe",
    color: "teal",
    abstractVariant: "dots",
    abstractColor: "#0d9488",
  },
  {
    title: "Unsaid Words, Shared Hearts",
    role: "Full Stack · Emotional UX",
    problem:
      "Some things are hard to say out loud — but people still need a place to put them down.",
    built:
      "Anonymous note-sharing app where users send unsaid words and receive comfort replies. Designed around privacy and emotional flow.",
    tech: ["TypeScript", "Anonymous Notes", "Emotional UX", "UI Flow"],
    github: links.projects.unsaidWords,
    iconName: "Sparkles",
    color: "violet",
    abstractVariant: "grid",
    abstractColor: "#a78bfa",
  },
  {
    title: "First Game Prototype",
    role: "Solo · Game Prototype",
    problem:
      "Wanted to understand how games actually *feel* — not just how they're coded.",
    built:
      "Unity prototype exploring core mechanics and custom ShaderLab/HLSL visual effects. The start of learning game-feel from the inside.",
    tech: ["Unity", "C#", "ShaderLab", "HLSL", "Game Design"],
    github: links.projects.firstGame,
    iconName: "Gamepad2",
    color: "amber",
    abstractVariant: "rune",
    abstractColor: "#f59e0b",
  },
];

// ─── Identity ────────────────────────────────────────────────────────────────
export interface IdentityCardData {
  iconName: IconName;
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  color: ColorKey;
  stat: { label: string; value: string };
}

export const identityCards: IdentityCardData[] = [
  {
    iconName: "Code2",
    title: "Developer",
    subtitle: "WEB · BACKEND · SYSTEMS",
    text:
      "I build web apps, event pages, and systems that turn messy ideas into working products. From architecture to deployment — I own the whole flow.",
    tags: ["React", "Next.js", "TypeScript", "PostgreSQL", "Hono"],
    color: "indigo",
    stat: { label: "REPOS SHIPPED", value: "14" },
  },
  {
    iconName: "Gamepad2",
    title: "Gamer",
    subtitle: "TFT MASTER · LOL IRON III",
    text:
      "Games trained my decision-making. TFT taught me meta-thinking, adaptation, and resource management. LoL taught me humility.",
    tags: ["TFT Master", "LoL Iron III", "Strategy", "Meta Reading"],
    color: "amber",
    stat: { label: "PEAK RANK", value: "MSTR" },
  },
  {
    iconName: "Brain",
    title: "AI-era Builder",
    subtitle: "AI AS A SECOND BRAIN",
    text:
      "AI is how I turn unclear thoughts into working systems. Not a shortcut — a tool for asking better questions and building beyond my current level.",
    tags: ["Prompt Thinking", "Flow Design", "AI Workflow", "Product"],
    color: "violet",
    stat: { label: "DAILY USE", value: "100%" },
  },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export interface TimelineStep {
  phase: string;
  time: string;
  text: string;
  color: ColorKey;
}

export const timeline: TimelineStep[] = [
  {
    phase: "Scattered ideas",
    time: "2 years ago",
    text:
      "Plenty of ideas, no structure. I knew I wanted to build, but didn't know how to go from a thought to a project that actually shipped.",
    color: "slate",
  },
  {
    phase: "AI workflow",
    time: "Year 1",
    text:
      "Started using AI as a second brain — to ask better questions, plan flows, and unblock myself faster. Curiosity finally had a system behind it.",
    color: "violet",
  },
  {
    phase: "Shipped projects",
    time: "Year 1 → 2",
    text:
      "Class websites, event landing pages, small experiments. Some were rough — but they were real, public, and I finished them.",
    color: "teal",
  },
  {
    phase: "Product thinking",
    time: "Now · Age 20",
    text:
      "Team Lead on a full-stack finance app. Started thinking in users, flows, and trade-offs — not just features and files.",
    color: "indigo",
  },
  {
    phase: "Game systems",
    time: "Next",
    text:
      "Products, prototypes, and game systems with character. Things that wouldn't exist without the specific combination of who I am.",
    color: "amber",
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export type Tier = "Core" | "Strong" | "Active" | "Growing" | "Exploring";

export const tierDots: Record<Tier, number> = {
  Core: 5,
  Strong: 4,
  Active: 3,
  Growing: 2,
  Exploring: 1,
};

export interface SkillItem {
  label: string;
  tier: Tier;
  color: ColorKey;
  evidence: string;
}

export const skills: SkillItem[] = [
  { label: "TypeScript · React · Next.js", tier: "Core", color: "indigo", evidence: "Used in 3+ shipped projects" },
  { label: "AI-Augmented Workflow", tier: "Core", color: "violet", evidence: "Planning, debug, refactor — daily" },
  { label: "UI · Tailwind · Design Systems", tier: "Strong", color: "teal", evidence: "PingBall landing · this site" },
  { label: "API & Backend (Hono, Node)", tier: "Active", color: "indigo", evidence: "Tracker_yourMoney API layer" },
  { label: "PostgreSQL · Drizzle ORM", tier: "Active", color: "indigo", evidence: "Tracker_yourMoney schema" },
  { label: "System Architecture", tier: "Growing", color: "violet", evidence: "Turborepo monorepo, ongoing" },
  { label: "Unity · C# · ShaderLab", tier: "Exploring", color: "amber", evidence: "first-game prototype" },
  { label: "Game Sense (TFT / LoL)", tier: "Core", color: "amber", evidence: "TFT Master · 4 years deep" },
];

export const techChips = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui",
  "Hono API", "Node.js", "PostgreSQL", "Drizzle ORM", "Firebase Auth",
  "Turborepo", "Vercel", "GitHub", "Figma", "AI Prompting", "Unity", "C#",
];

export interface SpecialTrait {
  trait: string;
  desc: string;
  color: ColorKey;
  iconName: IconName;
}

export const specialTraits: SpecialTrait[] = [
  { trait: "AI-Augmented", desc: "uses AI as cognitive leverage", color: "violet", iconName: "Brain" },
  { trait: "Builder Mindset", desc: "ships first, perfects later", color: "indigo", iconName: "Zap" },
  { trait: "Meta Thinker", desc: "patterns from gaming to systems", color: "amber", iconName: "Trophy" },
  { trait: "Honest Learner", desc: "knows what he doesn't know yet", color: "teal", iconName: "Cpu" },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: "projects", label: "Projects" },
  { id: "identity", label: "Identity" },
  { id: "timeline", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "labs", label: "Labs" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const navConfig = {
  logoText: "td",
  logoName: "tdu._cn",
  githubLabel: "GITHUB"
};

export const mobileNavItems = [
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Story" },
  { id: "labs", label: "Labs" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
