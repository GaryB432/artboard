<!-- <script lang="ts">
</script>

<svelte:head>
  <meta
    name="viewport"
    content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"
  />

  <title>three.js webgl - camera cinematic</title>
</svelte:head> -->
<script lang="ts">
  import { createScene } from "$lib/cinematic/scene";
  import { onMount } from "svelte";

  let el: HTMLCanvasElement;

  onMount(() => {
    createScene(el);
  });
</script>

<svelte:head>
  <title>Three.js Sveltekit</title>
  <meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<canvas bind:this={el} />
