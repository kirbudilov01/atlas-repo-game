interface Props {
  onFactory: () => void;
  onAtlas: () => void;
  onNetwork: () => void;
  onProfile: () => void;
}

export function BottomNavigation({ onFactory, onAtlas, onNetwork, onProfile }: Props) {
  return (
    <nav className="bottom-nav">
      <button className="is-current">Room</button>
      <button onClick={onFactory}>Factory</button>
      <button onClick={onAtlas}>Atlas</button>
      <button onClick={onNetwork}>Network</button>
      <button onClick={onProfile}>ID</button>
    </nav>
  );
}
