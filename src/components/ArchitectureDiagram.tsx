import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, FONTS } from "../styles/tokens";

export interface DiagramNode {
  title: string;
  subtitle: string;
  badge: string;
  active?: boolean;
}

const DEFAULT_NODES: DiagramNode[] = [
  {
    title: "Client Application",
    subtitle: "React Native / Web client with 60fps animations",
    badge: "FRONTEND",
    active: true,
  },
  {
    title: "API Gateway",
    subtitle: "Secure request routing, rate limiting & auth",
    badge: "GATEWAY",
    active: true,
  },
  {
    title: "Realtime Database",
    subtitle: "Event stream storage & state synchronization",
    badge: "DATABASE",
    active: true,
  },
  {
    title: "Cloud & AI Services",
    subtitle: "Serverless workers, background jobs & inference",
    badge: "SERVICES",
    active: true,
  },
];

const NodeBox: React.FC<DiagramNode> = ({
  title,
  subtitle,
  badge,
  active,
}) => (
  <div
    style={{
      width: 280,
      padding: "24px 20px",
      borderRadius: 20,
      backgroundColor: COLORS.obsidianCard,
      border: `2px solid ${active ? COLORS.electricBlue : COLORS.obsidianBorder}`,
      boxShadow: active ? `0 12px 35px ${COLORS.electricBlueGlow}` : "none",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      position: "relative",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: active ? COLORS.electricBlue : COLORS.textMuted,
          backgroundColor: active
            ? "rgba(50, 121, 249, 0.15)"
            : "rgba(255, 255, 255, 0.05)",
          padding: "4px 8px",
          borderRadius: 6,
          fontFamily: FONTS.mono,
        }}
      >
        {badge}
      </span>
    </div>
    <div style={{ fontSize: 20, fontWeight: "700", color: COLORS.textLight }}>
      {title}
    </div>
    <div
      style={{
        fontSize: 13,
        color: COLORS.textLightSecondary,
        lineHeight: 1.4,
      }}
    >
      {subtitle}
    </div>
  </div>
);

export const ArchitectureDiagram: React.FC<{ nodes?: DiagramNode[] }> = ({
  nodes = DEFAULT_NODES,
}) => {
  const frame = useCurrentFrame();
  const packetPos = interpolate((frame * 4) % 180, [0, 180], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        position: "relative",
      }}
    >
      {nodes.map((node, i) => {
        const nodeSpring = spring({
          frame: frame - i * 20 - 10,
          fps: 30,
          config: { damping: 14 },
        });

        return (
          <React.Fragment key={i}>
            <div
              style={{
                opacity: nodeSpring,
                transform: `translateY(${(1 - nodeSpring) * 24}px)`,
              }}
            >
              <NodeBox {...node} />
            </div>

            {i < nodes.length - 1 && (
              <div
                style={{
                  width: 36,
                  height: 4,
                  backgroundColor: COLORS.electricBlue,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#FFFFFF",
                    top: -2,
                    left: `${packetPos * 100}%`,
                    boxShadow: "0 0 10px #FFFFFF",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
