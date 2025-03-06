import { Vector } from "@artboard/vector";
import { describe, expect, test } from "vitest";
import { getRandomPointOnLine } from "./motion";

describe("Motion", () => {
  test("getRandomPointOnLine", () => {
    const rp = getRandomPointOnLine({
      from: new Vector(10, 20),
      to: new Vector(30, 40),
    });
    expect(rp.x).toBeGreaterThanOrEqual(10);
    expect(rp.x).toBeLessThanOrEqual(30);
    expect(rp.y).toBeGreaterThanOrEqual(20);
    expect(rp.y).toBeLessThanOrEqual(40);
  });
});
