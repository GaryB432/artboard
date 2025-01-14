<script lang="ts">
  import { onMount } from "svelte";
 
  let el: HTMLCanvasElement;

  onMount(() => {
    createScene(el);
  });

  function createScene(el: HTMLCanvasElement) {
    throw new Error("Function not implemented.");
  }
</script>

<canvas bind:this={el}> </canvas>
