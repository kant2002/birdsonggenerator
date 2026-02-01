# Bird Song Generator - Project Memory

## Project Overview
A probabilistic bird song generator using graph-based composition with the Web Audio API. Each bird song is represented as a weighted directed graph where nodes contain musical notes and edges represent probabilistic transitions between notes.

## Architecture

### Core Components

1. **Graph Structure** (`src/lib/types/graph.ts`)
   - `GraphNode`: Contains array of notes and weighted transitions
   - `GraphEdge`: Weighted transitions to other nodes
   - `BirdSong`: Complete graph with metadata

2. **Audio Engine** (`src/lib/engine/AudioEngine.ts`)
   - Web Audio API wrapper
   - Plays individual notes with ADSR envelope
   - Supports frequency, duration, waveform, and volume

3. **Graph Walker** (`src/lib/engine/GraphWalker.ts`)
   - Traverses the graph making probabilistic decisions
   - Uses weighted random selection for transitions
   - Prevents infinite loops with max step counter

4. **Note Constants** (`src/lib/data/notes.ts`)
   - Human-readable note constants (C3-B6)
   - Helper functions: `note()`, `withWaveform()`, `withVolume()`
   - Makes composition intuitive and readable

## Recent Implementation (2026-02-01)

### Multi-Note Graph Nodes Feature
**Commit:** 475b117 - "Add multi-note graph nodes with human-readable note constants"

#### What Changed
Previously, each graph node could only play a single note. Now nodes support multiple notes in sequence, enabling richer musical patterns.

**Before:**
```typescript
{
  id: 'sp1',
  note: { frequency: 523.25, duration: 0.15 }, // What note?
  transitions: [...]
}
```

**After:**
```typescript
{
  id: 'sp1',
  notes: [C5, E5, G5], // Clear! Multiple notes!
  transitions: [...]
}
```

#### Files Modified
1. **src/lib/data/notes.ts** (NEW)
   - 113 note constants covering octaves 3-6
   - Includes sharps/flats (Cs4/Db4, etc.)
   - REST constant for silence
   - Helper functions for customization

2. **src/lib/types/graph.ts**
   - Changed `note: NoteParams` → `notes: NoteParams[]`
   - Nodes now hold arrays of notes

3. **src/App.svelte**
   - Updated to loop through and play all notes in each node
   ```typescript
   for (const note of node.notes) {
     await audioEngine.playNote(note);
   }
   ```

4. **src/lib/data/birdSongs.ts**
   - Rewrote all bird songs using note constants
   - Added **Cascading Finch** - demonstrates complex multi-note sequences

#### Musical Patterns Now Possible
- **Arpeggios**: `[C5, E5, G5]` - ascending chord tones
- **Trills**: `[D5, C5, D5, C5]` - alternating notes
- **Runs**: `[G5, F5, E5, D5, C5]` - scalar passages
- **Rhythmic patterns**: `[note, REST, note, REST]` - with rests
- **Complex phrases**: Multiple notes with varied durations and timbres

## Current Bird Songs

### 1. Simple Sparrow
- **Pattern**: Linear with occasional repeats
- **Features**: 3-note ascending arpeggio (C5, E5, G5)
- **Character**: Cheerful, simple

### 2. Melodic Nightingale
- **Pattern**: Complex melody with cycles
- **Features**: Two-note trills, flowing phrases
- **Character**: Rich, flowing variations

### 3. Rhythmic Woodpecker
- **Pattern**: Fast percussive with repetition
- **Features**: Double-knock patterns using square waves
- **Character**: Percussive, rhythmic

### 4. Cascading Finch (NEW)
- **Pattern**: Descending cascades and ascending runs
- **Features**: 4-note descending runs, 5-note ascending phrases
- **Character**: Flowing, virtuosic
- **Example nodes**:
  - `cf1`: `[G5, F5, E5, D5]` - 4-note cascade
  - `cf5`: `[C5, D5, E5, G5, note(A5, 0.3)]` - 5-note ascent

## Usage Examples

