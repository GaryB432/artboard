<script lang="ts">
  import WebAnimationsHome from "../WebAnimationsHome.svelte";
  let data = $state({ subject: "clouds" });
</script>

<svelte:head>
  <title>artboard - clouds</title>
</svelte:head>

<article class="container">
  {data.subject} is coming some day soon
</article>

<WebAnimationsHome></WebAnimationsHome>

<style>
  .container {
    padding: 1em;

    border: thin solid silver;
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
