<script lang="ts">
  import easings from "$lib/easings";
  import { onMount } from "svelte";

  const accuracy = 5;
  const gravity = 400;
  const clothY = 28;
  const clothX = 54;
  const spacing = 8;
  const tearDist = 60;
  const friction = 0.99;
  const bounce = 0.5;
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  const canvasSize = { x: 600, y: 400 };

  let cloth: Cloth;

  let mouse = {
    cut: 8,
    influence: 26,
    down: false,
    button: 1,
    x: 0,
    y: 0,
    px: 0,
    py: 0,
  };

  class Point {
    public px: number;
    public py: number;
    public vx: number;
    public vy: number;
    public pinX: number | null;
    public pinY: number | null;
    #constraints: Constraint[];
    public constructor(public x: number, public y: number) {
      this.px = x;
      this.py = y;
      this.vx = 0;
      this.vy = 0;
      this.pinX = null;
      this.pinY = null;

      this.#constraints = [];
    }

    public update(delta: number) {
      if (this.pinX && this.pinY) return this;
      if (!canvas) return this;

      if (mouse.down) {
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.button === 1 && dist < mouse.influence) {
          this.px = this.x - (mouse.x - mouse.px);
          this.py = this.y - (mouse.y - mouse.py);
        } else if (dist < mouse.cut) {
          this.#constraints = [];
        }
      }

      this.addForce(0, gravity);

      let nx = this.x + (this.x - this.px) * friction + this.vx * delta;
      let ny = this.y + (this.y - this.py) * friction + this.vy * delta;

      this.px = this.x;
      this.py = this.y;

      this.x = nx;
      this.y = ny;

      this.vy = this.vx = 0;

      if (this.x >= canvasSize.x) {
        this.px = canvasSize.x + (canvasSize.x - this.px) * bounce;
        this.x = canvasSize.x;
      } else if (this.x <= 0) {
        this.px *= -1 * bounce;
        this.x = 0;
      }

      if (this.y >= canvasSize.y) {
        this.py = canvasSize.y + (canvasSize.y - this.py) * bounce;
        this.y = canvasSize.y;
      } else if (this.y <= 0) {
        this.py *= -1 * bounce;
        this.y = 0;
      }

      return this;
    }

    public draw() {
      let i = this.#constraints.length;
      while (i--) this.#constraints[i].draw();
    }

    public resolve() {
      if (this.pinX && this.pinY) {
        this.x = this.pinX;
        this.y = this.pinY;
        return;
      }

      this.#constraints.forEach((constraint) => constraint.resolve());
    }

    public attach(point: Point): void {
      this.#constraints.push(new Constraint(this, point));
    }

    public free(constraint: Constraint) {
      this.#constraints.splice(this.#constraints.indexOf(constraint), 1);
    }

    private addForce(x: number, y: number) {
      this.vx += x;
      this.vy += y;
    }

    public pin(pinx: number | null, piny: number | null) {
      this.pinX = pinx;
      this.pinY = piny;
    }
  }

  class Constraint {
    public length: number;
    public constructor(public p1: Point, public p2: Point) {
      this.length = spacing;
    }

    public resolve() {
      let dx = this.p1.x - this.p2.x;
      let dy = this.p1.y - this.p2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.length) return;

      let diff = (this.length - dist) / dist;

      if (dist > tearDist) this.p1.free(this);

      let mul = diff * 0.5 * (1 - this.length / dist);

      let px = dx * mul;
      let py = dy * mul;

      !this.p1.pinX && (this.p1.x += px);
      !this.p1.pinY && (this.p1.y += py);
      !this.p2.pinX && (this.p2.x -= px);
      !this.p2.pinY && (this.p2.y -= py);

      return this;
    }

    public draw(): void {
      if (!ctx) return;
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p2.x, this.p2.y);
    }
  }

  class Cloth {
    public points: Point[] = [];
    public constructor() {
      this.reset();
    }

    public reset() {
      this.points = [];
      let startX = canvasSize.x / 2 - (clothX * spacing) / 2;

      for (let y = 0; y <= clothY; y++) {
        for (let x = 0; x <= clothX; x++) {
          let point = new Point(startX + x * spacing, 20 + y * spacing);
          y === 0 && point.pin(point.x, point.y);
          x !== 0 && point.attach(this.points[this.points.length - 1]);
          y !== 0 && point.attach(this.points[x + (y - 1) * (clothX + 1)]);

          this.points.push(point);
        }
      }
    }

    public update(delta: number) {
      if (!ctx) return;
      let i = accuracy;
      // console.log(this.points.length);

      while (i--) {
        this.points.forEach((point) => {
          point.resolve();
        });
      }

      ctx.beginPath();
      this.points.forEach((point) => {
        point.update(delta * delta).draw();
      });
      ctx.stroke();
    }
  }

  function setMouse(e: MouseEvent) {
    if (!canvas) return;
    let rect = canvas.getBoundingClientRect();
    mouse.px = mouse.x;
    mouse.py = mouse.y;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function wipe() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);

    // ctx.beginPath;
    const left = "#29BF12";
    const right = "#ABFF4F";
    const duration = 4000;

    let starttime: number;

    const drawFrame = (timer: number) => {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);
      const runtime = timer - starttime;
      const progress = Math.min(runtime / duration, 1);
      // const eased = easing(progress);
      // const eased = progress;
      const eased = easings["easeInOutQuad"](progress);
      const xd = canvasSize.x * eased;
      ctx.fillStyle = left;
      ctx.fillRect(0, 0, xd, canvasSize.y);
      ctx.fillStyle = right;
      ctx.fillRect(xd + 1, 0, canvasSize.x - xd, canvasSize.y);

      if (progress < 1) {
        requestAnimationFrame((timer) => drawFrame(timer));
      }
    };

    requestAnimationFrame((timer) => {
      starttime = timer;
      drawFrame(timer);
    });

    // for (const blip of blips) {
    //   console.log(blip);

    //   ctx.fillStyle = "#0000EE";
    //   ctx.fillRect(blip.pos.x, blip.pos.y, s, s);
    // }
  }

  onMount(() => {
    if (!canvas) return;

    ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = canvasSize.x;
    canvas.height = canvasSize.y;
    ctx.strokeStyle = "#555";

    cloth = new Cloth();

    (function update(_time) {
      ctx.clearRect(0, 0, canvasSize.x, canvasSize.y);

      cloth.update(0.016);

      requestAnimationFrame(update);
    })(0);
  });
</script>

<svelte:head>
  <title>artboard - stilo</title>
</svelte:head>

<div class="container">
  <canvas
    bind:this={canvas}
    on:mousedown={(e) => {
      mouse.button = e.button + 1;
      mouse.down = true;
      setMouse(e);
    }}
    on:mousemove={setMouse}
    on:mouseup={() => (mouse.down = false)}
    on:contextmenu={(e) => e.preventDefault()}
  />
  <nav class="button-bar">
    <button on:click={wipe}>Wipe</button>
    <button on:click={() => cloth.reset()}>Reset</button>
  </nav>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  canvas {
    background: #f2f2f2;
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
