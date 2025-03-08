<script lang="ts">
  import { getBouncyPathForCircle, type Motion } from "$lib/motion/motion";
  import { GridPath } from "$lib/motion/paths";
  import { shuffle } from "$lib/utils/misc";
  import { Vector } from "@artboard/vector";
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
    speed: number;
    to: Vector;
    path: Motion[];
  }

  const margin = 10;
  const maxSpeed = 1000;

  const basisRect = new DOMRect(0, 0, 800, 600);

  let container = new DOMRect(
    basisRect.x + margin,
    basisRect.y + margin,
    basisRect.width - margin * 2,
    basisRect.height - margin * 2,
  );

  let rectCenter = new Vector(
    container.left + container.width / 2,
    container.top + container.height / 2,
  );

  const greenSegw: TweenedSegment = $derived({
    from: new Tween<Vector>(rectCenter.clone(), { duration: 200 }),
    to: new Tween<Vector>(rectCenter.clone(), { duration: 200 }),
  });

  let boids: Boid[] = $state(
    new Array(28).fill(null).map<Boid>((_, id) => {
      let rad = Math.floor(Math.random() * 10 + 5);

      return {
        id,
        pos: new Tween<Vector>(rectCenter.clone()),
        rad,
        speed: 1,
        to: rectCenter.clone(),
        done: false,
        path: [],
        // pathLength: 10,
        // pathDuration: 1000,
      };
    }),
  );

  async function organize(): Promise<void> {
    // Promise.all(boids.map((b) => b.pos.set(rectCenter, { duration: 0 })));

    boids.forEach((b) => {
      const ll = b.path.at(-1) ?? "tbd";

      console.log(JSON.stringify({ current: b.pos.current.y, ll }));
    });

    boids = shuffle(boids);

    boids.forEach(async (boid, i, f) => {
      const savingThePosDammit = boid.pos.current;
      const lastPathEnd = boid.path.at(-1) ?? { to: boid.pos.current };

      if (lastPathEnd.to!.y !== boid.pos.current.y) {
        console.error(
          JSON.stringify({
            lp: lastPathEnd?.to,
            ff: boid.pos.current,
            ll: boid.path.length,
          }),
        );
        throw new Error("wtf");
      }
      const pos: Vector = boid.pos.current;
      console.log(pos);
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
        await boid.pos.set(m.to, {
          duration: m.duration,
        });
      }
    });
  }

  async function advance(): Promise<void> {
    Promise.all(boids.map((b) => b.pos.set(rectCenter, { duration: 0 })));

    boids.forEach(async (boid, i, f) => {
      boid.path = getBouncyPathForCircle(
        container,
        Math.random() * 5000 + 1000,
        3,
        boid.rad,
      );
      const toBottom: Motion = {
        delay: 0,
        duration: 3000,
        to: new Vector(boid.path.at(-1)!.to.x, container.bottom - boid.rad),
      };
      boid.path.push(toBottom);
      for (const m of boid.path) {
        await boid.pos.set(m.to, {
          delay: m.delay,
          duration: m.duration,
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
      stroke="blue"
      stroke-width="1"
    >
    </rect>
    {#each boids as b}
      {@const { pos, rad } = b}
      {@const pathEnd = b.path.at(-1)}
      <circle cx={pos.current.x} cy={pos.current.y} r={rad} />
      <text x={pos.current.x + rad + 2} y={pos.current.y} class="small">
        ({pos.current.x.toFixed(3)}, {pos.current.y.toFixed(2)})
      </text>
      <text x={pos.current.x + rad + 2} y={pos.current.y + 13} class="small">
        ({pathEnd?.duration})
      </text>
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
  <button onclick={advance}>Bounce</button>
  <button onclick={organize}>Organize</button>
  <label>
    <input type="checkbox" />
    Extra Fun
  </label>
</nav>
<pre class="small">{JSON.stringify(boids, undefined, 2)}</pre>

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
    gap: 1em;
    width: 10em;
  }

  svg {
    display: block;
    border: thin solid silver;
    width: 800px;
    height: 600px;
  }

  .small {
    font: italic 9px sans-serif;
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
