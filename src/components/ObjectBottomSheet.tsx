import { useMemo, useState } from "react";
import { assets } from "../config/assets";
import { atlasFirstScanRepos } from "../config/missions";
import { products } from "../config/products";
import { generatorTypes } from "../config/generators";
import { getAtlasRankProgress, getGeneratorRatePerHour, getGeneratorUpgradeCost, type GameState } from "../store/gameStore";
import type { Asset, MissionRepo, RoomObjectConfig } from "../types/game";

interface Props {
  object: RoomObjectConfig | null;
  state: GameState;
  onClose: () => void;
  onBuyGenerator: () => void;
  onUpgradeGenerator: () => void;
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
        {object.id === "atlas-terminal" && <AtlasMission state={state} onAnswerRepo={onAnswerRepo} onComplete={onCompleteAtlasMission} />}
        {object.id === "want2view" && <MockPanel title="Want2View Terminal" metric="Trend Scanner locked" cta="Unlock after Atlas Rank 2" tone="compute">
          <p>Preview the product loop: Trend Scanner will turn Attention into a real Want2View research and a subscription discount.</p>
        </MockPanel>}
        {object.id === "network-terminal" && <MockPanel title="Network Terminal" metric="Network Power locked" cta="Copy prototype invite" tone="network">
          <code>https://t.me/atlas_room_bot/app?startapp=ref_demo</code>
          <p>Next build tracks active friends. Prototype mode has no valuable referral rewards.</p>
        </MockPanel>}
        {object.id === "funding-hub" && <MockPanel title="Funding Hub" metric="$460 / $1,500" cta="Back this mission later" tone="funding">
          <p>Mock mission: Activate New Mac mini. Funds support infrastructure, development and testing. No equity, no guaranteed return.</p>
        </MockPanel>}
        {object.id === "youtube-wall" && <MockPanel title="YouTube Wall" metric="Season 0" cta="Open next episode later" tone="network">
          <p>Real life becomes video; video becomes patch notes; patch notes become community missions.</p>
        </MockPanel>}
        {object.id === "reward-vault" && <RewardPreview state={state} />}
        {object.id === "goal" && <MockPanel title="Ecosystem Goal" metric="$0 / $3,000 MRR" cta="View strategy later" tone="funding">
          <p>The first season mission is autonomy: make the ecosystem able to function and grow sustainably.</p>
        </MockPanel>}
        {object.type === "locked" && <LockedPreview object={object} />}
        {object.type === "character" && <CharacterPanel object={object} state={state} />}
        {object.id === "factory-panel" && <GeneratorPanel state={state} onBuyGenerator={onBuyGenerator} onUpgradeGenerator={onUpgradeGenerator} onClaimOffline={onClaimOffline} onSimulateOffline={onSimulateOffline} />}
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
        <strong>Uncountable Assets</strong>
        <span>{filtered.length} visible assets · {plannedCount} need attention</span>
        <p>Hardware, knowledge, content, subscriptions and community signals are all modeled as assets. Real payouts and investment logic remain locked.</p>
      </div>
      <div className="stat-grid">
        <div><span>Utility</span><strong>{totalUtility}</strong></div>
        <div><span>Monthly burn</span><strong>${monthlyBurn}</strong></div>
        <div><span>Catalog</span><strong>{assets.length}</strong></div>
        <div><span>Mode</span><strong>mock</strong></div>
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

function AtlasMission({ state, onAnswerRepo, onComplete }: { state: GameState; onAnswerRepo: (repo: MissionRepo, answer: string) => void; onComplete: () => void }) {
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
      {claimed && <RewardPreview state={state} />}
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

function GeneratorPanel({ state, onBuyGenerator, onUpgradeGenerator, onClaimOffline, onSimulateOffline }: { state: GameState; onBuyGenerator: () => void; onUpgradeGenerator: () => void; onClaimOffline: () => void; onSimulateOffline: () => void }) {
  const generator = generatorTypes[0];
  const level = state.generatorLevel;
  const rate = getGeneratorRatePerHour(level || 1);
  const upgradeCost = getGeneratorUpgradeCost(level);
  return (
    <div className="generator-panel">
      <div className="metric-card tone-compute">
        <strong>{generator.name}</strong>
        <span>{state.generatorPurchased ? `Level ${level} · Online` : `${generator.costCompute} Compute`}</span>
        <p>{generator.description}</p>
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
      <TransactionJournal state={state} />
    </div>
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

function RewardPreview({ state }: { state: GameState }) {
  return (
    <div className="reward-preview">
      <div className={`fragment ${state.atlasMission.fragmentPreview ? "is-unlocked" : ""}`}>Atlas Fragment</div>
      <div>
        <h3>Future benefit preview</h3>
        <p>{state.atlasMission.rewardPreview ? "Free AtlasRepo lesson preview unlocked. Prototype mode does not grant real access." : "Complete AtlasRepo First Scan to preview a real product benefit."}</p>
        <div className="reward-list">
          <span>Closed lesson</span>
          <span>AtlasRepo discount</span>
          <span>Founder history</span>
        </div>
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
