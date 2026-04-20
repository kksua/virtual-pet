import { FormEvent, useEffect, useState } from "react";

import {
  STATUS_COPY,
  TICK_INTERVAL_MS,
  applyPetAction,
  getVitalMood,
  getVitalsEntries,
  renamePet,
  tickPet,
  type Pet,
  type PetAction,
} from "./pet";
import {
  ACTION_DETAILS,
  INFO_PANELS,
  STATE_GUIDE,
  STATUS_HINTS,
  STATUS_STYLES,
  STATUS_SURFACES,
  VITAL_CARD_STYLES,
  VITAL_STYLES,
  getPortraitCardStyle,
} from "./app-ui";
import { PetCharacter } from "./PetCharacter";
import { getPetReaction, type PetEvent } from "./reactions";
import { loadStoredPet, saveStoredPet } from "./storage";

function App() {
  const [initialLoad] = useState(() =>
    loadStoredPet(
      typeof window === "undefined" ? undefined : window.localStorage,
    ),
  );
  const [pet, setPet] = useState<Pet>(initialLoad.pet);
  const [nameDraft, setNameDraft] = useState(initialLoad.pet.name);
  const [petTapCount, setPetTapCount] = useState(0);
  const [petEvent, setPetEvent] = useState<PetEvent>({
    type: "load",
    source: initialLoad.source,
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPet((currentPet) => tickPet(currentPet));
      setPetEvent({ type: "tick" });
    }, TICK_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    saveStoredPet(
      typeof window === "undefined" ? undefined : window.localStorage,
      pet,
    );
  }, [pet]);

  useEffect(() => {
    setNameDraft(pet.name);
  }, [pet.name]);

  function handleRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPet((currentPet) => renamePet(currentPet, nameDraft));
    setPetEvent({ type: "rename" });
  }

  function handleAction(action: PetAction) {
    setPet((currentPet) => applyPetAction(currentPet, action));
    setPetEvent({ type: "action", action });
  }

  function handlePetTap() {
    setPetTapCount((currentCount) => {
      const nextCount = currentCount + 1;
      setPetEvent({ type: "petTap", count: nextCount });
      return nextCount;
    });
  }

  const statusCopy = STATUS_COPY[pet.status];
  const vitalityGoal = STATE_GUIDE[pet.status];
  const vitals = getVitalsEntries(pet.vitals);
  const reaction = getPetReaction(pet, petEvent);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-halo backdrop-blur">
            <div className={`p-8 sm:p-10 ${STATUS_SURFACES[pet.status]}`}>
              <div className="flex flex-wrap items-center gap-3">
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
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                {STATUS_HINTS[pet.status]}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {vitals.map(([vitalName, value]) => (
                  <article
                    key={vitalName}
                    className={`rounded-[1.5rem] border p-4 ${VITAL_CARD_STYLES[getVitalMood(value)]}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-xs uppercase tracking-[0.24em] text-slate-400">
                        {vitalName}
                      </p>
                      <p className="text-xs text-white">{value}/100</p>
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
              <form
                className="mt-5 max-w-2xl rounded-[1.75rem] border border-white/10 bg-slate-950/35 p-5"
                onSubmit={handleRename}
              >
                <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
                  Naming flow
                </p>
                <label
                  className="mt-4 block text-sm font-medium text-slate-200"
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
            </div>
          </div>

          <section className="grid gap-6">
            <aside className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/85 shadow-halo">
              <div className={`p-7 ${STATUS_SURFACES[pet.status]}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
                      Pet portrait
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      A live character card that shifts with {pet.name}&apos;s current state.
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.28em] ${STATUS_STYLES[pet.status]}`}
                  >
                    {statusCopy.badge}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePetTap}
                  className={`mt-4 block w-full rounded-[1.75rem] border px-4 py-5 text-left transition hover:border-white/20 hover:bg-slate-950/55 active:scale-[0.99] ${getPortraitCardStyle(pet.status)}`}
                  aria-label={`Tap ${pet.name}`}
                >
                  <PetCharacter
                    status={pet.status}
                    name={pet.name}
                    reaction={reaction}
                  />
                </button>
                <div className="mt-4">
                  <p className="font-display text-xs uppercase tracking-[0.28em] text-slate-400">
                    Quick care
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(Object.entries(ACTION_DETAILS) as Array<
                      [PetAction, (typeof ACTION_DETAILS)[PetAction]]
                    >).map(([action, detail]) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => handleAction(action)}
                        className={`group relative overflow-hidden rounded-xl border px-3 py-2 text-left transition hover:-translate-y-0.5 hover:scale-[1.02] hover:border-white/40 active:translate-y-0 active:scale-[0.98] ${detail.accent} ${detail.glow}`}
                      >
                        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_48%)] opacity-80" />
                        <span className="relative flex items-center gap-3">
                          <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-white/15 bg-black/20 px-2 font-display text-xs tracking-wide text-white">
                            {detail.icon}
                          </span>
                          <span className="font-display text-xs uppercase tracking-[0.2em] text-white">
                            {detail.label}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </section>

        <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 lg:grid-cols-[1fr_1fr_1fr]">
          {INFO_PANELS.map((panel) => (
            <div
              key={panel.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
            >
              <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
                {panel.title}
              </p>
              <p className="mt-3 text-lg text-white">{panel.detail}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
