# 09 — Roadmap, Risks, Decisions

## Roadmap

### Phase 0

Master spec, design direction, one-day slice.

### Phase 1

Playable room, clicker, generators, missions, profile.

### Phase 2

Backend, Telegram auth, server balances, rewards.

### Phase 3

FabricBot integration: checkout, benefits, promo codes.

### Phase 4

Referral campaigns and Network Terminal.

### Phase 5

Personal room and generator marketplace.

### Phase 6

Partner products and moderation.

### Phase 7

TON utility experiments only after review.

## Controversial Questions

| Question | Recommendation |
|---|---|
| Product name | keep Atlas Repo Game internal, test public names |
| Token now? | no |
| Real commissions MVP? | no, placeholder |
| Supabase day one? | only if setup speed is good |
| Canvas engine? | no for first day, use DOM/CSS |
| Personal room MVP? | locked preview |
| Third-party projects? | not MVP |

## Main Risks

- scope explosion;
- legal wording;
- reward abuse;
- referral fraud;
- weak visual quality;
- no clear first-minute loop;
- data model overengineering;
- missing FabricBot endpoints.

## Recommended Decisions

- Build day-1 with config-driven DOM room.
- Use local persistence first if backend slows delivery.
- Keep three resources in HUD.
- Make rewards mostly previews until FabricBot integration.
- Do not launch token language beyond "future digital economy".

