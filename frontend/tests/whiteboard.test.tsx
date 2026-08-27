import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Whiteboard } from "../src/components/Whiteboard";

// The real `tldraw` package requires browser APIs (canvas, ResizeObserver,
// IndexedDB) that jsdom doesn't provide. These tests only need to verify
// *our* wiring — that the canvas container renders and that the `Toolbar`
// slot override renders tldraw's own `DefaultToolbar` with
// `orientation="vertical"` — not tldraw's internal rendering/behavior, so
// the package is mocked with lightweight stubs.
vi.mock("tldraw", () => ({
  Tldraw: ({
    components,
    persistenceKey,
  }: {
    components?: { Toolbar?: () => React.ReactNode };
    persistenceKey?: string;
  }) => (
    <div data-testid="tldraw-mock" data-persistence-key={persistenceKey}>
      {components?.Toolbar ? components.Toolbar() : null}
    </div>
  ),
  DefaultToolbar: ({ orientation }: { orientation?: string }) => (
    <div data-testid="default-toolbar" data-orientation={orientation} />
  ),
}));

describe("Whiteboard", () => {
  let toolbarSlot: HTMLDivElement;

  beforeEach(() => {
    // Simulate the sidebar's toolbar slot container that `Sidebar` renders
    // in the real app — `Whiteboard` locates it via `document.querySelector`.
    toolbarSlot = document.createElement("div");
    toolbarSlot.setAttribute("data-testid", "sidebar-toolbar-slot");
    document.body.appendChild(toolbarSlot);
  });

  afterEach(() => {
    toolbarSlot.remove();
  });

  it("renders the tldraw canvas container with local persistence enabled", () => {
    render(<Whiteboard />);
    expect(screen.getByTestId("whiteboard-canvas")).toBeInTheDocument();
    expect(screen.getByTestId("tldraw-mock")).toHaveAttribute(
      "data-persistence-key",
      "openvelo-board",
    );
  });

  it("portals tldraw's own DefaultToolbar into the sidebar slot with a vertical orientation", async () => {
    render(<Whiteboard />);
    const toolbar = await screen.findByTestId("default-toolbar");
    expect(toolbar).toHaveAttribute("data-orientation", "vertical");
    expect(toolbarSlot).toContainElement(toolbar);
  });
});
