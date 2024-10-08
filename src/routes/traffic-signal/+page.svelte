<script lang="ts">
  import { createCircle, createRect } from "$lib/svg/element";
  import { Vector } from "$lib/vector/vector";
  import { onMount } from "svelte";

  let svg: SVGSVGElement | null = null;
  let grow = $state(false);

  function scaleInnerCircle() {
    grow = true;

    setTimeout(function () {
      grow = false;
    }, 1000);
  }

  onMount(() => {
    const r = 12;
    const gap = 3;

    for (let i = 0; i < 3; i++) {
      const nv = new Vector(50, (i + 1) * 50);
      console.log(nv);
      const c = createCircle(nv, r);
      svg?.appendChild(c);
    }
  });
</script>

<div class="container">
  <svg viewBox="0 0 108 182" bind:this={svg}></svg>
</div>

<button onclick={scaleInnerCircle}>Scale Inner Circle</button>

<style>
  :root {
    --outer-circle-radius: 200px;
    --inner-circle-radius: 140px;
  }

  .container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  svg {
    border: thin solid silver;
    height: 600px;
    width: 1000px;
  }

  .circle-container {
    width: calc(2 * var(--outer-circle-radius));
    height: calc(2 * var(--outer-circle-radius));
    border-radius: 50%;
    background-color: #f0f0f0;
    position: relative;
  }

  .outer-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(2 * var(--outer-circle-radius));
    height: calc(2 * var(--outer-circle-radius));
    border-radius: 50%;
    border: 13px solid #000;
  }

  .inner-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(2 * var(--inner-circle-radius));
    height: calc(2 * var(--inner-circle-radius));
    border-radius: 50%;
    border: 13px solid #000;
    transition: transform 200ms ease-in-out;
    transform-origin: center;
  }

  .inner-circle.grow {
    transform: scale(1.25);
  }
</style>
