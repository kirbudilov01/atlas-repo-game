import { useEffect, useMemo, useState } from "react";
import { generatorTypes } from "../config/generators";
import type { MissionRepo, ResourceCode } from "../types/game";

const STORAGE_KEY = "atlas-room-prototype-v1";

export interface GameState {
  onboarded: boolean;
  resources: Record<ResourceCode, number>;
  transactions: ResourceTransaction[];
  accountLevel: number;
  coreClicks: number;
  combo: number;
  generatorPurchased: boolean;
  generatorLevel: number;
  generatorPurchasedAt?: string;
  lastSavedAt: string;
  lastOfflineClaimAt: string;
  lastOfflineEarned: number;
  atlasMission: {
    status: "locked" | "available" | "running" | "completed" | "claimed";
    answers: Record<string, string>;
    fragmentPreview: boolean;
    rewardPreview: boolean;
  };
  debugMessage?: string;
}

export interface ResourceTransaction {
  id: string;
  resource: ResourceCode;
  amount: number;
  reason: string;
  createdAt: string;
}

const nowIso = () => new Date().toISOString();
const transactionId = () => `tx_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const initialState = (): GameState => ({
  onboarded: false,
  resources: { compute: 0, knowledge: 0, contribution: 0 },
  transactions: [],
  accountLevel: 1,
  coreClicks: 0,
  combo: 0,
  generatorPurchased: false,
  generatorLevel: 0,
  lastSavedAt: nowIso(),
  lastOfflineClaimAt: nowIso(),
  lastOfflineEarned: 0,
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

export function getGeneratorUpgradeCost(level: number): number {
  if (level <= 0) return generatorTypes[0].costCompute;
  return Math.floor(generatorTypes[0].costCompute * Math.pow(1.18, level) + level * 12);
}

export function getGeneratorRatePerHour(level: number): number {
  if (level <= 0) return 0;
  return Math.floor(generatorTypes[0].ratePerHour * (1 + (level - 1) * 0.18));
}

function calculateOfflineCompute(state: GameState): number {
  if (!state.generatorPurchased) return 0;
  const last = new Date(state.lastOfflineClaimAt).getTime();
  const elapsedSeconds = Math.max(0, (Date.now() - last) / 1000);
  const cappedSeconds = Math.min(elapsedSeconds, 2 * 60 * 60);
  return Math.floor((getGeneratorRatePerHour(state.generatorLevel) / 3600) * cappedSeconds);
}

function tx(resource: ResourceCode, amount: number, reason: string): ResourceTransaction {
  return {
    id: transactionId(),
    resource,
    amount,
    reason,
    createdAt: nowIso()
  };
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
      lastOfflineEarned: offline,
      transactions: [
        tx("compute", offline, "offline_income"),
        ...loaded.transactions
      ].slice(0, 30),
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
        transactions: [
          tx("compute", earned, combo >= 10 ? "atlas_core_combo" : "atlas_core_click"),
          ...current.transactions
        ].slice(0, 30),
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
        generatorLevel: 1,
        generatorPurchasedAt: nowIso(),
        lastOfflineClaimAt: nowIso(),
        resources: { ...current.resources, compute: current.resources.compute - 25 },
        transactions: [
          tx("compute", -25, "buy_compute_generator"),
          ...current.transactions
        ].slice(0, 30),
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
        lastOfflineEarned: offline,
        transactions: offline > 0
          ? [
              tx("compute", offline, "offline_income_claim"),
              ...current.transactions
            ].slice(0, 30)
          : current.transactions,
        debugMessage: offline > 0 ? `Collected +${offline} Compute` : "Generator is warming up."
      };
    });
  }

  function upgradeComputeGenerator(): boolean {
    let ok = false;
    setState((current) => {
      if (!current.generatorPurchased) {
        return { ...current, debugMessage: "Buy the Compute Generator first." };
      }
      const cost = getGeneratorUpgradeCost(current.generatorLevel);
      if (current.resources.compute < cost) {
        return { ...current, debugMessage: `Need ${cost - current.resources.compute} more Compute for generator upgrade.` };
      }
      ok = true;
      return {
        ...current,
        generatorLevel: current.generatorLevel + 1,
        resources: { ...current.resources, compute: current.resources.compute - cost },
        transactions: [
          tx("compute", -cost, `upgrade_compute_generator_l${current.generatorLevel + 1}`),
          ...current.transactions
        ].slice(0, 30),
        debugMessage: `Compute Generator upgraded to Level ${current.generatorLevel + 1}.`
      };
    });
    return ok;
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
        transactions: [
          tx("compute", -30, "atlas_first_scan_cost"),
          tx("knowledge", 25, "atlas_first_scan_reward"),
          tx("contribution", 5, "atlas_first_scan_contribution"),
          ...current.transactions
        ].slice(0, 30),
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
    upgradeComputeGenerator,
    claimOfflineNow,
    answerRepo,
    completeAtlasMission,
    simulateOffline,
    resetProgress
  };
}
