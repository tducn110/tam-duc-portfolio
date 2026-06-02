import type { ReactNode } from "react";

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  timeline: string;
  audience: string;
  includes: string[];
  excludes?: string[];
  ctaLabel: string;
  recommended?: boolean;
  color: "steel" | "violet" | "mauve";
  icon?: ReactNode;
}

export interface PricingAddon {
  label: string;
  price: string;
}
