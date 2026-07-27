import type { GameState } from "../store/gameStore";

interface Props {
  state: GameState;
}

export function ResourceHUD({ state }: Props) {
  const mrr = state.atlasMission.status === "claimed" ? 120 : 0;
  const users = state.contributionEvents.length + state.purchasedPerkRewardIds.length;
  return (
    <header className="hud">
      <div className="hud-left">
        <div className="season-chip">
          <span>Season 0</span>
          <strong>Becoming autonomous</strong>
        </div>
      </div>
      <div className="resource-strip">
        <div className="resource-pill funding"><span>MRR</span><strong>${mrr}</strong></div>
        <div className="resource-pill network"><span>Users</span><strong>{users}</strong></div>
        <div className="resource-pill compute"><span>Compute</span><strong>{Math.floor(state.resources.compute)}</strong></div>
        <div className="resource-pill fbc"><span>FBC</span><strong>{Math.floor(state.resources.fbc)}</strong></div>
      </div>
    </header>
  );
}
