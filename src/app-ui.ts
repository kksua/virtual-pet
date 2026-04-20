import { type PetAction, type PetStatus } from "./pet";

export type ActionDetail = {
  label: string;
  icon: string;
  accent: string;
  glow: string;
};

export const ACTION_DETAILS: Record<PetAction, ActionDetail> = {
  feed: {
    label: "Feed",
    icon: "🍓",
    accent:
      "border-amber-300/30 bg-[linear-gradient(180deg,rgba(251,191,36,0.22),rgba(249,115,22,0.18))] text-amber-50",
    glow: "shadow-[0_12px_28px_rgba(249,115,22,0.2)]",
  },
  play: {
    label: "Play",
    icon: "★",
    accent:
      "border-sky-300/30 bg-[linear-gradient(180deg,rgba(56,189,248,0.2),rgba(14,165,233,0.14))] text-sky-50",
    glow: "shadow-[0_12px_28px_rgba(14,165,233,0.18)]",
  },
  rest: {
    label: "Rest",
    icon: "Zz",
    accent:
      "border-fuchsia-300/30 bg-[linear-gradient(180deg,rgba(217,70,239,0.2),rgba(139,92,246,0.14))] text-fuchsia-50",
    glow: "shadow-[0_12px_28px_rgba(139,92,246,0.18)]",
  },
};

export const STATUS_STYLES: Record<PetStatus, string> = {
  normal: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  sick: "border-rose-400/40 bg-rose-500/10 text-rose-100",
  evolved: "border-amber-300/50 bg-amber-400/10 text-amber-50",
};

export const STATUS_SURFACES: Record<PetStatus, string> = {
  normal:
    "border-emerald-400/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]",
  sick:
    "border-rose-400/15 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.16),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]",
  evolved:
    "border-amber-300/20 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.14),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]",
};

export const STATUS_HINTS: Record<PetStatus, string> = {
  normal: "Stable",
  sick: "Needs care",
  evolved: "Thriving",
};

export const VITAL_STYLES = {
  hunger: "from-amber-300 via-orange-400 to-ember-500",
  happiness: "from-sky-300 via-cyan-400 to-teal-400",
  energy: "from-violet-300 via-fuchsia-400 to-pink-400",
} as const;

export const VITAL_CARD_STYLES = {
  critical:
    "border-rose-400/45 bg-rose-500/10 shadow-[0_10px_24px_rgba(244,63,94,0.12)]",
  warning: "border-amber-300/30 bg-amber-400/6",
  steady: "border-emerald-400/20 bg-emerald-500/6",
  thriving:
    "border-sky-300/30 bg-sky-400/8 shadow-[0_10px_24px_rgba(56,189,248,0.12)]",
} as const;

export const STATE_GUIDE: Record<PetStatus, string> = {
  normal:
    "Keep every vital healthy, and hold all three above 82 long enough to unlock evolution.",
  sick: "Raise every vital above 48 for two stable checks to recover.",
  evolved:
    "Your pet has reached its evolved form. Keep caring for it so neglect does not undo the moment.",
};

export const INFO_PANELS = [
  {
    title: "Sickness rule",
    detail:
      "Any vital at 15 or below, or two vitals below 30, makes the pet sick.",
  },
  {
    title: "Persistence rule",
    detail: "Name, vitals, status, and progression restore on the next load.",
  },
  {
    title: "Personality layer",
    detail:
      "Reactions shift with status, actions, and a few repeated-care Easter eggs.",
  },
] as const;

export function getPortraitCardStyle(status: PetStatus): string {
  if (status === "sick") {
    return "border-rose-400/25 bg-rose-500/6";
  }

  if (status === "evolved") {
    return "border-sky-300/25 bg-sky-400/6";
  }

  return "border-emerald-400/20 bg-slate-950/45";
}
