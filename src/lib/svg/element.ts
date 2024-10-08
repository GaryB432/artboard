import type { Vector } from "$lib/vector/vector";

export function createElement<K extends keyof SVGElementTagNameMap>(
  qualifiedName: K,
  attributes: Record<string, string | number> = {},
): SVGElementTagNameMap[K] {
  const ele = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName,
  );
  return addAttributes(ele, attributes);
}

export function addAttributes<K extends keyof SVGElementTagNameMap>(
  ele: SVGElementTagNameMap[K],
  attributes: Record<string, string | number>,
): SVGElementTagNameMap[K] {
  Object.entries(attributes).forEach(([k, v]) =>
    ele.setAttribute(k, v.toString()),
  );
  return ele;
}

export function ΘcreateEllipse(radii: Vector, centers: Vector) {
  return createElement("ellipse", {});
}

export function createCircle(pos: Vector, radius: number): SVGCircleElement {
  return createElement("circle", {
    x: pos.x,
    y: pos.y,
    r: radius,
  });
}
export function createEllipse(
  radii: Vector,
  centers: Vector,
): SVGEllipseElement {
  return createElement("ellipse", {
    rx: radii.x,
    ry: radii.y,
    cx: centers.x,
    cy: centers.y,
  });
}
export function createLine(start: Vector, end: Vector): SVGLineElement {
  return createElement("line", {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
  });
}
export function createPolygon(points: Vector[]): SVGPolygonElement {
  return createElement("polygon", { points: toPointString(points) });
}
export function createPolyline(points: Vector[]): SVGPolylineElement {
  return createElement("polyline", { points: toPointString(points) });
}
function toPointString(points: Vector[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function createRect(
  pos: Vector,
  size: Vector,
  radius?: Vector,
): SVGRectElement {
  const basics = {
    x: pos.x,
    y: pos.y,
    width: size.x,
    height: size.y,
  };
  if (radius) {
    Object.assign(basics, { rx: radius.x, ry: radius.y });
  }
  return createElement("rect", basics);
}
