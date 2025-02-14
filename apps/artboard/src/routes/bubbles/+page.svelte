<script lang="ts">
  import { Vector } from "$lib/vector/vector";
  import { onMount } from "svelte";
  import { Tween } from "svelte/motion";
  import { fade } from "svelte/transition";

  let title = $state("Floating Bubbles");
  let container: SVGSVGElement | undefined = $state();
  let containerRect: DOMRect = $derived(
    container ? container.getBoundingClientRect() : new DOMRect(0, 0, 0, 0),
  );

  interface Bubble {
    id: number;
    x: Tween<number>;
    y: Tween<number>;
    velocity: Vector;

    size: number;
    color: string;
  }

  let bubbles: Bubble[] = $derived(
    Array.from({ length: 50 }, (_, i) => {
      const x = new Tween(Math.random() * containerRect.width);
      const y = new Tween(Math.random() * containerRect.height);
      return {
        id: i,
        x,
        y,
        velocity: new Vector(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ),
        size: Math.random() * 20 + 5,
        color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
      };
    }),
  );
  $inspect(container?.getBoundingClientRect());
  $inspect(bubbles);

  let lastFrameTime = 0;
  let startTime = 0;

  onMount(() => {
    startTime = performance.now();
    lastFrameTime = startTime;
    requestAnimationFrame(update);
  });

  function update(time: number) {
    // if (!ctx) return;

    const deltaTime = time - lastFrameTime; // Time since the last frame
    lastFrameTime = time;

    const elapsed = time - startTime; // Total elapsed time

    // bubbles.forEach((b) => {
    //   b.x.set(b.x.current + b.velocity.x);
    //   b.y.set(b.y.current + b.velocity.y);
    // });

    // // Clear the canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // // Example: Draw a rectangle that moves based on elapsed time.
    // const x = Math.sin(elapsed / 1000) * 100 + 150; // Example animation
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(x, 50, 50, 50);

    //  // Display the elapsed time
    // ctx.fillStyle = 'black';
    // ctx.fillText(`Elapsed Time: ${elapsed.toFixed(0)}ms`, 10, 10);

    requestAnimationFrame(update);
  }

  function moveBubbles() {
    bubbles.forEach((b) => {
      b.x.set(b.x.current + 200, { duration: 1000 });
    });
  }

  onMount(() => {
    startTime = performance.now();
    lastFrameTime = startTime;
    requestAnimationFrame(update);
  });
</script>

<div class="container">
  <div class="bubbles-container">
    <svg class="bubbles-svg" bind:this={container}>
      {#each bubbles as bubble (bubble.id)}
        <!-- use animatebubble -->
        <circle
          cx={bubble.x.current}
          cy={bubble.y.current}
          r={bubble.size}
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

      <div class="button-container">
        <button class="explore-button" onclick={moveBubbles}>
          <span class="button-text">Explore the Bubbles</span>
          <span class="button-arrow">→</span>
        </button>
      </div>
    </div>
  </div>
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
    height: 100%;
    width: 100%;
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
</style>
