import type { NoteParams } from '../types/graph';

/**
 * Manages Web Audio API for playing musical notes
 */
export class AudioEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  initialize(): void {
    if (this.audioContext) return;

    this.audioContext = new AudioContext();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.5;
    this.masterGain.connect(this.audioContext.destination);
  }

  /**
   * Play a single note
   * @param note - Note parameters
   * @returns Promise that resolves when the note finishes playing
   */
  async playNote(note: NoteParams): Promise<void> {
    if (!this.audioContext || !this.masterGain) {
      throw new Error('AudioEngine not initialized');
    }

    // Handle rests (silent notes)
    if (note.frequency === 0) {
      await this.delay(note.duration);
      return;
    }

    const now = this.audioContext.currentTime;
    const attackTime = 0.01; // 10ms fade in
    const releaseTime = 0.05; // 50ms fade out
    const sustainTime = Math.max(0, note.duration - attackTime - releaseTime);

    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    oscillator.frequency.value = note.frequency;
    oscillator.type = note.waveform || 'sine';

    // Create gain node for envelope
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0;

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Apply envelope: attack -> sustain -> release
    const volume = note.volume ?? 0.3;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + attackTime);
    gainNode.gain.setValueAtTime(volume, now + attackTime + sustainTime);
    gainNode.gain.linearRampToValueAtTime(0, now + note.duration);

    // Schedule playback
    oscillator.start(now);
    oscillator.stop(now + note.duration);

    // Wait for note to finish
    await this.delay(note.duration);

    // Cleanup
    oscillator.disconnect();
    gainNode.disconnect();
  }

  /**
   * Utility to create a delay promise
   */
  private delay(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  /**
   * Clean up audio context
   */
  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.masterGain = null;
    }
  }
}
