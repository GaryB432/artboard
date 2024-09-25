<script lang="ts">
  import StarComponent from "./Star.svelte";
  import type { Layer, Star } from "../shared";

  let subject = $state("Layer component");

  let { stars }: Layer = $props();
</script>

<div class="container">
  {#each stars as star}
    <StarComponent {...star}></StarComponent>
  {/each}
  {subject} works with {stars.length} stars!
</div>

<style>
  .container {
    border: thin solid silver;
  }
</style>
