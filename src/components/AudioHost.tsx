import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { getMusicDuckVolume } from "../styles/tokens";
import { SFX, TOTAL, VO } from "../timeline";

/**
 * Optional master audio host for background music, narration, and procedural SFX.
 * Safe to include even when no audio files are configured.
 */
export const AudioHost: React.FC<{
  /** Relative path in `public/` (e.g. "assets/bg-music.mp3"). Omit if no soundtrack. */
  musicFile?: string;
}> = ({ musicFile }) => {
  const voKeys = Object.keys(VO);

  return (
    <>
      {/* 1. Optional Background Music Track */}
      {musicFile && (
        <Audio
          src={staticFile(musicFile)}
          volume={getMusicDuckVolume}
          loop
        />
      )}

      {/* 2. Narration Tracks (rendered when populated in timeline.json) */}
      {voKeys.map((key) => {
        const clip = VO[key];
        return (
          <Sequence
            key={key}
            from={clip.from}
            durationInFrames={clip.dur + 6}
            name={`VO: ${key}`}
          >
            <Audio src={staticFile(clip.file)} volume={1} />
          </Sequence>
        );
      })}

      {/* 3. Sound Effects (rendered when populated in timeline.json) */}
      {SFX.map((cue, idx) => {
        const from = Math.max(0, Math.min(TOTAL - 15, cue.from));
        const dur = cue.dur !== undefined ? cue.dur + 4 : 60;
        return (
          <Sequence
            key={`${cue.id}-${idx}`}
            from={from}
            durationInFrames={Math.min(dur, TOTAL - from)}
            name={`SFX: ${cue.id}`}
          >
            <Audio src={staticFile(cue.file)} volume={cue.vol} />
          </Sequence>
        );
      })}
    </>
  );
};
