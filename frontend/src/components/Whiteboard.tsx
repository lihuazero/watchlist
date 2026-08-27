"use client";

import { createPortal } from "react-dom";
import { DefaultToolbar, Tldraw, type TLComponents } from "tldraw";
import "tldraw/tldraw.css";

/**
 * Interactive whiteboard canvas, backed by the tldraw SDK.
 *
 * Renders a single tldraw editor instance filling its parent container
 * (the AppShell's main content region). tldraw's own default toolbar is
 * kept completely unmodified — it is only repositioned: the `Toolbar` UI
 * slot is overridden to render tldraw's `DefaultToolbar` with
 * `orientation="vertical"`, portaled into the `sidebar-toolbar-slot`
 * container that lives inside `Sidebar` (a DOM sibling of this canvas).
 * Portaling relocates DOM nodes tldraw itself renders — no canvas/tool
 * state is introduced or duplicated outside of tldraw's own store.
 *
 * The sidebar's slot node is looked up directly (no React state/effect):
 * tldraw calls this `Toolbar` override during its own internal render,
 * which always happens well after `Whiteboard` and its sibling `Sidebar`
 * have both mounted, so the slot element is guaranteed to already exist in
 * the DOM whenever this function runs.
 *
 * Local persistence uses tldraw's built-in `persistenceKey` prop, which is
 * tldraw's supported out-of-the-box mechanism for autosaving to the
 * browser's local storage and restoring on refresh — no custom save/load
 * logic, external storage, or license configuration is added.
 */
export function Whiteboard() {
  const components: TLComponents = {
    Toolbar: () => {
      const toolbarSlot = document.querySelector<HTMLElement>(
        '[data-testid="sidebar-toolbar-slot"]',
      );
      return toolbarSlot
        ? createPortal(<DefaultToolbar orientation="vertical" />, toolbarSlot)
        : null;
    },
  };

  return (
    <div className="relative h-full w-full" data-testid="whiteboard-canvas">
      <Tldraw components={components} persistenceKey="openvelo-board" />
    </div>
  );
}
