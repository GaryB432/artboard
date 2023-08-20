<script lang="ts">
  import type { Vec2 } from "three";

  let data = { subject: "boids" };
  interface Boid {
    pos: Vec2;
  }
  let boids: Boid[] = [
    { pos: { x: 0, y: 4 } },
    { pos: { x: 10, y: 24 } },
    { pos: { x: 20, y: 44 } },
  ];

  function randomOne() {
    for (const b of boids) {
      // b.pos.x = 10;
      b.pos.x = Math.random() * 100;
      b.pos.y = Math.random() * 100;
      boids = [...boids];
    }
    // const b = Array(15).map<Boid>((a, b) => {
    //   return { pos: { x: b * 20, y: b * 20 } };
    // });
    // console.log(b);
    // boids = b;
  }
</script>

<svelte:head>
  <title>artboard - boids</title>
</svelte:head>

<div class="main">
  <div class="board">
    <svg viewBox="0 0 100 100">
      {#each boids as b}
        <circle cx={b.pos.x} cy={b.pos.y} r="2" />
      {/each}
    </svg>
  </div>
  <div class="buttons">
    <button on:click={randomOne}>Random</button>
  </div>
</div>

<article class="container">
  {data.subject} works
</article>

<style>
  .container {
    padding: 1em;
    border: thin solid silver;
  }
  .board {
    border: thin solid green;
  }
  .board svg {
    border: thin solid orange;
    height: 400px;
    width: 600px;
  }
  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    /* desktops */
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
