import type { BirdSong, GraphNode } from '../types/graph';

/**
 * Walks through a song graph making probabilistic decisions
 */
export class GraphWalker {
  private song: BirdSong;
  private currentNode: GraphNode | null = null;
  private isRunning = false;
  private shouldStop = false;
  private maxSteps = 100; // Prevent infinite loops

  /**
   * @param song - The bird song graph to walk
   */
  constructor(song: BirdSong) {
    this.song = song;
  }

  /**
   * Start walking the graph
   * @param onNodeVisit - Callback invoked for each node visited
   */
  async start(onNodeVisit: (node: GraphNode) => Promise<void>): Promise<void> {
    if (this.isRunning) {
      throw new Error('GraphWalker is already running');
    }

    this.isRunning = true;
    this.shouldStop = false;
    this.currentNode = this.getNodeById(this.song.startNodeId);

    let stepCount = 0;

    while (this.currentNode && !this.shouldStop && stepCount < this.maxSteps) {
      // Visit current node
      await onNodeVisit(this.currentNode);

      // Check if we should stop
      if (this.shouldStop) break;

      // Select next node
      this.currentNode = this.selectNextNode(this.currentNode);
      stepCount++;
    }

    this.isRunning = false;
  }

  /**
   * Stop the walker
   */
  stop(): void {
    this.shouldStop = true;
  }

  /**
   * Reset the walker to the start node
   */
  reset(): void {
    this.currentNode = null;
    this.isRunning = false;
    this.shouldStop = false;
  }

  /**
   * Check if the walker is currently running
   */
  get running(): boolean {
    return this.isRunning;
  }

  /**
   * Get a node by its ID
   */
  private getNodeById(id: string): GraphNode | null {
    return this.song.nodes.find(node => node.id === id) || null;
  }

  /**
   * Select the next node using weighted random selection
   */
  private selectNextNode(currentNode: GraphNode): GraphNode | null {
    const transitions = currentNode.transitions;

    // No outgoing edges - terminate
    if (transitions.length === 0) {
      return null;
    }

    // Calculate total weight
    const totalWeight = transitions.reduce((sum, edge) => sum + edge.weight, 0);

    // Random value in [0, totalWeight)
    let random = Math.random() * totalWeight;

    // Select edge by cumulative weight
    for (const edge of transitions) {
      random -= edge.weight;
      if (random <= 0) {
        return this.getNodeById(edge.targetNodeId);
      }
    }

    // Fallback (shouldn't reach here)
    return this.getNodeById(transitions[0].targetNodeId);
  }
}
