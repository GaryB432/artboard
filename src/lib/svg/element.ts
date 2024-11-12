import { names } from "$lib/utils/names";
import type { Vector } from "$lib/vector/vector";

function createElement<K extends keyof SVGElementTagNameMap>(
  qualifiedName: K,
  attributes: Record<string, string | number> = {},
  style: Partial<CSSStyleDeclaration>,
): SVGElementTagNameMap[K] {
  const ele = document.createElementNS(
    "http://www.w3.org/2000/svg",
    qualifiedName,
  );
  return addPresentationAttributes(addAttributes(ele, attributes), style);
}

function addAttributes<K extends keyof SVGElementTagNameMap>(
  ele: SVGElementTagNameMap[K],
  attributes: Record<string, string | number>,
): SVGElementTagNameMap[K] {
  Object.entries(attributes).forEach(([k, v]) =>
    ele.setAttribute(k, v.toString()),
  );
  return ele;
}

function addPresentationAttributes<K extends keyof SVGElementTagNameMap>(
  ele: SVGElementTagNameMap[K],
  style: Partial<CSSStyleDeclaration>,
): SVGElementTagNameMap[K] {
  Object.entries(style).forEach(([k, v]) =>
    ele.setAttribute(names(k).fileName, v ? v.toString() : ""),
  );
  return ele;
}

export function createCircle(
  pos: Vector,
  radius: number,
  style: Partial<CSSStyleDeclaration> = {},
): SVGCircleElement {
  return createElement(
    "circle",
    {
      cx: pos.x,
      cy: pos.y,
      r: radius,
    },
    style,
  );
}
export function createEllipse(
  radii: Vector,
  centers: Vector,
  style: Partial<CSSStyleDeclaration> = {},
): SVGEllipseElement {
  return createElement(
    "ellipse",
    {
      rx: radii.x,
      ry: radii.y,
      cx: centers.x,
      cy: centers.y,
    },
    style,
  );
}
export function createLine(
  start: Vector,
  end: Vector,
  style: Partial<CSSStyleDeclaration> = {},
): SVGLineElement {
  return createElement(
    "line",
    {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    },
    style,
  );
}
export function createPolygon(
  points: Vector[],
  style: Partial<CSSStyleDeclaration> = {},
): SVGPolygonElement {
  return createElement("polygon", { points: toPointString(points) }, style);
}
export function createPolyline(
  points: Vector[],
  style: Partial<CSSStyleDeclaration> = {},
): SVGPolylineElement {
  return createElement("polyline", { points: toPointString(points) }, style);
}
function toPointString(points: Vector[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function createRect(
  pos: Vector,
  size: Vector,
  radius?: Vector,
  style: Partial<CSSStyleDeclaration> = {},
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
  return createElement("rect", basics, style);
}
