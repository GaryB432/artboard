<script lang="ts">
  import type { Star } from "../shared";

  let subject = $state("Layer component");

  type Props = {
    stars: Star[];
  };

  let { stars }: Props = $props();
</script>

<div class="container">
  {#each stars as star}
    {JSON.stringify(star)}
  {/each}
  {subject} works
</div>

<style>
  .container {
    border: thin solid silver;
  }
</style>
