---
type: architecture
title: Frontend App (Next.js)
description: Structure of the OpenVelo Next.js frontend workspace and its current placeholder scaffold.
tags: [frontend, nextjs, ui]
timestamp: 2026-08-27T06:48:00Z
---

# Overview

The frontend is a Next.js (App Router) TypeScript app in `frontend/`, styled
with Tailwind CSS v4. It currently ships only a placeholder home page — the
real "whiteboard UI" (top bar, sidebar, canvas, etc.) is explicitly deferred
to follow-up work (see comments in `frontend/src/components/index.ts` and
`frontend/src/lib/utils.ts`). The frontend workspace does not yet call the
backend API; there is no API client wired up.

The dev server runs on port `3002` (`next dev -p 3002`), not the Next.js
default of `3000`, to avoid colliding with the backend on port `3000`.

# Schema

Key files:

| File | Responsibility |
|------|-----------------|
| `frontend/src/app/layout.tsx` | Root layout; sets page `<html>`/`<body>`, loads Geist fonts, and sets the `<title>`/`description` metadata ("OpenVelo"). |
| `frontend/src/app/page.tsx` | Home page (`/`) component; renders the current placeholder content. |
| `frontend/src/app/globals.css` | Global Tailwind import and CSS theme variables (background/foreground, light/dark). |
| `frontend/src/components/index.ts` | Empty placeholder barrel file — intended home for future reusable UI components (top bar, sidebar, canvas, etc.). |
| `frontend/src/lib/utils.ts` | Empty placeholder module — intended home for a future API client and shared frontend utilities. |
| `frontend/tests/page.test.tsx` | Vitest + React Testing Library test for the home page. |
| `frontend/package.json` | Frontend scripts (`dev` on port 3002, `build`, `start`, `lint`, `test`) and dependencies (Next.js, React, Tailwind, Vitest). |
| `frontend/next.config.ts` | Next.js configuration. |
| `frontend/vitest.config.ts` / `frontend/vitest.setup.ts` | Vitest test runner configuration. |

# User Perspective

## Navigation & Interaction

* Start the frontend dev server (`npm run dev --workspace=frontend`, or
  `npm run dev` from the repo root to start both apps) and open
  `http://localhost:3002/` in a browser.
* There is a single route, the home page (`/`). No navigation, links, forms,
  or buttons exist yet — the page is static and non-interactive.

## Expected Behavior

* The browser tab title reads **"OpenVelo"**.
* The page renders a centered layout with:
  * A heading: **"OpenVelo"**.
  * A paragraph: *"Frontend scaffold placeholder. The whiteboard UI is
    implemented in a later job."*
* The page supports light/dark color schemes based on OS preference
  (background/foreground colors swap; no toggle control exists).
* No network calls to the backend are made from this page.

## Visual Elements

| Element | Description |
|---------|--------------|
| `<h1>` "OpenVelo" | Page heading, bold, large text. |
| `<p>` placeholder text | Explains that the real UI is not implemented yet. |

# Examples

Run the frontend alone:

```bash
npm run dev --workspace=frontend    # http://localhost:3002
npm run test --workspace=frontend    # Vitest unit tests
npm run build --workspace=frontend   # production build
```

# Citations

[1] [frontend/src/app/page.tsx](/../frontend/src/app/page.tsx)
[2] [frontend/src/app/layout.tsx](/../frontend/src/app/layout.tsx)
[3] [frontend/package.json](/../frontend/package.json)
