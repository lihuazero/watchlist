import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "../src/components/StatusBadge";

describe("StatusBadge", () => {
  it('renders the success label "API: Hello World" when ok', () => {
    render(<StatusBadge ok={true} label="API: Hello World" />);

    const badge = screen.getByTestId("backend-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("API: Hello World");
  });

  it('renders "Backend unavailable" when not ok', () => {
    render(<StatusBadge ok={false} label="Backend unavailable" />);

    const badge = screen.getByTestId("backend-status-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Backend unavailable");
  });
});
