interface Props {
  combo: number;
  onClick: () => void;
}

export function AtlasCore({ combo, onClick }: Props) {
  return (
    <button className="atlas-core" onClick={onClick} aria-label="Generate Compute">
      <span className="core-ring ring-one" />
      <span className="core-ring ring-two" />
      <span className="core-orb" />
      <span className="core-label">ATLAS CORE</span>
      {combo > 0 && <span className="combo-badge">x{combo}</span>}
      <span className="particle p1" />
      <span className="particle p2" />
      <span className="particle p3" />
    </button>
  );
}
