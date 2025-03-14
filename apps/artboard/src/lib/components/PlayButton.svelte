<script lang="ts">
  let { playing, ontoggle }: { playing: boolean; ontoggle: () => void } =
    $props();

  function togglePlaying() {
    playing = !playing;
    ontoggle();
  }

  const svgPaths = {
    play: "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
    pause: "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
  };
</script>

<button onclick={togglePlaying} aria-label="Play or Pause">
  <svg height="36" width="36">
    <path d={playing ? svgPaths.pause : svgPaths.play} />
  </svg>
</button>

<style>
  :host {
    display: inline-block;
    cursor: default;
  }

  button {
    border: 1px solid #000;
    border-radius: 5px;
    background-image: linear-gradient(
      0deg,
      rgb(207, 207, 207) 16%,
      rgb(252, 252, 252) 79%
    );
    height: 50px;
    width: 50px;
  }

  button:focus {
    box-shadow: none;
  }
</style>
