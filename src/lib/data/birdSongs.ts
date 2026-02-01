import type { BirdSong } from '../types/graph';
import {
  C3, D3, E3, F3, G3, A3, B3,
  C4, D4, E4, F4, G4, A4, B4,
  C5, D5, E5, F5, G5, A5, B5,
  C6, D6, E6, F6, G6, A6, B6,
  REST,
  note,
  withWaveform,
  withVolume
} from './notes';

/**
 * Simple Sparrow - Linear pattern with occasional repeats
 * Demonstrates multi-note nodes with quick arpeggios
 */
const simpleSparrow: BirdSong = {
  name: 'Simple Sparrow',
  description: 'A cheerful, simple song with occasional repeats',
  startNodeId: 'sp1',
  nodes: [
    {
      id: 'sp1',
      notes: [C5, E5, G5], // Quick ascending arpeggio - multiple notes!
      transitions: [{ targetNodeId: 'sp2', weight: 1 }]
    },
    {
      id: 'sp2',
      notes: [D5],
      transitions: [
        { targetNodeId: 'sp3', weight: 3 },
        { targetNodeId: 'sp1', weight: 1 } // Occasional repeat
      ]
    },
    {
      id: 'sp3',
      notes: [note(E5, 0.2)], // Slightly longer note
      transitions: [{ targetNodeId: 'sp4', weight: 1 }]
    },
    {
      id: 'sp4',
      notes: [note(C5, 0.3)], // Longer ending note
      transitions: [
        { targetNodeId: 'sp5', weight: 2 },
        { targetNodeId: 'sp2', weight: 1 } // Sometimes repeat from middle
      ]
    },
    {
      id: 'sp5',
      notes: [REST],
      transitions: [] // End
    }
  ]
};

/**
 * Melodic Nightingale - Complex melody with cycles
 * Demonstrates flowing melodies with varied note durations
 */
const melodicNightingale: BirdSong = {
  name: 'Melodic Nightingale',
  description: 'A complex, flowing melody with rich variations',
  startNodeId: 'ng1',
  nodes: [
    {
      id: 'ng1',
      notes: [note(withWaveform(G4, 'sine'), 0.2)],
      transitions: [{ targetNodeId: 'ng2', weight: 1 }]
    },
    {
      id: 'ng2',
      notes: [note(withWaveform(B4, 'sine'), 0.15)],
      transitions: [
        { targetNodeId: 'ng3', weight: 2 },
        { targetNodeId: 'ng4', weight: 1 }
      ]
    },
    {
      id: 'ng3',
      notes: [note(withWaveform(D5, 'sine'), 0.25)],
      transitions: [{ targetNodeId: 'ng5', weight: 1 }]
    },
    {
      id: 'ng4',
      notes: [note(withWaveform(C5, 'sine'), 0.2)],
      transitions: [{ targetNodeId: 'ng5', weight: 1 }]
    },
    {
      id: 'ng5',
      notes: [note(withWaveform(E5, 'sine'), 0.3)],
      transitions: [
        { targetNodeId: 'ng6', weight: 2 },
        { targetNodeId: 'ng2', weight: 1 } // Loop back
      ]
    },
    {
      id: 'ng6',
      notes: [
        note(withWaveform(D5, 'sine'), 0.1),
        note(withWaveform(C5, 'sine'), 0.1)
      ], // Quick two-note trill
      transitions: [{ targetNodeId: 'ng7', weight: 1 }]
    },
    {
      id: 'ng7',
      notes: [note(withWaveform(C5, 'sine'), 0.2)],
      transitions: [
        { targetNodeId: 'ng8', weight: 3 },
        { targetNodeId: 'ng5', weight: 1 } // Another loop
      ]
    },
    {
      id: 'ng8',
      notes: [note(withWaveform(B4, 'sine'), 0.25)],
      transitions: [{ targetNodeId: 'ng9', weight: 1 }]
    },
    {
      id: 'ng9',
      notes: [note(withWaveform(G4, 'sine'), 0.4)], // Long ending note
      transitions: [
        { targetNodeId: 'ng10', weight: 2 },
        { targetNodeId: 'ng1', weight: 1 } // Rare full restart
      ]
    },
    {
      id: 'ng10',
      notes: [note(REST, 0.15)],
      transitions: [] // End
    }
  ]
};

