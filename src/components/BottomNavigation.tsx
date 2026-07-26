interface Props {
  onFactory: () => void;
  onAtlas: () => void;
  onNetwork: () => void;
  onProfile: () => void;
}

export function BottomNavigation({ onFactory, onAtlas, onNetwork, onProfile }: Props) {
  return (
    <nav className="bottom-nav">
      <button className="is-current"><span className="nav-glyph nav-room" aria-hidden="true"><i /></span><strong>Room</strong></button>
      <button onClick={onFactory}><span className="nav-glyph nav-factory" aria-hidden="true"><i /></span><strong>Factory</strong></button>
      <button onClick={onAtlas}><span className="nav-glyph nav-atlas" aria-hidden="true"><i /></span><strong>Atlas</strong></button>
      <button onClick={onNetwork}><span className="nav-glyph nav-network" aria-hidden="true"><i /></span><strong>Network</strong></button>
      <button onClick={onProfile}><span className="nav-glyph nav-profile" aria-hidden="true"><i /></span><strong>Profile</strong></button>
    </nav>
  );
}
