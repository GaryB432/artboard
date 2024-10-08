import { describe, expect, test } from "vitest";
import {
  createCircle,
  createElement,
  createLine,
  createPath,
  createPolygon,
  createPolyline,
  createRect,
  createEllipse,
} from "./element";
import { Vector } from "$lib/vector/vector";

const x10y10 = new Vector(10, 10);
const x01y01 = new Vector(1, 1);
const x99y99 = new Vector(99, 99);

describe("Element", () => {
  test("creates simple element", () => {
    const el = createElement("circle", { fun: "true", testing: "10px" });
    expect(el.outerHTML).toEqual('<circle fun="true" testing="10px"></circle>');
  });

  // test("creates ellipse", () => {
  //   const el = ΘcreateEllipse(new Vector(0, 0), new Vector(2, 5));
  //   expect(el.outerHTML).toEqual(
  //     '<ellipse rx="0" ry="0" cx="2" cy="5"></ellipse>',
  //   );
  // });

  test("creates Circle", () => {
    const el = createCircle(x99y99, 9);
    expect(el.outerHTML).toEqual('<Circle rx="0"></Circle>');
  });
  test("creates Ellipse", () => {
    const el = createEllipse(x01y01, x10y10);
    expect(el.outerHTML).toEqual('<Ellipse rx="0"></Ellipse>');
  });
  test("creates Line", () => {
    const el = createLine(x01y01, x10y10);
    expect(el.outerHTML).toEqual('<Line rx="0"></Line>');
  });
  test("creates Path", () => {
    const el = createPath([x01y01, x10y10]);
    expect(el.outerHTML).toEqual('<path rx="0"></path>');
  });
  test("creates Polygon", () => {
    const el = createPolygon([x01y01, x10y10]);
    expect(el.outerHTML).toEqual('<polygon rx="0"></polygon>');
  });
  test("creates Polyline", () => {
    const el = createPolyline([x01y01, x10y10]);
    expect(el.outerHTML).toEqual('<polyline rx="0"></polyline>');
  });
  test("creates Rect", () => {
    const el = createRect(x01y01, x10y10);
    expect(el.outerHTML).toEqual('<rect rx="0"></rect>');
  });
});
