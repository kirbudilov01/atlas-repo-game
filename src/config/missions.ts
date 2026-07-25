import type { MissionRepo } from "../types/game";

export const atlasFirstScanRepos: MissionRepo[] = [
  {
    id: "repo-agents",
    name: "agent-lab",
    description: "A toolkit for chaining AI agents with browser and file actions.",
    options: ["Agent Framework", "Design Tool", "Video Utility"],
    correct: "Agent Framework"
  },
  {
    id: "repo-video",
    name: "shorts-pipeline",
    description: "Scripts for clipping, captioning and packaging short-form video.",
    options: ["Video Automation", "Database", "Crypto Wallet"],
    correct: "Video Automation"
  },
  {
    id: "repo-research",
    name: "oss-radar",
    description: "A crawler that discovers trending open-source AI repositories.",
    options: ["Research", "Payments", "Music"],
    correct: "Research"
  }
];
