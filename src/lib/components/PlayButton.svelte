<script lang="ts">
  export let playing = false;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{ toggle: { playing: boolean } }>();

  function togglePlaying() {
    playing = !playing;
    dispatch("toggle", {
      playing,
    });
  }

  const svgPaths = {
    play: "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
    pause: "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
  };
</script>

<button on:click={togglePlaying}>
  <svg viewBox="0 0 36 36">
    <path d={playing ? svgPaths.pause : svgPaths.play} />
  </svg>
</button>

<style>
  :host {
    display: inline-block;
    cursor: default;
  }

  button {
    height: 50px;
    width: 50px;
  }
</style>
