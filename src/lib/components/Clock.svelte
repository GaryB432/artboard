<script lang="ts">
  import { Clock } from "$lib/clock/clock";
  import { onMount } from "svelte";

  let container: HTMLElement | null = null;
  const c = new Clock();
  onMount(() => {
    c.init(container, 400);
    c.start();
  });
  function drawRandoFrame() {}
  function wipe() {}
</script>

<section>
  <div class="container" bind:this={container} />
  <nav class="button-bar">
    <button on:click={drawRandoFrame}>Go</button>
    <button on:click={wipe}>Wipe</button>
    <button disabled>Moar</button>
  </nav>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    gap: 0.5em;
    background-color: aliceblue;
  }
  .container {
    /* display: flex; */
    /* gap: 1em; */
    /* width: 550px; */
    /* height: 500px; */
    /* height: fit-content; */

    padding: 6px;
    border: 1em solid var(--blue);
    background-color: #8cb7f2;
    border-radius: 50%;
  }

  .button-bar {
    background-color: white;
  }
</style>
