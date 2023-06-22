import { Vector2 } from "three";
import { describe, expect, test } from "vitest";
import { upperLeft, type Shape } from "./shapes";

describe("Shapes", () => {
  test("upperLeft", () => {
    const s = new Vector2(369, 122);
    const b: Shape = {
      type: "rect",
      origin: new Vector2(375, 125),
      size: new Vector2(12, 6),
    };
    expect(upperLeft(b).equals(s)).toBeTruthy();
  });
});
