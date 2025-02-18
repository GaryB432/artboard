<script lang="ts">
  import { bubblesState } from "./state.svelte";
  let name = $state(`Controls`);
  let message = $derived(`Don't touch the ${name} yet!`);

  // let {
  //   initialVelocity,
  //   gravity,
  // }: { initialVelocity: number; gravity: number } = $props();
</script>

<article>
  {message}
</article>

<div class="panel">
  <div>Speed</div>
  <input
    type="range"
    min="-100"
    max="100"
    bind:value={bubblesState.animationSpeed}
  />
  <div>Gravity</div>
  <input type="range" min="-100" max="100" bind:value={bubblesState.gravity} />
  <div>Initial Velocity</div>
  <input
    type="range"
    min="-100"
    max="100"
    bind:value={bubblesState.initialVelocity}
  />
</div>

<style>
  input[type="range"] {
    all: revert;
  }
  article {
    --some-color: rgba(0, 0, 0, 0.2);
    box-shadow:
      0 2px 2px 0 var(--some-color),
      0 12px 22px 0 var(--some-color);
    max-width: 30ch;
    outline: 1px solid var(--some-color);
    overflow: hidden;
    padding: 0.5em;
    text-align: center;
  }

  article:hover {
    animation: tada 1s;
  }

  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
    }

    10%,
    20% {
      transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }
</style>
