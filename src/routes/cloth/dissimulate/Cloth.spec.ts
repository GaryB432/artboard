import { beforeEach, describe, expect, test } from "vitest";
import { Cloth } from "./Cloth";

describe("Cloth", () => {
  let cloth: Cloth;
  beforeEach(() => {
    cloth = new Cloth(2);
  });
  test("adds", () => {
    expect(cloth.add(3)).toEqual(5);
  });
  test("greets", () => {
    expect(cloth.greet("world")).toEqual("Cloth says: hello to world");
  });
});
