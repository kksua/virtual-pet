// @vitest-environment node

import { describe, expect, it } from "vitest";

import { applyPetAction, createPet } from "./pet";
import { getPetReaction } from "./reactions";

describe("pet reactions", () => {
  it("returns a restore reaction for saved pets", () => {
    const pet = createPet("Mochi");

    expect(getPetReaction(pet, { type: "load", source: "storage" })).toContain(
      "save",
    );
  });

  it("surfaces a feed easter egg after repeated feeding", () => {
    let pet = createPet("Mochi");

    for (let count = 0; count < 5; count += 1) {
      pet = applyPetAction(pet, "feed");
    }

    expect(getPetReaction(pet, { type: "action", action: "feed" })).toContain(
      "🍓",
    );
  });

  it("uses supportive recovery language for sick care actions", () => {
    const sickPet = {
      ...createPet("Mochi"),
      status: "sick" as const,
    };

    expect(
      getPetReaction(sickPet, { type: "action", action: "rest" }),
    ).toMatch(/helped|gentle|progress/i);
  });

  it("gives short tap reactions based on the pet's current need", () => {
    const hungryPet = {
      ...createPet("Mochi"),
      vitals: {
        hunger: 18,
        happiness: 70,
        energy: 74,
      },
    };

    expect(
      getPetReaction(hungryPet, { type: "petTap", count: 1 }),
    ).toMatch(/snack|hungy|feed me/i);
  });
});
