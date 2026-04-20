// @vitest-environment node

import { describe, expect, it } from "vitest";

import { createPet } from "./pet";
import {
  PET_STORAGE_KEY,
  loadStoredPet,
  saveStoredPet,
  type StorageLike,
} from "./storage";

function createMemoryStorage(seed?: Record<string, string>): StorageLike {
  const data = new Map(Object.entries(seed ?? {}));

  return {
    getItem(key) {
      return data.has(key) ? data.get(key) ?? null : null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
  };
}

describe("pet storage", () => {
  it("returns a default pet when storage is empty", () => {
    const result = loadStoredPet(createMemoryStorage());

    expect(result.source).toBe("default");
    expect(result.pet.name).toBe("Nova");
  });

  it("saves and restores a valid pet", () => {
    const storage = createMemoryStorage();
    const pet = {
      ...createPet("Mochi"),
      status: "evolved" as const,
      thrivingStreak: 3,
    };

    saveStoredPet(storage, pet);
    const result = loadStoredPet(storage);

    expect(result.source).toBe("storage");
    expect(result.pet.name).toBe("Mochi");
    expect(result.pet.status).toBe("evolved");
  });

  it("falls back safely when saved data is malformed", () => {
    const storage = createMemoryStorage({
      [PET_STORAGE_KEY]: '{"bad":"data"}',
    });

    const result = loadStoredPet(storage);

    expect(result.source).toBe("invalid");
    expect(result.pet.name).toBe("Nova");
  });
});
