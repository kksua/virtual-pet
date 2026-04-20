# Roadmap 1

## Implementation Order

Build the project in small, practical phases so the app shell lands first, the full core pet loop comes next as one integrated feature, and the remaining work can focus on persistence, personality, and polish.

## Phase 1

Create the frontend app shell.

- Add the single-page HTML entry
- Configure the dev/build workflow
- Confirm `src/index.ts` boots the page

## Phase 2

Build the complete core pet loop.

- Define the pet model with name, vitals, and status
- Set stat limits to `0-100`
- Add the three states: `Normal`, `Sick`, `Evolved`
- Add a timer loop for living vital decay
- Decrease `Hunger`, `Happiness`, and `Energy` over time
- Clamp values so they stay within valid bounds
- Add the `Feed`, `Play`, and `Rest` actions
- Make each action affect the correct vitals
- Trigger `Sick` from poor care conditions
- Add one recovery path from sickness
- Add one evolution path from strong care conditions
- Render the core interface with the pet name, vitals, current state, and action buttons

## Phase 3

Add persistence.

- Save the single pet to `localStorage`
- Restore the pet on reload
- Preserve vitals, name, and state

## Phase 4

Add personality touches.

- Add a small reaction text system
- Add a few Easter eggs tied to actions or state changes
- Make the pet feel more expressive than the raw stats alone

## Phase 5

Polish and balance.

- Tune tick rates and action values
- Improve visual clarity for `Normal`, `Sick`, and `Evolved`
- Check edge cases around recovery, evolution, and low stats

## Phase 6

Final cleanup.

- Simplify any overly large modules
- Remove unused code
- Update README if implementation details changed
