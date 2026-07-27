import type { CSSProperties } from "react";
import { deviceGenerators } from "../config/deviceGenerators";
import { fundingGoals } from "../config/funding";
import { activeTasks, agentRoster, bottleneckTracks, collectionSets, productionChain, roomStages, seasonEvents } from "../config/idleMeta";
import { perkShop } from "../config/perks";
import { products } from "../config/products";
import { getTotalComputeRatePerHour, type GameState } from "../store/gameStore";

export type AppView = "ecosystem" | "participate" | "our-room" | "my-room" | "market";

interface Props {
  view: Exclude<AppView, "our-room">;
  state: GameState;
  onBuild: () => void;
  onBuyGenerator: () => void;
  onBuyDeviceGenerator: (generatorId: string) => void;
  onMockSupportMacMini: () => void;
  onBuyPerkReward: (perkId: string) => void;
}

const marketExtras = [
  { id: "beta-access", title: "Beta Access", category: "access", cost: 250, body: "Early access badge for new ecosystem features." },
  { id: "promo-boost", title: "Promo Boost", category: "promo", cost: 300, body: "Feature your project in a future FabricBot promo slot." },
  { id: "ai-tool-pack", title: "AI Tool Pack", category: "tools", cost: 600, body: "Reserve a bundle of future AI workflow helpers." },
  { id: "community-slot", title: "Community Project Slot", category: "community", cost: 900, body: "Apply to add a moderated project into the ecosystem." }
];

export function AppPages({ view, state, onBuild, onBuyGenerator, onBuyDeviceGenerator, onMockSupportMacMini, onBuyPerkReward }: Props) {
  if (view === "ecosystem") return <EcosystemPage state={state} />;
  if (view === "participate") return <ParticipatePage state={state} onMockSupportMacMini={onMockSupportMacMini} />;
  if (view === "my-room") return <MyRoomPage state={state} onBuild={onBuild} onBuyGenerator={onBuyGenerator} onBuyDeviceGenerator={onBuyDeviceGenerator} />;
  return <MarketPage state={state} onBuyPerkReward={onBuyPerkReward} />;
}

function getBottleneckValue(state: GameState, id: string, base: number) {
  if (id === "compute") return Math.min(96, base + state.generatorLevel * 12 + state.purchasedDeviceGeneratorIds.length * 10 + Math.floor(state.resources.compute / 80));
  if (id === "attention") return Math.min(92, base + (state.atlasMission.status === "claimed" ? 20 : 0) + state.accountLevel * 3);
  if (id === "trust") return Math.min(94, base + state.resources.contribution * 4 + (state.mockSupportUsd > 0 ? 10 : 0));
  return Math.min(90, base + Math.floor((state.mockSupportUsd / 3000) * 70));
}

function getLoopProgress(state: GameState) {
  return [
    { id: "collect", label: "Collect", value: Math.min(100, state.coreClicks * 4), detail: `${Math.floor(state.resources.compute)} pts` },
    { id: "upgrade", label: "Upgrade", value: state.generatorPurchased ? 72 + state.generatorLevel * 4 : Math.min(100, state.resources.compute * 4), detail: state.generatorPurchased ? `L${state.generatorLevel} generator` : "25 pts gate" },
    { id: "assign", label: "Assign", value: state.atlasMission.status === "claimed" ? 100 : Object.keys(state.atlasMission.answers).length * 33, detail: "agents/tasks" },
    { id: "event", label: "Event", value: Math.min(100, Math.floor((state.mockSupportUsd / 3000) * 100) + (state.atlasMission.status === "claimed" ? 12 : 0)), detail: "season goal" }
  ];
}

