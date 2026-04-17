import { describe, expect, it } from "vitest";

import { shellCheckpoints, shellHighlights } from "./app-shell";

describe("app shell content", () => {
  it("tracks the main phase 1 checkpoints", () => {
    expect(shellCheckpoints).toHaveLength(4);
    expect(shellCheckpoints.map((checkpoint) => checkpoint.id)).toEqual([
      "vite",
      "react",
      "tailwind",
      "entry",
    ]);
  });

  it("surfaces the primary stack highlights", () => {
    expect(shellHighlights).toContain("Vite");
    expect(shellHighlights).toContain("React + TypeScript");
    expect(shellHighlights).toContain("Tailwind CSS");
  });
});
