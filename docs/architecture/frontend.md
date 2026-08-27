---
type: architecture
title: Frontend App (Next.js)
description: Structure of the OpenVelo Next.js frontend workspace, including the persistent dark-themed AppShell (top bar + sidebar) and the tldraw-backed whiteboard canvas with a vertical toolbar.
tags: [frontend, nextjs, ui, tldraw]
timestamp: 2026-08-27T08:56:00Z
---

# Overview

The frontend is a Next.js (App Router) TypeScript app in `frontend/`, styled
with Tailwind CSS v4. It ships a persistent dark-themed **AppShell** (fixed
top bar + fixed left sidebar rail) mounted once in the root layout, so every
route inherits it. The home page (`/`) renders a full-bleed, interactive
**whiteboard canvas** backed by the [tldraw](https://tldraw.dev) SDK inside
the shell's main content region. tldraw's own default toolbar is kept
completely unmodified — it is only repositioned into the left sidebar rail
and reoriented to a vertical layout via tldraw's supported `Toolbar`
component override plus a React portal (see `frontend/src/components/Whiteboard.tsx`).
The frontend calls the backend API for one thing so far: a server-side
connectivity check performed by `TopBar` on every page load (see below) —
`frontend/src/lib/utils.ts` remains an empty placeholder for future shared
utilities unrelated to this check.

The dev server runs on port `3002` (`next dev -p 3002`), not the Next.js
default of `3000`, to avoid colliding with the backend on port `3000`.

The top bar also renders a small backend connectivity status badge next to
the "Untitled Board" title. `TopBar` is an async Server Component that
awaits a server-side `GET /` request to the NestJS backend (base URL from
`NEXT_PUBLIC_API_URL`) on every page load, embedding the resolved badge text
directly in the HTML sent to the browser — see
[`frontend/src/lib/backend-status.ts`](/../frontend/src/lib/backend-status.ts) and
[`frontend/src/components/StatusBadge.tsx`](/../frontend/src/components/StatusBadge.tsx).

# Schema

Key files:

| File | Responsibility |
|------|-----------------|
| `frontend/src/app/layout.tsx` | Root layout; forces the `dark` class on `<html>`, sets `<body>` background/text colors, loads Geist fonts, sets `<title>`/`description` metadata ("OpenVelo"), and wraps `{children}` in [`AppShell`](/../frontend/src/components/AppShell.tsx). |
| `frontend/src/app/page.tsx` | Home page (`/`) component; a lightweight Server Component wrapper that renders the client-side [`Whiteboard`](/../frontend/src/components/Whiteboard.tsx) component. |
| `frontend/src/app/globals.css` | Global Tailwind import and CSS theme variables; now hardcoded to a single dark palette (`--background: #020617`, `--foreground: #f1f5f9`) — the previous OS-preference-based light/dark media query has been removed. |
| `frontend/src/components/AppShell.tsx` | Persistent page shell: renders `TopBar` + a flex row of `Sidebar` and a `<main data-testid="main-content">` region that renders route `children`. Mounted once in `layout.tsx`. |
| `frontend/src/components/TopBar.tsx` | Fixed top bar (`data-testid="top-bar"`), now an **async** Server Component: static "Untitled Board" title on the left plus a backend connectivity [`StatusBadge`](/../frontend/src/components/StatusBadge.tsx) (`await getBackendStatus()`), and non-functional **Save** and **Share** buttons (with `lucide-react` icons) on the right. |
| `frontend/src/components/StatusBadge.tsx` | Small, synchronous, presentational pill (`data-testid="backend-status-badge"`) rendering either `"API: <backend text>"` (muted/subtle styling) on success or `"Backend unavailable"` (warning/error tint) on failure. Takes already-resolved `ok`/`label` props — contains no fetch logic itself so it can be unit-tested directly under Vitest. |
| `frontend/src/components/Sidebar.tsx` | Fixed-width (`w-16`) left sidebar rail (`data-testid="sidebar"`, `aria-label="Toolbar sidebar"`). Contains an empty slot container (`data-testid="sidebar-toolbar-slot"`) that `Whiteboard` portals tldraw's vertical toolbar into at runtime. Stays a plain Server Component — it renders no tldraw code itself. |
| `frontend/src/components/Whiteboard.tsx` | Client Component (`"use client"`) that renders the tldraw `<Tldraw>` editor filling the main content region, with local persistence via tldraw's built-in `persistenceKey="openvelo-board"` prop. Overrides the `Toolbar` UI slot to render tldraw's own unmodified `DefaultToolbar` with `orientation="vertical"`, portaled (via `react-dom`'s `createPortal`) into the `Sidebar`'s `sidebar-toolbar-slot` container. |
| `frontend/src/components/index.ts` | Barrel file exporting `AppShell`, `TopBar`, `Sidebar`, `StatusBadge`, `Whiteboard` for import via `@/components`. |
| `frontend/src/lib/backend-status.ts` | `getBackendStatus()` — server-side connectivity check. Fetches `NEXT_PUBLIC_API_URL` (the backend's `GET /` route) with `cache: "no-store"`; never throws — any failure (missing config, network error, non-2xx status, empty body) resolves to `{ ok: false }` instead. |
| `frontend/src/lib/utils.ts` | Empty placeholder module — intended home for future shared frontend utilities. |
| `frontend/.env.example` | Documents `NEXT_PUBLIC_API_URL` (default `http://localhost:3100`). Committed to git (unlike `.env.local`). |
| `frontend/.env.local` | Local override of `NEXT_PUBLIC_API_URL` read by `next dev`/`next build`. Gitignored. |
| `frontend/tests/app-shell.test.tsx` | Vitest + RTL tests asserting the top bar title, Save/Share buttons, sidebar container, and main content region all render. `TopBar` (now async) is mocked with a synchronous stub, since Vitest/RTL cannot render async Server Components directly. |
| `frontend/tests/status-badge.test.tsx` | Vitest + RTL tests asserting `StatusBadge` renders `"API: Hello World"` when `ok` and `"Backend unavailable"` when not. |
| `frontend/tests/backend-status.test.ts` | Vitest unit tests for `getBackendStatus()` with a mocked global `fetch` — covers success, rejection, non-2xx, empty body, and missing-config cases. |
| `frontend/tests/backend-status.integration.test.ts` | Integration test that spawns the real NestJS backend (via `ts-node`) on an ephemeral port and calls `getBackendStatus()` directly against it — no UI rendering involved. |
| `frontend/tests/page.test.tsx` | Vitest + RTL test asserting the home page renders the `Whiteboard` canvas. |
| `frontend/tests/whiteboard.test.tsx` | Vitest + RTL tests (with `tldraw` mocked) asserting the canvas container renders and that the `Toolbar` override renders tldraw's `DefaultToolbar` with `orientation="vertical"`. |
| `frontend/package.json` | Frontend scripts (`dev` on port 3002, `build`, `start`, `lint`, `test`) and dependencies (Next.js, React, Tailwind, Vitest, `lucide-react` icons, `tldraw`). |
| `frontend/next.config.ts` | Next.js configuration. |
| `frontend/vitest.config.ts` / `frontend/vitest.setup.ts` | Vitest test runner configuration. |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3100` | Base URL of the NestJS backend, used by `getBackendStatus()` to call the backend's `GET /` route directly from the server during page rendering. Configured via `frontend/.env.local` (see `frontend/.env.example`). |

## Component Wiring

`layout.tsx` → `AppShell` → `TopBar` + `Sidebar` + `<main>{children}</main>`,
where `{children}` is whatever page the App Router renders for the current
route (currently only `page.tsx`, which renders `Whiteboard`). Adding a new
route automatically inherits the top bar and sidebar without any extra
wiring — only the `<main>` content changes per-route. `Whiteboard` locates
`Sidebar`'s `sidebar-toolbar-slot` DOM node at mount time (via
`document.querySelector`) and portals tldraw's vertical toolbar into it —
`Sidebar` and `Whiteboard` share no props, context, or React state; the only
coupling is the `data-testid="sidebar-toolbar-slot"` DOM contract between
them. `TopBar` awaits `getBackendStatus()` directly and passes the resolved
`ok`/`label` values as props into `StatusBadge` — `StatusBadge` itself
performs no fetching and shares no other coupling with `TopBar`.

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
* Next to the "Untitled Board" title, a small badge shows backend
  connectivity status: **"API: Hello World!"** when the backend is
  reachable, or **"Backend unavailable"** if it isn't (backend not running,
  network error, non-2xx response, etc.). This is resolved server-side
  before the page is sent to the browser — no loading state or client-side
  request is visible.
* The sidebar rail shows tldraw's default toolbar laid out vertically:
  Select, Hand, Draw, Eraser, Arrow, Text, shape tools, Sticky Note, Frame,
  and Image/media insertion, plus tldraw's other built-in tools. Clicking
  any tool activates it on the canvas with tldraw's standard behavior.
* The canvas supports all of tldraw's built-in interactions out of the box:
  multi-select, zoom/pan, undo/redo, the style panel, context menus, and
  keyboard shortcuts.
* Content drawn on the board (shapes, text, sticky notes, etc.) is
  automatically persisted to the browser's local storage via tldraw's
  built-in `persistenceKey` prop and restored on refresh — no explicit save
  action is required.

## Expected Behavior

* The browser tab title reads **"OpenVelo"**.
* The whole app renders in a **dark theme** (near-black background
  `#020617`, light text `#f1f5f9`) regardless of OS color-scheme preference
  — there is no light/dark toggle. (tldraw's own canvas UI uses its default
  theme, independent of the app shell's palette.)
* A fixed top bar spans the full width at the top, showing the text
  **"Untitled Board"** on the left (with the backend connectivity badge
  next to it) and **Save**/**Share** buttons (each with an icon) on the
  right. The top bar always stays visible above the canvas.
* A fixed sidebar rail (dark, bordered) runs down the left edge below the
  top bar, hosting tldraw's default toolbar in a vertical orientation.
* The remaining space to the right of the sidebar is the main content
  region, which on the home page shows the interactive tldraw whiteboard
  canvas, filling the region immediately on page load.
* The board is single-user and local only: no login, no multi-user
  sync/collaboration. The only network call to the backend is the
  server-side connectivity check that produces the top bar's status badge —
  no other network calls to the backend are made from this page.

## Visual Elements

| Element | Description |
|---------|--------------|
| Top bar (`data-testid="top-bar"`) | Fixed header, full width, dark slate background, bottom border. |
| "Untitled Board" text | Static board title, left-aligned in the top bar. |
| Backend status badge (`data-testid="backend-status-badge"`) | Small pill next to the title: muted slate styling reading `"API: <backend text>"` on success, or a red/warning-tinted pill reading `"Backend unavailable"` on failure. Resolved server-side before the page renders. |
| Save button | Top bar, right side; icon + "Save" label; no-op click handler. |
| Share button | Top bar, right side; icon + "Share" label; no-op click handler. |
| Sidebar (`data-testid="sidebar"`) | Fixed-width (64px) left rail, dark background, right border; hosts tldraw's vertical toolbar via a portaled `sidebar-toolbar-slot` container. |
| Main content (`data-testid="main-content"`) | Remaining flexible area to the right of the sidebar; renders the active page. |
| Whiteboard canvas (`data-testid="whiteboard-canvas"`) | Full-height/width interactive tldraw canvas on the home page — draw, add text/sticky notes/shapes/images, pan/zoom, undo/redo. |

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
[6] [frontend/src/components/Whiteboard.tsx](/../frontend/src/components/Whiteboard.tsx)
[7] [frontend/src/components/StatusBadge.tsx](/../frontend/src/components/StatusBadge.tsx)
[8] [frontend/src/lib/backend-status.ts](/../frontend/src/lib/backend-status.ts)
[9] [frontend/package.json](/../frontend/package.json)
