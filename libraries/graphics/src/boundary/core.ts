import { Vector } from "@artboard/vector";

type Intersection = {
  segment: Segment;
  point: Vector;
};

export type Rectangle = {
  top: Segment;
  right: Segment;
  bottom: Segment;
  left: Segment;
};

export type Segment = { from: Vector; to: Vector };

export function makeRectangle(rect: DOMRect, padding = 0): Rectangle {
  return {
    top: {
      from: new Vector(rect.left + padding, rect.top + padding),
      to: new Vector(rect.right - padding, rect.top + padding),
    },
    right: {
      from: new Vector(rect.right - padding, rect.top + padding),
      to: new Vector(rect.right - padding, rect.bottom - padding),
    },
    bottom: {
      from: new Vector(rect.right - padding, rect.bottom - padding),
      to: new Vector(rect.left + padding, rect.bottom - padding),
    },
    left: {
      from: new Vector(rect.left + padding, rect.bottom - padding),
      to: new Vector(rect.left + padding, rect.top + padding),
    },
  };
}

export function pointOnLineAtAngle(
  startPoint: Vector,
  endPoint: Vector,
  angle: number,
  distance: number,
): Vector {
  // Calculate the direction vector

  const directionX = endPoint.x - startPoint.x;

  const directionY = endPoint.y - startPoint.y;
  const direction = endPoint.sub(startPoint);

  // Rotate the direction vector by the given angle

  const rotatedX = directionX * Math.cos(angle) - directionY * Math.sin(angle);

  const rotatedY = directionX * Math.sin(angle) + directionY * Math.cos(angle);

  const rotated = new Vector(rotatedX, rotatedY);

  // Calculate the new point based on the distance

  const newX = startPoint.x + rotatedX * distance;

  const newY = startPoint.y + rotatedY * distance;
  const nw = startPoint.clone().add(rotated.scale(distance));

  return nw;
}

// // Example usage:

// const start = { x: 0, y: 0 };

// const end = { x: 10, y: 0 };

// const angleInRadians = Math.PI / 4; // 45 degrees

// const newPoint = pointOnLineAtAngle(start, end, angleInRadians, 5);

// console.log(newPoint); // Output: { x: 5, y: 5 }

export function findLineIntersection(l1: Segment, l2: Segment): Vector | null {
  const int = checkLineIntersection(
    l1.from.x,
    l1.from.y,
    l1.to.x,
    l1.to.y,
    l2.from.x,
    l2.from.y,
    l2.to.x,
    l2.to.y,
  );
  console.log(int);
  // return int && int.x && int.y ? new Vector(int.x, int.y) : null;

  console.warn("only using segments you might want lines");
  const intersection = findSegmentIntersection(l1, l2);
  console.log(intersection);
  return intersection;
}

export function findSegmentIntersection(
  l1: Segment,
  l2: Segment,
): Vector | null {
  const int = findLineIntersectionSO(
    l1.from.x,
    l1.from.y,
    l1.to.x,
    l1.to.y,
    l2.from.x,
    l2.from.y,
    l2.to.x,
    l2.to.y,
  );
  // console.log(JSON.stringify({ l: [l1, l2], int }));

  return int ? new Vector(int.x, int.y) : null;
}

function findLineIntersectionSO(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
): { x: number; y: number } | null {
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denominator === 0) {
    return null; // Lines are parallel
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

  // console.log(JSON.stringify({ t, u }, undefined, 2));

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    const intersectionX = x1 + t * (x2 - x1);
    const intersectionY = y1 + t * (y2 - y1);
    return { x: intersectionX, y: intersectionY };
  } else {
    return null; // Lines do not intersect within the segments
  }
}
export function getBoundaryPoint(
  ray: Segment,
  rect: DOMRect,
): Intersection | null {
  const disRectangle: Record<string, Segment> = makeRectangle(rect);

  for (const segment of Object.values(disRectangle)) {
    const point = findLineIntersection(ray, segment);

    if (point) {
      return { segment, point };
    }
  }
  return null;
}

export function checkLineIntersection(
  // https://jsfiddle.net/justin_c_rounds/Gd2S2/light/
  line1StartX: number,
  line1StartY: number,
  line1EndX: number,
  line1EndY: number,
  line2StartX: number,
  line2StartY: number,
  line2EndX: number,
  line2EndY: number,
): { x: number | null; y: number | null; onLine1: boolean; onLine2: boolean } {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite)
  // and booleans for whether line segment 1 or line segment 2 contain the point
  const result: {
    x: number | null;
    y: number | null;
    onLine1: boolean;
    onLine2: boolean;
  } = {
    x: null,
    y: null,
    onLine1: false,
    onLine2: false,
  };
  var denominator, a, b, numerator1, numerator2;
  denominator =
    (line2EndY - line2StartY) * (line1EndX - line1StartX) -
    (line2EndX - line2StartX) * (line1EndY - line1StartY);
  if (denominator == 0) {
    return result;
  }
  a = line1StartY - line2StartY;
  b = line1StartX - line2StartX;
  numerator1 = (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
  numerator2 = (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  result.x = line1StartX + a * (line1EndX - line1StartX);
  result.y = line1StartY + a * (line1EndY - line1StartY);
  /*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
  // if line1 is a segment and line2 is infinite, they intersect if:
  if (a > 0 && a < 1) {
    result.onLine1 = true;
  }
  // if line2 is a segment and line1 is infinite, they intersect if:
  if (b > 0 && b < 1) {
    result.onLine2 = true;
  }
  // if line1 and line2 are segments, they intersect if both of the above are true
  return result;
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

export function scaleSegment(segment: Segment, percentage: number): Segment {
  if (percentage < 0 || percentage > 1) {
    throw new RangeError("Percentage must be between 0 and 1.");
  }

  const { from, to } = segment;

  const directionVector = Vector.fromPoints(from, to);
  const scaledVector = directionVector.scale(percentage);

  return { from, to: from.add(scaledVector) };
}
