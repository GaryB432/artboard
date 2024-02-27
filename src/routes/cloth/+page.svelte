<script lang="ts">
  let data = { subject: "cloth" };
</script>

<svelte:head>
  <title>artboard - cloth</title>
</svelte:head>

<article class="container">
  {data.subject} works
</article>

<canvas id="canvas" />
<span>Drag with your mouse, right-click to slice.</span>
<div>
  <a href="https://github.com/Dissimulate/Tearable-Cloth">Github</a>
  <a href="https://twitter.com/abro_oks">@abro_oks</a>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: #f2f2f2;
  }

  #canvas {
    display: block;
  }

  span,
  div {
    position: absolute;
    color: #aaa;
    bottom: 100px;
    left: 0;
    right: 0;
    width: 100%;
    margin: auto;
    font-family: Helvetica;
    text-align: center;
  }

  div {
    bottom: 60px;
  }

  div a {
    text-decoration: none;
    color: #2266bb;
  }

  div a:first-child {
    margin-right: 20px;
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
