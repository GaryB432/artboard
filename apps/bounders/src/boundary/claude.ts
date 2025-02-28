import { Vector } from "../../../../libraries/vector/src";
import { Segment } from "./core";

/**
 * Creates a ray from a point with a given angle (in degrees)
 * @param origin Starting point of the ray
 * @param angleDegrees Angle in degrees (0 = right, 90 = up)
 * @param length Optional length of the ray segment
 * @returns An object with start and end points representing the ray
 */
export function createRay(
  origin: Vector,
  angleDegrees: number,
  length: number = 1000,
): Segment {
  const angleRadians = (angleDegrees * Math.PI) / 180;
  const direction = new Vector(
    Math.cos(angleRadians),
    -Math.sin(angleRadians), // Negate for canvas coordinates
  );

  return {
    from: origin,
    to: origin.add(direction.scale(length)),
  };
}

/**
 * Creates a line segment from a DOMRect edge (top, right, bottom, or left)
 * @param rect The DOMRect
 * @param edge Which edge to use: "top", "right", "bottom", or "left"
 * @returns Line segment represented by start and end vectors
 */
function createRectSegment(
  rect: DOMRect,
  edge: "top" | "right" | "bottom" | "left",
): Segment {
  switch (edge) {
    case "top":
      return {
        from: new Vector(rect.left, rect.top),
        to: new Vector(rect.right, rect.top),
      };
    case "right":
      return {
        from: new Vector(rect.right, rect.top),
        to: new Vector(rect.right, rect.bottom),
      };
    case "bottom":
      return {
        from: new Vector(rect.left, rect.bottom),
        to: new Vector(rect.right, rect.bottom),
      };
    case "left":
      return {
        from: new Vector(rect.left, rect.top),
        to: new Vector(rect.left, rect.bottom),
      };
  }
}

/**
 * Computes the intersection between a rectangle segment and a ray
 * @param rectSegment Line segment from a rectangle edge
 * @param ray Ray defined by origin point and direction
 * @returns The intersection point or null if no intersection
 */
function ΘcomputeIntersection(
  rectSegment: Segment,
  ray: Segment,
): Vector | null {
  const a = rectSegment.to.sub(rectSegment.from);
  const b = ray.to.sub(ray.from);
  const c = ray.from.sub(rectSegment.from);

  const denominator = b.y * a.x - b.x * a.y;
  console.log(JSON.stringify({ a, b, c, denominator, rectSegment, ray }));

  if (Math.abs(denominator) < 0.0001) {
    return null; // Lines are parallel
  }

  const t = (b.x * c.y - b.y * c.x) / denominator;
  const u = (a.x * c.y - a.y * c.x) / denominator;

  // Check if intersection is within segments
  if (t < 0 || t > 1 || u < 0) {
    console.log("out of segment");
    return null;
  }

  // Calculate intersection point
  return rectSegment.from.add(a.scale(t));
}

/**
 * Gets a point at a specific distance before the intersection point along ray's direction
 * @param distance Distance before the intersection
 * @param intersection The intersection point
 * @param ray The ray used to determine direction
 * @returns The point at the specified distance before intersection
 */
function getPointBefore(
  distance: number,
  intersection: Vector,
  ray: Segment,
): Vector {
  // Get unit vector in direction of ray
  const rayDirection = ray.to.sub(ray.from).normalize();

  // Calculate point before intersection
  return intersection.sub(rayDirection.scale(distance));
}

// // Example usage
// const rect = new DOMRect(10, 10, 100, 80); // x, y, width, height
// const topEdge = createRectSegment(rect, "top");
// const origin = new Vector(50, 50);
// const ray = createRay(origin, 45); // 45 degree angle

// const intersection = computeIntersection(topEdge, ray);
// if (intersection) {
//   const p1 = getPointBefore(1.5, intersection, ray);
//   console.log("Intersection:", intersection);
//   console.log("Point 1.5 units before intersection:", p1);
// } else {
//   console.log("No intersection found");
// }
