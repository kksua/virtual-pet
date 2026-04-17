export type ShellCheckpoint = {
  id: string;
  label: string;
  detail: string;
};

export const shellHighlights = [
  "Vite",
  "React + TypeScript",
  "Tailwind CSS",
  "Phase 1 shell",
];

export const shellCheckpoints: ShellCheckpoint[] = [
  {
    id: "vite",
    label: "Vite toolchain configured",
    detail: "The app is set up for local development and production builds.",
  },
  {
    id: "react",
    label: "React render path mounted",
    detail: "The single-page app now renders through a React root component.",
  },
  {
    id: "tailwind",
    label: "Tailwind styling active",
    detail: "Utility classes are wired in so later phases can move quickly.",
  },
  {
    id: "entry",
    label: "src/index.ts stays in the boot path",
    detail: "The Vite HTML entry still hands off through the TypeScript index file.",
  },
];
