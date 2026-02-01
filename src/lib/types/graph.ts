/**
 * Parameters for a musical note
 */
export interface NoteParams {
  /** Frequency in Hz (0 = rest/silence) */
  frequency: number;
  /** Duration in seconds */
  duration: number;
  /** Waveform type for the oscillator (default: 'sine') */
  waveform?: OscillatorType;
  /** Volume level 0-1 (default: 0.3) */
  volume?: number;
}

/**
 * A weighted edge connecting to another node
 */
export interface GraphEdge {
  /** ID of the target node */
  targetNodeId: string;
  /** Relative probability weight (higher = more likely) */
  weight: number;
}

/**
 * A node in the song graph
 */
export interface GraphNode {
  /** Unique identifier for the node */
  id: string;
  /** Musical note parameters */
  note: NoteParams;
  /** Weighted transitions to other nodes */
  transitions: GraphEdge[];
}

/**
 * A complete bird song graph
 */
export interface BirdSong {
  /** Display name of the bird */
  name: string;
  /** Brief description */
  description: string;
  /** ID of the starting node */
  startNodeId: string;
  /** All nodes in the graph */
  nodes: GraphNode[];
}
