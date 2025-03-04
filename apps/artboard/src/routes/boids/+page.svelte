<script lang="ts">
  import { getRandomElement } from "$lib/utils/misc";
  import { type Rectangle, makeRectangle } from "@artboard/graphics";
  import { Vector } from "@artboard/vector";
  import { Tween } from "svelte/motion";

  type TweenedSegment = {
    from: Tween<Vector>;
    to: Tween<Vector>;
  };

  interface Boid {
    pos: Tween<Vector>;
    rad: number;
    speed: number;
    to: Vector;
    edge?: EdgeName;
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

  let boids: Boid[] = $state(
    new Array(3).fill(null).map<Boid>((_, i) => {
      return {
        pos: new Tween<Vector>(rectCenter.clone()),
        rad: Math.random() * 15 + 5,
        speed: 1,
        to: rectCenter.clone(),
      };
    }),
  );

  function getRandomPointOnLine(s: { from: Vector; to: Vector }) {
    const t = Math.random();

    // Calculate the x and y coordinates of the random point using linear interpolation (lerp)
    const x = s.from.x + t * (s.to.x - s.from.x);
    const y = s.from.y + t * (s.to.y - s.from.y);

    return new Vector(x, y);
  }

  type EdgeName = keyof Rectangle;

  // const wallGenerator = nextWallGenerator(["top", "right", "bottom", "left"]);

  async function advance(): Promise<void> {
    // return new Promise((a, b) => {
    //   a();
    // });
    // const boid = boids[0];

    boids.forEach((boid) => {
      // let nw: IteratorResult<keyof Rectangle, void>;
      // do {
      //   nw = wallGenerator.next();
      // } while (!nw.done && nw.value === boid.edge);

      // if (nw.done) {
      //   throw new Error("should not run out");
      // }

      // boid.edge = nw.value!;

      let nextEdge: EdgeName;

      nextEdge = getRandomElement(
        ["top", "right", "bottom", "left"].filter(
          (g) => g !== boid.edge,
        ) as EdgeName[],
      );

      boid.edge = nextEdge;

      let boundaryRect = makeRectangle(container, boid.rad);

      let currentBoundary = boundaryRect[boid.edge];

      // const from = boid.pos.current;

      boid.to = getRandomPointOnLine(currentBoundary);

      if (
        boid.to.distanceTo(currentBoundary.from) < boid.rad ||
        boid.to.distanceTo(currentBoundary.to) < boid.rad
      ) {
        console.warn("bounds");
      }
    });

    const mots = boids.map((b) => b.pos.set(b.to));

    void (await Promise.all(mots));

    // for (const boid of boids) {
    //   void (await boid.pos.set(boid.to, { duration: 500 }));
    // }
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
        <circle cx={b.pos.current.x} cy={b.pos.current.y} r={b.rad} />
        <text x={b.pos.current.x} y={b.pos.current.y} class="small">
          ({b.pos.current.x + 8}, {b.pos.current.y + 8})
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
