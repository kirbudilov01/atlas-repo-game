import { roomObjects } from "../config/roomObjects";
import type { GameState } from "../store/gameStore";
import type { RoomObjectConfig } from "../types/game";
import { RoomObject } from "./RoomObject";

interface Props {
  state: GameState;
  selectedId?: string;
  scanMode: boolean;
  onToggleScan: () => void;
  onObject: (object: RoomObjectConfig) => void;
  onCoreClick: () => void;
}

export function RoomScene({ state, selectedId, scanMode, onToggleScan, onObject, onCoreClick }: Props) {
  const roomMapSrc = `${import.meta.env.BASE_URL}assets/our-room-map.png`;

  return (
    <section className="room-scene" aria-label="Our Room">
      <div className={`room-backdrop ${scanMode ? "scan-mode" : ""}`}>
        <img className="room-photo" src={roomMapSrc} alt="" draggable={false} />
        <div className="room-cinematic-grade" />
        <div className="room-game-vignette" />
        <button className="room-map-caption" onClick={onToggleScan}>
          <span>Our Room</span>
          <strong>{scanMode ? "Scan mode" : "Live map"}</strong>
        </button>
        {state.generatorPurchased && <div className="generator-node">Compute Generator L{state.generatorLevel}</div>}
        {roomObjects.map((object) => (
          <RoomObject
            key={object.id}
            object={object}
            combo={state.combo}
            active={selectedId === object.id || (state.combo >= 10 && (object.id === "kirill" || object.id === "black-box"))}
            generatorPurchased={state.generatorPurchased}
            onClick={onObject}
            onCoreClick={onCoreClick}
          />
        ))}
      </div>
    </section>
  );
}
