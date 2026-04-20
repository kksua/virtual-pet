import {
  getLowestVitalName,
  type Pet,
  type PetAction,
  type PetStatus,
} from "./pet";
import { type StorageLoadSource } from "./storage";

export type PetEvent =
  | { type: "load"; source: StorageLoadSource }
  | { type: "rename" }
  | { type: "tick" }
  | { type: "action"; action: PetAction }
  | { type: "petTap"; count: number };

const STATUS_REACTIONS: Record<PetStatus, string[]> = {
  normal: [
    "I am vibing tbh. Keep me fed and we stay iconic.",
    "Mood: stable. Aura: cute. Expectations: snacks.",
    "I am doing amazing actually. Let us not ruin the streak 😌",
  ],
  sick: [
    "I am not okay bestie... tiny soup and nap arc please 🤒",
    "This is my dramatic recovery episode. Care package needed immediately.",
    "I have the energy of a phone on 2%. Please assist.",
  ],
  evolved: [
    "I am fully ascended rn. Energy? Unreal. Aura? Maxed.",
    "I did not evolve just to be ignored. Respect the glow-up ⚡",
    "I am serving final form behavior and I expect applause.",
  ],
};

const HUNGER_REACTIONS = [
  "I am hungry hungry. Snack drop when? 🍓",
  "My stomach just filed a formal complaint.",
  "I could absolutely devour a five-course berry situation right now.",
  "Feed me and I will pretend I was never dramatic about this.",
];

const HAPPINESS_REACTIONS = [
  "I need fun immediately. I am locked in and ready to play ⭐",
  "Boredom is attacking me personally.",
  "If we do not play soon I will start inventing problems for entertainment.",
  "I have jokes, zoomies, and zero patience. Hit play.",
];

const ENERGY_REACTIONS = [
  "Battery low. I need a dramatic little rest reset 💤",
  "I am one yawn away from blue-screening.",
  "My whole vibe needs a soft blanket and zero responsibilities.",
  "Respectfully, I need to enter sleep mode before I say something weird.",
];

const LOW_VITAL_REACTIONS = [
  "hello??? one of my vibes is crashing. please assist 😵",
  "This is not a drill. My stats are looking deeply unserious.",
  "I am trying to stay cute under pressure but the numbers are LOUD.",
];

const LOAD_REACTIONS: Record<StorageLoadSource, string[]> = {
  storage: [
    "ok yes hi again. I saved my whole vibe while you were gone ✨",
    "I remembered everything. Elite save behavior from me.",
    "Save loaded. I return exactly as iconic as before.",
  ],
  invalid: [
    "uh that save was cursed so I hard reset with fresh energy 😵‍💫",
    "The old save was giving haunted, so I chose peace and rebooted.",
    "I found corrupted vibes in storage and simply refused them.",
  ],
  default: [
    "hi I am ready to be your tiny chaotic legend 🫶",
    "New day, clean save, huge potential.",
    "Fresh start energy activated. Try not to fumble me.",
  ],
};

const RENAME_REACTIONS = [
  "wait... that name kinda eats actually 😌",
  "ok yes, branding secured.",
  "That is so me. I will be answering only to this now.",
];

const SICK_CARE_REACTIONS = [
  "ok wait... that helped. I still feel crusty but less doomed 💚",
  "That was gentle and correct. Keep doing exactly that.",
  "I am still in my flop era, but this is progress.",
];

const FEED_REACTIONS = [
  "oh we are so back. Snack secured. Mood elevated 🍓",
  "Huge for me. Massive snack win.",
  "That meal hit instantly. I am emotionally available again.",
];

const FEED_EASTER_EGG_REACTIONS = [
  "this meal disappeared in 0.2 seconds. I regret nothing 🍓",
  "I ate that like rent was due in five minutes.",
  "Zero crumbs. Zero shame. Legendary performance from me.",
];

const PLAY_REACTIONS = [
  "I am locked in. Play mode activated. No notes ⭐",
  "Yes. This is the enrichment content I deserve.",
  "I am so back in my silly little champion era.",
];

const PLAY_EASTER_EGG_REACTIONS = [
  "again again again. I am literally built for fun mode ⭐",
  "I would like to formally request infinite playtime.",
  "This is not enough play. I have only just begun to be annoying.",
];

const REST_REACTIONS = [
  "do not text. do not call. I am in my rest era 💤",
  "Excellent. I will now become a tiny weighted blanket.",
  "Rest acquired. Brain cells returning one by one.",
];

const REST_EASTER_EGG_REACTIONS = [
  "that nap? elite. I am back with premium softness 💤",
  "I slept like a paid professional.",
  "I had one nap and suddenly I believe in myself again.",
];

const EVOLVED_PLAY_REACTIONS = [
  "I am SO locked in right now. This is peak evolved behavior ⚡",
  "This evolved body was built for elite play sessions.",
  "I just hit a level of hype that should probably be regulated.",
];

