<script lang="ts">
  import { Viewport } from "@libraries/radu/viewport";
  import { World } from "@libraries/radu/world";
  import { GraphEditor } from "@libraries/radu/world/editors/graphEditor";
  import { Graph } from "@libraries/radu/world/math/graph";
  import { scale } from "@libraries/radu/world/math/utils";
  import { onMount } from "svelte";

  // import { Point } from "$lib/radu/world/primitives/point";

  let myCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;

  // let offset: Point;

  onMount(() => {
    ctx = myCanvas.getContext("2d");
    if (!ctx) {
      return;
    }
    // offset = new Point(myCanvas.width / 2, myCanvas.height / 2);
    // ctx.translate(offset.x, offset.y);

    // const f = getComputedStyle(myCanvas);
    // console.log(myCanvas.offsetTop);

    myCanvas.width = 600;
    myCanvas.height = 600;

    // const ctx = myCanvas.getContext("2d");

    const graphString = localStorage.getItem("graph");
    const graphInfo = graphString ? JSON.parse(graphString) : null;
    const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
    const world = new World(graph);

    const viewport = new Viewport(myCanvas);
    const graphEditor = new GraphEditor(viewport, graph);

    let oldGraphHash = graph.hash();
    animate();

    function animate() {
      viewport.reset();
      if (graph.hash() != oldGraphHash) {
        world.generate();
        oldGraphHash = graph.hash();
      }
      const viewPoint = scale(viewport.getOffset(), -1);
      if (ctx) {
        world.draw(ctx, viewPoint);
        ctx.globalAlpha = 0.3;
      }
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

<main>
  <canvas
    bind:this={myCanvas}
    width="500px"
    height="500px"
    style="background-color: darkred"
  ></canvas>
</main>

<style>
  main {
    display: flex;
    margin: 0 2rem;
    border: thin solid blue;
    justify-content: center;
  }
</style>
