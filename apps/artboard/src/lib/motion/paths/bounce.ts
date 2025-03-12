import type { EdgeName, Motion } from "$lib/motion/motion";
import { getRandomElementExcluding } from "$lib/utils/misc";
import { type Vector } from "@artboard/vector";
import { makeRectangle } from "@libraries/graphics";
import {
  getRandomPointOnLine,
  scaleSegment,
} from "@libraries/graphics/boundary/core";

function getBouncyPathForCircle(
  container: DOMRect,
  duration: number,
  plenth: number,
  radius: number,
): Motion[] {
  let fromEdge: EdgeName | null = null;
  return new Array(plenth).fill(0).map((_, i) => {
    const nextEdge = getRandomElementExcluding(
      ["top", "right", "bottom", "left"],
      fromEdge ? [fromEdge] : [],
    ) as EdgeName;

    fromEdge = nextEdge;

    const edge: EdgeName = nextEdge;

    const boundaryRect = makeRectangle(container, radius);

    const angle = Math.PI / 4;

    const to = getRandomPointOnLine(boundaryRect[edge]);

    return {
      angle,
      edge,
      delay: 0,
      to,
      duration: duration / plenth,
      easing: (t: number) => t,
    };
  });
}

type Positioned = {
  id: number;
  pos: Vector;
  rad: number;
};

export class BouncePath {
  private container: DOMRectReadOnly;
  private subject: Positioned;

  public constructor(item: Positioned, container: DOMRectReadOnly) {
    this.subject = item;
    this.container = container;
  }

  public create(steps: number): Motion[] {
    if (steps < 2) {
      throw new RangeError("need at least 2 steps to bounce");
    }
    const overallDuration = Math.random() * 5000 + 1000;
    const bounces = getBouncyPathForCircle(
      this.container,
      overallDuration,
      steps,
      this.subject.rad,
    );
    if (bounces.length > 1) {
      const lastMotions = bounces.slice(-2);
      const [a, b] = lastMotions;
      const stop = 0.5;
      const scaled = scaleSegment({ from: a.to, to: b.to }, stop);

      b.to = scaled.to;
      b.duration /= stop;

      // b.to = a.to.add(b.to);
      // b.duration *= 0.5;
    }

    // const dir =

    // lb.to = lb.to.sub(new Vector(20, 20));
    return bounces;
    // return [
    //   ...bounces,
    //   {
    //     to: new Vector(
    //       this.container.left + this.container.width / 2,
    //       this.container.top + this.container.height / 2,
    //     ),
    //     duration: 1000,
    //     delay: 0,
    //   },
    // ];
  }
}
