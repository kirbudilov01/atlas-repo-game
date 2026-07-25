# Known Issues

## Current

- Visual assets are placeholders and need final illustration replacement.
- Room labels are readable but dense; final art pass should reduce text reliance.
- Prototype storage is local only and not secure against manipulation.
- Offline income is intentionally simple and should move server-side in Production Mode.
- Resource transaction journal is local-only and limited to latest 30 entries.
- Atlas Rank and contribution history are local-only and can be manipulated.
- First Scan answers use mock repository cards, not live AtlasRepo data.
- Asset Index values are hand-authored prototype numbers, not synced from real subscriptions, devices or accounting.
- Asset category filters are local UI only; there is no search, detail drilldown or admin editor yet.
- Referral, reward, funding and Want2View systems are mock-only.
- Funding goals have no payment provider, accounting backend, receipt flow or entitlement checks.
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
- Scene object density may become too high as more systems unlock.
