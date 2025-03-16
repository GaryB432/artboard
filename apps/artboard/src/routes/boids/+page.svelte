<script lang="ts">
  import { type Motion } from "$lib/motion/motion";
  import { BouncePath, GridPath } from "$lib/motion/paths";
  import { shuffle } from "$lib/utils/misc";
  import { Vector } from "@artboard/vector";
  import { onMount } from "svelte";
  import { quintIn } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { scale } from "svelte/transition";

  type TweenedSegment = {
    from: Tween<Vector>;
    to: Tween<Vector>;
  };

  interface Boid {
    id: number;
    done: boolean;
    path: Motion[];
    pos: Tween<Vector>;
    rad: number;
    to: Vector;
  }

  const margin = 10;

  let boids: Boid[] = $state([]);

  let basis: SVGSVGElement | null = $state(null);

  let selected: Vector | null = $state(null);

  // const basisRect = $derived(basis ? )

  const basisRect = $derived.by(() => {
    const r = basis ? basis.getBoundingClientRect() : new DOMRect(0, 0, 0, 0);
    return new DOMRect(0, 0, r.width, r.height);
  });

  const container = $derived(
    new DOMRect(
      basisRect.x + margin,
      basisRect.y + margin,
      basisRect.width - margin * 2,
      basisRect.height - margin * 2,
    ),
  );

  const rectPos = $derived(new Vector(container.left, container.top));
  const rectSize = $derived(new Vector(container.width, container.height));

  const rectCenter = $derived(rectPos.add(rectSize.scale(0.5)));

  const greenSegw: TweenedSegment = $derived({
    from: new Tween<Vector>(rectCenter.clone()),
    to: new Tween<Vector>(rectCenter.clone()),
  });

  const maxRadius = $derived(
    boids.reduce((a, b) => {
      return Math.max(a, b.rad);
    }, 0),
  );

  onMount(() => {
    boids = new Array(50).fill(null).map<Boid>((_, id) => {
      const rad = Math.floor(Math.random() * 10 + 5);

      return {
        id,
        pos: new Tween<Vector>(rectCenter.clone()),
        rad,
        to: rectCenter.clone(),
        done: true,
        path: [],
      };
    });
  });

  async function scatter(): Promise<void> {
    boids = shuffle(boids);
    const overallDuration = 3000;
    const inc = (2 * Math.PI) / boids.length;
    const r = Math.min(container.width, container.height) * 0.4;
    boids.forEach((boid, i) => {
      const angle = i * inc;
      const to = new Vector(Math.cos(angle) * r, Math.sin(angle) * r)
        .add(rectCenter)
        .add(rectPos);
      boid.done = false;
      const delay = i * (overallDuration / boids.length);
      boid.pos
        .set(to, { duration: overallDuration - delay, delay })
        .then(() => {
          boid.done = true;
        });
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
        8,
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

  async function gatherUp(): Promise<void> {
    await Promise.all(
      boids.map(async (b, i) => {
        b.done = false;
        return Promise.resolve<void>(
          b.pos
            .set(selected ? selected : rectCenter, {
              duration: 200,
              delay: i * 50,
              easing: quintIn,
            })
            .then(() => {
              b.done = true;
            }),
        );
      }),
    );
  }

  async function bounce(): Promise<void> {
    await gatherUp();

    selected = null;

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
        // greenSegw.from.set(greenSegw.to.current);
        // greenSegw.to.set(m.to);
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
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <svg
    bind:this={basis}
    width="800"
    height="600"
    onclick={(e) => {
      // const old = selected;
      const mouseOffset = new Vector(e.offsetX, e.offsetY);
      selected =
        selected && selected.distanceTo(mouseOffset) < 10 ? null : mouseOffset;
    }}
  >
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

    {#if selected}
      <path
        in:scale
        out:scale
        id="cursor"
        fill="currentColor"
        transform="translate({selected.x}, {selected.y})"
        d="M -9 -1 C -8.5 -5 -5 -8.5 -1 -9 L -1 -11 L 1 -11 L 1 -9 C 5 -8.5 8.5 -5 9 -1 L 11 -1 L 11 1 L 9 1 C 8.5 5 5 8.5 1 9 L 1 11 L -1 11 L -1 9 C -5 8.5 -8.5 5 -9 1 L -11 1 L -11 -1 L -9 -1 Z
           M -7 -1 L -5 -1 L -5 1 L -7 1 C -6.5 4 -4 6.5 -1 7 L -1 5 L 1 5 L 1 7 C 4 6.5 6.5 4 7 1 L 5 1 L 5 -1 L 7 -1 C 6.5 -4 4 -6.5 1 -7 L 1 -5 L -1 -5 L -1 -7 C -4 -6.5 -6.5 -4 -7 -1 Z
           M 0 2 C -1 2 -2 1 -2 0 C -2 -1 -1 -2 0 -2 C 1 -2 2 -1 2 0 C 2 1 1 2 0 2 Z"
      />
    {/if}
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
    border: thin solid black;
    width: 400px;
    height: 300px;
  }

  circle {
    fill: black;
  }

  .small {
    font: 7px sans-serif;
  }

  #cursor {
    color: var(--blue);
  }

  @media screen and (min-width: 576px) {
    /* landscape phones */
  }
  @media screen and (min-width: 768px) {
    /* tablets */
  }
  @media screen and (min-width: 992px) {
    svg {
      width: 800px;
      height: 600px;
    }
  }
  @media screen and (min-width: 1200px) {
    /* large desktops */
  }
  @media screen and (min-width: 1400px) {
    /* larger desktops */
  }
</style>
