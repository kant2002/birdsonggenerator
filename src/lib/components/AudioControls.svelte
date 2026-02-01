<script lang="ts">
  export let isPlaying: boolean;
  export let onPlay: () => void;
  export let onStop: () => void;
</script>

<div class="audio-controls">
  {#if !isPlaying}
    <button class="play-button" on:click={onPlay}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
      Play Song
    </button>
  {:else}
    <button class="stop-button" on:click={onStop}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="6" width="12" height="12"/>
      </svg>
      Stop
    </button>
  {/if}
</div>

<style>
  .audio-controls {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  button:active {
    transform: translateY(0);
  }

  .play-button {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
  }

  .play-button:hover {
    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
  }

  .stop-button {
    background: linear-gradient(135deg, #f44336 0%, #da190b 100%);
    color: white;
  }

  .stop-button:hover {
    background: linear-gradient(135deg, #da190b 0%, #c41606 100%);
  }

  svg {
    width: 24px;
    height: 24px;
  }
</style>
