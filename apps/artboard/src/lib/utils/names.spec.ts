import { describe, it, expect } from "vitest";
import { names } from "./names";

describe("names", () => {
  it("should support class names", () => {
    expect(names("foo-bar").className).toEqual("FooBar");
    expect(names("foo_bar").className).toEqual("FooBar");
    expect(names("fooBar").className).toEqual("FooBar");
    expect(names("FooBar").className).toEqual("FooBar");
    expect(names("[fooBar]").className).toEqual("FooBar");
    expect(names("[...fooBar]").className).toEqual("FooBar");
    expect(names("foo-@bar").className).toEqual("FooBar");
    expect(names(" foo bar").className).toEqual("FooBar");
    expect(names("_foo_bar").className).toEqual("FooBar");
  });

  it("should support property names", () => {
    expect(names("foo-bar").propertyName).toEqual("fooBar");
    expect(names("foo_bar").propertyName).toEqual("fooBar");
    expect(names("fooBar").propertyName).toEqual("fooBar");
    expect(names("FooBar").propertyName).toEqual("fooBar");
    expect(names("[fooBar]").propertyName).toEqual("fooBar");
    expect(names("[...fooBar]").propertyName).toEqual("fooBar");
    expect(names("foo-@bar").propertyName).toEqual("fooBar");
    expect(names(" foo bar").propertyName).toEqual("fooBar");
    expect(names("_foo_bar").propertyName).toEqual("fooBar");
  });

  it("should support file names", () => {
    expect(names("foo-bar").fileName).toEqual("foo-bar");
    expect(names("foo_bar").fileName).toEqual("foo-bar");
    expect(names("fooBar").fileName).toEqual("foo-bar");
    expect(names("FooBar").fileName).toEqual("foo-bar");
    expect(names("[fooBar]").fileName).toEqual("[foo-bar]");
    expect(names("[...fooBar]").fileName).toEqual("[...foo-bar]");
    expect(names("foo-@bar").fileName).toEqual("foo-@bar");
    expect(names(" foo bar").fileName).toEqual("-foo-bar");
    expect(names("_foo_bar").fileName).toEqual("_foo-bar");
  });

  it("should support constant names", () => {
    expect(names("foo-bar").constantName).toEqual("FOO_BAR");
    expect(names("foo_bar").constantName).toEqual("FOO_BAR");
    expect(names("fooBar").constantName).toEqual("FOO_BAR");
    expect(names("FooBar").constantName).toEqual("FOO_BAR");
    expect(names("[fooBar]").constantName).toEqual("FOO_BAR");
    expect(names("[...fooBar]").constantName).toEqual("FOO_BAR");
    expect(names("foo-@bar").constantName).toEqual("FOO_BAR");
    expect(names(" foo bar").constantName).toEqual("FOO_BAR");
    expect(names("_foo_bar").constantName).toEqual("FOO_BAR");
    expect(names("FOO_BAR").constantName).toEqual("FOO_BAR");
  });
});
