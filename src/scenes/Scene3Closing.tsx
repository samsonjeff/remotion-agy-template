import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { CameraRig } from "../components/CameraRig";
import { SceneTransition } from "../components/SceneTransition";
import { COLORS, FONTS, getBeatPulse, SCENES } from "../styles/tokens";
import { shotsFor } from "../timeline";

export const Scene3Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SCENES.scene3Closing.duration;
  const shots = shotsFor([0, 100, 200], duration);
  const pulse = getBeatPulse(frame);

  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaEntrance = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <SceneTransition durationInFrames={duration} enter="fade" exit="fade">
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.obsidian,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTS.sans,
          overflow: "hidden",
        }}
      >
        <CameraRig shots={shots}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 48,
              opacity: headerOpacity,
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 13,
                fontWeight: "700",
                letterSpacing: "0.1em",
                color: COLORS.amber,
                backgroundColor: "rgba(251, 188, 4, 0.12)",
                padding: "6px 16px",
                borderRadius: 20,
                display: "inline-block",
                marginBottom: 16,
                border: "1px solid rgba(251, 188, 4, 0.3)",
              }}
            >
              TECHNICAL ARCHITECTURE
            </div>
            <h2
              style={{
                fontSize: 56,
                fontWeight: "800",
                color: COLORS.canvasWhite,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Sequential Node & Data Flow
            </h2>
            <p
              style={{
                fontSize: 20,
                color: COLORS.textLightSecondary,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              Progressive disclosure ensures clear visual storytelling across every scene.
            </p>
          </div>

          {/* Architecture Diagram */}
          <div style={{ zIndex: 10 }}>
            <ArchitectureDiagram />
          </div>

          {/* Bottom CTA Card */}
          <div
            style={{
              marginTop: 48,
              opacity: ctaEntrance,
              transform: `translateY(${(1 - ctaEntrance) * 20}px) scale(${1 + pulse * 0.02})`,
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 20,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${COLORS.electricBlue}`,
              borderRadius: 50,
              padding: "12px 32px",
              boxShadow: `0 0 30px ${COLORS.electricBlueGlow}`,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: "700", color: COLORS.canvasWhite }}>
              Ready to create your next video?
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 14,
                fontWeight: "700",
                color: COLORS.electricBlue,
                backgroundColor: "rgba(50, 121, 249, 0.2)",
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              npm run dev ➔
            </span>
          </div>
        </CameraRig>
      </AbsoluteFill>
    </SceneTransition>
  );
};

