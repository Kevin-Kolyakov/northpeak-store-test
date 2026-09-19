import { describe, expect, it } from "vitest";
import { CHECKOUT_STEPS, stepIndex } from "../checkoutSteps";

describe("checkout steps", () => {
  it("starts at shipping and ends at confirm", () => {
    expect(CHECKOUT_STEPS[0].path).toBe("/checkout/shipping");
    expect(CHECKOUT_STEPS.at(-1)?.path).toBe("/checkout/confirm");
  });

  it("gives every step a unique path", () => {
    const paths = CHECKOUT_STEPS.map((s) => s.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("resolves a step's index by path", () => {
    expect(stepIndex("/checkout/payment")).toBe(2);
    expect(stepIndex("/checkout/nope")).toBe(-1);
  });
});
