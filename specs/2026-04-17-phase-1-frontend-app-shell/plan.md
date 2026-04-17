# Phase 1 Plan

## Goal

Set up the initial frontend app shell so the project can run as a React and TypeScript single-page application with a working Vite entry point.

## Outcome

By the end of Phase 1, the project should boot locally, render a minimal React app, and provide the base structure needed for later pet simulation work.

## Steps

### 1. Install and configure the app shell

- Add the Vite React and TypeScript setup
- Add the base HTML entry file
- Ensure the app mounts through the expected client entry point

### 2. Add base styling support

- Configure Tailwind CSS
- Add the initial stylesheet imports
- Confirm styles are applied in the running app

### 3. Create the first React render path

- Add the root app component
- Replace the current console-only boot logic with React rendering
- Show a minimal placeholder screen for the virtual pet app

### 4. Confirm development workflow

- Ensure the dev server starts cleanly
- Ensure the project builds successfully
- Keep the structure simple enough for Phase 2 to add the pet model

## Deliverables

- A working Vite-based React and TypeScript app
- Tailwind wired into the project
- A minimal `App` render path
- A clean starting point for the next roadmap phase

## Out Of Scope

- Pet stats or simulation rules
- Actions like `Feed`, `Play`, or `Rest`
- State transitions like `Sick` or `Evolved`
- Persistence with `localStorage`
- Tests beyond basic setup needs
