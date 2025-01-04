import { Vector2 } from "three";
import { clamp, ranger, vectorMin } from "./utils/misc";

export type ShapeType = "arc" | "rect";

export type Shape = {
  origin: Vector2;
  size: Vector2;
  type: ShapeType;
};

export function clampVector(vector: Vector2, boundary: Vector2): Vector2 {
  const size = new Vector2(
    clamp(vector.x, 0, boundary.x),
    clamp(vector.y, 0, boundary.y),
  );
  return size;
}

export function clampShape(shape: Shape, boundary: Vector2): Shape {
  const size = clampVector(shape.size, boundary);
  return { ...shape, size };
}

export function randomShape(type: ShapeType, boundary: Vector2): Shape {
  if (type === "arc") {
    const radius = Math.random() * (vectorMin(boundary) / 2);

    const origin = new Vector2(
      ranger(radius, boundary.x - radius),
      ranger(radius, boundary.y - radius),
    );

    const size = new Vector2(radius, radius);

    return { type, origin, size };
  }

  const size = new Vector2(
    Math.random() * boundary.x,
    Math.random() * boundary.y,
  );

  const two = new Vector2(2, 2);

  const halfsize = size.clone().divide(two);

  const origin = new Vector2(
    ranger(halfsize.x, boundary.x - halfsize.x),
    ranger(halfsize.y, boundary.y - halfsize.y),
  );

  return { type, origin, size };
}

export function upperLeft(shape: Shape): Vector2 {
  const x = shape.origin.x - shape.size.x / 2;
  const y = shape.origin.y - shape.size.y / 2;
  // if (x < 0 || y < 0) {
  //   console.warn("TODO keep in bounds (oob due to elastic easing)");
  // }
  return new Vector2(x, y);
}
