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
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 46 46"
        xml:space="preserve"
      >
        <g>
          <path
            d="M29.893,0.402c-0.976-0.552-2.132-0.534-3.09,0.044c-0.046,0.027-0.09,0.059-0.13,0.093L13.122,12.002H2.489
		c-0.553,0-1,0.447-1,1v19c0,0.266,0.105,0.52,0.293,0.707s0.441,0.293,0.707,0.293l10.61-0.005l13.543,12.44
		c0.05,0.046,0.104,0.086,0.161,0.12c0.492,0.297,1.037,0.446,1.582,0.446c0.517-0.001,1.033-0.134,1.508-0.402
		c0.999-0.564,1.596-1.595,1.596-2.756V3.158C31.489,1.997,30.892,0.967,29.893,0.402z M29.489,42.845
		c0,0.431-0.217,0.81-0.579,1.015c-0.155,0.087-0.548,0.255-1,0.026L14.489,31.557v-4.556c0-0.553-0.447-1-1-1s-1,0.447-1,1v3.996
		l-9,0v-17h9v4c0,0.553,0.447,1,1,1s1-0.447,1-1v-4.536l13.405-11.34c0.461-0.242,0.86-0.07,1.016,0.018
		c0.362,0.205,0.579,0.584,0.579,1.015V42.845z"
          />
          <path
            d="M 34.766 9.54
            c -0.532 -0.151 -1.085 0.152 -1.238 0.684
            c -0.153 0.53 0.152 1.085 0.684 1.238
            c 4.889 1.413 8.304 5.953 8.304 11.04
            s -3.415 9.627 -8.304 11.04
            c -0.531 0.153 -0.837 0.708 -0.684 1.238
            c 0.127 0.438 0.526 0.723 0.961 0.723
            c 0.092 0 0.185 -0.013 0.277 -0.039
            c 5.74 -1.66 9.749 -6.99 9.749 -12.962
            S 40.506 11.2 34.766 9.54
            z"
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
