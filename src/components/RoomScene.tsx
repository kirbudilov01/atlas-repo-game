import { roomObjects } from "../config/roomObjects";
import type { GameState } from "../store/gameStore";
import type { RoomObjectConfig } from "../types/game";
import { RoomObject } from "./RoomObject";

interface Props {
  state: GameState;
  selectedId?: string;
  onObject: (object: RoomObjectConfig) => void;
  onCoreClick: () => void;
}

export function RoomScene({ state, selectedId, onObject, onCoreClick }: Props) {
  return (
    <section className="room-scene" aria-label="Our Room">
      <div className="room-backdrop">
        <div className="wall-grid" />
        <div className="floor-plane" />
        <div className="light-cone cone-left" />
        <div className="light-cone cone-right" />
        {state.generatorPurchased && <div className="generator-node">Compute Generator online</div>}
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
