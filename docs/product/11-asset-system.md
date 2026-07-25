# 11 — Asset System

Revision 2 goal: make real assets a working system, not decorative cards.

## Asset Categories

| Category | Definition | Example | Can produce resources? |
|---|---|---|---|
| Physical Asset | real hardware/object | Mac mini | yes |
| Digital Asset | real digital infrastructure | GitHub, domain | yes |
| Subscription | recurring paid tool | ChatGPT/Codex | yes/effect |
| Product | real product/service | AtlasRepo | indirectly |
| Generator | player-owned game machine | Compute Generator | yes |
| Room Decoration | visual/cosmetic object | poster, lamp | no or tiny bonus |

## Core Distinctions

Physical/digital assets belong to the ecosystem reality layer. Generators belong to the player's game economy. Products are business entities. Decorations are visual state.

An object can be displayed in the same room but should have one primary type and linked relationships.

## Asset Fields

```ts
type AssetStatus = "active" | "offline" | "degraded" | "expiring" | "planned" | "funding" | "retired";

interface Asset {
  id: string;
  slug: string;
  name: string;
  category: "physical" | "digital" | "subscription" | "product" | "decoration";
  owner: "ecosystem" | "kirill" | "partner" | "user";
  status: AssetStatus;
  conditionPct?: number;
  moneyValueUsd?: number;
  monthlyCostUsd?: number;
  utilityScore: number;
  purpose: string;
  connectedProductIds: string[];
  connectedSubscriptionIds: string[];
  producedResource?: "compute" | "knowledge" | "attention";
  outputModifier?: number;
  currentLoadPct?: number;
  visualState: string;
  upgradePath: AssetUpgrade[];
  realityUpdateIds: string[];
  fundingCampaignId?: string;
}

interface AssetUpgrade {
  id: string;
  title: string;
  requirement: string;
  effect: string;
  status: "locked" | "available" | "funding" | "completed";
}
```

## MacBook

Real function:

- primary founder workstation;
- writing, planning, product decisions;
- content review;
- Telegram/community operations.

Game function:

- boosts Vision;
- unlocks content/project planning actions;
- improves Reality Update frequency.

Output:

- `+5% Knowledge from Atlas missions`;
- `+5 Vision/hour` as internal room stat post-MVP.

Connected products:

- AtlasRepo;
- Want2View;
- YouTube/Content.

Connected subscriptions:

- ChatGPT/Codex;
- GitHub;
- Figma.

Visual states:

- active: screen lit, Kirill nearby;
- overloaded: many windows, warm light;
- offline: dark screen;
- boosted: green/purple glow.

Upgrade path:

- external monitor;
- better stand/workstation;
- content capture setup;
- backup drive.

Funding relationship:

- usually not first public funding object;
- can appear in Reality Updates.

## Mac mini

Real function:

- local production/infrastructure node;
- AI agents;
- rendering;
- automation;
- data jobs.

Game function:

- boosts Execution;
- increases Compute production;
- supports Video Agent and AtlasRepo background tasks.

Output:

- `+12% Compute production` when active;
- optional `+5% Video Credits` later.

Connected products:

- AtlasRepo;
- Video Agent;
- internal automations.

Connected subscriptions:

- Codex/GitHub;
- cloud storage;
- API credits.

Load:

- shown as `Current Load: 73%` mock in MVP.

Visual states:

- active: subtle fan light;
- high load: pulsing orange;
- upgraded: extra SSD/object appears;
- offline: gray/dark.

Upgrade path:

- add external SSD;
- add cooling stand;
- connect to render queue;
- add backup power.

Funding relationship:

- can be linked to `Activate New Mac mini` or `Add external SSD` campaign.

## Old Dell

Real function:

- legacy laptop;
- experiments;
- backup/research tasks.

Game function:

- low-efficiency research node;
- starts weak but has satisfying upgrade path.

Output:

- `+2 Knowledge/hour` when revived;
- post-upgrade can run background parser.

Connected products:

- AtlasRepo;
- Data Scraper;
- research missions.

Connected subscriptions:

- GitHub;
- open-source tooling.

Visual states:

- overloaded: flickering screen;
- repaired: stable screen;
- server mode: terminal UI;
- offline: closed lid.

Upgrade path:

- clean disk;
- add RAM;
- install Linux;
- connect second monitor;
- turn into Legacy Research Node.

Funding relationship:

- good YouTube/Reality Update object, less suitable for paid funding unless tied to content episode.

## Room Stats: Vision and Execution

Kirill and Black Box become functional through two room stats.

### Vision

Represents ideas, storytelling, product direction and content momentum.

Sources:

- Kirill actions;
- YouTube Wall;
- MacBook;
- Reality Updates;
- Content Generator.

Effects:

- unlocks missions;
- increases Attention later;
- boosts Funding Hub narrative.

### Execution

Represents infrastructure, shipping, automation and technical progress.

Sources:

- Black Box actions;
- Mac mini;
- old Dell upgrades;
- Compute Generator;
- Atlas Core boosts.

Effects:

- improves generator production;
- unlocks device upgrades;
- speeds project milestones.

MVP display:

- not full resource HUD;
- show as two small room status chips in asset sheets or profile preview.

## Character Functions

### Kirill

Actions:

- writes idea;
- records content;
- reviews product;
- posts update;
- starts mission.

Triggered by:

- YouTube Wall tap;
- Reality Update;
- AtlasRepo mission complete;
- Funding campaign update.

### Black Box

Actions:

- repairs device;
- upgrades node;
- runs automation;
- deploys module;
- boosts generator.

Triggered by:

- Mac mini tap;
- old Dell upgrade;
- generator purchase;
- Atlas Core combo.

## Reality Update Relationship

Every asset can be changed by Reality Updates:

- status change;
- new upgrade;
- new visual state;
- connected campaign;
- output modifier change;
- story text.

Example:

```text
REALITY UPDATE #04
Mac mini connected as local AI node.
Asset status: active.
Execution +8.
Compute production +12%.
```

