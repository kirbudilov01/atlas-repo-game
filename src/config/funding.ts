import type { FundingGoal } from "../types/game";

export const fundingGoals: FundingGoal[] = [
  {
    id: "monthly-runway",
    title: "Ecosystem Runway",
    targetUsd: 3000,
    currentUsd: 0,
    strategy: "Cover tools, infrastructure and focused build time before any financialized mechanics appear.",
    useOfFunds: ["AI/dev subscriptions", "Hosting and storage", "Design/assets", "Prototype testing"],
    perkPreview: "Founder wall mention and local Support Ledger badge later",
    status: "mock"
  },
  {
    id: "mac-mini-upgrade",
    title: "Mac mini Upgrade",
    targetUsd: 460,
    currentUsd: 0,
    strategy: "Increase local agent/render capacity and turn the upgrade into a public Reality Update.",
    useOfFunds: ["External SSD", "Backup storage", "Thermal cleanup", "Automation queue"],
    perkPreview: "Mac mini supporter badge preview",
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
