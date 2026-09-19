import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(readFileSync(resolve(ROOT, "testbed.manifest.json"), "utf-8"));

// Mirrors FRICTION_CATEGORIES in friction/packages/shared/src/events.ts.
// Keep in sync by hand — this repo doesn't depend on that one.
const KNOWN_CATEGORIES = [
  "dead_click",
  "loop",
  "retry",
  "step_budget",
  "error_text",
  "modal_interrupt",
  "long_wait",
  "keyboard_trap",
  "ambiguous_label",
];

describe("testbed.manifest.json", () => {
  it("lists nine bugs, one per Friction detector category", () => {
    expect(manifest.bugs).toHaveLength(9);
    const categories = manifest.bugs.map((b: { category: string }) => b.category);
    expect(new Set(categories)).toEqual(new Set(KNOWN_CATEGORIES));
  });

  it("gives every bug a unique id", () => {
    const ids = manifest.bugs.map((b: { id: string }) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(manifest.bugs as { id: string; files: string[] }[])(
    "$id points at files that exist ($files)",
    (bug) => {
      for (const file of bug.files) {
        expect(existsSync(resolve(ROOT, file))).toBe(true);
      }
    },
  );
});
