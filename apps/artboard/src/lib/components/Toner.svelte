<script lang="ts">
  import { Toner } from "$lib/toner/toner";
  let playing = $state(false);

  const toner = new Toner();
</script>

<section>
  <div class="container right-bar">
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!-- License: CC0. Made by SVG Repo: https://www.svgrepo.com/svg/75794/speaker -->
    <svg
      class:playing
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0"
      y="0"
      height="46"
      width="46"
      style="enable-background:new 0 0 46.004 46.004;"
      xml:space="preserve"
    >
      <g>
        <path
          d="M 30 0 c -1 -1 -2 -1 -3 0 c 0 0 -0 0 -0 0 L 13 12 H 3 
          c -1 0 -1 0 -1 1 v 19 c 0 0 0 1 0 1 s 0 0 1 0 l 11 0 l 14 12 
          c 0 0 0 0 0 0 c 1 0 1 0 2 0 c 1 0 1 -0 2 -0 c 1 -1 2 -2 2 -3 V 3 
          C 32 2 31 1 30 0 z M 30 43 c 0 0 -0 1 -1 1 c -0 0 -1 0 -1 0 
          L 15 32 v -5 c 0 -1 -0 -1 -1 -1 s -1 0 -1 1 v 4 l -9 0 v -17 
          h 9 v 4 c 0 1 0 1 1 1 s 1 -0 1 -1 v -5 l 13 -11 c 1 -0 1 -0 1 0 
          c 0 0 1 1 1 1 V 43 z"
        />
        <path
          class:playing
          d="M 35 10 c -1 -0 -1 0 -1 1 c -0 1 0 1 1 1 c 5 1 8 6 8 11 
          s -3 10 -8 11 c -1 0 -1 1 -1 1 c 0 0 1 1 1 1 c 0 0 0 -0 0 -0 
          c 6 -2 10 -7 10 -13 S 41 11 35 10 z"
        />
      </g>
    </svg>
  </div>
  <nav class="button-bar">
    <button
      onclick={async () => {
        playing = true;
        await toner.play([
          { delay: 0, duration: 0.2, frequency: 523.25 },
          { delay: 0, duration: 0.2, frequency: 440 },
          { delay: 0, duration: 0.3, frequency: 523.25 },
          { delay: 0, duration: 0.2, frequency: 493.88 },
        ]);
        playing = false;
      }}>Play</button
    >
    <button>Stuff</button>
  </nav>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    gap: 0.5em;
    background-color: aliceblue;
  }
  .container {
    border: 4px solid var(--blue);
    border-radius: 4px;
  }
  .container svg {
    width: 100px;
    fill: black;
    transform: scale(1);
  }

  .container svg.playing {
    transform: scale(2);
    fill: orange;
  }

  svg g path.playing {
    fill: tomato;
  }
</style>
