# Bird Song Generator

A Svelte + TypeScript web application that generates bird songs using probabilistic graph-based composition. Each bird song is represented as a directed graph where nodes are musical notes and edges have weights determining transition probabilities.

## Features

- **Four Unique Birds**: Simple Sparrow, Melodic Nightingale, Rhythmic Woodpecker, and Cascading Finch
- **Multi-Note Nodes**: Each graph node can play multiple notes in sequence for richer musical patterns
- **Human-Readable Notation**: Use musical note names (C5, D5, E5) instead of frequencies
- **Probabilistic Playback**: Each performance generates a unique variation
- **Web Audio API**: Native browser audio synthesis with smooth envelopes
- **Clean UI**: Simple, responsive interface with real-time playback controls

## Data

- [BirdDB / Koumura Dataset (Figshare)](https://figshare.com/articles/media/BirdsongRecognition/3470165): This is the definitive dataset of Bengalese Finch songs where every single "note" is manually labeled—essential for building a state machine.
- [Bengalese Finch Song Repository (VocalPy)](https://www.vocalpy.org/bfsongrepo/): Another excellent, documented version of the Koumura data designed specifically for testing machine learning algorithms. 
- Japanese Tit Compositional Syntax (Nature): The core scientific paper proving that certain birds use an ordering rule (grammar) to combine notes (ABC = danger, D = approach).
https://pmc.ncbi.nlm.nih.gov/articles/PMC3871373/


## How It Works

1. **Graph Nodes**: Each node contains an array of musical notes to play in sequence
2. **Weighted Edges**: Transitions between nodes have probability weights
3. **Graph Walking**: Algorithm traverses the graph making weighted random selections
4. **Audio Playback**: Web Audio API synthesizes notes with attack/release envelopes
5. **Musical Patterns**: Nodes can express arpeggios, trills, runs, and complex phrases

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

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Setup Instructions:**

1. Push your repository to GitHub
2. Go to repository **Settings** → **Pages**
3. Under **Build and deployment**, select:
   - **Source**: GitHub Actions
4. Push to the `master` branch to trigger deployment
5. Your site will be available at `https://kant2002.github.io/birdsongenerator/`

The workflow automatically:
- Builds the project on every push to `master`
- Configures the correct base path for GitHub Pages
- Deploys to the `gh-pages` environment

**Manual Deployment:**

You can also trigger deployment manually from the **Actions** tab by running the "Deploy to GitHub Pages" workflow.

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
│   │   ├── notes.ts          # Musical note constants (C3-B6)
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
