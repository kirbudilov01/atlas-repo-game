import type { RoomObjectConfig } from "../types/game";

export const roomObjects: RoomObjectConfig[] = [
  { id: "youtube-wall", type: "terminal", label: "YouTube Wall", subtitle: "Reality loop", visualId: "youtube-wall", x: 52, y: 18, w: 12, h: 10, z: 8, linkedEntityId: "youtube", accent: "network" },
  { id: "goal", type: "goal", label: "Ecosystem Goal", subtitle: "$0 / $3,000 MRR", visualId: "goal-board", x: 68, y: 13, w: 25, h: 17, z: 5, accent: "funding" },
  { id: "network-door", type: "locked", label: "Network City", subtitle: "Locked", visualId: "door-network", x: 94, y: 30, w: 6, h: 43, z: 4, accent: "network", lockedReason: "Unlocks after partner systems are live." },
  { id: "my-room-door", type: "locked", label: "My Room", subtitle: "Coming soon", visualId: "door-room", x: 0, y: 18, w: 9, h: 52, z: 4, accent: "compute", lockedReason: "Your personal AI factory opens in the next build." },
  { id: "asset-index", type: "terminal", label: "Asset Index", subtitle: "Intangible assets", visualId: "asset-index", x: 67, y: 18, w: 22, h: 14, z: 8, accent: "funding" },
  { id: "atlas-terminal", type: "terminal", label: "AtlasRepo Terminal", subtitle: "Knowledge core", visualId: "atlas-terminal", x: 43, y: 34, w: 13, h: 16, z: 12, linkedEntityId: "atlasrepo", accent: "atlas" },
  { id: "macbook", type: "asset", label: "MacBook", subtitle: "Vision node", visualId: "macbook", x: 52, y: 32, w: 14, h: 17, z: 12, linkedEntityId: "macbook", accent: "atlas" },
  { id: "kirill", type: "character", label: "Kirill", subtitle: "Vision", visualId: "kirill", x: 43, y: 52, w: 9, h: 35, z: 18, accent: "atlas" },
  { id: "atlas-core", type: "core", label: "Atlas Core", subtitle: "Generate Compute", visualId: "atlas-core", x: 28, y: 65, w: 18, h: 18, z: 21, accent: "compute" },
  { id: "black-box", type: "character", label: "Black Box", subtitle: "Execution", visualId: "black-box", x: 64, y: 50, w: 9, h: 35, z: 18, accent: "compute" },
  { id: "mac-mini", type: "asset", label: "Mac mini", subtitle: "Render node", visualId: "mac-mini", x: 15, y: 31, w: 15, h: 18, z: 12, linkedEntityId: "mac-mini", accent: "compute" },
  { id: "old-dell", type: "asset", label: "Old Dell", subtitle: "Legacy research", visualId: "old-dell", x: 72, y: 43, w: 13, h: 20, z: 13, linkedEntityId: "old-dell", accent: "atlas" },
  { id: "want2view", type: "terminal", label: "Want2View", subtitle: "Trend intelligence", visualId: "want2view-terminal", x: 50, y: 32, w: 12, h: 15, z: 13, linkedEntityId: "want2view", accent: "compute" },
  { id: "network-terminal", type: "terminal", label: "Network Terminal", subtitle: "Distribution", visualId: "network-terminal", x: 86, y: 57, w: 11, h: 18, z: 11, accent: "network" },
  { id: "funding-hub", type: "terminal", label: "Funding Hub", subtitle: "Strategy table", visualId: "funding-hub", x: 74, y: 63, w: 13, h: 17, z: 14, accent: "funding" },
  { id: "reward-vault", type: "reward", label: "Reward Vault", subtitle: "Benefits preview", visualId: "reward-vault", x: 56, y: 69, w: 12, h: 16, z: 20, accent: "funding" },
  { id: "create-project", type: "locked", label: "Create Project", subtitle: "Level 20", visualId: "project-slot", x: 17, y: 61, w: 25, h: 27, z: 15, accent: "neutral", lockedReason: "Project slots require Level 20 or manual review." },
  { id: "ton-layer", type: "locked", label: "TON Layer", subtitle: "Future utility", visualId: "ton-layer", x: 91, y: 36, w: 7, h: 14, z: 7, accent: "compute", lockedReason: "No empty token. Utility first." },
  { id: "partner-market", type: "locked", label: "Partner Market", subtitle: "Future", visualId: "partner-market", x: 9, y: 36, w: 12, h: 25, z: 7, accent: "network", lockedReason: "Invited partner products come after owned ecosystem loops." }
];
