<script lang="ts">
  import { Tween } from "svelte/motion";
  import Controls from "./Controls.svelte";
  import { bubblesState } from "./state.svelte";

  import { shuffle } from "$lib/utils/misc";

  import { onMount } from "svelte";

  interface Point {
    x: number;
    y: number;
  }

  interface Bubble {
    center: Tween<Point>;
    color: string;
    id: number;
    // lerpProgress: number;
    mass: number;
    radius: number;
    restitution: number;
    targetCenter: Point | null;
  }

  // const scaledAnimationSpeed = $derived(bubblesState.animationSpeed * 0.09);
  // const scaledGravity = $derived(bubblesState.gravity * 0.1 + 9.8);
  // const scaledVelocity = $derived(bubblesState.initialVelocity * 2 + 200);

  let playing = $state(true);
  let title = $state("Floating Bubbles");
  let container: SVGSVGElement | undefined = $state();
  let containerRect: DOMRect = $derived(
    container ? container.getBoundingClientRect() : new DOMRect(0, 0, 0, 0),
  );

  // Grid Functions
  const gridSpacing = 50;
  const gridStartX = 50;
  const gridStartY = 50;

  function randomize() {
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      b.targetCenter = {
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
      };
    }
    // shuffle(bubbles);
  }

  function lineUp() {
    shuffle(bubbles);
    const cols = 10;
    // const mr = Math.max(containerRect.width, containerRect.height) * (1 / cols);
    const mr = 100;
    const rowsNeeded = Math.ceil(bubbles.length / cols);

    const topLeft: Point = {
      x: (containerRect.width - (cols - 1) * mr) * 0.5,
      y: (containerRect.height - (rowsNeeded - 1) * mr) * 0.5,
    };

    bubbles.forEach((b, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      b.targetCenter = { x: topLeft.x + c * mr, y: topLeft.y + r * mr };
    });
  }

  function draw() {
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      if (b.targetCenter) {
        b.center.set(
          {
            x: b.targetCenter.x,
            y: b.targetCenter.y,
          },
          { duration: 1000, delay: i * 100 },
        );
      }
    }
  }

  let bubbles: Bubble[] = $state([]);

  onMount(() => {
    bubbles = Array.from({ length: 50 }, (_, i) => {
      const radius = Math.random() * 20 + 5;
      const center = new Tween({
        x: containerRect.width / 2,
        y: containerRect.height / 4,
      });
      const bubble: Bubble = {
        id: i,
        center,
        targetCenter: null,
        radius,
        mass: radius / 20,
        restitution: 0.8,
        color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
      };
      return bubble;
    });
    setTimeout(() => {
      randomize();
      draw();
    }, 500);
    draw();
  });
</script>

<div class="container">
  <div class="bubbles-container">
    <svg class="bubbles-svg" bind:this={container}>
      {#each bubbles as bubble (bubble.id)}
        <!-- use animatebubble -->
        <circle
          id="circle{bubble.id}"
          cx={bubble.center.current.x}
          cy={bubble.center.current.y}
          r={bubble.radius}
          fill={bubble.color}
        />
      {/each}
    </svg>
  </div>
  <div class="content">
    <div class="title-container">
      <h1 class="title">
        {#each title.split(" ") as word, wordIndex}
          <span class="word">
            {#each word.split("") as letter, letterIndex}
              <span
                class="letter"
                style="animation: spring-in {0.5 +
                  wordIndex * 0.1 +
                  letterIndex * 0.03}s ease-out {wordIndex * 0.1 +
                  letterIndex * 0.03}s both;"
              >
                {letter}
              </span>
            {/each}
          </span>
        {/each}
      </h1>
    </div>
    <div class="button-container">
      <button
        class="explore-button"
        onclick={(e) => {
          lineUp();
          draw();
        }}
      >
        <span class="button-text">Explore the Bubbles</span>
        <span class="button-arrow">→</span>
      </button>
    </div>
  </div>
  <!-- <div class="button-box">
    <Controls></Controls>
  </div> -->
</div>

<style>
  @keyframes -global-spring-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    60% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .container {
    position: relative;
    min-height: 85vh;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(to bottom right, #e0f2fe, #f3e8ff);
  }

  .content {
    position: relative;
    z-index: 10;
    text-align: center;
    padding: 0 1rem;
  }

  .bubbles-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .bubbles-svg {
    width: 100%;
    height: 100%;
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
    letter-spacing: -0.05em;
    line-height: 1.2;
  }

  .word {
    display: inline-block;
    margin-right: 1rem;
  }

  .word:last-child {
    margin-right: 0;
  }

  .letter {
    font-size: 96px;
    line-height: 1em;
    display: inline-block;
    background: linear-gradient(to right, #2563eb, #9333ea);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .button-container {
    display: inline-block;
    position: relative;
    background: linear-gradient(
      to bottom,
      rgba(59, 130, 246, 0.3),
      rgba(147, 51, 234, 0.3)
    );
    padding: 1px;
    border-radius: 1rem;
    backdrop-filter: blur(8px);
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }

  .button-container:hover {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .explore-button {
    background: rgba(255, 255, 255, 0.8);
    color: #2563eb;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    border-radius: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .explore-button:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }

  .button-text {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  .explore-button:hover .button-text {
    opacity: 1;
  }

  .button-arrow {
    margin-left: 0.75rem;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  .explore-button:hover .button-arrow {
    opacity: 1;
    transform: translateX(6px);
  }

  .button-box {
    position: absolute;
    border: thin solid lime;
    top: 0.75rem;
    height: 100%;
    right: 0.75rem;
  }
</style>
