import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  PRODUCTS,
  getProductBySlug,
  getProductsByCategory,
  hasLimitedStock,
  isFullyOutOfStock,
  isInStock,
  searchProducts,
} from "../inventory";

describe("inventory", () => {
  it("gives every product a slug unique within the catalogue", () => {
    const slugs = PRODUCTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("assigns every product to a category that exists", () => {
    const categorySlugs = new Set(CATEGORIES.map((c) => c.slug));
    for (const product of PRODUCTS) {
      expect(categorySlugs.has(product.category)).toBe(true);
    }
  });

  it("only marks sizes sold out that the product actually offers", () => {
    for (const product of PRODUCTS) {
      for (const soldOut of product.soldOutSizes) {
        expect(product.sizes).toContain(soldOut);
      }
    }
  });

  it("filters by category", () => {
    const jackets = getProductsByCategory("mens-jackets");
    expect(jackets.length).toBeGreaterThan(0);
    expect(jackets.every((p) => p.category === "mens-jackets")).toBe(true);
  });

  it("looks products up by slug", () => {
    expect(getProductBySlug("alpine-down-parka")?.name).toBe("Alpine Down Parka");
    expect(getProductBySlug("does-not-exist")).toBeUndefined();
  });

  it("searches by name and description, case-insensitively", () => {
    expect(searchProducts("parka").some((p) => p.slug === "alpine-down-parka")).toBe(true);
    expect(searchProducts("PARKA").some((p) => p.slug === "alpine-down-parka")).toBe(true);
    expect(searchProducts("")).toEqual([]);
  });

  it("reports stock per size", () => {
    const parka = getProductBySlug("alpine-down-parka")!;
    expect(isInStock(parka, "M")).toBe(false);
    expect(isInStock(parka, "L")).toBe(true);
  });

  it("distinguishes limited stock from fully out of stock", () => {
    const parka = getProductBySlug("alpine-down-parka")!;
    expect(hasLimitedStock(parka)).toBe(true);
    expect(isFullyOutOfStock(parka)).toBe(false);

    const shell = getProductBySlug("ridgeline-shell")!;
    expect(hasLimitedStock(shell)).toBe(false);
  });
});
