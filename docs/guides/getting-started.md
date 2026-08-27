---
type: guide
title: Getting Started with OpenVelo
description: How to install, run, test, and build the OpenVelo monorepo (backend + frontend) locally.
tags: [setup, onboarding, dev]
timestamp: 2026-08-27T07:05:00Z
---

# Steps

1. **Install dependencies** (installs both workspaces from the single root
   lockfile):
   ```bash
   npm install
   ```
2. **(Optional) Configure backend environment variables.** The backend
   reads `PORT` and `FRONTEND_ORIGIN` (both have sensible defaults, so this
   step can be skipped for local dev). Copy the example file if you want to
   override them:
   ```bash
   cp backend/.env.example backend/.env
   ```
   See [Backend](/architecture/backend.md) for the full variable reference.
3. **Run both apps together** for local development:
   ```bash
   npm run dev
   ```
   This starts the [backend](/architecture/backend.md) NestJS dev server at
   `http://localhost:3100` and the [frontend](/architecture/frontend.md)
   Next.js dev server at `http://localhost:3002` side by side via
   `concurrently`. Ctrl+C stops both.
4. **Verify the backend** by visiting/curling `http://localhost:3100/` — it
   should return the text `Hello World!`. The backend accepts requests from
   any origin (CORS is configured to allow all origins), so the frontend (or
   any other client) can call it without extra configuration.
5. **Verify the frontend** by opening `http://localhost:3002/` in a browser —
   it should show a page titled "OpenVelo" with a dark-themed persistent
   top bar ("Untitled Board" + Save/Share buttons), a left sidebar rail
   showing tldraw's vertical toolbar, and an interactive tldraw whiteboard
   canvas filling the remaining space (see
   [Frontend](/architecture/frontend.md) for exact expected content).
6. **Run tests for both workspaces**:
   ```bash
   npm test
   ```
   Runs the backend's Jest unit tests, then the frontend's Vitest tests.
7. **Build both workspaces** (production build):
   ```bash
   npm run build
   ```
8. **Work on a single workspace** instead of both, using `--workspace=<name>`:
   ```bash
   npm run start:dev --workspace=backend
   npm run dev --workspace=frontend
   npm run test:e2e --workspace=backend
   ```

# Citations

[1] [Root README.md](/../README.md)
[2] [Monorepo Structure](/architecture/monorepo.md)
