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
    const ccs = ["red", "yellow", "green"];
    const lenses = ccs.map((fill) => ({ stroke: "none", fill }));
    const r = 12;
    const gap = 3;

    for (let i = 0; i < lenses.length; i++) {
      const nv = new Vector(50, (i + 1) * 50);
      const c = createCircle(nv, r, lenses[i]);
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
</style>
