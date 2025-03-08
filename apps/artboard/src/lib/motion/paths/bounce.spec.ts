import { beforeEach, describe, expect, test } from "vitest";
import { Bounce } from "./bounce";

describe("Bounce", () => {
  let bounce: Bounce;

  beforeEach(() => {
    bounce = new Bounce(2);
  });
  test("adds", () => {
    expect(bounce.add(3)).toEqual(5);
  });
  test("greets", () => {
    expect(bounce.greet("world")).toEqual("Bounce says: hello to world");
  });
});
