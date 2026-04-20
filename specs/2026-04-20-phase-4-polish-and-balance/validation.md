# Phase 4 Validation

## Validation Goal

Confirm that the game loop now feels more polished, the states are clearer to players, and the system behaves reliably at the edges of the rules.

## Manual Checks

- Play through the loop and confirm the pet needs care regularly but not constantly.
- Confirm the visual difference between `Normal`, `Sick`, and `Evolved` is obvious.
- Confirm the pet can still become `Sick`, recover, and evolve without awkward pacing.
- Confirm the layout still feels clean and readable on desktop and mobile widths.

## Balance Checks

- Confirm tick decay feels noticeable but fair.
- Confirm each action has a meaningful effect without instantly trivializing the loop.
- Confirm the pet can stay healthy with attentive play.
- Confirm neglect still has visible consequences.

## Edge-Case Checks

- Confirm vitals never drop below `0`.
- Confirm vitals never rise above `100`.
- Confirm threshold transitions behave correctly around sickness, recovery, and evolution boundaries.
- Confirm repeated actions near limits do not create broken visual or logical states.

## Automated Checks

- Run `npm run build`
- Run `npm test`
- Run the main `Playwright` flows that cover the pet loop and persistence

## Phase Exit Questions

- Does the game loop feel better balanced than before?
- Can a player identify the pet’s state instantly?
- Do the thresholds behave consistently under repeated interaction?
- Is the app ready for the final cleanup phase without needing more design or rules work first?

## Success Signal

Phase 4 passes validation when the pet feels better tuned, the state presentation is clearer, and the tested edge cases around care and progression behave consistently.
