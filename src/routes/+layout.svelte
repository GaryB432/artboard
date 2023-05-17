<script>
  import { version } from "$app/environment";
  import Header from "$lib/components/Header.svelte";
  import "../app.css";
</script>

<Header />
<main>
  <slot />
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
