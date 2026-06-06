import {
  Code2, Brain, Gamepad2, Terminal, Globe, Sparkles,
  GraduationCap, MapPin, Github, Trophy, Hammer,
  Zap, Star, Cpu, type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Code2, Brain, Gamepad2, Terminal, Globe, Sparkles,
  GraduationCap, MapPin, Github, Trophy, Hammer,
  Zap, Star, Cpu,
};

export function renderIcon(name: string, size: number = 18) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}
