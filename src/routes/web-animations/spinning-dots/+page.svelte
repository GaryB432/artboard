<script lang="ts">
  import { onMount } from "svelte";
  import WebAnimationsHome from "../WebAnimationsHome.svelte";
  import { Circle } from "./circle.svelte";

  var layers = 9;
  var start = 4;
  const circles: Circle[] = [];
  for (var i = 1; i <= layers; i++) {
    var n = i * start;
    for (var j = 0; j < n; j++) {
      circles.push(new Circle(i, j / n));
    }
  }

  onMount(() => {
    circles.forEach((c) => c.animate());
  });
</script>

<div class="host">
  {#each circles as circle}
    <div class="circle" bind:this={circle.element}></div>
  {/each}
</div>
<WebAnimationsHome></WebAnimationsHome>

<style>
  .host {
    background: #0e7cf0;
    margin: 16px;
    color: white;
    top: 40vh;
    height: 60vh;
  }
  .circle {
    background: #2a2a2a;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 40vh;
    left: 50vw;
  }
</style>
