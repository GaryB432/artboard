<script>
  import GithubAnchor from "$lib/components/GithubAnchor.svelte";
  import "../app.css";
</script>

<header>
  <div>
    <a href="./">artboard</a>
  </div>
  <GithubAnchor />
</header>
<main>
  <slot />
</main>
<footer>tbd</footer>

<style>
  header {
    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
  }
  main {
    height: 90vh;
  }
</style>
