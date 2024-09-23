<script lang="ts">
  import { onMount } from "svelte";
  import AnimationControl from "./AnimationControl.svelte";
  import {
    bodyKeyframes,
    bodyOptions,
    headKeyframes,
    headOptions,
    leftFootKeyframes,
    leftFootOptions,
    leftHandKeyframes,
    leftHandOptions,
    rightFootKeyframes,
    rightFootOptions,
    rightHandKeyframes,
    rightHandOptions,
  } from "./body";

  // https://codepen.io/danwilson/pen/WvXRYg

  let part_body: HTMLDivElement;
  let part_head: HTMLDivElement;
  let part_leftFoot: HTMLDivElement;
  let part_leftHand: HTMLDivElement;
  let part_rightFoot: HTMLDivElement;
  let part_rightHand: HTMLDivElement;

  let animations: Record<string, Animation> = $state({});

  onMount(() => {
    animations.leftFoot = part_leftFoot.animate(
      leftFootKeyframes(),
      leftFootOptions(),
    );
    animations.rightFoot = part_rightFoot.animate(
      rightFootKeyframes(),
      rightFootOptions(),
    );
    animations.rightHand = part_rightHand.animate(
      rightHandKeyframes(),
      rightHandOptions(),
    );
    animations.leftHand = part_leftHand.animate(
      leftHandKeyframes(),
      leftHandOptions(),
    );
    animations.body = part_body.animate(bodyKeyframes(), bodyOptions());
    animations.head = part_head.animate(headKeyframes(), headOptions());
  });

  let playing = $state(false);
  let rate = $state(1);

  const labels = {
    body: "body",
    head: "head",
    leftFoot: "leftFoot",
    leftHand: "leftHand",
    rightFoot: "rightFoot",
    rightHand: "rightHand",
  };
</script>

<svelte:head>
  <title>artboard - walking-blob</title>
</svelte:head>

<div class="container">
  <div class="blob">
    <div bind:this={part_head} class="anim head"></div>
    <div bind:this={part_body} class="anim body"></div>
    <div bind:this={part_leftHand} class="anim hand left"></div>
    <div bind:this={part_rightHand} class="anim hand right"></div>
    <div bind:this={part_leftFoot} class="anim foot left"></div>
    <div bind:this={part_rightFoot} class="anim foot right"></div>
  </div>
  <div class="controls">
    {#each Object.entries(labels) as [part, label]}
      {@const player = animations[part] as Animation}
      <AnimationControl
        {label}
        onpausedchange={(p) => {
          if (p) {
            player.play();
          } else {
            playing = false;
            player.pause();
          }
        }}
        onratechange={(r) => {
          player.updatePlaybackRate(r);
          rate = r;
        }}
      ></AnimationControl>
    {/each}
    <!--div data-mapping="all">
    <label>All</label>
    <input type="range" min="0" max="100" />
    <button class="pause">&#9616;&#9616;</button>
    <button class="rate-2x">2x</button>
  </div-->
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }

  .blob {
    border: thin solid red;
    display: inline-block;
    width: 23rem;
    height: 20rem;
  }

  .anim {
    border-radius: 50%;
    border: 0.4rem solid #fafafb;
    width: 4rem;
    height: 4rem;
    position: absolute;
    left: 9.5rem;
    top: 3rem;
  }
  .anim.head {
    border-color: #299;
  }
  .anim.body {
    border-color: #c92;
    width: 6rem;
    height: 6rem;
    top: 8rem;
    left: 8.5rem;
  }
  .anim.hand {
    border-color: #922;
    top: 8rem;
    left: 15rem;
  }
  .anim.hand.left {
    left: 4rem;
  }
  .anim.foot {
    border-color: #c65;
    top: 15rem;
    left: 7rem;
  }
  .anim.foot.right {
    left: 12rem;
  }

  .controls {
    display: inline-block;
    padding-top: 1rem;
  }
</style>
