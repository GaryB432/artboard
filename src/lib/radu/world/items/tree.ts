import { getFake3dPoint, lerp, lerp2D, translate } from "../math/utils";
import type { Point } from "../primitives/point";
import { Polygon } from "../primitives/polygon";

export class Tree {
  base: Polygon;
  constructor(public center: Point, public size: number, public height = 200) {
    this.base = this.#generateLevel(center, size);
  }

  #generateLevel(point: Point, size: number): Polygon {
    const points = [];
    const rad = size / 2;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      const kindOfRandom = Math.cos(((a + this.center.x) * size) % 17) ** 2;
      const noisyRadius = rad * lerp(0.5, 1, kindOfRandom);
      points.push(translate(point, a, noisyRadius));
    }
    return new Polygon(points);
  }

  draw(ctx: CanvasRenderingContext2D, viewPoint: Point) {
    const top = getFake3dPoint(this.center, viewPoint, this.height);

    const levelCount = 7;
    for (let level = 0; level < levelCount; level++) {
      const t = level / (levelCount - 1);
      const point = lerp2D(this.center, top, t);
      const color = "rgb(30," + lerp(50, 200, t) + ",70)";
      const size = lerp(this.size, 40, t);
      const poly = this.#generateLevel(point, size);
      poly.draw(ctx, { fill: color, stroke: "rgba(0,0,0,0)" });
    }
  }
}
