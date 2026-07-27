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

export function AppPages({ view, state, onBuild, onBuyGenerator, onBuyDeviceGenerator, onMockSupportMacMini, onBuyPerkReward }: Props) {
  if (view === "ecosystem") return <EcosystemPage />;
  if (view === "participate") return <ParticipatePage state={state} onMockSupportMacMini={onMockSupportMacMini} />;
  if (view === "my-room") return <MyRoomPage state={state} onBuild={onBuild} onBuyGenerator={onBuyGenerator} onBuyDeviceGenerator={onBuyDeviceGenerator} />;
  return <MarketPage state={state} onBuyPerkReward={onBuyPerkReward} />;
}

function EcosystemPage() {
  return (
    <section className="app-page ecosystem-page">
      <header className="page-hero">
        <span>FabricBot Ecosystem</span>
        <h1>Build products from one room</h1>
        <p>AtlasRepo, Want2View, FabricBot and future tools become a playable business map.</p>
      </header>
      <div className="ecosystem-map">
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

  return (
    <section className="app-page participate-page">
      <header className="page-hero">
        <span>Participate</span>
        <h1>Help the ecosystem survive and grow</h1>
        <p>Support is crowdfunding in prototype mode. No equity, token claim, profit share or guaranteed return.</p>
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
      <button className="wallet-preview-card" onClick={onMockSupportMacMini}>
        <span>Telegram Wallet preview</span>
        <strong>$1000 support route</strong>
        <em>Mock only · records FBC credit</em>
      </button>
      <button className="ghost-button wide" onClick={onMockSupportMacMini}>Mock support $1000 · get 1000 FBC</button>
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

  return (
    <section className="app-page my-room-page">
      <header className="page-hero compact">
        <span>My Room</span>
        <h1>Personal idle room</h1>
        <p>Click, buy items, unlock levels and earn virtual room points.</p>
      </header>
      <div className="player-room-stage">
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
          <i />
          <b>Build</b>
          <span>+ room points</span>
        </button>
        <div className="room-sofa" />
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
              <button disabled={owned} onClick={() => onBuyDeviceGenerator(item.id)}>{owned ? "Owned" : `${item.costCompute} pts`}</button>
            </article>
          );
        })}
      </section>
    </section>
  );
}

function MarketPage({ state, onBuyPerkReward }: { state: GameState; onBuyPerkReward: (perkId: string) => void }) {
  return (
    <section className="app-page market-page">
      <header className="page-hero compact">
        <span>Market</span>
        <h1>Spend credits on ecosystem perks</h1>
        <p>Prototype reservations only: no real access, token claim or guaranteed discount yet.</p>
      </header>
      <div className="market-balance">
        <span>Available FBC</span>
        <strong>{Math.floor(state.resources.fbc)}</strong>
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
                {owned ? "Reserved" : `${perk.costAmount} FBC`}
              </button>
            </article>
          );
        })}
      </section>
      <article className="page-card add-project-card">
        <strong>Add your project later</strong>
        <span>Future partners will be able to add projects into the ecosystem after moderation.</span>
      </article>
    </section>
  );
}
