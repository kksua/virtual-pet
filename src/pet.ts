export const PET_VITAL_MIN = 0;
export const PET_VITAL_MAX = 100;
export const TICK_INTERVAL_MS = 18000;
export const EVOLUTION_STREAK_TARGET = 3;
export const RECOVERY_STREAK_TARGET = 2;
export const SICK_CRITICAL_THRESHOLD = 15;
export const SICK_MULTI_LOW_THRESHOLD = 30;
export const RECOVERY_THRESHOLD = 48;
export const THRIVING_THRESHOLD = 82;
export const VITAL_WARNING_THRESHOLD = 35;
export const VITAL_HEALTHY_THRESHOLD = 65;

export type PetStatus = "normal" | "sick" | "evolved";
export type PetAction = "feed" | "play" | "rest";
export type PetActionCounts = Record<PetAction, number>;
export type VitalMood = "critical" | "warning" | "steady" | "thriving";

export type PetVitals = {
  hunger: number;
  happiness: number;
  energy: number;
};

export type Pet = {
  name: string;
  vitals: PetVitals;
  status: PetStatus;
  recoveryStreak: number;
  thrivingStreak: number;
  actionCounts: PetActionCounts;
  tickCount: number;
};

export const TICK_DECAY: PetVitals = {
  hunger: -4,
  happiness: -3,
  energy: -3,
};

export const ACTION_EFFECTS: Record<PetAction, PetVitals> = {
  feed: {
    hunger: 16,
    happiness: 3,
    energy: -1,
  },
  play: {
    hunger: -5,
    happiness: 14,
    energy: -8,
  },
  rest: {
    hunger: -2,
    happiness: 4,
    energy: 18,
  },
};

export const STATUS_COPY: Record<
  PetStatus,
  {
    badge: string;
    summary: string;
    detail: string;
  }
> = {
  normal: {
    badge: "Normal",
    summary: "Your pet is doing well.",
    detail: "Keep the vitals steady to avoid sickness and build toward evolution.",
  },
  sick: {
    badge: "Sick",
    summary: "Your pet needs careful support.",
    detail:
      "Raise every vital above 48 for two checks in a row to recover fully.",
  },
  evolved: {
    badge: "Evolved",
    summary: "Your pet has evolved through attentive care.",
    detail:
      "The evolved state stays active unless neglect pushes the pet back into sickness.",
  },
};

export function createPet(name = "Nova"): Pet {
  return {
    name,
    vitals: {
      hunger: 72,
      happiness: 68,
      energy: 76,
    },
    status: "normal",
    recoveryStreak: 0,
    thrivingStreak: 0,
    actionCounts: {
      feed: 0,
      play: 0,
      rest: 0,
    },
    tickCount: 0,
  };
}

export function renamePet(pet: Pet, nextName: string): Pet {
  const trimmedName = nextName.trim();

  if (!trimmedName) {
    return pet;
  }

  return {
    ...pet,
    name: trimmedName,
  };
}

export function tickPet(pet: Pet): Pet {
  const updatedPet = updatePet(pet, TICK_DECAY);

  return {
    ...updatedPet,
    tickCount: updatedPet.tickCount + 1,
  };
}

export function applyPetAction(pet: Pet, action: PetAction): Pet {
  const updatedPet = updatePet(pet, ACTION_EFFECTS[action]);

  return {
    ...updatedPet,
    actionCounts: {
      ...updatedPet.actionCounts,
      [action]: updatedPet.actionCounts[action] + 1,
    },
  };
}

export function clampVital(value: number): number {
  return Math.min(PET_VITAL_MAX, Math.max(PET_VITAL_MIN, value));
}

export function getVitalsEntries(vitals: PetVitals) {
  return Object.entries(vitals) as Array<[keyof PetVitals, number]>;
}

