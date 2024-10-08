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
  return createElement("ellipse", {
    rx: radii.x,
    ry: radii.y,
    cx: centers.x,
    cy: centers.y,
  });
}

export function createCircle(pos: Vector, radius: number): SVGCircleElement {
  return createElement("circle", {});
}
export function createEllipse(
  radii: Vector,
  centers: Vector,
): SVGEllipseElement {
  return createElement("ellipse", {});
}
export function createLine(start: Vector, end: Vector): SVGLineElement {
  return createElement("line", {});
}
export function createPath(points: Vector[]): SVGPathElement {
  return createElement("path", {});
}
export function createPolygon(points: Vector[]): SVGPolygonElement {
  return createElement("polygon", {});
}
export function createPolyline(points: Vector[]): SVGPolylineElement {
  return createElement("polyline", {});
}
export function createRect(
  pos: Vector,
  size: Vector,
  radius?: Vector,
): SVGRectElement {
  return createElement("rect", {});
}
