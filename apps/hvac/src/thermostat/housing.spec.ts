import { describe, expect, test } from "vitest";

import { curveToPath } from "./housing";

describe("Housing", () => {
  test("curveToPath", async () => {
    expect(curveToPath([1, 2, 3, 4, 5, 6])).toEqual("c 1 2 3 4 5 6");
  });
});
