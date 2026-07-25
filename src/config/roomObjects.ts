import type { RoomObjectConfig } from "../types/game";

export const roomObjects: RoomObjectConfig[] = [
  { id: "youtube-wall", type: "terminal", label: "YouTube Wall", subtitle: "Reality loop", visualId: "youtube-wall", x: 8, y: 6, w: 25, h: 12, z: 2, linkedEntityId: "youtube", accent: "network" },
  { id: "goal", type: "goal", label: "Ecosystem Goal", subtitle: "$0 / $3,000 MRR", visualId: "goal-board", x: 38, y: 5, w: 24, h: 11, z: 2, accent: "funding" },
  { id: "network-door", type: "locked", label: "Network City", subtitle: "Locked", visualId: "door-network", x: 68, y: 4, w: 15, h: 24, z: 2, accent: "network", lockedReason: "Unlocks after partner systems are live." },
  { id: "my-room-door", type: "locked", label: "My Room", subtitle: "Coming soon", visualId: "door-room", x: 84, y: 9, w: 12, h: 20, z: 2, accent: "compute", lockedReason: "Your personal AI factory opens in the next build." },
  { id: "asset-index", type: "terminal", label: "Asset Index", subtitle: "Intangible assets", visualId: "asset-index", x: 36, y: 20, w: 19, h: 12, z: 3, accent: "funding" },
  { id: "atlas-terminal", type: "terminal", label: "AtlasRepo Terminal", subtitle: "Knowledge core", visualId: "atlas-terminal", x: 9, y: 29, w: 20, h: 17, z: 4, linkedEntityId: "atlasrepo", accent: "atlas" },
  { id: "macbook", type: "asset", label: "MacBook", subtitle: "Vision node", visualId: "macbook", x: 28, y: 36, w: 15, h: 12, z: 5, linkedEntityId: "macbook", accent: "atlas" },
  { id: "kirill", type: "character", label: "Kirill", subtitle: "Vision", visualId: "kirill", x: 23, y: 47, w: 13, h: 22, z: 8, accent: "atlas" },
  { id: "atlas-core", type: "core", label: "Atlas Core", subtitle: "Generate Compute", visualId: "atlas-core", x: 43, y: 42, w: 17, h: 20, z: 7, accent: "compute" },
  { id: "black-box", type: "character", label: "Black Box", subtitle: "Execution", visualId: "black-box", x: 62, y: 45, w: 13, h: 23, z: 8, accent: "compute" },
  { id: "mac-mini", type: "asset", label: "Mac mini", subtitle: "Production node", visualId: "mac-mini", x: 72, y: 34, w: 15, h: 15, z: 5, linkedEntityId: "mac-mini", accent: "compute" },
  { id: "old-dell", type: "asset", label: "Old Dell", subtitle: "Legacy research", visualId: "old-dell", x: 12, y: 67, w: 19, h: 13, z: 8, linkedEntityId: "old-dell", accent: "atlas" },
  { id: "want2view", type: "terminal", label: "Want2View", subtitle: "Trend intelligence", visualId: "want2view-terminal", x: 73, y: 66, w: 18, h: 14, z: 8, linkedEntityId: "want2view", accent: "compute" },
  { id: "network-terminal", type: "terminal", label: "Network Terminal", subtitle: "Distribution", visualId: "network-terminal", x: 48, y: 70, w: 18, h: 14, z: 9, accent: "network" },
  { id: "funding-hub", type: "terminal", label: "Funding Hub", subtitle: "Strategy table", visualId: "funding-hub", x: 31, y: 75, w: 16, h: 11, z: 9, accent: "funding" },
  { id: "reward-vault", type: "reward", label: "Reward Vault", subtitle: "Benefits preview", visualId: "reward-vault", x: 88, y: 58, w: 9, h: 13, z: 7, accent: "funding" },
  { id: "create-project", type: "locked", label: "Create Project", subtitle: "Level 20", visualId: "project-slot", x: 3, y: 52, w: 11, h: 12, z: 6, accent: "neutral", lockedReason: "Project slots require Level 20 or manual review." },
  { id: "ton-layer", type: "locked", label: "TON Layer", subtitle: "Future utility", visualId: "ton-layer", x: 90, y: 35, w: 8, h: 11, z: 6, accent: "compute", lockedReason: "No empty token. Utility first." },
  { id: "partner-market", type: "locked", label: "Partner Market", subtitle: "Future", visualId: "partner-market", x: 2, y: 20, w: 9, h: 12, z: 3, accent: "network", lockedReason: "Invited partner products come after owned ecosystem loops." }
];
