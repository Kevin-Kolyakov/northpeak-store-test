import { describe, expect, it } from "vitest";
import { isValidEmail, isValidPassword } from "../account";

describe("account", () => {
  it("accepts well-formed emails", () => {
    expect(isValidEmail("shopper@example.com")).toBe(true);
    expect(isValidEmail("shopper")).toBe(false);
    expect(isValidEmail("shopper@example")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });

  it("requires an 8-character minimum password", () => {
    expect(isValidPassword("longenough")).toBe(true);
    expect(isValidPassword("short")).toBe(false);
    expect(isValidPassword("")).toBe(false);
  });
});
