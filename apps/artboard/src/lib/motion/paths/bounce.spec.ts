import { Vector } from "@artboard/vector";
import { beforeEach, describe, expect, test } from "vitest";
import { BouncePath } from "./bounce";

class GDOMRect implements DOMRectReadOnly {
  public constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number,
  ) {}

  public get bottom(): number {
    return this.y + this.height;
  }

  public get left(): number {
    return this.x;
  }

  public get right(): number {
    return this.x + this.width;
  }
  public get top(): number {
    return this.y;
  }

  public toJSON() {
    throw new Error("Method not implemented.");
  }
}

describe("GridPath", () => {
  let motions: BouncePath;

  beforeEach(() => {
    const starting = new Vector(500, 800);
    motions = new BouncePath(
      { id: 0, pos: starting, rad: 0 },
      new GDOMRect(30, 20, 800, 1600),
    );
  });
  test("creates short", () => {
    const subject = motions.create(8);

    expect(subject.length).toEqual(8);
  });
});
