<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import { Graph, getNearestPoint } from "./world/math";
  import { Point, Segment } from "./world/primitives";
  import { Viewport } from "./world/viewport";

  export let data: PageData;

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;

  export class GraphEditor {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    selected: Point | null = null;
    hovered: Point | null = null;
    dragging = false;
    mouse: Point | null = null;
    constructor(
      public viewport: Viewport,
      public graph: Graph,
    ) {
      this.canvas = viewport.canvas;

      this.ctx = this.canvas.getContext("2d");

      this.#addEventListeners();
    }

    #addEventListeners() {
      this.canvas.addEventListener(
        "mousedown",
        this.#handleMouseDown.bind(this),
      );
      this.canvas.addEventListener(
        "mousemove",
        this.#handleMouseMove.bind(this),
      );
      this.canvas.addEventListener("contextmenu", (evt) =>
        evt.preventDefault(),
      );
      this.canvas.addEventListener("mouseup", () => (this.dragging = false));
    }

    #handleMouseMove(evt: MouseEvent) {
      this.mouse = this.viewport.getMouse(evt, true);
      if (!this.mouse) {
        return;
      }
      this.hovered = getNearestPoint(
        this.mouse,
        this.graph.points,
        10 * this.viewport.zoom,
      );
      if (this.dragging == true) {
        if (!this.selected) {
          this.selected = new Point(0, 0);
        }
        this.selected.x = this.mouse.x;
        this.selected.y = this.mouse.y;
      }
    }

    #handleMouseDown(evt: MouseEvent) {
      if (evt.button == 2) {
        // right click
        if (this.selected) {
          this.selected = null;
        } else if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
      if (evt.button == 0) {
        // left click
        if (this.hovered) {
          this.#select(this.hovered);
          this.dragging = true;
          return;
        }
        if (this.mouse) {
          this.graph.addPoint(this.mouse);
        }
        this.#select(this.mouse);
        this.hovered = this.mouse;
      }
    }

    #select(point: Point | null) {
      if (this.selected && point) {
        this.graph.tryAddSegment(new Segment(this.selected, point));
      }
      this.selected = point;
    }

    #removePoint(point: Point) {
      this.graph.removePoint(point);
      this.hovered = null;
      if (this.selected == point) {
        this.selected = null;
      }
    }

    dispose(): void {
      this.graph.dispose();
      this.selected = null;
      this.hovered = null;
    }

    display(): void {
      if (!this.ctx) return;
      this.graph.draw(this.ctx);
      if (this.hovered) {
        this.hovered.draw(this.ctx, { fill: true });
      }
      if (this.selected) {
        const intent = this.hovered ? this.hovered : this.mouse;
        if (intent)
          new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
        this.selected.draw(this.ctx, { outline: true });
      }
    }
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    // offset = new Point(myCanvas.width / 2, myCanvas.height / 2);
    // ctx.translate(offset.x, offset.y);

    // const f = getComputedStyle(myCanvas);
    // console.log(myCanvas.offsetTop);

    canvas.width = 600;
    canvas.height = 600;

    // const ctx = myCanvas.getContext("2d");

    // const graphString = localStorage.getItem("graph");
    // const graphInfo = graphString ? JSON.parse(graphString) : null;
    const graph = new Graph(data.points, data.segments);
    // const world = new World(graph);

    const viewport = new Viewport(canvas);
    const graphEditor = new GraphEditor(viewport, graph);

    let oldGraphHash = graph.hash();
    animate();

    function animate() {
      viewport.reset();
      // if (graph.hash() != oldGraphHash) {
      //   world.generate();
      //   oldGraphHash = graph.hash();
      // }
      // const viewPoint = scale(viewport.getOffset(), -1);
      // if (ctx) {
      //   world.draw(ctx, viewPoint);
      //   ctx.globalAlpha = 0.3;
      // }
      graphEditor.display();
      requestAnimationFrame(animate);
    }

    function dispose() {
      graphEditor.dispose();
    }

    function save() {
      localStorage.setItem("graph", JSON.stringify(graph));
    }

    // console.log(f.top);

    // document.onmousemove = (event) => {
    //   point.x = event.x - offset.x - myCanvas.offsetLeft;
    //   point.y = event.y - offset.y - myCanvas.offsetTop;
    //   update();
    // };
  });
</script>

<svelte:head>
  <title>artboard - state-geo</title>
</svelte:head>

<article class="container">
  <canvas bind:this={canvas}></canvas>
</article>

<style>
  .container {
    padding: 1em;
    border: thin solid silver;
  }
  canvas {
    background-color: rgb(186, 2, 2);
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
