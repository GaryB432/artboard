<script>
  import { base } from "$app/paths";
  import GithubAnchor from "./GithubAnchor.svelte";
  let activeTab = 1;
</script>

<header>
  <span class="text-xl">
    <a href="{base}/">Artboard</a>
    <span class="label">A web app for fun</span>
  </span><span class="button-list">
    <GithubAnchor />
    <button
      on:click={() => {
        activeTab = 0;
      }}
      class:active={activeTab === 0}>Reset to Defaults</button
    >
    <button
      on:click={() => {
        activeTab = 1;
      }}
      class:active={activeTab === 1}>View Markup</button
    ></span
  >
</header>

<style>
  header {
    border-bottom: 1px;
    border-color: rgb(209, 213, 219);
    padding: 1rem;
    height: 4rem;
    background-color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
  }
  .label {
    margin-left: 0.25rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    border: 0 solid rgb(156, 163, 175);
    border-left-width: 1px;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(107, 114, 128);
  }
  .button-list {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  button {
    font-size: 0.875rem;
    line-height: 1.25rem;
    cursor: pointer;
    border-style: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    display: inline-block;
    font-weight: 600;
    background-color: rgb(243, 244, 246);
    color: var(--blue);
  }

  button:hover {
    background-color: rgb(239, 246, 255);
  }
  .active {
    background-color: var(--blue);
    color: rgb(243, 244, 246);
  }

  .active:hover {
    background-color: var(--blue);
  }
</style>
