import { useState, type CSSProperties } from "react";
import { deviceGenerators } from "../config/deviceGenerators";
import { fundingGoals } from "../config/funding";
import { activeTasks, agentRoster, bottleneckTracks, collectionSets, productionChain, roomStages, seasonEvents } from "../config/idleMeta";
import { products } from "../config/products";
import { getTotalComputeRatePerHour, type GameState } from "../store/gameStore";

export type AppView = "ecosystem" | "participate" | "our-room" | "my-room" | "market";
type GameIconName = "bp" | "autoclicker" | "storage" | "macmini" | "atlas" | "want2view" | "invite" | "partner" | "fbc";

interface Props {
  view: Exclude<AppView, "our-room">;
  state: GameState;
  onBuild: () => void;
  onBuyGenerator: () => void;
  onBuyDeviceGenerator: (generatorId: string) => void;
  onMockSupportMacMini: () => void;
  onBuyPerkReward: (perkId: string) => void;
  onBuyProductAction: (actionId: string, costCompute: number, title: string) => void;
  onClaimSocialQuest: (questId: string, rewardCompute: number, title: string) => void;
}

const marketBpOffers: Array<{ id: string; title: string; category: string; costCompute: number; body: string; icon: GameIconName }> = [
  { id: "promo-code-pool", title: "Buy Promo Code", category: "promos", costCompute: 90, body: "Reserve a future promo code for one of our services. Exact product and value will be assigned later.", icon: "atlas" },
  { id: "subscription-trial-queue", title: "Free Subscription Queue", category: "access", costCompute: 180, body: "Join the queue for a real trial. Unlock requires 14 days in the game and 3 invited people.", icon: "want2view" },
  { id: "cost-price-month", title: "Cost-Price Month", category: "access", costCompute: 260, body: "A future option to try a service near product cost for one month if the economics work.", icon: "bp" },
  { id: "partner-access-slot", title: "Partner Access Slot", category: "community", costCompute: 320, body: "Reserve intent for partner/community access after rules, forms and limits are ready.", icon: "partner" }
];

const marketDevelopmentNotes = [
  "Promo codes will be generic first, then matched to available services.",
  "Free subscriptions should unlock only after 14 days of activity and 3 invited users.",
  "Cost-price monthly access may appear if the product can handle it safely.",
  "Every real benefit needs limits, anti-abuse checks and clear fulfillment rules."
];

const autonomyRoadmap = [
  {
    id: "calm-build",
    title: "$3k/mo founder autonomy",
    goal: 3000,
    label: "Stage 1",
    body: "Projects cover Kirill's basic operating runway, tools and calm build time."
  },
  {
    id: "growth-loop",
    title: "$10k/mo growth loop",
    goal: 10000,
    label: "Stage 2",
    body: "Marketing, distribution tests, contractors and stronger product launches."
  },
  {
    id: "ecosystem-team",
    title: "$30k/mo ecosystem team",
    goal: 30000,
    label: "Stage 3",
    body: "Stable team, content/media engine and a bigger product pipeline."
  }
];

const roadmapNeeds = [
  {
    id: "now",
    label: "Need now",
    title: "Bring products to $3k MRR",
    points: ["Package FabricBot offers", "Ship AtlasRepo access flow", "Launch Want2View promos", "Keep compute and tools alive"]
  },
  {
    id: "next",
    label: "Unlock next",
    title: "Scale to $10k MRR",
    points: ["Paid marketing tests", "More video distribution", "Partner/referral loops", "First contractor budget"]
  },
  {
    id: "later",
    label: "Later",
    title: "Build the ecosystem layer",
    points: ["Community project slots", "Real wallet receipts", "FBC utility design", "TON/web3 mechanics after rules are ready"]
  }
];

const roomItemActions: Array<{ id: string; category: string; title: string; costCompute: number; detail: string; icon: GameIconName }> = [
  {
    id: "room-focus-lamp",
    category: "Room item",
    title: "Focus Lamp",
    costCompute: 60,
    detail: "A cozy desk item that marks your room as active and focused.",
    icon: "bp"
  },
  {
    id: "room-storage-drive",
    category: "Room item",
    title: "Storage Drive",
    costCompute: 120,
    detail: "Adds virtual space for drafts, notes and saved room progress.",
    icon: "storage"
  },
  {
    id: "room-idea-board",
    category: "Room item",
    title: "Idea Board",
    costCompute: 180,
    detail: "Turns your room into a planning board for future game actions.",
    icon: "partner"
  }
];

