// @vitest-environment node

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PetCharacter } from "./PetCharacter";

describe("PetCharacter", () => {
  it("exposes a readable accessibility label for each stage", () => {
    const normal = renderToStaticMarkup(
      <PetCharacter
        status="normal"
        name="Nova"
        reaction="Ready to play."
      />,
    );
    const sick = renderToStaticMarkup(
      <PetCharacter
        status="sick"
        name="Nova"
        reaction="I feel wobbly."
      />,
    );
    const evolved = renderToStaticMarkup(
      <PetCharacter
        status="evolved"
        name="Nova"
        reaction="I feel unstoppable."
      />,
    );

    expect(normal).toContain('aria-label="Nova looking happy and healthy"');
    expect(sick).toContain("thermometer");
    expect(evolved).toContain("energized evolved form");
    expect(normal).toContain("Ready to play.");
  });
});
