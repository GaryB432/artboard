<script lang="ts">
  import type { Star } from "../shared.svelte";

  type Props = {
    star: Star;
  };

  let { star }: Props = $props();
  let [x, y, z] = $derived(star.position);
</script>

<div class="star" style="--distance: {z + 1}; top: {y}px; left: {x}px;"></div>

<style>
  .star {
    background-color: white;
    height: calc(var(--distance) * 1px);
    width: calc(var(--distance) * 1px);
    border-radius: 50%;
    opacity: 1;
    position: absolute;
  }
</style>
