import type { PageLoad } from "./$types";
import type { Point, Segment } from "./world/primitives";

export const load = (async ({ params, fetch }) => {
  const points: Point[] = [];
  const segments: Segment[] = [];

  return {
    points,
    segments,
  };
}) satisfies PageLoad;
