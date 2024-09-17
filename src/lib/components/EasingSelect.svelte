<script lang="ts">
  import easings, { type EasingFunction } from "../easings";

  const keys = Object.keys(easings);
  let {
    easingSelected,
    easingName,
  }: {
    easingSelected: (e: EasingFunction) => void;
    easingName: string;
  } = $props();
  easingSelected(easings[easingName]);
</script>

<select
  bind:value={easingName}
  onchange={() => easingSelected(easings[easingName])}
>
  {#each keys as key}
    <option value={key} selected={key === easingName}>{key}</option>
  {/each}
</select>

<style>
  select {
    border-style: solid;
    font-family: inherit;
    appearance: none;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAyMCAyMCc+PHBhdGggc3Ryb2tlPScjNmI3MjgwJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMS41JyBkPSdNNiA4bDQgNCA0LTQnLz48L3N2Zz4=);
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    display: inline-block;
    width: 100%;
    border-radius: 0.25rem;
    border-width: 1px;
    border-color: rgb(107, 114, 128);
    background-color: rgb(255, 255, 255);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 2rem;
    line-height: 1.5;
    color: rgb(55, 65, 81);
  }
  select:focus {
    --gb-inner: rgba(255, 255, 255, 1);
    --gb-outer: rgba(37, 99, 235, 0.4);
    box-shadow:
      0 0 0 2px var(--gb-inner),
      0 0 0 6px var(--gb-outer);
  }
</style>
