import { useMemo, useState } from "react";
import { assets } from "../config/assets";
import { deviceGenerators } from "../config/deviceGenerators";
import { fundingGoals } from "../config/funding";
import { atlasFirstScanRepos } from "../config/missions";
import { networkNodes } from "../config/network";
import { perkShop } from "../config/perks";
import { products } from "../config/products";
import { generatorTypes } from "../config/generators";
import { rewardTiers } from "../config/rewards";
import { getAtlasRankProgress, getTotalComputeRatePerHour, getGeneratorRatePerHour, getGeneratorUpgradeCost, type GameState } from "../store/gameStore";
import type { Asset, MissionRepo, RoomObjectConfig } from "../types/game";

interface Props {
  object: RoomObjectConfig | null;
  state: GameState;
  onClose: () => void;
  onBuyGenerator: () => void;
  onUpgradeGenerator: () => void;
  onBuyDeviceGenerator: (generatorId: string) => void;
  onMockSupportMacMini: () => void;
  onBuyPerkReward: (perkId: string) => void;
  onClaimOffline: () => void;
  onAnswerRepo: (repo: MissionRepo, answer: string) => void;
  onCompleteAtlasMission: () => void;
  onReset: () => void;
  onSimulateOffline: () => void;
}

export function ObjectBottomSheet({
  object,
  state,
  onClose,
  onBuyGenerator,
  onUpgradeGenerator,
  onBuyDeviceGenerator,
  onMockSupportMacMini,
  onBuyPerkReward,
  onClaimOffline,
  onAnswerRepo,
  onCompleteAtlasMission,
  onReset,
  onSimulateOffline
}: Props) {
  if (!object) return null;

  const asset = object.linkedEntityId ? assets.find((item) => item.id === object.linkedEntityId) : undefined;
  const product = object.linkedEntityId ? products.find((item) => item.id === object.linkedEntityId) : undefined;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <section className="bottom-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <header className="sheet-header">
          <div>
            <span className="eyebrow">{object.type}</span>
            <h2>{object.label}</h2>
            <p>{object.subtitle}</p>
          </div>
          <button className="ghost-button" onClick={onClose}>Close</button>
        </header>
        {asset && <AssetCard assetId={asset.id} />}
        {object.id === "asset-index" && <AssetIndex />}
        {object.id === "atlas-terminal" && <AtlasMission state={state} onAnswerRepo={onAnswerRepo} onComplete={onCompleteAtlasMission} onBuyPerkReward={onBuyPerkReward} />}
        {object.id === "want2view" && <MockPanel title="Want2View Terminal" metric="Trend Scanner locked" cta="Unlock after Atlas Rank 2" tone="compute">
          <p>Preview the product loop: Trend Scanner will turn Attention into a real Want2View research and a subscription discount.</p>
        </MockPanel>}
        {object.id === "network-terminal" && <NetworkPanel state={state} />}
        {object.id === "funding-hub" && <FundingPanel state={state} onMockSupportMacMini={onMockSupportMacMini} />}
        {object.id === "youtube-wall" && <MockPanel title="YouTube Wall" metric="Season 0" cta="Open next episode later" tone="network">
          <p>Real life becomes video; video becomes patch notes; patch notes become community missions.</p>
        </MockPanel>}
        {object.id === "reward-vault" && <RewardPreview state={state} onBuyPerkReward={onBuyPerkReward} />}
        {object.id === "goal" && <MockPanel title="Ecosystem Goal" metric="$0 / $3,000 MRR" cta="View strategy later" tone="funding">
          <p>The first season mission is autonomy: make the ecosystem able to function and grow sustainably.</p>
        </MockPanel>}
        {object.type === "locked" && <LockedPreview object={object} />}
        {object.type === "character" && <CharacterPanel object={object} state={state} />}
        {object.id === "factory-panel" && <GeneratorPanel state={state} onBuyGenerator={onBuyGenerator} onUpgradeGenerator={onUpgradeGenerator} onBuyDeviceGenerator={onBuyDeviceGenerator} onClaimOffline={onClaimOffline} onSimulateOffline={onSimulateOffline} />}
        {object.id === "profile-panel" && <ProfilePanel state={state} onReset={onReset} />}
        {product && object.id !== "atlas-terminal" && object.id !== "want2view" && (
          <div className={`metric-card tone-${product.color}`}>
            <strong>{product.role}</strong>
            <span>{product.metric}</span>
            <p>{product.description}</p>
          </div>
        )}
      </section>
    </div>
  );
}

