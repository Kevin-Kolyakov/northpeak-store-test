import { describe, expect, it } from "vitest";
import { PRODUCTS } from "../inventory";
import { SEED_REVIEWS, averageRating } from "../reviews";

describe("reviews", () => {
  it("only seeds reviews for products that exist", () => {
    const slugs = new Set(PRODUCTS.map((p) => p.slug));
    for (const slug of Object.keys(SEED_REVIEWS)) {
      expect(slugs.has(slug)).toBe(true);
    }
  });

  it("gives every product at least one seed review", () => {
    for (const product of PRODUCTS) {
      expect(SEED_REVIEWS[product.slug]?.length).toBeGreaterThan(0);
    }
  });

  it("averages ratings", () => {
    expect(averageRating([{ author: "A", rating: 4, title: "", body: "" }, { author: "B", rating: 5, title: "", body: "" }])).toBe(4.5);
    expect(averageRating([])).toBe(0);
  });
});
