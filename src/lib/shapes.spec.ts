import { describe, expect, test } from "vitest";
import { Vector } from "./Vector";
import { upperLeft, type Shape } from "./shapes";

describe("Shapes", () => {
  test("upperLeft", () => {
    const s = new Vector(369, 122);
    const b: Shape = {
      type: "rect",
      origin: new Vector(375, 125),
      size: new Vector(12, 6),
    };
    expect(upperLeft(b).equals(s)).toBeTruthy();
  });
});
