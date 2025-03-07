import { Vector } from "@artboard/vector";
import type { Motion } from "./motion";

const boxSize = 50;

type Positioned = {
  id: number;
  pos: Vector;
};

export class GridPath {
  private columns: number;
  private container: DOMRectReadOnly;
  private from: Vector;
  private gridCorner: Vector;

  public constructor(
    item: Positioned,
    container: DOMRectReadOnly,
    columns: number,
  ) {
    this.from = item.pos;
    this.container = container;
    this.columns = columns;
    this.gridCorner = new Vector(
      // container.left + (container.width + columns * boxSize) / 2,
      container.left + container.width / 2 - (columns * boxSize) / 2,
      container.top,
    );
  }

  public create(steps: number, ndx: number): Motion[] {
    if (steps !== 2) {
      throw new RangeError("2 only for now");
    }
    const r = Math.floor(ndx / this.columns);
    const c = ndx % this.columns;

    // let last = this.from;
    // const sizedBox = new Vector(c * boxSize, r * boxSize);

    // let xwherewewere = this.from.x;
    // let ywherewewere = this.from.y;

    // const a = Array(length)
    //   .fill(null)
    //   .map<Motion>((_, i) => {
    //     // const lastPointWeWereAt = new Vector(xwherewewere, ywherewewere);
    //     const something =
    //       i % 2
    //         ? new Vector(xwherewewere, ywherewewere + sizedBox.y)
    //         : new Vector(xwherewewere + sizedBox.x, ywherewewere);
    //     const to = something;

    //     xwherewewere = to.x;
    //     ywherewewere = to.y;
    //     // console.log()
    //     return { delay: i * 500, duration: 500, to };
    //   })
    //   .map((m) => ({ ...m, to: m.to }));

    // const parkingSpot = new Vector(c * 50, r * 50);

    const totalDuration = 1000;
    const brake = 0.9;

    // console.log(sizedBox)

    const parkingSpot = new Vector(c * boxSize, r * boxSize);

    const b = [
      {
        to: new Vector(boxSize * c, this.from.y),
        duration: totalDuration * brake,
        delay: 0,
      },
      {
        to: new Vector(boxSize * c, this.container.top + boxSize * r),
        duration: totalDuration * (1.0 - brake),
        delay: totalDuration * brake,
      },
    ];
    const shifted = b.map((m) => ({ ...m, to: m.to.add(this.gridCorner) }));
    return shifted;
  }
}

// function v() {
//   const parkingSpot = new Vector(c * 50, r * 50).add(
//     containerTopLeft.scale(10),
//   );

//   const preJag = parkingSpot.add(
//     new Vector(
//       Math.random() * container.width + container.left,
//       Math.random() * container.height + container.top,
//     ),
//   );

//   const jag = 0.9;

//   return [
//     {
//       delay: 0,
//       duration: duration * jag,
//       to: preJag,
//     },
//     {
//       delay: duration * jag,
//       duration: duration * (1 - jag),
//       to: parkingSpot,
//     },
//   ];
// }
