<script lang="ts">
  import { fitToAspectRatio } from "$lib/utilities";
  import { onMount } from "svelte";
  import { Vector2 } from "three";

  const yearsPerFrame = 4;
  const aspect = new Vector2(16, 9);
  const roughHeaderAndFooterHeight = 100;
  const wheelSpeed = 0.25;
  let canvas: HTMLCanvasElement;
  let canvasSize: Vector2;
  let ctx: CanvasRenderingContext2D;
  let fps = 0;
  let overallSpeed = 5;
  let viewPortTop = 0;

  function wheel(e: WheelEvent) {
    e.preventDefault();
    viewPortTop += e.deltaMode === 0 ? e.deltaY * wheelSpeed : 0;
    drawFrame();
  }

  function mousemove(e: MouseEvent) {
    e.preventDefault();
    viewPortTop -= e.buttons === 1 ? e.movementY : 0;
    drawFrame();
  }

  function drawTicks() {
    const yearSize = canvasSize.y / yearsPerFrame;
    const fontSize = Math.max(20, yearSize * 0.8);
    let year0 = Math.floor(viewPortTop / yearSize);
    if (year0 < 0) {
      viewPortTop = year0 = 0;
    }
    const yeary = viewPortTop - year0 * yearSize;
    for (let i = 0; i < yearsPerFrame + 1; i++) {
      const yr = year0 + i;
      const topy = yearSize * i - yeary;
      ctx.beginPath();
      ctx.moveTo(0, topy + yearSize);
      ctx.lineTo(canvasSize.x, topy + yearSize);
      ctx.strokeStyle = "gray";
      ctx.stroke();
      // ctx.save();
      ctx.font = `${fontSize}px Tahoma`;
      ctx.fillStyle = "green";
      ctx.fillText(yr.toString(), fontSize / 4, topy + fontSize);
      // ctx.restore();
    }
  }

  function drawFrame() {
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvasSize.x, canvasSize.y);
    drawTicks();
  }

  onMount(() => {
    const ct = canvas.getContext("2d");
    if (!ct) {
      throw new Error("no context ");
    }
    ctx = ct;
    canvasSize = fitToAspectRatio(
      new Vector2(
        document.body.clientWidth,
        document.body.clientHeight - roughHeaderAndFooterHeight
      ),
      aspect
    );
    canvas.height = canvasSize.y;
    canvas.width = canvasSize.x;
    canvas.onwheel = wheel;
    canvas.onmousemove = mousemove;
    setTimeout(() => {
      requestAnimationFrame(() => {
        drawFrame();
      });
    }, 10);
  });
</script>

<section class="container">
  <canvas bind:this={canvas} />
  <input bind:value={overallSpeed} type="range" max="30" min="0" />
  <div>fps: {fps.toPrecision(2)}</div>
  <div>top: {viewPortTop.toFixed(0)}</div>
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
