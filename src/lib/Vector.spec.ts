import { beforeEach, describe, expect, test } from "vitest";
import { Vector } from "./Vector";

describe("Vector", (): void => {
  let vector: Vector;
  beforeEach((): void => {
    vector = new Vector(4, 3);
  });
  test("construct", (): void => {
    expect(vector).toBeDefined();
  });
  test("add", (): void => {
    const addend = vector.add(new Vector(2, 3));
    expect(addend).toBe(vector);
    expect(addend).toEqual(new Vector(6, 6));
  });
  test("sub", (): void => {
    const addend = vector.sub(new Vector(2, 3));
    expect(addend).toBe(vector);
    expect(addend).toEqual(new Vector(2, 0));
  });
  test("copy", (): void => {
    const addend = vector.copy(new Vector(2, 3));
    expect(addend).toBe(vector);
    expect(addend).toEqual(addend);
  });
  test("length", (): void => {
    expect(new Vector(4, 3).length()).toEqual(5);
  });
  test("clone", (): void => {
    const cloned = vector.clone();
    expect(cloned).not.toBe(vector);
    expect(cloned).toEqual(vector);
  });
  test("divide", (): void => {
    expect(
      vector.divide(new Vector(2, 2)).equals(new Vector(2, 1.5))
    ).toBeTruthy();
  });
  test("norm", (): void => {
    expect(new Vector(4, 3).norm().length()).toEqual(1);
  });
  test("mix .75", (): void => {
    const ev = vector.mix(new Vector(8, 6), 0.25);
    expect(ev.equals(new Vector(4 * 1.25, 3 * 1.25))).toBeTruthy();
  });
  test("mix", (): void => {
    const ev = vector.mix(new Vector(8, 6));
    expect(ev.equals(new Vector(6, 4.5))).toBeTruthy();
  });
  test("toString", () => {
    expect(new Vector(123, 456).toString()).toEqual("(123,456)");
  });
});
