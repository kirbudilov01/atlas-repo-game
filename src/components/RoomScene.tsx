import { productionChain, seasonEvents } from "../config/idleMeta";
import { products } from "../config/products";
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
  const realRoomSrc = `${import.meta.env.BASE_URL}assets/our-room-map.png`;
  const gameRoomSrc = `${import.meta.env.BASE_URL}assets/game/our-room-game-bg-v1.png`;
  const ecosystemObject = roomObjects.find((object) => object.id === "asset-index");
  const supportObject = roomObjects.find((object) => object.id === "funding-hub");
  const myRoomObject = roomObjects.find((object) => object.id === "my-room-door");
  const macMiniObject = roomObjects.find((object) => object.id === "mac-mini");
  const mrr = state.atlasMission.status === "claimed" ? 120 : 0;
  const runway = Math.min(3000, state.mockSupportUsd);

  return (
    <section className="room-scene" aria-label="Our Room">
      <div className={`room-backdrop ${scanMode ? "scan-mode" : ""}`}>
        <img className="room-photo room-photo-game" src={gameRoomSrc} alt="" draggable={false} />
        <img className="room-photo room-photo-real" src={realRoomSrc} alt="" draggable={false} />
        <div className="room-cinematic-grade" />
        <div className="room-game-vignette" />
        <button className="room-map-caption" onClick={onToggleScan}>
          <span>Our Room</span>
          <strong>{scanMode ? "Scan mode" : "Live map"}</strong>
        </button>
        <div className="room-business-layer" aria-hidden={scanMode}>
          <div className="room-chain-overlay">
            {productionChain.slice(0, 4).map((step, index) => (
              <span className={state.generatorPurchased || index < 2 ? "is-live" : ""} key={step.id}>
                {step.label}
              </span>
            ))}
          </div>
          <button className="room-portal portal-ecosystem" onClick={() => ecosystemObject && onObject(ecosystemObject)}>
            <span>FabricBot</span>
            <strong>Ecosystem</strong>
            <em>AtlasRepo · Want2View</em>
          </button>
          <button className="room-portal portal-my-room" onClick={() => myRoomObject && onObject(myRoomObject)}>
            <span>Player</span>
            <strong>My Room</strong>
            <em>Unlock upgrades later</em>
          </button>
          <div className="room-kpi-strip">
            <button className="room-kpi-card" onClick={() => supportObject && onObject(supportObject)}>
              <span>Runway</span>
              <strong>${runway} / $3k</strong>
              <i style={{ width: `${Math.min(100, Math.floor((runway / 3000) * 100))}%` }} />
            </button>
            <button className="room-kpi-card is-main" onClick={() => supportObject && onObject(supportObject)}>
              <span>Season Goal</span>
              <strong>${mrr} / $30k MRR</strong>
              <i style={{ width: `${Math.min(100, Math.floor((mrr / 30000) * 100))}%` }} />
            </button>
            <button className="room-kpi-card" onClick={() => macMiniObject && onObject(macMiniObject)}>
              <span>Render Node</span>
              <strong>Mac mini</strong>
              <em>{state.mockSupportUsd >= 1000 ? "funded" : "$1k target"}</em>
            </button>
          </div>
          <div className="room-event-overlay">
            <span>{seasonEvents[0].title}</span>
            <strong>{seasonEvents[0].goal}</strong>
            <i><u style={{ width: `${seasonEvents[0].progress}%` }} /></i>
          </div>
          <div className="room-product-story">
            <span>Current products</span>
            <strong>{products.map((product) => product.name).join(" · ")}</strong>
          </div>
        </div>
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
