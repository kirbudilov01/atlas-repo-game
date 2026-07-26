import type { RoomObjectConfig } from "../types/game";

export const roomObjects: RoomObjectConfig[] = [
  { id: "youtube-wall", type: "terminal", label: "YouTube Wall", subtitle: "Reality loop", visualId: "youtube-wall", x: 50, y: 23, w: 9, h: 9, z: 8, linkedEntityId: "youtube", accent: "network" },
  { id: "goal", type: "goal", label: "Ecosystem Goal", subtitle: "$0 / $3,000 MRR", visualId: "goal-board", x: 82, y: 8, w: 12, h: 14, z: 5, accent: "funding" },
  { id: "network-door", type: "locked", label: "Network City", subtitle: "Locked", visualId: "door-network", x: 94, y: 30, w: 6, h: 38, z: 4, accent: "network", lockedReason: "Unlocks after partner systems are live." },
  { id: "my-room-door", type: "locked", label: "My Room", subtitle: "Coming soon", visualId: "door-room", x: 0, y: 18, w: 9, h: 52, z: 4, accent: "compute", lockedReason: "Your personal AI factory opens in the next build." },
  { id: "asset-index", type: "terminal", label: "Asset Index", subtitle: "Intangible assets", visualId: "asset-index", x: 66, y: 25, w: 10, h: 10, z: 8, accent: "funding" },
  { id: "atlas-terminal", type: "terminal", label: "AtlasRepo Terminal", subtitle: "Knowledge core", visualId: "atlas-terminal", x: 41, y: 31, w: 10, h: 11, z: 12, linkedEntityId: "atlasrepo", accent: "atlas" },
  { id: "macbook", type: "asset", label: "MacBook", subtitle: "Vision node", visualId: "macbook", x: 58, y: 26, w: 9, h: 10, z: 12, linkedEntityId: "macbook", accent: "atlas" },
  { id: "kirill", type: "character", label: "Kirill", subtitle: "Vision", visualId: "kirill", x: 41, y: 58, w: 10, h: 16, z: 18, accent: "atlas" },
  { id: "atlas-core", type: "core", label: "Atlas Core", subtitle: "Generate Compute", visualId: "atlas-core", x: 29, y: 64, w: 17, h: 18, z: 21, accent: "compute" },
  { id: "black-box", type: "character", label: "Black Box", subtitle: "Execution", visualId: "black-box", x: 61, y: 56, w: 10, h: 16, z: 18, accent: "compute" },
  { id: "mac-mini", type: "asset", label: "Mac mini", subtitle: "Render node", visualId: "mac-mini", x: 22, y: 39, w: 10, h: 12, z: 12, linkedEntityId: "mac-mini", accent: "compute" },
  { id: "old-dell", type: "asset", label: "Old Dell", subtitle: "Legacy research", visualId: "old-dell", x: 81, y: 39, w: 10, h: 14, z: 13, linkedEntityId: "old-dell", accent: "atlas" },
  { id: "want2view", type: "terminal", label: "Want2View", subtitle: "Trend intelligence", visualId: "want2view-terminal", x: 51, y: 28, w: 10, h: 11, z: 13, linkedEntityId: "want2view", accent: "compute" },
  { id: "network-terminal", type: "terminal", label: "Network Terminal", subtitle: "Distribution", visualId: "network-terminal", x: 86, y: 58, w: 9, h: 11, z: 11, accent: "network" },
  { id: "funding-hub", type: "terminal", label: "Funding Hub", subtitle: "Strategy table", visualId: "funding-hub", x: 71, y: 60, w: 10, h: 12, z: 14, accent: "funding" },
  { id: "reward-vault", type: "reward", label: "Reward Vault", subtitle: "Benefits preview", visualId: "reward-vault", x: 51, y: 67, w: 10, h: 12, z: 20, accent: "funding" },
  { id: "create-project", type: "locked", label: "Create Project", subtitle: "Level 20", visualId: "project-slot", x: 17, y: 61, w: 12, h: 16, z: 15, accent: "neutral", lockedReason: "Project slots require Level 20 or manual review." },
  { id: "ton-layer", type: "locked", label: "TON Layer", subtitle: "Future utility", visualId: "ton-layer", x: 91, y: 36, w: 7, h: 14, z: 7, accent: "compute", lockedReason: "No empty token. Utility first." },
  { id: "partner-market", type: "locked", label: "Partner Market", subtitle: "Future", visualId: "partner-market", x: 9, y: 36, w: 12, h: 25, z: 7, accent: "network", lockedReason: "Invited partner products come after owned ecosystem loops." }
];
