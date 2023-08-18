<script lang="ts">
  import { base } from "$app/paths";
  import Clock from "$lib/components/Clock.svelte";
  import Typewriter from "$lib/components/Typewriter.svelte";
</script>

<section class="twofer">
  <ul>
    <li>
      <a href="{base}/carnivals">Random shapes</a>
    </li>
    <li>
      <a href="{base}/skyline">Skyline</a>
    </li>
    <li>
      <a href="{base}/three/cuber">ThreeJS Cube</a>
    </li>
    <li>
      <a href="{base}/three/cinematic">ThreeJS Cinematic Camera</a>
    </li>
    <li>
      <a href="{base}/timeline">Timeline Canvas</a>
    </li>
  </ul>
  <Clock />
</section>

<Typewriter />

<style>
  .twofer {
    display: flex;
    align-items: flex-start;
    gap: 2em;
  }
  a {
    text-decoration: underline;
  }
  ul {
    width: 100%;
    /* width: 70vw; */
  }
  li {
    background-color: antiquewhite;
    margin: 0.5em 0;
    padding: 0.5em;
  }
</style>