function EcosystemPage({ state }: { state: GameState }) {
  const heroSrc = `${import.meta.env.BASE_URL}assets/game/ecosystem-factory-hero-v1.png`;

  return (
    <section className="app-page ecosystem-page">
      <header className="game-hero ecosystem-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>FabricBot Ecosystem</span>
          <h1>Current Products</h1>
          <p>AtlasRepo, Want2View, FabricBot and the public YouTube build story.</p>
        </div>
        <div className="factory-diorama" aria-hidden="true">
          <i className="factory-base" />
          <i className="factory-tower" />
          <i className="factory-screen" />
          <i className="factory-park park-a" />
          <i className="factory-park park-b" />
        </div>
      </header>
      <LoopRail state={state} />
      <ProductStoryBoard />
      <ProductionChain state={state} />
      <section className="product-launch-grid">
        {products.map((product, index) => (
            <article className={`launch-card launch-${product.color}`} style={{ "--i": index } as CSSProperties} key={product.id}>
              <i className="launch-icon" />
              <div>
                <strong>{product.name}</strong>
                <span>{product.description}</span>
                <em>LVL {12 - index}</em>
                <small><u style={{ width: `${Math.max(36, 76 - index * 9)}%` }} /></small>
              </div>
              <b />
            </article>
        ))}
      </section>
      <article className="ecosystem-level-card">
        <div>
          <span>Ecosystem Level</span>
          <strong>Lv. 12</strong>
          <em>2,450 / 3,600 XP</em>
        </div>
        <i><b /></i>
      </article>
      <BottleneckBoard state={state} />
      <div className="ecosystem-map compact-map">
        <div className="map-grid" />
        <div className="ecosystem-road road-a" />
        <div className="ecosystem-road road-b" />
        <div className="ecosystem-road road-c" />
        <div className="ecosystem-core">
          <i className="core-room-icon" />
          <strong>Our Room</strong>
          <span>central project room</span>
        </div>
        {products.map((product, index) => (
          <article className={`ecosystem-node node-${index} product-${product.color}`} key={product.id}>
            <i className="product-icon" />
            <div>
              <b>{product.name}</b>
              <span>{product.role}</span>
            </div>
            <em>{product.metric}</em>
          </article>
        ))}
      </div>
      <AgentBench compact />
      <div className="page-card-grid">
        <article className="page-card">
          <strong>SaaS Factory</strong>
          <span>Launch small products, subscriptions and internal tools.</span>
        </article>
        <article className="page-card">
          <strong>Payment Bot</strong>
          <span>Future access, promo and subscription layer. Mock-only for now.</span>
        </article>
      </div>
    </section>
  );
}

