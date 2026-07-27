import type { CSSProperties } from "react";
import { deviceGenerators } from "../config/deviceGenerators";
import { fundingGoals } from "../config/funding";
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
  if (view === "ecosystem") return <EcosystemPage />;
  if (view === "participate") return <ParticipatePage state={state} onMockSupportMacMini={onMockSupportMacMini} />;
  if (view === "my-room") return <MyRoomPage state={state} onBuild={onBuild} onBuyGenerator={onBuyGenerator} onBuyDeviceGenerator={onBuyDeviceGenerator} />;
  return <MarketPage state={state} onBuyPerkReward={onBuyPerkReward} />;
}

function EcosystemPage() {
  const heroSrc = `${import.meta.env.BASE_URL}assets/game/ecosystem-factory-hero-v1.png`;

  return (
    <section className="app-page ecosystem-page">
      <header className="game-hero ecosystem-hero">
        <img className="hero-bg" src={heroSrc} alt="" draggable={false} />
        <div className="hero-grade" />
        <div>
          <span>FabricBot Ecosystem</span>
          <h1>Bot Factory</h1>
          <p>Our products. Our power.</p>
        </div>
        <div className="factory-diorama" aria-hidden="true">
          <i className="factory-base" />
          <i className="factory-tower" />
          <i className="factory-screen" />
          <i className="factory-park park-a" />
          <i className="factory-park park-b" />
        </div>
      </header>
      <section className="product-launch-grid">
        {products.map((product, index) => (
            <article className={`launch-card launch-${product.color}`} key={product.id}>
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

function ParticipatePage({ state, onMockSupportMacMini }: { state: GameState; onMockSupportMacMini: () => void }) {
  const totalSupport = state.mockSupportUsd;
  const runwayGoal = fundingGoals[0];
  const runwayProgress = Math.min(100, Math.floor((totalSupport / runwayGoal.targetUsd) * 100));
  const supportCredit = totalSupport;

  return (
    <section className="app-page participate-page">
      <header className="game-hero support-hero">
        <div>
          <span>Participate & Support</span>
          <h1>Ecosystem Runway</h1>
          <p>Keeping the mission alive and building for the future.</p>
        </div>
        <div className="support-heart" aria-hidden="true"><i /></div>
      </header>
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
          <span>Estimated FBC credit</span>
          <strong>{supportCredit} FBC</strong>
        </article>
        <article>
          <span>Compute applied</span>
          <strong>{supportCredit * 50}</strong>
        </article>
      </section>
      <article className="disclaimer-card">
        <strong>Important disclaimer</strong>
        <p>FBC is a game credit / reservation only. No equity, no profit promise, no guaranteed token and no cash redemption.</p>
      </article>
      <section className="support-ledger standalone">
        <div className="support-ledger-head">
          <strong>Open Support Ledger</strong>
          <span>${totalSupport}</span>
        </div>
        <Supporter name="Kirill" role="Founder fuel" amount={totalSupport > 0 ? totalSupport : 0} />
        <Supporter name="Early supporter" role="Mac mini believer" amount={totalSupport > 0 ? 1000 : 0} />
        <Supporter name="Future partner" role="Reserved slot" amount={0} />
      </section>
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

function Supporter({ name, role, amount }: { name: string; role: string; amount: number }) {
  return (
    <div className="supporter-row">
      <div>
        <strong>{name}</strong>
        <span>{role}</span>
      </div>
      <b>${amount}</b>
    </div>
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
      <div className="stat-grid">
        <div><span>Room points</span><strong>{Math.floor(state.resources.compute)}</strong></div>
        <div><span>Income</span><strong>{totalRate}/hr</strong></div>
        <div><span>Level</span><strong>{state.accountLevel}</strong></div>
        <div><span>FBC</span><strong>{Math.floor(state.resources.fbc)}</strong></div>
      </div>
      {!state.generatorPurchased && <button className="primary-cta" onClick={onBuyGenerator}>Buy first room generator · 25</button>}
      <section className="room-upgrade-grid">
        {deviceGenerators.map((item) => {
          const owned = state.purchasedDeviceGeneratorIds.includes(item.id);
          return (
            <article className="room-upgrade-card" key={item.id}>
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
      <div className="market-balance">
        <span>Available FBC</span>
        <strong>{Math.floor(state.resources.fbc)}</strong>
      </div>
      <div className="market-tabs" aria-hidden="true">
        <span>All</span>
        <span>Promos</span>
        <span>Access</span>
        <span>Tools</span>
      </div>
      <section className="market-grid">
        {perkShop.map((perk, index) => {
          const owned = state.purchasedPerkRewardIds.includes(perk.id);
          const affordable = state.resources[perk.costResource] >= perk.costAmount;
          return (
            <article className={`market-card market-card-${index}`} key={perk.id}>
              <div className={`market-icon category-${perk.category}`} />
              <strong>{perk.title}</strong>
              <span>{perk.benefitPreview}</span>
              <button disabled={owned || !affordable} onClick={() => onBuyPerkReward(perk.id)}>
                <span>{owned ? "Reserved" : `${perk.costAmount} FBC`}</span>
              </button>
            </article>
          );
        })}
        {marketExtras.map((perk, index) => (
          <article className={`market-card market-extra-${index}`} key={perk.id}>
            <div className={`market-icon category-${perk.category}`} />
            <strong>{perk.title}</strong>
            <span>{perk.body}</span>
            <button disabled><span>{perk.cost} FBC</span></button>
          </article>
        ))}
      </section>
      <article className="page-card add-project-card">
        <strong>Add your project later</strong>
        <span>Future partners will be able to add projects into the ecosystem after moderation.</span>
      </article>
    </section>
  );
}