const socialQuests = [
  { id: "tell-story", title: "Tell about us", rewardCompute: 60, detail: "Share the ecosystem story in chat, channel or social feed.", icon: "invite" },
  { id: "invite-friend", title: "Invite a friend", rewardCompute: 90, detail: "Bring someone who may use AtlasRepo, Want2View or FabricBot.", icon: "invite" },
  { id: "connect-service", title: "Bring a project", rewardCompute: 140, detail: "Suggest a product/service that can join the ecosystem later.", icon: "partner" }
];

const deviceGeneratorIconById: Record<string, GameIconName> = {
  "phone-render-bot": "autoclicker",
  "macbook-social-kit": "storage",
  "mac-mini-render-node": "macmini"
};

function GameCardIcon({ icon }: { icon: GameIconName }) {
  return <i className={`game-card-icon icon-${icon}`} aria-hidden="true" />;
}

export function AppPages({ view, state, onBuild, onBuyGenerator, onBuyDeviceGenerator, onMockSupportMacMini, onBuyPerkReward, onBuyProductAction, onClaimSocialQuest }: Props) {
  if (view === "ecosystem") return <EcosystemPage state={state} />;
  if (view === "participate") return <ParticipatePage state={state} onMockSupportMacMini={onMockSupportMacMini} />;
  if (view === "my-room") return <MyRoomPage state={state} onBuild={onBuild} onBuyGenerator={onBuyGenerator} onBuyDeviceGenerator={onBuyDeviceGenerator} onBuyProductAction={onBuyProductAction} onClaimSocialQuest={onClaimSocialQuest} />;
  return <MarketPage state={state} onBuyProductAction={onBuyProductAction} />;
}

function getBottleneckValue(state: GameState, id: string, base: number) {
  if (id === "compute") return Math.min(96, base + state.generatorLevel * 12 + state.purchasedDeviceGeneratorIds.length * 10 + Math.floor(state.resources.compute / 80));
  if (id === "attention") return Math.min(92, base + (state.atlasMission.status === "claimed" ? 20 : 0) + state.accountLevel * 3);
  if (id === "trust") return Math.min(94, base + state.resources.contribution * 4 + (state.mockSupportUsd > 0 ? 10 : 0));
  return Math.min(90, base + (state.atlasMission.status === "claimed" ? 14 : 0) + state.accountLevel * 2);
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
  const mapSrc = `${import.meta.env.BASE_URL}assets/game/our-room-game-bg-v1.png`;
  const totalSupport = state.mockSupportUsd;

  return (
    <section className="app-page ecosystem-page">
      <header className="ecosystem-map-hero">
        <img className="ecosystem-map-bg" src={mapSrc} alt="" draggable={false} />
        <div className="ecosystem-map-grade" />
        <div className="ecosystem-map-title">
          <span>FabricBot Ecosystem</span>
          <strong>Project Map</strong>
          <em>Real room, real products, playable progress.</em>
        </div>
        <div className="ecosystem-map-lines" aria-hidden="true">
          <i className="map-line map-line-products" />
          <i className="map-line map-line-support" />
          <i className="map-line map-line-market" />
          <b />
        </div>
        <article className="ecosystem-location-card ecosystem-location-products">
          <GameCardIcon icon="atlas" />
          <span>Location 01</span>
          <strong>Product Desk</strong>
          <em>AtlasRepo · Want2View · FabricBot</em>
        </article>
        <article className="ecosystem-location-card ecosystem-location-room">
          <GameCardIcon icon="bp" />
          <span>Center</span>
          <strong>Our Room</strong>
          <em>Tap, earn BP, unlock access.</em>
        </article>
        <article className="ecosystem-location-card ecosystem-location-support">
          <GameCardIcon icon="macmini" />
          <span>{totalSupport ? `$${totalSupport} backed` : "Target"}</span>
          <strong>Mac mini</strong>
          <em>Render and video engine.</em>
        </article>
        <article className="ecosystem-location-card ecosystem-location-market">
          <GameCardIcon icon="fbc" />
          <span>Spend</span>
          <strong>Promo Market</strong>
          <em>BP perks and future access.</em>
        </article>
      </header>
      <section className="game-hero ecosystem-hero ecosystem-products-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>FabricBot Ecosystem</span>
          <h1>Build in public</h1>
          <p>Real products, public story, playable progress.</p>
        </div>
        <div className="factory-diorama" aria-hidden="true">
          <i className="factory-base" />
          <i className="factory-tower" />
          <i className="factory-screen" />
          <i className="factory-park park-a" />
          <i className="factory-park park-b" />
        </div>
      </section>
      <EcosystemMeaningCard />
      <VideoIntegrationCard />
      <section className="product-launch-grid">
        {products.map((product, index) => (
            <article className={`launch-card launch-${product.color}`} style={{ "--i": index } as CSSProperties} key={product.id}>
              <i className="launch-icon" />
              <div>
                <strong>{product.name}</strong>
                <span>{product.role}</span>
                <em>{product.metric}</em>
                <small><u style={{ width: `${Math.max(36, 76 - index * 9)}%` }} /></small>
              </div>
              <b />
            </article>
        ))}
      </section>
    </section>
  );
}

