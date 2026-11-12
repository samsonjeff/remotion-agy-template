import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../styles/tokens";
import { BEAT } from "../timeline";

export interface BRollCutawayProps {
  title: string;
  badge?: string;
  accentColor?: string;
  caption?: string;
  highlightWords?: string[];
  children?: React.ReactNode;
}

export const BRollCutaway: React.FC<BRollCutawayProps> = ({
  title,
  badge = "FEATURE SPOTLIGHT",
  accentColor = COLORS.electricBlue,
  caption,
  highlightWords = [],
  children,
}) => {
  const frame = useCurrentFrame();

  const entrance = interpolate(frame, [0, BEAT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scale = 0.94 + entrance * 0.06;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 640,
        borderRadius: 28,
        backgroundColor: "rgba(27, 29, 36, 0.92)",
        border: `2px solid ${accentColor}44`,
        boxShadow: `0 30px 80px rgba(0, 0, 0, 0.5), 0 0 60px ${accentColor}22`,
        backdropFilter: "blur(20px)",
        padding: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: entrance,
        transform: `scale(${scale})`,
        overflow: "hidden",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            fontWeight: "700",
            letterSpacing: "0.08em",
            color: accentColor,
            backgroundColor: `${accentColor}18`,
            padding: "6px 14px",
            borderRadius: 8,
            border: `1px solid ${accentColor}33`,
          }}
        >
          {badge}
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>

      {/* Main Content Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "24px 0",
        }}
      >
        {children ?? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
            }}
          >
            <h2
              style={{
                fontFamily: FONTS.sans,
                fontSize: 48,
                fontWeight: "700",
                color: COLORS.canvasWhite,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
            {caption && (
              <p
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 22,
                  color: COLORS.textLightSecondary,
                  maxWidth: 720,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {caption.split(" ").map((w, idx) => {
                  const clean = w.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
                  const isHl = highlightWords.some(
                    (hw) => hw.toLowerCase() === clean
                  );
                  return (
                    <span
                      key={idx}
                      style={{
                        color: isHl ? accentColor : COLORS.textLightSecondary,
                        fontWeight: isHl ? "600" : "400",
                        marginRight: 6,
                        display: "inline-block",
                      }}
                    >
                      {w}
                    </span>
                  );
                })}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status / Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: 16,
          fontFamily: FONTS.sans,
          fontSize: 14,
          color: COLORS.textMuted,
        }}
      >
        <span>Remotion Motion Graphics</span>
        <span>1080p • 30fps</span>
      </div>
    </div>
  );
};
