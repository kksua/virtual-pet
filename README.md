# Virtual Pet

> A small, expressive single-page virtual pet game built with React, TypeScript, and a real-time care loop.

`virtual-pet` lets one player care for one animated pet through a lightweight system of ticking vitals, playful reactions, and state-based visual feedback.

## What Is Implemented

- `Living vitals`: `Hunger`, `Happiness`, and `Energy` live on a `0-100` scale and tick down over time.
- `Care loop`: `Feed`, `Play`, and `Rest` raise or lower the right vitals and keep the pet healthy.
- `Dynamic states`: The pet moves between `Normal`, `Sick`, and `Evolved` based on current care.
- `Personality`: The pet reacts with short chat-bubble lines, changing mood text, and a few Easter eggs tied to play patterns.
- `Visual feedback`: A custom SVG pet shifts across three main visual stages, including a sick variant and an energized evolved form.
- `Persistence`: The current pet name, vitals, progress, and state are saved in `localStorage`.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- `localStorage` for saved pet state
- Vitest for logic tests
- Playwright for user-flow tests

## Local Setup

Run everything from the `virtual-pet` directory:

```bash
cd virtual-pet
npm install
npm run dev
```

### Useful Scripts

- `npm run dev`
- `npm run build`
- `npm test`
- `npm run test:e2e`

## Project Scope

| Scope | Constraints |
| --- | --- |
| **Pet:** Naming, 1 user, 1 evolution, 1 recovery path | Authentication and multiple users, multiple pets, inventories, or currencies |
| **Stats (0-100):** Hunger, Happiness, Energy | Mini-games, social features, or notifications |
| **Actions:** Feed, Play, Rest | Admin features or complex evolutions |
| **States:** Normal, Sick, Evolved | Permanent death mechanics |

## Goal

Ship a polished MVP where the player can understand the pet’s needs quickly, respond with simple care actions, and enjoy strong visual and personality feedback without bloating the product scope.
