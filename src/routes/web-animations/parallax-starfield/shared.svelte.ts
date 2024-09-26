import type { Vector2Tuple, Vector3Tuple } from "three";

export class Universe {
  size: Vector2Tuple = $state([0, 0]);
  starfields: Starfield[] = $state([]);
}

export class Starfield {
  depth = $state(0);
  stars: Star[] = $state([]);
}

export class Star {
  position: Vector3Tuple = $state([0, 0, 0]);
  constructor(position: Vector3Tuple) {
    this.position = position;
  }
}

export function createUniverse(
  size: Vector2Tuple,
  layerCount = 3,
  starCount = 5,
): Universe {
  const u = new Universe();
  u.size = size;

  const [width, height] = size;

  u.starfields = Array(layerCount)
    .fill(0)
    .map((_, depth) => {
      const field = new Starfield();
      field.depth = depth;
      field.stars = Array(starCount)
        .fill(0)
        .map<Star[]>(() => {
          const x = Math.round(Math.random() * width);
          const y = Math.round(Math.random() * height);
          const panelStars: Star[] = [];
          for (let s = 0; s < 2; s++) {
            panelStars.push(new Star([x + s * width, y, depth]));
          }

          return panelStars;
        })
        .flat();
      return field;
    });

  return u;
}
