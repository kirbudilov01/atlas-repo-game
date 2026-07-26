interface Props {
  onFactory: () => void;
  onAtlas: () => void;
  onNetwork: () => void;
  onProfile: () => void;
}

export function BottomNavigation({ onFactory, onAtlas, onNetwork, onProfile }: Props) {
  return (
    <nav className="bottom-nav">
      <button className="is-current"><span>R</span><strong>Room</strong></button>
      <button onClick={onFactory}><span>F</span><strong>Factory</strong></button>
      <button onClick={onAtlas}><span>A</span><strong>Atlas</strong></button>
      <button onClick={onNetwork}><span>N</span><strong>Network</strong></button>
      <button onClick={onProfile}><span>ID</span><strong>Profile</strong></button>
    </nav>
  );
}
