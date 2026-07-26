import type { DeviceGenerator } from "../types/game";

export const deviceGenerators: DeviceGenerator[] = [
  {
    id: "phone-render-bot",
    name: "Phone Render Bot",
    tier: "starter",
    description: "A small phone-style bot that clips drafts, captions shorts and keeps Compute trickling in.",
    costCompute: 45,
    ratePerHour: 18,
    unlock: "Buy after first room generator"
  },
  {
    id: "macbook-social-kit",
    name: "MacBook Social Kit",
    tier: "pro",
    description: "Kirill's editing/social kit for posts, cuts, thumbnails and service announcements.",
    costCompute: 120,
    ratePerHour: 55,
    unlock: "Needs Atlas Rank 2 later"
  },
  {
    id: "mac-mini-render-node",
    name: "Mac mini Render Node",
    tier: "render",
    description: "Dedicated render device for vertical videos, service promos and Kirill's social content pipeline.",
    costCompute: 260,
    ratePerHour: 140,
    unlock: "Crowdfunding target preview: $1,000"
  }
];
