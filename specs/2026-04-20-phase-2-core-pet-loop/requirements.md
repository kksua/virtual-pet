# Phase 2 Requirements

## Functional Requirements

- The app must support one named pet.
- The pet must track `Hunger`, `Happiness`, and `Energy`.
- Each stat must stay within the `0-100` range.
- The app must support the pet states `Normal`, `Sick`, and `Evolved`.
- The app must reduce vitals over time through a repeating tick loop.
- The app must provide the actions `Feed`, `Play`, and `Rest`.
- Each action must update the correct vitals.
- Poor care conditions must be able to transition the pet into `Sick`.
- The pet must be able to recover from `Sick` through one defined recovery path.
- The pet must be able to reach `Evolved` through one defined evolution path.

## UI Requirements

- The player must be able to see the pet name.
- The player must be able to see all three vitals at a glance.
- The player must be able to see the current pet state at all times.
- The player must be able to trigger `Feed`, `Play`, and `Rest` from the main screen.
- The Phase 2 interface must fit within the existing single-page application.

## Technical Requirements

- Pet state should be strongly typed in TypeScript.
- Simulation logic should be separated from presentational React components.
- Stat updates should use reusable pure functions where practical.
- The timer loop must not let vitals fall below `0` or rise above `100`.
- State transition rules must be deterministic enough to test with `Vitest`.
- The main care loop should be covered by at least one `Playwright` user-flow test.

## Constraint Alignment

- No authentication
- No multiple users
- No multiple pets
- No inventories
- No currencies
- No mini-games
- No social features
- No notifications
- No admin systems
- No complex evolution trees
- No permanent death mechanics

## Completion Definition

Phase 2 is complete when a player can open the app, see one pet with visible vitals, use `Feed`, `Play`, and `Rest`, observe real-time stat decay, and reach `Sick`, recovery, or `Evolved` outcomes through the defined rules.
