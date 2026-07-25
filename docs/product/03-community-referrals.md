# 03 — Community and Referrals

## AtlasRepo Community

Roles:

- Scout;
- Analyst;
- Curator;
- Tester;
- Educator;
- Builder;
- Promoter.

Contribution validation:

- duplicate detection;
- minimum quality rules;
- reputation-weighted votes;
- moderation queue for rewards;
- cooldowns;
- spam flags.

## Network Terminal

Shows:

- invite link;
- invited users;
- active users;
- Network Power;
- partner level;
- product links;
- conversions;
- pending rewards.

## Referral Event Map

```text
REFERRAL_LINK_CREATED
  -> REFERRAL_VISITED
  -> USER_JOINED
  -> ONBOARDING_COMPLETED
  -> PRODUCT_VISITED
  -> PRODUCT_ACTIVATED
  -> PURCHASE_CONFIRMED
  -> HOLD_COMPLETED
  -> PARTNER_REWARD_GRANTED
```

## Attribution

MVP:

- Telegram `startapp` parameter;
- store inviter id before onboarding;
- one inviter per user;
- no self-referral.

Later:

- product-specific links;
- cookie fallback for web;
- webhook conversions;
- campaign-specific attribution windows.

## Anti-MLM Rules

- direct sale commission only on level 1;
- level 2 can produce small game-only Community Power;
- no deeper financial rewards;
- clear UI language: partner commission, not passive income.

## Partner Levels

| Level | Condition | Unlock |
|---|---|---|
| Scout | 1 invite | basic links |
| Connector | 5 active | better game rewards |
| Promoter | 3 purchases | real commission |
| Ambassador | 20 active | promo materials |
| Ecosystem Partner | stable sales | higher rate |
| Launch Partner | selected | pre-release access |

