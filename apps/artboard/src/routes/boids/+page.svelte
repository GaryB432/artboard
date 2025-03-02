<script lang="ts">
  import { getRandomElement } from "$lib/utils/misc";
  import { type Segment, makeRectangle } from "@artboard/graphics";
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
  }

  const margin = 10;
  const maxSpeed = 1000;

  const solidDOMRect = new DOMRect(0, 0, 400, 300);

  let thatRect = $derived(
    new DOMRect(
      solidDOMRect.x + margin,
      solidDOMRect.y + margin,
      solidDOMRect.width - margin * 2,
      solidDOMRect.height - margin * 2,
    ),
  );

  let rectCenter = $derived(
    new Vector(
      thatRect.left + thatRect.width / 2,
      thatRect.top + thatRect.height / 2,
    ),
  );

  const rectSegs = $derived(makeRectangle(thatRect));

  let qbs = new Array(1).fill(null).map<Boid>((_, i) => {
    return {
      pos: new Tween<Vector>(rectCenter.clone()),
      speed: 1,
      rad: 5,
    };
  });

  let currentBoundary: Segment = {
    from: new Vector(0, 0),
    to: new Vector(0, 0),
  };

  const greenSegw: TweenedSegment = $derived({
    from: new Tween<Vector>(rectCenter.clone(), { duration: 200 }),
    to: new Tween<Vector>(rectCenter.clone(), { duration: 200 }),
  });

  // console.log(rectSegs);

  let boids: Boid[] = $state(qbs);

  function segmentMag(segment: Segment): number {
    return segment.from.distanceTo(segment.to);
  }

  function segmentEq(a: Segment, b: Segment): boolean {
    return (
      a.from.x === b.from.x &&
      a.to.x === b.to.x &&
      a.from.y === b.from.y &&
      a.to.y === b.to.y
    );
  }

  function getRandomPointOnLine(s: { from: Vector; to: Vector }) {
    const t = Math.random();

    // Calculate the x and y coordinates of the random point using linear interpolation (lerp)
    const x = s.from.x + t * (s.to.x - s.from.x);
    const y = s.from.y + t * (s.to.y - s.from.y);

    return new Vector(x, y);
  }

  // // Example usage:
  // const linePoint1 = { x: 1, y: 1 };
  // const linePoint2 = { x: 5, y: 4 };

  // const randomPoint = getRandomPointOnLine(linePoint1, linePoint2);
  // console.log(randomPoint);

  function randomOne() {
    const boid = boids[0];

    const boxSegs = Object.values(rectSegs);

    const pointsOnBox = boxSegs.map<Vector>((s) => {
      if (s.from.x === s.to.x) {
        return new Vector(s.from.x, Math.random() * segmentMag(s) + margin);
      }
      return new Vector(Math.random() * segmentMag(s) + margin, s.from.y);
    });

    const from = boid.pos.current;

    const nb = () => {
      const el = getRandomElement(
        boxSegs.filter((b) => !segmentEq(currentBoundary, b)),
      );
      return el;
    };

    let nextBoundary: Segment = nb();
    console.log(
      JSON.stringify({ nextBoundary, currentBoundary }, undefined, 2),
    );
    if (segmentEq(nextBoundary, currentBoundary)) {
      throw new Error("nope");
    }

    // if (s)

    const p2 = getRandomPointOnLine(nextBoundary);

    const to = p2;

    // let to = getRandomElement(pointsOnBox);

    const motion: Segment = { from, to };

    console.log(segmentMag(motion));

    const m = segmentMag(motion);
    const d = { from: motion.from, to: motion.to.scale(9) };

    boid.pos.set(motion.to, { duration: boid.speed * maxSpeed });
    boid.speed -= 0.01;
    greenSegw.from.set(motion.from, { duration: 0 }).then(() => {
      greenSegw.to.set(motion.to, { duration: 0 });
      currentBoundary = nextBoundary;
    });
  }

  function* infiniteRandomIntegerFeed() {
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

  consumeFeed();
</script>

<svelte:head>
  <title>artboard - boids</title>
</svelte:head>

<div class="main">
  <div class="board">
    <svg width="400" height="300" viewBox="0 0 400 300">
      <!-- {#each Object.values(rectSegs) as s}
        <line
          x1={greenSegw.from.current.x}
          y1={greenSegw.from.current.y}
          x2={greenSegw.to.current.x}
          y2={greenSegw.to.current.y}
          stroke="green"
          stroke-width="2"
        ></line>
      {/each} -->

      <rect
        x={thatRect.x}
        y={thatRect.y}
        width={thatRect.width}
        height={thatRect.height}
        fill="none"
        stroke="blue"
        stroke-width="1"
      ></rect>

      {#each boids as b}
        <circle cx={b.pos.current.x} cy={b.pos.current.y} r={b.rad} />
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
