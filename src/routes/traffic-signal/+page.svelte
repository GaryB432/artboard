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
    if (!svg) return;
    // const ss = new Vector(svg.clientWidth, svg.clientHeight);
    // console.log(ss);

    // const cy = svg.clientHeight / 2;

    const center = new Vector(
      svg.width.baseVal.value,
      svg.height.baseVal.value,
    ).multiplyScaler(0.5);

    console.log(center);

    const lenses = ["red", "yellow", "green"].map((fill) => ({
      stroke: "black",
      strokeWidth: "1",
      fill,
    }));
    const r = 100;
    const gap = 30;

    // const cir = createCircle(new Vector(0, 0), r, {
    //   stroke: "black",
    //   strokeWidth: "1",
    //   fill: "blue",
    // });
    // svg.appendChild(cir);

    for (let i = 0; i < lenses.length; i++) {
      // console.log(i, cy);
      const dd = 2 * r + gap;
      // const nv = new Vector(200, dd * (i - 1));

      const nv = new Vector(0, dd * (i - 1)).add(center);

      const c = createCircle(nv, r, lenses[i]);
      svg.appendChild(c);
    }
  });
</script>

<div class="container">
  <svg height="1080" width="1920" viewBox="0 0 1920 1080" bind:this={svg}></svg>
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
    border: thin solid green;
  }

  svg {
    border: thin solid silver;
    width: auto;
    height: 60vh;
    transform-origin: 0 0;
  }
</style>
