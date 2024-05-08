<script lang="ts">
  import { base } from "$app/paths";
  import Clock from "$lib/components/Clock.svelte";
  import Toner from "$lib/components/Toner.svelte";
  import Typewriter from "$lib/components/Typewriter.svelte";
  let items = [
    {
      path: "boids",
      description: "not yet boids",
    },
    {
      path: "carnivals",
      description: "random shapes",
    },
    {
      path: "cloth",
      description: "tearable cloth",
    },
    {
      path: "radu/vectors",
      description: "vector math and visualization from radu",
    },
    {
      path: "radu/virtual-world",
      description: "virtual world demo from radu's machine learning course",
    },
    {
      path: "siner",
      description: "basic sine wave",
    },
    {
      path: "skyline",
      description: "skyline",
    },
    {
      path: "stilo",
      description: "basic points",
    },
    {
      path: "three/cinematic",
      description: "threejs cinematic camera",
    },
    {
      path: "three/cuber",
      description: "threejs spinning cube basics",
    },
    {
      path: "timeline",
      description: "scrollable infinite timeline",
    },
    {
      path: "virtual-world",
      description: "basic",
    },
  ];
</script>

{#snippet itemf(item)}
  <li>
    <a href="{base}/{item.path}">{item.path}</a>
    <div>{item.description}</div>
    <div class="tech"></div>
  </li>
{/snippet}

<section class="twofer">
  <ul>
    {#each items as item}
      {@render itemf(item)}
    {/each}
  </ul>
  <section>
    <Clock />
    <Toner />
  </section>
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
    display: flex;
    gap: 1rem;
    background-color: antiquewhite;
    margin: 0.5em 0;
    padding: 0.5em;
  }
</style>
