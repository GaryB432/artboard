<script lang="ts">
  import easings from "$lib/easings";
  import { onMount } from "svelte";
  import type { Vec2 } from "three";

  type Particle = { pos: Vec2 };

  const blips: Particle[] = [
    { pos: { x: 50, y: 50 } },
    { pos: { x: 50, y: 100 } },
  ];

  function drawFrame() {
    if (!ctx) return;
    const s = 10;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.beginPath;
    for (const blip of blips) {
      console.log(blip);

      ctx.fillStyle = "#0000EE";
      ctx.fillRect(blip.pos.x, blip.pos.y, s, s);
    }
  }

  function drawRandoFrame() {
    const s = 10;
    for (const blip of blips) {
      const x = Math.floor(Math.random() * cvs.width) - s * 2 + s;
      const y = Math.floor(Math.random() * cvs.height) - s * 2 + s;
      blip.pos = { x, y };
    }
    drawFrame();
  }

  function wipe() {
    if (!ctx) return;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // ctx.beginPath;
    const left = "#29BF12";
    const right = "#ABFF4F";
    const canvasSize = { x: cvs.width, y: cvs.height };
    const duration = 4000;

    let starttime: number;

    const drawFrame = (timer: number) => {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
      const runtime = timer - starttime;
      const progress = Math.min(runtime / duration, 1);
      // const eased = easing(progress);
      // const eased = progress;
      const eased = easings["easeInOutQuad"](progress);
      const xd = canvasSize.x * eased;
      ctx.fillStyle = left;
      ctx.fillRect(0, 0, xd, canvasSize.y);
      ctx.fillStyle = right;
      ctx.fillRect(xd + 1, 0, canvasSize.x - xd, canvasSize.y);

      // for (let y = 0; y < cvs.width; y++) {
      //   ctx.fillStyle = left;
      //   ctx.fillRect(0, 0, y, cvs.height);
      //   // console.log(y);
      // }
      // for (const morf of morfs) {
      //   context.fillStyle = morf.fillStyle;
      //   context.beginPath();
      //   const shape = clampShape(lerpMorph(morf, eased), canvasSize);
      //   if (morf.isCircle) {
      //     let { x, y } = shape.origin;
      //     context.arc(x, y, shape.size.x, 0, 2 * Math.PI);
      //     context.fill();
      //   } else {
      //     const { x, y } = upperLeft(shape);
      //     const { x: w, y: h } = shape.size;
      //     context.fillRect(x, y, w, h);
      //   }
      // }
      if (progress < 1) {
        requestAnimationFrame((timer) => drawFrame(timer));
      }
    };

    requestAnimationFrame((timer) => {
      starttime = timer;
      drawFrame(timer);
    });

    // for (const blip of blips) {
    //   console.log(blip);

    //   ctx.fillStyle = "#0000EE";
    //   ctx.fillRect(blip.pos.x, blip.pos.y, s, s);
    // }
  }

  // const animate = () => {
  //   requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  //   renderer.render(scene, camera);
  // };

  let cvs: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let aspect = 16 / 9;
  onMount(() => {
    const h = 400;
    const w = h * aspect;
    cvs.width = w;
    cvs.height = h;
    ctx = cvs.getContext("2d");
    // const w = 800;
    // cvs.width = w;
    // cvs.height = w * (1 / aspect);
  });
</script>

<svelte:head>
  <title>artboard - stilo</title>
</svelte:head>

<article class="container">
  <div class="holder">
    <div class="canvas">
      <canvas bind:this={cvs} />
    </div>
  </div>
  <nav>
    <button on:click={drawRandoFrame}>Go</button>
    <button on:click={wipe}>Wipe</button>
    <button disabled>Moar</button>
  </nav>
</article>

<style>
  .container {
    display: flex;
    padding: 1em;
    border: thin solid silver;
    flex-direction: column;
  }
  .holder {
    border: thin solid red;
    display: flex;
    justify-content: center;
  }
  canvas {
    border: thin solid green;
  }
  nav {
    padding: 0.5em;
    display: flex;
    gap: 1em;
    align-self: center;
    justify-content: space-around;
  }
  button {
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    border-style: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    display: inline-block;
    font-weight: 600;
    background-color: rgb(243, 244, 246);
    color: var(--blue);
  }

  button:hover {
    background-color: rgb(239, 246, 255);
  }
</style>
