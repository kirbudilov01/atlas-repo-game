import type { Asset } from "../types/game";

export const assets: Asset[] = [
  {
    id: "macbook",
    slug: "macbook",
    name: "MacBook",
    category: "physical",
    owner: "kirill",
    status: "active",
    conditionPct: 91,
    moneyValueUsd: 1500,
    utilityScore: 1240,
    purpose: "Primary founder workstation for product decisions, writing and ecosystem operations.",
    realFunction: ["Product planning", "Content review", "Telegram/community ops", "Founder strategy"],
    gameFunction: ["Boosts Vision", "+5% Knowledge from Atlas missions", "Improves Reality Update frequency"],
    connectedProductIds: ["atlasrepo", "want2view", "youtube"],
    connectedSubscriptionIds: ["ChatGPT/Codex", "GitHub", "Figma"],
    producedResource: "knowledge",
    outputModifier: 5,
    currentLoadPct: 58,
    visualState: "Screen lit, Kirill nearby",
    upgradePath: [
      { id: "monitor", title: "External monitor", requirement: "Reality Update", effect: "+8 Vision", status: "available" },
      { id: "backup", title: "Backup drive", requirement: "Future funding", effect: "Safer content ops", status: "locked" }
    ],
    realityUpdates: ["Season 0: Founder workstation registered in Our Room."],
    fundingRelationship: "Not a first funding object; appears in Reality Updates."
  },
  {
    id: "mac-mini",
    slug: "mac-mini",
    name: "Mac mini",
    category: "physical",
    owner: "ecosystem",
    status: "active",
    conditionPct: 86,
    moneyValueUsd: 700,
    utilityScore: 920,
    purpose: "Local production node for agents, rendering, automation and background data jobs.",
    realFunction: ["Runs AI agents", "Supports automations", "Renders media", "Handles local data jobs"],
    gameFunction: ["Boosts Execution", "+12% Compute production", "Supports Video Agent and AtlasRepo background tasks"],
    connectedProductIds: ["atlasrepo", "youtube"],
    connectedSubscriptionIds: ["Codex/GitHub", "Cloud storage", "API credits"],
    producedResource: "compute",
    outputModifier: 12,
    currentLoadPct: 73,
    visualState: "Active node with subtle fan light",
    upgradePath: [
      { id: "ssd", title: "Add external SSD", requirement: "Funding campaign", effect: "+6% Compute output", status: "funding" },
      { id: "render", title: "Connect render queue", requirement: "Video Agent milestone", effect: "+Video Credits later", status: "locked" }
    ],
    realityUpdates: ["Reality Update #04: Mac mini connected as local AI node."],
    fundingRelationship: "Can link to Activate New Mac mini / Add external SSD campaign."
  },
  {
    id: "old-dell",
    slug: "old-dell",
    name: "Old Dell",
    category: "physical",
    owner: "ecosystem",
    status: "degraded",
    conditionPct: 43,
    moneyValueUsd: 150,
    utilityScore: 260,
    purpose: "Legacy research node for experiments, backup tasks and old-school infrastructure stories.",
    realFunction: ["Runs experiments", "Tests open-source tools", "Backup research device"],
    gameFunction: ["Low-efficiency research node", "+2 Knowledge/hour when revived", "Satisfying upgrade path"],
    connectedProductIds: ["atlasrepo"],
    connectedSubscriptionIds: ["GitHub", "Open-source tooling"],
    producedResource: "knowledge",
    outputModifier: 2,
    currentLoadPct: 88,
    visualState: "Overloaded with flickering terminal",
    upgradePath: [
      { id: "clean", title: "Clean disk", requirement: "20 Knowledge", effect: "Stabilize node", status: "available" },
      { id: "linux", title: "Install Linux", requirement: "Atlas Rank 2", effect: "Legacy Research Node", status: "locked" }
    ],
    realityUpdates: ["Season 0: Old Dell discovered as potential research node."],
    fundingRelationship: "Best used as a YouTube/Reality Update object."
  }
];
