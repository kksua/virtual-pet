import { shellCheckpoints, shellHighlights } from "./app-shell";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-halo backdrop-blur">
            <div className="bg-[radial-gradient(circle_at_top_left,_rgba(247,119,22,0.28),_transparent_38%),linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(255,255,255,0.02))] p-8 sm:p-10">
              <p className="font-display text-sm uppercase tracking-[0.35em] text-ember-200">
                Phase 1
              </p>
              <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight text-white sm:text-5xl">
                Virtual Pet app shell is online and ready for the first living
                loop.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                This starter screen confirms the React app is mounted, Tailwind
                is active, and the project is ready for the pet model, vitals,
                and care actions in the next phases.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {shellHighlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-ember-400/30 bg-ember-500/10 px-4 py-2 text-sm text-ember-100"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-7">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              What ships now
            </p>
            <ul className="mt-6 space-y-4">
              {shellCheckpoints.map((checkpoint) => (
                <li
                  key={checkpoint.id}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                  <div>
                    <p className="font-display text-base text-white">
                      {checkpoint.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {checkpoint.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="grid gap-4 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 sm:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              Next up
            </p>
            <p className="mt-3 text-lg text-white">Pet model and vitals</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              Ready for
            </p>
            <p className="mt-3 text-lg text-white">Feed, Play, and Rest</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-slate-400">
              Foundation
            </p>
            <p className="mt-3 text-lg text-white">Single-page React app shell</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
