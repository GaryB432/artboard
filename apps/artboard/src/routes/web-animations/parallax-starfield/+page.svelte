<script lang="ts">
  import { onMount } from "svelte";
  import WebAnimationsHome from "../WebAnimationsHome.svelte";
  import { Starfield } from "./star-field.svelte";

  const STARCOUNT = 200;
  const UNIVERSEDEPTH = 5;

  let universe: HTMLElement | undefined = $state();

  let universeSize = $derived(universe?.getBoundingClientRect());

  let fieldDivs: HTMLElement[] = $state([]);

  $effect(() => {
    fieldDivs.forEach((a, b) => {
      const kfs: Keyframe[] = [
        { transform: `translate3d(-${universe!.clientWidth}px, 0, 0)` },
      ];
      const durationExponent = fieldDivs.length - b;
      const opts = {
        duration: Math.pow(2, durationExponent) * 1000,
        iterations: Infinity,
      };

      a.animate(kfs, opts);
    });
  });

  let starfields: Starfield[] = $state([]);

  onMount(() => {
    starfields = Array(UNIVERSEDEPTH)
      .fill(undefined)
      .map((_, i) => {
        return new Starfield(universeSize!, STARCOUNT, i);
      });
    // const rect = universe?.getBoundingClientRect();
  });
</script>

<svelte:head>
  <title>artboard - parallax-starfield</title>
</svelte:head>

<section class="wrapper">
  <section id="universe" bind:this={universe}>
    {#if universeSize}
      {#each starfields as field, sfn}
        <div class="field" bind:this={fieldDivs[sfn]}>
          {#each field.stars as star}
            {@const [x, y, z] = star}
            {@const distance = z + 1}
            {#each [0, universeSize.width] as xMore}
              <div
                class="star"
                style="--distance: {distance}; top: {y}px; left: {x + xMore}px;"
              ></div>
            {/each}
          {/each}
        </div>
      {/each}
    {/if}
  </section>
</section>

<WebAnimationsHome></WebAnimationsHome>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  #universe {
    position: relative;
    height: 80vh;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: black;
  }
  .field {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .star {
    background-color: white;
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
