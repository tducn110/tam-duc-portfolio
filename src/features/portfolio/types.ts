import type { ReactNode } from "react";
import type { ColorKey } from "@/shared/lib/tokens";

export interface HeroBadge {
  label: string;
  color: ColorKey;
  pos: string;
}

export interface ProofItem {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: ColorKey;
}

export interface Project {
  title: string;
  role: string;
  problem: string;
  built: string;
  tech: string[];
  github: string;
  demo?: string;
  icon: ReactNode;
  color: ColorKey;
  abstract: ReactNode;
}

export interface IdentityCardData {
  icon: ReactNode;
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  color: ColorKey;
  stat: { label: string; value: string };
}

export interface TimelineStep {
  phase: string;
  time: string;
  text: string;
  color: ColorKey;
}

export type SkillTier = "Core" | "Strong" | "Active" | "Growing" | "Exploring";

export interface SkillItem {
  label: string;
  tier: SkillTier;
  color: ColorKey;
  evidence: string;
}

export interface SpecialTrait {
  trait: string;
  desc: string;
  color: ColorKey;
  icon: ReactNode;
}

export interface NavItem {
  id: string;
  label: string;
}
