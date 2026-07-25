interface Props {
  onDone: () => void;
}

export function Onboarding({ onDone }: Props) {
  return (
    <main className="onboarding">
      <div className="onboarding-room">
        <div className="mini-core" />
        <div className="mini-character kirill-mini" />
        <div className="mini-character box-mini" />
      </div>
      <div className="onboarding-copy">
        <span className="eyebrow">Prototype Mode</span>
        <h1>Welcome to Our Ecosystem</h1>
        <p>Click the Atlas Core to generate Compute. Use it to build generators, scan AtlasRepo and grow your contribution history.</p>
        <ul>
          <li>Real devices power real digital products.</li>
          <li>Rewards are previews: no token, no guaranteed return.</li>
          <li>The room changes with founder life and Reality Updates.</li>
        </ul>
        <button className="primary-cta" onClick={onDone}>Enter Our Room</button>
      </div>
    </main>
  );
}
