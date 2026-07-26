# Known Issues

## Current

- Visual assets are still prototype-grade and need final illustration/Figma replacement.
- Current room map is a cropped real photo; final production needs a cleaned, stylized game-art pass.
- Hotspot coordinates are hand-tuned for the current mobile crop and may need adjustment on wider layouts.
- Scan mode currently reveals labels but does not group/filter hotspots by system type.
- Prototype storage is local only and not secure against manipulation.
- Offline income is intentionally simple and should move server-side in Production Mode.
- Resource transaction journal is local-only and limited to latest 30 entries.
- Atlas Rank and contribution history are local-only and can be manipulated.
- First Scan answers use mock repository cards, not live AtlasRepo data.
- Asset Index values are hand-authored prototype numbers, not synced from real subscriptions, devices or accounting.
- Asset category filters are local UI only; there is no search, detail drilldown or admin editor yet.
- Referral, reward, funding and Want2View systems are mock-only.
- Funding goals have no payment provider, accounting backend, receipt flow or entitlement checks.
- FBC is a local mock support-credit only, not a real token, GRAM, equity instrument, claim, account balance or redeemable asset.
- Mock Mac mini support can only simulate the $1000 target locally; it does not process money or create a legal obligation.
- Perk Shop reservations are local-only previews and do not grant real lessons, promo codes, subscription discounts or render queue access.
- Network Terminal has no invite tracking, anti-abuse logic or verified action model.
- Reward Vault tiers are previews and do not grant real lessons, discounts, subscriptions or partner tools.
- No lint script is configured yet.
- No automated tests are configured yet.
- No Telegram SDK/initData validation is implemented.
- No admin/config editor exists; configs are static TypeScript files.

## Watch List

- HUD crowding on very narrow screens.
- Bottom sheet height on small devices.
- Economy tuning may be too generous after generator upgrades are added.
- Atlas Rank thresholds are rough prototype values and need balance testing.
- Asset Index adds more room density and may need layout tuning after final art.
- Support-goal wording needs legal review before any real money flow.
- FBC/TON/GRAM wording needs legal and platform review before any public token or payment messaging.
- Scene object density may become too high as more systems unlock.
