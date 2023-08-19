import { beforeEach, describe, expect, test } from "vitest";
import { Toner } from "./toner";

describe("Toner", (): void => {
  let toner: Toner;
  beforeEach((): void => {
    toner = new Toner();
  });
  test("greets", (): void => {
    expect(2 + 2).toEqual(4);
  });
});
