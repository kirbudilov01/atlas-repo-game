import type { GameState } from "../store/gameStore";

interface Props {
  state: GameState;
  nextAction: { title: string; body: string; cta: string; target: "core" | "factory" | "atlas" | "reward" };
  onPrimary: () => void;
}

export function ContextActionBar({ state, nextAction, onPrimary }: Props) {
  const progress = getMissionProgress(state, nextAction.target);

  return (
    <section className="context-bar">
      <div className="quest-copy">
        <span className="eyebrow">Next unlock</span>
        <strong>{nextAction.title}</strong>
        <p>{nextAction.body}</p>
        <div className="mission-progress" aria-label={`Mission progress ${progress.percent}%`}>
          <i style={{ width: `${progress.percent}%` }} />
          <b>{progress.label}</b>
        </div>
        {state.debugMessage && <em className="debug-note">{state.debugMessage}</em>}
      </div>
      <button className={`primary-cta target-${nextAction.target}`} onClick={onPrimary}>
        {nextAction.cta}
      </button>
    </section>
  );
}

function getMissionProgress(state: GameState, target: Props["nextAction"]["target"]) {
  if (target === "core") {
    const percent = Math.min(100, Math.floor((state.resources.compute / 25) * 100));
    return { percent, label: `${Math.min(25, Math.floor(state.resources.compute))}/25 BP` };
  }
  if (target === "factory") {
    return { percent: state.generatorPurchased ? 100 : 0, label: "Generator ready" };
  }
  if (target === "atlas") {
    const answered = Object.keys(state.atlasMission.answers).length;
    const percent = state.atlasMission.status === "claimed" ? 100 : Math.min(100, Math.floor((answered / 3) * 100));
    return { percent, label: `${answered}/3 repo signals` };
  }
  return { percent: Math.min(100, Math.floor(state.resources.compute / 3)), label: `${Math.floor(state.resources.compute)} BP` };
}
