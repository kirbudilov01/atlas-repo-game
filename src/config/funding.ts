import type { FundingGoal } from "../types/game";

export const fundingGoals: FundingGoal[] = [
  {
    id: "monthly-runway",
    title: "Autonomy Roadmap",
    targetUsd: 3000,
    currentUsd: 0,
    strategy: "Grow project revenue to cover tools, infrastructure and focused build time before any financialized mechanics appear.",
    useOfFunds: ["AI/dev subscriptions", "Hosting and storage", "Design/assets", "Prototype testing"],
    perkPreview: "Founder wall mention and local Support Ledger badge later",
    status: "mock"
  },
  {
    id: "mac-mini-render-node",
    title: "Mac mini Render Node",
    targetUsd: 1000,
    currentUsd: 0,
    strategy: "Buy a dedicated device for rendering vertical videos, service promos and Kirill's social edits without blocking the main workstation.",
    useOfFunds: ["Mac mini device", "External SSD", "Vertical video render queue", "Social montage pipeline"],
    perkPreview: "1000 FBC mock support credit plus future recognition if real utility/emission is designed",
    status: "planned"
  },
  {
    id: "lesson-pack",
    title: "AtlasRepo Lesson Pack",
    targetUsd: 750,
    currentUsd: 0,
    strategy: "Package the first repo research loop into lessons before selling or granting real access.",
    useOfFunds: ["Lesson writing", "Video recording", "Repo examples", "QA pass"],
    perkPreview: "Free lesson preview after entitlement backend exists",
    status: "locked"
  }
];
