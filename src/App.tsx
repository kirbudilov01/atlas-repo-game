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
};

export default function App() {
  const game = useGameStore();
  const [selected, setSelected] = useState<RoomObjectConfig | null>(null);
  const [flash, setFlash] = useState(0);
  const [scanMode, setScanMode] = useState(false);

  const selectedId = selected?.id;

  const handleCoreClick = () => {
    game.clickCore();
    setFlash((value) => value + 1);
  };

  const openAtlas = () => {
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
  };

  const openNetwork = () => {
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
    });
  };

  const openReward = () => {
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
      openAtlas();
      return;
    }
    openReward();
  };

  const appClass = useMemo(() => `app-shell flash-${flash % 2}`, [flash]);

  if (!game.state.onboarded) {
    return <Onboarding onDone={game.completeOnboarding} />;
  }

  return (
    <main className={appClass}>
      <ResourceHUD state={game.state} />
      <RoomScene state={game.state} selectedId={selectedId} scanMode={scanMode} onToggleScan={() => setScanMode((value) => !value)} onObject={setSelected} onCoreClick={handleCoreClick} />
      <ContextActionBar state={game.state} nextAction={game.nextAction} onPrimary={handlePrimary} />
      <BottomNavigation
        onFactory={() => setSelected(virtualObjects.factory)}
        onAtlas={openAtlas}
        onNetwork={openNetwork}
        onProfile={() => setSelected(virtualObjects.profile)}
      />
      <ObjectBottomSheet
        object={selected}
        state={game.state}
        onClose={() => setSelected(null)}
        onBuyGenerator={game.buyComputeGenerator}
        onUpgradeGenerator={game.upgradeComputeGenerator}
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
