import { beforeEach, describe, expect, test } from "vitest";
import { PlayButton, svgPaths } from "./play-button";

describe("PlayButton", (): void => {
  let playButton: PlayButton;
  beforeEach((): void => {
    customElements.define("test-play-button", PlayButton);
    playButton = new PlayButton();
  });
  test("getTransition", (): void => {
    expect(playButton.getTransition("playing")).toEqual({
      attributeName: "d",
      begin: "indefinite",
      calcMode: "spline",
      dur: "0.1s",
      fill: "freeze",
      from: svgPaths.pause,
      keySplines: ".4 0 1 1",
      repeatCount: "1",
      to: svgPaths.play,
    });
  });
});
