import type { Product } from "../types/game";

export const products: Product[] = [
  {
    id: "atlasrepo",
    name: "AtlasRepo",
    role: "Knowledge core",
    metric: "First Scan ready",
    description: "Open-source AI discovery, lessons, repository checks and community research.",
    color: "atlas"
  },
  {
    id: "want2view",
    name: "Want2View",
    role: "Trend intelligence",
    metric: "Trend Scanner locked",
    description: "Content analytics for YouTube, TikTok, Instagram and creator research.",
    color: "compute"
  },
  {
    id: "fabricbot",
    name: "FabricBot",
    role: "Financial engine",
    metric: "Prototype mode",
    description: "Payments, access, subscriptions, promo codes and partner accounting under the hood.",
    color: "funding"
  },
  {
    id: "youtube",
    name: "YouTube Series",
    role: "Reality loop",
    metric: "Season 0",
    description: "Real life creates episodes; episodes become game patches and community missions.",
    color: "network"
  }
];
