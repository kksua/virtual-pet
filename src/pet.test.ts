// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  ACTION_EFFECTS,
  EVOLUTION_STREAK_TARGET,
  RECOVERY_STREAK_TARGET,
  RECOVERY_THRESHOLD,
  SICK_CRITICAL_THRESHOLD,
  THRIVING_THRESHOLD,
  applyPetAction,
  clampVital,
  createPet,
  getVitalMood,
  renamePet,
  tickPet,
  type Pet,
} from "./pet";

function createPetWithVitals(vitals: Pet["vitals"], overrides?: Partial<Pet>): Pet {
  return {
    ...createPet("Tester"),
    vitals,
    ...overrides,
  };
}

describe("pet loop logic", () => {
  it("clamps vitals inside the valid range", () => {
    expect(clampVital(-20)).toBe(0);
    expect(clampVital(36)).toBe(36);
    expect(clampVital(140)).toBe(100);
  });

  it("ticks vitals down over time", () => {
    const pet = createPetWithVitals({
      hunger: 80,
      happiness: 74,
      energy: 63,
    });

    const tickedPet = tickPet(pet);

    expect(tickedPet.vitals).toEqual({
      hunger: 76,
      happiness: 71,
      energy: 60,
    });
    expect(tickedPet.tickCount).toBe(1);
  });

  it("applies the correct feed effects", () => {
    const pet = createPetWithVitals({
      hunger: 60,
      happiness: 52,
      energy: 55,
    });

    expect(applyPetAction(pet, "feed").vitals).toEqual({
      hunger: 76,
      happiness: 55,
      energy: 54,
    });
    expect(ACTION_EFFECTS.feed.hunger).toBeGreaterThan(0);
    expect(applyPetAction(pet, "feed").actionCounts.feed).toBe(1);
  });

  it("turns the pet sick when neglect drops vitals too low", () => {
    const pet = createPetWithVitals({
      hunger: 27,
      happiness: 29,
      energy: 70,
    });

    expect(tickPet(pet).status).toBe("sick");
  });

  it("turns the pet sick at the exact critical threshold", () => {
    const pet = createPetWithVitals({
      hunger: SICK_CRITICAL_THRESHOLD,
      happiness: 64,
      energy: 70,
    });

    expect(tickPet(pet).status).toBe("sick");
  });

  it("recovers the pet after enough healthy checks", () => {
    const sickPet = createPetWithVitals(
      {
        hunger: RECOVERY_THRESHOLD,
        happiness: RECOVERY_THRESHOLD,
        energy: RECOVERY_THRESHOLD + 6,
      },
      {
        status: "sick",
        recoveryStreak: RECOVERY_STREAK_TARGET - 1,
        thrivingStreak: 0,
      },
    );

    const recoveredPet = applyPetAction(sickPet, "feed");

    expect(recoveredPet.status).toBe("normal");
    expect(recoveredPet.recoveryStreak).toBe(0);
  });

  it("stays sick when recovery is still below the tuned threshold", () => {
    const sickPet = createPetWithVitals(
      {
        hunger: RECOVERY_THRESHOLD - 1,
        happiness: RECOVERY_THRESHOLD + 2,
        energy: RECOVERY_THRESHOLD + 5,
      },
      {
        status: "sick",
        recoveryStreak: RECOVERY_STREAK_TARGET - 1,
      },
    );

    expect(applyPetAction(sickPet, "play").status).toBe("sick");
  });

  it("evolves the pet after sustained strong care", () => {
    const thrivingPet = createPetWithVitals(
      {
        hunger: THRIVING_THRESHOLD,
        happiness: THRIVING_THRESHOLD + 4,
        energy: THRIVING_THRESHOLD + 2,
      },
      {
        status: "normal",
        thrivingStreak: EVOLUTION_STREAK_TARGET - 1,
        recoveryStreak: 0,
      },
    );

    const evolvedPet = applyPetAction(thrivingPet, "feed");

    expect(evolvedPet.status).toBe("evolved");
    expect(evolvedPet.thrivingStreak).toBe(EVOLUTION_STREAK_TARGET);
  });

  it("does not evolve when thriving values have not reached the tuned threshold", () => {
    const almostThrivingPet = createPetWithVitals(
      {
        hunger: THRIVING_THRESHOLD - 1,
        happiness: THRIVING_THRESHOLD + 2,
        energy: THRIVING_THRESHOLD + 3,
      },
      {
        status: "normal",
        thrivingStreak: EVOLUTION_STREAK_TARGET - 1,
      },
    );

    expect(applyPetAction(almostThrivingPet, "feed").status).toBe("normal");
  });

  it("keeps the evolved pet within stat bounds after actions", () => {
    const pet = createPetWithVitals(
      {
        hunger: 99,
        happiness: 94,
        energy: 96,
      },
      {
        status: "evolved",
        thrivingStreak: EVOLUTION_STREAK_TARGET,
      },
    );

    expect(applyPetAction(pet, "feed").vitals).toEqual({
      hunger: 100,
      happiness: 98,
      energy: 94,
    });
  });

  it("renames the pet only when a non-empty name is provided", () => {
    const pet = createPet("Nova");

    expect(renamePet(pet, "Mochi").name).toBe("Mochi");
    expect(renamePet(pet, "   ").name).toBe("Nova");
  });

  it("classifies vital moods for UI feedback", () => {
    expect(getVitalMood(10)).toBe("critical");
    expect(getVitalMood(28)).toBe("warning");
    expect(getVitalMood(68)).toBe("steady");
    expect(getVitalMood(90)).toBe("thriving");
  });
});
