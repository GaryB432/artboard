import { describe, expect, test } from "vitest";
import { Vector } from "./Vector";
import { clamp, lerp, ranger, shuffle, vectorMin } from "./utilities";

describe("Utilities", () => {
  test("shuffles", (): void => {
    const numbers = shuffle([1, 2, 3]);
    expect(numbers).toContain(1);
    expect(numbers).toContain(2);
    expect(numbers).toContain(3);
  });

  test("vectorMin", () => {
    expect(vectorMin(new Vector(5, 6))).toEqual(5);
  });

  test("ranger", () => {
    const r = ranger(10, 20);
    expect(r).toBeGreaterThan(10);
    expect(r).toBeLessThan(20);
  });

  test("clamps", (): void => {
    expect(clamp(1, 0, 10)).toEqual(1);
    expect(clamp(-1, 0, 10)).toEqual(0);
    expect(clamp(11, 0, 10)).toEqual(10);
  });

  test("lerps", (): void => {
    expect(lerp(1, 2, 0.5)).toEqual(1.5);
    expect(lerp(2, 1, 0.5)).toEqual(1.5);
  });
});
