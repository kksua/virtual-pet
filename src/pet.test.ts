// @vitest-environment node

import { describe, expect, it } from "vitest";

import {
  ACTION_EFFECTS,
  EVOLUTION_STREAK_TARGET,
  RECOVERY_STREAK_TARGET,
  applyPetAction,
  clampVital,
  createPet,
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

    expect(tickPet(pet).vitals).toEqual({
      hunger: 75,
      happiness: 70,
      energy: 60,
    });
  });

  it("applies the correct feed effects", () => {
    const pet = createPetWithVitals({
      hunger: 60,
      happiness: 52,
      energy: 55,
    });

    expect(applyPetAction(pet, "feed").vitals).toEqual({
      hunger: 78,
      happiness: 56,
      energy: 53,
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

  it("recovers the pet after enough healthy checks", () => {
    const sickPet = createPetWithVitals(
      {
        hunger: 52,
        happiness: 50,
        energy: 58,
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

  it("evolves the pet after sustained strong care", () => {
    const thrivingPet = createPetWithVitals(
      {
        hunger: 82,
        happiness: 86,
        energy: 84,
      },
      {
        status: "normal",
        thrivingStreak: EVOLUTION_STREAK_TARGET - 1,
        recoveryStreak: 0,
      },
    );

    const evolvedPet = applyPetAction(thrivingPet, "rest");

    expect(evolvedPet.status).toBe("evolved");
    expect(evolvedPet.thrivingStreak).toBe(EVOLUTION_STREAK_TARGET);
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
});
