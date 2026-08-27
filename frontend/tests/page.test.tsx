import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Home page", () => {
  it("renders the placeholder home page", () => {
    render(<Home />);
    expect(screen.getByText("OpenVelo")).toBeInTheDocument();
  });
});
