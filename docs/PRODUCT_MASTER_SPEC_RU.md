# Atlas Repo Game / Ecosystem OS — Product Master Spec

Статус: draft source of truth  
Дата: 2026-07-25  
Репозиторий: `/Users/kirill/Documents/IDLE`

## Оглавление

1. [Executive Summary](#1-executive-summary)
2. [Что уже реализовано в текущем репозитории](#2-что-уже-реализовано-в-текущем-репозитории)
3. [Product Vision](#3-product-vision)
4. [Product Positioning](#4-product-positioning)
5. [Why This Product Should Exist](#5-why-this-product-should-exist)
6. [Target Audiences](#6-target-audiences)
7. [User Personas](#7-user-personas)
8. [Core User Problems](#8-core-user-problems)
9. [Product Principles](#9-product-principles)
10. [World and Narrative](#10-world-and-narrative)
11. [Product Ecosystem Map](#11-product-ecosystem-map)
12. [Core Gameplay Loop](#12-core-gameplay-loop)
13. [Meta Progression](#13-meta-progression)
14. [Clicker Mechanics](#14-clicker-mechanics)
15. [Idle Mechanics](#15-idle-mechanics)
16. [Resources and Economy](#16-resources-and-economy)
17. [Generators](#17-generators)
18. [Real Assets](#18-real-assets)
19. [Projects](#19-projects)
20. [AtlasRepo Community](#20-atlasrepo-community)
21. [Real Product Benefits](#21-real-product-benefits)
22. [Referral and Partner System](#22-referral-and-partner-system)
23. [Funding Hub](#23-funding-hub)
24. [Future Digital Economy](#24-future-digital-economy)
25. [YouTube and Personal Brand Loop](#25-youtube-and-personal-brand-loop)
26. [Networking and Masteries](#26-networking-and-masteries)
27. [Future Third-Party Projects](#27-future-third-party-projects)
28. [Screens and Navigation](#28-screens-and-navigation)
29. [Detailed User Flows](#29-detailed-user-flows)
30. [UX States](#30-ux-states)
31. [Visual Design System](#31-визуальная-система)
32. [Animation Specification](#32-animation-specification)
33. [Sound Design Suggestions](#33-sound-design-suggestions)
34. [MVP Scope](#34-mvp-scope)
35. [Explicit Non-Goals](#35-explicit-non-goals)
36. [Post-MVP Roadmap](#36-post-mvp-roadmap)
37. [Technical Architecture](#37-technical-architecture)
38. [Data Model](#38-data-model)
39. [API and Domain Events](#39-api-and-domain-events)
40. [Telegram Mini App Integration](#40-telegram-mini-app-integration)
41. [FabricBot Integration](#41-fabricbot-integration)
42. [Future TON Integration](#42-future-ton-integration)
43. [Admin Panel](#43-admin-panel)
44. [Analytics and KPIs](#44-analytics-and-kpis)
45. [Security and Anti-Fraud](#45-security-and-anti-fraud)
46. [Legal and Communication Risks](#46-legal-and-communication-risks)
47. [Testing Strategy](#47-testing-strategy)
48. [Deployment Strategy](#48-deployment-strategy)
49. [One-Day Implementation Plan](#49-one-day-implementation-plan)
50. [Prioritized Engineering Backlog](#50-prioritized-engineering-backlog)
51. [Acceptance Criteria](#51-acceptance-criteria)
52. [Open Questions](#52-open-questions)
53. [Decisions That Must Be Made Later](#53-decisions-that-must-be-made-later)
54. [Приложения](#54-приложения)
55. [Финальные списки](#55-финальные-списки)

Подробные документы:

- [00-overview.md](product/00-overview.md)
- [01-game-design.md](product/01-game-design.md)
- [02-economy.md](product/02-economy.md)
- [03-community-referrals.md](product/03-community-referrals.md)
- [04-funding-tokenization.md](product/04-funding-tokenization.md)
- [05-ux-visual.md](product/05-ux-visual.md)
- [06-technical-architecture.md](product/06-technical-architecture.md)
- [07-data-model.md](product/07-data-model.md)
- [08-mvp-plan.md](product/08-mvp-plan.md)
- [09-roadmap.md](product/09-roadmap.md)
- [10-screen-specification.md](product/10-screen-specification.md)
- [11-asset-system.md](product/11-asset-system.md)

## 1. Executive Summary

Мы создаём Telegram Mini App в формате idle tycoon/clicker, но продукт не сводится к кликеру. Это игровая операционная система для цифровых проектов, активов, людей, денег, комьюнити, партнёрских программ и будущей utility-экономики.

Короткая формула:

> Игрок строит собственную AI-фабрику внутри живой экосистемы Кирилла и Black Box, получает игровые ресурсы, реальные бонусы продуктов, реферальные награды и постоянную историю вклада.

Роли внутри экосистемы:

- FabricBot: финансовый двигатель под капотом.
- AtlasRepo: база знаний, discovery-ядро и каталог возможностей.
- Want2View: первый коммерческий продукт и пример продуктовой воронки.
- Game / Ecosystem OS: живой интерфейс, где всё это становится миром, прогрессией, социальным слоем и distribution engine.

Revision 2 decision: первая версия должна быть не “дашбордом с комнатой”, а визуально убедительным главным экраном Our Room с одним завершённым игровым циклом.

- onboarding;
- Our Room;
- Atlas Core clicker;
- 3 реальных актива;
- 1 working generator;
- AtlasRepo Terminal;
- mock terminals for Want2View, Network, Funding and YouTube;
- профиль;
- сохранение прогресса.

## 2. Что уже реализовано в текущем репозитории

Реально работает:

- Нет рабочего приложения.
- Нет frontend/backend кода.
- Нет Telegram Mini App интеграции.
- Нет базы данных.
- Нет FabricBot API интеграции.
- Нет платежей, рефералов, наград, генераторов или кликера.

Существующие файлы:

- `ATLAS_REPO_GAME_GDD.md` — большой черновой GDD/концепт.
- `MVP_BACKLOG.md` — черновой backlog.
- `docs/PRODUCT_MASTER_SPEC_RU.md` — этот master spec.
- `docs/product/*` — детализация по подсистемам.

Мокапы:

- Все механики сейчас описаны только в документах.
- Все числа экономики являются стартовыми гипотезами.

Захардкожено:

- Ничего не захардкожено в коде, потому что кода нет.
- В документах в качестве первых проектов зафиксированы AtlasRepo, Want2View, FabricBot, Video Agent.

Отсутствует:

- UI.
- игровые данные.
- авторизация Telegram.
- anti-cheat.
- admin panel.
- аналитика.
- реальные reward claims.
- юридически проверенные формулировки.

## 3. Product Vision

Создать живой Telegram-мир, где пользователи:

- играют;
- строят личную AI-инфраструктуру;
- узнают реальные продукты через gameplay;
- получают полезные бонусы;
- распространяют продукты;
- поддерживают прозрачные миссии;
- формируют постоянную историю вклада;
- позже получают доступ к utility/on-chain слоям, если они будут юридически и экономически оправданы.

Vision statement:

> A living game OS where real founder life, product building, AI tools, community contribution, and distribution become one playable ecosystem.

## 4. Product Positioning

Для пользователя:

> Живая цифровая экосистема, где ты строишь свою AI-фабрику, открываешь продукты, получаешь бонусы и развиваешь сеть контактов.

Для основателей/партнёров в будущем:

> Игровой канал запуска, тестирования и дистрибуции цифровых продуктов.

Не позиционируем как:

- инвестиционную платформу;
- обещание доли;
- токен с ожидаемой доходностью;
- MLM;
- обычную платёжную форму FabricBot.

## 5. Why This Product Should Exist

Проблема рынка:

- SaaS-продукты сложно объяснять и распространять.
- Лояльность пользователей обычно плоская: подписка, скидка, email.
- Комьюнити часто не имеет измеримой пользы для участников.
- Крипто-проекты часто начинают с пустого токена вместо реального utility.
- Личный бренд редко превращается в системную продуктовую экономику.

Почему этот продукт имеет шанс:

- игра объясняет продукты нативно;
- progression даёт причину возвращаться;
- реальные бонусы создают практическую ценность;
- рефералы становятся gameplay, а не отдельной вкладкой;
- публичный сериал создаёт постоянные сюжетные обновления;
- FabricBot может обслуживать платежи, доступы и партнёрку;
- AtlasRepo может наполнять мир продуктами и технологиями.

## 6. Target Audiences

| Аудитория | Мотивация | MVP value |
|---|---|---|
| Подписчики Кирилла | Следить за строительством экосистемы | Our Room, Reality Updates, YouTube Wall |
| AI/tool энтузиасты | Открывать инструменты и учиться | AtlasRepo Terminal, Knowledge |
| Создатели контента | Искать тренды и промо | Want2View, Attention |
| Разработчики | Находить проекты и задачи | AtlasRepo quests, будущие bounties |
| Промоутеры/партнёры | Зарабатывать и строить сеть | Network Terminal |
| Ранние supporters | Получить статус и benefits | Founder Pass, Digital Receipt |
| Основатели SaaS, позже | Дистрибуция и тестировщики | Partner Projects |

## 7. User Personas

1. Viewer Operator: пришёл из YouTube, хочет “потыкать” и понять, что строится.
2. Research Scout: любит находить GitHub-проекты и AI-инструменты.
3. Distribution Player: хочет приглашать людей, получать Network Power и партнёрские бонусы.
4. Product User: хочет бесплатные исследования, уроки, промокоды.
5. Early Backer: готов поддерживать миссии за статус, доступ и историю участия.
6. Future Founder: хочет позже запустить свой проект внутри мира.

## 8. Core User Problems

| Problem | Product answer |
|---|---|
| “Я не понимаю, зачем мне этот SaaS” | Генераторы объясняют продукт через игру |
| “Донатить скучно” | Funding missions дают прогресс, rewards, историю |
| “Рефералка выглядит как маркетинг” | Network Terminal превращает её в gameplay |
| “Мне нечего показать друзьям” | share cards, room, generators, rank |
| “Я хочу быть частью движения” | Contribution, Reputation, Genesis badges |
| “Крипто звучит мутно” | no empty token narrative, utility first |

## 9. Product Principles

1. Game first, dashboard second.
2. Реальные продукты должны давать реальную пользу уже сейчас.
3. Не обещать прибыль, долю, дивиденды или токены.
4. Reputation нельзя купить напрямую.
5. Данные и объекты должны быть data-driven.
6. Игровая экономика не должна ломать экономику SaaS.
7. Рефералы должны измерять качество сети.
8. Каждый экран должен быть объектом мира.
9. MVP должен ощущаться живым, даже если часть зон locked.
10. FabricBot под капотом, не на фасаде.

## 10. World and Narrative

Пространства:

- Our Room: реальная комната Кирилла и Black Box.
- My Room: личная AI-фабрика игрока.
- Network: социальный слой и мастера.
- Project Worlds: AtlasRepo, Want2View, FabricBot, Video Agent.

Season 0 narrative:

> We are building the first autonomous AI ecosystem room. Goal: reach $3,000/month ecosystem autonomy.

Эта цель не является обещанием инвесторам. Это сюжетная и операционная цель.

## 11. Product Ecosystem Map

```text
YouTube/X/Telegram
        ↓
  Reality Updates
        ↓
    Our Room
   /   |    \
AtlasRepo  Want2View  Funding Hub
   |          |           |
Knowledge  Attention   Support history
   \          |          /
       Player Economy
             |
      Network Terminal
             |
       Product Distribution
             |
          FabricBot
```

## 12. Core Gameplay Loop

```text
Open app
→ onboard
→ click Atlas Core
→ earn Compute
→ buy generator
→ collect idle output
→ complete AtlasRepo/Want2View mission
→ support project with resources
→ earn Contribution/Reputation
→ unlock reward
→ invite user
→ grow Network Power
→ return tomorrow
```

Ценность для пользователя: понятный прогресс и реальные benefits.  
Ценность для бизнеса: product education, retention, referrals, funding, data, community.

## 13. Meta Progression

| Layer | What grows | Unlocks |
|---|---|---|
| Account Level | XP from actions | UI areas, slots, rewards |
| Atlas Rank | Contribution + Knowledge | lessons, AtlasRepo perks |
| Reputation | verified quality | trust, moderation, partner access |
| Network Power | active referrals | partner levels, Traffic Node boosts |
| Generator levels | resources spent | production, real rewards |
| Season progress | event missions | collectibles, story |
| Ecosystem Capital | total contribution history | future eligibility, no guarantees |

## 14. Clicker Mechanics

MVP click object: Atlas Core.

Start hypothesis:

| Mechanic | Value |
|---|---:|
| Base click | `+1 Compute` |
| Energy cost | none in day-1 MVP |
| Click session window | 10 seconds |
| Session cap before server submit | 50 clicks |
| Combo threshold 1 | 10 clicks: `Focus x1.2` for 20s |
| Combo threshold 2 | 25 clicks: `System Boost x1.5` for 30s |
| Combo threshold 3 | 50 clicks: rare drop roll 2% |
| Soft anti-bot | ignore impossible click cadence > 12/sec |
| Server aggregation | submit click sessions, not every click |

Formula:

```text
click_compute = floor(base_click * combo_multiplier * temporary_boost)
```

Clicking should provide the first 2-5 minutes of excitement, then generators become primary progress.

## 15. Idle Mechanics

Offline income:

```text
offline_seconds = min(now - last_collected_at, offline_cap_seconds)
earned = sum(generator_rate_per_sec * offline_seconds * modifiers)
```

MVP cap:

- first day: 2 hours offline cap;
- after account level 5: 4 hours;
- after Founder/boost: up to 8 hours.

Anti-abuse:

- server time only;
- no client-trusted timestamps;
- resource transactions stored;
- generator ownership checked server-side.

## 16. Resources and Economy

MVP resources:

| Resource | Keep MVP? | Why |
|---|---|---|
| Compute | yes | primary action/resource |
| Knowledge | yes | AtlasRepo loop |
| Attention | locked/preview | no complete day-1 loop yet |
| Contribution | yes | non-transferable history |
| Reputation | locked/preview | quality/trust later |
| Network Power | locked/preview | referrals/social later |
| Credits | mock only | real payment unit later |

Avoid showing all resources in top HUD. MVP HUD:

- Compute;
- Knowledge;
- Profile badge for Contribution.

Detailed economy: [02-economy.md](product/02-economy.md).

## 17. Generators

Working MVP generator:

| Generator | Produces | Product link | First reward |
|---|---|---|---|
| Compute Generator | Compute | core game | starts idle loop |

Interactive/mock generator chain:

| Generator | Produces | Product link | First reward |
|---|---|---|---|
| GitHub Scanner | Knowledge | AtlasRepo | free lesson |
| Trend Scanner | Attention | Want2View | free research |

Post-MVP:

- Data Scraper;
- AI Research Agent;
- Content Generator;
- Traffic Node;
- Video Render Farm;
- Sales Agent;
- Community Hub.

Cost formula:

```text
upgrade_cost(level) = base_cost * growth_rate ^ (level - 1)
```

Suggested growth rate: `1.18` for MVP.  
Detailed table: [02-economy.md](product/02-economy.md).

## 18. Real Assets

Assets in Our Room:

- MacBook;
- Mac mini;
- old Dell;
- ChatGPT/Codex;
- Figma;
- GitHub;
- AtlasRepo codebase;
- Want2View codebase;
- YouTube channel;
- Telegram community.

Asset card fields:

- name;
- type;
- owner;
- status;
- condition;
- purchase value;
- monthly cost;
- Utility Score;
- purpose;
- connected products;
- produced resource;
- current load;
- visual state;
- update history;
- actions.

Invisible Capital: code, audience, trust, content, datasets, automations, reputation, partnerships.

Detailed real asset system: [11-asset-system.md](product/11-asset-system.md).

## 19. Projects

First projects:

- AtlasRepo: knowledge/discovery core.
- Want2View: commercial trend/content intelligence.
- FabricBot: payment/monetization infrastructure.
- Video Agent: future media automation.

Project card:

- status;
- mission;
- metrics;
- funding needs;
- linked generators;
- linked rewards;
- partner campaign;
- roadmap.

## 20. AtlasRepo Community

Roles:

- Scout;
- Analyst;
- Curator;
- Tester;
- Educator;
- Builder;
- Promoter.

MVP quest:

```text
AtlasRepo First Scan
1. Open Atlas Terminal.
2. Review 3 example repositories.
3. Pick a category for each.
4. Answer one quality question.
5. Earn 25 Knowledge + 5 Contribution.
```

Verification:

- duplicate check;
- minimum text length;
- majority agreement;
- manual moderation for high rewards;
- reputation-weighted validation later.

## 21. Real Product Benefits

Rewards Center should show:

- available;
- locked;
- claimed;
- expired;
- pending verification.

Safe first rewards:

| Reward | Condition | Business cost | Abuse risk | Limit |
|---|---|---:|---|---|
| Free AtlasRepo lesson | first Atlas quest | low | low | once |
| 1 Want2View research | 3 active friends or Trend L10 | medium | medium | monthly cap |
| 5% discount | account level 5 | low | low | 30 days |
| 7 days AtlasRepo Pro | 5 active friends | medium | medium | once/season |
| Early access | Reputation threshold | low | low | manual/flag |

FabricBot should grant benefits by issuing promo codes, subscription extensions, service credits, or access flags.

## 22. Referral and Partner System

Core formula:

```text
play -> discover product -> get personal link -> bring user -> earn game + real rewards
```

Rules:

- real commission only direct sales;
- second level game-only small bonus;
- no infinite downline;
- quality beats raw invite count;
- hold period for paid rewards;
- refunds reverse commission;
- suspicious accounts excluded.

Network Power:

| Event | NP |
|---|---:|
| registration | 10 |
| onboarding completed | 10 |
| level 5 reached | 30 |
| AtlasRepo used | 20 |
| Want2View first run | 50 |
| purchase | 100 |

Detailed spec: [03-community-referrals.md](product/03-community-referrals.md).

## 23. Funding Hub

Funding Hub supports real missions:

- hardware;
- server;
- subscription;
- feature;
- parser;
- lesson;
- series episode;
- project launch.

Do not call everything investment. Types:

- support mission;
- preorder;
- Founder Pass;
- product purchase;
- donation;
- true investment only later with legal structure.

Campaign fields:

- goal;
- raised;
- use of funds;
- milestones;
- updates;
- reward tiers;
- status;
- refund policy;
- public history.

## 24. Future Digital Economy

Narrative:

> We are not launching an empty token. First we build products, users, revenue, code, data, knowledge, audience, partner network and utility.

Possible future primitives:

- Utility Credits;
- non-transferable Contribution Reputation;
- Access Token;
- Compute-backed token;
- Ecosystem Token;
- project launch assets.

No decision now. Requires legal review.

## 25. YouTube and Personal Brand Loop

Loop:

```text
real life -> video -> patch notes -> game mission -> community action -> result -> next video
```

MVP:

- YouTube Wall with 1-3 mock episodes;
- Reality Update feed;
- Season 0: Becoming Autonomous;
- Patch Notes panel.

## 26. Networking and Masteries

Masteries:

- Research;
- Distribution;
- Automation;
- Content;
- Code;
- Community;
- Capital;
- Design.

MVP: locked Network door + first Master profile card.

Profile model includes:

- level;
- role;
- mastery;
- Contribution;
- Reputation;
- Network Power;
- products;
- achievements;
- public assets;
- projects;
- looking for;
- can help with.

## 27. Future Third-Party Projects

Later flow:

```text
application -> moderation -> owner verification -> integration -> generator -> campaign -> launch -> analytics -> payouts -> campaign close
```

Not in MVP. Architecture must support it.

## 28. Screens and Navigation

Navigation as world objects:

| Need | World object |
|---|---|
| Assets | Asset cabinet / terminal |
| Referrals | Network Terminal |
| Funding | Strategy table |
| Profile | Character ID card |
| Products | Computers / portals |
| YouTube | Wall of screens |
| AtlasRepo | Research terminal |
| Rewards | Reward Vault |

MVP screens:

- Onboarding;
- Our Room;
- Generator purchase modal;
- Atlas Terminal;
- Want2View Terminal;
- Network Terminal;
- Rewards Center;
- Profile ID Card;
- Funding Hub;
- Locked Network;
- Locked My Room;
- Create Project locked.

Pixel-aware MVP screen spec: [10-screen-specification.md](product/10-screen-specification.md).

## 29. Detailed User Flows

Day-1 flow:

1. Open Mini App.
2. Validate Telegram user.
3. Onboarding.
4. Enter Our Room.
5. Click Atlas Core 20 times.
6. Buy Compute Generator.
7. Collect passive Compute.
8. Open Atlas Terminal.
9. Complete First Scan.
10. Support AtlasRepo with 50 Compute.
11. Unlock profile reward preview.
12. Open Network Terminal.
13. Copy/share referral deep link.
14. Reload app.
15. Progress persists.

## 30. UX States

Every key object needs states:

- locked;
- available;
- active;
- boosted;
- loading;
- error;
- empty;
- claimable;
- completed;
- expired;
- suspicious/pending review for rewards.

## 31. Визуальная система

Moodboard words:

- startup bunker;
- digital laboratory;
- 2.5D/isometric;
- cinematic monitor light;
- restrained brutalism;
- premium dark interface;
- real devices, not generic fantasy boxes.

Tokens:

| Role | Color |
|---|---|
| Base bg | `#080A0F` |
| Panel | `#111722` |
| Text | `#F4F0E8` |
| Muted text | `#9AA4B2` |
| Atlas/Knowledge | `#20C878` |
| Compute | `#8B5CF6` |
| Support/payment | `#F59E0B` |
| Rare status | `#D6AF36` |
| Danger | `#EF4444` |

Typography:

- UI: Inter or system sans.
- Numeric/terminal: JetBrains Mono.
- Avoid tiny text in Telegram viewport.

## 32. Animation Specification

MVP animations:

- Atlas Core pulse on click;
- Compute particles;
- Kirill/Black Box reaction;
- generator purchased pop;
- resource count tween;
- terminal open transition;
- locked door subtle glow;
- reward claim glow.

Performance:

- 60 FPS target on modern phones;
- fallback to reduced particles;
- no heavy canvas if DOM/CSS can carry MVP;
- optional PixiJS/Phaser post-MVP.

## 33. Sound Design Suggestions

MVP can be silent by default. Optional:

- soft click blip;
- core charge hum;
- reward unlock sound;
- generator idle hum.

Telegram etiquette: sound off by default, haptics preferred.

## 34. MVP Scope

Working:

- Telegram Mini App shell;
- onboarding;
- Our Room;
- clicker;
- resource balances;
- buy Compute Generator;
- offline income;
- AtlasRepo First Scan quest;
- MacBook/Mac mini/Dell cards;
- profile;
- local/server persistence depending chosen stack.

Demo/mock:

- Funding Hub;
- Want2View reward preview;
- YouTube Wall;
- Network Terminal;
- Reality Updates;
- Rewards Center real claim.

Locked:

- My Room;
- Network City;
- Partner Projects;
- Create Project;
- TON.

## 35. Explicit Non-Goals

MVP does not include:

- blockchain token;
- NFT minting;
- real investor ownership;
- user-created projects;
- third-party marketplace;
- real payout withdrawals;
- complex multiplayer;
- full personal room editor;
- production-grade admin panel if one-day slice;
- public legal claims about profit.

## 36. Post-MVP Roadmap

Phase 1: playable room and retention.  
Phase 2: real rewards + FabricBot integration.  
Phase 3: referral campaigns.  
Phase 4: personal room.  
Phase 5: AtlasRepo contribution marketplace.  
Phase 6: partner products.  
Phase 7: TON utility experiments after legal/economic review.

## 37. Technical Architecture

Recommended stack for MVP:

- React + TypeScript + Vite.
- Telegram Mini Apps SDK.
- Zustand for client state.
- Framer Motion for UI transitions.
- Supabase/PostgreSQL for backend if cloud setup is available.
- Serverless functions for authoritative balance, rewards, referral attribution.

Why Vite over Next.js for day-1:

- faster Mini App prototype;
- simpler static deployment;
- fewer SSR/auth edge cases.

Next.js is reasonable later if admin, server actions and dashboard grow.

Detailed architecture: [06-technical-architecture.md](product/06-technical-architecture.md).

Revision 2 mode split:

- Prototype Mode: localStorage, mock user, no real payments, no valuable referral rewards, no server-authoritative balances.
- Production Mode: Telegram initData validation, Supabase/PostgreSQL, transaction ledger, server-authoritative rewards, anti-cheat, idempotency, FabricBot integration.

## 38. Data Model

Minimum tables are listed in [07-data-model.md](product/07-data-model.md). Core rule:

> AtlasRepo, Want2View, Mac mini and generators must be config/data objects, not hardcoded UI branches.

## 39. API and Domain Events

API groups:

- auth/session;
- room/config;
- click sessions;
- resource balances;
- generators;
- missions;
- rewards;
- referrals;
- funding;
- assets;
- content/reality updates;
- admin.

Domain events include:

- USER_JOINED;
- ONBOARDING_COMPLETED;
- CORE_CLICKED;
- CLICK_SESSION_COMPLETED;
- RESOURCE_EARNED;
- RESOURCE_SPENT;
- GENERATOR_PURCHASED;
- GENERATOR_UPGRADED;
- PROJECT_SUPPORTED;
- MISSION_COMPLETED;
- REWARD_UNLOCKED;
- BENEFIT_GRANTED;
- REFERRAL_CREATED;
- REFERRAL_ACTIVATED;
- REFERRAL_CONVERTED;
- PAYMENT_CONFIRMED;
- FUNDING_CONTRIBUTION_CREATED;
- ASSET_ADDED;
- REALITY_UPDATE_PUBLISHED;
- VIDEO_RELEASED;
- MASTERY_LEVEL_CHANGED.

Concrete TypeScript interfaces and API contracts are specified in [06-technical-architecture.md](product/06-technical-architecture.md).

## 40. Telegram Mini App Integration

Requirements:

- validate `initData` server-side;
- use Telegram user id as external identity;
- support referral deep links with `startapp`;
- store attribution before onboarding;
- handle viewport/responsive quirks;
- use haptics sparingly;
- never trust client balances.

## 41. FabricBot Integration

FabricBot owns:

- checkout;
- subscriptions;
- promo codes;
- Credits later;
- partner accruals;
- access delivery;
- payment webhooks.

Game calls FabricBot for:

- create checkout;
- grant benefit;
- validate product subscription;
- issue promo code;
- record partner sale;
- sync payment status.

## 42. Future TON Integration

Not MVP.

Potential later:

- TON Connect wallet;
- collectible badges;
- non-transferable reputation proofs;
- access assets;
- utility payments.

Before launch:

- legal review;
- token utility review;
- tax/payment review;
- user communication review.

## 43. Admin Panel

Minimum admin capabilities:

- add/edit assets;
- add/edit room objects;
- add projects/products;
- configure generators;
- launch mission;
- create reward;
- publish Reality Update;
- add episode;
- create Funding Campaign;
- grant/revoke benefit;
- view referrals;
- flag users;
- manage feature flags.

For one-day MVP, admin can be seed JSON/config plus manual DB edits. For production, build a protected admin UI.

## 44. Analytics and KPIs

Funnel:

- Mini App opened;
- onboarding completed;
- first click;
- first generator;
- first project contribution;
- first mission;
- first reward viewed;
- first invite;
- invited friend activated;
- first product visit;
- first real product use;
- first payment.

KPIs:

- D1/D7/D30 retention;
- clicks per active user;
- generator conversion;
- idle collection rate;
- mission completion;
- reward redemption;
- referral activation rate;
- product CTR;
- paid conversion;
- cost of rewards;
- fraud rate;
- funding conversion.

## 45. Security and Anti-Fraud

Must have:

- Telegram initData validation;
- idempotency keys for rewards/payments;
- rate limiting;
- server-authoritative balances;
- click session validation;
- anti-bot heuristics;
- referral fraud checks;
- payment webhook verification;
- audit logs;
- privacy settings;
- moderation for user-generated content.

## 46. Legal and Communication Risks

Do not say:

- invest;
- dividends;
- passive income;
- guaranteed return;
- equity;
- token allocation guaranteed;
- revenue share unless legally structured.

Use:

- support;
- access;
- benefits;
- contribution history;
- utility;
- rewards;
- partner commission for direct sales.

Requires legal review:

- paid partner commissions;
- any token;
- any NFT with implied value;
- revenue share;
- crowdfunding wording;
- international payments/tax.

## 47. Testing Strategy

MVP tests:

- click sessions cannot over-credit;
- offline income caps;
- generator purchase spends correct resources;
- mission cannot be claimed twice;
- referral attribution persists;
- onboarding saves;
- reward unlock conditions;
- responsive Telegram viewport.

Post-MVP:

- RLS tests;
- webhook idempotency;
- fraud simulations;
- migration tests;
- load tests for click aggregation.

## 48. Deployment Strategy

One-day:

- Vite app;
- deploy to Vercel/Netlify/Cloudflare Pages;
- Supabase backend if used;
- environment variables for Telegram bot/app config;
- feature flags for mock vs live systems.

Production:

- preview/staging/prod;
- migration pipeline;
- observability;
- backup policy;
- admin access control.

## 49. One-Day Implementation Plan

Strict plan is in [08-mvp-plan.md](product/08-mvp-plan.md).

Timebox:

1. Scaffold app.
2. Build room UI.
3. Add clicker/resource store.
4. Add generator purchase/offline income.
5. Add Atlas Terminal quest.
6. Add Network Terminal referral link mock.
7. Add profile/persistence.
8. Polish visuals and locked doors.

Priority note:

> Everything outside WORKING must not block a high-quality Our Room prototype.

## 50. Prioritized Engineering Backlog

P0/P1/P2/P3 backlog is in [08-mvp-plan.md](product/08-mvp-plan.md) and Appendix B below.

## 51. Acceptance Criteria

MVP accepted when:

- app opens in mobile viewport;
- onboarding works;
- Atlas Core click visibly produces Compute;
- generator can be purchased;
- offline income persists after reload;
- AtlasRepo quest can complete once;
- Contribution/Reputation update;
- Network Terminal creates/copies referral link;
- locked future zones are visible;
- no investment/token/profit language appears;
- UI feels like a room/world, not a generic SaaS dashboard.

## 52. Open Questions

1. Final product name?
2. Use Vite or Next.js for first implementation?
3. Supabase now or local persistence for one-day prototype?
4. Which real rewards are safe to issue first?
5. What FabricBot APIs already exist?
6. What Telegram bot/app is available?
7. Is AtlasRepo Pro already real or placeholder?
8. Does Want2View have an API for credits/research?
9. Who approves funding copy/legal language?
10. What visual style should be prototyped first: DOM isometric or canvas?

## 53. Decisions That Must Be Made Later

- Token model.
- NFT/collectible model.
- Paid withdrawal mechanics.
- Third-party project admission.
- Full personal room editor.
- Network City social graph.
- Public vs private financial metrics.
- Legal structure for crowdfunding/investment-like features.

## 53.1 Ready To Build Decision

Can start coding now:

- static/config-driven Our Room;
- Atlas Core click animation;
- Compute balance;
- Compute Generator;
- localStorage persistence;
- AtlasRepo First Scan;
- asset bottom sheets for MacBook, Mac mini, Dell;
- locked/mocked future zones.

Requires design before serious build:

- final art direction;
- exact isometric object illustrations;
- Kirill/Black Box character sprites;
- polished room layout;
- microanimation style.

Requires business decision:

- final name;
- first real rewards;
- reward caps;
- public $3,000/month wording;
- Founder Pass content.

Requires integration data:

- Telegram bot/app config;
- FabricBot API contracts;
- AtlasRepo/Want2View reward APIs;
- payment webhook shape.

Requires legal review:

- paid partner commissions;
- Funding Hub wording;
- any token/NFT language;
- investment-like copy;
- refunds/consumer terms.

## 54. Приложения

### Приложение A — строгий MVP на один день

See [08-mvp-plan.md](product/08-mvp-plan.md).

Working:

- onboarding;
- Our Room;
- clicker;
- Compute Generator;
- AtlasRepo First Scan;
- Network Terminal;
- profile;
- local persistence.

Mock:

- Funding Hub;
- YouTube Wall;
- Rewards Center;
- Want2View reward.

Locked:

- My Room;
- Network City;
- Create Project;
- TON.

### Приложение B — backlog P0/P1/P2/P3

P0:

- app scaffold;
- room screen;
- Atlas Core;
- resources;
- generator;
- mission;
- persistence.

P1:

- Network Terminal;
- Rewards Center;
- Funding Hub mock;
- analytics events.

P2:

- FabricBot integration;
- real rewards;
- referral campaign events.

P3:

- personal room;
- partner projects;
- TON.

### Приложение C — карта всех экранов

```text
Onboarding
  -> Our Room
      -> Atlas Core
      -> Asset Terminal
      -> AtlasRepo Terminal
      -> Want2View Terminal
      -> Network Terminal
      -> Funding Hub
      -> YouTube Wall
      -> Reward Vault
      -> Profile ID Card
      -> Locked My Room
      -> Locked Network
      -> Locked Create Project
```

### Приложение D — схема базы данных

See [07-data-model.md](product/07-data-model.md).

### Приложение E — таблица игровых ресурсов

See [02-economy.md](product/02-economy.md).

### Приложение F — таблица генераторов

See [02-economy.md](product/02-economy.md).

### Приложение G — таблица наград и себестоимости

See [02-economy.md](product/02-economy.md).

### Приложение H — referral event map

See [03-community-referrals.md](product/03-community-referrals.md).

### Приложение I — визуальные ассеты

See [05-ux-visual.md](product/05-ux-visual.md).

### Приложение J — спорные вопросы и рекомендуемые решения

See [09-roadmap.md](product/09-roadmap.md).

### Приложение K — pixel-aware спецификация экранов

See [10-screen-specification.md](product/10-screen-specification.md).

### Приложение L — система реальных активов и персонажей

See [11-asset-system.md](product/11-asset-system.md).

## 55. Финальные списки

### Десять главных продуктовых решений

1. Это отдельная игра/Ecosystem OS, не FabricBot UI.
2. FabricBot остаётся финансовой инфраструктурой.
3. AtlasRepo является knowledge core.
4. MVP строится вокруг Our Room.
5. Кликер обязателен, но не основной долгосрочный прогресс.
6. Игрок строит личную AI-фабрику через генераторы.
7. Реальные бонусы выдаются через Rewards Center.
8. Рефералка встроена как Network Terminal.
9. Funding Hub не обещает инвестиционный доход.
10. Токенизация откладывается до появления реального utility.

### Десять главных рисков

1. Слишком широкий scope.
2. Юридически опасная коммуникация.
3. Экономика rewards может стать дорогой.
4. Реферальный fraud.
5. Игра может выглядеть как обычный dashboard.
6. Telegram UX может быть перегружен.
7. Hardcoded entities затруднят рост.
8. Нет готовых FabricBot APIs.
9. Нет достаточного визуального качества.
10. Пользователи не поймут, что делать в первые 60 секунд.

### Десять вещей, которые нельзя делать в MVP

1. Запускать токен.
2. Обещать долю.
3. Делать вывод партнёрских денег.
4. Пускать сторонние проекты без модерации.
5. Показывать чувствительные финансы.
6. Делать бесконечную MLM-структуру.
7. Строить полноценный редактор комнаты.
8. Добавлять 10 ресурсов в HUD.
9. Хардкодить все проекты в UI.
10. Делать “лендинг” вместо первой игровой комнаты.

### Точный порядок реализации

1. Scaffold.
2. Data/config seed.
3. Room UI.
4. Atlas Core.
5. Resource store.
6. Generator purchase.
7. Offline income.
8. AtlasRepo quest.
9. Profile.
10. Network Terminal.
11. Locked zones.
12. Polish.

### Список файлов, которые надо создать в репозитории

```text
src/main.tsx
src/App.tsx
src/config/seed.ts
src/stores/gameStore.ts
src/lib/telegram.ts
src/lib/economy.ts
src/components/room/OurRoom.tsx
src/components/room/RoomObject.tsx
src/components/clicker/AtlasCore.tsx
src/components/generators/GeneratorPanel.tsx
src/components/terminals/AtlasTerminal.tsx
src/components/terminals/NetworkTerminal.tsx
src/components/profile/ProfileCard.tsx
src/styles/tokens.css
```

### Предложенная структура директорий

```text
src/
  components/
    room/
    clicker/
    generators/
    terminals/
    profile/
    rewards/
  config/
  domain/
  hooks/
  lib/
  stores/
  styles/
  types/
docs/
  product/
supabase/
  migrations/
  functions/
```

### Первый набор задач для coding-агентов

1. Scaffold Vite React TS app.
2. Build design tokens and layout shell.
3. Implement Our Room with config-driven objects.
4. Implement Atlas Core click sessions.
5. Implement resource/generator store with persistence.
6. Implement AtlasRepo First Scan mission.
7. Implement Network Terminal referral link mock.
8. Implement Profile ID Card.
9. Add locked doors and visual polish.
10. Add tests for economy formulas.

### Чек-лист экспертной проверки документа

- MVP отделён от future vision.
- Нет обещаний дохода/доли/токенов.
- Есть конкретный first session flow.
- Есть экономика ресурсов с формулами.
- Есть generator table.
- Есть reward limits.
- Есть referral anti-MLM rules.
- Есть data-driven architecture.
- Есть database entities.
- Есть API/events.
- Есть legal risk notes.
- Есть one-day implementation plan.
