import {
  Code2,
  Brain,
  Gamepad2,
  Terminal,
  Globe,
  Sparkles,
  GraduationCap,
  MapPin,
  Github,
  Trophy,
  Hammer,
  Zap,
  Star,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { links } from "../lib/links";
import type { ColorKey } from "../lib/tokens";

// ─── Hero badges ──────────────────────────────────────────────────────────────

export const heroBadges: { label: string; color: ColorKey; pos: string }[] = [
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

export type ProofItem = {
  label: string;
  icon: LucideIcon;
  color: ColorKey;
};

export const proofItems: ProofItem[] = [
  { label: "CSE Student", icon: GraduationCap, color: "indigo" },
  { label: "Da Nang, Vietnam", icon: MapPin, color: "teal" },
  { label: "14 GitHub repos", icon: Github, color: "slate" },
  { label: "GPA 3.8", icon: Star, color: "violet" },
  { label: "TFT Master", icon: Trophy, color: "amber" },
  { label: "Web + Game experiments", icon: Hammer, color: "rose" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export type Project = {
  title: string;
  role: string;
  problem: string;
  built: string;
  tech: string[];
  github: string;
  demo?: string;
  icon: React.ReactNode;
  color: ColorKey;
  abstract: React.ReactNode;
};

const AbstractDots = ({ color }: { color: string }) => (
  <div className="flex items-center justify-center w-full h-full gap-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className="rounded-full"
        style={{
          width: 8 + (i % 3) * 4,
          height: 8 + (i % 3) * 4,
          background: color,
          opacity: 0.35 + i * 0.12,
        }}
      />
    ))}
  </div>
);

const AbstractBars = ({ color }: { color: string }) => (
  <div className="flex items-end justify-center w-full h-full gap-2 pb-2">
    {[40, 70, 55, 90, 45, 75].map((h, i) => (
      <span
        key={i}
        className="rounded-sm"
        style={{
          width: 8,
          height: `${h}%`,
          background: color,
          opacity: 0.3 + (i % 3) * 0.2,
        }}
      />
    ))}
  </div>
);

const AbstractGrid = ({ color }: { color: string }) => (
  <div className="grid grid-cols-4 grid-rows-3 gap-1.5 p-4 w-full h-full">
    {Array.from({ length: 12 }).map((_, i) => (
      <span
        key={i}
        className="rounded"
        style={{
          background: color,
          opacity: [0.1, 0.2, 0.35, 0.5, 0.7][i % 5],
        }}
      />
    ))}
  </div>
);

const AbstractRune = ({ color }: { color: string }) => (
  <div className="flex items-center justify-center w-full h-full">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path d="M40 8 L72 40 L40 72 L8 40 Z" stroke={color} strokeWidth="1.5" />
      <path d="M40 22 L58 40 L40 58 L22 40 Z" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="40" cy="40" r="4" fill={color} />
    </svg>
  </div>
);

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
    icon: <Terminal size={18} />,
    color: "indigo",
    abstract: <AbstractBars color="#f1ccff" />,
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
    icon: <Globe size={18} />,
    color: "teal",
    abstract: <AbstractDots color="#0d9488" />,
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
    icon: <Sparkles size={18} />,
    color: "violet",
    abstract: <AbstractGrid color="#a78bfa" />,
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
    icon: <Gamepad2 size={18} />,
    color: "amber",
    abstract: <AbstractRune color="#f59e0b" />,
  },
];

// ─── Identity ────────────────────────────────────────────────────────────────

export type IdentityCardData = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  color: ColorKey;
  stat: { label: string; value: string };
};

export const identityCards: IdentityCardData[] = [
  {
    icon: <Code2 size={22} />,
    title: "Developer",
    subtitle: "WEB · BACKEND · SYSTEMS",
    text:
      "I build web apps, event pages, and systems that turn messy ideas into working products. From architecture to deployment — I own the whole flow.",
    tags: ["React", "Next.js", "TypeScript", "PostgreSQL", "Hono"],
    color: "indigo",
    stat: { label: "REPOS SHIPPED", value: "14" },
  },
  {
    icon: <Gamepad2 size={22} />,
    title: "Gamer",
    subtitle: "TFT MASTER · LOL IRON III",
    text:
      "Games trained my decision-making. TFT taught me meta-thinking, adaptation, and resource management. LoL taught me humility.",
    tags: ["TFT Master", "LoL Iron III", "Strategy", "Meta Reading"],
    color: "amber",
    stat: { label: "PEAK RANK", value: "MSTR" },
  },
  {
    icon: <Brain size={22} />,
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

export type TimelineStep = {
  phase: string;
  time: string;
  text: string;
  color: ColorKey;
};

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

export const skills: {
  label: string;
  tier: Tier;
  color: ColorKey;
  evidence: string;
}[] = [
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

export const specialTraits: {
  trait: string;
  desc: string;
  color: ColorKey;
  icon: React.ReactNode;
}[] = [
  { trait: "AI-Augmented", desc: "uses AI as cognitive leverage", color: "violet", icon: <Brain size={12} /> },
  { trait: "Builder Mindset", desc: "ships first, perfects later", color: "indigo", icon: <Zap size={12} /> },
  { trait: "Meta Thinker", desc: "patterns from gaming to systems", color: "amber", icon: <Trophy size={12} /> },
  { trait: "Honest Learner", desc: "knows what he doesn't know yet", color: "teal", icon: <Cpu size={12} /> },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

export const navItems = [
  { id: "projects", label: "Projects" },
  { id: "identity", label: "Identity" },
  { id: "timeline", label: "Story" },
  { id: "skills", label: "Skills" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];
