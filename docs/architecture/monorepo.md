---
type: architecture
title: OpenVelo Monorepo Structure
description: How the OpenVelo repository is organized into backend and frontend npm workspaces.
tags: [monorepo, workspaces, setup, infra]
timestamp: 2026-08-27T06:48:00Z
---

# Overview

OpenVelo is an npm **workspaces** monorepo with two packages that are developed
and released together:

* [`backend/`](/architecture/backend.md) — a NestJS (TypeScript) API.
* [`frontend/`](/architecture/frontend.md) — a Next.js (App Router, TypeScript,
  Tailwind CSS) web app.

Previously the repository root itself was the NestJS project (there was no
`backend/` folder). The NestJS source, config, and tests were moved into
`backend/` unmodified, and a new `frontend/` workspace was scaffolded
alongside it. A single root `package-lock.json` provisions dependencies for
both workspaces.

# Schema

Key files at the repository root that wire the monorepo together:

| File | Responsibility |
|------|-----------------|
| `package.json` | Declares the two npm `workspaces` (`backend`, `frontend`) and root scripts (`dev`, `build`, `test`, `lint`) that fan out to both workspaces via `--workspace=<name>`. |
| `package-lock.json` | Single lockfile covering both workspaces. |
| `setup.sh` | Provisioning script run in CI/dev containers; runs `npm ci` (falls back to `npm install`) from the repo root, which installs both workspaces. |
| `kilo.json` | Kilo agent tool-permission configuration for this repo (not part of the app runtime). |
| `README.md` | Top-level monorepo instructions (install, run both apps, run tests/build, target a single workspace). |

Each workspace keeps its own `package.json`, TypeScript config, lint config,
and tests — see [Backend](/architecture/backend.md) and
[Frontend](/architecture/frontend.md) for details.

# Examples

Root-level commands (run from the repository root):

```bash
npm install              # installs both workspaces from the root lockfile
npm run dev               # runs backend + frontend dev servers concurrently
npm test                  # backend Jest tests, then frontend Vitest tests
npm run build              # builds backend then frontend
npm run lint                # lints backend then frontend
```

Targeting a single workspace directly:

```bash
npm run start:dev --workspace=backend
npm run dev --workspace=frontend
npm run test:e2e --workspace=backend
```

# Citations

[1] [Root README.md](/../README.md)
