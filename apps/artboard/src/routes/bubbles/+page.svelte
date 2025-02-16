<script lang="ts">
  import { browser } from "$app/environment";

  interface Point {
    x: number;
    y: number;
  }

  interface Bubble {
    center: Point;
    color: string;
    id: number;
    mass: number;
    radius: number;
    restitution: number;
    velocity: Point;
  }

  let playing = $state(true);
  let title = $state("Floating Bubbles");
  let container: SVGSVGElement | undefined = $state();
  let containerRect: DOMRect = $derived(
    container ? container.getBoundingClientRect() : new DOMRect(0, 0, 0, 0),
  );

  const gravity = 9.8;

  function checkBubbleCollision(c1: Bubble, c2: Bubble): boolean {
    const dx = c2.center.x - c1.center.x;
    const dy = c2.center.y - c1.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c1.radius + c2.radius;
  }

  function resolveBubbleCollision(c1: Bubble, c2: Bubble) {
    // Calculate the vector between the centers of the two circles
    const dx = c2.center.x - c1.center.x;
    const dy = c2.center.y - c1.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the collision normal (unit vector pointing from c1 to c2)
    const normalX = dx / distance;
    const normalY = dy / distance;

    // Calculate the relative velocity of the two circles
    const relativeVelocityX = c2.velocity.x - c1.velocity.x;
    const relativeVelocityY = c2.velocity.y - c1.velocity.y;

    // Calculate the dot product of the relative velocity and the collision normal.
    // This tells us how much the circles are moving *towards* each other.
    const dotProduct =
      relativeVelocityX * normalX + relativeVelocityY * normalY;

    // If the dot product is positive, the circles are moving away from each other,
    // so there's no collision to resolve.
    if (dotProduct > 0) return;

    // Elasticity: Controls how "bouncy" the collision is.
    // 0.0: Completely inelastic (circles stick together).
    // 1.0: Perfectly elastic (no energy loss).
    const elasticity = 0.8; // Adjust this value for different bounciness

    // Calculate the impulse (change in momentum) needed to separate the circles.
    // This formula takes into account the masses and elasticity.
    const impulse =
      (-(1 + elasticity) * dotProduct) / (1 / c1.mass + 1 / c2.mass);

    // Update the velocities of the circles based on the impulse and their masses.
    // The impulse is distributed proportionally to the inverse of their masses.
    c1.velocity.x -= (impulse * normalX) / c1.mass;
    c1.velocity.y -= (impulse * normalY) / c1.mass;
    c2.velocity.x += (impulse * normalX) / c2.mass;
    c2.velocity.y += (impulse * normalY) / c2.mass;

    // Separate the circles to prevent them from sticking together.
    // The amount of separation is proportional to their masses.
    const overlap = c1.radius + c2.radius - distance;
    c1.center.x -= (overlap * normalX * c2.mass) / (c1.mass + c2.mass);
    c1.center.y -= (overlap * normalY * c2.mass) / (c1.mass + c2.mass);
    c2.center.x += (overlap * normalX * c1.mass) / (c1.mass + c2.mass);
    c2.center.y += (overlap * normalY * c1.mass) / (c1.mass + c2.mass);
  }

  function arrangeBubbles() {
    const cols = 5;
    // const mr = Math.max(containerRect.width, containerRect.height) * (1 / cols);
    const mr = 50;
    const rowsNeeded = Math.ceil(bubbles.length / cols);

    const topLeft: Point = {
      // x: (containerRect.width - rowsNeeded * mr) * 0.5,

      x: (containerRect.width - (cols - 1) * mr) * 0.5,
      y: (containerRect.height - (rowsNeeded - 1) * mr) * 0.5,
    };

    bubbles.forEach((b, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      b.center = { x: topLeft.x + c * mr, y: topLeft.y + r * mr };
      b.velocity = { x: 0, y: 0 };
    });
  }

  function animateBubbles(deltaTime: number) {
    for (let i = 0; i < bubbles.length; i++) {
      const b1 = bubbles[i];

      const grav = gravity * 0.1;

      const acceleration: Point = { x: 0, y: 0 };
      acceleration.y += gravity / b1.mass;

      b1.velocity.x += acceleration.x * deltaTime;
      b1.velocity.y += acceleration.y * deltaTime;

      b1.center.x += b1.velocity.x * deltaTime;
      b1.center.y += b1.velocity.y * deltaTime;

      const bottomEdge = containerRect.height;
      if (b1.center.y + b1.radius > bottomEdge) {
        b1.center.y = bottomEdge - b1.radius;
        b1.velocity.y = -b1.velocity.y * b1.restitution;
        b1.velocity.x += (Math.random() - 0.5) * 50;
        b1.velocity.x *= grav;
        b1.velocity.y *= grav;

        if (
          Math.abs(b1.velocity.y) < 1 &&
          Math.abs(b1.velocity.x) < 1 &&
          b1.center.y + b1.radius > bottomEdge - 5
        ) {
          b1.velocity.x = 0;
          b1.velocity.y = 0;
        }
      }
      if (b1.center.y - b1.radius < 0) {
        b1.center.y = b1.radius;
        b1.velocity.y = -b1.velocity.y * b1.restitution;
        b1.velocity.x += (Math.random() - 0.5) * 50;
        b1.velocity.x *= grav;
        b1.velocity.y *= grav;
      }
      if (b1.center.x + b1.radius > containerRect.width) {
        b1.center.x = containerRect.width - b1.radius;
        b1.velocity.x = -b1.velocity.x * b1.restitution;
        b1.velocity.x *= grav;
        b1.velocity.y *= grav;
      }
      if (b1.center.x - b1.radius < 0) {
        b1.center.x = b1.radius;
        b1.velocity.x = -b1.velocity.x * b1.restitution;
        b1.velocity.x *= grav;
        b1.velocity.y *= grav;
      }

      for (let j = i + 1; j < bubbles.length; j++) {
        const b2 = bubbles[j];
        if (checkBubbleCollision(b1, b2)) {
          resolveBubbleCollision(b1, b2);
        }
      }
    }
  }

  let lastFrameTime = performance.now();

  let bubbles: Bubble[] = $derived(
    Array.from({ length: 50 }, (_, i) => {
      const radius = Math.random() * 20 + 5;
      return {
        id: i,
        center: {
          x: Math.random() * containerRect.width,
          y: Math.random() * containerRect.height,
        },
        radius,
        mass: radius / 20,
        velocity: {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
        },
        restitution: 0.8,
        color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
      };
    }),
  );

  function gameLoop() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    animateBubbles(deltaTime);

    for (let i = 0; i < bubbles.length; i++) {
      const circleElement = document.getElementById(
        `circle${i}`,
      )! as unknown as SVGCircleElement;
      if (circleElement) {
        circleElement.setAttribute("cx", bubbles[i].center.x.toString());
        circleElement.setAttribute("cy", bubbles[i].center.y.toString());
      }
    }

    requestAnimationFrame(gameLoop);
  }

  if (browser) {
    gameLoop();
  }
</script>

<div class="container">
  <div class="bubbles-container">
    <svg class="bubbles-svg" bind:this={container}>
      {#each bubbles as bubble (bubble.id)}
        <!-- use animatebubble -->
        <circle
          id="circle{bubble.id}"
          cx={bubble.center.x}
          cy={bubble.center.y}
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

      <div class="button-container">
        <button class="explore-button" onclick={arrangeBubbles}>
          <span class="button-text">Explore the Bubbles</span>
          <span class="button-arrow">→</span>
        </button>
      </div>
    </div>
  </div>
  <div class="button-box">
    coming soon
  </div>
</div>

<style>
  * {
    border: thin solid lime;
  }
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