function EcosystemMeaningCard() {
  return (
    <section className="ecosystem-meaning-card">
      <i className="meaning-icon" aria-hidden="true" />
      <div>
        <span>Why this exists</span>
        <strong>Real work becomes a playable ecosystem</strong>
        <p>Kirill's real build process becomes a game where people follow progress and unlock useful perks.</p>
      </div>
    </section>
  );
}

function VideoIntegrationCard() {
  return (
    <section className="video-integration-card">
      <div className="video-frame" aria-hidden="true">
        <i />
        <b />
      </div>
      <div>
        <span>Video layer</span>
        <strong>YouTube / X build series</strong>
        <p>Episodes explain what we build, why runway matters, and what changed this week.</p>
        <div className="video-pill-row">
          <em>Founder diary</em>
          <em>Product updates</em>
        </div>
      </div>
    </section>
  );
}

function ParticipatePage({ state, onMockSupportMacMini }: { state: GameState; onMockSupportMacMini: () => void }) {
  const heroSrc = `${import.meta.env.BASE_URL}assets/game/support-runway-hero-v1.png`;
  const totalSupport = state.mockSupportUsd;
  const runwayGoal = fundingGoals[0];
  const projectMrr = state.atlasMission.status === "claimed" ? 120 : 0;
  const autonomyProgress = Math.min(100, Math.floor((projectMrr / runwayGoal.targetUsd) * 100));
  const supportCredit = totalSupport;

  return (
    <section className="app-page participate-page">
      <header className="game-hero support-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>Participate & Support</span>
          <h1>Autonomy Roadmap</h1>
          <p>First target: projects reach $3k/month so Kirill can build calmly. Support helps the path; product revenue is the main KPI.</p>
        </div>
        <div className="support-heart" aria-hidden="true"><i /></div>
      </header>
      <RoadmapActionStrip onMockSupportMacMini={onMockSupportMacMini} />
      <article className="runway-card autonomy-roadmap-card">
        <div className="runway-top">
          <div>
            <span>Current target</span>
            <strong>${projectMrr} / ${runwayGoal.targetUsd} MRR</strong>
          </div>
          <div className="runway-ring" style={{ "--progress": `${autonomyProgress}%` } as CSSProperties}>
            <b>{autonomyProgress}%</b>
          </div>
        </div>
        <i style={{ width: `${autonomyProgress}%` }} />
        <p>Goal: make products generate enough monthly revenue for calm building. Donations help tools and runway, but product revenue remains the main KPI.</p>
      </article>
      <section className="support-focus-grid">
        <article>
          <GameCardIcon icon="macmini" />
          <span>Main tool</span>
          <strong>Mac mini for render</strong>
          <em>$1000 target for video generation, editing and service content.</em>
        </article>
        <article>
          <GameCardIcon icon="fbc" />
          <span>Monthly tools</span>
          <strong>$300/mo services</strong>
          <em>Subscriptions and infrastructure that keep the ecosystem moving.</em>
        </article>
      </section>
      <LatestSupportReceipt state={state} />
      <section className="support-summary-grid">
        <article>
          <span>Support memory</span>
          <strong>{supportCredit} FBC</strong>
        </article>
        <article>
          <span>Build points</span>
          <strong>{Math.floor(state.resources.compute)}</strong>
        </article>
      </section>
      <article className="currency-rules-card">
        <strong>Support, not investment</strong>
        <p>FBC is a public memory / game credit for voluntary support. No equity, no profit promise, no guaranteed token and no cash redemption.</p>
      </article>
    </section>
  );
}

