<script lang="ts">
  let innerCircle: HTMLDivElement | null = null;
  let grow = $state(false);

  function scaleInnerCircle() {
    grow = true;

    setTimeout(function () {
      grow = false;
    }, 1000);
  }
</script>

<div class="circle-container">
  <div class="outer-circle"></div>
  <div class="inner-circle" class:grow bind:this={innerCircle}></div>
</div>
<button onclick={scaleInnerCircle}>Scale Inner Circle</button>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="210mm"
  height="297mm"
  viewBox="0 0 210 297"
  version="1.1"
  id="svg8"
>
  <g id="layer1" style="display:inline">
    <rect
      style="fill:#ffffff;stroke:#000000;stroke-width:1.15464;stroke-linejoin:bevel"
      id="rect841"
      width="167.82143"
      height="278.19049"
      x="17.38689"
      y="4.5357146"
    />
    <ellipse
      style="fill:#b9314f;stroke:#000000;stroke-width:1.4052;stroke-linejoin:bevel"
      id="path833"
      cx="102.05357"
      cy="54.050594"
      rx="40.696144"
      ry="40.243835"
    />
    <ellipse
      style="fill:#ffff00;stroke:#000000;stroke-width:1.4052;stroke-linejoin:bevel"
      id="ellipse835"
      cx="102.80952"
      cy="144.00891"
      rx="40.696144"
      ry="40.243835"
    />
    <ellipse
      style="fill:#008000;stroke:#000000;stroke-width:1.4052;stroke-linejoin:bevel"
      id="ellipse837"
      cx="102.80952"
      cy="233.96724"
      rx="40.696144"
      ry="40.243835"
    />
  </g>
</svg>

<style>
  :root {
    --outer-circle-radius: 200px;
    --inner-circle-radius: 140px;
  }

  .circle-container {
    width: calc(2 * var(--outer-circle-radius));
    height: calc(2 * var(--outer-circle-radius));
    border-radius: 50%;
    background-color: #f0f0f0;
    position: relative;
  }

  .outer-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(2 * var(--outer-circle-radius));
    height: calc(2 * var(--outer-circle-radius));
    border-radius: 50%;
    border: 13px solid #000;
  }

  .inner-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(2 * var(--inner-circle-radius));
    height: calc(2 * var(--inner-circle-radius));
    border-radius: 50%;
    border: 13px solid #000;
    transition: transform 200ms ease-in-out;
    transform-origin: center;
  }

  .inner-circle.grow {
    transform: scale(1.25);
  }
</style>
