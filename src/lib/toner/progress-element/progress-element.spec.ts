import { beforeEach, describe, expect, test } from "vitest";
import { ProgressElement } from "./progress-element";

describe("ProgressElement", (): void => {
  let progressElement: ProgressElement;
  beforeEach((): void => {
    customElements.define("asdf-asdf", ProgressElement);
    progressElement = new ProgressElement();
  });
  test("getBarWidths", () => {
    progressElement.min = 0;
    progressElement.max = 8;
    progressElement.valueAsNumber = 3;
    expect(progressElement.getBarWidths()).toEqual([0.625, 0.375]);
  });
});
