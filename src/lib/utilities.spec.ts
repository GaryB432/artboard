import { Vector2 } from "three";
import { describe, expect, test } from "vitest";
import {
  clamp,
  fitToAspectRatio,
  lerp,
  ranger,
  shuffle,
  vectorMin,
} from "./utilities";

describe("Utilities", () => {
  test("shuffles", (): void => {
    const numbers = shuffle([1, 2, 3]);
    expect(numbers).toContain(1);
    expect(numbers).toContain(2);
    expect(numbers).toContain(3);
  });

  test("vectorMin", () => {
    expect(vectorMin(new Vector2(5, 6))).toEqual(5);
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

  test("fitToAspectRatio", (): void => {
    expect(
      fitToAspectRatio(new Vector2(1000, 600), new Vector2(16, 9)),
    ).toEqual(new Vector2(900, 506.25));
    expect(
      fitToAspectRatio(new Vector2(1000, 600), new Vector2(16, 9)).toArray(),
    ).toEqual([900, (900 / 16) * 9]);
    expect(
      fitToAspectRatio(new Vector2(400, 800), new Vector2(8.5, 11)),
    ).toEqual(new Vector2(360, (360 / 8.5) * 11));
  });

  test("fitToAspectRatio 2", (): void => {
    const res = fitToAspectRatio(new Vector2(1000, 600), new Vector2(16, 9));
    expect(res.x).toBeCloseTo(900);
    expect(res.y).toBeCloseTo(506.25);
  });
  test("fitToAspectRatio overflow y", (): void => {
    const res = fitToAspectRatio(new Vector2(100, 100), new Vector2(8, 20));
    expect(res.x).toBeCloseTo(36);
    expect(res.y).toBeCloseTo((36 / 8) * 20);
  });
});
