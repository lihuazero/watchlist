import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Home page", () => {
  it("renders the canvas placeholder container", () => {
    render(<Home />);
    expect(screen.getByTestId("canvas-placeholder")).toBeInTheDocument();
  });
});
