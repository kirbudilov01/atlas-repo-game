# 08 — MVP Plan

## One-Day Vertical Slice

### Working

- React/Vite app.
- mobile room UI.
- onboarding.
- Atlas Core clicker.
- Compute balance.
- Compute Generator purchase.
- offline income with local persistence.
- AtlasRepo First Scan mission.
- Contribution update.
- MacBook, Mac mini and Dell asset cards.
- profile card.

### Mock

- Funding Hub.
- Rewards Center real claims.
- YouTube Wall.
- Want2View reward.
- FabricBot integration.
- Network Terminal.

### Locked

- My Room.
- Network City.
- Create Project.
- TON.

## P0 Backlog

| Task | Dependency | Done when |
|---|---|---|
| scaffold app | none | app runs |
| design tokens | scaffold | UI has theme |
| room UI | tokens | objects visible |
| Atlas Core | room | clicks animate and count |
| resource store | core | Compute persists |
| generator purchase | resources | generator bought/spends |
| offline income | generator | reload shows earned |
| Atlas quest | resources | claim once |
| asset cards | room | MacBook/Mac mini/Dell sheets open |
| profile | resources | scores visible |
| locked zones | room | future world visible |

## P1 Backlog

- Network Terminal mock/deep link preview.
- Rewards Center.
- Funding Hub mock.
- YouTube Wall.
- Analytics events.

## P2 Backlog

- Supabase backend.
- Telegram initData validation.
- server authoritative balances.
- FabricBot benefit grants.
- referral events.

## P3 Backlog

- personal room.
- partner project campaigns.
- admin panel.
- TON.

## Acceptance Criteria

- first session completes in under 5 minutes;
- user knows what Compute is;
- user buys first generator;
- user sees future real reward;
- progress survives reload;
- no prohibited finance language.

## Revision 2 One-Day Cut

### Do Not Block Working Layer

These must not block the main visual prototype:

- real referral tracking;
- real rewards;
- FabricBot integration;
- backend;
- payments;
- Network City;
- My Room.

### Completed Production Chain

```text
Compute Generator
-> Compute
-> AtlasRepo First Scan
-> Knowledge
-> Atlas Rank preview / Atlas Fragment mock
-> reward preview
```

| Step | Action | Cost | Reward | UI feedback | Time |
|---|---|---:|---|---|---:|
| 1 | Click Atlas Core 20x | none | 20 Compute | particles, combo | 30s |
| 2 | Buy Compute Generator | 25 Compute | +6 Compute/hr | generator appears | 10s |
| 3 | Collect/passive wait | time | Compute | offline recap | 1-5m |
| 4 | Open Atlas Terminal | none | quest view | terminal sheet | 10s |
| 5 | Complete First Scan | 30 Compute or free first run | 25 Knowledge + 5 Contribution | reward glow | 1-2m |
| 6 | Atlas Fragment preview | 25 Knowledge | fragment mock | locked reward preview | 10s |

### MVP Economy Simplification

Fully active:

- Compute;
- Knowledge;
- Contribution.

Preview/locked:

- Attention;
- Reputation;
- Network Power;
- Credits.
