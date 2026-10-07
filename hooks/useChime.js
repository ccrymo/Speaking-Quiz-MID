"use client";

import { useCallback, useRef } from "react";

// G5, C6, E6: a short, gentle "time's up" chime.
const NOTES = [783.99, 1046.5, 1318.51];
const NOTE_GAP_S = 0.32;

/**
 * Plays a soft chime with the Web Audio API (no sound files needed).
 * Browsers only allow audio after the user has interacted with the page,
 * so call `prime` from a click or key handler before `play` is needed.
 */
export function useChime() {
  const contextRef = useRef(null);

  const prime = useCallback(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!contextRef.current) {
      try {
        contextRef.current = new AudioContext();
      } catch {
        return;
      }
    }
    if (contextRef.current.state === "suspended") {
      contextRef.current.resume().catch(() => {});
    }
  }, []);

  const play = useCallback(() => {
    const ctx = contextRef.current;
    if (!ctx) return;
    const start = ctx.currentTime + 0.05;
    NOTES.forEach((frequency, i) => {
      const at = start + i * NOTE_GAP_S;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.22, at + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 1.1);
      gain.connect(ctx.destination);

      // A quiet octave overtone makes the tone sound more like a bell.
      [
        [frequency, 1],
        [frequency * 2, 0.25],
      ].forEach(([hz, level]) => {
        const osc = ctx.createOscillator();
        const partial = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = hz;
        partial.gain.value = level;
        osc.connect(partial);
        partial.connect(gain);
        osc.start(at);
        osc.stop(at + 1.15);
      });
    });
  }, []);

  return { prime, play };
}
