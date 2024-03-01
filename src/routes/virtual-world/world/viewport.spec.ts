import { beforeEach, describe, expect, test } from "vitest";
import { Viewport } from "./viewport";

describe("Viewport", () => {
  let viewport: Viewport;
  beforeEach(() => {
    viewport = new Viewport(2);
  });
  test("adds", () => {
    expect(viewport.add(3)).toEqual(5);
  });
  test("greets", () => {
    expect(viewport.greet("world")).toEqual("Viewport says: hello to world");
  });
});
