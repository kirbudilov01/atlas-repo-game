import type { GameState } from "../store/gameStore";

interface Props {
  state: GameState;
  onReality: () => void;
}

export function ResourceHUD({ state, onReality }: Props) {
  return (
    <header className="hud">
      <div className="hud-left">
        <div className="season-chip">
          <span>Season 0</span>
          <strong>Becoming autonomous</strong>
        </div>
        <button className="reality-chip" onClick={onReality}>Reality Update</button>
      </div>
      <div className="resource-strip">
        <div className="resource-pill compute"><span>Compute</span><strong>{Math.floor(state.resources.compute)}</strong></div>
        <div className="resource-pill knowledge"><span>Knowledge</span><strong>{Math.floor(state.resources.knowledge)}</strong></div>
        <div className="resource-pill contribution"><span>Contrib</span><strong>{Math.floor(state.resources.contribution)}</strong></div>
        <div className="level-pill"><span>Lv</span><strong>{state.accountLevel}</strong></div>
      </div>
    </header>
  );
}
