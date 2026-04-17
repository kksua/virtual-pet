# Roadmap

## Implementation Order

Build the project in very small phases so the core care loop works early and can be refined before adding personality details.

## Phase 1

Create the frontend app shell.

- Add the single-page HTML entry
- Configure the dev/build workflow
- Confirm `src/index.ts` boots the page

## Phase 2

Define the pet model.

- Add pet types for name, vitals, and status
- Set stat limits to `0-100`
- Add the three states: `Normal`, `Sick`, `Evolved`

## Phase 3

Implement the living vitals tick system.

- Add a timer loop
- Decrease `Hunger`, `Happiness`, and `Energy` over time
- Clamp values so they stay within valid bounds

## Phase 4

Implement the care actions.

- Add `Feed`
- Add `Play`
- Add `Rest`
- Make each action affect the correct vitals

## Phase 5

Add state transition rules.

- Trigger `Sick` from poor care conditions
- Add one recovery path from sickness
- Add one evolution path from strong care conditions

## Phase 6

Render the core interface.

- Show pet name
- Show all three vitals as clear meters
- Show the current pet state
- Add action buttons for `Feed`, `Play`, and `Rest`

## Phase 7

Add persistence.

- Save the single pet to `localStorage`
- Restore the pet on reload
- Preserve vitals, name, and state

## Phase 8

Add personality touches.

- Add a small reaction text system
- Add a few Easter eggs tied to actions or state changes
- Make the pet feel more expressive than the raw stats alone

## Phase 9

Polish and balance.

- Tune tick rates and action values
- Improve visual clarity for `Normal`, `Sick`, and `Evolved`
- Check edge cases around recovery, evolution, and low stats

## Phase 10

Final cleanup.

- Simplify any overly large modules
- Remove unused code
- Update README if implementation details changed
