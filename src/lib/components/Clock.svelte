<script lang="ts">
  import { Clock } from "$lib/clock/clock";
  import { onMount } from "svelte";

  let container: HTMLElement | null = null;
  let wiping = false;
  const c = new Clock();
  onMount(() => {
    c.init(container, 100);
    c.start();
  });
  function drawRandoFrame() {
    console.log("not yet");
  }
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
    border: 4px solid var(--blue);
    background-color: #8cb7f2;
    border-radius: 50%;
    transition: all 1s ease-in-out;
  }

  .container.wiping {
    transform: scale(2) translate(-80px, 30px);
    /* background-color: orange; */
  }

  .button-bar {
    background-color: white;
  }
</style>
