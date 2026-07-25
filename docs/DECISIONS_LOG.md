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

