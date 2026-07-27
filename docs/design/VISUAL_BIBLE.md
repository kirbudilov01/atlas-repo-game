# Atlas Repo Game Visual Bible

This file is the visual source of truth before implementation. Code should follow these boards first:

- `atlas-repo-game-visual-direction-board-v1.png`
- `atlas-repo-game-onboarding-ui-kit-v1.png`
- `atlas-repo-game-our-room-screen-v1.png`
- `atlas-repo-game-my-room-screen-v1.png`
- `atlas-repo-game-economy-progression-v1.png`

## Product Feel

Atlas Repo Game is a premium mobile idle tycoon inside Telegram. It should feel like a warm game about building real products from one founder room, not like a SaaS admin dashboard.

Core mood:

- Dark teal base, warm gold highlights, green reward states.
- Cozy founder room energy: couch, computers, Mac mini, real project progress.
- Glossy game cards, soft 3D/isometric objects, clear HUD.
- Every screen should make the player want to tap, claim, upgrade, unlock, or support.

## Main Screens

### Onboarding

Use 5 animated slides:

1. Welcome to Atlas Repo Game.
2. Our Ecosystem.
3. Support the System.
4. Unlock Your Room.
5. Earn Game Credits.

Onboarding should feel like a game intro carousel, not a form. It needs swipe motion, progress dots, and a strong final CTA.

### Ecosystem

This is the product map / Bot Factory.

Required elements:

- Isometric FabricBot product campus.
- Product cards for AtlasRepo, Want2View, FabricBot, SaaS Factory.
- Ecosystem level and XP progress.
- Bottom nav with exactly 5 tabs.

### Participate

This is crowdfunding/support, not investment.

Required elements:

- Ecosystem runway progress ring.
- What We Need tiles: AI Compute, New Features, Marketing, Talent.
- Support ledger rows.
- CTA: "How do you want to participate?"
- Wallet/payment UI must stay preview/mock until real terms are ready.

### Our Room

This is the emotional center of the game.

Required elements:

- Real founder room feeling: couch, desk, monitors, laptop, wall grid, cables.
- Couch clicker / tap target in the center.
- Mac mini Render Node card.
- Room MRR card.
- FabricBot Ecosystem portal.
- My Room portal.
- Shared mission card.

The real room photo remains important for videos and public storytelling. Generated visuals can guide style, but the product should keep the "real room became a game" idea.

### My Room

This is the personal idle tycoon screen.

Required elements:

- Player profile and room rank.
- Room earnings, multiplier, FBC balance.
- Couch Clicker, AI Assistant, Idea Board, Plant, Ambient Light, Locked Slot.
- Upgrade shop: Coffee Station, Bookshelf, Wall Art, Speaker Set, Mac mini Render Node.
- Missions and time boosts.

### Market

This is the perk shop.

Required elements:

- Reward/gift hero.
- Perk filters.
- Cards: Render Priority, Beta Access, Promo Boost, AI Tool Pack, SaaS Starter Kit, Extra Storage.
- Community Projects section.

## Economy Language

Allowed:

- FBC game credit.
- FBC reservation credit.
- Crowdfunding support.
- Support ledger.
- Perks, access, promos, boosts.
- Mock wallet preview.

Forbidden for MVP:

- Guaranteed token.
- Equity.
- Profit share.
- Investment return.
- Dividends.
- Any promise that FBC has real-world redeemable value.

Core disclaimer:

> FBC is a game credit / reservation only. It has no real-world value and is not redeemable for cash or tokens.

## Implementation Priority

1. Match the visual composition of the generated boards.
2. Build reusable UI components: HUD, nav, cards, item cards, reward buttons, progress rings.
3. Keep screen density high but readable on mobile.
4. Use generated art as style targets; replace important art with project-specific assets over time.
5. Only after visual direction is stable, implement backend economy details.
