# Bird Song Generator

A Svelte + TypeScript web application that generates bird songs using probabilistic graph-based composition. Each bird song is represented as a directed graph where nodes are musical notes and edges have weights determining transition probabilities.

## Features

- **Three Unique Birds**: Simple Sparrow, Melodic Nightingale, and Rhythmic Woodpecker
- **Probabilistic Playback**: Each performance generates a unique variation
- **Web Audio API**: Native browser audio synthesis with smooth envelopes
- **Clean UI**: Simple, responsive interface with real-time playback controls

## How It Works

1. **Graph Nodes**: Each node represents a musical note with frequency, duration, and waveform
2. **Weighted Edges**: Transitions between nodes have probability weights
3. **Graph Walking**: Algorithm traverses the graph making weighted random selections
4. **Audio Playback**: Web Audio API synthesizes notes with attack/release envelopes

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Project Structure

```
src/
├── lib/
│   ├── types/
│   │   └── graph.ts          # TypeScript type definitions
│   ├── engine/
│   │   ├── GraphWalker.ts    # Graph traversal with probabilistic selection
│   │   └── AudioEngine.ts    # Web Audio API wrapper
│   ├── data/
│   │   └── birdSongs.ts      # Predefined bird song graphs
│   └── components/
│       ├── BirdSelector.svelte
│       └── AudioControls.svelte
├── App.svelte                # Main application component
└── main.ts                   # Entry point
```

## Usage

1. Select a bird from the dropdown menu
2. Click "Play Song" to hear a generated bird song
3. Click "Stop" to interrupt playback
4. Play again to hear a different variation

## Technical Details

- **Framework**: Svelte with TypeScript
- **Build Tool**: Vite
- **Audio**: Web Audio API (OscillatorNode)
- **Algorithm**: Weighted random selection for graph traversal

## Browser Compatibility

Works in all modern browsers that support:
- Web Audio API
- ES6+ JavaScript
- CSS Grid/Flexbox

Tested in Chrome, Firefox, and Edge.
