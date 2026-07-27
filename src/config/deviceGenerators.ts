import type { DeviceGenerator } from "../types/game";

export const deviceGenerators: DeviceGenerator[] = [
  {
    id: "phone-render-bot",
    name: "Auto Clicker Bot",
    tier: "starter",
    description: "A simple idle helper that keeps tapping room points while the player is away.",
    costCompute: 45,
    ratePerHour: 18,
    unlock: "Auto taps the room"
  },
  {
    id: "macbook-social-kit",
    name: "Storage Drive",
    tier: "pro",
    description: "Stores more generated signals, drafts and product actions before the next strategy push.",
    costCompute: 120,
    ratePerHour: 55,
    unlock: "More room capacity"
  },
  {
    id: "mac-mini-render-node",
    name: "Mac mini Ability Node",
    tier: "render",
    description: "Dedicated ability node for UBT/video generation, service promos and content strategy.",
    costCompute: 260,
    ratePerHour: 140,
    unlock: "Unlocks render abilities later"
  }
];
