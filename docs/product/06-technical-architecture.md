# 06 — Technical Architecture

## Recommended MVP Stack

- React;
- TypeScript;
- Vite;
- Telegram Mini Apps SDK;
- Zustand;
- Framer Motion;
- Supabase/PostgreSQL if backend is available;
- localStorage fallback for one-day demo;
- serverless functions for authoritative operations.

## Prototype Mode vs Production Mode

### Prototype Mode

Use for the one-day visual slice.

- localStorage persistence;
- mock Telegram user;
- config seed data;
- no real payments;
- no real reward claims;
- no valuable referral rewards;
- no server-authoritative balances;
- no FabricBot writes.

Prototype acceptance criteria must not claim production security.

### Production Mode

Use before live rewards, payments or valuable referrals.

- Telegram initData validation;
- Supabase/PostgreSQL;
- resource transaction ledger;
- server-authoritative balances;
- server-authoritative rewards;
- anti-cheat;
- idempotency;
- FabricBot integration;
- webhook validation;
- audit logs.

## Frontend

Modules:

- room renderer;
- object registry;
- clicker;
- resources;
- generators;
- missions;
- rewards;
- referrals;
- profile;
- feature flags.

## Backend

Responsibilities:

- Telegram initData validation;
- user/session creation;
- resource transactions;
- generator ownership;
- offline income;
- mission completion;
- reward grants;
- referral attribution;
- payment webhook ingestion;
- audit logs.

## Server-Authoritative Rules

Client may animate optimistic updates, but server decides:

- balances;
- generator purchase;
- mission rewards;
- referral rewards;
- benefit grants;
- payment status.

## Anti-Cheat

- aggregate click sessions;
- reject impossible click rates;
- idempotency keys;
- server timestamps;
- resource transaction ledger;
- audit logs.

## Configuration-Driven World

Objects should be data records:

- visual id;
- coordinates;
- object type;
- action type;
- linked product/project;
- locked condition;
- reward rules.

Do not hardcode AtlasRepo/Want2View branches in UI.

## TypeScript Interfaces

```ts
export type ResourceCode =
  | "compute"
  | "knowledge"
  | "attention"
  | "contribution"
  | "reputation"
  | "network_power"
  | "credits";

export interface RoomObjectConfig {
  id: string;
  roomId: string;
  type: "core" | "asset" | "terminal" | "door" | "character" | "generator" | "decoration";
  label: string;
  visualId: string;
  xPct: number;
  yPct: number;
  widthPct: number;
  heightPct: number;
  zIndex: number;
  linkedEntityType?: "asset" | "project" | "product" | "mission" | "reward";
  linkedEntityId?: string;
  defaultState: "idle" | "active" | "locked" | "offline" | "claimable";
  lockedReason?: string;
  actions: Array<"click" | "open_sheet" | "buy" | "upgrade" | "claim" | "navigate">;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  projectId: string;
  status: "mock" | "active" | "paused" | "retired";
  url?: string;
  fabricBotProductId?: string;
  rewardIds: string[];
}

export interface GeneratorType {
  id: string;
  slug: string;
  name: string;
  producedResource: ResourceCode;
  baseCost: Partial<Record<ResourceCode, number>>;
  baseRatePerHour: number;
  growthRate: number;
  maxLevel?: number;
  linkedProductId?: string;
  unlockCondition?: string;
}

export interface UserGenerator {
  id: string;
  userId: string;
  generatorTypeId: string;
  level: number;
  lastCollectedAt: string;
  createdAt: string;
}

export interface ResourceBalance {
  userId: string;
  resource: ResourceCode;
  amount: number;
  updatedAt: string;
}

export interface Mission {
  id: string;
  slug: string;
  title: string;
  projectId?: string;
  steps: MissionStep[];
  rewards: RewardGrant[];
  repeatable: boolean;
}

export interface MissionStep {
  id: string;
  type: "click" | "select" | "review" | "spend_resource" | "open_object" | "invite";
  label: string;
  requiredCount?: number;
  options?: string[];
  validation: "client_prototype" | "server" | "manual";
}

export interface Reward {
  id: string;
  slug: string;
  type: "resource" | "benefit" | "badge" | "discount" | "access" | "preview";
  title: string;
  businessCost: "none" | "low" | "medium" | "high";
  abuseRisk: "low" | "medium" | "high";
  limitPerUser?: number;
  expiresInDays?: number;
  fabricBotBenefitId?: string;
}

export interface RewardGrant {
  rewardId: string;
  amount?: number;
}

export interface RealityUpdate {
  id: string;
  title: string;
  body: string;
  seasonId?: string;
  linkedAssetIds: string[];
  linkedProjectIds: string[];
  publishedAt: string;
}
```

