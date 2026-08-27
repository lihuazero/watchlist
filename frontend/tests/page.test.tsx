import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

// `Home` renders the `Whiteboard` client component, which renders the real
// `tldraw` package. `tldraw` requires browser APIs (canvas, ResizeObserver,
// IndexedDB) that jsdom doesn't provide, so it is mocked here with a
// lightweight stub — this test only needs to confirm that `Home` renders
// the whiteboard canvas, not tldraw's internal behavior.
vi.mock("tldraw", () => ({
  Tldraw: () => <div data-testid="tldraw-mock" />,
  DefaultToolbar: () => null,
}));

describe("Home page", () => {
  it("renders the whiteboard canvas", () => {
    render(<Home />);
    expect(screen.getByTestId("whiteboard-canvas")).toBeInTheDocument();
  });
});
