<script lang="ts">
  import { Clock } from "$lib/clock/clock";
  import { Toner } from "$lib/toner/toner";
  import { onMount } from "svelte";

  interface Point {
    x: number;
    y: number;
  }

  let container: HTMLElement | null = null;
  let wiping = $state(false);
  let muted = $state(true);
  const clock = new Clock();
  const v = 2;
  const t = 46;
  const diag = t - 3.835;

  const muteyd = [
    `M ${0.835} ${t - 2.835}`,
    `c ${-v} ${v} 0 ${v * 2} ${v} ${v}`,
    `l ${diag} ${-diag}`,
    `c ${v} ${-v} 0 ${-v * 2} ${-v} ${-v} `,
    `z`,
  ].join(" ");
  onMount(() => {
    clock.init(container, 100);
    clock.onTick = (tick) => {
      if (muted) {
        return;
      }
      const toner = new Toner();
      const sounds = [{ delay: 0, duration: 0.2, frequency: 180 }];
      if (tick.second < 1) {
        void sounds.splice(0, 1, { delay: 0, duration: 0.8, frequency: 440 });
      }
      if (tick.second > 49) {
        sounds.unshift({ delay: 0, duration: 0.3, frequency: 230 });
      }
      if (tick.second < 56) {
        toner.play(sounds);
      }
      // console.log(tick);
    };
    clock.start();
  });
  function toggleMute() {
    muted = !muted;
  }
  function drawRandoFrame() {
    console.log("not yet");
  }
  function wipe() {
    if (container) {
      wiping = true;
      setTimeout(() => {
        wiping = false;
      }, 2000);
    }
  }
</script>

<section>
  <div class="container right-bar" bind:this={container} class:wiping></div>
  <nav class="button-bar">
    <button onclick={drawRandoFrame}>Go</button>
    <button onclick={wipe}>Wipe</button>
    <button
      onclick={toggleMute}
      class="mutey"
      class:muted
      aria-label="play or mute"
    >
      <svg
        height="46"
        width="46"
        viewBox="0 0 46 46"
        xml:space="preserve"
      >
        <g>
          <path
            d="M 29.9 0.4 c -1 -0.6 -2.1 -0.5 -3.1 0 c -0 0 -0.1 0.1 -0.1 0.1 
            L 13.1 12 H 2.5 c -0.6 0 -1 0.4 -1 1 v 19 c 0 0.3 0.1 0.5 0.3 0.7 
            s 0.4 0.3 0.7 0.3 l 10.6 -0 l 13.5 12.4 c 0.1 0 0.1 0.1 0.2 0.1 
            c 0.5 0.3 1 0.4 1.6 0.4 c 0.5 -0 1 -0.1 1.5 -0.4 c 1 -0.6 1.6 -1.6 1.6 -2.8 
            V 3.2 C 31.5 2 30.9 1 29.9 0.4 z M 29.5 42.8 c 0 0.4 -0.2 0.8 -0.6 1 
            c -0.2 0.1 -0.5 0.3 -1 0 L 14.5 31.6 v -4.6 c 0 -0.6 -0.4 -1 -1 -1 
            s -1 0.4 -1 1 v 4 l -9 0 v -17 h 9 v 4 c 0 0.6 0.4 1 1 1 s 1 -0.4 1 -1 
            v -4.5 l 13.4 -11.3 c 0.5 -0.2 0.9 -0.1 1 0 c 0.4 0.2 0.6 0.6 0.6 1 V 42.8 z"
          />
          <path
            d="M 34.8 9.5 c -0.5 -0.2 -1.1 0.2 -1.2 0.7 c -0.2 0.5 0.2 1.1 0.7 1.2 
            c 4.9 1.4 8.3 6 8.3 11 s -3.4 9.6 -8.3 11 c -0.5 0.2 -0.8 0.7 -0.7 1.2 
            c 0.1 0.4 0.5 0.7 1 0.7 c 0.1 0 0.2 -0 0.3 -0 c 5.7 -1.7 9.7 -7 9.7 -13 
            S 40.5 11.2 34.8 9.5 z"
          />
          <path class="mutey" d={muteyd} />
        </g>
      </svg>
    </button>
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
    /* height: fit-content; */
    border: 4px solid var(--blue);
    border-radius: 50%;
    transition: all 1s ease-in-out;
  }

  .container.wiping {
    transform: scale(2) translate(-80px, 30px);
    /* background-color: orange; */
  }

  .button-bar button svg {
    fill: currentColor;
    height: 1em;
    width: 1em;
    transform: scale(2) translateY(1px);
  }

  .button-bar button svg path.mutey {
    opacity: 0;
  }

  /*
  .button-bar button.muted {
    background-color: #cfcfcf;
  }

  .button-bar button.muted svg {
    background-color: red;
    transform: scale(2) translate(1px, 2px);
    border-style: solid;
    border-width: 2px 0 0 2px;
  }
 */

  .button-bar button.muted svg path.mutey {
    opacity: 0.75;
  }
</style>
