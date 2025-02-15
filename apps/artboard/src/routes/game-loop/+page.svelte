<script lang="ts">
  import { browser } from "$app/environment";

  interface Point {
    x: number;
    y: number;
  }

  interface Circle {
    center: Point;
    radius: number;
    mass: number;
    velocity: Point;
    restitution: number;
  }

  interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  function checkCircleCollision(c1: Circle, c2: Circle): boolean {
    const dx = c2.center.x - c1.center.x;
    const dy = c2.center.y - c1.center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c1.radius + c2.radius;
  }

  function resolveCircleCollision(c1: Circle, c2: Circle) {
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

  function animateCircles(
    circles: Circle[],
    gravity: number,
    deltaTime: number,
    rectangle: Rectangle,
  ): void {
    for (let i = 0; i < circles.length; i++) {
      const c1 = circles[i];

      const acceleration: Point = { x: 0, y: 0 };
      acceleration.y += gravity / c1.mass;

      c1.velocity.x += acceleration.x * deltaTime;
      c1.velocity.y += acceleration.y * deltaTime;

      c1.center.x += c1.velocity.x * deltaTime;
      c1.center.y += c1.velocity.y * deltaTime;

      if (c1.center.y + c1.radius > rectangle.y + rectangle.height) {
        c1.center.y = rectangle.y + rectangle.height - c1.radius;
        c1.velocity.y = -c1.velocity.y * c1.restitution;
        c1.velocity.x += (Math.random() - 0.5) * 100;
      }
      if (c1.center.y - c1.radius < rectangle.y) {
        c1.center.y = rectangle.y + c1.radius;
        c1.velocity.y = -c1.velocity.y * c1.restitution;
        c1.velocity.x += (Math.random() - 0.5) * 100;
      }
      if (c1.center.x + c1.radius > rectangle.x + rectangle.width) {
        c1.center.x = rectangle.x + rectangle.width - c1.radius;
        c1.velocity.x = -c1.velocity.x * c1.restitution;
      }
      if (c1.center.x - c1.radius < rectangle.x) {
        c1.center.x = rectangle.x + c1.radius;
        c1.velocity.x = -c1.velocity.x * c1.restitution;
      }

      for (let j = i + 1; j < circles.length; j++) {
        const c2 = circles[j];
        if (checkCircleCollision(c1, c2)) {
          resolveCircleCollision(c1, c2);
        }
      }
    }
  }

  const circles: Circle[] = [
    {
      center: { x: 150, y: 50 },
      radius: 20,
      mass: 1,
      velocity: {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      },
      restitution: 0.8,
    },
    {
      center: { x: 250, y: 150 },
      radius: 30,
      mass: 1.6,
      velocity: {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      },
      restitution: 0.8,
    },
    {
      center: { x: 100, y: 100 },
      radius: 15,
      mass: 0.8,
      velocity: {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      },
      restitution: 0.8,
    },
  ];

  const rectangle: Rectangle = { x: 0, y: 0, width: 400, height: 300 };

  const gravity = 9.8;
  let lastFrameTime = performance.now();

  function gameLoop() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    animateCircles(circles, gravity, deltaTime, rectangle);

    for (let i = 0; i < circles.length; i++) {
      const circleElement = document.getElementById(
        `circle${i}`,
      )! as unknown as SVGCircleElement;
      if (circleElement) {
        circleElement.setAttribute("cx", circles[i].center.x.toString());
        circleElement.setAttribute("cy", circles[i].center.y.toString());
      }
    }

    requestAnimationFrame(gameLoop);
  }
  if (browser) {
    gameLoop();
  }
</script>

<svg width="400" height="300">
  <rect x="0" y="0" width="400" height="300" fill="lightgray" />
  <circle id="circle0" cx="150" cy="50" r="20" fill="red" />
  <circle id="circle1" cx="250" cy="150" r="30" fill="blue" />
  <circle id="circle2" cx="100" cy="100" r="15" fill="green" />
</svg>
