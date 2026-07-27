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
  ecosystem: {
    id: "asset-index",
    type: "terminal",
    label: "FabricBot Ecosystem",
    subtitle: "AtlasRepo · Want2View · Payment Bot",
    visualId: "asset-index",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "atlas"
  },
  participate: {
    id: "funding-hub",
    type: "terminal",
    label: "Participate",
    subtitle: "Support runway",
    visualId: "funding-hub",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "funding"
  },
  myRoom: {
    id: "factory-panel",
    type: "generator",
    label: "My Room",
    subtitle: "Personal clicker",
    visualId: "factory",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "compute"
  },
  market: {
    id: "reward-vault",
    type: "reward",
    label: "Market",
    subtitle: "Perks and access",
    visualId: "reward-vault",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0,
    accent: "funding"
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
      setSelected(virtualObjects.myRoom);
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
        current={selected?.id === "asset-index" ? "ecosystem" : selected?.id === "funding-hub" ? "participate" : selected?.id === "factory-panel" ? "my-room" : selected?.id === "reward-vault" ? "market" : "our-room"}
        onEcosystem={() => setSelected(virtualObjects.ecosystem)}
        onParticipate={() => setSelected(virtualObjects.participate)}
        onOurRoom={() => setSelected(null)}
        onMyRoom={() => setSelected(virtualObjects.myRoom)}
        onMarket={() => setSelected(virtualObjects.market)}
      />
      <ObjectBottomSheet
        object={selected}
        state={game.state}
        onClose={() => setSelected(null)}
        onBuyGenerator={game.buyComputeGenerator}
        onUpgradeGenerator={game.upgradeComputeGenerator}
        onBuyDeviceGenerator={game.buyDeviceGenerator}
        onMockSupportMacMini={game.mockSupportMacMini}
        onBuyPerkReward={game.buyPerkReward}
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
