# Phase 5 Requirements

## Functional Requirements

- The cleanup phase must preserve the current single-pet game loop and user-facing behavior.
- `Hunger`, `Happiness`, and `Energy` must continue to function exactly within the existing `0-100` rules.
- `Normal`, `Sick`, and `Evolved` state behavior must remain intact after cleanup.
- Persistence, naming, care actions, and pet reactions must continue to work after any refactor or file reduction.

## Code Quality Requirements

- Overly large or mixed-responsibility modules should be simplified only when the result is clearly easier to maintain.
- Unused code should be removed from the app, test suite, and supporting files where safe.
- Imports, constants, helpers, and styles should accurately reflect the code that is still in use.
- Cleanup should favor straightforward structure over clever abstractions.

## Documentation Requirements

- `README.md` must describe the current app honestly if implementation details have shifted from the earlier plan.
- Setup instructions must still match the project’s real commands and tooling.
- Project constraints must remain visible and consistent with the implemented scope.

## Technical Requirements

- Cleanup work must stay within the existing React, TypeScript, Vite, Tailwind CSS, `localStorage`, Vitest, and Playwright stack.
- Refactors must preserve or improve test readability rather than weaken coverage.
- The application must continue to build successfully after cleanup.
- Cleanup changes must not introduce new product scope.

## Validation Targets

- No dead code remains in the primary app flow.
- Large modules are only split if the result is genuinely clearer.
- README content matches the implemented experience.
- Core gameplay, persistence, and reactions still work after cleanup.

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

Phase 5 is complete when the current app remains stable, the codebase is leaner and easier to understand, unused pieces have been removed, and the README accurately reflects the product that now exists.
