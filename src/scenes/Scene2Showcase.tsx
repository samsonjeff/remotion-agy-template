import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { CameraRig } from "../components/CameraRig";
import { Captions } from "../components/Captions";
import { MessengerBubble } from "../components/MessengerBubble";
import { PhoneFrame } from "../components/PhoneFrame";
import { SceneTransition } from "../components/SceneTransition";
import { Waveform } from "../components/Waveform";
import { COLORS, FONTS, getBeatPulse, SCENES } from "../styles/tokens";
import { shotsFor } from "../timeline";

export const Scene2Showcase: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = SCENES.scene2Showcase.duration;
  const shots = shotsFor([0, 100, 200], duration);
  const pulse = getBeatPulse(frame);

  // Phone entrance
  const phoneEntrance = interpolate(frame, [0, 30], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const phoneOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Feature cards entrance
  const card1Entrance = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const card2Entrance = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Caption kinetic progress
  const captionProgress = interpolate(frame, [30, 240], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
          {/* Main Layout: Phone on left, feature highlights on right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 80,
              width: "100%",
              maxWidth: 1500,
              padding: "0 60px",
              zIndex: 10,
            }}
          >
            {/* Phone Mockup Showcase */}
            <div
              style={{
                opacity: phoneOpacity,
                transform: `translateY(${phoneEntrance}px)`,
                flexShrink: 0,
              }}
            >
              <PhoneFrame
                width={380}
                height={760}
                glowColor={COLORS.electricBlue}
                glowOpacity={0.2 + pulse * 0.15}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#16181F",
                    borderRadius: 40,
                    padding: "60px 20px 24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    color: COLORS.canvasWhite,
                  }}
                >
                  {/* Mock Chat Conversation */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: FONTS.mono,
                        color: COLORS.textMuted,
                        textAlign: "center",
                        letterSpacing: "0.05em",
                      }}
                    >
                      LIVE FEED • 60 FPS
                    </div>

                    <MessengerBubble
                      senderName="Alex Chen"
                      avatarText="A"
                      message="Can we preview the full explainer video directly in the browser?"
                      timeAgo="1m ago"
                      unread={false}
                    />

                    <MessengerBubble
                      senderName="Remotion Bot"
                      avatarText="R"
                      message="Yes! Scrub frame-by-frame with zero render lag and full audio sync."
                      timeAgo="Just now"
                      unread={true}
                    />
                  </div>

                  {/* Audio Waveform Widget inside Phone */}
                  <div
                    style={{
                      backgroundColor: "rgba(50, 121, 249, 0.1)",
                      border: "1px solid rgba(50, 121, 249, 0.25)",
                      borderRadius: 20,
                      padding: "16px 12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: FONTS.mono,
                        color: COLORS.electricBlue,
                        fontWeight: "700",
                      }}
                    >
                      LIVE AUDIO SPECTRUM
                    </span>
                    <Waveform
                      active={true}
                      color={COLORS.electricBlue}
                      barWidth={4}
                      gap={4}
                      scale={0.8}
                    />
                  </div>
                </div>
              </PhoneFrame>
            </div>

            {/* Right Side Feature Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
                maxWidth: 620,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  color: COLORS.emerald,
                  backgroundColor: "rgba(0, 185, 92, 0.12)",
                  padding: "6px 16px",
                  borderRadius: 20,
                  alignSelf: "flex-start",
                  border: "1px solid rgba(0, 185, 92, 0.3)",
                }}
              >
                MODULAR COMPONENTS
              </div>

              <h2
                style={{
                  fontSize: 54,
                  fontWeight: "800",
                  color: COLORS.canvasWhite,
                  margin: 0,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                Drop-in Mockups & Dynamic Graphics
              </h2>

              {/* Feature Pill 1 */}
              <div
                style={{
                  backgroundColor: COLORS.obsidianCard,
                  border: `1px solid ${COLORS.obsidianBorder}`,
                  borderRadius: 18,
                  padding: "20px 24px",
                  opacity: card1Entrance,
                  transform: `translateX(${(1 - card1Entrance) * 30}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.canvasWhite }}>
                    Realistic PhoneFrame
                  </div>
                  <div style={{ fontSize: 14, color: COLORS.textLightSecondary, marginTop: 4 }}>
                    Customizable bezels, dynamic island cutout, and interactive glow reflections.
                  </div>
                </div>
              </div>

              {/* Feature Pill 2 */}
              <div
                style={{
                  backgroundColor: COLORS.obsidianCard,
                  border: `1px solid ${COLORS.obsidianBorder}`,
                  borderRadius: 18,
                  padding: "20px 24px",
                  opacity: card2Entrance,
                  transform: `translateX(${(1 - card2Entrance) * 30}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: "700", color: COLORS.canvasWhite }}>
                    Deterministic Waveform
                  </div>
                  <div style={{ fontSize: 14, color: COLORS.textLightSecondary, marginTop: 4 }}>
                    Frame-exact audio reactive equalizer bars locking to your edit grid.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kinetic Captions along bottom */}
          <Captions
            text="Modular video architecture enables instant iteration and frame-perfect animations."
            highlightWords={["modular", "instant", "frame-perfect"]}
            progress={captionProgress}
            bottom={50}
          />
        </CameraRig>
      </AbsoluteFill>
    </SceneTransition>
  );
};

