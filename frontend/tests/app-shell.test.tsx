import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppShell } from "../src/components/AppShell";

// `TopBar` is now an async Server Component (it awaits the backend
// connectivity check before rendering). React's client renderer (used by
// RTL under Vitest/jsdom) cannot render async components directly, so it
// is mocked here with a synchronous stub that preserves the pre-existing
// title/Save/Share markup these tests assert on. The connectivity badge's
// own rendering logic is covered separately in
// `status-badge.test.tsx` and `backend-status.test.ts`.
vi.mock("../src/components/TopBar", () => ({
  TopBar: () => (
    <header data-testid="top-bar">
      <span>Untitled Board</span>
      <div>
        <button type="button">Save</button>
        <button type="button">Share</button>
      </div>
    </header>
  ),
}));

describe("AppShell", () => {
  it("renders the top bar with the static board title", () => {
    render(<AppShell>content</AppShell>);
    expect(screen.getByText("Untitled Board")).toBeInTheDocument();
  });

  it("renders accessible Save and Share buttons", () => {
    render(<AppShell>content</AppShell>);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /share/i }),
    ).toBeInTheDocument();
  });

  it("renders the sidebar placeholder container", () => {
    render(<AppShell>content</AppShell>);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders the main content region containing children", () => {
    render(<AppShell>content</AppShell>);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("content");
  });
});
