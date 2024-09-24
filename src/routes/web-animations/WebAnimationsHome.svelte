<script lang="ts">
  export let name = `WebAnimationsHome`;
  $: message = `${name} works`;
</script>

<article>
  {message}
</article>

<style lang="css">
  article {
    border: thin solid silver;
    padding: 1em;
  }
</style>
