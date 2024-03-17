<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let el: HTMLCanvasElement;

  onMount(() => {
    console.log(data);
  });
</script>

<svelte:head>
  <title>artboard - state-geo</title>
</svelte:head>

<article class="container">
  <canvas bind:this={el} />
</article>

<style>
  .container {
    padding: 1em;
    border: thin solid silver;
  }
  canvas {
    background-color: rgb(186, 2, 2);
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
