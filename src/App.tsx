import { useMemo, useState } from "react";
import { AppPages, type AppView } from "./components/AppPages";
import { BottomNavigation } from "./components/BottomNavigation";
import { ContextActionBar } from "./components/ContextActionBar";
import { ObjectBottomSheet } from "./components/ObjectBottomSheet";
import { Onboarding } from "./components/Onboarding";
import { ResourceHUD } from "./components/ResourceHUD";
import { RoomScene } from "./components/RoomScene";
import { useGameStore } from "./store/gameStore";
import type { RoomObjectConfig } from "./types/game";
import "./styles/app.css";

export default function App() {
  const game = useGameStore();
  const [view, setView] = useState<AppView>("our-room");
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
      setView("my-room");
      setSelected(null);
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
      {view === "our-room" ? (
        <>
          <RoomScene state={game.state} selectedId={selectedId} scanMode={scanMode} onToggleScan={() => setScanMode((value) => !value)} onObject={setSelected} onCoreClick={handleCoreClick} />
          <ContextActionBar state={game.state} nextAction={game.nextAction} onPrimary={handlePrimary} />
        </>
      ) : (
        <AppPages
          view={view}
          state={game.state}
          onBuild={handleCoreClick}
          onBuyGenerator={game.buyComputeGenerator}
          onBuyDeviceGenerator={game.buyDeviceGenerator}
          onMockSupportMacMini={game.mockSupportMacMini}
          onBuyPerkReward={game.buyPerkReward}
        />
      )}
      <BottomNavigation
        current={view}
        onEcosystem={() => { setView("ecosystem"); setSelected(null); }}
        onParticipate={() => { setView("participate"); setSelected(null); }}
        onOurRoom={() => { setView("our-room"); setSelected(null); }}
        onMyRoom={() => { setView("my-room"); setSelected(null); }}
        onMarket={() => { setView("market"); setSelected(null); }}
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
