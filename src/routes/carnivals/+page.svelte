<script lang="ts">
  import EasingSelect from "$lib/components/EasingSelect.svelte";
  import PlayButton from "$lib/components/PlayButton.svelte";
  import type { EasingFunction } from "$lib/easings";
  import {
    clampShape,
    randomShape,
    upperLeft,
    type Shape,
    type ShapeType,
  } from "$lib/shapes";
  import { shuffle } from "$lib/utilities";
  import { onMount } from "svelte";
  import { Vector2 } from "three";

  interface Morph {
    fillStyle: string;
    from: Shape;
    isCircle: boolean;
    to: Shape;
  }

  let canvas: HTMLCanvasElement;
  let canvasSize: Vector2;
  let context: CanvasRenderingContext2D | null;
  let easing: EasingFunction = (n) => n;
  let loopDuration = 3000;
  let loopTimer: NodeJS.Timer;
  let playing = false;

  onMount(() => {
    context = canvas.getContext("2d");
    handleSize();
  });

  function lerpMorph(morf: Pick<Morph, "from" | "to">, amount: number): Shape {
    if (morf.from.type !== morf.to.type) {
      throw new Error("shouldn't lerp those");
    }

    const origin = morf.from.origin.clone().lerp(morf.to.origin, amount);
    const size = morf.from.size.clone().lerp(morf.to.size, amount);

    return {
      type: morf.from.type,
      origin,
      size,
    };
  }

  function handleSize() {
    const cp = canvas.parentElement;
    if (!cp) {
      return;
    }
    canvas.width = cp.offsetWidth;
    canvas.height = cp.offsetHeight - 8;
    canvasSize = new Vector2(canvas.width, canvas.height);
  }

  function moveSomeShapes() {
    if (!context) {
      return;
    }

    const morfs = shuffle(["blue", "red", "green", "yellow", "orange"])
      .map((fillStyle) => ({ fillStyle, isCircle: Math.random() < 0.5 }))
      .map<Morph>((js) => {
        const tipe: ShapeType = js.isCircle ? "arc" : "rect";
        const from = randomShape(tipe, canvasSize);
        const to = randomShape(tipe, canvasSize);
        return { from, to, ...js };
      });
    const duration = loopDuration * 0.7;
    let starttime: number;

    const drawFrame = (timer: number) => {
      if (!context) {
        return;
      }
      const runtime = timer - starttime;
      const progress = Math.min(runtime / duration, 1);
      const eased = easing(progress);
      context.clearRect(0, 0, canvasSize.x, canvasSize.y);
      for (const morf of morfs) {
        context.fillStyle = morf.fillStyle;
        context.beginPath();
        const shape = clampShape(lerpMorph(morf, eased), canvasSize);
        if (morf.isCircle) {
          let { x, y } = shape.origin;
          context.arc(x, y, shape.size.x, 0, 2 * Math.PI);
          context.fill();
        } else {
          const { x, y } = upperLeft(shape);
          const { x: w, y: h } = shape.size;
          context.fillRect(x, y, w, h);
        }
      }
      if (progress < 1) {
        requestAnimationFrame((timer) => drawFrame(timer));
      }
    };

    requestAnimationFrame((timer) => {
      starttime = timer;
      drawFrame(timer);
    });
  }
</script>

<svelte:head>
  <title>artboard - carnivals</title>
</svelte:head>

<div class="content">
  <div class="canvas-box">
    <canvas bind:this={canvas} />
  </div>
  <div class="button-box">
    <PlayButton
      on:toggle={(p) => {
        playing = p.detail.playing;
        if (p.detail.playing) {
          moveSomeShapes();
          loopTimer = setInterval(() => {
            moveSomeShapes();
          }, loopDuration);
        } else {
          clearInterval(loopTimer);
        }
      }}
    />
    <EasingSelect
      selected="easeOutElastic"
      on:selected={(evt) => {
        easing = evt.detail.easing;
      }}
    />
  </div>
  <input
    bind:value={loopDuration}
    disabled={playing}
    type="range"
    min="1000"
    max="5000"
    step="50"
  />
  <!-- <social-icons></social-icons> -->
</div>

<style>
  .content {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    height: 99%;
  }

  .canvas-box {
    border: 2px solid #ccc;
    width: 90vw;
    flex: 1;
  }

  .button-box {
    display: flex;
    gap: 0.5em;
    align-items: center;
    height: fit-content;
  }

  input[type="range" i] {
    appearance: auto;
    cursor: default;
    /* color: -internal-light-dark(rgb(16, 16, 16), rgb(255, 255, 255)); */
    color: rgb(16, 16, 16);
    padding: initial;
    border: initial;
    margin: 2px;
  }

  input[type="range"] {
    /* 
http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
-webkit-appearance: none;
*/
    width: 80vw;
    margin: 1em auto;
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
