import { getRandomElementExcluding } from "$lib/utils/misc";
import { Vector } from "@artboard/vector";
import { makeRectangle, type Rectangle } from "@libraries/graphics";

export type EdgeName = keyof Rectangle;

export type Motion = {
  duration: number;
  to: Vector;
};

export function getBouncyPathForCircle(
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
      to,
      duration: duration / plenth,
    };
  });
}

export function getRandomPointOnLine(segment: {
  from: Vector;
  to: Vector;
}): Vector {
  const t = Math.random();
  const x = segment.from.x + t * (segment.to.x - segment.from.x);
  const y = segment.from.y + t * (segment.to.y - segment.from.y);
  return new Vector(x, y);
}
