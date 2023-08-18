<script lang="ts">
  import { Clock } from "$lib/clock/clock";
  import { onMount } from "svelte";

  let container: HTMLElement | null = null;
  let wiping = false;
  const c = new Clock();
  onMount(() => {
    c.init(container, 400);
    c.start();
  });
  function drawRandoFrame() {}
  function wipe() {
    if (container) {
      wiping = true;
      setTimeout(() => {
        wiping = false;
      }, 2000);
    }
  }
</script>

<section>
  <div class="container" bind:this={container} class:wiping />
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
    /* transform: scale(1); */
    border: 1em solid var(--blue);
    background-color: #8cb7f2;
    border-radius: 50%;
    transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .container.wiping {
    transform: scale(1.2) translate(-100px, 15px);
    /* background-color: orange; */
  }

  .button-bar {
    background-color: white;
  }
</style>