function RoadmapNeedsPanel() {
  return (
    <section className="roadmap-detail-panel">
      <div className="section-head">
        <span>Roadmap details</span>
        <strong>Now → next → later</strong>
      </div>
      <div className="roadmap-need-list">
        {roadmapNeeds.map((item) => (
          <article className={`roadmap-need-card need-${item.id}`} key={item.id}>
            <span>{item.label}</span>
            <strong>{item.title}</strong>
            <ul>
              {item.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function RoadmapActionStrip({ onMockSupportMacMini }: { onMockSupportMacMini: () => void }) {
  return (
    <section className="roadmap-action-strip">
      <button className="roadmap-action-card is-support" onClick={onMockSupportMacMini}>
        <span>Telegram Wallet</span>
        <strong>Support roadmap</strong>
        <em>Donation-style support, public journal receipt, FBC credit.</em>
      </button>
      <button className="roadmap-action-card is-reserve" onClick={onMockSupportMacMini}>
        <span>FBC Reservation</span>
        <strong>Reserve FBC Credits</strong>
        <em>Prototype buyout button: no token promise, just early support memory.</em>
      </button>
    </section>
  );
}

function RoadmapMilestones({ currentMrr }: { currentMrr: number }) {
  return (
    <section className="roadmap-milestone-grid">
      {autonomyRoadmap.map((stage) => {
        const progress = Math.min(100, Math.floor((currentMrr / stage.goal) * 100));
        return (
          <article className="roadmap-milestone-card" key={stage.id}>
            <div>
              <span>{stage.label}</span>
              <b>{progress}%</b>
            </div>
            <strong>{stage.title}</strong>
            <i><em style={{ width: `${progress}%` }} /></i>
            <p>{stage.body}</p>
          </article>
        );
      })}
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

function MyRoomPage({ state, onBuild, onBuyGenerator, onBuyDeviceGenerator, onBuyProductAction, onClaimSocialQuest }: { state: GameState; onBuild: () => void; onBuyGenerator: () => void; onBuyDeviceGenerator: (generatorId: string) => void; onBuyProductAction: (actionId: string, costCompute: number, title: string) => void; onClaimSocialQuest: (questId: string, rewardCompute: number, title: string) => void }) {
  const totalRate = getTotalComputeRatePerHour(state);
  const myRoomBg = `${import.meta.env.BASE_URL}assets/game/my-room-game-bg-v1.png`;
  const [section, setSection] = useState<"room" | "upgrades" | "quests" | "products" | "strategy">("room");
  const [terminal, setTerminal] = useState<"want2view" | "atlasrepo" | null>(null);

  return (
    <section className="app-page my-room-page">
      <header className="room-title-bar">
        <div className="room-badge">My Room</div>
        <div className="room-currency-pill"><span>BP</span><strong>{Math.floor(state.resources.compute)}</strong></div>
      </header>
      <nav className="my-room-tabs" aria-label="My Room sections">
        {[
          ["room", "Room"],
          ["upgrades", "Upgrades"],
          ["quests", "Quests"],
          ["products", "Items"],
          ["strategy", "Strategy"]
        ].map(([id, label]) => (
          <button className={section === id ? "is-active" : ""} onClick={() => setSection(id as typeof section)} key={id}>{label}</button>
        ))}
      </nav>
      {section === "room" && (
        <div className="player-room-stage">
          <img className="my-room-bg" src={myRoomBg} alt="" draggable={false} />
          <div className="my-room-grade" />
          <button className="notebook-status-card status-want2view" onClick={() => setTerminal("want2view")}>
            <span>Laptop 01</span>
            <strong>Want2View</strong>
            <em>Video demand feed · standby</em>
          </button>
          <button className="notebook-status-card status-atlasrepo" onClick={() => setTerminal("atlasrepo")}>
            <span>Laptop 02</span>
            <strong>AtlasRepo</strong>
            <em>Repo intelligence feed · ready</em>
          </button>
          <button className="room-clicker-object" onClick={onBuild}>
            <span className="sofa-clicker-icon" aria-hidden="true" />
            <b>Tap Sofa</b>
            <span>+1 room point</span>
          </button>
          <article className="mac-mini-card">
            <span>Render node</span>
            <strong>Mac mini</strong>
            <em>$1000 target · UBT/video engine</em>
          </article>
          {terminal && <ProjectTerminal terminal={terminal} state={state} onClose={() => setTerminal(null)} />}
        </div>
      )}
      <div className="stat-grid">
        <div><span>Room points</span><strong>{Math.floor(state.resources.compute)}</strong></div>
        <div><span>Income</span><strong>{totalRate}/hr</strong></div>
        <div><span>Level</span><strong>{state.accountLevel}</strong></div>
        <div><span>Clicks</span><strong>{state.coreClicks}</strong></div>
      </div>
      {section === "upgrades" && <IdleUpgradePanel state={state} onBuyGenerator={onBuyGenerator} onBuyDeviceGenerator={onBuyDeviceGenerator} />}
      {section === "quests" && <SocialQuestPanel state={state} onClaimSocialQuest={onClaimSocialQuest} />}
      {section === "products" && <RoomItemsPanel state={state} onBuyProductAction={onBuyProductAction} />}
      {section === "strategy" && (
        <>
          <MyRoomGoalPanel state={state} />
          <AgentBench />
          <TaskDeck />
        </>
      )}
    </section>
  );
}

function ProjectTerminal({ terminal, state, onClose }: { terminal: "want2view" | "atlasrepo"; state: GameState; onClose: () => void }) {
  const isAtlas = terminal === "atlasrepo";
  const title = isAtlas ? "AtlasRepo Terminal" : "Want2View Terminal";
  const status = isAtlas ? "Repo intelligence feed online" : "Video demand feed warming up";
  const signal = isAtlas ? "First Scan" : "Trend Scanner";
  const value = isAtlas ? `${Object.keys(state.atlasMission.answers).length}/3 signals` : `${Math.max(0, Math.floor(state.resources.compute / 10))} demand pings`;

  return (
    <section className={`project-terminal-overlay terminal-${terminal}`}>
      <header>
        <div>
          <span>{isAtlas ? "Knowledge terminal" : "Video terminal"}</span>
          <strong>{title}</strong>
          <em>{status}</em>
        </div>
        <button onClick={onClose}>Close</button>
      </header>
      <div className="terminal-screen">
        <i />
        <code>{">"} boot {terminal}</code>
        <code>{">"} sync room monitors</code>
        <code>{">"} signal: {signal}</code>
      </div>
      <div className="terminal-stats">
        <article>
          <span>Current signal</span>
          <strong>{value}</strong>
        </article>
        <article>
          <span>Next use</span>
          <strong>{isAtlas ? "Research quest" : "Video idea"}</strong>
        </article>
      </div>
    </section>
  );
}

function IdleUpgradePanel({ state, onBuyGenerator, onBuyDeviceGenerator }: { state: GameState; onBuyGenerator: () => void; onBuyDeviceGenerator: (generatorId: string) => void }) {
  return (
    <section className="idle-upgrade-panel">
      <div className="section-head">
        <span>Idle upgrades</span>
        <strong>Make the room play itself</strong>
      </div>
      <div className="idle-upgrade-row">
        <button className={`idle-upgrade-card ${state.generatorPurchased ? "is-owned" : ""}`} disabled={state.generatorPurchased || state.resources.compute < 25} onClick={onBuyGenerator}>
          <GameCardIcon icon="autoclicker" />
          <span>Core</span>
          <strong>Auto Clicker</strong>
          <em>{state.generatorPurchased ? `Lvl ${state.generatorLevel} online` : "25 BP · starts passive clicks"}</em>
        </button>
        {deviceGenerators.map((item) => {
          const owned = state.purchasedDeviceGeneratorIds.includes(item.id);
          const affordable = state.resources.compute >= item.costCompute;
          return (
            <button className={`idle-upgrade-card tier-${item.tier} ${owned ? "is-owned" : ""}`} disabled={owned || !affordable} onClick={() => onBuyDeviceGenerator(item.id)} key={item.id}>
              <GameCardIcon icon={deviceGeneratorIconById[item.id] ?? "storage"} />
              <span>{item.tier}</span>
              <strong>{item.name}</strong>
              <em>{owned ? `+${item.ratePerHour}/hr active` : `${item.costCompute} BP · +${item.ratePerHour}/hr`}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SocialQuestPanel({ state, onClaimSocialQuest }: { state: GameState; onClaimSocialQuest: (questId: string, rewardCompute: number, title: string) => void }) {
  return (
    <section className="social-quest-panel">
      <div className="section-head">
        <span>Social quests</span>
        <strong>Bring people into the ecosystem</strong>
      </div>
      <div className="social-quest-list">
        {socialQuests.map((quest) => {
          const claimed = state.claimedSocialQuestIds.includes(quest.id);
          return (
            <button className={claimed ? "is-claimed" : ""} disabled={claimed} onClick={() => onClaimSocialQuest(quest.id, quest.rewardCompute, quest.title)} key={quest.id}>
              <GameCardIcon icon={quest.icon as GameIconName} />
              <span>+{quest.rewardCompute} BP</span>
              <strong>{quest.title}</strong>
              <em>{claimed ? "Reward claimed" : quest.detail}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function RoomItemsPanel({ state, onBuyProductAction }: { state: GameState; onBuyProductAction: (actionId: string, costCompute: number, title: string) => void }) {
  return (
    <section className="product-spend-panel">
      <div className="section-head">
        <span>Spend BP</span>
        <strong>Room items</strong>
      </div>
      <div className="product-action-grid">
        {roomItemActions.map((action) => {
          const owned = state.purchasedProductActionIds.includes(action.id);
          const affordable = state.resources.compute >= action.costCompute;
          return (
            <article className="product-action-card" key={action.id}>
              <GameCardIcon icon={action.icon} />
              <span>{action.category}</span>
              <strong>{action.title}</strong>
              <em>{action.detail}</em>
              <button disabled={owned || !affordable} onClick={() => onBuyProductAction(action.id, action.costCompute, action.title)}>
                {owned ? "Reserved" : `${action.costCompute} BP`}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MyRoomGoalPanel({ state, compact = false }: { state: GameState; compact?: boolean }) {
  const projectMrr = state.atlasMission.status === "claimed" ? 120 : 0;
  const progress = Math.min(100, Math.floor((projectMrr / 3000) * 100));
  return (
    <section className={`my-room-goal-panel ${compact ? "is-compact" : ""}`}>
      <div className="section-head">
        <span>Current goal</span>
        <strong>$3000/mo project MRR</strong>
      </div>
      <div className="goal-progress-line">
        <b>${projectMrr} / $3000</b>
        <i><u style={{ width: `${progress}%` }} /></i>
      </div>
      <div className="goal-step-grid">
        <article>
          <span>1</span>
          <strong>Collect signals</strong>
          <em>Want2View + AtlasRepo terminals receive open product data.</em>
        </article>
        <article>
          <span>2</span>
          <strong>Render strategy</strong>
          <em>Mac mini turns UBT/video tasks into project content output.</em>
        </article>
        <article>
          <span>3</span>
          <strong>Show the plan</strong>
          <em>YouTube/video strategy layer will explain what happens next.</em>
        </article>
      </div>
    </section>
  );
}

function MarketPage({ state, onBuyProductAction }: { state: GameState; onBuyProductAction: (actionId: string, costCompute: number, title: string) => void }) {
  const heroSrc = `${import.meta.env.BASE_URL}assets/game/market-rewards-hero-v1.png`;

  return (
    <section className="app-page market-page">
      <header className="game-hero market-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>Market</span>
          <h1>Promo Market</h1>
          <p>Spend BP on promo reservations, trial queues and future access rules. Real benefits unlock only after clear conditions.</p>
        </div>
        <div className="reward-box" aria-hidden="true"><i /></div>
      </header>
      <div className="market-balance bp-market-balance">
        <i />
        <div>
          <span>Spendable BP</span>
          <strong>{Math.floor(state.resources.compute)}</strong>
        </div>
      </div>
      <div className="market-tabs" aria-hidden="true">
        <span>Promo codes</span>
        <span>Free subs</span>
        <span>Cost-price</span>
        <span>Rules</span>
      </div>
      <section className="market-grid">
        {marketBpOffers.map((offer, index) => {
          const owned = state.purchasedProductActionIds.includes(offer.id);
          const affordable = state.resources.compute >= offer.costCompute;
          return (
            <article className={`market-card market-card-${index}`} style={{ "--i": index } as CSSProperties} key={offer.id}>
              <i className="market-card-glow" />
              <div className={`market-icon category-${offer.category}`} />
              <GameCardIcon icon={offer.icon} />
              <strong>{offer.title}</strong>
              <span>{offer.body}</span>
              <em>{offer.category}</em>
              <button disabled={owned || !affordable} onClick={() => onBuyProductAction(offer.id, offer.costCompute, offer.title)}>
                <span>{owned ? "Reserved" : `${offer.costCompute} BP`}</span>
              </button>
            </article>
          );
        })}
      </section>
      <article className="fbc-future-card">
        <strong>Access rule draft</strong>
        <span>First real free subscription should require at least 14 days in the ecosystem, 3 invited people and a final availability check. BP reserves intent, not instant access.</span>
        <b>14d + 3 invites</b>
      </article>
      <article className="page-card add-project-card ecosystem-application-card">
        <strong>In development</strong>
        <span>{marketDevelopmentNotes.join(" ")}</span>
      </article>
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
        <strong>Idea → launch → autonomy</strong>
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