/**
 * Rhythmic Woodpecker - Fast percussive pattern with repetition
 * Demonstrates rhythmic patterns with multiple notes per node
 */
const rhythmicWoodpecker: BirdSong = {
  name: 'Rhythmic Woodpecker',
  description: 'Fast, percussive knocking pattern',
  startNodeId: 'wp1',
  nodes: [
    {
      id: 'wp1',
      notes: [
        withVolume(withWaveform(note(A5, 0.08), 'square'), 0.4),
        note(REST, 0.05),
        withVolume(withWaveform(note(A5, 0.08), 'square'), 0.4)
      ], // Double knock pattern in one node
      transitions: [{ targetNodeId: 'wp2', weight: 1 }]
    },
    {
      id: 'wp2',
      notes: [note(REST, 0.05)], // Short rest
      transitions: [{ targetNodeId: 'wp3', weight: 1 }]
    },
    {
      id: 'wp3',
      notes: [
        withVolume(withWaveform(note(B5, 0.08), 'square'), 0.4),
        note(REST, 0.05),
        withVolume(withWaveform(note(B5, 0.08), 'square'), 0.4)
      ], // Double knock at higher pitch
      transitions: [{ targetNodeId: 'wp4', weight: 1 }]
    },
    {
      id: 'wp4',
      notes: [note(REST, 0.05)], // Short rest
      transitions: [
        { targetNodeId: 'wp5', weight: 2 },
        { targetNodeId: 'wp1', weight: 3 } // Often repeats the pattern
      ]
    },
    {
      id: 'wp5',
      notes: [
        withVolume(withWaveform(note(C6, 0.1), 'square'), 0.5)
      ], // Accent note
      transitions: [{ targetNodeId: 'wp6', weight: 1 }]
    },
    {
      id: 'wp6',
      notes: [note(REST, 0.2)], // Longer rest
      transitions: [
        { targetNodeId: 'wp7', weight: 1 },
        { targetNodeId: 'wp1', weight: 2 } // Back to start
      ]
    },
    {
      id: 'wp7',
      notes: [note(REST, 0.1)], // Final rest
      transitions: [] // End
    }
  ]
};

/**
 * Cascading Finch - Demonstrates rich multi-note cascades
 * Features descending runs and complex note sequences
 */
const cascadingFinch: BirdSong = {
  name: 'Cascading Finch',
  description: 'Flowing cascades of notes in rapid succession',
  startNodeId: 'cf1',
  nodes: [
    {
      id: 'cf1',
      notes: [G5, F5, E5, D5], // Four-note descending run
      transitions: [{ targetNodeId: 'cf2', weight: 1 }]
    },
    {
      id: 'cf2',
      notes: [note(C5, 0.25)], // Pause on the landing note
      transitions: [
        { targetNodeId: 'cf3', weight: 2 },
        { targetNodeId: 'cf1', weight: 1 } // Repeat the cascade
      ]
    },
    {
      id: 'cf3',
      notes: [E5, G5, E5], // Trill pattern
      transitions: [{ targetNodeId: 'cf4', weight: 1 }]
    },
    {
      id: 'cf4',
      notes: [note(D5, 0.2), note(REST, 0.1), note(D5, 0.2)], // Note-rest-note
      transitions: [
        { targetNodeId: 'cf5', weight: 3 },
        { targetNodeId: 'cf3', weight: 1 } // Back to trill
      ]
    },
    {
      id: 'cf5',
      notes: [C5, D5, E5, G5, note(A5, 0.3)], // Ascending to high finish
      transitions: [
        { targetNodeId: 'cf6', weight: 2 },
        { targetNodeId: 'cf1', weight: 1 } // Restart from beginning
      ]
    },
    {
      id: 'cf6',
      notes: [note(REST, 0.15)],
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
  rhythmicWoodpecker,
  cascadingFinch
];
