<script lang="ts">
  import BirdSelector from './lib/components/BirdSelector.svelte';
  import AudioControls from './lib/components/AudioControls.svelte';
  import { birdSongs } from './lib/data/birdSongs';
  import { AudioEngine } from './lib/engine/AudioEngine';
  import { GraphWalker } from './lib/engine/GraphWalker';
  import type { BirdSong } from './lib/types/graph';

  let selectedBird: BirdSong = birdSongs[0];
  let isPlaying = false;
  let audioEngine: AudioEngine | null = null;
  let graphWalker: GraphWalker | null = null;

  async function handlePlay() {
    if (isPlaying) return;

    try {
      // Initialize audio engine on first play
      if (!audioEngine) {
        audioEngine = new AudioEngine();
        audioEngine.initialize();
      }

      // Create walker for selected bird
      graphWalker = new GraphWalker(selectedBird);
      isPlaying = true;

      // Start walking the graph
      await graphWalker.start(async (node) => {
        if (audioEngine) {
          for (const note of node.notes) {
            await audioEngine.playNote(note);
          }
        }
      });

      // Song finished naturally
      isPlaying = false;
      graphWalker = null;
    } catch (error) {
      console.error('Error playing song:', error);
      isPlaying = false;
      graphWalker = null;
    }
  }

  function handleStop() {
    if (graphWalker) {
      graphWalker.stop();
    }
    isPlaying = false;
    graphWalker = null;
  }
</script>

<main>
  <div class="container">
    <header>
      <h1>🐦 Bird Song Generator</h1>
      <p class="subtitle">Probabilistic bird songs using graph-based composition</p>
    </header>

    <div class="content">
      <BirdSelector
        birds={birdSongs}
        bind:selectedBird
        disabled={isPlaying}
      />

      <AudioControls
        {isPlaying}
        onPlay={handlePlay}
        onStop={handleStop}
      />

      {#if isPlaying}
        <div class="status">
          <div class="playing-indicator">
            <span class="pulse"></span>
            Playing {selectedBird.name}...
          </div>
        </div>
      {/if}
    </div>

    <footer>
      <p>Each playback generates a unique variation based on weighted probabilities.</p>
    </footer>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
  }

  .container {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    color: #333;
    font-weight: 700;
  }

  .subtitle {
    margin: 0;
    color: #666;
    font-size: 1rem;
  }

  .content {
    margin: 2rem 0;
  }

  .status {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .playing-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    background: #f0f7ff;
    border: 2px solid #4CAF50;
    border-radius: 12px;
    color: #4CAF50;
    font-weight: 600;
  }

  .pulse {
    width: 12px;
    height: 12px;
    background: #4CAF50;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #eee;
    text-align: center;
  }

  footer p {
    margin: 0;
    color: #999;
    font-size: 0.9rem;
  }

  @media (max-width: 640px) {
    .container {
      padding: 2rem;
    }

    h1 {
      font-size: 2rem;
    }
  }
</style>
