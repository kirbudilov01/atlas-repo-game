import type { CSSProperties } from "react";
import { roomObjects } from "../config/roomObjects";
import type { AppView } from "./AppPages";
import type { GameState } from "../store/gameStore";
import type { RoomObjectConfig } from "../types/game";
import { RoomObject } from "./RoomObject";

interface Props {
  state: GameState;
  selectedId?: string;
  scanMode: boolean;
  onToggleScan: () => void;
  onObject: (object: RoomObjectConfig) => void;
  onNavigate: (view: AppView) => void;
  onCoreClick: () => void;
}

export function RoomScene({ state, selectedId, scanMode, onToggleScan, onObject, onNavigate, onCoreClick }: Props) {
  const realRoomSrc = `${import.meta.env.BASE_URL}assets/our-room-map.png`;
  const gameRoomSrc = `${import.meta.env.BASE_URL}assets/game/our-room-game-bg-v1.png`;
  const want2viewObject = roomObjects.find((object) => object.id === "want2view");
  const atlasObject = roomObjects.find((object) => object.id === "atlas-terminal");
  const macMiniObject = roomObjects.find((object) => object.id === "mac-mini");
  const autonomyMrr = Math.min(3000, state.atlasMission.status === "claimed" ? 120 : 0);
  const mapObjects = roomObjects.filter((object) => ["kirill", "black-box"].includes(object.id));
  const supportTotal = state.mockSupportUsd;

  return (
    <section className="room-scene" aria-label="Our Room">
      <div className={`room-backdrop ${scanMode ? "scan-mode" : ""}`}>
        <img className="room-photo room-photo-game" src={gameRoomSrc} alt="" draggable={false} />
        <img className="room-photo room-photo-real" src={realRoomSrc} alt="" draggable={false} />
        <div className="room-cinematic-grade" />
        <div className="room-game-vignette" />
        <button className="room-map-caption" onClick={onToggleScan}>
          <span>Our Room</span>
          <strong>{scanMode ? "Photo check" : "Live build room"}</strong>
        </button>
        <div className="room-location-layer" aria-hidden={scanMode}>
          <button className="room-hotspot laptop-hotspot hotspot-want2view" style={{ "--i": 0 } as CSSProperties} onClick={() => want2viewObject && onObject(want2viewObject)}>
            <i />
            <span>Want2View metrics</span>
            <strong>Video demand</strong>
            <em>views · trends · creator signals</em>
          </button>
          <button className="room-hotspot laptop-hotspot hotspot-atlasrepo" style={{ "--i": 1 } as CSSProperties} onClick={() => atlasObject && onObject(atlasObject)}>
            <i />
            <span>AtlasRepo metrics</span>
            <strong>Repo intelligence</strong>
            <em>scans · lessons · research</em>
          </button>
          <button className="room-hotspot mac-mini-hotspot" style={{ "--i": 2 } as CSSProperties} onClick={() => macMiniObject && onObject(macMiniObject)}>
            <i />
            <span>Main hardware goal</span>
            <strong>Mac mini</strong>
            <em>{state.mockSupportUsd >= 1000 ? "funded" : "$1000 for render/video generation"}</em>
          </button>
          <button className="room-hotspot couch-support-hotspot" style={{ "--i": 3 } as CSSProperties} onClick={() => onNavigate("participate")}>
            <i />
            <span>Voluntary support</span>
            <strong>$300/mo services</strong>
            <em>FBC memory, not investment</em>
          </button>
          <button className="room-donate-cta" onClick={() => onNavigate("participate")}>
            <span>${supportTotal} supported</span>
            <strong>Donate for tools</strong>
            <em>We remember supporters, no investment promise</em>
          </button>
        </div>
        {state.generatorPurchased && <div className="generator-node">Compute Generator L{state.generatorLevel}</div>}
        {mapObjects.map((object) => (
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
