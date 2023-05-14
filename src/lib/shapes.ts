import { Vector } from "./Vector";
import { clamp, ranger, vectorMin } from "./utilities";

export type ShapeType = "arc" | "rect";

export type Shape = {
  type: ShapeType;
  origin: Vector;
  size: Vector;
};

export function clampVector(vector: Vector, boundary: Vector): Vector {
  const size = new Vector(
    clamp(vector.x, 0, boundary.x),
    clamp(vector.y, 0, boundary.y)
  );
  return size;
}

export function clampShape(shape: Shape, boundary: Vector): Shape {
  const size = clampVector(shape.size, boundary);
  return { ...shape, size };
}

export function randomShape(type: ShapeType, boundary: Vector): Shape {
  if (type === "arc") {
    const radius = Math.random() * (vectorMin(boundary) / 2);

    const origin = new Vector(
      ranger(radius, boundary.x - radius),
      ranger(radius, boundary.y - radius)
    );

    const size = new Vector(radius, radius);

    return { type, origin, size };
  }

  const size = new Vector(
    Math.random() * boundary.x,
    Math.random() * boundary.y
  );

  const two = new Vector(2, 2);

  const halfsize = size.clone().divide(two);

  const origin = new Vector(
    ranger(halfsize.x, boundary.x - halfsize.x),
    ranger(halfsize.y, boundary.y - halfsize.y)
  );

  return { type, origin, size };
}

export function upperLeft(shape: Shape): Vector {
  const x = shape.origin.x - shape.size.x / 2;
  const y = shape.origin.y - shape.size.y / 2;
  // if (x < 0 || y < 0) {
  //   console.warn("TODO keep in bounds (oob due to elastic easing)");
  // }
  return new Vector(x, y);
}
