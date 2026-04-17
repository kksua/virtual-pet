# Mission

## Purpose

Build a small single-page virtual pet experience centered on care, feedback, and personality.

The project should feel alive through real-time stat decay, simple player actions, and visible pet state changes. The experience should be easy to understand in seconds, but still feel rewarding because the pet reacts to care in a way that feels personal.

## Product Promise

- One user cares for one pet.
- The pet has three living vitals: `Hunger`, `Happiness`, and `Energy`.
- Vitals run on a `0-100` scale and tick down over time.
- The player responds with three actions: `Feed`, `Play`, and `Rest`.
- The pet communicates its condition through `Normal`, `Sick`, and `Evolved` states.
- The pet includes a few quirky reactions or Easter eggs so it feels like a character, not just a dashboard.

## Design Principles

- Keep the loop simple enough to learn immediately.
- Make the pet's condition visually obvious at all times.
- Reward attentive care without requiring constant micromanagement.
- Prefer charm and clarity over feature volume.
- Keep scope tight so the core loop can be polished.

## Hard Boundaries

- No authentication
- No multiple users
- No multiple pets
- No inventories
- No currencies
- No mini-games
- No social features
- No notifications
- No admin features
- No complex evolution trees
- No permanent death mechanics

## Success Criteria

- A player can name their pet and begin caring for it quickly.
- Stat changes are easy to understand and feel responsive.
- The pet can become sick from neglect and recover through a clear recovery path.
- The pet can evolve through successful care using one defined evolution path.
- The full experience works as a single-page application with no backend dependency required for the core loop.
