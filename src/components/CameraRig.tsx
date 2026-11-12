import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BEAT } from "../timeline";

// Framings cycled shot-to-shot: subtle push-ins and lateral re-frames.
const FRAMINGS = [
  { s: 1.0, x: 0, y: 0 },
  { s: 1.035, x: -18, y: 6 },
  { s: 1.015, x: 14, y: -8 },
  { s: 1.045, x: 6, y: 10 },
];

/**
 * Virtual camera for a scene. On every shot boundary (sentence onset or
 * 3.6 s filler, all beat-aligned) it eases to a new framing over 1.5 beats,
 * guaranteeing a visible change every 3-4 seconds.
 */
export const CameraRig: React.FC<{ shots: number[]; children: React.ReactNode }> = ({ shots, children }) => {
  const frame = useCurrentFrame();
  let k = 0;
  for (let i = 0; i < shots.length; i++) if (frame >= shots[i]) k = i;

  const from = FRAMINGS[(k + FRAMINGS.length - 1) % FRAMINGS.length];
  const to = FRAMINGS[k % FRAMINGS.length];
  const p =
    k === 0
      ? 1
      : interpolate(frame, [shots[k], shots[k] + BEAT * 1.5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.cubic),
        });

  const s = from.s + (to.s - from.s) * p;
  const x = from.x + (to.x - from.x) * p;
  const y = from.y + (to.y - from.y) * p;

  return (
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px) scale(${s})`, transformOrigin: "center center" }}>
      {children}
    </AbsoluteFill>
  );
};

