import type { CSSProperties } from "react";
import { roomObjects } from "../config/roomObjects";
import type { AppView } from "./AppPages";
import type { GameState } from "../store/gameStore";
import type { RoomObjectConfig } from "../types/game";
import { RoomObject } from "./RoomObject";

interface Props {
  state: GameState;
  selectedId?: string;
  tapSignal: number;
  scanMode: boolean;
  onToggleScan: () => void;
  onObject: (object: RoomObjectConfig) => void;
  onNavigate: (view: AppView) => void;
  onCoreClick: () => void;
}

export function RoomScene({ state, selectedId, tapSignal, scanMode, onToggleScan, onObject, onNavigate, onCoreClick }: Props) {
  const realRoomSrc = `${import.meta.env.BASE_URL}assets/our-room-map.png`;
  const gameRoomSrc = `${import.meta.env.BASE_URL}assets/game/our-room-game-bg-v1.png`;
  const mapObjects = roomObjects.filter((object) => ["kirill", "black-box"].includes(object.id));
  const supportTotal = state.mockSupportUsd;
  const productDeskObject: RoomObjectConfig = {
    id: "asset-index",
    type: "terminal",
    label: "Product Desk",
    subtitle: "AtlasRepo · Want2View · FabricBot",
    visualId: "asset-index",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "atlas"
  };

  return (
    <section className="room-scene" aria-label="Our Room">
      <div className={`room-backdrop ${scanMode ? "scan-mode" : ""}`}>
        <img className="room-photo room-photo-game" src={gameRoomSrc} alt="" draggable={false} />
        <img className="room-photo room-photo-real" src={realRoomSrc} alt="" draggable={false} />
        <div className="room-cinematic-grade" />
        <div className="room-game-vignette" />
        <button className="room-map-caption" onClick={onToggleScan}>
          <span>Ecosystem Map</span>
          <strong>{scanMode ? "Photo check" : "Project locations"}</strong>
        </button>
        <div className="room-location-layer" aria-hidden={scanMode}>
          <div className="map-route-web" aria-hidden="true">
            <i className="route route-products" />
            <i className="route route-support" />
            <i className="route route-sofa" />
            <i className="map-center-pulse" />
          </div>
          <button className="room-hotspot room-product-desk" style={{ "--i": 0 } as CSSProperties} onClick={() => onObject(productDeskObject)}>
            <i />
            <span>Location 01</span>
            <strong>Product Desk</strong>
            <em>AtlasRepo · Want2View · FabricBot</em>
          </button>
          <button className="room-hotspot room-sofa-clicker" style={{ "--i": 1 } as CSSProperties} onClick={onCoreClick}>
            <i />
            <span>Center room</span>
            <strong>Tap sofa</strong>
            <em>+BP for upgrades and perks</em>
          </button>
          <button className="room-hotspot room-support-node" style={{ "--i": 2 } as CSSProperties} onClick={() => onNavigate("participate")}>
            <i />
            <span>{supportTotal ? `$${supportTotal} supported` : "Location 02"}</span>
            <strong>Mac mini</strong>
            <em>render/video engine · FBC memory</em>
          </button>
          <div className="map-project-strip" aria-hidden="true">
            <span>AtlasRepo</span>
            <span>Want2View</span>
            <span>FabricBot</span>
          </div>
          {tapSignal > 0 && <div className="room-tap-float" key={tapSignal}>+BP</div>}
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
