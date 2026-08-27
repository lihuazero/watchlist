---
type: api
title: Backend API (NestJS)
description: Structure and endpoints of the OpenVelo NestJS backend workspace.
tags: [backend, nestjs, api]
timestamp: 2026-08-27T06:48:00Z
---

# Overview

The backend is a standard NestJS application living in `backend/`. It is
currently the default Nest starter (a single root module/controller/service)
extended with environment-based configuration (`@nestjs/config` + `joi`
validation), a wildcard CORS policy, and a configurable HTTP port. It
listens on port `3100` by default (sourced from the validated `PORT` env
var, see `backend/src/main.ts` and `backend/src/config/env.validation.ts`),
not the framework's original hardcoded `3000`.

This document is the map to extend as real endpoints, modules, and database
access are added — new controllers/providers should be registered in
`app.module.ts` (or a feature module imported by it) and documented here with
their routes.

# Schema

Key files:

| File | Responsibility |
|------|-----------------|
| `backend/src/main.ts` | App entrypoint; bootstraps the Nest application, enables CORS (allow all origins), and calls `app.listen(port)` using the validated `PORT` config value. |
| `backend/src/app.module.ts` | Root module; registers `ConfigModule.forRoot({ isGlobal: true, validationSchema })`, `AppController`, and `AppService`. New feature modules should be imported here. |
| `backend/src/config/env.validation.ts` | Joi validation schema for environment variables (`PORT`, `FRONTEND_ORIGIN`). |
| `backend/src/app.controller.ts` | Root HTTP controller. Currently exposes `GET /`. |
| `backend/src/app.service.ts` | Root service backing the controller; currently returns a static greeting. |
| `backend/test/app.e2e-spec.ts` | End-to-end test hitting the running Nest app over HTTP. |
| `backend/test/config.e2e-spec.ts` | End-to-end test covering the new CORS/config wiring. |
| `backend/.env.example` | Documents the `PORT` and `FRONTEND_ORIGIN` environment variables. |
| `backend/package.json` | Backend-local scripts (`start:dev`, `build`, `test`, `test:e2e`, `lint`) and dependencies (`@nestjs/*`, `joi`, `rxjs`, etc). |
| `backend/nest-cli.json` | Nest CLI configuration. |
| `backend/tsconfig.json` / `backend/tsconfig.build.json` | TypeScript compiler configuration for dev and build. |

## API Routes

| Method | Path | Handler | Description |
|--------|------|---------|--------------|
| `GET` | `/` | `AppController.getHello` (`backend/src/app.controller.ts`) | Returns the static string `"Hello World!"`. Placeholder root route from the Nest starter template; no real business endpoints exist yet. |

# Examples

Run the backend alone:

```bash
npm run start:dev --workspace=backend   # dev server with watch, http://localhost:3100
npm run test --workspace=backend         # unit tests (Jest)
npm run test:e2e --workspace=backend     # e2e tests against a running app
```

Example request/response:

```bash
curl http://localhost:3100/
# -> Hello World!
```

Environment variables (see `backend/.env.example`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3100` | Port the HTTP server listens on (validated via Joi at startup). |
| `FRONTEND_ORIGIN` | `http://localhost:3000` | Informational/log-only; does not restrict CORS. CORS allows all origins (`*`). |

# Citations

[1] [backend/src/app.controller.ts](/../backend/src/app.controller.ts)
[2] [backend/src/main.ts](/../backend/src/main.ts)
[3] [backend/src/config/env.validation.ts](/../backend/src/config/env.validation.ts)
[4] [backend/.env.example](/../backend/.env.example)
