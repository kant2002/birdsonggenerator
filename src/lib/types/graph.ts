/**
 * Parameters for a musical note.
 *
 * If `sample` is set, the audio engine plays that buffered sample and ignores
 * `frequency` / `waveform`. `duration === 0` means "play the whole sample";
 * any positive value truncates playback to that many seconds.
 */
export interface NoteParams {
  /** Frequency in Hz (0 = rest/silence). Ignored when `sample` is set. */
  frequency: number;
  /** Duration in seconds. For samples, 0 = play full buffer. */
  duration: number;
  /** Waveform type for the oscillator (default: 'sine'). Ignored when `sample` is set. */
  waveform?: OscillatorType;
  /** Volume level 0-1 (default: 0.3) */
  volume?: number;
  /** URL of an audio sample to play instead of synthesizing */
  sample?: string;
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
  /** Musical notes to play in sequence */
  notes: NoteParams[];
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
