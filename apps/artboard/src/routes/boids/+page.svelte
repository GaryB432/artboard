<script lang="ts">
  import { getRandomElement } from "$lib/utils/misc";
  import {
    type Rectangle,
    makeRectangle,
    pointOnLineAtAngle,
  } from "@artboard/graphics";
  import { Vector } from "@artboard/vector";
  import { Tween } from "svelte/motion";
  import { elasticInOut, elasticOut } from "svelte/easing";

  type TweenedSegment = {
    from: Tween<Vector>;
    to: Tween<Vector>;
  };

  interface Boid {
    pos: Tween<Vector>;
    rad: number;
    speed: number;
    to: Vector;
    path: Motion[];
    // edge?: EdgeName;
  }

  const margin = 10;
  const maxSpeed = 1000;

  const basisRect = new DOMRect(0, 0, 400, 300);

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

  type Motion = {
    to: Vector;
    duration: number;
  };

  export function getRandomElementExcluding<T>(array: T[], exclude: T[]): T {
    return getRandomElement(
      array.filter((a) => exclude.length === 0 || !exclude.includes(a)),
    );
  }

  // function getRandomElementExcluding() {}

  let boids: Boid[] = $state(
    new Array(3).fill(null).map<Boid>((_, i) => {
      // let edgen: EdgeName = ;
      let fromEdge: EdgeName | null = null;
      let rad = Math.random() * 15 + 5;
      const path = new Array(10).fill(0).map<Motion>((_, i) => {
        let nextEdge: EdgeName;

        //       let boidEdge: EdgeName

        nextEdge = getRandomElementExcluding(
          ["top", "right", "bottom", "left"],
          fromEdge ? [fromEdge] : [],
        );
        fromEdge = nextEdge;

        const edge: EdgeName = nextEdge;

        // boidEdge = nextEdge;

        const boundaryRect = makeRectangle(container, rad);

        // let currentBoundary = boundaryRect[edgen];

        // const from = boid.pos.current;

        const angle = Math.PI / 4;

        const to = getRandomPointOnLine(boundaryRect[edge]);
        const duration = 1000;
        return {
          angle,
          edge,
          to,
          duration,
        };
      });
      const newLocal: Boid = {
        pos: new Tween<Vector>(rectCenter.clone()),
        rad,
        speed: 1,
        to: rectCenter.clone(),
        path,
      };
      return newLocal;
    }),
  );

  function getRandomPointOnLine(segment: { from: Vector; to: Vector }) {
    const t = Math.random();
    const x = segment.from.x + t * (segment.to.x - segment.from.x);
    const y = segment.from.y + t * (segment.to.y - segment.from.y);
    return new Vector(x, y);
  }

  type EdgeName = keyof Rectangle;

  // const wallGenerator = nextWallGenerator(["top", "right", "bottom", "left"]);

  async function advance(): Promise<void> {
    Promise.all(boids.map((b) => b.pos.set(rectCenter, { duration: 0 })));

    boids.forEach(async (boid, i, f) => {
      for (const m of boid.path) {
        await boid.pos.set(m.to, {
          duration: (m.duration / f.length) * (i + 1),
        });
      }
      // await boid.pos.set(rectCenter, { duration: 500, easing: elasticOut });
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

  $inspect(boids);
</script>

<svelte:head>
  <title>artboard - boids</title>
</svelte:head>

<div class="main">
  <div class="board">
    <svg width="400" height="300" viewBox="0 0 400 300">
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
  </div>
  <nav class="button-bar">
    <button onclick={advance}>Random</button>
  </nav>
  <div class="table">
    {#each boids as b}
      <div class="small">
        {b.pos.current.x}
      </div>
    {/each}
  </div>
  <pre class="small">{JSON.stringify(boids, undefined, 2)}</pre>
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
