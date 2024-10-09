import { Vector } from "$lib/vector/vector";
import { describe, expect, test } from "vitest";
import {
  createCircle,
  createEllipse,
  createLine,
  createPolygon,
  createPolyline,
  createRect,
} from "./element";

const x10y10 = new Vector(10, 10);
const x01y01 = new Vector(1, 1);
const x99y99 = new Vector(99, 99);

describe("Element", () => {
  test("creates Circle", () => {
    const el = createCircle(x99y99, 9);
    expect(el.outerHTML).toEqual('<circle cx="99" cy="99" r="9"></circle>');
  });
  test("creates Ellipse", () => {
    const el = createEllipse(x01y01, x10y10);
    expect(el.outerHTML).toEqual(
      '<ellipse rx="1" ry="1" cx="10" cy="10"></ellipse>',
    );
  });
  test("creates Line", () => {
    const el = createLine(x01y01, x10y10);
    expect(el.outerHTML).toEqual('<line x1="1" y1="1" x2="10" y2="10"></line>');
  });
  test("creates Polygon", () => {
    const el = createPolygon([x01y01, x10y10]);
    expect(el.outerHTML).toEqual('<polygon points="1,1 10,10"></polygon>');
  });
  test("creates blue Polygon", () => {
    const el = createPolygon([x01y01, x10y10], {
      stroke: "orange",
      strokeWidth: "3",
      fill: "blue",
    });
    expect(el.outerHTML).toEqual(
      '<polygon points="1,1 10,10" stroke="orange" stroke-width="3" fill="blue"></polygon>',
    );
  });
  test("creates Polyline", () => {
    const el = createPolyline([x01y01, x10y10]);
    expect(el.outerHTML).toEqual('<polyline points="1,1 10,10"></polyline>');
  });
  test("creates Rect", () => {
    const el = createRect(x01y01, x10y10);
    expect(el.outerHTML).toEqual(
      '<rect x="1" y="1" width="10" height="10"></rect>',
    );
  });
});
