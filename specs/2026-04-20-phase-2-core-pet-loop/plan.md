# Phase 2 Plan

## Goal

Build the complete core pet loop as one integrated feature on top of the Phase 1 app shell.

## Outcome

By the end of Phase 2, the app should let a player care for one named pet in real time through visible vitals, simple actions, and clear state changes.

## Workstreams

### 1. Define the pet domain model

- Add the pet name field
- Add the three vitals: `Hunger`, `Happiness`, and `Energy`
- Keep all vitals on a `0-100` scale
- Add the three pet states: `Normal`, `Sick`, and `Evolved`

### 2. Build the simulation loop

- Add a timer-based tick system
- Decrease the three vitals over time
- Clamp all stat changes to valid bounds
- Keep simulation rules separate from UI components

### 3. Add player care actions

- Add `Feed`
- Add `Play`
- Add `Rest`
- Make each action update the correct vitals
- Prevent action logic from pushing values outside valid ranges

### 4. Add state transition rules

- Trigger `Sick` from poor care conditions
- Add one recovery path back from sickness
- Add one evolution path from sustained strong care
- Make state changes deterministic and easy to test

### 5. Render the interactive core interface

- Show the pet name
- Show visible meters for all three vitals
- Show the current pet state
- Add buttons for `Feed`, `Play`, and `Rest`
- Make the interface readable on both desktop and mobile

### 6. Add test coverage for the core loop

- Add logic tests for stat decay
- Add logic tests for action effects
- Add logic tests for state transitions
- Add one user-flow test for the main care loop

## Suggested Implementation Order

1. Create the pet types and initial pet state.
2. Add pure functions for stat updates and clamping.
3. Add the tick logic and time-based updates.
4. Add the care action handlers.
5. Add state transition rules for sickness, recovery, and evolution.
6. Replace the placeholder app shell with the first playable interface.
7. Add tests for the simulation rules and the main UI flow.

## Out Of Scope

- `localStorage` persistence
- Reaction text and Easter eggs
- Balance polish beyond reasonable defaults
- Additional pets, users, inventories, or currencies
