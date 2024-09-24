<script lang="ts">
  let data = $state({ subject: "web-animations" });
</script>

<svelte:head>
  <title>artboard - web-animations</title>
</svelte:head>

<ul>
  <li><a href="web-animations/parallax-starfield">parallax-starfield</a></li>
  <li><a href="web-animations/spinning-dots">spinning-dots</a></li>
  <li><a href="web-animations/expandoboard">expandoboard</a></li>
  <li><a href="web-animations/galaxy">galaxy</a></li>
  <li><a href="web-animations/ripple">ripple</a></li>
  <li><a href="web-animations/waves">waves</a></li>
  <li><a href="web-animations/clouds">clouds</a></li>
  <li><a href="web-animations/phone">phone</a></li>
</ul>

<style>
  ul {
    padding: 1em;
    border: thin solid silver;
  }
  li {
    display: block;
  }
  a {
    text-decoration: underline;
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
