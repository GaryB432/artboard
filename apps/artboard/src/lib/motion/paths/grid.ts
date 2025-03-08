import { Vector } from "@artboard/vector";
import type { Motion } from "../motion";

const boxSize = 75;

type Positioned = {
  id: number;
  pos: Vector;
};

export class GridPath {
  private columns: number;
  private from: Vector;
  private gridCorner: Vector;

  public constructor(
    item: Positioned,
    container: DOMRectReadOnly,
    columns: number,
  ) {
    this.columns = columns;
    this.gridCorner = new Vector(
      container.left + (container.width - columns * boxSize) / 2,
      container.top + boxSize,
    );
    this.from = item.pos.sub(this.gridCorner);
  }

  public create(steps: number, ndx: number): Motion[] {
    if (steps !== 2) {
      throw new RangeError("2 only for now");
    }
    const r = Math.floor(ndx / this.columns);
    const c = ndx % this.columns;

    const totalDuration = 1000;
    const brake = 0.6;

    const b = [
      {
        to: new Vector(boxSize * c, this.from.y),
        duration: totalDuration * brake,
        delay: 0,
      },
      {
        to: new Vector(boxSize * c, boxSize * r),
        duration: totalDuration * (1.0 - brake),
        delay: totalDuration * brake,
      },
    ];
    const shifted = b.map((m) => {
      const to = m.to.add(this.gridCorner);
      // console.log(this.gridCorner);
      return { ...m, to };
    });
    // const shifted = b;
    return shifted;
  }
}