The `Asset` interface is specified in [11-asset-system.md](11-asset-system.md).

## API Contracts

### Submit Click Session

`POST /api/click-sessions`

Request:

```json
{
  "idempotencyKey": "click_...",
  "startedAt": "2026-07-25T12:00:00.000Z",
  "endedAt": "2026-07-25T12:00:08.000Z",
  "clickCount": 24,
  "comboTier": 1,
  "clientNonce": "random"
}
```

Response:

```json
{
  "accepted": true,
  "computeAwarded": 28,
  "balances": { "compute": 53 },
  "flags": []
}
```

### Purchase Generator

`POST /api/generators/purchase`

Request:

```json
{
  "idempotencyKey": "gen_buy_...",
  "generatorTypeId": "compute_generator"
}
```

Response:

```json
{
  "userGenerator": { "id": "ug_1", "generatorTypeId": "compute_generator", "level": 1 },
  "spent": { "compute": 25 },
  "balances": { "compute": 3 }
}
```

### Claim Offline Income

`POST /api/offline-income/claim`

Request:

```json
{
  "idempotencyKey": "offline_...",
  "clientSeenAt": "2026-07-25T13:00:00.000Z"
}
```

Response:

```json
{
  "elapsedSeconds": 3600,
  "cappedSeconds": 3600,
  "earned": { "compute": 6 },
  "balances": { "compute": 34 }
}
```

### Complete Mission

`POST /api/missions/:missionId/complete`

Request:

```json
{
  "idempotencyKey": "mission_...",
  "stepResults": [
    { "stepId": "repo_1", "value": "agent-framework" }
  ]
}
```

Response:

```json
{
  "status": "completed",
  "rewards": [
    { "resource": "knowledge", "amount": 25 },
    { "resource": "contribution", "amount": 5 }
  ],
  "unlockedRewardIds": ["atlas_fragment_preview"]
}
```

### Claim Reward

`POST /api/rewards/:rewardId/claim`

Response:

```json
{
  "status": "claimed",
  "benefitGrantId": "benefit_123",
  "expiresAt": "2026-08-25T00:00:00.000Z"
}
```

### Create Referral Link

`POST /api/referrals/links`

Request:

```json
{
  "campaignId": "game_invite_s0",
  "productId": null
}
```

Response:

```json
{
  "code": "KIR_ABC123",
  "url": "https://t.me/app_bot/app?startapp=ref_KIR_ABC123"
}
```

### Attribute Referral

`POST /api/referrals/attribute`

Request:

```json
{
  "code": "KIR_ABC123",
  "event": "ONBOARDING_COMPLETED",
  "referredUserId": "user_2"
}
```

Response:

```json
{
  "accepted": true,
  "networkPowerAwarded": 10,
  "rewardStatus": "preview"
}
```

### Grant Benefit

`POST /api/benefits/grant`

Request:

```json
{
  "idempotencyKey": "benefit_...",
  "userId": "user_1",
  "benefitId": "atlas_lesson_free",
  "source": "mission:atlas_first_scan"
}
```

Response:

```json
{
  "status": "granted",
  "fabricBotGrantId": "fb_grant_123",
  "expiresAt": null
}
```

## Admin

MVP can use seed config. Production needs admin panel.
