import React from "react";
import { Composition, Folder } from "remotion";
import { Main } from "./Composition";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Showcase } from "./scenes/Scene2Showcase";
import { Scene3Closing } from "./scenes/Scene3Closing";
import { SCENES, VIDEO_SPEC } from "./styles/tokens";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master Video Sequence */}
      <Composition
        id="Main"
        component={Main}
        durationInFrames={VIDEO_SPEC.durationInFrames}
        fps={VIDEO_SPEC.fps}
        width={VIDEO_SPEC.width}
        height={VIDEO_SPEC.height}
      />

      {/* Individual Scene Compositions for Isolated Preview & Editing */}
      <Folder name="Scenes">
        <Composition
          id="Scene1-Intro"
          component={Scene1Intro}
          durationInFrames={SCENES.scene1Intro.duration}
          fps={VIDEO_SPEC.fps}
          width={VIDEO_SPEC.width}
          height={VIDEO_SPEC.height}
        />
        <Composition
          id="Scene2-Showcase"
          component={Scene2Showcase}
          durationInFrames={SCENES.scene2Showcase.duration}
          fps={VIDEO_SPEC.fps}
          width={VIDEO_SPEC.width}
          height={VIDEO_SPEC.height}
        />
        <Composition
          id="Scene3-Closing"
          component={Scene3Closing}
          durationInFrames={SCENES.scene3Closing.duration}
          fps={VIDEO_SPEC.fps}
          width={VIDEO_SPEC.width}
          height={VIDEO_SPEC.height}
        />
      </Folder>
    </>
  );
};
