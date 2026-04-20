# Phase 3 Requirements

## Functional Requirements

- The app must save the current single pet to `localStorage`.
- The app must restore the saved pet on reload.
- The restored pet must preserve the pet name, vitals, and current state.
- The restored pet must preserve any additional progression state needed for recovery and evolution logic to continue correctly.
- The app must handle missing saved data without crashing.
- The app must handle malformed or outdated saved data safely, falling back to a valid default pet when needed.
- The app must display short reaction text tied to the pet's current condition and recent actions.
- The app must include a few lightweight Easter eggs or quirky reactions.

## UI Requirements

- The player must be able to tell that the pet state survived a reload.
- Reaction text must be visible on the main single-page interface.
- Personality details must not hide the pet vitals or action buttons.
- The interface must remain understandable on both desktop and mobile widths.

## Technical Requirements

- Persistence logic should be isolated in a small storage-focused module.
- Saved data should be typed and validated before use.
- The app should avoid writing invalid pet state into storage.
- The app should not require a backend for persistence.
- Reaction logic should be separated enough to test independently from the main UI when practical.
- The main persistence path should be covered by `Vitest` and at least one `Playwright` flow.

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

Phase 3 is complete when the pet survives reloads with the correct state restored, and the app includes visible personality touches that make interactions feel more expressive without expanding the project's scope.
