import { FormEvent, useEffect, useState } from "react";

import {
  STATUS_COPY,
  TICK_INTERVAL_MS,
  applyPetAction,
  createPet,
  getVitalsEntries,
  renamePet,
  tickPet,
  type Pet,
  type PetAction,
  type PetStatus,
} from "./pet";

const ACTION_DETAILS: Record<
  PetAction,
  {
    label: string;
    detail: string;
  }
> = {
  feed: {
    label: "Feed",
    detail: "Boost hunger and give a small happiness lift.",
  },
  play: {
    label: "Play",
    detail: "Raise happiness fast, but it spends energy.",
  },
  rest: {
    label: "Rest",
    detail: "Refill energy and gently calm the pet.",
  },
};

const STATUS_STYLES: Record<PetStatus, string> = {
  normal: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  sick: "border-rose-400/40 bg-rose-500/10 text-rose-100",
  evolved: "border-amber-300/50 bg-amber-400/10 text-amber-50",
};

const VITAL_STYLES = {
  hunger: "from-amber-300 via-orange-400 to-ember-500",
  happiness: "from-sky-300 via-cyan-400 to-teal-400",
  energy: "from-violet-300 via-fuchsia-400 to-pink-400",
} as const;

const STATE_GUIDE: Record<PetStatus, string> = {
  normal:
    "Keep every vital healthy, and stay above 80 long enough to unlock evolution.",
  sick: "Raise every vital above 45 for two stable checks to recover.",
  evolved:
    "Your pet has reached its evolved form. Keep caring for it so neglect does not undo the moment.",
};

function App() {
  const [pet, setPet] = useState<Pet>(() => createPet());
  const [nameDraft, setNameDraft] = useState("Nova");

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPet((currentPet) => tickPet(currentPet));
    }, TICK_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setNameDraft(pet.name);
  }, [pet.name]);

  function handleRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPet((currentPet) => renamePet(currentPet, nameDraft));
  }

  function handleAction(action: PetAction) {
    setPet((currentPet) => applyPetAction(currentPet, action));
  }

  const statusCopy = STATUS_COPY[pet.status];
  const vitalityGoal = STATE_GUIDE[pet.status];
  const vitals = getVitalsEntries(pet.vitals);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-halo backdrop-blur">
            <div className="bg-[radial-gradient(circle_at_top_left,_rgba(247,119,22,0.28),_transparent_38%),linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02))] p-8 sm:p-10">
              <p className="font-display text-sm uppercase tracking-[0.35em] text-ember-200">
                Phase 2
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
                  {pet.name}
                </h1>
                <span
                  className={`rounded-full border px-4 py-2 text-sm ${STATUS_STYLES[pet.status]}`}
                >
                  {statusCopy.badge}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-xl text-white">
                {statusCopy.summary}
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                {statusCopy.detail}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {vitals.map(([vitalName, value]) => (
                  <article
                    key={vitalName}
                    className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
                        {vitalName}
                      </p>
                      <p className="text-sm text-white">{value}/100</p>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${VITAL_STYLES[vitalName]}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-8 max-w-2xl rounded-[1.5rem] border border-amber-300/15 bg-black/20 px-5 py-4 text-sm leading-6 text-slate-300">
                {vitalityGoal}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  Tick every {TICK_INTERVAL_MS / 1000} seconds
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  One pet
                </span>
                <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                  One evolution path
                </span>
              </div>
            </div>
          </div>

          <section className="grid gap-6">
            <form
              className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-7"
              onSubmit={handleRename}
            >
              <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
                Naming flow
              </p>
              <label
                className="mt-5 block text-sm font-medium text-slate-200"
                htmlFor="pet-name"
              >
                Pet name
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="pet-name"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-ember-400"
                  maxLength={18}
                  placeholder="Name your pet"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-ember-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-ember-400"
                >
                  Save name
                </button>
              </div>
            </form>

            <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-7">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
                Care actions
              </p>
              <div className="mt-6 grid gap-4">
                {(Object.entries(ACTION_DETAILS) as Array<
                  [PetAction, (typeof ACTION_DETAILS)[PetAction]]
                >).map(([action, detail]) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => handleAction(action)}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5 text-left transition hover:border-ember-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-lg text-white">
                        {detail.label}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
                        Action
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {detail.detail}
                    </p>
                  </button>
                ))}
              </div>
            </aside>
          </section>
        </section>

        <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 lg:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              Sickness rule
            </p>
            <p className="mt-3 text-lg text-white">
              Any vital at 15 or below, or two vitals below 30, makes the pet sick.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              Recovery path
            </p>
            <p className="mt-3 text-lg text-white">
              Keep every vital above 45 for two checks to return to normal.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              Evolution path
            </p>
            <p className="mt-3 text-lg text-white">
              Hold all three vitals above 80 for three strong checks to evolve.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
