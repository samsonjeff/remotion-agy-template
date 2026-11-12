import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

export type TransitionMode = "none" | "fade" | "wipe-ltr" | "wipe-rtl";

export const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  enter?: TransitionMode;
  exit?: TransitionMode;
  transitionFrames?: number;
}> = ({
  children,
  durationInFrames,
  enter = "fade",
  exit = "fade",
  transitionFrames = 15,
}) => {
  const frame = useCurrentFrame();

  const enterProgress =
    enter === "none"
      ? 1
      : interpolate(frame, [0, transitionFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.cubic),
        });

  const exitProgress =
    exit === "none"
      ? 1
      : interpolate(
          frame,
          [durationInFrames - transitionFrames, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
          }
        );

  // With 15f Sequence overlaps in Composition.tsx, enter fades/wipes play over
  // the previous scene: a true cross-fade / wipe reveal, not a dip to background.
  const opacity =
    (enter === "fade" ? enterProgress : 1) *
    (exit === "fade" ? exitProgress : 1);

  let clipPath = "none";
  if (enter === "wipe-ltr" && frame <= transitionFrames) {
    const rightInset = (1 - enterProgress) * 100;
    clipPath = `inset(0 ${rightInset.toFixed(2)}% 0 0)`;
  } else if (enter === "wipe-rtl" && frame <= transitionFrames) {
    const leftInset = (1 - enterProgress) * 100;
    clipPath = `inset(0 0 0 ${leftInset.toFixed(2)}%)`;
  } else if (
    exit !== "fade" &&
    exit !== "none" &&
    frame >= durationInFrames - transitionFrames
  ) {
    // Exit wipes (used when the next scene enters with "none"): the outgoing
    // scene wipes away to reveal the incoming scene parked underneath.
    if (exit === "wipe-ltr") {
      const rightInset = (1 - exitProgress) * 100;
      clipPath = `inset(0 0 0 ${rightInset.toFixed(2)}%)`;
    } else if (exit === "wipe-rtl") {
      const leftInset = (1 - exitProgress) * 100;
      clipPath = `inset(0 ${leftInset.toFixed(2)}% 0 0)`;
    }
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        clipPath: clipPath === "none" ? undefined : clipPath,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
