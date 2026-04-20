import {
  clampVital,
  createPet,
  isValidPetActionCounts,
  isValidPetStatus,
  isValidPetVitals,
  type Pet,
} from "./pet";

export const PET_STORAGE_KEY = "virtual-pet.pet.v1";

export type StorageLoadSource = "default" | "storage" | "invalid";

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export type LoadStoredPetResult = {
  pet: Pet;
  source: StorageLoadSource;
};

type PersistedPetShape = {
  name: string;
  vitals: {
    hunger: number;
    happiness: number;
    energy: number;
  };
  status: Pet["status"];
  recoveryStreak: number;
  thrivingStreak: number;
  actionCounts: Pet["actionCounts"];
  tickCount: number;
};

export function loadStoredPet(
  storage: StorageLike | undefined,
): LoadStoredPetResult {
  const fallbackPet = createPet();

  if (!storage) {
    return {
      pet: fallbackPet,
      source: "default",
    };
  }

  try {
    const rawPet = storage.getItem(PET_STORAGE_KEY);

    if (!rawPet) {
      return {
        pet: fallbackPet,
        source: "default",
      };
    }

    const parsedPet = JSON.parse(rawPet) as unknown;
    const pet = parseStoredPet(parsedPet);

    if (!pet) {
      return {
        pet: fallbackPet,
        source: "invalid",
      };
    }

    return {
      pet,
      source: "storage",
    };
  } catch {
    return {
      pet: fallbackPet,
      source: "invalid",
    };
  }
}

export function saveStoredPet(
  storage: StorageLike | undefined,
  pet: Pet,
): void {
  if (!storage) {
    return;
  }

  const persistedPet: PersistedPetShape = {
    name: pet.name,
    vitals: {
      hunger: clampVital(pet.vitals.hunger),
      happiness: clampVital(pet.vitals.happiness),
      energy: clampVital(pet.vitals.energy),
    },
    status: pet.status,
    recoveryStreak: Math.max(0, pet.recoveryStreak),
    thrivingStreak: Math.max(0, pet.thrivingStreak),
    actionCounts: {
      feed: Math.max(0, pet.actionCounts.feed),
      play: Math.max(0, pet.actionCounts.play),
      rest: Math.max(0, pet.actionCounts.rest),
    },
    tickCount: Math.max(0, pet.tickCount),
  };

  try {
    storage.setItem(PET_STORAGE_KEY, JSON.stringify(persistedPet));
  } catch {
    // Ignore storage failures so the pet loop stays playable even if persistence is blocked.
  }
}

function parseStoredPet(value: unknown): Pet | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;

  if (
    typeof candidate.name !== "string" ||
    !isValidPetVitals(candidate.vitals) ||
    !isValidPetStatus(candidate.status) ||
    typeof candidate.recoveryStreak !== "number" ||
    !Number.isFinite(candidate.recoveryStreak) ||
    typeof candidate.thrivingStreak !== "number" ||
    !Number.isFinite(candidate.thrivingStreak) ||
    !isValidPetActionCounts(candidate.actionCounts)
  ) {
    return null;
  }

  return {
    name: candidate.name.trim() || "Nova",
    vitals: {
      hunger: clampVital(candidate.vitals.hunger),
      happiness: clampVital(candidate.vitals.happiness),
      energy: clampVital(candidate.vitals.energy),
    },
    status: candidate.status,
    recoveryStreak: Math.max(0, candidate.recoveryStreak),
    thrivingStreak: Math.max(0, candidate.thrivingStreak),
    actionCounts: {
      feed: Math.max(0, candidate.actionCounts.feed),
      play: Math.max(0, candidate.actionCounts.play),
      rest: Math.max(0, candidate.actionCounts.rest),
    },
    tickCount:
      typeof candidate.tickCount === "number" && Number.isFinite(candidate.tickCount)
        ? Math.max(0, candidate.tickCount)
        : 0,
  };
}
