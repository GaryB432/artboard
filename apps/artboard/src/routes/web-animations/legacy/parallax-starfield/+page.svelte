<script lang="ts">
  import { createUniverse } from "./shared.svelte";
  import StarfieldPanel from "./components/Starfield.svelte";
  import WebAnimationsHome from "../../WebAnimationsHome.svelte";
  import { onMount } from "svelte";
  import type { Vector2Tuple } from "three";

  let size: Vector2Tuple = $state([0, 0]);

  let container: HTMLDivElement | null = $state(null);

  let universe = $derived(createUniverse(size, 5, 20));

  onMount(() => {
    if (container) {
      const rect = container.getBoundingClientRect();
      size = [rect.width, rect.height];
    }
    // $inspect(universe);
  });
</script>

<svelte:head>
  <title>artboard - parallax-starfield</title>
</svelte:head>

<div class="container" bind:this={container}>
  <div id="universe">
    {#each universe.starfields as starfield}
      <StarfieldPanel
        {starfield}
        width={size[0]}
        universeDepth={universe.starfields.length}
      ></StarfieldPanel>
    {/each}
  </div>
</div>

<WebAnimationsHome></WebAnimationsHome>

<style>
  .container {
    width: 100vw;
    height: 80vh;
    border: thin solid silver;
    overflow: hidden;
  }
  #universe {
    position: relative;
    background-color: black;
    height: 100%;
    width: 100%;
  }
</style>
