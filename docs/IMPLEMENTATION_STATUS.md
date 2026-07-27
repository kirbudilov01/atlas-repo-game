# Implementation Status

Last updated: 2026-07-26

## Current Mode

Prototype Mode.

No real payments, TON, FabricBot writes, real partner payouts, real promo codes, real subscription grants, or production integrations are connected.

Live prototype URL: `https://kirbudilov01.github.io/atlas-repo-game/`

## Current Stage

Application shell and first retention loop polish in progress. Next work can move toward richer animation, Figma/game-art production or backend boundary design.

- Stage 1: Foundation and Our Room.
- Stage 2: First game economy.
- Stage 3: AtlasRepo Community Loop.
- Stage 4: Asset System expansion.
- Stage 5: Network/Funding/Rewards mock systems.

## Completed

- React + TypeScript + Vite app scaffold.
- GitHub Pages branch-based deployment setup.
- Mobile-first Our Room shell.
- Photo-based Our Room map from the real room reference.
- GPT/imagegen redrawn Our Room game-art map for local visual testing.
- Real photo restored as the main Our Room background; generated art remains a reference, not the core room.
- Business-game HUD: MRR, Users, Compute and FBC.
- Five-tab bottom navigation: Ecosystem, Support, Room, My Room, Market.
- Bottom navigation switches full app pages instead of opening bottom sheets.
- Standalone Ecosystem, Support, My Room and Market pages.
- My Room page has a drawn room stage, top runner animation, clicker object and upgrade cards.
- Six-step animated onboarding carousel.
- Real-room hotspot layer for desk, monitors, Dell laptop, bed, wall grid and floor zones.
- More game-like room pins, couch clicker placement and bottom dock.
- Mac mini moved into the empty left room zone as a dedicated render node hotspot.
- More game-like bottom navigation glyphs.
- Real-room onboarding hero.
- Map-level Scan mode toggle.
- Mock onboarding.
- Data-driven room object configuration.
- Atlas Core clicker.
- Compute, Knowledge and Contribution resources.
- Combo counter and click animation.
- Kirill and Black Box placeholder characters.
- Real room objects: MacBook, Mac mini, Old Dell.
- Asset Index terminal.
- Expanded asset catalog across physical, digital, subscription, content and community categories.
- Asset category filters.
- Asset utility and monthly-burn summary.
- Context action bar.
- Season 0 quest progress steps.
- Bottom navigation.
- Bottom sheets.
- LocalStorage persistence.
- Debug reset.
- Compute Generator purchase.
- Compute Generator levels.
- Compute Generator upgrade cost.
- Passive/offline income.
- Device Generator Shop with phone, MacBook social kit and Mac mini render node generators.
- Offline income recap.
- Local resource transaction journal.
- AtlasRepo First Scan mission.
- Clear AtlasRepo mission states: answering, ready, claimed.
- Atlas Rank derived from Contribution.
- Contribution event history.
- Correct-answer bonus for the First Scan.
- Atlas Fragment and reward preview.
- Interactive mocks: Want2View, Network Terminal, Funding Hub, YouTube Wall, Reward Vault, Ecosystem Goal.
- Data-driven Network Terminal strategy cards.
- Data-driven Funding Hub support-goal cards.
- Mock Mac mini crowdfunding button: $1000 support preview adds 1000 local FBC and fills the Mac mini goal.
- Telegram Wallet preview button in Participate; still mock-only and not connected to real payments.
- FBC mock support-credit resource.
- Reward Vault tiers.
- Perk Shop reservations using local FBC for lesson, promo and render-priority previews.
- Locked previews: My Room, Network City, Create Project, TON Layer, Partner Marketplace.

## Mock Features

- Telegram user/auth.
- Want2View product loop.
- Network Terminal/referrals.
- Funding Hub support.
- Rewards grants.
- FBC support credits and perk reservations.
- YouTube episodes.
- Reality Updates.
- FabricBot integration.

## Locked Features

- My Room.
- Network City.
- Create Project.
- TON Layer.
- Partner Marketplace.
- Real rewards.
- Real payments.
- Real FBC/GRAM/TON token issuance.
- Real perk fulfillment.

## Latest Build

Command:

```bash
npm run build
```

Result: passing.

## Manual Test Coverage

Tested with Playwright mobile emulation:

- onboarding opens;
- enter Our Room;
- click Atlas Core;
- reach 25 Compute;
- buy Compute Generator;
- gain room visual change;
- open AtlasRepo Terminal;
- complete First Scan;
- receive Knowledge and Contribution;
- see Atlas Fragment and reward preview;
- open Mac mini asset card;
- reset prototype progress.
- open Factory and see Device Generator Shop;
- open Funding Hub and register mock Mac mini support;
- verify 1000 FBC local credit and disabled duplicate support button;
- open Reward Vault and reserve a FBC perk.

Screenshots:

- `output/playwright/onboarding.png`
- `output/playwright/our-room-final.png`
- `output/playwright/mac-mini-asset-card.png`
- `output/playwright/atlas-flow-completed.png`
- `output/playwright/profile-progress.png`
- `output/playwright/factory-generator-upgrade.png`
- `output/playwright/atlas-rank-history.png`
- `output/playwright/profile-rank-history.png`
- `output/playwright/asset-index-digital.png`
- `output/playwright/funding-hub-strategy.png`
- `output/playwright/photo-room-game-map.png`
- `output/playwright/full-app-onboarding-room.png`
- `output/playwright/full-app-room-scan-toggle.png`
- `output/playwright/full-app-atlas-nav-after-generator.png`
- `output/playwright/game-visual-pass-preview.png`
- `output/playwright/github-pages-live-fixed.png`
- `output/playwright/mac-mini-left-zone-and-shop-map.png`
- `output/playwright/device-generator-shop.png`
- `output/playwright/fbc-mac-mini-support.png`
- `output/playwright/fbc-support-claimed.png`
- `output/playwright/perk-shop-fbc.png`
- `output/playwright/perk-shop-reserved.png`
- `output/playwright/github-pages-live-fbc-build.png`
- `output/playwright/gpt-redrawn-room-preview.png`
- `output/playwright/gpt-redrawn-room-preview-clean.png`
- `output/playwright/business-onboarding-carousel-final.png`
- `output/playwright/real-room-business-shell.png`
- `output/playwright/participate-telegram-wallet-preview.png`
- `output/playwright/visible-concept-elements-room.png`
- `output/playwright/page-ecosystem.png`
- `output/playwright/page-support.png`
- `output/playwright/page-my-room.png`
- `output/playwright/page-market.png`

## Next Stage

Recommended next stage:

- retention and pacing polish;
- visual animation pass;
- Figma/illustration pass over `public/assets/our-room-map.png`;
- backend boundary design for server-authoritative balances, Telegram initData validation and reward entitlement checks.
