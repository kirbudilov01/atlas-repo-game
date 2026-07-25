# Decisions Log

## 2026-07-25

### Decision: Use Prototype Mode localStorage before backend

Reason: Revision 2 explicitly allows localStorage and mock user while real Telegram/Supabase/FabricBot integrations are absent.

Temporary: yes.

Revisit when: real rewards, referrals, payments, or server-authoritative balances become active.

### Decision: Use CSS/SVG-like placeholder art

Reason: final illustrations do not exist; the instruction says absence of final art is not a blocker.

Temporary: yes.

Revisit when: artist-ready asset pack exists.

### Decision: MVP active resources are Compute, Knowledge and Contribution

Reason: Revision 2 narrowed MVP economy to one finished loop. Other resources remain locked/preview.

Temporary: partly.

Revisit when: Want2View, referrals, rewards, and Network systems become complete loops.

### Decision: Hide labels for locked scene objects

Reason: labels for locked objects created visual clutter and edge overflow on mobile. Locked objects already display `LOCKED`; details open on tap.

Temporary: yes.

Revisit when: final art/room layout provides more space for object naming.

### Decision: Keep Our Room as DOM/CSS 2.5D instead of canvas

Reason: faster to iterate, easier to keep accessible, sufficient for first vertical slice.

Temporary: yes.

Revisit when: animation complexity or scene density requires Pixi/Phaser.

### Decision: Store a local resource transaction journal in Prototype Mode

Reason: Stage 2 requires a local ledger-like history without backend. Keeping the latest 30 transactions makes economy changes auditable for QA while staying lightweight.

Temporary: yes.

Revisit when: Production Mode introduces server-side resource_transactions.

### Decision: Compute Generator output scales by level with a simple formula

Reason: Stage 2 needs visible upgrade progression before full economy tuning exists.

Temporary: yes.

Revisit when: Factory includes multiple generators and synergies.

### Decision: Derive Atlas Rank from Contribution instead of storing a separate rank

Reason: Stage 3 needs reputation-like progression without real tokens, payouts or server authority. Deriving rank from Contribution keeps the prototype simple and auditable while still making the player identity feel persistent.

Temporary: partly.

Revisit when: Production Mode introduces server-side contribution_events and anti-abuse rules.

### Decision: Keep contribution events local and mission-sourced

Reason: The first vertical slice should prove the loop before connecting real AtlasRepo, FabricBot, Telegram identity or reward grants.

Temporary: yes.

Revisit when: real lessons, promos, partner tools or tokenized reputation become active.
