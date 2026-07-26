interface Props {
  onDone: () => void;
}

export function Onboarding({ onDone }: Props) {
  const roomMapSrc = `${import.meta.env.BASE_URL}assets/our-room-map.png`;

  return (
    <main className="onboarding">
      <div className="onboarding-room">
        <img src={roomMapSrc} alt="" draggable={false} />
        <div className="onboarding-grade" />
        <div className="mini-core" />
        <div className="mini-character kirill-mini" />
        <div className="mini-character box-mini" />
      </div>
      <div className="onboarding-copy">
        <span className="eyebrow">Prototype Mode</span>
        <h1>Our Room</h1>
        <p>Your real room becomes a playable ecosystem: click the core, power devices, scan AtlasRepo, grow rank and preview rewards.</p>
        <ul>
          <li>Real room geometry, game systems on top.</li>
          <li>Assets, subscriptions and projects become upgrade paths.</li>
          <li>Rewards are previews only: no token, no guaranteed return.</li>
        </ul>
        <button className="primary-cta" onClick={onDone}>Enter Our Room</button>
      </div>
    </main>
  );
}
