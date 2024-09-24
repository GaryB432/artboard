<script lang="ts">
  let data = $state({ subject: "galaxy" });
</script>

<svelte:head>
  <title>artboard - galaxy</title>
</svelte:head>

<article class="container">
  {data.subject} is coming some day soon
</article>

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
