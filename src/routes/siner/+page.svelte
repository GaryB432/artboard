<script lang="ts">
  import { onMount } from "svelte";
  import fmVsAm from "./radio-fm-vs-am-anim.gif";

  let theta = 0;
  let speed = 80;
  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;

  interface IModulation {
    y(x: number): number;
  }

  export function lerp(start: number, end: number, amount: number): number {
    return start + (end - start) * amount;
  }

  let modulations: IModulation[] = [
    { y: (x) => 0 },
    { y: (x) => 0 },
    { y: (x) => 0 },
  ];

  function init() {}

  function resize() {}

  function render() {
    if (!(canvas && ctx)) {
      return;
    }
    theta += 0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    modulations.forEach((mod, i, mods) => {
      if (!canvas || !ctx) return;
      const modsCount = mods.length + 1;
      const midLine = (canvas.height / modsCount) * (i + 1);
      ctx.beginPath();
      ctx.moveTo(0, midLine);
      ctx.lineTo(canvas.width, midLine);
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // drawXAxis();
    // drawWave();
    // console.log(theta);

    // camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    // camera.lookAt(scene.position);

    // camera.updateMatrixWorld();

    // find intersections

    // raycaster.setFromCamera(mouse, camera);

    // const intersects = raycaster.intersectObjects(scene.children, false);

    // if (intersects.length > 0) {
    //   const targetDistance = intersects[0].distance;

    //   camera.focusAt(targetDistance); // using Cinematic camera focusAt method

    //   if (INTERSECTED != intersects[0].object) {
    //     if (INTERSECTED)
    //       INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    //     INTERSECTED = intersects[0].object;
    //     INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    //     INTERSECTED.material.emissive.setHex(0xff0000);
    //   }
    // } else {
    //   if (INTERSECTED)
    //     INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

    //   INTERSECTED = null;
    // }

    //

    // if (camera.postprocessing.enabled) {
    //   camera.renderCinematic(scene, renderer);
    // } else {
    //   scene.overrideMaterial = null;

    //   renderer.clear();
    //   renderer.render(scene, camera);
    // }
  }

  function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    render();
    // stats.update();
  }

  function update() {
    // if (!ctx) {
    //   return;
    // }
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawXAxis();
    // drawWave();
  }

  function drawWave() {
    if (!(canvas && ctx)) {
      return;
    }
    const f = (x: number) => {
      if (!canvas) return 0;
      let y = Math.sin(x / speed) * (canvas.height / 3) + canvas.height / 2;
      return y;
    };
    ctx.moveTo(0, f(0));
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const signalY = f(x);
      ctx.lineTo(x, signalY);
    }
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  function drawXAxis() {
    if (!(canvas && ctx)) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.setLineDash([]);
  }

  onMount(() => {
    if (!canvas) {
      return;
    }
    ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    // update();
    init();
    resize();
    animate();
  });
</script>

<main>
  <canvas
    bind:this={canvas}
    width="500px"
    height="500px"
    style="background-color: darkred"
    on:wheel={(evt) => {
      const dir = Math.sign(evt.deltaY);
      const step = 1;
      speed += dir * step;
      // update();
    }}
  />
  <div class="freq">
    {speed}
  </div>
  <img src={fmVsAm} alt="anim" />
</main>

<style>
  main {
    display: flex;
    margin: 0 2rem;
    border: thin solid blue;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
  canvas {
    align-self: center;
  }
  img {
    align-self: center;
  }
</style>
