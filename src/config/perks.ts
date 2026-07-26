import type { PerkReward } from "../types/game";

export const perkShop: PerkReward[] = [
  {
    id: "atlas-lesson-preview",
    title: "AtlasRepo Lesson Key",
    category: "lesson",
    costResource: "fbc",
    costAmount: 200,
    benefitPreview: "Preview access to one AtlasRepo lesson drop inside the game economy.",
    disclaimer: "Prototype preview only; real course access requires a later fulfillment system."
  },
  {
    id: "want2view-promo",
    title: "Want2View Promo Slot",
    category: "promo",
    costResource: "fbc",
    costAmount: 450,
    benefitPreview: "Mock promo-code reservation for a future Want2View or FabricBot subscription perk.",
    disclaimer: "No guaranteed subscription discount yet; this records local intent."
  },
  {
    id: "render-queue-priority",
    title: "Vertical Render Priority",
    category: "render",
    costResource: "fbc",
    costAmount: 800,
    benefitPreview: "Priority badge for the Mac mini render queue and social montage pipeline.",
    disclaimer: "Game-only badge until the real video pipeline and support terms are launched."
  }
];
