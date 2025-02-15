<script lang="ts">
    import { onMount } from "svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  // Define types for better type safety
  interface Point {
    x: number;
    y: number;
  }

  interface Circle {
    center: Point;
    radius: number;
  }

  interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  function animateCircle(
    circle: Circle,
    rectangle: Rectangle,
    gravity: number,
    wind: number,
    deltaTime: number,
  ): void {
    // Physics calculations
    const mass = 1; // You can adjust mass
    let accelerationX = wind / mass; // Wind force
    let accelerationY = gravity / mass; // Gravity force

    // Update velocity
    circle.center.x += velocityX * deltaTime;
    circle.center.y += velocityY * deltaTime;
    velocityX += accelerationX * deltaTime;
    velocityY += accelerationY * deltaTime;

    // Boundary check (optional - you might want different behavior)
    if (circle.center.y + circle.radius > rectangle.y + rectangle.height) {
      circle.center.y = rectangle.y + rectangle.height - circle.radius;
      velocityY = 0; // Stop at the bottom (or bounce, etc.)
    }

    if (circle.center.x + circle.radius > rectangle.x + rectangle.width) {
      circle.center.x = rectangle.x + rectangle.width - circle.radius;
      velocityX = 0;
    }
    if (circle.center.x - circle.radius < rectangle.x) {
      circle.center.x = rectangle.x + circle.radius;
      velocityX = 0;
    }
  }

  // Example usage (you'll need to adapt this to your SVG setup)
  let circle: Circle = $state({
    center: { x: 150, y: 50 }, // Start at the top center
    radius: 20,
  });

  const rectangle: Rectangle = {
    x: 100,
    y: 0,
    width: 200,
    height: 300,
  };

  let velocityX = 0;
  let velocityY = 0;
  const gravity = 9.8; // Adjust gravity
  const wind = 5; // Adjust wind force

  let lastFrameTime = performance.now();
  let circleElement: SVGCircleElement | null = $state(null);

  function gameLoop() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastFrameTime) / 1000; // In seconds
    lastFrameTime = currentTime;

    animateCircle(circle, rectangle, gravity, wind, deltaTime);

    // Update the SVG element's position using the updated circle.center.x and circle.center.y.

    if (circleElement) {
      circleElement.setAttribute("cx", circle.center.x.toString());
      circleElement.setAttribute("cy", circle.center.y.toString());
    }

    requestAnimationFrame(gameLoop);
  }

  onMount(gameLoop)

//   gameLoop(); // Start the animation loop
</script>

<svg width="400" height="300">
  <rect x="100" y="0" width="200" height="300" fill="lightgray" />
  <circle
    id="myCircle"
    cx="150"
    cy="50"
    r="20"
    fill="red"
    bind:this={circleElement}
  />
</svg>
