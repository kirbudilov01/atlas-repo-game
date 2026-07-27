interface Props {
  current: "ecosystem" | "participate" | "our-room" | "my-room" | "market";
  onEcosystem: () => void;
  onParticipate: () => void;
  onOurRoom: () => void;
  onMyRoom: () => void;
  onMarket: () => void;
}

export function BottomNavigation({ current, onEcosystem, onParticipate, onOurRoom, onMyRoom, onMarket }: Props) {
  return (
    <nav className="bottom-nav">
      <button className={current === "ecosystem" ? "is-current" : ""} onClick={onEcosystem}><span className="nav-glyph nav-factory" aria-hidden="true"><i /></span><strong>Eco</strong></button>
      <button className={current === "participate" ? "is-current" : ""} onClick={onParticipate}><span className="nav-glyph nav-network" aria-hidden="true"><i /></span><strong>Support</strong></button>
      <button className={current === "our-room" ? "is-current" : ""} onClick={onOurRoom}><span className="nav-glyph nav-room" aria-hidden="true"><i /></span><strong>Room</strong></button>
      <button className={current === "my-room" ? "is-current" : ""} onClick={onMyRoom}><span className="nav-glyph nav-profile" aria-hidden="true"><i /></span><strong>My Room</strong></button>
      <button className={current === "market" ? "is-current" : ""} onClick={onMarket}><span className="nav-glyph nav-market" aria-hidden="true"><i /></span><strong>Market</strong></button>
    </nav>
  );
}
