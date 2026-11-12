import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "../styles/tokens";

const BASE_BARS = [
  16, 28, 46, 64, 38, 56, 78, 52, 34, 68, 82, 48, 60, 36, 24, 14,
];

export const Waveform: React.FC<{
  active?: boolean;
  color?: string;
  barWidth?: number;
  gap?: number;
  scale?: number;
}> = ({
  active = true,
  color = COLORS.electricBlue,
  barWidth = 6,
  gap = 5,
  scale = 1,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap,
        height: 92 * scale,
      }}
    >
      {BASE_BARS.map((baseHeight, i) => {
        const wave1 = Math.sin(frame * 0.36 + i * 0.65) * 24;
        const wave2 = Math.cos(frame * 0.22 - i * 0.45) * 14;
        const rawHeight = active ? baseHeight + wave1 + wave2 : 10;
        const height = Math.max(8, rawHeight) * scale;

        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height,
              borderRadius: barWidth / 2,
              backgroundColor: color,
              boxShadow: active ? `0 0 12px ${color}66` : "none",
            }}
          />
        );
      })}
    </div>
  );
};
