import { useMemo, useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { ContextActionBar } from "./components/ContextActionBar";
import { ObjectBottomSheet } from "./components/ObjectBottomSheet";
import { Onboarding } from "./components/Onboarding";
import { ResourceHUD } from "./components/ResourceHUD";
import { RoomScene } from "./components/RoomScene";
import { useGameStore } from "./store/gameStore";
import type { RoomObjectConfig } from "./types/game";
import "./styles/app.css";

const virtualObjects: Record<string, RoomObjectConfig> = {
  factory: {
    id: "factory-panel",
    type: "generator",
    label: "Factory",
    subtitle: "Personal generator",
    visualId: "factory",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "compute"
  },
  profile: {
    id: "profile-panel",
    type: "terminal",
    label: "Operator ID",
    subtitle: "Profile and debug",
    visualId: "profile",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "atlas"
  },
  reality: {
    id: "reality-update",
    type: "terminal",
    label: "Reality Update #04",
    subtitle: "Mac mini connected",
    visualId: "reality",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "network"
  }
};

export default function App() {
  const game = useGameStore();
  const [selected, setSelected] = useState<RoomObjectConfig | null>(null);
  const [flash, setFlash] = useState(0);

  const selectedId = selected?.id;

  const handleCoreClick = () => {
    game.clickCore();
    setFlash((value) => value + 1);
  };

  const handlePrimary = () => {
    if (game.nextAction.target === "core") {
      handleCoreClick();
      return;
    }
    if (game.nextAction.target === "factory") {
      setSelected(virtualObjects.factory);
      return;
    }
    if (game.nextAction.target === "atlas") {
      setSelected({
        id: "atlas-terminal",
        type: "terminal",
        label: "AtlasRepo Terminal",
        subtitle: "Knowledge core",
        visualId: "atlas-terminal",
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        z: 0,
        linkedEntityId: "atlasrepo",
        accent: "atlas"
      });
      return;
    }
    setSelected({
      id: "reward-vault",
      type: "reward",
      label: "Reward Vault",
      subtitle: "Benefits preview",
      visualId: "reward-vault",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: 0,
      accent: "funding"
    });
  };

  const appClass = useMemo(() => `app-shell flash-${flash % 2}`, [flash]);

  if (!game.state.onboarded) {
    return <Onboarding onDone={game.completeOnboarding} />;
  }

  return (
    <main className={appClass}>
      <ResourceHUD state={game.state} onReality={() => setSelected(virtualObjects.reality)} />
      <RoomScene state={game.state} selectedId={selectedId} onObject={setSelected} onCoreClick={handleCoreClick} />
      <ContextActionBar state={game.state} nextAction={game.nextAction} onPrimary={handlePrimary} />
      <BottomNavigation
        onFactory={() => setSelected(virtualObjects.factory)}
        onAtlas={handlePrimary}
        onNetwork={() =>
          setSelected({
            id: "network-terminal",
            type: "terminal",
            label: "Network Terminal",
            subtitle: "Distribution",
            visualId: "network-terminal",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: 0,
            accent: "network"
          })
        }
        onProfile={() => setSelected(virtualObjects.profile)}
      />
      <ObjectBottomSheet
        object={selected}
        state={game.state}
        onClose={() => setSelected(null)}
        onBuyGenerator={game.buyComputeGenerator}
        onClaimOffline={game.claimOfflineNow}
        onAnswerRepo={game.answerRepo}
        onCompleteAtlasMission={game.completeAtlasMission}
        onReset={() => {
          game.resetProgress();
          setSelected(null);
        }}
        onSimulateOffline={game.simulateOffline}
      />
    </main>
  );
}