### Creating a Simple Bird Song
```typescript
import { C5, D5, E5, G5, REST, note } from './lib/data/notes';

const myBird: BirdSong = {
  name: 'My Bird',
  description: 'A simple melody',
  startNodeId: 'n1',
  nodes: [
    {
      id: 'n1',
      notes: [C5, D5, E5], // Three notes in sequence
      transitions: [{ targetNodeId: 'n2', weight: 1 }]
    },
    {
      id: 'n2',
      notes: [note(G5, 0.5)], // Long single note
      transitions: [{ targetNodeId: 'n3', weight: 1 }]
    },
    {
      id: 'n3',
      notes: [REST], // Silence
      transitions: [] // End
    }
  ]
};
```

### Customizing Notes
```typescript
// Custom duration
note(C5, 0.5)  // Half-second C5

// Custom waveform
withWaveform(A5, 'square')  // Square wave A5

// Custom volume
withVolume(C6, 0.8)  // Loud C6

// Combining customizations
withVolume(withWaveform(note(D5, 0.3), 'square'), 0.6)
```

### Multi-Note Patterns
```typescript
// Arpeggio
notes: [C5, E5, G5, C6]

// Trill
notes: [E5, F5, E5, F5, E5]

// Scale run
notes: [C5, D5, E5, F5, G5, A5, B5, C6]

// Rhythmic pattern
notes: [C5, REST, C5, REST, note(C5, 0.3)]
```

## Project Structure
```
src/
├── App.svelte                    # Main application component
├── lib/
│   ├── components/
│   │   ├── AudioControls.svelte  # Play/Stop buttons
│   │   └── BirdSelector.svelte   # Bird selection dropdown
│   ├── data/
│   │   ├── notes.ts              # Note constants and helpers
│   │   └── birdSongs.ts          # Bird song definitions
│   ├── engine/
│   │   ├── AudioEngine.ts        # Web Audio API wrapper
│   │   └── GraphWalker.ts        # Graph traversal logic
│   └── types/
│       └── graph.ts              # TypeScript interfaces
```

## Key Concepts

### Probabilistic Composition
Each node can have multiple outgoing edges with different weights. Higher weights = higher probability of selection.

```typescript
transitions: [
  { targetNodeId: 'n2', weight: 3 },  // 75% chance
  { targetNodeId: 'n3', weight: 1 }   // 25% chance
]
```

### Graph Cycles
Nodes can transition back to earlier nodes, creating loops and variations:
- **Local loops**: Repeat a small phrase
- **Global loops**: Return to the beginning
- **No outgoing edges**: End the song

### Multi-Note Nodes (NEW)
Each node now plays multiple notes sequentially before transitioning. This allows:
- Single nodes to express complete musical ideas
- Cleaner graph structure (fewer nodes needed)
- More natural musical phrasing

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npx tsc --noEmit # Type check without building
```

## Future Enhancement Ideas

### Potential Features
1. **Visual graph editor**: Drag-and-drop node creation
2. **Real-time visualization**: Show current node during playback
3. **Export to MIDI**: Save compositions as MIDI files
4. **More bird songs**: Expand the library
5. **Dynamic tempo**: Variable note timing based on graph state
6. **Polyphony**: Play multiple notes simultaneously (chords)
7. **Effects**: Reverb, delay, filters
8. **User-created songs**: UI for composing custom birds

### Technical Improvements
- Preload audio contexts for smoother playback
- Add fade in/out between graph cycles
- Support for microtonal frequencies
- Percussion/noise generators for drum sounds
- Save/load compositions to localStorage

## Notes for Future Development

### Adding a New Bird Song
1. Import note constants from `src/lib/data/notes.ts`
2. Define a new `BirdSong` object
3. Create nodes with `notes` arrays and `transitions`
4. Add to the `birdSongs` export array
5. Test by selecting in the UI

### Modifying the Graph Structure
The `GraphNode` interface now uses `notes: NoteParams[]`. All nodes must provide an array, even if it's a single note: `notes: [C5]`.

### Audio Engine Behavior
- Frequency 0 = rest/silence
- Duration in seconds
- ADSR envelope: 10ms attack, 50ms release
- Default waveform: 'sine'
- Default volume: 0.3

## Git History
- **e274519**: Initial commit - Basic bird song generator
- **475b117**: Add multi-note graph nodes with human-readable note constants

## Last Updated
2026-02-01 - Multi-note nodes feature implemented and documented