function ProductStoryBoard() {
  return (
    <section className="product-story-board">
      <div className="section-head">
        <span>Story entry</span>
        <strong>Real products become game chapters</strong>
      </div>
      <div className="story-product-grid">
        {products.map((product, index) => (
          <article className={`story-product-card tone-${product.color}`} key={product.id}>
            <i>{index + 1}</i>
            <div>
              <strong>{product.name}</strong>
              <span>{product.role}</span>
              <em>{product.metric}</em>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ParticipatePage({ state, onMockSupportMacMini }: { state: GameState; onMockSupportMacMini: () => void }) {
  const heroSrc = `${import.meta.env.BASE_URL}assets/game/support-runway-hero-v1.png`;
  const totalSupport = state.mockSupportUsd;
  const runwayGoal = fundingGoals[0];
  const runwayProgress = Math.min(100, Math.floor((totalSupport / runwayGoal.targetUsd) * 100));
  const supportCredit = totalSupport;

  return (
    <section className="app-page participate-page">
      <header className="game-hero support-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>Participate & Support</span>
          <h1>Ecosystem Runway</h1>
          <p>Keeping the mission alive and building for the future.</p>
        </div>
        <div className="support-heart" aria-hidden="true"><i /></div>
      </header>
      <LoopRail state={state} />
      <article className="runway-card">
        <div className="runway-top">
          <div>
            <span>Current runway</span>
            <strong>${totalSupport} / ${runwayGoal.targetUsd}</strong>
          </div>
          <div className="runway-ring" style={{ "--progress": `${runwayProgress}%` } as CSSProperties}>
            <b>{runwayProgress}%</b>
          </div>
        </div>
        <i style={{ width: `${runwayProgress}%` }} />
        <p>{runwayGoal.strategy}</p>
      </article>
      <LatestSupportReceipt state={state} />
      <section className="need-grid">
        <MiniNeed icon="compute" label="AI Compute" value="48%" />
        <MiniNeed icon="feature" label="New Features" value="72%" />
        <MiniNeed icon="marketing" label="Marketing" value="36%" />
        <MiniNeed icon="talent" label="Talent" value="61%" />
      </section>
      <button className="wallet-preview-card" onClick={onMockSupportMacMini}>
        <span>Telegram Wallet preview</span>
        <strong>$1000 support route</strong>
        <em>Mock only · records FBC credit</em>
      </button>
      <button className="ghost-button wide" onClick={onMockSupportMacMini}>Mock support $1000 · get 1000 FBC</button>
      <section className="support-summary-grid">
        <article>
          <span>FBC Coins balance</span>
          <strong>{supportCredit} FBC</strong>
        </article>
        <article>
          <span>Build Points</span>
          <strong>{Math.floor(state.resources.compute)}</strong>
        </article>
      </section>
      <SupportLedger state={state} />
      <article className="currency-rules-card">
        <strong>Two core balances</strong>
        <p><b>Build Points</b> are earned in-game and spent on generators, rooms and progress. <b>FBC Coins</b> are support credits from donations/perks; later they may connect to ecosystem utility, but they are not equity, yield or a guaranteed token.</p>
      </article>
      <article className="disclaimer-card">
        <strong>Important disclaimer</strong>
        <p>FBC is a game credit / reservation only. No equity, no profit promise, no guaranteed token and no cash redemption.</p>
      </article>
      <SeasonEventBoard state={state} />
      <BottleneckBoard state={state} />
    </section>
  );
}

function MiniNeed({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <article className={`need-card need-${icon}`}>
      <i />
      <strong>{label}</strong>
      <span>{value}</span>
    </article>
  );
}

function LatestSupportReceipt({ state }: { state: GameState }) {
  const latest = state.supportLedger[0];
  return (
    <article className="latest-support-receipt">
      <div>
        <span>Latest support</span>
        <strong>{latest ? latest.supporterName : "Waiting for first supporter"}</strong>
      </div>
      <div>
        <span>{latest ? latest.target : "Donation journal"}</span>
        <b>{latest ? `+$${latest.amountUsd} · ${latest.fbcCoins} FBC` : "0 FBC"}</b>
      </div>
    </article>
  );
}

function SupportLedger({ state }: { state: GameState }) {
  const legacyEntry = state.mockSupportUsd > 0 && state.supportLedger.length === 0
    ? [{ id: "legacy-support", supporterName: "Early supporter", amountUsd: state.mockSupportUsd, fbcCoins: state.mockSupportUsd, target: "Mac mini render node", note: "Legacy local support entry from prototype state.", status: "mock" as const }]
    : [];
  const rows = [...state.supportLedger, ...legacyEntry];
  return (
    <section className="support-ledger standalone support-journal">
      <div className="support-ledger-head">
        <div>
          <strong>Public Support Journal</strong>
          <span>donations → FBC Coins → ecosystem history</span>
        </div>
        <b>${state.mockSupportUsd}</b>
      </div>
      {rows.length === 0 ? (
        <div className="support-empty-row">
          <strong>No supporter entries yet</strong>
          <span>Tap the wallet preview to add a mock donation and show how a real supporter would appear here.</span>
        </div>
      ) : rows.map((entry) => (
        <div className="supporter-row journal-row" key={entry.id}>
          <i className="supporter-avatar" />
          <div>
            <strong>{entry.supporterName}</strong>
            <span>${entry.amountUsd} to {entry.target}</span>
            <em>{entry.note}</em>
          </div>
          <b>+{entry.fbcCoins} FBC</b>
        </div>
      ))}
      <p className="support-journal-note">This journal is the public memory of support. It can later be connected to real wallet receipts and ecosystem utility after legal/product rules are ready.</p>
    </section>
  );
}

function MyRoomPage({ state, onBuild, onBuyGenerator, onBuyDeviceGenerator }: { state: GameState; onBuild: () => void; onBuyGenerator: () => void; onBuyDeviceGenerator: (generatorId: string) => void }) {
  const totalRate = getTotalComputeRatePerHour(state);
  const myRoomBg = `${import.meta.env.BASE_URL}assets/game/my-room-game-bg-v1.png`;

  return (
    <section className="app-page my-room-page">
      <header className="room-title-bar">
        <div className="room-badge">My Room</div>
        <div className="room-currency-pill"><span>FBC</span><strong>{Math.floor(state.resources.fbc)}</strong></div>
      </header>
      <div className="player-room-stage">
        <img className="my-room-bg" src={myRoomBg} alt="" draggable={false} />
        <div className="my-room-grade" />
        <div className="room-wall-panel" />
        <div className="room-floor-plane" />
        <div className="runner-track">
          <span className="runner-dot" />
          <em>auto runner</em>
        </div>
        <div className="room-monitor monitor-left"><i /></div>
        <div className="room-monitor monitor-right"><i /></div>
        <div className="player-room-window" />
        <button className="room-clicker-object" onClick={onBuild}>
          <span className="tap-rings" />
          <i />
          <b>Build</b>
          <span>+ room points</span>
        </button>
        <div className="room-sofa" />
        <article className="mac-mini-card">
          <span>Mac mini</span>
          <strong>Render Node</strong>
          <em>Lvl 6</em>
        </article>
        <article className="render-power-card">
          <span>Render Power</span>
          <strong>84%</strong>
        </article>
        <div className="room-shelf shelf-left">
          <i />
          <strong>Desk</strong>
        </div>
        <div className="room-shelf shelf-right">
          <i />
          <strong>AI bot</strong>
        </div>
      </div>
      <LoopRail state={state} />
      <RoomStagePath state={state} />
      <div className="stat-grid">
        <div><span>Room points</span><strong>{Math.floor(state.resources.compute)}</strong></div>
        <div><span>Income</span><strong>{totalRate}/hr</strong></div>
        <div><span>Level</span><strong>{state.accountLevel}</strong></div>
        <div><span>FBC</span><strong>{Math.floor(state.resources.fbc)}</strong></div>
      </div>
      <AgentBench />
      <TaskDeck />
      {!state.generatorPurchased && <button className="primary-cta" onClick={onBuyGenerator}>Buy first room generator · 25</button>}
      <section className="room-upgrade-grid">
        {deviceGenerators.map((item) => {
          const owned = state.purchasedDeviceGeneratorIds.includes(item.id);
          return (
            <article className={`room-upgrade-card tier-card-${item.tier} ${owned ? "is-owned" : ""}`} key={item.id}>
              <i className="upgrade-aura" />
              <div className={`upgrade-icon tier-${item.tier}`} />
              <strong>{item.name}</strong>
              <span>+{item.ratePerHour}/hr</span>
              <em>{item.unlock}</em>
              <button disabled={owned} onClick={() => onBuyDeviceGenerator(item.id)}><span>{owned ? "Owned" : `${item.costCompute} pts`}</span></button>
            </article>
          );
        })}
      </section>
    </section>
  );
}

function MarketPage({ state, onBuyPerkReward }: { state: GameState; onBuyPerkReward: (perkId: string) => void }) {
  const heroSrc = `${import.meta.env.BASE_URL}assets/game/market-rewards-hero-v1.png`;

  return (
    <section className="app-page market-page">
      <header className="game-hero market-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>Market</span>
          <h1>Perks from the FabricBot Ecosystem</h1>
          <p>Boost your support mission. Unlock, earn and reserve rewards.</p>
        </div>
        <div className="reward-box" aria-hidden="true"><i /></div>
      </header>
      <LoopRail state={state} />
      <div className="market-balance">
        <i />
        <div>
          <span>Available FBC</span>
          <strong>{Math.floor(state.resources.fbc)}</strong>
        </div>
      </div>
      <div className="market-tabs" aria-hidden="true">
        <span>All</span>
        <span>Promos</span>
        <span>Access</span>
        <span>Tools</span>
      </div>
      <CollectionShelf />
      <section className="market-grid">
        {perkShop.map((perk, index) => {
          const owned = state.purchasedPerkRewardIds.includes(perk.id);
          const affordable = state.resources[perk.costResource] >= perk.costAmount;
          return (
            <article className={`market-card market-card-${index}`} style={{ "--i": index } as CSSProperties} key={perk.id}>
              <i className="market-card-glow" />
              <div className={`market-icon category-${perk.category}`} />
              <strong>{perk.title}</strong>
              <span>{perk.benefitPreview}</span>
              <em>{perk.category}</em>
              <button disabled={owned || !affordable} onClick={() => onBuyPerkReward(perk.id)}>
                <span>{owned ? "Reserved" : `${perk.costAmount} FBC`}</span>
              </button>
            </article>
          );
        })}
        {marketExtras.map((perk, index) => (
          <article className={`market-card market-extra-${index}`} style={{ "--i": index + 4 } as CSSProperties} key={perk.id}>
            <i className="market-card-glow" />
            <div className={`market-icon category-${perk.category}`} />
            <strong>{perk.title}</strong>
            <span>{perk.body}</span>
            <em>{perk.category}</em>
            <button disabled><span>{perk.cost} FBC</span></button>
          </article>
        ))}
      </section>
      <article className="page-card add-project-card">
        <strong>Add your project later</strong>
        <span>Future partners will be able to add projects into the ecosystem after moderation.</span>
      </article>
      <SeasonEventBoard state={state} compact />
    </section>
  );
}

function LoopRail({ state }: { state: GameState }) {
  return (
    <section className="loop-rail" aria-label="Idle tycoon loop">
      {getLoopProgress(state).map((step, index) => (
        <article className={`loop-step loop-${step.id}`} key={step.id}>
          <i>{index + 1}</i>
          <div>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </div>
          <b><u style={{ width: `${step.value}%` }} /></b>
        </article>
      ))}
    </section>
  );
}

function ProductionChain({ state }: { state: GameState }) {
  const unlocked = state.generatorPurchased ? 3 : Math.min(2, Math.floor(state.resources.compute / 15));
  return (
    <section className="production-chain">
      <div className="section-head">
        <span>Production chain</span>
        <strong>Idea → launch → runway</strong>
      </div>
      <div className="chain-track">
        {productionChain.map((step, index) => (
          <article className={`chain-node tone-${step.tone} ${index <= unlocked ? "is-live" : ""}`} key={step.id}>
            <i />
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function BottleneckBoard({ state }: { state: GameState }) {
  return (
    <section className="bottleneck-board">
      <div className="section-head">
        <span>Strategy board</span>
        <strong>Current bottlenecks</strong>
      </div>
      {bottleneckTracks.map((track) => {
        const value = getBottleneckValue(state, track.id, track.base);
        return (
          <article className={`bottleneck-row tone-${track.color}`} key={track.id}>
            <div>
              <strong>{track.label}</strong>
              <span>{track.source}</span>
            </div>
            <b>{value}%</b>
            <i><u style={{ width: `${value}%` }} /></i>
          </article>
        );
      })}
    </section>
  );
}

function AgentBench({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`agent-bench ${compact ? "is-compact" : ""}`}>
      <div className="section-head">
        <span>AFK layer</span>
        <strong>Agent bench</strong>
      </div>
      <div className="agent-grid">
        {agentRoster.map((agent) => (
          <article className={`agent-card tone-${agent.color}`} key={agent.id}>
            <i />
            <strong>{agent.name}</strong>
            <span>{agent.rarity} · {agent.station}</span>
            <em>{agent.bonus}</em>
          </article>
        ))}
      </div>
    </section>
  );
}

function TaskDeck() {
  return (
    <section className="task-deck">
      <div className="section-head">
        <span>Expeditions</span>
        <strong>Assign next task</strong>
      </div>
      {activeTasks.map((task) => (
        <article className="task-card" key={task.id}>
          <i />
          <div>
            <strong>{task.title}</strong>
            <span>{task.requires} · {task.time}</span>
          </div>
          <b>{task.reward}</b>
        </article>
      ))}
    </section>
  );
}

function SeasonEventBoard({ state, compact = false }: { state: GameState; compact?: boolean }) {
  return (
    <section className={`season-event-board ${compact ? "is-compact" : ""}`}>
      <div className="section-head">
        <span>LiveOps</span>
        <strong>Season 0 events</strong>
      </div>
      {seasonEvents.map((event) => {
        const value = event.id === "funding-sprint" ? Math.min(100, Math.floor((state.mockSupportUsd / 3000) * 100)) : event.progress;
        return (
          <article className="event-row" key={event.id}>
            <div>
              <strong>{event.title}</strong>
              <span>{event.goal}</span>
            </div>
            <b>{event.reward}</b>
            <i><u style={{ width: `${value}%` }} /></i>
          </article>
        );
      })}
    </section>
  );
}

function CollectionShelf() {
  return (
    <section className="collection-shelf">
      <div className="section-head">
        <span>Collections</span>
        <strong>Long-term sets</strong>
      </div>
      <div className="collection-grid">
        {collectionSets.map((set) => {
          const progress = Math.floor((set.owned / set.total) * 100);
          return (
            <article className="collection-card" key={set.id}>
              <i />
              <strong>{set.title}</strong>
              <span>{set.owned}/{set.total} · {set.reward}</span>
              <b><u style={{ width: `${progress}%` }} /></b>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RoomStagePath({ state }: { state: GameState }) {
  const compute = state.resources.compute + state.purchasedDeviceGeneratorIds.length * 120 + state.generatorLevel * 80;
  return (
    <section className="room-stage-path">
      <div className="section-head">
        <span>Base progression</span>
        <strong>Room evolution</strong>
      </div>
      <div className="stage-track">
        {roomStages.map((stage) => (
          <article className={compute >= stage.threshold ? "is-live" : ""} key={stage.id}>
            <i />
            <strong>{stage.title}</strong>
            <span>{stage.threshold} pts</span>
          </article>
        ))}
      </div>
    </section>
  );
}