function AssetIndex() {
  const [category, setCategory] = useState<Asset["category"] | "all">("all");
  const categories = useMemo(() => ["all", ...Array.from(new Set(assets.map((item) => item.category)))] as Array<Asset["category"] | "all">, []);
  const filtered = category === "all" ? assets : assets.filter((item) => item.category === category);
  const totalUtility = filtered.reduce((sum, item) => sum + item.utilityScore, 0);
  const monthlyBurn = filtered.reduce((sum, item) => sum + (item.monthlyCostUsd ?? 0), 0);
  const plannedCount = filtered.filter((item) => item.status === "planned" || item.status === "funding" || item.status === "expiring").length;

  return (
    <div className="asset-index">
      <div className="metric-card tone-funding">
        <strong>FabricBot Ecosystem</strong>
        <span>AtlasRepo · Want2View · FabricBot · Payment Bot</span>
        <p>The ecosystem is packaged as a business idle game: projects become buildings, tools become upgrades, and support becomes visible progress.</p>
      </div>
      <div className="stat-grid">
        <div><span>Utility</span><strong>{totalUtility}</strong></div>
        <div><span>Ops cost</span><strong>${monthlyBurn}</strong></div>
        <div><span>Catalog</span><strong>{assets.length}</strong></div>
        <div><span>Goal</span><strong>$30k MRR</strong></div>
      </div>
      <div className="category-filter">
        {categories.map((item) => (
          <button key={item} className={category === item ? "is-selected" : ""} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="asset-list">
        {filtered.map((item) => (
          <article className="asset-row-card" key={item.id}>
            <div className="asset-row-head">
              <div>
                <strong>{item.name}</strong>
                <span>{item.category} · {item.status} · {item.owner}</span>
              </div>
              <b>{item.utilityScore}</b>
            </div>
            <p>{item.purpose}</p>
            <div className="asset-tags">
              <span>{item.realFunction[0]}</span>
              <span>{item.gameFunction[0]}</span>
              {item.monthlyCostUsd ? <span>${item.monthlyCostUsd}/mo</span> : null}
            </div>
            <em>{item.fundingRelationship}</em>
          </article>
        ))}
      </div>
    </div>
  );
}

function AssetCard({ assetId }: { assetId: string }) {
  const asset = assets.find((item) => item.id === assetId);
  if (!asset) return null;
  return (
    <div className="asset-card">
      <div className="stat-grid">
        <div><span>Status</span><strong>{asset.status}</strong></div>
        <div><span>Load</span><strong>{asset.currentLoadPct}%</strong></div>
        <div><span>Utility</span><strong>{asset.utilityScore}</strong></div>
        <div><span>Condition</span><strong>{asset.conditionPct}%</strong></div>
      </div>
      <section>
        <h3>Real function</h3>
        <ul>{asset.realFunction.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section>
        <h3>Game function</h3>
        <ul>{asset.gameFunction.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="connected-row">
        <span>Connected products</span>
        <strong>{asset.connectedProductIds.join(", ")}</strong>
      </section>
      <section className="connected-row">
        <span>Subscriptions</span>
        <strong>{asset.connectedSubscriptionIds.join(", ")}</strong>
      </section>
      <section>
        <h3>Upgrade preview</h3>
        {asset.upgradePath.map((upgrade) => (
          <div className="upgrade-row" key={upgrade.id}>
            <strong>{upgrade.title}</strong>
            <span>{upgrade.requirement} · {upgrade.effect}</span>
          </div>
        ))}
      </section>
      <p className="reality-line">{asset.realityUpdates[0]}</p>
    </div>
  );
}

function AtlasMission({ state, onAnswerRepo, onComplete, onBuyPerkReward }: { state: GameState; onAnswerRepo: (repo: MissionRepo, answer: string) => void; onComplete: () => void; onBuyPerkReward: (perkId: string) => void }) {
  const answered = Object.keys(state.atlasMission.answers).length;
  const claimed = state.atlasMission.status === "claimed";
  const ready = state.atlasMission.status === "ready";
  const correctCount = atlasFirstScanRepos.filter((repo) => state.atlasMission.answers[repo.id] === repo.correct).length;
  return (
    <div className="mission-flow">
      <AtlasRankCard state={state} />
      <div className="metric-card tone-atlas">
        <strong>AtlasRepo First Scan</strong>
        <span>{claimed ? `${correctCount}/3 signals matched` : `${answered}/3 repositories reviewed`}</span>
        <p>{claimed ? "Contribution history saved locally. This is a prototype proof of reputation, not a real token or payout." : "Answer all repository signals, then spend 30 Compute to create Knowledge and Contribution."}</p>
      </div>
      {atlasFirstScanRepos.map((repo) => (
        <div className="repo-card" key={repo.id}>
          <div className="repo-heading">
            <strong>{repo.name}</strong>
            {claimed && <span className={state.atlasMission.answers[repo.id] === repo.correct ? "answer-good" : "answer-miss"}>{state.atlasMission.answers[repo.id] === repo.correct ? "matched" : "missed"}</span>}
          </div>
          <p>{repo.description}</p>
          <div className="option-row">
            {repo.options.map((option) => (
              <button
                key={option}
                className={state.atlasMission.answers[repo.id] === option ? "is-selected" : ""}
                onClick={() => onAnswerRepo(repo, option)}
                disabled={claimed}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="primary-cta" onClick={onComplete} disabled={claimed || (!ready && !claimed)}>
        {claimed ? "Atlas Fragment Preview Unlocked" : ready ? "Run First Scan · 30 Compute" : `Answer ${3 - answered} more`}
      </button>
      {claimed && <RewardPreview state={state} onBuyPerkReward={onBuyPerkReward} />}
      <ContributionHistory state={state} />
    </div>
  );
}

function AtlasRankCard({ state }: { state: GameState }) {
  const progress = getAtlasRankProgress(state.resources.contribution);
  return (
    <div className="rank-card">
      <div className="rank-header">
        <div>
          <span>Atlas Rank</span>
          <strong>Rank {progress.rank}</strong>
        </div>
        <b>{progress.remaining === 0 ? "Max preview" : `${progress.remaining} Contribution to next`}</b>
      </div>
      <div className="rank-bar" aria-label={`Atlas Rank progress ${progress.percent}%`}>
        <i style={{ width: `${progress.percent}%` }} />
      </div>
      <p>Rank is generated from Contribution events. Later it can unlock lessons, promos, network rooms and partner tools.</p>
    </div>
  );
}

function GeneratorPanel({ state, onBuyGenerator, onUpgradeGenerator, onBuyDeviceGenerator, onClaimOffline, onSimulateOffline }: { state: GameState; onBuyGenerator: () => void; onUpgradeGenerator: () => void; onBuyDeviceGenerator: (generatorId: string) => void; onClaimOffline: () => void; onSimulateOffline: () => void }) {
  const generator = generatorTypes[0];
  const level = state.generatorLevel;
  const rate = getGeneratorRatePerHour(level || 1);
  const totalRate = getTotalComputeRatePerHour(state);
  const upgradeCost = getGeneratorUpgradeCost(level);
  return (
    <div className="generator-panel">
      <div className="metric-card tone-compute">
        <strong>{generator.name}</strong>
        <span>{state.generatorPurchased ? `Level ${level} · ${totalRate}/hr total` : `${generator.costCompute} Compute`}</span>
        <p>{generator.description} Add device generators below to build an idle tycoon stack.</p>
      </div>
      <div className="stat-grid">
        <div><span>Output</span><strong>{state.generatorPurchased ? rate : generator.ratePerHour}/hr</strong></div>
        <div><span>Status</span><strong>{state.generatorPurchased ? "purchased" : "available"}</strong></div>
        <div><span>Next upgrade</span><strong>{state.generatorPurchased ? `${upgradeCost} C` : "buy first"}</strong></div>
        <div><span>Offline last</span><strong>+{state.lastOfflineEarned}</strong></div>
      </div>
      {!state.generatorPurchased ? (
        <button className="primary-cta" onClick={onBuyGenerator}>Buy Compute Generator</button>
      ) : (
        <>
          <button className="primary-cta" onClick={onClaimOffline}>Collect passive Compute</button>
          <button className="ghost-button wide" onClick={onUpgradeGenerator}>Upgrade Generator</button>
        </>
      )}
      <button className="ghost-button wide" onClick={onSimulateOffline}>Debug: simulate 1 hour offline</button>
      <DeviceGeneratorShop state={state} onBuyDeviceGenerator={onBuyDeviceGenerator} />
      <TransactionJournal state={state} />
    </div>
  );
}

function DeviceGeneratorShop({ state, onBuyDeviceGenerator }: { state: GameState; onBuyDeviceGenerator: (generatorId: string) => void }) {
  return (
    <section className="device-shop">
      <div>
        <h3>Device Generator Shop</h3>
        <p>Buy small game devices that keep producing Compute by themselves.</p>
      </div>
      {deviceGenerators.map((generator) => {
        const owned = state.purchasedDeviceGeneratorIds.includes(generator.id);
        return (
          <article className={`device-generator-card tier-${generator.tier}`} key={generator.id}>
            <div className="device-generator-head">
              <div>
                <strong>{generator.name}</strong>
                <span>{generator.unlock}</span>
              </div>
              <b>+{generator.ratePerHour}/hr</b>
            </div>
            <p>{generator.description}</p>
            <button className={owned ? "ghost-button wide" : "primary-cta"} disabled={owned} onClick={() => onBuyDeviceGenerator(generator.id)}>
              {owned ? "Owned" : `Buy · ${generator.costCompute} Compute`}
            </button>
          </article>
        );
      })}
    </section>
  );
}

function TransactionJournal({ state }: { state: GameState }) {
  const rows = state.transactions.slice(0, 8);
  return (
    <section className="transaction-journal">
      <h3>Local resource journal</h3>
      {rows.length === 0 ? (
        <p>No transactions yet. Click Atlas Core to start the ledger.</p>
      ) : (
        rows.map((tx) => (
          <div className="tx-row" key={tx.id}>
            <span>{tx.reason.replace(/_/g, " ")}</span>
            <strong className={tx.amount >= 0 ? "tx-positive" : "tx-negative"}>
              {tx.amount >= 0 ? "+" : ""}{tx.amount} {tx.resource}
            </strong>
          </div>
        ))
      )}
    </section>
  );
}

function ContributionHistory({ state }: { state: GameState }) {
  const rows = state.contributionEvents.slice(0, 5);
  return (
    <section className="contribution-history">
      <h3>Contribution history</h3>
      {rows.length === 0 ? (
        <p>No contribution events yet. Complete AtlasRepo First Scan to write the first one.</p>
      ) : (
        rows.map((event) => (
          <div className="contribution-row" key={event.id}>
            <div>
              <strong>{event.title}</strong>
              <span>{event.impact}</span>
            </div>
            <b>+{event.amount}</b>
          </div>
        ))
      )}
    </section>
  );
}

function RewardPreview({ state, onBuyPerkReward }: { state: GameState; onBuyPerkReward: (perkId: string) => void }) {
  const rank = getAtlasRankProgress(state.resources.contribution).rank;
  return (
    <div className="reward-preview">
      <div className={`fragment ${state.atlasMission.fragmentPreview ? "is-unlocked" : ""}`}>Atlas Fragment</div>
      <div>
        <h3>Future benefit preview</h3>
        <p>{state.atlasMission.rewardPreview ? "Free AtlasRepo lesson preview unlocked. Prototype mode does not grant real access." : "Complete AtlasRepo First Scan to preview a real product benefit."}</p>
        <div className="reward-list">
          {rewardTiers.map((tier) => (
            <span key={tier.id} className={tier.status === "unlocked" && state.atlasMission.rewardPreview ? "is-unlocked" : ""}>
              {tier.title} · {tier.status === "preview" && rank >= 3 ? "claimable later" : tier.status}
            </span>
          ))}
        </div>
      </div>
      <PerkShop state={state} onBuyPerkReward={onBuyPerkReward} />
    </div>
  );
}

function PerkShop({ state, onBuyPerkReward }: { state: GameState; onBuyPerkReward: (perkId: string) => void }) {
  return (
    <section className="perk-shop">
      <div className="perk-shop-head">
        <div>
          <h3>Perk Shop</h3>
          <p>Spend mock FBC on game reservations for promos, access and render perks.</p>
        </div>
        <b>{Math.floor(state.resources.fbc)} FBC</b>
      </div>
      {perkShop.map((perk) => {
        const owned = state.purchasedPerkRewardIds.includes(perk.id);
        const affordable = state.resources[perk.costResource] >= perk.costAmount;
        return (
          <article className="perk-card" key={perk.id}>
            <div className="perk-card-head">
              <div>
                <strong>{perk.title}</strong>
                <span>{perk.category} · {perk.benefitPreview}</span>
              </div>
              <b>{perk.costAmount} {perk.costResource.toUpperCase()}</b>
            </div>
            <p>{perk.disclaimer}</p>
            <button
              className={owned ? "ghost-button wide" : "primary-cta"}
              disabled={owned || !affordable}
              onClick={() => onBuyPerkReward(perk.id)}
            >
              {owned ? "Reserved" : affordable ? "Reserve perk" : `Need ${perk.costAmount - state.resources[perk.costResource]} FBC`}
            </button>
          </article>
        );
      })}
    </section>
  );
}

function NetworkPanel({ state }: { state: GameState }) {
  const rank = getAtlasRankProgress(state.resources.contribution).rank;
  return (
    <div className="system-panel">
      <div className="metric-card tone-network">
        <strong>Network Terminal</strong>
        <span>Rank {rank} · invite preview only</span>
        <code>https://t.me/atlas_room_bot/app?startapp=ref_demo</code>
        <p>Prototype mode tracks no valuable referral rewards. Network systems should reward useful verified actions, not empty invites.</p>
      </div>
      <div className="system-list">
        {networkNodes.map((node) => (
          <article className="system-card" key={node.id}>
            <div className="system-head">
              <strong>{node.title}</strong>
              <span>{node.status}</span>
            </div>
            <b>{node.metric}</b>
            <p>{node.strategy}</p>
            <em>{node.unlock}</em>
          </article>
        ))}
      </div>
    </div>
  );
}

function FundingPanel({ state, onMockSupportMacMini }: { state: GameState; onMockSupportMacMini: () => void }) {
  const legacyEntry = state.mockSupportUsd > 0 && state.supportLedger.length === 0
    ? [{ id: "legacy-support", supporterName: "Early supporter", amountUsd: state.mockSupportUsd, fbcCoins: state.mockSupportUsd, target: "Mac mini render node", note: "Legacy local support entry from prototype state." }]
    : [];
  const supporters = [...state.supportLedger, ...legacyEntry];
  return (
    <div className="system-panel">
      <div className="metric-card tone-funding">
        <strong>Participate</strong>
        <span>FBC Coins: {Math.floor(state.resources.fbc)} · Build Points: {Math.floor(state.resources.compute)}</span>
        <p>Build Points are earned through gameplay. FBC Coins come from support/perks and form a public contribution memory; they are not equity, yield, cash redemption or a guaranteed token.</p>
        <button className="primary-cta wallet-cta" onClick={onMockSupportMacMini}>How do you want to participate?</button>
        <button className="ghost-button wide" onClick={onMockSupportMacMini}>Telegram Wallet preview · mock support</button>
      </div>
      <div className="support-ledger">
        <div className="support-ledger-head">
          <div>
            <strong>Public Support Journal</strong>
            <span>donations → FBC Coins</span>
          </div>
          <b>${supporters.reduce((sum, item) => sum + item.amountUsd, 0)}</b>
        </div>
        {supporters.length === 0 ? (
          <div className="support-empty-row">
            <strong>No supporter entries yet</strong>
            <span>Mock support will appear here as a future wallet/journal receipt.</span>
          </div>
        ) : supporters.map((supporter) => (
          <div className="supporter-row journal-row" key={supporter.id}>
            <i className="supporter-avatar" />
            <div>
              <strong>{supporter.supporterName}</strong>
              <span>${supporter.amountUsd} to {supporter.target}</span>
              <em>{supporter.note}</em>
            </div>
            <b>+{supporter.fbcCoins} FBC</b>
          </div>
        ))}
      </div>
      <div className="system-list">
        {fundingGoals.map((goal) => {
          const currentUsd = goal.id === "mac-mini-render-node" ? state.mockSupportUsd : goal.currentUsd;
          const progress = Math.min(100, Math.floor((currentUsd / goal.targetUsd) * 100));
          return (
            <article className="system-card" key={goal.id}>
              <div className="system-head">
                <strong>{goal.title}</strong>
                <span>{goal.status}</span>
              </div>
              <b>${currentUsd} / ${goal.targetUsd}</b>
              <div className="mini-progress" aria-label={`${goal.title} progress ${progress}%`}>
                <i style={{ width: `${progress}%` }} />
              </div>
              <p>{goal.strategy}</p>
              <div className="asset-tags">
                {goal.useOfFunds.map((item) => <span key={item}>{item}</span>)}
              </div>
              <em>{goal.perkPreview}</em>
              {goal.id === "mac-mini-render-node" && (
                <button className="primary-cta" disabled={currentUsd >= goal.targetUsd} onClick={onMockSupportMacMini}>
                  {currentUsd >= goal.targetUsd ? "Mock support registered" : "Mock support $1000 · get 1000 FBC"}
                </button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function MockPanel({ title, metric, cta, tone, children }: { title: string; metric: string; cta: string; tone: "compute" | "atlas" | "funding" | "network"; children: React.ReactNode }) {
  return (
    <div className={`metric-card tone-${tone}`}>
      <strong>{title}</strong>
      <span>{metric}</span>
      <div>{children}</div>
      <button className="ghost-button wide">{cta}</button>
      <em>Coming in next build.</em>
    </div>
  );
}

function LockedPreview({ object }: { object: RoomObjectConfig }) {
  return (
    <div className="locked-preview">
      <strong>{object.label}</strong>
      <p>{object.lockedReason}</p>
      <div className="preview-line">Preview: this expands the world after the core room loop feels great.</div>
    </div>
  );
}

function CharacterPanel({ object, state }: { object: RoomObjectConfig; state: GameState }) {
  const isKirill = object.id === "kirill";
  return (
    <div className="character-panel">
      <div className="stat-grid">
        <div><span>{isKirill ? "Vision" : "Execution"}</span><strong>{isKirill ? 42 + state.resources.knowledge : 38 + (state.generatorPurchased ? 12 : 0)}</strong></div>
        <div><span>State</span><strong>{state.combo >= 10 ? "active" : "idle"}</strong></div>
      </div>
      <p>{isKirill ? "Kirill reacts to AtlasRepo, YouTube and new ideas." : "Black Box reacts to devices, generators and technical upgrades."}</p>
    </div>
  );
}

function ProfilePanel({ state, onReset }: { state: GameState; onReset: () => void }) {
  return (
    <div className="profile-panel">
      <div className="id-card">
        <span>Operator ID</span>
        <strong>MOCK_USER_001</strong>
        <p>Research path · Prototype Mode</p>
      </div>
      <div className="stat-grid">
        <div><span>Level</span><strong>{state.accountLevel}</strong></div>
        <div><span>Compute</span><strong>{Math.floor(state.resources.compute)}</strong></div>
        <div><span>Knowledge</span><strong>{Math.floor(state.resources.knowledge)}</strong></div>
        <div><span>Contribution</span><strong>{Math.floor(state.resources.contribution)}</strong></div>
        <div><span>FBC mock</span><strong>{Math.floor(state.resources.fbc)}</strong></div>
        <div><span>Support</span><strong>${state.mockSupportUsd}</strong></div>
      </div>
      <AtlasRankCard state={state} />
      <ContributionHistory state={state} />
      <div className="locked-stats">
        <span>Reputation locked</span>
        <span>Network Power locked</span>
        <span>Credits locked</span>
      </div>
      <TransactionJournal state={state} />
      <button className="danger-button" onClick={onReset}>Reset prototype progress</button>
    </div>
  );
}
