<script>
  import { version } from "$app/environment";
  import Header from "$lib/components/Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<Header />
<main>
  {@render children()}
</main>
<footer>{version}</footer>

<style>
  main {
    flex: auto;
  }

  footer {
    height: 25px;
  }
</style>
