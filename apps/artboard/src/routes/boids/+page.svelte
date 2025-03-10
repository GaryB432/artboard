<script lang="ts">
  import { type Motion } from "$lib/motion/motion";
  import { BouncePath, GridPath } from "$lib/motion/paths";
  import { shuffle } from "$lib/utils/misc";
  import { Vector } from "@artboard/vector";
  import { quintIn } from "svelte/easing";
  import { Tween } from "svelte/motion";

  type TweenedSegment = {
    from: Tween<Vector>;
    to: Tween<Vector>;
  };

  interface Boid {
    id: number;
    done: boolean;
    pos: Tween<Vector>;
    rad: number;
    to: Vector;
    path: Motion[];
  }

  const margin = 10;

  const basisRect = new DOMRect(0, 0, 800, 600);

  let container = new DOMRect(
    basisRect.x + margin,
    basisRect.y + margin,
    basisRect.width - margin * 2,
    basisRect.height - margin * 2,
  );

  const rectPos = new Vector(container.left, container.top);
  const rectSize = new Vector(container.width, container.height);

  const rectCenter = rectPos.add(rectSize.scale(0.5));

  const greenSegw: TweenedSegment = $derived({
    from: new Tween<Vector>(rectCenter.clone()),
    to: new Tween<Vector>(rectCenter.clone()),
  });

  let boids: Boid[] = $state(
    new Array(30).fill(null).map<Boid>((_, id) => {
      let rad = Math.floor(Math.random() * 10 + 5);

      return {
        id,
        pos: new Tween<Vector>(rectCenter.clone()),
        rad,
        to: rectCenter.clone(),
        done: true,
        path: [],
      };
    }),
  );

  let maxRadius = $derived(
    boids.reduce((a, b) => {
      return Math.max(a, b.rad);
    }, 0),
  );

  async function scatter(): Promise<void> {
    boids = shuffle(boids);
    const s = maxRadius + 5;
    boids.forEach((boid, i, f) => {
      const to = new Vector((i + 1) * s, (i + 1) * s).add(rectPos);
      // const path: Motion = { to, duration: 500, delay: i * 50 };
      boid.done = false;
      boid.pos
        .set(to, { duration: 500, delay: i * 50 })
        .then(() => (boid.done = true));
    });
  }

  async function organize(): Promise<void> {
    // Promise.all(boids.map((b) => b.pos.set(rectCenter, { duration: 0 })));

    boids = shuffle(boids);

    boids.forEach(async (boid, i, f) => {
      boid.done = false;
      const pos: Vector = boid.pos.current;
      const gp = new GridPath(
        {
          ...boid,
          pos,
        },
        container,
        5,
      );
      boid.path = gp.create(2, i);

      for (const m of boid.path) {
        // greenSegw.from.set(boid.pos.current);
        // greenSegw.to.set(m.to);
        await boid.pos.set(m.to, {
          duration: m.duration,
          easing: m.easing,
        });
      }
      boid.done = true;
    });
  }

  async function bounce(): Promise<void> {
    await Promise.all(
      boids.map((b, i) => {
        b.done = false;
        return b.pos
          .set(rectCenter, {
            duration: 500,
            delay: i * 50,
            easing: quintIn,
          })
          .then(() => {
            b.done = true;
          });
      }),
    );

    boids.forEach(async (boid, i, f) => {
      boid.done = false;
      const pos: Vector = boid.pos.current;
      const p = new BouncePath(
        {
          ...boid,
          pos,
        },
        container,
      );
      boid.path = p.create(5);

      // boid.path = getBouncyPathForCircle(
      //   container,
      //   Math.random() * 5000 + 1000,
      //   3,
      //   boid.rad,
      // );
      // const toBottom: Motion = {
      //   delay: 0,
      //   duration: 3000,
      //   to: new Vector(boid.path.at(-1)!.to.x, container.bottom - boid.rad),
      // };
      // boid.path.push(toBottom);
      for (const m of boid.path) {
        await boid.pos.set(m.to, {
          delay: m.delay,
          duration: m.duration,
          easing: m.easing,
        });
      }
      boid.done = true;
    });
  }

  function* infiniteRandomIntegerFeed(): Generator<
    number | Promise<unknown>,
    void,
    unknown
  > {
    while (true) {
      const randomInteger = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // Generates a random integer
      yield randomInteger;
      yield new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  async function consumeFeed() {
    const feed = infiniteRandomIntegerFeed();

    while (true) {
      const value = feed.next().value;
      if (value instanceof Promise) {
        await value;
        continue;
      }
      console.log(value);
    }
  }
  // consumeFeed();

  function* finiteRandomIntegerGenerator() {
    let count = 0;
    while (count < 5) {
      yield Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // Yield a random integer
      count++;
    }
  }
</script>

<svelte:head>
  <title>artboard - boids</title>
</svelte:head>

<div class="top">
  <svg width="800" height="600">
    <rect
      x={container.x}
      y={container.y}
      width={container.width}
      height={container.height}
      fill="none"
      stroke="silver"
      stroke-width="1"
    >
    </rect>
    {#each boids as b}
      {@const { pos, rad } = b}
      {@const pathEnd = b.path.at(-1)}
      <circle cx={pos.current.x} cy={pos.current.y} r={rad} />
      <!-- 
      <text x={pos.current.x + rad + 2} y={pos.current.y} class="small">
        ({pos.current.x.toFixed(3)}, {pos.current.y.toFixed(2)})
      </text>
      <text x={pos.current.x + rad + 2} y={pos.current.y + 13} class="small">
        ({pathEnd?.duration})
      </text>
 -->
    {/each}
    <line
      x1={greenSegw.from.current.x}
      y1={greenSegw.from.current.y}
      x2={greenSegw.to.current.x}
      y2={greenSegw.to.current.y}
      stroke="green"
      stroke-width="1"
    />
  </svg>
  <div class="table">
    {#each boids as b}
      <div class:done={b.done} class="small">
        {b.pos.current.x}
      </div>
      <div class:done={b.done} class="small">
        {b.pos.current.y}
      </div>
    {/each}
  </div>
</div>
<nav class="button-bar">
  <button onclick={bounce}>Bounce</button>
  <button onclick={scatter}>Scatter</button>
  <button onclick={organize}>Organize</button>
  <label>
    <input type="checkbox" />
    Extra Fun
  </label>
</nav>

<!-- <pre class="small">{JSON.stringify(boids, undefined, 2)}</pre> -->

<style>
  /* 

  * {
    outline: thin solid lime;
  }

 */

  .button-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
  }

  .top {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1em;
    justify-content: center;
    align-items: center;
  }

  .table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 20ch;
  }

  .table div {
    background-color: var(--blue);
    color: white;
  }

  .table div.done {
    background-color: unset;
    color: unset;
  }

  svg {
    display: block;
    border: thin solid var(--blue);
    width: 800px;
    height: 600px;
  }

  circle {
    fill: black;
  }

  .small {
    font: 7px sans-serif;
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
