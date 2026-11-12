/**
 * Typed access to the beat-snapped master timeline.
 *
 * Grid: 100 BPM -> 1 beat = 18 frames, 1 bar = 72 frames @ 30 fps.
 * Edit grid timing: Every scene cut, narration entry, action beat, and
 * getBeatPulse() glow locks to it.
 */
import data from "./data/timeline.json";

export const TL = data;
export const FPS = data.fps;
export const BEAT = data.beat;
export const BAR = data.bar;
export const TOTAL = data.total;
export const MARKS = data.marks;
export const SCENES = data.scenes;
export const VO = data.vo as Record<string, { from: number; dur: number; file: string; sentences: number[] }>;
export const SFX = data.sfx as Array<{ id: string; from: number; dur?: number; file: string; vol: number }>;

export type SceneKey = keyof typeof data.scenes;
export type VoKey = keyof typeof data.vo;

/** Absolute frame -> frame relative to a scene's Sequence. */
export const rel = (scene: SceneKey, abs: number) => abs - SCENES[scene].from;

/** Sentence onsets of a narration clip, relative to the given scene. */
export const sentencesIn = (scene: SceneKey, clip: string): number[] => {
  const voClip = VO[clip];
  if (!voClip || !voClip.sentences) return [];
  return voClip.sentences.map((f) => f - SCENES[scene].from);
};

/** Safe index into an onset list with a fallback frame. */
export const at = (list: number[], i: number, fallback: number) =>
  i >= 0 && i < list.length ? list[i] : fallback;

/** Snap a frame to the beat grid (round to nearest). */
export const onBeat = (f: number) => Math.round(f / BEAT) * BEAT;

/**
 * Shot boundaries for the 3-second rule: every sentence onset, plus
 * beat-aligned fillers so no shot runs longer than ~4 s.
 */
export const shotsFor = (sentenceRel: number[], duration: number): number[] => {
  const MAX_SHOT = BEAT * 7; // 4.2 s
  const FILL = BEAT * 6; // 3.6 s
  const base = Array.from(new Set([0, ...sentenceRel.filter((f) => f > 0 && f < duration)])).sort(
    (a, b) => a - b
  );
  const out: number[] = [];
  base.forEach((f, i) => {
    out.push(f);
    const next = i + 1 < base.length ? base[i + 1] : duration;
    let cursor = f;
    while (next - cursor > MAX_SHOT) {
      cursor = onBeat(cursor + FILL);
      if (next - cursor < BEAT * 2) break;
      out.push(cursor);
    }
  });
  return out;
};

/** Narration ranges (absolute) for music bed ducking. */
export const VO_RANGES: Array<[number, number]> = (Object.keys(VO) as string[]).map((k) => [
  VO[k].from,
  VO[k].from + VO[k].dur,
]);

/** Exact spoken sentence intervals (absolute frames) for sidechain ducking. */
export const VOICED_PHRASES: Array<[number, number]> = [];
