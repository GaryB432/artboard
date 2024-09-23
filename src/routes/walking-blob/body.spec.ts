import { describe, expect, test } from "vitest";
import {
  bodyKeyframes,
  bodyOptions,
  headKeyframes,
  headOptions,
  leftFootKeyframes,
  leftFootOptions,
  leftHandKeyframes,
  leftHandOptions,
  rightFootKeyframes,
  rightFootOptions,
  rightHandKeyframes,
  rightHandOptions,
} from "./body";

describe("Body Keyframes", () => {
  test("body", () => {
    expect(bodyKeyframes()).toMatchInlineSnapshot(`
      [
        {
          "transform": "translateY(0)",
        },
        {
          "transform": "translateY(1rem)",
        },
      ]
    `);
  });
  test("head", () => {
    expect(headKeyframes()).toMatchInlineSnapshot(`
      [
        {
          "transform": "translateY(0)",
        },
        {
          "transform": "translateY(1rem)",
        },
      ]
    `);
  });
  test("leftFoot", () => {
    expect(leftFootKeyframes()).toMatchInlineSnapshot(`
      [
        {
          "transform": "scale(1)",
        },
        {
          "transform": "scale(.6)",
        },
      ]
    `);
  });
  test("leftHand", () => {
    expect(leftHandKeyframes()).toMatchInlineSnapshot(`
      [
        {
          "transform": "scale(.6)",
        },
        {
          "transform": "scale(1)",
        },
      ]
    `);
  });
  test("rightFoot", () => {
    expect(rightFootKeyframes()).toMatchInlineSnapshot(`
      [
        {
          "transform": "scale(.6)",
        },
        {
          "transform": "scale(1)",
        },
      ]
    `);
  });
  test("rightHand", () => {
    expect(rightHandKeyframes()).toMatchInlineSnapshot(`
      [
        {
          "transform": "scale(1)",
        },
        {
          "transform": "scale(.6)",
        },
      ]
    `);
  });
});

describe("Body Options", () => {
  test("body", () => {
    expect(bodyOptions()).toMatchInlineSnapshot(`
      {
        "delay": 15,
        "direction": "alternate",
        "duration": 350,
        "iterations": Infinity,
      }
    `);
  });
  test("head", () => {
    expect(headOptions()).toMatchInlineSnapshot(`
      {
        "delay": 105,
        "direction": "alternate",
        "duration": 350,
        "iterations": Infinity,
      }
    `);
  });
  test("leftFoot", () => {
    expect(leftFootOptions()).toMatchInlineSnapshot(`
      {
        "delay": 0,
        "direction": "alternate",
        "duration": 700,
        "iterations": Infinity,
      }
    `);
  });
  test("leftHand", () => {
    expect(leftHandOptions()).toMatchInlineSnapshot(`
      {
        "delay": 0,
        "direction": "alternate",
        "duration": 700,
        "iterations": Infinity,
      }
    `);
  });
  test("rightFoot", () => {
    expect(rightFootOptions()).toMatchInlineSnapshot(`
      {
        "delay": 0,
        "direction": "alternate",
        "duration": 700,
        "iterations": Infinity,
      }
    `);
  });
  test("rightHand", () => {
    expect(rightHandOptions()).toMatchInlineSnapshot(`
      {
        "delay": 0,
        "direction": "alternate",
        "duration": 700,
        "iterations": Infinity,
      }
    `);
  });
});
