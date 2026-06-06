import type { ColorKey } from "@/shared/lib/tokens";

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

export interface HeroBadge {
  label: string;
  color: ColorKey;
  pos: string;
}

export interface ProofItem {
  label: string;
  iconName: IconName;
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
  iconName: IconName;
  color: ColorKey;
  abstractVariant: AbstractVariant;
  abstractColor: string;
}

export interface IdentityCardData {
  iconName: IconName;
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
  iconName: IconName;
}

export interface NavItem {
  id: string;
  label: string;
}