const TAP_REACTIONS: Record<PetStatus, string[]> = {
  normal: [
    "hiii 🫶",
    "ok attention received.",
    "what's up bestie",
    "hehe yes I am cute",
  ],
  sick: [
    "eep 🤒",
    "gentle taps only pls",
    "i need soup energy",
    "still sick... still iconic",
  ],
  evolved: [
    "zoom ⚡",
    "power level: rude",
    "i am glowing btw",
    "locked in fr",
  ],
};

const TAP_NEED_REACTIONS = {
  hunger: ["snack? 🍓", "hungy.", "feed me maybe?"],
  happiness: ["play now? ⭐", "i need fun.", "entertain me pls"],
  energy: ["sleepy tbh 💤", "nap button when?", "battery low."],
} as const;

const LOW_VITAL_THRESHOLD = 35;

export function getPetReaction(pet: Pet, event: PetEvent): string {
  if (event.type === "load") {
    return pickReaction(LOAD_REACTIONS[event.source], pet, 0);
  }

  if (event.type === "rename") {
    return `${pet.name}? ${pickReaction(RENAME_REACTIONS, pet, 3)}`;
  }

  if (event.type === "tick") {
    return getTickReaction(pet);
  }

  if (event.type === "petTap") {
    return getTapReaction(pet, event.count);
  }

  return getActionReaction(pet, event.action);
}

function getTickReaction(pet: Pet): string {
  if (pet.status === "sick") {
    return pickReaction(STATUS_REACTIONS.sick, pet, 6);
  }

  if (pet.status === "evolved") {
    return pickReaction(STATUS_REACTIONS.evolved, pet, 9);
  }

  const lowestVital = Math.min(
    pet.vitals.hunger,
    pet.vitals.happiness,
    pet.vitals.energy,
  );

  if (lowestVital < LOW_VITAL_THRESHOLD) {
    return pickReaction(LOW_VITAL_REACTIONS, pet, 12);
  }

  const lowestVitalName = getLowestVitalName(pet.vitals);

  if (lowestVitalName === "hunger") {
    return pickReaction(HUNGER_REACTIONS, pet, 15);
  }

  if (lowestVitalName === "happiness") {
    return pickReaction(HAPPINESS_REACTIONS, pet, 18);
  }

  if (lowestVitalName === "energy") {
    return pickReaction(ENERGY_REACTIONS, pet, 21);
  }

  return pickReaction(STATUS_REACTIONS.normal, pet, 24);
}

function getActionReaction(pet: Pet, action: PetAction): string {
  if (pet.status === "sick" && (action === "feed" || action === "rest")) {
    return pickReaction(SICK_CARE_REACTIONS, pet, 27);
  }

  if (pet.status === "evolved" && action === "play") {
    return pickReaction(EVOLVED_PLAY_REACTIONS, pet, 30);
  }

  if (action === "feed" && pet.actionCounts.feed >= 5) {
    return pickReaction(FEED_EASTER_EGG_REACTIONS, pet, 33);
  }

  if (action === "play" && pet.actionCounts.play >= 3) {
    return pickReaction(PLAY_EASTER_EGG_REACTIONS, pet, 36);
  }

  if (action === "rest" && pet.actionCounts.rest >= 3) {
    return pickReaction(REST_EASTER_EGG_REACTIONS, pet, 39);
  }

  if (action === "feed") {
    return pickReaction(FEED_REACTIONS, pet, 42);
  }

  if (action === "play") {
    return pickReaction(PLAY_REACTIONS, pet, 45);
  }

  return pickReaction(REST_REACTIONS, pet, 48);
}

function getTapReaction(pet: Pet, count: number): string {
  if (pet.status === "sick") {
    return pickReaction(TAP_REACTIONS.sick, pet, 51, count);
  }

  if (pet.status === "evolved") {
    return pickReaction(TAP_REACTIONS.evolved, pet, 54, count);
  }

  const lowestVitalName = getLowestVitalName(pet.vitals);

  if (lowestVitalName === "hunger") {
    return pickReaction(TAP_NEED_REACTIONS.hunger, pet, 57, count);
  }

  if (lowestVitalName === "happiness") {
    return pickReaction(TAP_NEED_REACTIONS.happiness, pet, 60, count);
  }

  if (lowestVitalName === "energy") {
    return pickReaction(TAP_NEED_REACTIONS.energy, pet, 63, count);
  }

  return pickReaction(TAP_REACTIONS.normal, pet, 66, count);
}

function pickReaction(
  reactions: readonly string[],
  pet: Pet,
  seedOffset: number,
  extraSeed = 0,
): string {
  const reactionIndex =
    getReactionSeed(pet, seedOffset, extraSeed) % reactions.length;

  return reactions[reactionIndex];
}

function getReactionSeed(
  pet: Pet,
  seedOffset: number,
  extraSeed: number,
): number {
  const actionWeight =
    pet.actionCounts.feed * 2 + pet.actionCounts.play * 3 + pet.actionCounts.rest;
  const vitalityWeight =
    pet.vitals.hunger + pet.vitals.happiness + pet.vitals.energy;

  return (
    pet.tickCount +
    pet.recoveryStreak +
    pet.thrivingStreak +
    actionWeight +
    vitalityWeight +
    seedOffset +
    extraSeed
  );
}
