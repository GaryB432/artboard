<script lang="ts">
  import Controls from "./Controls.svelte";
  import { bubblesState } from "./state.svelte";

  interface Point {
    x: number;
    y: number;
  }

  interface Bubble {
    center: Point;
    color: string;
    id: number;
    lerpProgress: number;
    mass: number;
    radius: number;
    restitution: number;
    targetCenter: Point | null;
    velocity: Point;
  }

  // const scaledAnimationSpeed = $derived(bubblesState.animationSpeed * 0.09);
  // const scaledGravity = $derived(bubblesState.gravity * 0.1 + 9.8);
  const scaledVelocity = $derived(bubblesState.initialVelocity * 2 + 200);

  let playing = $state(true);
  let title = $state("Floating Bubbles");
  let container: SVGSVGElement | undefined = $state();
  let containerRect: DOMRect = $derived(
    container ? container.getBoundingClientRect() : new DOMRect(0, 0, 0, 0),
  );

  // let gravity = $state(9.8);

  function checkBubbleCollision(c1: Bubble, c2: Bubble): boolean {
    const dx = c2.center.x - c1.center.x;
    const dy = c2.center.y - c1.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c1.radius + c2.radius;
  }

  function resolveBubbleCollision(c1: Bubble, c2: Bubble) {
    const dx = c2.center.x - c1.center.x;
    const dy = c2.center.y - c1.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const normalX = dx / distance;
    const normalY = dy / distance;

    const relativeVelocityX = c2.velocity.x - c1.velocity.x;
    const relativeVelocityY = c2.velocity.y - c1.velocity.y;

    const dotProduct =
      relativeVelocityX * normalX + relativeVelocityY * normalY;

    if (dotProduct > 0) return;

    const elasticity = 0.8;

    const impulse =
      (-(1 + elasticity) * dotProduct) / (1 / c1.mass + 1 / c2.mass);

    c1.velocity.x -= (impulse * normalX) / c1.mass;
    c1.velocity.y -= (impulse * normalY) / c1.mass;
    c2.velocity.x += (impulse * normalX) / c2.mass;
    c2.velocity.y += (impulse * normalY) / c2.mass;

    const overlap = c1.radius + c2.radius - distance;
    c1.center.x -= (overlap * normalX * c2.mass) / (c1.mass + c2.mass);
    c1.center.y -= (overlap * normalY * c2.mass) / (c1.mass + c2.mass);
    c2.center.x += (overlap * normalX * c1.mass) / (c1.mass + c2.mass);
    c2.center.y += (overlap * normalY * c1.mass) / (c1.mass + c2.mass);
  }

  // Grid Functions
  const gridSpacing = 50;
  const gridStartX = 50;
  const gridStartY = 50;

  function generateGridPositions(numCols: number, numRows: number): Point[] {
    const positions: Point[] = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        positions.push({
          x: gridStartX + col * gridSpacing,
          y: gridStartY + row * gridSpacing,
        });
      }
    }
    return positions;
  }

  function assignGridPositions(gridPositions: Point[]) {
    // const shuffledPositions = shuffleArray(gridPositions);
    const shuffledPositions = [...gridPositions];

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].targetCenter = shuffledPositions[i % shuffledPositions.length];
      bubbles[i].lerpProgress = 0;
    }
    console.log(shuffledPositions.length, bubbles.length);
  }

  function shuffleArray(array: any[]): any[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  // Animation and Lerp
  let animationSpeed = 1;
  let gravity = 9.8;

  // function animatecBubbles(): void {
  //   // const scaledDeltaTime = deltaTime * animationSpeed;

  //   for (let i = 0; i < bubbles.length; i++) {
  //     const c1 = bubbles[i];

  //     const acceleration: Point = { x: 0, y: 0 };
  //     acceleration.y += gravity / c1.mass;

  //     c1.velocity.x += acceleration.x;
  //     c1.velocity.y += acceleration.y;

  //     c1.center.x += c1.velocity.x;
  //     c1.center.y += c1.velocity.y;

  //     // Boundary checks (using scaledDeltaTime)
  //     const bottomEdge = containerRect.height;
  //     if (c1.center.y + c1.radius > bottomEdge) {
  //       c1.center.y = bottomEdge - c1.radius;
  //       c1.velocity.y = -c1.velocity.y * c1.restitution;
  //       c1.velocity.x += (Math.random() - 0.5) * 50;
  //       c1.velocity.x *= 0.98;
  //       c1.velocity.y *= 0.98;

  //       if (
  //         Math.abs(c1.velocity.y) < 1 &&
  //         Math.abs(c1.velocity.x) < 1 &&
  //         c1.center.y + c1.radius > bottomEdge - 5
  //       ) {
  //         c1.velocity.x = 0;
  //         c1.velocity.y = 0;
  //       }
  //     }
  //     if (c1.center.y - c1.radius < 0) {
  //       c1.center.y = c1.radius;
  //       c1.velocity.y = -c1.velocity.y * c1.restitution;
  //       c1.velocity.x += (Math.random() - 0.5) * 50;
  //       c1.velocity.x *= 0.98;
  //       c1.velocity.y *= 0.98;
  //     }
  //     if (c1.center.x + c1.radius > containerRect.width) {
  //       c1.center.x = containerRect.width - c1.radius;
  //       c1.velocity.x = -c1.velocity.x * c1.restitution;
  //       c1.velocity.x *= 0.98;
  //       c1.velocity.y *= 0.98;
  //     }
  //     if (c1.center.x - c1.radius < 0) {
  //       c1.center.x = c1.radius;
  //       c1.velocity.x = -c1.velocity.x * c1.restitution;
  //       c1.velocity.x *= 0.98;
  //       c1.velocity.y *= 0.98;
  //     }

  //     // Collision detection (using scaledDeltaTime)
  //     for (let j = i + 1; j < bubbles.length; j++) {
  //       const c2 = bubbles[j];
  //       if (checkBubbleCollision(c1, c2)) {
  //         resolveBubbleCollision(c1, c2);
  //       }
  //     }

  //     // Lerp to grid position
  //     if (c1.targetCenter) {
  //       c1.lerpProgress += 0.01 * animationSpeed;

  //       if (c1.lerpProgress >= 1) {
  //         c1.center = c1.targetCenter;
  //         c1.targetCenter = null;
  //       } else {
  //         c1.center = lerp(c1.center, c1.targetCenter, c1.lerpProgress);
  //       }
  //     }
  //   }
  // }

  function lerp(start: Point, end: Point, t: number): Point {
    const x = start.x + (end.x - start.x) * t;
    const y = start.y + (end.y - start.y) * t;
    return { x, y };
  }

  // let lastFrameTime = performance.now();

  let bubbles: Bubble[] = $derived(
    Array.from({ length: 5 }, (_, i) => {
      const radius = Math.random() * 20 + 5;
      return {
        id: i,
        center: {
          x: Math.random() * containerRect.width,
          y: Math.random() * containerRect.height,
        },
        lerpProgress: 0,
        targetCenter: null,
        radius,
        mass: radius / 20,
        velocity: {
          x: (Math.random() - 0.5) * scaledVelocity,
          y: (Math.random() - 0.5) * scaledVelocity,
        },
        restitution: 0.8,
        color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
      };
    }),
  );

  let animationSteps: Point[] = []; // Array to store intermediate steps
  let currentStepIndex = 0;
  let animationDuration = 2000; // Total animation duration (milliseconds)

  function calculateBubbleSteps(
    start: Point,
    end: Point,
    numSteps: number,
  ): Point[] {
    const steps: Point[] = [];
    for (let i = 1; i <= numSteps; i++) {
      steps.push(lerp(start, end, i / numSteps)); // Calculate intermediate points
    }
    return steps;
  }

  function drawBubblesFrame() {
    // const deltaTime = animationSpeed / 1000; // Calculate deltaTime in seconds
    // animateBubbles(deltaTime); // Call animateBubbles
    // console.log(deltaTime);

    // Render (SVG updates)

    // animateBubbles(deltaTime);
    console.log(bubbles.length)

    for (let i = 0; i < bubbles.length; i++) {
      const circleElement = document.getElementById(
        `circle${i}`,
      )! as unknown as SVGCircleElement;
      if (circleElement) {
        circleElement.setAttribute("cx", bubbles[i].center.x.toString());
        circleElement.setAttribute("cy", bubbles[i].center.y.toString());
      }
    }
  }

  function animateNextStep() {
    if (currentStepIndex < animationSteps.length) {
      // animateBubbles();
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].center = animationSteps[currentStepIndex];
      }
      drawBubblesFrame();

      currentStepIndex++;
      setTimeout(() => {
        animateNextStep(); // Schedule the next step
      }, animationDuration / animationSteps.length); // Delay between steps
    }
  }
  // function gameLoop() {
  //   const currentTime = performance.now();
  //   const deltaTime = (currentTime - lastFrameTime) / 1000;
  //   lastFrameTime = currentTime;

  //   animateBubbles(deltaTime);

  //   requestAnimationFrame(gameLoop);
  // }

  // if (browser) {
  //   gameLoop();
  // }
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
    </div>
    <div class="button-container">
      <button
        class="explore-button"
        onclick={(e) => {
          console.log(e);
          const numCols = 5;
          const numRows = 4;
          const gridPositions = generateGridPositions(numCols, numRows);
          assignGridPositions(gridPositions);
          console.log(gridPositions);

          animationSteps = []; // Clear previous steps
          currentStepIndex = 0;

          for (const bubble of bubbles) {
            const stepsForBubble = calculateBubbleSteps(
              bubble.center,
              bubble.targetCenter ?? bubble.center,
              3,
            ); // 3 steps: halfway, halfway, target
            animationSteps.push(...stepsForBubble); // Add the steps
          }

          animateNextStep(); // Start the animation
        }}
      >
        <span class="button-text">Explore the Bubbles</span>
        <span class="button-arrow">→</span>
      </button>
    </div>
  </div>
  <div class="button-box">
    <Controls></Controls>
  </div>

  {scaledVelocity}
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
