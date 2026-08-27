---
type: guide
title: Getting Started with OpenVelo
description: How to install, run, test, and build the OpenVelo monorepo (backend + frontend) locally.
tags: [setup, onboarding, dev]
timestamp: 2026-08-27T06:48:00Z
---

# Steps

1. **Install dependencies** (installs both workspaces from the single root
   lockfile):
   ```bash
   npm install
   ```
2. **Run both apps together** for local development:
   ```bash
   npm run dev
   ```
   This starts the [backend](/architecture/backend.md) NestJS dev server at
   `http://localhost:3000` and the [frontend](/architecture/frontend.md)
   Next.js dev server at `http://localhost:3002` side by side via
   `concurrently`. Ctrl+C stops both.
3. **Verify the backend** by visiting/curling `http://localhost:3000/` — it
   should return the text `Hello World!`.
4. **Verify the frontend** by opening `http://localhost:3002/` in a browser —
   it should show a page titled "OpenVelo" with a placeholder heading and
   description text (see [Frontend](/architecture/frontend.md) for exact
   expected content).
5. **Run tests for both workspaces**:
   ```bash
   npm test
   ```
   Runs the backend's Jest unit tests, then the frontend's Vitest tests.
6. **Build both workspaces** (production build):
   ```bash
   npm run build
   ```
7. **Work on a single workspace** instead of both, using `--workspace=<name>`:
   ```bash
   npm run start:dev --workspace=backend
   npm run dev --workspace=frontend
   npm run test:e2e --workspace=backend
   ```

# Citations

[1] [Root README.md](/../README.md)
[2] [Monorepo Structure](/architecture/monorepo.md)
