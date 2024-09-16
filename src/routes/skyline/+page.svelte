<script lang="ts">
  // http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
  import { fitToAspectRatio } from "$lib/utilities";
  import { onMount } from "svelte";
  import { Vector2 } from "three";
  import { layers } from "./street";

  const aspect = new Vector2(16, 9);
  const roughHeaderAndFooterHeight = 100;
  let canvas: HTMLCanvasElement;
  let canvasSize: Vector2;
  let ctx: CanvasRenderingContext2D;
  let fps = 0;
  let lastCalledTime = 0;
  let overallSpeed = 5;
  let start = 0;

  function drawCloud() {
    ctx.beginPath();
    const rx = 80;
    const ry = 30;
    const wmid = canvasSize.x / 2;
    const grd = ctx.createLinearGradient(wmid, ry * 2, wmid, ry * 3);
    grd.addColorStop(0.5, "white");
    grd.addColorStop(1, "gray");
    ctx.ellipse(wmid, ry * 2, rx, ry, 0, 0, 2 * Math.PI);
    ctx.fillStyle = grd;
    ctx.fill();
  }
  const step = (timestamp: number): void => {
    const delta = (timestamp - lastCalledTime) / 1000;
    lastCalledTime = timestamp;
    fps = 1 / delta;
    const elapsed = timestamp - start;
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvasSize.x, canvasSize.y);

    drawCloud();
    for (const layer of layers) {
      const edge = elapsed * layer.speed * overallSpeed;
      for (let i = 0; i * layer.width < canvasSize.x + layer.width; i++) {
        const slot = (Math.floor(edge / layer.width) + i) % layer.ys.length;
        const x = (-edge % layer.width) + i * layer.width;
        const val = layer.ys[slot];
        const h = val * layer.storey;
        const y = canvasSize.y - h;
        const w = layer.width;
        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = layer.fillStyle;
        ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.fill();
      }
    }

    requestAnimationFrame(step);
  };

  onMount(() => {
    const ct = canvas.getContext("2d");
    if (!ct) {
      throw new Error("no context ");
    }
    ctx = ct;
    canvasSize = fitToAspectRatio(
      new Vector2(
        document.body.clientWidth,
        document.body.clientHeight - roughHeaderAndFooterHeight,
      ),
      aspect,
    );
    canvas.height = canvasSize.y;
    canvas.width = canvasSize.x;
    setTimeout(() => {
      requestAnimationFrame((timer) => {
        start = timer;
        step(timer);
      });
    }, 10);
  });
</script>

<section class="container">
  <canvas bind:this={canvas}></canvas>
  <input bind:value={overallSpeed} type="range" max="30" min="0" />
  <div>fps: {fps.toPrecision(2)}</div>
</section>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input[type="range" i] {
    appearance: auto;
    cursor: default;
    color: rgb(16, 16, 16);
    padding: initial;
    border: initial;
    margin: 2px;
  }

  input[type="range"] {
    width: 20vw;
    margin: 1em auto;
  }
</style>
