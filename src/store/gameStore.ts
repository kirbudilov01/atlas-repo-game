import { useEffect, useMemo, useState } from "react";
import { deviceGenerators } from "../config/deviceGenerators";
import { generatorTypes } from "../config/generators";
import { atlasFirstScanRepos } from "../config/missions";
import { perkShop } from "../config/perks";
import type { MissionRepo, ResourceCode } from "../types/game";

const STORAGE_KEY = "atlas-room-prototype-v1";

export interface GameState {
  onboarded: boolean;
  resources: Record<ResourceCode, number>;
  transactions: ResourceTransaction[];
  contributionEvents: ContributionEvent[];
  supportLedger: SupportLedgerEntry[];
  accountLevel: number;
  coreClicks: number;
  combo: number;
  generatorPurchased: boolean;
  generatorLevel: number;
  purchasedDeviceGeneratorIds: string[];
  purchasedPerkRewardIds: string[];
  purchasedProductActionIds: string[];
  mockSupportUsd: number;
  generatorPurchasedAt?: string;
  lastSavedAt: string;
  lastOfflineClaimAt: string;
  lastOfflineEarned: number;
  atlasMission: {
    status: "locked" | "available" | "running" | "ready" | "claimed";
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

export interface ContributionEvent {
  id: string;
  title: string;
  source: "atlasrepo" | "generator" | "network" | "funding" | "reward";
  amount: number;
  impact: string;
  createdAt: string;
}

export interface SupportLedgerEntry {
  id: string;
  supporterName: string;
  amountUsd: number;
  fbcCoins: number;
  target: string;
  note: string;
  createdAt: string;
  status: "mock" | "pending_wallet" | "confirmed";
}

const nowIso = () => new Date().toISOString();
const transactionId = () => `tx_${Date.now()}_${Math.random().toString(16).slice(2)}`;
const eventId = () => `ce_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const atlasRankThresholds = [0, 5, 15, 35, 75, 140];

const initialState = (): GameState => ({
  onboarded: false,
  resources: { compute: 0, knowledge: 0, contribution: 0, fbc: 0 },
  transactions: [],
  contributionEvents: [],
  supportLedger: [],
  accountLevel: 1,
  coreClicks: 0,
  combo: 0,
  generatorPurchased: false,
  generatorLevel: 0,
  purchasedDeviceGeneratorIds: [],
  purchasedPerkRewardIds: [],
  purchasedProductActionIds: [],
  mockSupportUsd: 0,
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
    const parsed = JSON.parse(raw);
    const initial = initialState();
    return {
      ...initial,
      ...parsed,
      resources: { ...initial.resources, ...parsed.resources },
      atlasMission: { ...initial.atlasMission, ...parsed.atlasMission },
      supportLedger: parsed.supportLedger ?? initial.supportLedger,
      purchasedDeviceGeneratorIds: parsed.purchasedDeviceGeneratorIds ?? initial.purchasedDeviceGeneratorIds,
      purchasedPerkRewardIds: parsed.purchasedPerkRewardIds ?? initial.purchasedPerkRewardIds,
      purchasedProductActionIds: parsed.purchasedProductActionIds ?? initial.purchasedProductActionIds
    };
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

export function getDeviceGeneratorRatePerHour(ids: string[]): number {
  return ids.reduce((sum, id) => {
    const generator = deviceGenerators.find((item) => item.id === id);
    return sum + (generator?.ratePerHour ?? 0);
  }, 0);
}

export function getTotalComputeRatePerHour(state: Pick<GameState, "generatorLevel" | "purchasedDeviceGeneratorIds">): number {
  return getGeneratorRatePerHour(state.generatorLevel) + getDeviceGeneratorRatePerHour(state.purchasedDeviceGeneratorIds);
}

export function getAtlasRank(contribution: number): number {
  let rank = 1;
  atlasRankThresholds.forEach((threshold, index) => {
    if (contribution >= threshold) rank = index + 1;
  });
  return rank;
}

export function getAtlasRankProgress(contribution: number) {
  const rank = getAtlasRank(contribution);
  const currentThreshold = atlasRankThresholds[rank - 1] ?? 0;
  const nextThreshold = atlasRankThresholds[rank] ?? currentThreshold;
  const span = Math.max(1, nextThreshold - currentThreshold);
  const earned = Math.max(0, contribution - currentThreshold);
  return {
    rank,
    currentThreshold,
    nextThreshold,
    percent: nextThreshold === currentThreshold ? 100 : Math.min(100, Math.floor((earned / span) * 100)),
    remaining: Math.max(0, nextThreshold - contribution)
  };
}

function calculateOfflineCompute(state: GameState): number {
  if (!state.generatorPurchased && state.purchasedDeviceGeneratorIds.length === 0) return 0;
  const last = new Date(state.lastOfflineClaimAt).getTime();
  const elapsedSeconds = Math.max(0, (Date.now() - last) / 1000);
  const cappedSeconds = Math.min(elapsedSeconds, 2 * 60 * 60);
  return Math.floor((getTotalComputeRatePerHour(state) / 3600) * cappedSeconds);
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

function contributionEvent(title: string, amount: number, impact: string): ContributionEvent {
  return {
    id: eventId(),
    title,
    source: "atlasrepo",
    amount,
    impact,
    createdAt: nowIso()
  };
}

function supportLedgerEntry(amountUsd: number): SupportLedgerEntry {
  return {
    id: eventId(),
    supporterName: "Telegram supporter",
    amountUsd,
    fbcCoins: amountUsd,
    target: "Mac mini render node",
    note: "Mock wallet support recorded. FBC Coins are support credits only until real utility/emission is designed.",
    createdAt: nowIso(),
    status: "mock"
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
        title: "Build the ecosystem",
        body: `Tap the room ${Math.max(0, 25 - state.resources.compute)} more times to open your first business generator.`,
        cta: "Build Ecosystem",
        target: "core" as const
      };
    }
    if (!state.generatorPurchased) {
      return {
        title: "Open your room",
        body: "Buy the first generator and start earning idle room points.",
        cta: "Open My Room",
        target: "factory" as const
      };
    }
    if (state.atlasMission.status !== "claimed") {
      const answerCount = Object.keys(state.atlasMission.answers).length;
      return {
        title: answerCount >= 3 ? "Claim AtlasRepo signal" : "Run AtlasRepo First Scan",
        body: answerCount >= 3 ? "Spend Compute to mint Knowledge and Contribution history." : "Review 3 repositories to unlock the first Atlas Fragment.",
        cta: answerCount >= 3 ? "Claim Scan" : "Open Atlas",
        target: "atlas" as const
      };
    }
    return {
      title: "Spend your game credits",
      body: "Atlas Fragment preview unlocked. Market perks stay prototype-only.",
      cta: "Open Market",
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
        status: Object.keys({ ...current.atlasMission.answers, [repo.id]: answer }).length >= 3 ? "ready" : "running",
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
      const correctCount = Object.entries(current.atlasMission.answers).filter(([repoId, answer]) => {
        const repo = atlasFirstScanRepos.find((item) => item.id === repoId);
        return repo?.correct === answer;
      }).length;
      const contributionGain = 5 + correctCount;
      const knowledgeGain = 25 + correctCount * 3;
      const newContribution = current.resources.contribution + contributionGain;
      const newRank = getAtlasRank(newContribution);
      return {
        ...current,
        accountLevel: Math.max(current.accountLevel, newRank),
        resources: {
          compute: current.resources.compute - 30,
          knowledge: current.resources.knowledge + knowledgeGain,
          contribution: newContribution,
          fbc: current.resources.fbc
        },
        atlasMission: {
          ...current.atlasMission,
          status: "claimed",
          fragmentPreview: true,
          rewardPreview: true
        },
        transactions: [
          tx("compute", -30, "atlas_first_scan_cost"),
          tx("knowledge", knowledgeGain, "atlas_first_scan_reward"),
          tx("contribution", contributionGain, "atlas_first_scan_contribution"),
          ...current.transactions
        ].slice(0, 30),
        contributionEvents: [
          contributionEvent(
            "AtlasRepo First Scan",
            contributionGain,
            `${correctCount}/3 repo signals matched. Rank ${newRank} progress updated.`
          ),
          ...current.contributionEvents
        ].slice(0, 20),
        debugMessage: `Atlas Fragment preview unlocked. +${knowledgeGain} Knowledge, +${contributionGain} Contribution.`
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

  function buyDeviceGenerator(generatorId: string): boolean {
    let ok = false;
    setState((current) => {
      const generator = deviceGenerators.find((item) => item.id === generatorId);
      if (!generator) return current;
      if (current.purchasedDeviceGeneratorIds.includes(generatorId)) {
        return { ...current, debugMessage: `${generator.name} is already producing Compute.` };
      }
      if (current.resources.compute < generator.costCompute) {
        return { ...current, debugMessage: `Need ${generator.costCompute - current.resources.compute} more Compute for ${generator.name}.` };
      }
      ok = true;
      return {
        ...current,
        purchasedDeviceGeneratorIds: [...current.purchasedDeviceGeneratorIds, generatorId],
        resources: { ...current.resources, compute: current.resources.compute - generator.costCompute },
        transactions: [
          tx("compute", -generator.costCompute, `buy_${generatorId}`),
          ...current.transactions
        ].slice(0, 30),
        debugMessage: `${generator.name} purchased. +${generator.ratePerHour} Compute/hr.`
      };
    });
    return ok;
  }

  function mockSupportMacMini(): boolean {
    let ok = false;
    setState((current) => {
      if (current.mockSupportUsd >= 1000) {
        return { ...current, debugMessage: "Mac mini support preview is already registered." };
      }
      ok = true;
      const entry = supportLedgerEntry(1000);
      return {
        ...current,
        mockSupportUsd: current.mockSupportUsd + 1000,
        resources: { ...current.resources, fbc: current.resources.fbc + 1000 },
        supportLedger: [
          entry,
          ...current.supportLedger
        ].slice(0, 30),
        contributionEvents: [
          {
            id: eventId(),
            title: "Support Ledger Entry",
            source: "funding" as const,
            amount: 1000,
            impact: `${entry.supporterName} added ${entry.fbcCoins} FBC Coins toward ${entry.target}.`,
            createdAt: nowIso()
          },
          ...current.contributionEvents
        ].slice(0, 20),
        transactions: [
          tx("fbc", 1000, "mock_mac_mini_support_fbc"),
          ...current.transactions
        ].slice(0, 30),
        debugMessage: "Mock support registered: +1000 FBC. No real payment, token, equity or return."
      };
    });
    return ok;
  }

  function buyPerkReward(perkId: string): boolean {
    let ok = false;
    setState((current) => {
      const perk = perkShop.find((item) => item.id === perkId);
      if (!perk) return current;
      if (current.purchasedPerkRewardIds.includes(perkId)) {
        return { ...current, debugMessage: `${perk.title} is already reserved in prototype mode.` };
      }
      if (current.resources[perk.costResource] < perk.costAmount) {
        return { ...current, debugMessage: `Need ${perk.costAmount - current.resources[perk.costResource]} more ${perk.costResource.toUpperCase()} for ${perk.title}.` };
      }
      ok = true;
      return {
        ...current,
        purchasedPerkRewardIds: [...current.purchasedPerkRewardIds, perkId],
        resources: {
          ...current.resources,
          [perk.costResource]: current.resources[perk.costResource] - perk.costAmount
        },
        transactions: [
          tx(perk.costResource, -perk.costAmount, `reserve_${perkId}`),
          ...current.transactions
        ].slice(0, 30),
        debugMessage: `${perk.title} reserved locally. Prototype only: no real access or token claim.`
      };
    });
    return ok;
  }

  function buyProductAction(actionId: string, costCompute: number, title: string): boolean {
    let ok = false;
    setState((current) => {
      if (current.purchasedProductActionIds.includes(actionId)) {
        return { ...current, debugMessage: `${title} is already reserved inside My Room.` };
      }
      if (current.resources.compute < costCompute) {
        return { ...current, debugMessage: `Need ${costCompute - current.resources.compute} more BP for ${title}.` };
      }
      ok = true;
      return {
        ...current,
        purchasedProductActionIds: [...current.purchasedProductActionIds, actionId],
        resources: { ...current.resources, compute: current.resources.compute - costCompute },
        transactions: [
          tx("compute", -costCompute, `product_action_${actionId}`),
          ...current.transactions
        ].slice(0, 30),
        contributionEvents: [
          {
            ...contributionEvent(title, 1, "Product action reserved from My Room points."),
            source: "reward" as const
          },
          ...current.contributionEvents
        ].slice(0, 24),
        debugMessage: `${title} reserved. Prototype action: this will connect to product integrations later.`
      };
    });
    return ok;
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
    buyDeviceGenerator,
    mockSupportMacMini,
    buyPerkReward,
    buyProductAction,
    claimOfflineNow,
    answerRepo,
    completeAtlasMission,
    simulateOffline,
    resetProgress
  };
}
