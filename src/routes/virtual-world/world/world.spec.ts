import { beforeEach, describe, expect, test } from "vitest";
import { World } from "./world";

describe("World", () => {
  let world: World;
  beforeEach(() => {
    world = new World(2);
  });
  test("adds", () => {
    expect(world.add(3)).toEqual(5);
  });
  test("greets", () => {
    expect(world.greet("world")).toEqual("World says: hello to world");
  });
});
