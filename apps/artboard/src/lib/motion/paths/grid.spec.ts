import { Vector } from "@artboard/vector";
import { beforeEach, describe, expect, test } from "vitest";
import { GridPath } from "./grid";

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
  let gridPath: GridPath;

  beforeEach(() => {
    const columns = 3;
    const starting = new Vector(2460, -3520);
    gridPath = new GridPath(
      { id: 0, pos: starting },
      new GDOMRect(30, 20, 800, 1600),
      columns,
    );
  });
  test.skip("creates short", () => {
    // expect(gridPath.create(2, 1).length).toEqual(2);

    /**
     *    ---------------------------------------
     *      --container--------------------------
     *        -- dot -- -- dot -- -- dot --
     *        -- dot -- -- dot -- -- dot --
     *        -- dot -- -- dot -- -- dot --
     *        -- dot -- -- dot --
     *    ---------------------------------------
     *
     */
    const [a, b] = gridPath.create(2, 4);

    // expect(res.map((m) => m.duration)).toEqual([900, 100]);
    expect(a.delay).toBeCloseTo(0);
    expect(a.duration).toBeCloseTo(900);

    expect(b.delay).toBeCloseTo(900);
    expect(b.duration).toBeCloseTo(100);

    // expect(a.to.x).toEqual(-1);
    expect(a.to.y).toEqual(-3500);

    expect(b.to.x).toEqual(405);
    // expect(b.to.y).toEqual(-1);

    // expect(res.at(1)?.to.distanceTo(new Vector(1570, 90))).toBeCloseTo(0);

    //   expect(res).toMatchInlineSnapshot(`
    //     [
    //       {
    //         "delay": 0,
    //         "duration": 900,
    //         "to": Vector {
    //           "x": 30,
    //           "y": -3520,
    //         },
    //       },
    //       {
    //         "delay": 900,
    //         "duration": 100,
    //         "to": Vector {
    //           "x": 50,
    //           "y": 0,
    //         },
    //       },
    //     ]
    //   `);
  });
});
