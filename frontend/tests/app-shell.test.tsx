import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppShell } from "../src/components/AppShell";

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
