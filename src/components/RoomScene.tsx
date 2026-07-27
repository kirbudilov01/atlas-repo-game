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
  const macMiniObject = roomObjects.find((object) => object.id === "mac-mini");
  const autonomyMrr = Math.min(3000, state.atlasMission.status === "claimed" ? 120 : 0);
  const mapObjects = roomObjects.filter((object) => ["kirill", "black-box"].includes(object.id));

  const locations = [
    {
      id: "ecosystem",
      title: "Ecosystem",
      subtitle: "Products and projects",
      meta: "AtlasRepo · Want2View",
      className: "location-ecosystem",
      onClick: () => onNavigate("ecosystem")
    },
    {
      id: "support",
      title: "Support Roadmap",
      subtitle: `$${autonomyMrr} / $3000 MRR`,
      meta: "Runway and donations",
      className: "location-support",
      onClick: () => onNavigate("participate")
    },
    {
      id: "room",
      title: "My Room",
      subtitle: `${Math.floor(state.resources.compute)} BP · ${state.accountLevel} lvl`,
      meta: "Clicker and upgrades",
      className: "location-room",
      onClick: () => onNavigate("my-room")
    },
    {
      id: "market",
      title: "Market",
      subtitle: "Promos and access",
      meta: "Spend BP later",
      className: "location-market",
      onClick: () => onNavigate("market")
    },
    {
      id: "render",
      title: "Mac mini Render",
      subtitle: state.mockSupportUsd >= 1000 ? "Funded" : "$1000 target",
      meta: "UBT/video engine",
      className: "location-render",
      onClick: () => macMiniObject && onObject(macMiniObject)
    }
  ];

  return (
    <section className="room-scene" aria-label="Our Room">
      <div className={`room-backdrop ${scanMode ? "scan-mode" : ""}`}>
        <img className="room-photo room-photo-game" src={gameRoomSrc} alt="" draggable={false} />
        <img className="room-photo room-photo-real" src={realRoomSrc} alt="" draggable={false} />
        <div className="room-cinematic-grade" />
        <div className="room-game-vignette" />
        <button className="room-map-caption" onClick={onToggleScan}>
          <span>Our Room Map</span>
          <strong>{scanMode ? "Photo check" : "Choose location"}</strong>
        </button>
        <div className="room-location-layer" aria-hidden={scanMode}>
          <div className="map-route-line" />
          <div className="map-location-grid">
            {locations.map((location, index) => (
              <button className={`map-location-card ${location.className}`} style={{ "--i": index } as CSSProperties} onClick={location.onClick} key={location.id}>
                <i />
                <span>{location.subtitle}</span>
                <strong>{location.title}</strong>
                <em>{location.meta}</em>
              </button>
            ))}
          </div>
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
