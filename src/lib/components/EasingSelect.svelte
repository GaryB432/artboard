<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import easings, { type EasingFunction } from "../easings";

  const dispatch = createEventDispatcher<{
    selected: { easing: EasingFunction };
  }>();

  const keys = Object.keys(easings);
  export let selected = keys.at(0);
  function dispatchEasing() {
    if (selected) {
      dispatch("selected", { easing: easings[selected] });
    }
  }
  onMount(() => {
    dispatchEasing();
  });
</script>

<select
  name="easings"
  id="easings"
  bind:value={selected}
  on:change={dispatchEasing}
>
  {#each keys as key}
    <option value={key} selected={key === selected}>{key}</option>
  {/each}
</select>
