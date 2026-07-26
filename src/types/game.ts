export type ResourceCode = "compute" | "knowledge" | "contribution" | "fbc";

export type RoomObjectType =
  | "core"
  | "asset"
  | "terminal"
  | "locked"
  | "character"
  | "generator"
  | "goal"
  | "reward";

export interface RoomObjectConfig {
  id: string;
  type: RoomObjectType;
  label: string;
  subtitle: string;
  visualId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  linkedEntityId?: string;
  accent?: "compute" | "atlas" | "funding" | "network" | "neutral";
  lockedReason?: string;
}

export interface AssetUpgrade {
  id: string;
  title: string;
  requirement: string;
  effect: string;
  status: "locked" | "available" | "funding" | "completed";
}

export interface Asset {
  id: string;
  slug: string;
  name: string;
  category: "physical" | "digital" | "subscription" | "product" | "content" | "community" | "decoration";
  owner: "ecosystem" | "kirill" | "partner" | "user";
  status: "active" | "offline" | "degraded" | "expiring" | "planned" | "funding" | "retired";
  conditionPct?: number;
  moneyValueUsd?: number;
  monthlyCostUsd?: number;
  utilityScore: number;
  purpose: string;
  realFunction: string[];
  gameFunction: string[];
  connectedProductIds: string[];
  connectedSubscriptionIds: string[];
  producedResource?: ResourceCode;
  outputModifier?: number;
  currentLoadPct?: number;
  visualState: string;
  upgradePath: AssetUpgrade[];
  realityUpdates: string[];
  fundingRelationship?: string;
}

export interface Product {
  id: string;
  name: string;
  role: string;
  metric: string;
  description: string;
  color: "atlas" | "compute" | "funding" | "network";
}

export interface GeneratorType {
  id: string;
  name: string;
  description: string;
  producedResource: ResourceCode;
  costCompute: number;
  ratePerHour: number;
  linkedProductId: string;
}

export interface DeviceGenerator {
  id: string;
  name: string;
  tier: "starter" | "pro" | "render";
  description: string;
  costCompute: number;
  ratePerHour: number;
  unlock: string;
}

export interface MissionRepo {
  id: string;
  name: string;
  description: string;
  options: string[];
  correct: string;
}

export interface NetworkNode {
  id: string;
  title: string;
  status: "locked" | "preview" | "active";
  metric: string;
  strategy: string;
  unlock: string;
}

export interface FundingGoal {
  id: string;
  title: string;
  targetUsd: number;
  currentUsd: number;
  strategy: string;
  useOfFunds: string[];
  perkPreview: string;
  status: "mock" | "planned" | "locked";
}

export interface RewardTier {
  id: string;
  title: string;
  requirement: string;
  benefitPreview: string;
  status: "locked" | "preview" | "unlocked";
}

export interface PerkReward {
  id: string;
  title: string;
  category: "promo" | "lesson" | "render" | "access";
  costResource: ResourceCode;
  costAmount: number;
  benefitPreview: string;
  disclaimer: string;
}
