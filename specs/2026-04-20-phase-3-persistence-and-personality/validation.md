# Phase 3 Validation

## Validation Goal

Confirm that persistence is reliable, the pet resumes correctly after reload, and the new personality layer adds charm without making the interface confusing.

## Manual Checks

- Load the app, change the pet name, and confirm the name persists after reload.
- Use `Feed`, `Play`, and `Rest`, then reload and confirm the pet vitals and current state persist.
- Trigger `Sick` or `Evolved`, reload the app, and confirm the restored state is still correct.
- Confirm reaction text changes as the pet condition or actions change.
- Confirm the interface still keeps vitals, state, and controls easy to find.

## Persistence Checks

- Confirm the app creates a saved pet record in `localStorage`.
- Confirm the app restores a valid saved record correctly.
- Confirm the app falls back safely when storage is empty.
- Confirm the app falls back safely when storage contains malformed data.

## Personality Checks

- Confirm each major pet state can produce meaningful reaction text.
- Confirm action-triggered reactions appear after `Feed`, `Play`, and `Rest`.
- Confirm Easter eggs are discoverable but do not interrupt the main care loop.

## Automated Checks

- Run `npm run build`
- Run `npm test`
- Run the main `Playwright` persistence flow

## Phase Exit Questions

- Does the pet feel continuous across sessions?
- Do reactions make the pet feel more alive without becoming noisy?
- Is the saved state small, predictable, and aligned with the one-pet scope?
- Is the app still simple enough to move into polish work next?

## Success Signal

Phase 3 passes validation when the pet reliably restores after reload, personality reactions are visible and coherent, and the project remains within the single-page, one-user, one-pet experience.
