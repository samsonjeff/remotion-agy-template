import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CameraRig } from "../components/CameraRig";
import { SceneTransition } from "../components/SceneTransition";
import { COLORS, FONTS, getBeatPulse, SCENES } from "../styles/tokens";
import { shotsFor } from "../timeline";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SCENES.scene1Intro.duration;
  const shots = shotsFor([0, 90, 180], duration);
  const pulse = getBeatPulse(frame);

  // Entrance interpolation
  const titleOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const titleTranslateY = interpolate(frame, [10, 40], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const badgeScale = interpolate(frame, [5, 25], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <SceneTransition durationInFrames={duration} enter="fade" exit="fade">
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.obsidian,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.sans,
          overflow: "hidden",
        }}
      >
        <CameraRig shots={shots}>
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: "absolute",
              width: 900,
              height: 900,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.electricBlueGlow} 0%, rgba(18, 19, 23, 0) 70%)`,
              opacity: 0.6 + pulse * 0.4,
              transform: `scale(${1 + pulse * 0.05})`,
              pointerEvents: "none",
            }}
          />

          {/* Central Hero Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 10,
              maxWidth: 1200,
              padding: "0 40px",
            }}
          >
            {/* Top Pill / Badge */}
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: "700",
                letterSpacing: "0.1em",
                color: COLORS.electricBlue,
                backgroundColor: "rgba(50, 121, 249, 0.12)",
                border: `1px solid rgba(50, 121, 249, 0.35)`,
                padding: "8px 20px",
                borderRadius: 30,
                marginBottom: 28,
                transform: `scale(${badgeScale})`,
                boxShadow: `0 0 24px ${COLORS.electricBlueGlow}`,
              }}
            >
              REMOTION MOTION GRAPHICS TEMPLATE
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontSize: 84,
                fontWeight: "800",
                color: COLORS.canvasWhite,
                margin: 0,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                opacity: titleOpacity,
                transform: `translateY(${titleTranslateY}px)`,
                textShadow: "0 10px 40px rgba(0,0,0,0.6)",
              }}
            >
              High-Impact Video,{" "}
              <span
                style={{
                  color: COLORS.electricBlue,
                  textShadow: `0 0 35px ${COLORS.electricBlueGlow}`,
                }}
              >
                Coded in React
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 28,
                fontWeight: "400",
                color: COLORS.textLightSecondary,
                maxWidth: 820,
                lineHeight: 1.5,
                marginTop: 24,
                marginBottom: 0,
                opacity: subtitleOpacity,
              }}
            >
              Deterministic frame-accurate timelines, beat-synced motion graphics,
              and production-ready UI components for video editors and AI coding agents.
            </p>
          </div>
        </CameraRig>
      </AbsoluteFill>
    </SceneTransition>
  );
};

