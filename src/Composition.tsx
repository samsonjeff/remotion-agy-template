import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AudioHost } from "./components/AudioHost";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Showcase } from "./scenes/Scene2Showcase";
import { Scene3Closing } from "./scenes/Scene3Closing";
import { COLORS, SCENES } from "./styles/tokens";

// 15-frame overlaps turn adjacent enter/exit pairs into true cross-fades
// instead of dipping to the background canvas.
const XF = 15;

export const Main: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.obsidian,
      }}
    >
      {/* Optional Audio Host (Music ducking, voiceovers, procedural SFX) */}
      <AudioHost />

      {/* Scene 1: Intro & Hook (0 - 300f | 0:00 - 0:10) */}
      <Sequence
        from={SCENES.scene1Intro.from}
        durationInFrames={SCENES.scene1Intro.duration}
        name="Scene 1: Intro"
      >
        <Scene1Intro />
      </Sequence>

      {/* Scene 2: Feature Showcase (300 - 600f | 0:10 - 0:20) */}
      <Sequence
        from={SCENES.scene2Showcase.from - XF}
        durationInFrames={SCENES.scene2Showcase.duration}
        name="Scene 2: Showcase"
      >
        <Scene2Showcase />
      </Sequence>

      {/* Scene 3: Architecture & Closing (600 - 900f | 0:20 - 0:30) */}
      <Sequence
        from={SCENES.scene3Closing.from - XF}
        durationInFrames={SCENES.scene3Closing.duration + XF}
        name="Scene 3: Closing"
      >
        <Scene3Closing />
      </Sequence>
    </AbsoluteFill>
  );
};
