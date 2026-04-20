# Phase 2 Validation

## Validation Goal

Confirm that the app now delivers a playable core pet loop with reliable logic, clear UI feedback, and test coverage for the main rules.

## Manual Checks

- Load the app and confirm a named pet is visible.
- Confirm `Hunger`, `Happiness`, and `Energy` are visible as clear meters or values.
- Wait long enough to confirm vitals decrease over time.
- Use `Feed`, `Play`, and `Rest` and confirm each action changes the expected vitals.
- Confirm the current pet state is always visible.
- Confirm the layout remains usable on both desktop and mobile widths.

## Logic Checks

- Confirm vitals never drop below `0`.
- Confirm vitals never rise above `100`.
- Confirm poor care conditions can trigger `Sick`.
- Confirm the recovery path can return the pet from `Sick`.
- Confirm the evolution path can move the pet to `Evolved`.
- Confirm state rules behave consistently across repeated runs.

## Automated Checks

- Run `npm run build`
- Run `npm test`
- Run the main `Playwright` care-loop smoke test

## Phase Exit Questions

- Does the app feel like a real virtual pet instead of a static shell?
- Can a player understand the pet's needs without extra explanation?
- Are the core rules simple, testable, and stable enough to build persistence on next?
- Is the project still aligned with the single-page, one-user, one-pet scope?

## Success Signal

Phase 2 passes validation when the project has a working real-time pet loop with visible vitals, actionable care controls, deterministic state changes, and passing build plus core test coverage.
