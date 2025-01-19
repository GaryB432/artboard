<script lang="ts">
  import type { Vector3Tuple } from "three";
  import WebAnimationsHome from "../WebAnimationsHome.svelte";
  import { onMount } from "svelte";

  let universe: HTMLDivElement | undefined;

  class Star {
    pos: Vector3Tuple = $state([0, 0, 0]);
    constructor(pos: Vector3Tuple) {
      this.pos = pos;
    }
  }

  class Starfield {
    left: number = $state(0);
    stars: Star[] = [];
    constructor(starCount: number, distance: number) {
      const width = universe.clientWidth;
      const height = universe.clientHeight;
      this.stars.push(
        ...Array(starCount)
          .fill(undefined)
          .map<Star>((_, z) => {
            const x = Math.round(Math.random() * width);
            const y = Math.round(Math.random() * height);
            return new Star([x, y, z]);
          }),
      );
    }
  }
  // type Starfield = {
  //   rect: DOMRectInit;
  //   speed: number;
  // };
  const starfields: Starfield[] = $state([]);
  onMount(() => {
    starfields.push(
      ...Array(3)
        .fill(undefined)
        .map((_, i) => {
          return new Starfield(5, i);
        }),
    );
    console.log(starfields);
  });
</script>

<svelte:head>
  <title>artboard - parallax-starfield</title>
</svelte:head>

<section class="wrapper">
  <section id="universe" bind:this={universe}>
    {#each starfields as field, sfn}
      <div class="field" style="--left: {sfn * 20}px">
        {#each field.stars as starf}
          {@const [x, y, z] = starf.pos}
          <div
            class="star"
            style="--distance: {z + 1}; top: {y}px; left: {x}px;"
          ></div>
        {/each}
      </div>
    {/each}
  </section>
</section>

<WebAnimationsHome></WebAnimationsHome>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    place-items: center;
    border: thin solid silver;
  }
  #universe {
    position: relative;
    border: thin solid green;
    width: 90vw;
    aspect-ratio: 16 / 9;
    fill: rgb(112, 109, 109);
    overflow: hidden;
  }
  .field {
    position: absolute;
    top: 0;
    left: var(--left);
    height: 100%;
    width: 100%;
    border: thin solid red;
  }
  .star {
    background-color: green;
    height: calc(var(--distance) * 1px);
    width: calc(var(--distance) * 1px);
    border-radius: 50%;
    opacity: 1;
    position: absolute;
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
