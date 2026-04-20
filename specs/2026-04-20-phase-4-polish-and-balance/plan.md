# Phase 4 Plan

## Goal

Polish and balance the virtual pet experience so the loop feels fair, readable, and more intentional without expanding the product scope.

## Outcome

By the end of Phase 4, the pet should feel better tuned moment to moment, the visual distinction between `Normal`, `Sick`, and `Evolved` should be clearer, and the main edge cases around care, recovery, and evolution should behave predictably.

## Workstreams

### 1. Tune the simulation values

- Review tick decay values for `Hunger`, `Happiness`, and `Energy`
- Review action effects for `Feed`, `Play`, and `Rest`
- Adjust timing and values so the pet needs care regularly without feeling punishing
- Keep the evolution and sickness rules reachable but meaningful

### 2. Improve state readability

- Make `Normal`, `Sick`, and `Evolved` easier to distinguish at a glance
- Improve color, copy, and visual emphasis for each state
- Make sure the pet portrait, status badge, and supporting UI all reinforce the same current state

### 3. Check transition edge cases

- Verify repeated ticks near low-stat thresholds
- Verify rapid action sequences near upper stat limits
- Verify recovery behavior when the pet is barely meeting the threshold
- Verify evolution behavior when the pet is close to, reaches, or falls out of thriving conditions

### 4. Tighten the user experience

- Reduce any confusing or noisy UI elements
- Improve spacing, hierarchy, and feedback where needed
- Keep the app responsive and easy to scan on desktop and mobile

### 5. Expand confidence through testing

- Add or update tests for threshold edge cases
- Add or update tests for sickness and recovery boundaries
- Add or update tests for evolution boundaries
- Keep user-flow tests aligned with the tuned experience

## Suggested Implementation Order

1. Audit current tick and action values.
2. Adjust simulation numbers in small increments.
3. Review and refine state-specific UI cues.
4. Add edge-case tests for thresholds and transitions.
5. Recheck the feel of the full loop after the tuned values are in place.

## Out Of Scope

- New mechanics or new pet actions
- Persistence redesign
- New progression systems
- Additional pets or users
- Backend work
