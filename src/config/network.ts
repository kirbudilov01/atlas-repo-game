import type { NetworkNode } from "../types/game";

export const networkNodes: NetworkNode[] = [
  {
    id: "founder-circle",
    title: "Founder Circle",
    status: "preview",
    metric: "3 trusted testers",
    strategy: "Invite a tiny group that can break the loop, react to episodes and validate that rewards feel honest.",
    unlock: "Manual invite only"
  },
  {
    id: "creator-loop",
    title: "Creator Loop",
    status: "locked",
    metric: "YouTube Season 0",
    strategy: "Turn public episodes into missions, patch notes and feedback quests instead of pure referral farming.",
    unlock: "Publish pilot episode"
  },
  {
    id: "partner-seeds",
    title: "Partner Seeds",
    status: "locked",
    metric: "0 partner tools",
    strategy: "Let external builders add game generators only after owned ecosystem loops have retention.",
    unlock: "Atlas Rank 3"
  }
];
