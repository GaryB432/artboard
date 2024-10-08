import { describe, expect, test } from "vitest";
import { createElement } from "./element";

describe("Element", () => {
  test("creates simple element", () => {
    const el = createElement("circle", { fun: "true", testing: "10px" });
    expect(el.outerHTML).toEqual(
      '<circle fun="true" testing="10px"></circle>',
    );
  });
});
