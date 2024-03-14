<script lang="ts">
  import { base } from "$app/paths";
  import Clock from "$lib/components/Clock.svelte";
  import Toner from "$lib/components/Toner.svelte";
  import Typewriter from "$lib/components/Typewriter.svelte";
</script>

<section class="twofer">
  <ul>
    <li>
      <a href="{base}/boids">boids</a>
      <div>not yet boids</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/carnivals">carnivals</a>
      <div>random shapes</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/cloth">cloth</a>
      <div>tearable cloth</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/radu/vectors">radu/vectors</a>
      <div>vector math and visualization from radu</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/radu/virtual-world">radu/virtual-world</a>
      <div>virtual world demo from radu's machine learning course</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/siner">siner</a>
      <div>basic sine wave</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/skyline">skyline</a>
      <div>skyline</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/stilo">stilo</a>
      <div>basic points</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/three/cinematic">three/cinematic</a>
      <div>threejs cinematic camera</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/three/cuber">three/cuber</a>
      <div>threejs spinning cube basics</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/timeline">timeline</a>
      <div>scrollable infinite timeline</div>
      <div class="tech" />
    </li>
    <li>
      <a href="{base}/virtual-world">virtual-world</a>
      <div>basic</div>
      <div class="tech" />
    </li>
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
