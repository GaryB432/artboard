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
