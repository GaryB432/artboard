<script lang="ts">
  import { createScene } from "$lib/scenes/background";
  import { onMount } from "svelte";

  let el: HTMLCanvasElement;

  onMount(() => {
    createScene(el);
  });
</script>

<svelte:head>
  <title>Three.js Sveltekit</title>
  <meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

<canvas bind:this={el}></canvas>

<section class="main">
  <header>
    <h1>Jeff Delaney</h1>
    <p>
      🚀 Welcome to my website! There is three.js spinny stuff attached to the
      scroll position behind me.
    </p>
  </header>

  <blockquote>
    <p>I like making stuff and putting it on the internet.</p>
  </blockquote>

  <section>
    <h2>📜 Manifesto</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </section>

  <section class="light">
    <h2>👩🏽‍🚀 Projects</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>

    <h2>🏆 Accomplishments</h2>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </section>

  <blockquote>
    <p>The best way out is always through <br />-Robert Frost</p>
  </blockquote>

  <section class="left">
    <h2>🌮 Work History</h2>

    <h3>McDonalds</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <h3>Burger King</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <h3>Taco Bell</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </section>

  <blockquote>
    <p>Thanks for watching!</p>
  </blockquote>
</section>

<style>
  :root {
    --dark-bg: rgba(15, 15, 15, 0.95);
    --spacing: 350px;

    font-family: brandon-grotesque, sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .main {
    width: 100vw;
    color: white;
    position: absolute;
    width: 100%;
    margin: 0px auto;
    padding: 120px 0px;
    display: grid;
    z-index: 99;
    grid-template-columns: repeat(12, 1fr);
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }

  header {
    background: var(--dark-bg);
    grid-column: 2 / span 5;
    font-size: 2.5rem;
    padding: 2rem;
    margin-bottom: var(--spacing);
  }

  section {
    grid-column: 2 / 8;
    padding: 1rem;
    background: var(--dark-bg);
    font-size: 1.25rem;
    line-height: 1.5;
    margin-bottom: var(--spacing);
  }

  blockquote {
    margin: 0;
    padding: 0;
    grid-column: 2 / span 9;
    margin-bottom: var(--spacing);
  }

  blockquote p {
    color: black;
    background-color: white;
    font-size: 4rem;
    display: inline;
    line-height: 1;
  }

  .left {
    grid-column: 6 / 12;
  }
</style>
