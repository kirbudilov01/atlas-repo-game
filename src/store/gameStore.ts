import { useEffect, useMemo, useState } from "react";
import { generatorTypes } from "../config/generators";
import type { MissionRepo, ResourceCode } from "../types/game";

const STORAGE_KEY = "atlas-room-prototype-v1";

export interface GameState {
  onboarded: boolean;
  resources: Record<ResourceCode, number>;
  accountLevel: number;
  coreClicks: number;
  combo: number;
  generatorPurchased: boolean;
  generatorPurchasedAt?: string;
  lastSavedAt: string;
  lastOfflineClaimAt: string;
  atlasMission: {
    status: "locked" | "available" | "running" | "completed" | "claimed";
    answers: Record<string, string>;
    fragmentPreview: boolean;
    rewardPreview: boolean;
  };
  debugMessage?: string;
}

const nowIso = () => new Date().toISOString();

const initialState = (): GameState => ({
  onboarded: false,
  resources: { compute: 0, knowledge: 0, contribution: 0 },
  accountLevel: 1,
  coreClicks: 0,
  combo: 0,
  generatorPurchased: false,
  lastSavedAt: nowIso(),
  lastOfflineClaimAt: nowIso(),
  atlasMission: {
    status: "available",
    answers: {},
    fragmentPreview: false,
    rewardPreview: false
  }
});

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    return { ...initialState(), ...JSON.parse(raw) };
  } catch {
    return initialState();
  }
}

function calculateOfflineCompute(state: GameState): number {
  if (!state.generatorPurchased) return 0;
  const generator = generatorTypes[0];
  const last = new Date(state.lastOfflineClaimAt).getTime();
  const elapsedSeconds = Math.max(0, (Date.now() - last) / 1000);
  const cappedSeconds = Math.min(elapsedSeconds, 2 * 60 * 60);
  return Math.floor((generator.ratePerHour / 3600) * cappedSeconds);
}

export function useGameStore() {
  const [state, setState] = useState<GameState>(() => {
    const loaded = loadState();
    const offline = calculateOfflineCompute(loaded);
    if (offline <= 0) return loaded;
    return {
      ...loaded,
      resources: { ...loaded.resources, compute: loaded.resources.compute + offline },
      lastOfflineClaimAt: nowIso(),
      debugMessage: `Offline income collected: +${offline} Compute`
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastSavedAt: nowIso() }));
  }, [state]);

  const nextAction = useMemo(() => {
    if (!state.generatorPurchased && state.resources.compute < 25) {
      return {
        title: "Power up the room",
        body: `Click Atlas Core ${Math.max(0, 25 - state.resources.compute)} more times to buy the first generator.`,
        cta: "Generate Compute",
        target: "core" as const
      };
    }
    if (!state.generatorPurchased) {
      return {
        title: "Build first node",
        body: "Buy Compute Generator to start passive production.",
        cta: "Buy Generator",
        target: "factory" as const
      };
    }
    if (state.atlasMission.status !== "claimed") {
      return {
        title: "Run AtlasRepo First Scan",
        body: "Turn Compute into Knowledge and Contribution.",
        cta: "Open Atlas",
        target: "atlas" as const
      };
    }
    return {
      title: "View future benefit",
      body: "Atlas Fragment preview unlocked. Real rewards stay prototype-only.",
      cta: "Reward Vault",
      target: "reward" as const
    };
  }, [state]);

  function completeOnboarding() {
    setState((current) => ({ ...current, onboarded: true }));
  }

  function clickCore(multiplier = 1) {
    setState((current) => {
      const combo = current.combo + 1;
      const comboMultiplier = combo >= 50 ? 2 : combo >= 25 ? 1.5 : combo >= 10 ? 1.2 : 1;
      const earned = Math.max(1, Math.floor(multiplier * comboMultiplier));
      return {
        ...current,
        coreClicks: current.coreClicks + 1,
        combo,
        resources: { ...current.resources, compute: current.resources.compute + earned },
        debugMessage: earned > 1 ? `Combo boost: +${earned} Compute` : undefined
      };
    });
    window.setTimeout(() => {
      setState((current) => ({ ...current, combo: Math.max(0, current.combo - 1) }));
    }, 2200);
  }

  function buyComputeGenerator(): boolean {
    let ok = false;
    setState((current) => {
      if (current.generatorPurchased) return current;
      if (current.resources.compute < 25) {
        return { ...current, debugMessage: "Insufficient Compute. Atlas Core is the fastest path." };
      }
      ok = true;
      return {
        ...current,
        generatorPurchased: true,
        generatorPurchasedAt: nowIso(),
        lastOfflineClaimAt: nowIso(),
        resources: { ...current.resources, compute: current.resources.compute - 25 },
        debugMessage: "Compute Generator online. Passive production started."
      };
    });
    return ok;
  }

  function claimOfflineNow() {
    setState((current) => {
      const offline = calculateOfflineCompute(current);
      return {
        ...current,
        resources: { ...current.resources, compute: current.resources.compute + offline },
        lastOfflineClaimAt: nowIso(),
        debugMessage: offline > 0 ? `Collected +${offline} Compute` : "Generator is warming up."
      };
    });
  }

  function answerRepo(repo: MissionRepo, answer: string) {
    setState((current) => ({
      ...current,
      atlasMission: {
        ...current.atlasMission,
        status: "running",
        answers: { ...current.atlasMission.answers, [repo.id]: answer }
      }
    }));
  }

  function completeAtlasMission(): boolean {
    let ok = false;
    setState((current) => {
      const answerCount = Object.keys(current.atlasMission.answers).length;
      if (current.atlasMission.status === "claimed") return current;
      if (answerCount < 3) {
        return { ...current, debugMessage: "Review all 3 repositories before claiming Knowledge." };
      }
      if (current.resources.compute < 30) {
        return { ...current, debugMessage: "Atlas scan needs 30 Compute. Generate a little more." };
      }
      ok = true;
      return {
        ...current,
        accountLevel: Math.max(current.accountLevel, 2),
        resources: {
          compute: current.resources.compute - 30,
          knowledge: current.resources.knowledge + 25,
          contribution: current.resources.contribution + 5
        },
        atlasMission: {
          ...current.atlasMission,
          status: "claimed",
          fragmentPreview: true,
          rewardPreview: true
        },
        debugMessage: "Atlas Fragment preview unlocked. +25 Knowledge, +5 Contribution."
      };
    });
    return ok;
  }

  function simulateOffline() {
    setState((current) => ({
      ...current,
      lastOfflineClaimAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      debugMessage: "Debug: simulated 1 hour away. Tap collect from Factory."
    }));
  }

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState());
  }

  return {
    state,
    nextAction,
    completeOnboarding,
    clickCore,
    buyComputeGenerator,
    claimOfflineNow,
    answerRepo,
    completeAtlasMission,
    simulateOffline,
    resetProgress
  };
}
