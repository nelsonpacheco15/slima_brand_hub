import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont as loadSerif } from "@remotion/google-fonts/IBMPlexSerif";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const serif = loadSerif().fontFamily;
const inter = loadInter().fontFamily;

const INK = "#0a0a0a";
const INK3 = "#5a5a60";
const INK4 = "#8a8a8e";
const LINE = "#ececea";
const SOFT = "#faf9f6";
const INDIGO = "#6366f1";
const GREEN = "#4ea87a";
const AMBER = "#d97706";
const RED = "#d0463a";

const MARK_PATH =
  "M58.8,38.61l39.68-15.07c.8.6,1.56,1.48,1.93,2.42.29.74.76,2.23.2,2.84l-33.5,18.01c.1.24,2.21.66,2.64.76,14.6,3.43,29.37,6.15,44.07,9.15.21.03.34.13.46.3.83,1.19.46,6.42-1.4,6.51-14.91-1.43-29.87-2.4-44.82-3.41l35.8,35.91c-.58,2.36-2.53,5.23-5.18,5.09l-22.15-17.11-17.15-12.38c3.09,15.53,6.74,30.93,10.38,46.34.18.79-.66,1.53-1.26,1.94-1.23.83-4.84,1.91-5.77.36-5.52-15.48-10.88-31.03-17.23-46.18-5.16,13.04-9.74,26.31-14.46,39.51-1.02,1.62-5.36.05-6.25-1.44l9.86-45.05-13.19,9.74-14.41,11.25c-1.63.83-4.72-2.86-3.67-4.14,9.4-8.83,18.66-17.83,27.49-27.23l-27.47,2.24c-1.3-.04-1.75-2.99-1.11-3.93l31.22-6.9-20.63-10.69c-1.44-.53-.12-3.03.81-3.29l23.97,8.98-11.48-20.62c.15-.75,2.19-2.19,2.88-1.26,3.24,4.56,6.44,9.14,9.77,13.63,1.05,1.41,2.18,3.11,3.31,4.42.12.14,0,.36.43.24l1.89-27.64c1.05-.77,3.12-.77,3.35.79.49,7.91.8,15.84,1.37,23.74.02.28-.15.55.28.47,3.35-4.45,6.77-8.85,10.06-13.34,3.49-4.75,6.85-9.66,10.36-14.37,1.23-.38,4.13,1.48,3.56,2.99-4.1,7.49-8.52,14.82-12.59,22.33-.23.43-2.2,3.92-2.04,4.09Z";

const Mark: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 130 130">
    <path fill={INK} d={MARK_PATH} />
  </svg>
);

// soft animated background wash
const Bg: React.FC = () => {
  const f = useCurrentFrame();
  const drift = (a: number, b: number) =>
    interpolate(Math.sin((f / 90) * Math.PI + a), [-1, 1], [b, b + 60]);
  const blob = (
    x: number,
    y: number,
    c: string,
    a: number,
    s: number,
  ): React.CSSProperties => ({
    position: "absolute",
    left: x,
    top: y,
    width: s,
    height: s,
    borderRadius: "50%",
    background: c,
    filter: "blur(160px)",
    opacity: 0.4,
    transform: `translate(${drift(a, 0)}px, ${drift(a + 2, 0)}px)`,
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff", overflow: "hidden" }}>
      <div style={blob(-200, -150, INDIGO, 0, 760)} />
      <div style={blob(1300, 500, AMBER, 1.5, 720)} />
      <div style={blob(700, 760, "#a855f7", 3, 700)} />
      <AbsoluteFill style={{ backgroundColor: "rgba(255,255,255,0.55)" }} />
    </AbsoluteFill>
  );
};

const useFade = (durationInFrames: number) => {
  const f = useCurrentFrame();
  return interpolate(
    f,
    [0, 14, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

// big centered statement scene
const Statement: React.FC<{
  dur: number;
  gray: string;
  em: string;
}> = ({ dur, gray, em }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useFade(dur);
  const rise = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 30 });
  const y = interpolate(rise, [0, 1], [40, 0]);
  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity, padding: 160 }}
    >
      <div
        style={{
          fontFamily: serif,
          fontWeight: 500,
          fontSize: 132,
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          color: INK,
          textAlign: "center",
          transform: `translateY(${y}px)`,
          maxWidth: 1500,
        }}
      >
        {gray} <span style={{ fontStyle: "italic" }}>{em}</span>
      </div>
    </AbsoluteFill>
  );
};

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "relative",
      borderRadius: 30,
      padding: 26,
      background:
        "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(168,85,247,0.14) 45%, rgba(217,119,6,0.16))",
      boxShadow: "0 50px 110px -50px rgba(60,60,110,0.55)",
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        border: `1px solid ${LINE}`,
        padding: 38,
        width: 720,
      }}
    >
      {children}
    </div>
  </div>
);

