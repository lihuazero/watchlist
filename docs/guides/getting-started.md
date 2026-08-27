---
type: guide
title: Getting Started with OpenVelo
description: How to install, run, test, and build the OpenVelo monorepo (backend + frontend) locally.
tags: [setup, onboarding, dev]
timestamp: 2026-08-27T08:55:00Z
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
3. **(Optional) Configure the frontend's backend URL.** The frontend reads
   `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3100`, matching the
   backend's default port) to perform a server-side connectivity check that
   is rendered as a status badge in the top bar. Copy the example file if
   you want to override it (e.g. when running the backend on a non-default
   port):
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
   See [Frontend](/architecture/frontend.md) for details.
4. **Run both apps together** for local development:
   ```bash
   npm run dev
   ```
   This starts the [backend](/architecture/backend.md) NestJS dev server at
   `http://localhost:3100` and the [frontend](/architecture/frontend.md)
   Next.js dev server at `http://localhost:3002` side by side via
   `concurrently`. Ctrl+C stops both.
5. **Verify the backend** by visiting/curling `http://localhost:3100/` — it
   should return the text `Hello World!`. The backend accepts requests from
   any origin (CORS is configured to allow all origins), so the frontend (or
   any other client) can call it without extra configuration.
6. **Verify the frontend** by opening `http://localhost:3002/` in a browser —
   it should show a page titled "OpenVelo" with a dark-themed persistent
   top bar ("Untitled Board" + a backend connectivity status badge +
   Save/Share buttons), a left sidebar rail showing tldraw's vertical
   toolbar, and an interactive tldraw whiteboard canvas filling the
   remaining space. If the backend from step 5 is running, the top bar
   badge should read **"API: Hello World!"**; if the backend is stopped,
   it should read **"Backend unavailable"** on the next page load (see
   [Frontend](/architecture/frontend.md) for exact expected content).
7. **Run tests for both workspaces**:
   ```bash
   npm test
   ```
   Runs the backend's Jest unit tests, then the frontend's Vitest tests
   (including an integration test that spawns the real backend to verify
   the connectivity check end-to-end).
8. **Build both workspaces** (production build):
   ```bash
   npm run build
   ```
9. **Work on a single workspace** instead of both, using `--workspace=<name>`:
   ```bash
   npm run start:dev --workspace=backend
   npm run dev --workspace=frontend
   npm run test:e2e --workspace=backend
   ```

# Citations

[1] [Root README.md](/../README.md)
[2] [Monorepo Structure](/architecture/monorepo.md)
