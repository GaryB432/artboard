<script lang="ts">
  import { base } from "$app/paths";
  import Typewriter from "$lib/components/Typewriter.svelte";
</script>

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

<Typewriter />

<style>
  a {
    text-decoration: underline;
  }
  li {
    background-color: antiquewhite;
    margin: 1em;
    padding: 0.5em;
  }
</style>
