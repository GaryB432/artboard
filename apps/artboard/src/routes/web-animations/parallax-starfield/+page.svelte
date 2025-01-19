<script lang="ts">
  import WebAnimationsHome from "../WebAnimationsHome.svelte";
  let data = $state({ subject: "expandoboard" });
</script>

<svelte:head>
  <title>artboard - expandoboard</title>
</svelte:head>

<article class="container">
  {data.subject} is coming some day soon
</article>

<WebAnimationsHome></WebAnimationsHome>

<style>
  .container {
    padding: 1em;
    border: thin solid silver;
    margin-left: calc((100vw - 50vmin) / 2);
    margin-top: calc((100vh - 50vmin) / 4);
    width: 50vmin;
    height: 50vmin;
    perspective: 60vmin;
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
