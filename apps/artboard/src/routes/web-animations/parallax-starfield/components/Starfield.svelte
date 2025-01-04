<script lang="ts">
  import { onMount } from "svelte";
  import StarPanel from "../components/Star.svelte";
  import type { Starfield } from "../shared.svelte";

  type Props = {
    starfield: Starfield;
    universeDepth: number;
    width: number;
  };

  let { starfield, width, universeDepth }: Props = $props();

  let element: HTMLDivElement | null = $state(null);

  const kf = $derived([
    { transform: "translate3d(0, 0, 0)" },
    { transform: "translate3d(-" + width + "px, 0, 0)" },
  ]);

  const durationExponent = universeDepth - starfield.depth;
  const options = {
    duration: Math.pow(2, durationExponent) * 1000,
    iterations: Infinity,
  };

  onMount(() => {
    element?.animate(kf, options);
  });
</script>

<div class="starfield" bind:this={element}>
  {#each starfield.stars as star}
    <StarPanel {star}></StarPanel>
  {/each}
</div>
