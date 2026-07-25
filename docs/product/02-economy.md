# 02 — Economy

## MVP Resources

| Resource | Type | Source | Sink | UI priority |
|---|---|---|---|---|
| Compute | spendable | clicks, generators, missions | generators, upgrades, support | high |
| Knowledge | spendable/progress | AtlasRepo quests | lessons, research upgrades | high |
| Attention | locked preview | Trend Scanner later | Want2View boosts later | hidden/locked |
| Contribution | non-transferable | support, missions | unlock checks | profile |
| Reputation | locked preview | verified quality later | trust gates later | profile preview |
| Network Power | locked preview | active referrals later | partner levels later | terminal preview |
| Credits | payment-like | FabricBot later | services | mock only |

Revision 2 decision:

> MVP actively uses Compute, Knowledge and Contribution only. Attention, Reputation, Network Power and Credits are visible only as future/locked stats unless a complete loop exists.

## First 30 Minutes Balance

| Minute | Expected action | Target balance |
|---:|---|---:|
| 0-2 | onboarding + first clicks | 20 Compute |
| 3-5 | buy Compute Generator | 0-10 Compute |
| 5-10 | collect + clicks | 60 Compute |
| 10-15 | Atlas First Scan | 25 Knowledge |
| 15-20 | support project | +5 Contribution |
| 20-30 | unlock preview + invite | Network Power 0-20 |

In Revision 2, Network Power in this table is a preview only. The working target is:

```text
Compute spent -> Knowledge earned -> Contribution updated -> reward preview unlocked.
```

## First Day

Target:

- 2-3 generator upgrades;
- one mission completed;
- one reward preview;
- one referral link shared;
- offline return produces visible value.

## First Week

Target:

- 3 generators unlocked;
- 5-10 levels total;
- first limited real benefit;
- at least one active invite;
- season progress visible.

## Generator Table

| Generator | Produces | Base cost | Base rate | Growth | Product | Milestone reward |
|---|---|---:|---:|---:|---|---|
| Compute Generator | Compute | 25 C | 6 C/hr | 1.18 | Core | unlock GitHub Scanner |
| GitHub Scanner | Knowledge | 80 C | 3 K/hr | 1.2 | AtlasRepo | free lesson at L5 |
| Trend Scanner | Attention | 120 C | 3 A/hr | 1.2 | Want2View | free research at L10 |
| Data Scraper | Raw Data | 180 C | 10 RD/hr | 1.22 | Want2View | bonus research |
| AI Research Agent | Knowledge | 250 C + 50 RD | converts RD | 1.22 | AtlasRepo | advanced lesson |
| Traffic Node | Attention/NP | 300 C | 5 A/hr | 1.24 | Referrals | referral boost |
| Video Render Farm | Video Credits | 500 C | 1 VC/hr | 1.25 | Video Agent | free edit |

## Completed MVP Chain

```text
Compute Generator -> Compute -> AtlasRepo First Scan -> Knowledge -> Atlas Fragment preview -> Reward preview
```

| Step | Formula/Rule |
|---|---|
| Core click | `+1 Compute` |
| Compute Generator cost | `25 Compute` |
| Compute Generator rate | `6 Compute/hour` |
| Atlas First Scan first run | free or `30 Compute` after tutorial |
| First Scan reward | `25 Knowledge + 5 Contribution` |
| Atlas Fragment preview | unlocks at `25 Knowledge` |
| Reward preview | free lesson preview, not real grant in prototype |

## Formulas

Upgrade:

```text
cost = floor(base_cost * growth_rate ^ (level - 1))
rate = base_rate * (1 + level * 0.12) * synergy_multiplier
```

Offline:

```text
earned = min(elapsed, cap) * rate_per_second
```

Inflation controls:

- offline caps;
- exponential upgrade costs;
- reward monthly caps;
- resource sinks in projects;
- diminishing returns on click bonuses;
- Reputation gates for high-value rewards.

## Reward Cost Table

| Reward | Cost to business | Abuse risk | Limit |
|---|---:|---|---|
| Free lesson | low | low | once/account |
| 5% discount | low | low | 30 days |
| Want2View research | medium/API cost | medium | 1/month free |
| AtlasRepo Pro 7 days | medium | medium | once/season |
| Video short edit | high | high | manual approval |
| Partner commission | cash cost | high | direct sale + hold |
