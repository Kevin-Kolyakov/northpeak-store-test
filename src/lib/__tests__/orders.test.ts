import { describe, expect, it } from "vitest";
import { orderTotal } from "../orders";

describe("orderTotal", () => {
  it("sums item prices", () => {
    expect(
      orderTotal([
        { slug: "a", name: "A", price: 100, size: "M" },
        { slug: "b", name: "B", price: 50, size: "L" },
      ]),
    ).toBe(150);
  });

  it("returns 0 for an empty order", () => {
    expect(orderTotal([])).toBe(0);
  });
});
