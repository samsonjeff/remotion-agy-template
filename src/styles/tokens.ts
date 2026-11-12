import { Easing, interpolate } from "remotion";
import { SCENES as TL_SCENES, VO_RANGES } from "../timeline";

export const COLORS = {
  obsidian: "#121317",
  canvasWhite: "#FFFFFF",
  canvasGrey: "#F8F9FC",
  draftWellGrey: "#EFF2F7",
  hairlineGrey: "#E1E6EC",
  electricBlue: "#3279F9",
  emerald: "#00B95C",
  amber: "#FBBC04",
  coral: "#FC413D",
  mutedText: "#68707E",
  darkCard: "#1B1D24",
  darkBorder: "#2A2E39",
  obsidianCard: "#1B1D24",
  obsidianBorder: "#2A2E39",
  electricBlueGlow: "rgba(50, 121, 249, 0.28)",
  textMuted: "#68707E",
  textLight: "#FFFFFF",
  textLightSecondary: "#9AA4B2",
  textPrimary: "#121317",
  textSecondary: "#68707E",
} as const;

export const FONTS = {
  sans: "'Inter', 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'SF Mono', 'Fira Code', 'JetBrains Mono', Consolas, monospace",
} as const;

export const VIDEO_SPEC = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 900, // 30.0s default starter duration
} as const;

/**
 * Beat-snapped scene frame boundaries from `src/data/timeline.json`.
 */
export const SCENES = TL_SCENES;

export const easeOutEntrance = (
  frame: number,
  startFrame: number,
  durationFrames = 18
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
};

export const easeInOutTransition = (
  frame: number,
  startFrame: number,
  durationFrames = 15
): number => {
  return interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
};

/**
 * Edit-grid timing: 100 BPM edit grid (18 frames per beat at 30 fps).
 */
export const MUSIC_BPM = 100;
export const FRAMES_PER_BEAT = 18; // 100 BPM at 30fps

/**
 * Returns a 0 -> 1 beat-synced pulse locked to the edit grid.
 * Useful for scale breathing, glow modulation, and equalizer animations.
 */
export const getBeatPulse = (frame: number, phaseOffsetFrames = 0): number => {
  const phase = ((frame - phaseOffsetFrames) / FRAMES_PER_BEAT) * Math.PI * 2;
  const raw = 0.5 + 0.5 * Math.cos(phase);
  return Math.pow(raw, 2.2);
};

/**
 * Narration active ranges for dynamic audio ducking.
 */
export const VO_ACTIVE_WINDOWS: ReadonlyArray<readonly [number, number]> = VO_RANGES;

/**
 * Generic dynamic audio ducking curve for background music.
 * Ducks to 0.08 (-22 dB) beneath speech, and swells to full volume during speech pauses.
 */
export const getMusicDuckVolume = (frame: number): number => {
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [VIDEO_SPEC.durationInFrames - 30, VIDEO_SPEC.durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  if (VO_ACTIVE_WINDOWS.length === 0) {
    return 0.3 * fadeIn * fadeOut;
  }

  let duckFactor = 0;
  for (const [start, end] of VO_ACTIVE_WINDOWS) {
    const attackStart = start - 10;
    const releaseEnd = end + 18;
    if (frame >= attackStart && frame <= releaseEnd) {
      const att = interpolate(frame, [attackStart, start], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const rel = interpolate(frame, [end, releaseEnd], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      duckFactor = Math.max(duckFactor, Math.min(att, rel));
    }
  }

  const swellVol = 0.35;
  const duckedVol = 0.08;
  const baseVol = swellVol * (1 - duckFactor) + duckedVol * duckFactor;

  return baseVol * fadeIn * fadeOut;
};
