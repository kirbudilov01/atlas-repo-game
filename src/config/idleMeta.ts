export const productionChain = [
  { id: "ideas", label: "Ideas", detail: "capture demand", tone: "atlas" },
  { id: "research", label: "Research", detail: "find signal", tone: "compute" },
  { id: "prototype", label: "Prototype", detail: "build module", tone: "network" },
  { id: "launch", label: "Launch", detail: "ship update", tone: "funding" },
  { id: "distribution", label: "Distribution", detail: "grow reach", tone: "network" },
  { id: "runway", label: "Runway", detail: "fund autonomy", tone: "funding" }
];

export const bottleneckTracks = [
  { id: "compute", label: "Compute", source: "automation speed", base: 18, color: "compute" },
  { id: "attention", label: "Attention", source: "content and referrals", base: 24, color: "network" },
  { id: "trust", label: "Trust", source: "proof and quality", base: 20, color: "atlas" },
  { id: "runway", label: "Runway", source: "support and access", base: 10, color: "funding" }
];

export const agentRoster = [
  { id: "builder", name: "Builder Agent", rarity: "Common", station: "Dev Workstation", bonus: "+Build Points", color: "compute" },
  { id: "researcher", name: "Research Agent", rarity: "Rare", station: "Atlas Desk", bonus: "+Blueprints", color: "atlas" },
  { id: "creator", name: "Content Agent", rarity: "Epic", station: "Video Studio", bonus: "+Attention", color: "network" },
  { id: "operator", name: "Ops Agent", rarity: "Rare", station: "Server Rack", bonus: "-Task Time", color: "funding" }
];

export const activeTasks = [
  { id: "competitor-scan", title: "Research competitor", time: "18m", reward: "+12 notes", requires: "Research Agent" },
  { id: "landing", title: "Build landing module", time: "42m", reward: "+1 blueprint", requires: "Builder Agent" },
  { id: "content-raid", title: "Cut vertical video", time: "25m", reward: "+Attention", requires: "Content Agent" }
];

export const seasonEvents = [
  { id: "launch-sprint", title: "Launch Sprint", goal: "Ship 1 product module", progress: 32, reward: "Blueprint shards" },
  { id: "funding-sprint", title: "Funding Sprint", goal: "Reach $3k runway", progress: 0, reward: "Founder wall" },
  { id: "content-raid", title: "Content Raid", goal: "Grow distribution", progress: 18, reward: "Reach multiplier" }
];

export const collectionSets = [
  { id: "founder-cards", title: "Founder Cards", owned: 2, total: 9, reward: "legacy badge" },
  { id: "agent-blueprints", title: "Agent Blueprints", owned: 1, total: 8, reward: "new agent slot" },
  { id: "room-items", title: "Room Items", owned: 3, total: 12, reward: "room multiplier" },
  { id: "product-modules", title: "Product Modules", owned: 1, total: 10, reward: "launch boost" }
];

export const roomStages = [
  { id: "messy-desk", title: "Messy Desk", threshold: 0 },
  { id: "micro-studio", title: "Micro Studio", threshold: 25 },
  { id: "product-lab", title: "Product Lab", threshold: 150 },
  { id: "automation-room", title: "Automation Room", threshold: 450 },
  { id: "ai-factory", title: "AI Factory", threshold: 1200 },
  { id: "ecosystem-hq", title: "Ecosystem HQ", threshold: 3000 }
];
