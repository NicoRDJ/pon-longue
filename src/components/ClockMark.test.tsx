import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ClockMark from "./ClockMark";

describe("ClockMark", () => {
  it("renders an accessible decorative clock", () => {
    render(<ClockMark />);
    expect(
      screen.getByRole("img", { name: /reloj decorativo/i }),
    ).toBeInTheDocument();
  });

  it("accepts and applies a custom className", () => {
    render(<ClockMark className="custom-class" />);
    expect(screen.getByRole("img")).toHaveClass("custom-class");
  });
});
