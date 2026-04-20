# Phase 3 Plan

## Goal

Add persistence and personality to the existing pet loop so the pet feels continuous across sessions and more expressive during play.

## Outcome

By the end of Phase 3, the player's pet should persist across reloads with its important state intact, and the interface should include lightweight reactions and small surprises that make the pet feel more alive.

## Workstreams

### 1. Add client-side persistence

- Save the single pet state to `localStorage`
- Restore the pet state when the app loads
- Keep saved data limited to the existing one-pet scope
- Handle missing or invalid saved data safely

### 2. Define the persistence boundary

- Persist the pet name
- Persist the three vitals
- Persist the current pet status
- Persist any additional state needed to keep sickness, recovery, and evolution logic consistent after reload

### 3. Add reaction text

- Add small status-aware reaction lines
- Show different reactions for `Normal`, `Sick`, and `Evolved`
- Let actions such as `Feed`, `Play`, and `Rest` surface short pet responses

### 4. Add personality touches

- Add a few simple Easter eggs tied to repeated actions or special pet conditions
- Keep personality details lightweight and readable
- Make the pet feel like a character without introducing mini-games or extra systems

### 5. Integrate persistence and personality into the current UI

- Load the saved pet into the current app on first render
- Save updates whenever the pet meaningfully changes
- Show reaction text in a clear place on the main screen
- Keep the interface understandable even when extra personality content is added

### 6. Add test coverage

- Add logic tests for save and load behavior
- Add tests for invalid or missing saved data handling
- Add tests for the reaction system rules
- Add one user-flow test covering reload persistence

## Suggested Implementation Order

1. Create a small storage module around `localStorage`.
2. Define the persisted pet shape and validation rules.
3. Load saved state into the React app on startup.
4. Save pet changes after actions and tick updates.
5. Add a reaction system driven by status and actions.
6. Add a few Easter eggs that fit the one-pet scope.
7. Add tests for persistence and visible user behavior.

## Out Of Scope

- Multiple save slots
- Cloud sync or backend persistence
- Notifications
- Social features
- Inventory or currency systems
- Mini-games
