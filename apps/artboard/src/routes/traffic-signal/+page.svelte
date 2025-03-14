<script lang="ts">
  import { createCircle, createRect } from "@libraries/graphics/svg/element";

  import { Vector } from "@artboard/vector";
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
    ).scale(0.5);

    const lenses = ["red", "yellow", "green"].map((fill) => ({
      stroke: "black",
      strokeWidth: "1",
      fill,
    }));
    const r = 150;
    const gap = 20;

    // const cir = createCircle(new Vector(0, 0), r, {
    //   stroke: "black",
    //   strokeWidth: "1",
    //   fill: "blue",
    // });
    // svg.appendChild(cir);

    // for (let i = 0; i < 3; i++) {
    //   // console.log(i, cy);
    //   const dd = 2 * r + gap;
    //   // const nv = new Vector(200, dd * (i - 1));

    //   const nv = new Vector(0, (2 * r + gap) * (i - 1)).add(center);

    //   const c = createCircle(nv, r, lenses[i]);
    //   c.setAttributeNS(null, "r", grow ? "34" : "60");
    //   svg.appendChild(c);
    // }
  });
</script>

<div class="container">
  <svg width="1920" height="1080" bind:this={svg}>
    <circle cx="960" cy="220" r="150" stroke="black" stroke-width="1" fill="red"
    ></circle>
    <circle
      cx="960"
      cy="540"
      r={grow ? "300" : "150"}
      stroke="black"
      stroke-width="1"
      fill="yellow"
    ></circle>
    <circle
      cx="960"
      cy="860"
      r="150"
      stroke="black"
      stroke-width="1"
      fill="green"
    ></circle>
  </svg>
</div>

<button onclick={scaleInnerCircle}>Scale Inner Circle</button>

<style>
  :root {
    --outer-circle-radius: 200px;
    --inner-circle-radius: 140px;
  }

  .container {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 2px;
    overflow: hidden;
  }

  svg {
    outline: 1px solid silver;
    width: auto;
    height: 60vh;
    transform-origin: 0 0;
  }
</style>
