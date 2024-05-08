<script lang="ts">
  import { onMount } from "svelte";
  import fmVsAm from "./radio-fm-vs-am-anim.gif";

  let frequency = 80;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;

  onMount(() => {
    ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    update();
  });

  function update() {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawXAxis();

    drawWave();
  }

  function drawWave() {
    if (!ctx) {
      return;
    }
    function f(x: number) {
      let y = Math.sin(x / frequency) * (canvas.height / 3) + canvas.height / 2;
      return y;
    }
    ctx.moveTo(0, f(0));
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      ctx.lineTo(x, f(x));
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  function drawXAxis() {
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.setLineDash([]);
  }
</script>

<main>
  <canvas
    bind:this={canvas}
    width="500px"
    height="500px"
    style="background-color: darkred"
    on:wheel={(evt) => {
      const dir = Math.sign(evt.deltaY);
      const step = 1;
      frequency += dir * step;
      update();
    }}
  ></canvas>
  <div class="freq">
    {frequency}
  </div>
  <img src={fmVsAm} alt="anim" />
</main>

<style>
  main {
    display: flex;
    margin: 0 2rem;
    border: thin solid blue;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  canvas {
    align-self: center;
  }
  img {
    align-self: center;
  }
</style>
