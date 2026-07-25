import type { GameState } from "../store/gameStore";

interface Props {
  state: GameState;
  nextAction: { title: string; body: string; cta: string; target: "core" | "factory" | "atlas" | "reward" };
  onPrimary: () => void;
}

export function ContextActionBar({ state, nextAction, onPrimary }: Props) {
  return (
    <section className="context-bar">
      <div className="quest-copy">
        <span className="eyebrow">Next action</span>
        <strong>{nextAction.title}</strong>
        <p>{nextAction.body}</p>
        {state.debugMessage && <em className="debug-note">{state.debugMessage}</em>}
      </div>
      <button className={`primary-cta target-${nextAction.target}`} onClick={onPrimary}>
        {nextAction.cta}
      </button>
    </section>
  );
}
