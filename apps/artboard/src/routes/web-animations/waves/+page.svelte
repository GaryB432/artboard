<script lang="ts">
  import { onMount } from "svelte";
  import WebAnimationsHome from "../WebAnimationsHome.svelte";

  class Box {
    width = 0;
    height = 0;
    delay = 0;
    element: Animatable | null = $state(null);
    constructor(x: number, y: number) {
      this.width = x;
      this.height = y;
      this.delay = (this.width * this.width + this.height * this.height) * 20;
    }
    animate(): Animation | null {
      if (this.element) {
        return this.element.animate(
          {
            transform: ["translateZ(0px)", "translateZ(40px)"],
            opacity: [1, 0],
          },
          {
            delay: this.delay,
            duration: 2000,
            iterations: Infinity,
            direction: "alternate",
            easing: "ease-in",
          },
        );
      }
      return null;
    }
  }

  let boxes: Box[] = $state([]);

  var sideCount = 20;

  let container: HTMLDivElement;
  var adjustment = (sideCount % 2) * 0.5;
  var min = -sideCount / 2 + adjustment;
  var max = sideCount / 2 + adjustment;

  function loadBoxes() {
    for (var y = min; y < max; y++) {
      for (var x = min; x < max; x++) {
        boxes.push(new Box(x, y));
      }
    }
  }

  loadBoxes();
  for (const b of boxes) {
    const { width, height } = b;
    console.log(width, height);
  }

  onMount(() => {
    container.animate(
      {
        transform: [
          "rotateX(70deg) rotateZ(0deg)",
          "rotateX(70deg) rotateZ(360deg)",
        ],
      },
      {
        duration: 20000,
        iterations: Infinity,
      },
    );

    for (const box of boxes) {
      box.animate();
    }
  });

</script>

<div class="host">
  <div id="perspective">
    <div bind:this={container} id="container">
      {#each boxes as box}
        <div
          class="box"
          bind:this={box.element}
          style="width: {box.width}%; height: {box.width}%"
        ></div>
      {/each}
    </div>
  </div>
</div>

<WebAnimationsHome></WebAnimationsHome>

<style>
  .host {
    margin: 0;
    background: blue;
    /* overflow: hidden; */
  }

  #perspective {
    margin-left: calc((100vw - 50vmin) / 2);
    margin-top: calc((100vh - 50vmin) / 4);
    width: 50vmin;
    height: 50vmin;
    perspective: 60vmin;
  }

  #container {
    width: 50vmin;
    height: 50vmin;
    line-height: 0;
    transform-style: preserve-3d;
  }

  .box {
    display: inline-block;
    background: black;
  }
</style>
