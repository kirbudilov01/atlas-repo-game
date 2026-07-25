import type { GameState } from "../store/gameStore";

interface Props {
  state: GameState;
  nextAction: { title: string; body: string; cta: string; target: "core" | "factory" | "atlas" | "reward" };
  onPrimary: () => void;
}

export function ContextActionBar({ state, nextAction, onPrimary }: Props) {
  const steps = [
    { id: "compute", label: "Compute", done: state.resources.compute >= 25 || state.generatorPurchased },
    { id: "generator", label: "Generator", done: state.generatorPurchased },
    { id: "atlas", label: "Atlas", done: state.atlasMission.status === "claimed" },
    { id: "rank", label: "Rank 2", done: state.accountLevel >= 2 },
    { id: "reward", label: "Reward", done: state.atlasMission.rewardPreview }
  ];

  return (
    <section className="context-bar">
      <div className="quest-copy">
        <span className="eyebrow">Next action</span>
        <strong>{nextAction.title}</strong>
        <p>{nextAction.body}</p>
        {state.debugMessage && <em className="debug-note">{state.debugMessage}</em>}
        <div className="quest-steps" aria-label="Season 0 progress">
          {steps.map((step) => <span key={step.id} className={step.done ? "is-done" : ""}>{step.label}</span>)}
        </div>
      </div>
      <button className={`primary-cta target-${nextAction.target}`} onClick={onPrimary}>
        {nextAction.cta}
      </button>
    </section>
  );
}