export function getVitalMood(value: number): VitalMood {
  if (value <= SICK_CRITICAL_THRESHOLD) {
    return "critical";
  }

  if (value < VITAL_WARNING_THRESHOLD) {
    return "warning";
  }

  if (value >= THRIVING_THRESHOLD) {
    return "thriving";
  }

  if (value >= VITAL_HEALTHY_THRESHOLD) {
    return "steady";
  }

  return "warning";
}

export function isValidPetActionCounts(
  value: unknown,
): value is PetActionCounts {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.feed === "number" &&
    Number.isFinite(candidate.feed) &&
    typeof candidate.play === "number" &&
    Number.isFinite(candidate.play) &&
    typeof candidate.rest === "number" &&
    Number.isFinite(candidate.rest)
  );
}

export function isValidPetStatus(value: unknown): value is PetStatus {
  return value === "normal" || value === "sick" || value === "evolved";
}

export function isValidPetVitals(value: unknown): value is PetVitals {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.hunger === "number" &&
    Number.isFinite(candidate.hunger) &&
    typeof candidate.happiness === "number" &&
    Number.isFinite(candidate.happiness) &&
    typeof candidate.energy === "number" &&
    Number.isFinite(candidate.energy)
  );
}

function updatePet(pet: Pet, delta: PetVitals): Pet {
  const nextVitals = applyVitalsDelta(pet.vitals, delta);
  const nextStatusState = resolvePetState(pet, nextVitals);

  return {
    ...pet,
    vitals: nextVitals,
    ...nextStatusState,
  };
}

function applyVitalsDelta(vitals: PetVitals, delta: PetVitals): PetVitals {
  return {
    hunger: clampVital(vitals.hunger + delta.hunger),
    happiness: clampVital(vitals.happiness + delta.happiness),
    energy: clampVital(vitals.energy + delta.energy),
  };
}

function resolvePetState(
  previousPet: Pet,
  nextVitals: PetVitals,
): Pick<Pet, "status" | "recoveryStreak" | "thrivingStreak"> {
  if (isSickCondition(nextVitals)) {
    return {
      status: "sick",
      recoveryStreak: 0,
      thrivingStreak: 0,
    };
  }

  if (previousPet.status === "sick") {
    const nextRecoveryStreak = isRecoveryReady(nextVitals)
      ? previousPet.recoveryStreak + 1
      : 0;

    if (nextRecoveryStreak >= RECOVERY_STREAK_TARGET) {
      return {
        status: "normal",
        recoveryStreak: 0,
        thrivingStreak: isThriving(nextVitals) ? 1 : 0,
      };
    }

    return {
      status: "sick",
      recoveryStreak: nextRecoveryStreak,
      thrivingStreak: 0,
    };
  }

  const nextThrivingStreak = isThriving(nextVitals)
    ? previousPet.thrivingStreak + 1
    : 0;

  if (
    previousPet.status === "evolved" ||
    nextThrivingStreak >= EVOLUTION_STREAK_TARGET
  ) {
    return {
      status: "evolved",
      recoveryStreak: 0,
      thrivingStreak: nextThrivingStreak,
    };
  }

  return {
    status: "normal",
    recoveryStreak: 0,
    thrivingStreak: nextThrivingStreak,
  };
}

function isSickCondition(vitals: PetVitals): boolean {
  const vitalValues = Object.values(vitals);
  const criticallyLowVital = vitalValues.some(
    (value) => value <= SICK_CRITICAL_THRESHOLD,
  );
  const lowVitals =
    vitalValues.filter((value) => value < SICK_MULTI_LOW_THRESHOLD).length >= 2;

  return criticallyLowVital || lowVitals;
}

function isRecoveryReady(vitals: PetVitals): boolean {
  return Object.values(vitals).every((value) => value >= RECOVERY_THRESHOLD);
}

function isThriving(vitals: PetVitals): boolean {
  return Object.values(vitals).every((value) => value >= THRIVING_THRESHOLD);
}