const FeatureScene: React.FC<{
  dur: number;
  gray: string;
  em: string;
  sub: string;
  children: React.ReactNode;
}> = ({ dur, gray, em, sub, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useFade(dur);
  const s = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 26 });
  const textX = interpolate(s, [0, 1], [-40, 0]);
  const panelS = interpolate(s, [0, 1], [0.94, 1]);
  return (
    <AbsoluteFill
      style={{
        opacity,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 130px",
      }}
    >
      <div style={{ width: 740, transform: `translateX(${textX}px)` }}>
        <div
          style={{
            fontFamily: serif,
            fontWeight: 500,
            fontSize: 96,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          {gray} <span style={{ fontStyle: "italic" }}>{em}</span>
        </div>
        <div style={{ fontFamily: serif, fontSize: 40, color: INK3, marginTop: 26 }}>
          {sub}
        </div>
      </div>
      <div style={{ transform: `scale(${panelS})` }}>{children}</div>
    </AbsoluteFill>
  );
};

const PanelHead: React.FC<{ title: string; sub: string }> = ({ title, sub }) => (
  <>
    <div style={{ fontFamily: serif, fontSize: 30 }}>{title}</div>
    <div
      style={{
        fontFamily: inter,
        fontSize: 17,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: INK4,
        marginTop: 6,
        marginBottom: 26,
      }}
    >
      {sub}
    </div>
  </>
);

const Row: React.FC<{
  idx: number;
  ok: boolean;
  label: string;
  tag: string;
}> = ({ idx, ok, label, tag }) => {
  const f = useCurrentFrame();
  const delay = 14 + idx * 12;
  const o = interpolate(f, [delay, delay + 14], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const y = interpolate(f, [delay, delay + 14], [14, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 12,
        fontFamily: inter,
        fontSize: 26,
        color: "#2a2a2e",
        opacity: o,
        transform: `translateY(${y}px)`,
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: ok ? GREEN : AMBER,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        {ok ? "✓" : "!"}
      </span>
      {label}
      <span
        style={{
          marginLeft: "auto",
          fontSize: 19,
          color: INK4,
          background: SOFT,
          padding: "5px 12px",
          borderRadius: 8,
        }}
      >
        {tag}
      </span>
    </div>
  );
};

const ContinuityMock: React.FC = () => (
  <Panel>
    <PanelHead title="Continuity check" sub="Across all 40 chapters" />
    <Row idx={0} ok label="Elena's eyes, green" tag="ch. 2" />
    <Row idx={1} ok={false} label="Marcus: teacher to lawyer" tag="ch. 7" />
    <Row idx={2} ok label="Timeline consistent" tag="Mar to Sept" />
    <Row idx={3} ok label="Locket set up before payoff" tag="ch. 9" />
  </Panel>
);

const AttentionMock: React.FC = () => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [10, 55], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dot = interpolate(f, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bar = (w: number, d: number) =>
    interpolate(f, [40 + d, 70 + d], [0, w], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const readers: [string, number, string][] = [
    ["Alex", 78, "7.8"],
    ["Victoria", 60, "6.0"],
    ["Olivia", 42, "4.2"],
  ];
  return (
    <Panel>
      <PanelHead title="Reader report" sub="Attention curve, stop-reading risk" />
      <div
        style={{
          position: "relative",
          border: `1px solid ${LINE}`,
          borderRadius: 14,
          height: 230,
          background: "linear-gradient(180deg, rgba(99,102,241,0.05), transparent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 24,
            top: 18,
            background: RED,
            color: "#fff",
            fontFamily: inter,
            fontSize: 18,
            fontWeight: 600,
            borderRadius: 99,
            padding: "5px 14px",
            opacity: dot,
          }}
        >
          stopped reading
        </div>
        <svg width="100%" height="230" viewBox="0 0 660 230" preserveAspectRatio="none">
          <path
            d="M20,80 C140,50 230,60 320,120 C420,190 520,205 640,210"
            fill="none"
            stroke={INDIGO}
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={draw}
          />
          <circle cx={470} cy={198} r={9} fill={RED} opacity={dot} />
        </svg>
      </div>
      <div style={{ marginTop: 26 }}>
        {readers.map(([nm, w, v], i) => (
          <div
            key={nm}
            style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: inter, fontSize: 24, marginBottom: 16 }}
          >
            <span style={{ width: 130, color: "#2a2a2e" }}>{nm}</span>
            <span style={{ flex: 1, height: 10, borderRadius: 99, background: SOFT, overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: `${bar(w, i * 8)}%`,
                  borderRadius: 99,
                  background: i === 2 ? AMBER : INDIGO,
                }}
              />
            </span>
            <span style={{ width: 50, textAlign: "right", color: INK4 }}>{v}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
};

const VNode: React.FC<{ idx: number; label: string; tag: string; tagColor: string; main?: boolean }> = ({
  idx,
  label,
  tag,
  tagColor,
  main,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 14 + idx * 12;
  const s = spring({ frame: f - delay, fps, config: { damping: 200 }, durationInFrames: 18 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "18px 0", position: "relative" }}>
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: `4px solid ${INDIGO}`,
          background: main ? INDIGO : "#fff",
          transform: `scale(${s})`,
          zIndex: 2,
        }}
      />
      <span style={{ fontFamily: inter, fontSize: 30, color: "#2a2a2e", opacity: s }}>{label}</span>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: inter,
          fontSize: 20,
          color: "#fff",
          background: tagColor,
          borderRadius: 99,
          padding: "6px 16px",
          opacity: s,
        }}
      >
        {tag}
      </span>
    </div>
  );
};

const VersionMock: React.FC = () => (
  <Panel>
    <PanelHead title="Chapter 12, versions" sub="Branch, snapshot, restore" />
    <div style={{ position: "relative", paddingLeft: 6 }}>
      <div style={{ position: "absolute", left: 17, top: 30, bottom: 30, width: 3, background: LINE }} />
      <VNode idx={0} label="Current draft" tag="main" tagColor={INDIGO} main />
      <VNode idx={1} label="Darker ending" tag="branch" tagColor={AMBER} />
      <VNode idx={2} label="First-person POV" tag="branch" tagColor={AMBER} />
      <VNode idx={3} label="v3, before the cut" tag="snapshot" tagColor="#9a9aa0" />
    </div>
  </Panel>
);

const CTA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = useFade(dur);
  const pop = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 26 });
  const y = interpolate(pop, [0, 1], [30, 0]);
  const pillO = interpolate(f, [24, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity }}>
      <div style={{ transform: `translateY(${y}px)`, textAlign: "center" }}>
        <div style={{ marginBottom: 10 }}>
          <Mark size={120} />
        </div>
        <div
          style={{
            fontFamily: serif,
            fontWeight: 500,
            fontSize: 132,
            letterSpacing: "-0.02em",
            color: INK,
          }}
        >
          Finish <span style={{ fontStyle: "italic" }}>your book.</span>
        </div>
        <div
          style={{
            opacity: pillO,
            marginTop: 50,
            display: "inline-block",
            fontFamily: inter,
            fontWeight: 500,
            fontSize: 34,
            background: INK,
            color: "#fff",
            padding: "22px 46px",
            borderRadius: 999,
          }}
        >
          Start free
        </div>
        <div style={{ opacity: pillO, fontFamily: serif, fontSize: 34, color: INK4, marginTop: 28 }}>
          app.slima.ai
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Slima: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#fff" }}>
      <Bg />
      <Sequence from={0} durationInFrames={90}>
        <Statement dur={90} gray="Every long book" em="gets stuck." />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Statement dur={90} gray="Your tools forget it by" em="chapter five." />
      </Sequence>
      <Sequence from={180} durationInFrames={160}>
        <FeatureScene
          dur={160}
          gray="It read"
          em="every chapter."
          sub="It catches the slip you would never spot."
        >
          <ContinuityMock />
        </FeatureScene>
      </Sequence>
      <Sequence from={340} durationInFrames={160}>
        <FeatureScene
          dur={160}
          gray="See where"
          em="readers stop."
          sub="An attention curve for every chapter."
        >
          <AttentionMock />
        </FeatureScene>
      </Sequence>
      <Sequence from={500} durationInFrames={120}>
        <FeatureScene
          dur={120}
          gray="Rewrite without"
          em="losing a word."
          sub="Branch it, snapshot it, restore anytime."
        >
          <VersionMock />
        </FeatureScene>
      </Sequence>
      <Sequence from={620} durationInFrames={100}>
        <CTA dur={100} />
      </Sequence>
    </AbsoluteFill>
  );
};
