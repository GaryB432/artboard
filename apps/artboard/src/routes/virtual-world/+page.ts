import type { PageLoad } from "./$types";
import { Point, Segment } from "./world/primitives";

export const load = (async ({ params, fetch }) => {
  const points: Point[] = [
    new Point(10, 10),
    new Point(20, 20),
    new Point(30, 20),
  ];
  const segments: Segment[] = [
    new Segment(points[0], points[1]),
    new Segment(points[1], points[2]),
  ];

  return {
    points,
    segments,
  };
}) satisfies PageLoad;
