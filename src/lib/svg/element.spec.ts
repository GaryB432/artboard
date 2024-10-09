import { Vector } from "$lib/vector/vector";
import { describe, expect, test } from "vitest";
import {
  createCircle,
  createElement,
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
  test("creates simple element", () => {
    const el = createElement("circle", { fun: "true", testing: "10px" }, {});
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
