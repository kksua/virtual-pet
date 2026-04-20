# Phase 4 Requirements

## Functional Requirements

- The pet loop must remain within the existing single-pet scope.
- `Hunger`, `Happiness`, and `Energy` must still stay within the `0-100` range.
- The tuned values for ticks and actions must still allow the pet to become `Sick`, recover, and evolve through the existing rules.
- Simulation changes must not break persistence or the current reaction system.

## UX Requirements

- `Normal`, `Sick`, and `Evolved` must be visually distinct at a glance.
- The interface must clearly communicate when the pet is struggling, stable, or thriving.
- The tuned loop must feel fair and understandable without requiring constant clicking.
- The app should remain readable and usable on both desktop and mobile widths.

## Technical Requirements

- Balance changes should be implemented through clear, centralized constants or rules where possible.
- Edge-case behavior around thresholds must be covered by tests.
- UI polish should preserve the current React and TypeScript structure rather than introducing unnecessary new systems.
- Existing persistence behavior must continue to work after tuning changes.

## Validation Targets

- Low-stat thresholds should behave consistently.
- Recovery thresholds should behave consistently.
- Evolution thresholds should behave consistently.
- Action spam should not create broken or contradictory states.

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

Phase 4 is complete when the pet loop feels better balanced, the three main states read clearly in the interface, and the edge cases around sickness, recovery, evolution, and stat bounds are covered and behaving reliably.
