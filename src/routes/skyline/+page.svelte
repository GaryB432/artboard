<script lang="ts">
  // http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
  import { onMount } from "svelte";
  import { layers } from "./street";

  const times: number[] = [];
  let canvasWidth = 600;
  let canvasHeight = 400;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let fps = 0;
  let overallSpeed = 5;
  let start = 0;

  function drawCloud() {
    ctx.beginPath();
    const rx = 80;
    const ry = 30;
    const wmid = canvasWidth / 2;
    const grd = ctx.createLinearGradient(wmid, ry * 2, wmid, ry * 3);
    grd.addColorStop(0.5, "white");
    grd.addColorStop(1, "gray");
    ctx.ellipse(wmid, ry * 2, rx, ry, 0, 0, 2 * Math.PI);
    ctx.fillStyle = grd;
    ctx.fill();
  }
  const step = (timestamp: number): void => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    const elapsed = timestamp - start;
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawCloud();
    for (const layer of layers) {
      const edge = elapsed * layer.speed * overallSpeed;
      for (let i = 0; i * layer.width < canvasWidth + layer.width; i++) {
        const slot = (Math.floor(edge / layer.width) + i) % layer.ys.length;
        const x = (-edge % layer.width) + i * layer.width;
        const val = layer.ys[slot];
        const h = val * layer.storey;
        const y = canvasHeight - h;
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
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    setTimeout(() => {
      requestAnimationFrame((timer) => {
        start = timer;
        step(timer);
      });
    }, 10);
  });
</script>

<section class="container">
  <canvas
    bind:this={canvas}
    style="width: {canvasWidth}px; height: {canvasHeight}px"
  />
  <input bind:value={overallSpeed} type="range" max="30" min="0" />
  <div>fps: {fps}</div>
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
