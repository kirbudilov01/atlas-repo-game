# 10 — Screen Specification

Revision 2 goal: make the MVP buildable without inventing the first mobile screen from scratch.

## MVP Visual Approach

The MVP is not a free-camera open world. It is an interactive 2.5D scene with:

- one carefully composed mobile viewport;
- fixed/pseudo-isometric Our Room;
- interactive objects;
- characters and real devices;
- bottom sheets for object details;
- HUD for essential resources;
- world-object navigation;
- no ordinary SaaS dashboard;
- no complex camera controls.

Principle:

> The game is on top. Product information appears below through contextual bottom sheets.

## Mobile Viewport Composition

Target viewport: Telegram mobile, approximately `390x844`.

### Default Our Room Layout

| Zone | Height | Content |
|---|---:|---|
| Top HUD | 11% | Season, Compute, Knowledge, level/profile |
| Room Scene | 58% | characters, Atlas Core, devices, terminals, locked doors |
| Context Bar | 18% | current quest, Generate CTA, selected-object summary |
| Bottom Nav | 13% | Room, Factory, Atlas, Network, ID |

### Top HUD

Left to right:

- `Season 0`;
- mini autonomy chip: `$0 / $3,000` or mock progress;
- Compute pill;
- Knowledge pill;
- profile/level chip.

Optional action:

- `Reality Update` small icon/button in top-right overflow.

States:

- loading: skeleton pills;
- error: only Room title + retry indicator;
- compact: hide autonomy chip on very small screens.

### Room Scene

Visible objects:

- Kirill on left-middle;
- Black Box on right-middle;
- Atlas Core in center foreground;
- MacBook left desk;
- Mac mini right desk/server shelf;
- old Dell lower-left/side desk;
- AtlasRepo Terminal back-left;
- Want2View Terminal back-right;
- YouTube Wall on back wall;
- Network Terminal side console;
- Funding Hub strategy table;
- Network door locked;
- My Room door locked;
- Create Project slot locked.

Visual hierarchy:

1. Atlas Core is largest interactive object.
2. Real devices are next.
3. Terminals are smaller but visibly tappable.
4. Locked doors are atmospheric and readable.

No more than 3 attention-grabbing animations at once.

### Context Bar

Default state:

- current quest title: `Power up the room`;
- progress: `Click Atlas Core 20 times`;
- primary CTA: `Generate`;
- secondary text: `Earn Compute to buy your first generator`.

After selecting object:

- object name;
- one-line purpose;
- output/effect;
- primary action;
- secondary action `Details`.

### Bottom Nav

Items:

- Room;
- Factory;
- Atlas;
- Network;
- ID.

MVP behavior:

- Room: current screen.
- Factory: opens generator panel/bottom sheet.
- Atlas: opens AtlasRepo Terminal.
- Network: opens mock Network Terminal or locked preview.
- ID: opens profile card.

## Bottom Sheets

### Object Sheet

Height: 45-70% depending content.

Sections:

1. Header: name, type, status.
2. Visual/stat row.
3. What it does.
4. Output/effect.
5. Connected products.
6. Primary CTA.
7. Secondary CTA.

States:

- loading;
- available;
- locked;
- boosted;
- claimable;
- error.

### Generator Purchase Sheet

Fields:

- generator name;
- output;
- cost;
- production rate;
- requirement;
- product link;
- buy button.

First generator:

```text
Compute Generator
Cost: 25 Compute
Output: +6 Compute/hour
```

### Atlas Terminal Sheet

MVP quest:

```text
AtlasRepo First Scan
Review 3 repositories and pick categories.
Reward: 25 Knowledge + 5 Contribution
```

UI:

- 3 repo cards;
- category choices;
- progress;
- claim reward button.

### Mock Sheets

Want2View:

- title;
- future reward preview;
- locked `Trend Scanner` note;
- CTA disabled: `Unlock after Atlas Rank 2`.

Network Terminal:

- referral link mock;
- Build Your Network quest preview;
- Network Power locked.

Funding Hub:

- `Activate New Mac mini` mock campaign;
- goal/progress;
- support tiers disabled;
- legal safe copy.

Reward Vault:

- available preview;
- locked rewards;
- no real claim in prototype.

## Screen Texts

Onboarding short copy:

1. `Welcome to Our Ecosystem`
2. `Click the Atlas Core to generate Compute.`
3. `Use Compute to build generators and support real projects.`
4. `Your contribution unlocks access, rewards and history.`
5. `No token. No guaranteed return. Utility first.`

Primary room quest:

```text
Power up the room
Click Atlas Core 20 times to buy your first Compute Generator.
```

Locked My Room:

```text
Your Room
Coming soon: build your own AI factory.
```

Locked Create Project:

```text
Create Project
Level 20 required.
```

## Transitions

- Tap object -> object pulses -> bottom sheet slides up.
- Click Atlas Core -> particles -> resource tween -> character reaction.
- Buy generator -> generator card appears -> CTA changes to collect/wait.
- Complete quest -> reward glow -> profile Contribution updates.
- Tap locked door -> small shake -> locked sheet.

## Error States

- resource save failed: `Progress saved locally. Sync unavailable.`
- insufficient Compute: show needed amount and fastest way to earn.
- mission already claimed: show completed state.
- unsupported Telegram context: run in prototype mode with mock user.

## Acceptance Criteria

In 20 seconds the user should understand:

- this is Kirill and Black Box's living room/ecosystem;
- real devices are part of the game;
- Atlas Core produces Compute;
- Compute builds generators;
- AtlasRepo and Want2View are real product terminals;
- future rooms/network/projects exist but are locked.

