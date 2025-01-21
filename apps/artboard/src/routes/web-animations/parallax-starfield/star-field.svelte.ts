import type { Vector3Tuple } from "three";

export class Starfield {
  left: number = $state(0);
  stars: Vector3Tuple[] = [];
  constructor(
    rect: Required<Pick<DOMRectInit, "width" | "height">>,
    starCount: number,
    distance: number,
  ) {
    const { width, height } = rect;
    this.stars.push(
      ...Array(starCount)
        .fill(undefined)
        .map<Vector3Tuple>(() => {
          const x = Math.round(Math.random() * width);
          const y = Math.round(Math.random() * height);
          const z = distance;
          return [x, y, z];
        }),
    );
  }
}