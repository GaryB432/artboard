<script lang="ts">
  import { base } from "$app/paths";
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
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
</ul>

<style>
  a {
    text-decoration: underline;
  }
  li {
    background-color: antiquewhite;
    margin: 1em;
    padding: 1em;
  }
</style>
