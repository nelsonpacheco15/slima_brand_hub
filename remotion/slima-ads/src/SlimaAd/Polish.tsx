import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C } from "../lib/theme";
import { serif, sans } from "../lib/fonts";

// ---- film grain (subtle, over everything) ------------------------------------
export const Grain: React.FC = () => (
  <AbsoluteFill
    style={{ pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply" }}
  >
    <svg width="100%" height="100%">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={2}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

// ---- gentle floating depth for screens (parallax + tilt) ---------------------
export const Float: React.FC<{ children: React.ReactNode; seed?: number }> = ({
  children,
  seed = 0,
}) => {
  const frame = useCurrentFrame();
  const y = Math.sin((frame + seed) / 34) * 9;
  const rotY = Math.sin((frame + seed) / 52) * 1.1;
  const rotX = Math.cos((frame + seed) / 60) * 0.7;
  return (
    <div style={{ perspective: 2200 }}>
      <div
        style={{
          transform: `translateY(${y}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ---- soft blurred gradient bars (connective transition / accent) -------------
const BAR = (a: string, b: string) =>
  `linear-gradient(90deg, ${a}, ${b})`;
export const SoftGradient: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = [
    { w: 620, h: 120, x: -360, y: -260, g: BAR("#c9b6f2", "#f0b27a"), s: 0 },
    { w: 520, h: 110, x: 360, y: -300, g: BAR("#bcd0f7", "#d9c4f2"), s: 10 },
    { w: 880, h: 150, x: 0, y: 0, g: BAR("#e7b7e0", "#f3a64e"), s: 20 },
    { w: 460, h: 110, x: 460, y: 250, g: BAR("#f2bcd6", "#f0b27a"), s: 30 },
    { w: 420, h: 100, x: -420, y: 290, g: BAR("#c9c0ef", "#bcd0f7"), s: 40 },
  ];
  return (
    <AbsoluteFill
      style={{ background: C.cream, justifyContent: "center", alignItems: "center" }}
    >
      {bars.map((bar, i) => {
        const drift = Math.sin((frame + bar.s) / 20) * 16;
        const op = interpolate(frame, [0, 8, 22, 30], [0, 0.85, 0.85, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: bar.w,
              height: bar.h,
              left: "50%",
              top: "50%",
              transform: `translate(-50%,-50%) translate(${bar.x + drift}px, ${bar.y}px)`,
              background: bar.g,
              borderRadius: 999,
              filter: "blur(34px)",
              opacity: op,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ---- the scale-through project tree (depth-of-focus) -------------------------
// Big serif tree; the camera scales/pushes through it, lighting each node in turn.
type Node = { t: string; depth: number };
const NODES: Node[] = [
  { t: "The Assassin", depth: 0 },
  { t: "Manuscript", depth: 1 },
  { t: "Act I", depth: 2 },
  { t: "1. The Contract", depth: 3 },
  { t: "2. Rooftops", depth: 3 },
  { t: "Characters", depth: 1 },
  { t: "Continuity", depth: 1 },
];

export const ScaleTree: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ROW = 120;
  const CENTER = 3; // index kept at vertical centre when in focus
  // which node is "in focus" right now (advances through the list)
  const focusF = interpolate(frame, [14, durationInFrames - 18], [0, NODES.length - 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const focus = Math.round(focusF);
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.16]);
  // move the block so the focused row sits at the vertical centre
  const shiftY = -(focusF - CENTER) * ROW;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "flex-start", overflow: "hidden" }}>
      <div
        style={{
          paddingLeft: 220,
          transform: `translateY(${shiftY}px) scale(${scale})`,
          transformOrigin: "left center",
        }}
      >
        {NODES.map((n, i) => {
          const isFocus = i === focus;
          const dist = Math.abs(i - focusF);
          const op = interpolate(dist, [0, 1.4], [1, 0.16], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                height: ROW,
                marginLeft: n.depth * 80,
                fontFamily: serif,
                fontWeight: 400,
                fontSize: 78,
                lineHeight: 1,
                color: isFocus ? C.ink : C.ink4,
                opacity: op,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 38,
                  color: isFocus ? C.indigo : C.ink4,
                }}
              >
                {n.depth === 0 ? "✳" : n.depth >= 3 ? "›" : "▾"}
              </span>
              {n.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---- ambient floating glyph field (drifting editorial marks) -----------------
// Slima's literary answer to base44's floating < > / | code glyphs.
const GLYPHS = [
  { c: "“", x: -780, y: -360, s: 132, r: -8, a: false, seed: 0, p: 40 },
  { c: "¶", x: 700, y: -320, s: 96, r: 6, a: false, seed: 13, p: 52 },
  { c: "—", x: -700, y: 300, s: 92, r: 0, a: true, seed: 21, p: 46 },
  { c: "✳", x: 770, y: 320, s: 74, r: 10, a: false, seed: 34, p: 60 },
  { c: "&", x: -830, y: -20, s: 108, r: -4, a: false, seed: 47, p: 50 },
  { c: "†", x: 820, y: 60, s: 86, r: 4, a: false, seed: 58, p: 44 },
  { c: "”", x: 560, y: -440, s: 122, r: 6, a: false, seed: 66, p: 56 },
  { c: "·", x: -870, y: 420, s: 112, r: 0, a: true, seed: 72, p: 38 },
  { c: "‹", x: -560, y: -470, s: 96, r: -6, a: false, seed: 85, p: 48 },
  { c: "›", x: 650, y: 450, s: 96, r: 6, a: false, seed: 93, p: 54 },
  { c: "§", x: 890, y: -220, s: 84, r: 8, a: false, seed: 104, p: 42 },
  { c: "*", x: -780, y: -300, s: 84, r: 0, a: true, seed: 116, p: 58 },
];

export const GlyphField: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      {GLYPHS.map((g, i) => {
        const dx = Math.sin((frame + g.seed) / g.p) * 20;
        const dy = Math.cos((frame + g.seed) / (g.p + 7)) * 18;
        const rot = g.r + Math.sin((frame + g.seed) / (g.p + 12)) * 3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%,-50%) translate(${g.x + dx}px, ${g.y + dy}px) rotate(${rot}deg)`,
              fontFamily: serif,
              fontSize: g.s,
              color: g.a ? C.indigo : C.ink,
              opacity: g.a ? 0.15 : 0.09,
            }}
          >
            {g.c}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---- glyph BURST: marks explode softly outward from centre on a reveal -------
// base44-style: a centred element writes, glyphs explode behind it, then settle.
export const GlyphBurst: React.FC<{ start?: number; out?: number }> = ({ start = 6, out }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const fade = out
    ? interpolate(frame, [out, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      {GLYPHS.map((g, i) => {
        const s = spring({ frame: frame - (start + i * 2), fps, config: { damping: 26, mass: 1, stiffness: 55 } });
        const drift = Math.sin((frame + g.seed) / g.p) * 14;
        const x = g.x * s + drift;
        const y = g.y * s;
        const sc = interpolate(s, [0, 1], [0.35, 1]);
        const op = (g.a ? 0.18 : 0.11) * interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) * fade;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%,-50%) translate(${x}px, ${y}px) rotate(${g.r}deg) scale(${sc})`,
              fontFamily: serif,
              fontSize: g.s,
              color: g.a ? C.indigo : C.ink,
              opacity: op,
            }}
          >
            {g.c}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---- typewriter: a blinking cursor that types a line --------------------------
export const Typewriter: React.FC<{ text: string; start?: number; cps?: number }> = ({
  text,
  start = 16,
  cps = 1.4,
}) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - start) / cps));
  const shown = text.slice(0, n);
  const done = n >= text.length;
  const blink = Math.floor(frame / 16) % 2 === 0;
  return (
    <div
      style={{
        fontFamily: serif,
        fontWeight: 400,
        fontSize: 84,
        lineHeight: 1.18,
        color: C.ink,
        textAlign: "center",
        maxWidth: 1480,
      }}
    >
      {shown}
      <span
        style={{
          display: "inline-block",
          width: 7,
          height: 74,
          background: C.ink,
          marginLeft: 6,
          verticalAlign: "-10px",
          opacity: done ? (blink ? 1 : 0) : 1,
        }}
      />
    </div>
  );
};
