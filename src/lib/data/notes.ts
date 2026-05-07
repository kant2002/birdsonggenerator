import type { NoteParams } from '../types/graph';

/**
 * Musical Note Constants
 * Standard note frequencies based on A4 = 440 Hz
 * All notes have a default duration of 0.15 seconds
 */

// REST constant for silence
export const REST: NoteParams = { frequency: 0, duration: 0.1 };

// Octave 3
export const C3: NoteParams = { frequency: 130.81, duration: 0.15 };
export const Cs3: NoteParams = { frequency: 138.59, duration: 0.15 };
export const Db3: NoteParams = Cs3; // Enharmonic equivalent
export const D3: NoteParams = { frequency: 146.83, duration: 0.15 };
export const Ds3: NoteParams = { frequency: 155.56, duration: 0.15 };
export const Eb3: NoteParams = Ds3;
export const E3: NoteParams = { frequency: 164.81, duration: 0.15 };
export const F3: NoteParams = { frequency: 174.61, duration: 0.15 };
export const Fs3: NoteParams = { frequency: 185.00, duration: 0.15 };
export const Gb3: NoteParams = Fs3;
export const G3: NoteParams = { frequency: 196.00, duration: 0.15 };
export const Gs3: NoteParams = { frequency: 207.65, duration: 0.15 };
export const Ab3: NoteParams = Gs3;
export const A3: NoteParams = { frequency: 220.00, duration: 0.15 };
export const As3: NoteParams = { frequency: 233.08, duration: 0.15 };
export const Bb3: NoteParams = As3;
export const B3: NoteParams = { frequency: 246.94, duration: 0.15 };

// Octave 4 (Middle C octave)
export const C4: NoteParams = { frequency: 261.63, duration: 0.15 };
export const Cs4: NoteParams = { frequency: 277.18, duration: 0.15 };
export const Db4: NoteParams = Cs4;
export const D4: NoteParams = { frequency: 293.66, duration: 0.15 };
export const Ds4: NoteParams = { frequency: 311.13, duration: 0.15 };
export const Eb4: NoteParams = Ds4;
export const E4: NoteParams = { frequency: 329.63, duration: 0.15 };
export const F4: NoteParams = { frequency: 349.23, duration: 0.15 };
export const Fs4: NoteParams = { frequency: 369.99, duration: 0.15 };
export const Gb4: NoteParams = Fs4;
export const G4: NoteParams = { frequency: 392.00, duration: 0.15 };
export const Gs4: NoteParams = { frequency: 415.30, duration: 0.15 };
export const Ab4: NoteParams = Gs4;
export const A4: NoteParams = { frequency: 440.00, duration: 0.15 };
export const As4: NoteParams = { frequency: 466.16, duration: 0.15 };
export const Bb4: NoteParams = As4;
export const B4: NoteParams = { frequency: 493.88, duration: 0.15 };

// Octave 5
export const C5: NoteParams = { frequency: 523.25, duration: 0.15 };
export const Cs5: NoteParams = { frequency: 554.37, duration: 0.15 };
export const Db5: NoteParams = Cs5;
export const D5: NoteParams = { frequency: 587.33, duration: 0.15 };
export const Ds5: NoteParams = { frequency: 622.25, duration: 0.15 };
export const Eb5: NoteParams = Ds5;
export const E5: NoteParams = { frequency: 659.25, duration: 0.15 };
export const F5: NoteParams = { frequency: 698.46, duration: 0.15 };
export const Fs5: NoteParams = { frequency: 739.99, duration: 0.15 };
export const Gb5: NoteParams = Fs5;
export const G5: NoteParams = { frequency: 783.99, duration: 0.15 };
export const Gs5: NoteParams = { frequency: 830.61, duration: 0.15 };
export const Ab5: NoteParams = Gs5;
export const A5: NoteParams = { frequency: 880.00, duration: 0.15 };
export const As5: NoteParams = { frequency: 932.33, duration: 0.15 };
export const Bb5: NoteParams = As5;
export const B5: NoteParams = { frequency: 987.77, duration: 0.15 };

