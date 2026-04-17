# Tech Stack

## Core Decision

Use a lightweight frontend-only stack that matches the project's intentionally small scope.

## Stack

- `TypeScript` for all application logic
- `React` for the single-page user interface
- `Vite` as the development server and build tool
- `Tailwind CSS` for styling
- `localStorage` for simple client-side persistence
- `Vitest` for simulation and logic tests
- `Playwright` for end-to-end user flow tests

## Why This Stack

- It keeps setup and maintenance small.
- It supports a fast feedback loop while building the pet simulation.
- It avoids unnecessary architecture for a one-user, one-pet experience.
- It works well for a single-page application with no authentication or backend systems.
- It gives us a clean path for both logic coverage and user-flow testing.

## App Structure Direction

- `src/index.ts` boots the app
- `src/` contains React components, simulation logic, and state helpers
- `specs/` holds product and planning documents

## Suggested Modules

- `pet.ts` for pet data, vitals, and state rules
- `actions.ts` for `Feed`, `Play`, and `Rest`
- `tick.ts` for time-based stat decay
- `components/` for the pet UI, vitals, controls, and reactions
- `ui-state.ts` for view-facing state helpers when needed
- `storage.ts` for saving and loading the single pet
- `tests/` or colocated test files for `Vitest`
- `e2e/` for `Playwright` flows

## Non-Goals For The Stack

- No backend or database
- No authentication provider
- No multiplayer/session architecture
- No heavy state-management library unless the app grows beyond the simple loop
- No complex animation or game engine

## Quality Bar

- Strong typing for pet data and state transitions
- Clear separation between simulation logic and React UI components
- Small, readable modules
- Easy local development and build steps
- Reliable automated coverage for both logic and main user flows
