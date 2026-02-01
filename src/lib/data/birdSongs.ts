import type { BirdSong } from '../types/graph';

/**
 * Simple Sparrow - Linear pattern with occasional repeats
 */
const simpleSparrow: BirdSong = {
  name: 'Simple Sparrow',
  description: 'A cheerful, simple song with occasional repeats',
  startNodeId: 'sp1',
  nodes: [
    {
      id: 'sp1',
      note: { frequency: 523.25, duration: 0.15 }, // C5
      transitions: [{ targetNodeId: 'sp2', weight: 1 }]
    },
    {
      id: 'sp2',
      note: { frequency: 587.33, duration: 0.15 }, // D5
      transitions: [
        { targetNodeId: 'sp3', weight: 3 },
        { targetNodeId: 'sp1', weight: 1 } // Occasional repeat
      ]
    },
    {
      id: 'sp3',
      note: { frequency: 659.25, duration: 0.2 }, // E5
      transitions: [{ targetNodeId: 'sp4', weight: 1 }]
    },
    {
      id: 'sp4',
      note: { frequency: 523.25, duration: 0.3 }, // C5 (longer)
      transitions: [
        { targetNodeId: 'sp5', weight: 2 },
        { targetNodeId: 'sp2', weight: 1 } // Sometimes repeat from middle
      ]
    },
    {
      id: 'sp5',
      note: { frequency: 0, duration: 0.1 }, // Rest
      transitions: [] // End
    }
  ]
};

/**
 * Melodic Nightingale - Complex melody with cycles
 */
const melodicNightingale: BirdSong = {
  name: 'Melodic Nightingale',
  description: 'A complex, flowing melody with rich variations',
  startNodeId: 'ng1',
  nodes: [
    {
      id: 'ng1',
      note: { frequency: 392.00, duration: 0.2, waveform: 'sine' }, // G4
      transitions: [{ targetNodeId: 'ng2', weight: 1 }]
    },
    {
      id: 'ng2',
      note: { frequency: 493.88, duration: 0.15, waveform: 'sine' }, // B4
      transitions: [
        { targetNodeId: 'ng3', weight: 2 },
        { targetNodeId: 'ng4', weight: 1 }
      ]
    },
    {
      id: 'ng3',
      note: { frequency: 587.33, duration: 0.25, waveform: 'sine' }, // D5
      transitions: [{ targetNodeId: 'ng5', weight: 1 }]
    },
    {
      id: 'ng4',
      note: { frequency: 523.25, duration: 0.2, waveform: 'sine' }, // C5
      transitions: [{ targetNodeId: 'ng5', weight: 1 }]
    },
    {
      id: 'ng5',
      note: { frequency: 659.25, duration: 0.3, waveform: 'sine' }, // E5
      transitions: [
        { targetNodeId: 'ng6', weight: 2 },
        { targetNodeId: 'ng2', weight: 1 } // Loop back
      ]
    },
    {
      id: 'ng6',
      note: { frequency: 587.33, duration: 0.15, waveform: 'sine' }, // D5
      transitions: [{ targetNodeId: 'ng7', weight: 1 }]
    },
    {
      id: 'ng7',
      note: { frequency: 523.25, duration: 0.2, waveform: 'sine' }, // C5
      transitions: [
        { targetNodeId: 'ng8', weight: 3 },
        { targetNodeId: 'ng5', weight: 1 } // Another loop
      ]
    },
    {
      id: 'ng8',
      note: { frequency: 493.88, duration: 0.25, waveform: 'sine' }, // B4
      transitions: [{ targetNodeId: 'ng9', weight: 1 }]
    },
    {
      id: 'ng9',
      note: { frequency: 392.00, duration: 0.4, waveform: 'sine' }, // G4 (long)
      transitions: [
        { targetNodeId: 'ng10', weight: 2 },
        { targetNodeId: 'ng1', weight: 1 } // Rare full restart
      ]
    },
    {
      id: 'ng10',
      note: { frequency: 0, duration: 0.15 }, // Rest
      transitions: [] // End
    }
  ]
};

/**
 * Rhythmic Woodpecker - Fast percussive pattern with repetition
 */
const rhythmicWoodpecker: BirdSong = {
  name: 'Rhythmic Woodpecker',
  description: 'Fast, percussive knocking pattern',
  startNodeId: 'wp1',
  nodes: [
    {
      id: 'wp1',
      note: { frequency: 800, duration: 0.08, waveform: 'square', volume: 0.4 },
      transitions: [{ targetNodeId: 'wp2', weight: 1 }]
    },
    {
      id: 'wp2',
      note: { frequency: 0, duration: 0.05 }, // Short rest
      transitions: [{ targetNodeId: 'wp3', weight: 1 }]
    },
    {
      id: 'wp3',
      note: { frequency: 850, duration: 0.08, waveform: 'square', volume: 0.4 },
      transitions: [{ targetNodeId: 'wp4', weight: 1 }]
    },
    {
      id: 'wp4',
      note: { frequency: 0, duration: 0.05 }, // Short rest
      transitions: [
        { targetNodeId: 'wp5', weight: 2 },
        { targetNodeId: 'wp1', weight: 3 } // Often repeats the pattern
      ]
    },
    {
      id: 'wp5',
      note: { frequency: 900, duration: 0.1, waveform: 'square', volume: 0.5 },
      transitions: [{ targetNodeId: 'wp6', weight: 1 }]
    },
    {
      id: 'wp6',
      note: { frequency: 0, duration: 0.2 }, // Longer rest
      transitions: [
        { targetNodeId: 'wp7', weight: 1 },
        { targetNodeId: 'wp1', weight: 2 } // Back to start
      ]
    },
    {
      id: 'wp7',
      note: { frequency: 0, duration: 0.1 }, // Final rest
      transitions: [] // End
    }
  ]
};

/**
 * All available bird songs
 */
export const birdSongs: BirdSong[] = [
  simpleSparrow,
  melodicNightingale,
  rhythmicWoodpecker
];
