<script lang="ts">
  import type { BirdSong } from '../types/graph';

  export let birds: BirdSong[];
  export let selectedBird: BirdSong;
  export let disabled: boolean = false;

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const index = parseInt(target.value);
    selectedBird = birds[index];
  }
</script>

<div class="bird-selector">
  <label for="bird-select">Choose a bird:</label>
  <select
    id="bird-select"
    on:change={handleChange}
    {disabled}
    value={birds.indexOf(selectedBird)}
  >
    {#each birds as bird, i}
      <option value={i}>{bird.name}</option>
    {/each}
  </select>
  <p class="description">{selectedBird.description}</p>
</div>

<style>
  .bird-selector {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  select:hover:not(:disabled) {
    border-color: #4CAF50;
  }

  select:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .description {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
  }
</style>