// Octave 6
export const C6: NoteParams = { frequency: 1046.50, duration: 0.15 };
export const Cs6: NoteParams = { frequency: 1108.73, duration: 0.15 };
export const Db6: NoteParams = Cs6;
export const D6: NoteParams = { frequency: 1174.66, duration: 0.15 };
export const Ds6: NoteParams = { frequency: 1244.51, duration: 0.15 };
export const Eb6: NoteParams = Ds6;
export const E6: NoteParams = { frequency: 1318.51, duration: 0.15 };
export const F6: NoteParams = { frequency: 1396.91, duration: 0.15 };
export const Fs6: NoteParams = { frequency: 1479.98, duration: 0.15 };
export const Gb6: NoteParams = Fs6;
export const G6: NoteParams = { frequency: 1567.98, duration: 0.15 };
export const Gs6: NoteParams = { frequency: 1661.22, duration: 0.15 };
export const Ab6: NoteParams = Gs6;
export const A6: NoteParams = { frequency: 1760.00, duration: 0.15 };
export const As6: NoteParams = { frequency: 1864.66, duration: 0.15 };
export const Bb6: NoteParams = As6;
export const B6: NoteParams = { frequency: 1975.53, duration: 0.15 };

/**
 * Helper function to create a note with custom duration
 *
 * @param baseNote - The base note to modify
 * @param duration - Custom duration in seconds
 * @returns A new NoteParams object with the specified duration
 *
 * @example
 * ```typescript
 * // Create a longer C5 note
 * const longC5 = note(C5, 0.5);
 *
 * // Create a short rest
 * const shortRest = note(REST, 0.05);
 * ```
 */
export const note = (baseNote: NoteParams, duration: number): NoteParams => ({
  ...baseNote,
  duration
});

/**
 * Helper function to create a note with custom waveform
 *
 * @param baseNote - The base note to modify
 * @param waveform - Oscillator waveform type
 * @returns A new NoteParams object with the specified waveform
 */
export const withWaveform = (baseNote: NoteParams, waveform: OscillatorType): NoteParams => ({
  ...baseNote,
  waveform
});

/**
 * Helper function to create a note with custom volume
 *
 * @param baseNote - The base note to modify
 * @param volume - Volume level 0-1
 * @returns A new NoteParams object with the specified volume
 */
export const withVolume = (baseNote: NoteParams, volume: number): NoteParams => ({
  ...baseNote,
  volume
});

import aUrl from '../../assets/syllables/a.wav';
import bUrl from '../../assets/syllables/b.wav';
import cUrl from '../../assets/syllables/c.wav';
import dUrl from '../../assets/syllables/d.wav';
import eUrl from '../../assets/syllables/e.wav';
import fUrl from '../../assets/syllables/f.wav';
import gUrl from '../../assets/syllables/g.wav';
import iUrl from '../../assets/syllables/i.wav';
import sUrl from '../../assets/syllables/s.wav';

/**
 * Pre-recorded syllable samples loaded from `src/assets/syllables/`.
 * `duration: 0` means "play the whole sample"; use `note(Syllables.a, 0.2)`
 * to truncate, or `withVolume(Syllables.a, 0.5)` to attenuate.
 * `withWaveform()` has no effect on samples.
 */
export const Syllables = {
  a: { sample: aUrl, frequency: 0, duration: 0 },
  b: { sample: bUrl, frequency: 0, duration: 0 },
  c: { sample: cUrl, frequency: 0, duration: 0 },
  d: { sample: dUrl, frequency: 0, duration: 0 },
  e: { sample: eUrl, frequency: 0, duration: 0 },
  f: { sample: fUrl, frequency: 0, duration: 0 },
  g: { sample: gUrl, frequency: 0, duration: 0 },
  i: { sample: iUrl, frequency: 0, duration: 0 },
  s: { sample: sUrl, frequency: 0, duration: 0 },
} as const satisfies Record<string, NoteParams>;
