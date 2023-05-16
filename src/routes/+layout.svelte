<script>
  import GithubAnchor from "$lib/components/GithubAnchor.svelte";
  import { version } from "$app/environment";
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
<footer>{version}</footer>

<style>
  header {
    display: flex;
    height: 70px;
    justify-content: space-between;
    align-items: center;
  }

  main {
    flex: auto;
    /* background-color: #ccc; */
  }

  footer {
    height: 25px;
  }
</style>
