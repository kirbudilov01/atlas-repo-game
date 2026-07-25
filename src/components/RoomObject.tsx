import type { RoomObjectConfig } from "../types/game";
import { AtlasCore } from "./AtlasCore";

interface Props {
  object: RoomObjectConfig;
  combo: number;
  active: boolean;
  generatorPurchased: boolean;
  onClick: (object: RoomObjectConfig) => void;
  onCoreClick: () => void;
}

export function RoomObject({ object, combo, active, generatorPurchased, onClick, onCoreClick }: Props) {
  const style = {
    left: `${object.x}%`,
    top: `${object.y}%`,
    width: `${object.w}%`,
    height: `${object.h}%`,
    zIndex: object.z
  };

  if (object.type === "core") {
    return (
      <div className="room-object core-wrap" style={style}>
        <AtlasCore combo={combo} onClick={onCoreClick} />
      </div>
    );
  }

  const className = [
    "room-object",
    `object-${object.visualId}`,
    `type-${object.type}`,
    object.accent ? `accent-${object.accent}` : "",
    active ? "is-active" : "",
    generatorPurchased && object.id === "black-box" ? "is-working" : ""
  ].join(" ");

  return (
    <button className={className} style={style} onClick={() => onClick(object)} aria-label={object.label}>
      <span className="object-art">
        {object.type === "character" && <span className="character-face" />}
        {object.type === "locked" && <span className="lock-line" />}
        {object.type === "asset" && <span className="device-screen" />}
        {object.type === "terminal" && <span className="terminal-lines" />}
      </span>
      <span className="object-label">
        <strong>{object.label}</strong>
        <em>{object.subtitle}</em>
      </span>
    </button>
  );
}
