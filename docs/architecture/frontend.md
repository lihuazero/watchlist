---
type: architecture
title: Frontend App (Next.js)
description: Structure of the OpenVelo Next.js frontend workspace, including the persistent dark-themed AppShell (top bar + sidebar) and canvas placeholder.
tags: [frontend, nextjs, ui]
timestamp: 2026-08-27T07:23:00Z
---

# Overview

The frontend is a Next.js (App Router) TypeScript app in `frontend/`, styled
with Tailwind CSS v4. It now ships a persistent dark-themed **AppShell**
(fixed top bar + fixed left sidebar rail) mounted once in the root layout,
so every route inherits it. The home page (`/`) renders only a full-bleed
canvas placeholder inside the shell's main content region — the real
whiteboard canvas and sidebar toolbar contents are explicitly deferred to
follow-up work (see comments in `frontend/src/components/Sidebar.tsx`).
The frontend workspace does not yet call the backend API; there is no API
client wired up (see `frontend/src/lib/utils.ts`).

The dev server runs on port `3002` (`next dev -p 3002`), not the Next.js
default of `3000`, to avoid colliding with the backend on port `3000`.

# Schema

Key files:

| File | Responsibility |
|------|-----------------|
| `frontend/src/app/layout.tsx` | Root layout; forces the `dark` class on `<html>`, sets `<body>` background/text colors, loads Geist fonts, sets `<title>`/`description` metadata ("OpenVelo"), and wraps `{children}` in [`AppShell`](#top-bar--sidebar-appshell). |
| `frontend/src/app/page.tsx` | Home page (`/`) component; renders a full-bleed `div` (`data-testid="canvas-placeholder"`) that will later host the whiteboard canvas. |
| `frontend/src/app/globals.css` | Global Tailwind import and CSS theme variables; now hardcoded to a single dark palette (`--background: #020617`, `--foreground: #f1f5f9`) — the previous OS-preference-based light/dark media query has been removed. |
| `frontend/src/components/AppShell.tsx` | Persistent page shell: renders `TopBar` + a flex row of `Sidebar` and a `<main data-testid="main-content">` region that renders route `children`. Mounted once in `layout.tsx`. |
| `frontend/src/components/TopBar.tsx` | Fixed top bar (`data-testid="top-bar"`): static "Untitled Board" title on the left, non-functional **Save** and **Share** buttons (with `lucide-react` icons) on the right. |
| `frontend/src/components/Sidebar.tsx` | Fixed-width (`w-16`) left sidebar rail (`data-testid="sidebar"`, `aria-label="Toolbar sidebar"`). Currently an empty placeholder container — a future job will embed the whiteboard library's own toolbar here. |
| `frontend/src/components/index.ts` | Barrel file exporting `AppShell`, `TopBar`, `Sidebar` for import via `@/components`. |
| `frontend/src/lib/utils.ts` | Empty placeholder module — intended home for a future API client and shared frontend utilities. |
| `frontend/tests/app-shell.test.tsx` | Vitest + RTL tests asserting the top bar title, Save/Share buttons, sidebar container, and main content region all render. |
| `frontend/tests/page.test.tsx` | Vitest + RTL test asserting the home page renders the `canvas-placeholder` container. |
| `frontend/package.json` | Frontend scripts (`dev` on port 3002, `build`, `start`, `lint`, `test`) and dependencies (Next.js, React, Tailwind, Vitest, `lucide-react` icons). |
| `frontend/next.config.ts` | Next.js configuration. |
| `frontend/vitest.config.ts` / `frontend/vitest.setup.ts` | Vitest test runner configuration. |

## Component Wiring

`layout.tsx` → `AppShell` → `TopBar` + `Sidebar` + `<main>{children}</main>`,
where `{children}` is whatever page the App Router renders for the current
route (currently only `page.tsx`, the canvas placeholder). Adding a new
route automatically inherits the top bar and sidebar without any extra
wiring — only the `<main>` content changes per-route.

# User Perspective

## Navigation & Interaction

* Start the frontend dev server (`npm run dev --workspace=frontend`, or
  `npm run dev` from the repo root to start both apps) and open
  `http://localhost:3002/` in a browser.
* There is a single route, the home page (`/`). It is wrapped in the
  persistent AppShell, which shows on every route. No links, forms, or
  page-level navigation exist yet.
* The top bar's **Save** and **Share** buttons are visible and focusable but
  currently non-functional (no click handlers) — clicking them does nothing.
* The sidebar rail is visible but has no icons or interactive elements yet.

## Expected Behavior

* The browser tab title reads **"OpenVelo"**.
* The whole app renders in a **dark theme** (near-black background
  `#020617`, light text `#f1f5f9`) regardless of OS color-scheme preference
  — there is no light/dark toggle.
* A fixed top bar spans the full width at the top, showing the text
  **"Untitled Board"** on the left and **Save**/**Share** buttons (each with
  an icon) on the right.
* A fixed, empty sidebar rail (dark, bordered) runs down the left edge below
  the top bar.
* The remaining space to the right of the sidebar is the main content
  region, which on the home page shows an empty full-bleed dark canvas
  placeholder (no visible content yet).
* No network calls to the backend are made from this page.

## Visual Elements

| Element | Description |
|---------|--------------|
| Top bar (`data-testid="top-bar"`) | Fixed header, full width, dark slate background, bottom border. |
| "Untitled Board" text | Static board title, left-aligned in the top bar. |
| Save button | Top bar, right side; icon + "Save" label; no-op click handler. |
| Share button | Top bar, right side; icon + "Share" label; no-op click handler. |
| Sidebar (`data-testid="sidebar"`) | Fixed-width (64px) left rail, dark background, right border; empty placeholder. |
| Main content (`data-testid="main-content"`) | Remaining flexible area to the right of the sidebar; renders the active page. |
| Canvas placeholder (`data-testid="canvas-placeholder"`) | Full-height/width empty dark `div` on the home page; future home of the whiteboard canvas. |

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
[3] [frontend/src/components/AppShell.tsx](/../frontend/src/components/AppShell.tsx)
[4] [frontend/src/components/TopBar.tsx](/../frontend/src/components/TopBar.tsx)
[5] [frontend/src/components/Sidebar.tsx](/../frontend/src/components/Sidebar.tsx)
[6] [frontend/package.json](/../frontend/package.json)
