<script lang="ts">
  type Props = {
    label: string;
    onpausedchange: (playing: boolean) => void;
    onratechange: (rate: number) => void;
  };
  let { label, onpausedchange, onratechange }: Props = $props();

  let playing = $state(true);
  let rate = $state(1);

  let doubled = $derived(rate === 2);
</script>

<div class="cbvp">
  <div class="label">{label}</div>
  <input type="range" min="0" max="100" />
  <button
    class:active={!playing}
    onclick={() => {
      playing = !playing;
      onpausedchange(playing);
    }}>&#9616;&#9616;</button
  >
  <button
    class:active={doubled}
    onclick={() => {
      rate = rate === 1 ? 2 : 1;
      onratechange(rate);
    }}>2x</button
  >
</div>

<style>
  .cbvp {
    display: grid;
    grid-template-columns: 2fr 6fr 1fr 1fr;
    align-items: center;
    border: thin solid #333;
    font-size: 11px;
    gap: 0.5rem;
    padding: 0.2rem;
  }

  button {
    background: transparent;
    color: #333;
    line-height: 1;
    text-align: center;
    max-width: 2rem;
    padding: 0.2rem 0.5rem 0.2rem 0.3rem;
    border-radius: 0.3rem;
    transition:
      background-color 0.15s linear,
      color 0.15s linear;
    border: 1px solid #333;
  }
  button.active {
    background-color: #333;
    color: #fafafb;
  }

  input[type="range" i] {
    appearance: auto;
    cursor: default;
    color: rgb(16, 16, 16);
    padding: initial;
    border: initial;
    margin: 2px;
  }
</style>
