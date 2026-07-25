export type ResourceCode = "compute" | "knowledge" | "contribution";

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
  category: "physical" | "digital" | "subscription" | "product" | "decoration";
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

export interface MissionRepo {
  id: string;
  name: string;
  description: string;
  options: string[];
  correct: string;
}
