import type { RewardTier } from "../types/game";

export const rewardTiers: RewardTier[] = [
  {
    id: "fragment",
    title: "Atlas Fragment",
    requirement: "Complete First Scan",
    benefitPreview: "Unlocks a free lesson preview placeholder.",
    status: "unlocked"
  },
  {
    id: "discount",
    title: "Product Discount",
    requirement: "Atlas Rank 3",
    benefitPreview: "Promo-code preview for AtlasRepo or Want2View subscriptions.",
    status: "preview"
  },
  {
    id: "generator",
    title: "Partner Generator",
    requirement: "Partner Marketplace",
    benefitPreview: "Third-party game generator slot after moderation.",
    status: "locked"
  }
];
