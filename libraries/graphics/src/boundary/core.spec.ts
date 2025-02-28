import { describe, expect, test } from "vitest";

import { makeRectangle } from "./core";

describe("Core", () => {
  test("makeRectangle", () => {
    const rh = 0;
    const rw = 0;
    expect(makeRectangle({ height: rh, width: rw })).toEqual({
      bottom: { from: { x: rw, y: rh }, to: { x: 0, y: rh } },
      left: { from: { x: 0, y: rh }, to: { x: 0, y: 0 } },
      right: { from: { x: rw, y: 0 }, to: { x: rw, y: rh } },
      top: { from: { x: 0, y: 0 }, to: { x: rw, y: 0 } },
    });
  });
});
