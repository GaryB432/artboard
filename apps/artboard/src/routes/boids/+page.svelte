<script lang="ts">
  import { Tween } from "svelte/motion";
  import type { Vec2 } from "three";

  type Vween2 = {
    x: Tween<number>;
    y: Tween<number>;
  };

  interface Boid {
    pos: Vween2;
    next?: Vec2;
  }

  let qbs = new Array(3).fill(null).map((_, i) => {
    return {
      pos: {
        x: new Tween(Math.random() * 100),
        y: new Tween(Math.random() * 100),
      },
    };
  });

  let boids: Boid[] = $state(qbs);

  function randomOne() {
    for (const b of boids) {
      // b.pos.x = 10;
      b.pos.x.set(Math.random() * 100);
      b.pos.y.set(Math.random() * 100);
      // boids = [...boids];
    }
    // const b = Array(15).map<Boid>((a, b) => {
    //   return { pos: { x: b * 20, y: b * 20 } };
    // });
    // console.log(b);
    // boids = b;
  }

  // const canvasSize = fitToAspectRatio(
  //   new Vector2(document.body.clientWidth, document.body.clientHeight - 100),
  //   aspect
  // );
</script>

<svelte:head>
  <title>artboard - boids</title>
</svelte:head>

<div class="main">
  <div class="board">
    <svg viewBox="0 0 100 100">
      {#each boids as b}
        <circle cx={b.pos.x.current} cy={b.pos.y.current} r="2" />
      {/each}
    </svg>
  </div>
  <nav class="button-bar">
    <button onclick={randomOne}>Random</button>
  </nav>
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }
  .board svg {
    display: block;
    border: thin solid silver;
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
