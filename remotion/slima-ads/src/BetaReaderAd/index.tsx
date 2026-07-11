import React from "react";
import {
  AbsoluteFill,
  Sequence,
  OffthreadVideo,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { C } from "../lib/theme";
import { serif, sans } from "../lib/fonts";
import { BetaReaders } from "../SlimaAd/Screens";
import { Grain, Float } from "../SlimaAd/Polish";

const fadeFor = (frame: number, dur: number) =>
  interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Shot 1 — the reader clip + the hook
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 22, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile("video/reader.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.10) 40%, rgba(0,0,0,.60))",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: 92 }}>
        <div
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: 100,
            lineHeight: 1.06,
            color: "#fff",
            maxWidth: 900,
            opacity: t,
            transform: `translateY(${interpolate(t, [0, 1], [22, 0])}px)`,
            textShadow: "0 2px 40px rgba(0,0,0,.45)",
          }}
        >
          Your friends won&rsquo;t tell you the <em style={{ fontStyle: "italic" }}>truth.</em>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Shot 2 — the product: an honest read
const Product: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = interpolate(frame, [0, 16], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cap = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ background: C.cream, justifyContent: "center", alignItems: "center", opacity: fadeFor(frame, dur) }}>
      <div style={{ transform: "translateY(-110px)" }}>
        <Float>
          <div style={{ transform: `scale(${0.74 * grow})` }}>
            <BetaReaders />
          </div>
        </Float>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 150,
          fontFamily: serif,
          fontSize: 70,
          color: C.ink,
          textAlign: "center",
          opacity: cap,
          transform: `translateY(${interpolate(cap, [0, 1], [16, 0])}px)`,
        }}
      >
        Slima gives you an honest read.
      </div>
    </AbsoluteFill>
  );
};

// Shot 3 — end card / CTA
const End: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ background: C.cream, justifyContent: "center", alignItems: "center", opacity: fadeFor(frame, dur) }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 34,
          opacity: t,
          transform: `translateY(${interpolate(t, [0, 1], [18, 0])}px)`,
        }}
      >
        <Img src={staticFile("logo-slima.png")} style={{ width: 300 }} />
        <div style={{ fontFamily: serif, fontSize: 72, color: C.ink }}>Get Slima free.</div>
        <div style={{ fontFamily: sans, fontSize: 36, color: C.ink4, letterSpacing: ".02em" }}>app.slima.ai</div>
      </div>
    </AbsoluteFill>
  );
};

export const BetaReaderAd: React.FC = () => {
  const T = { hook: 95, product: 120, end: 90 }; // 305 frames ~ 10.2s @30
  let at = 0;
  const step = (d: number) => {
    const from = at;
    at += d;
    return from;
  };
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={step(T.hook)} durationInFrames={T.hook}>
        <Hook />
      </Sequence>
      <Sequence from={step(T.product)} durationInFrames={T.product}>
        <Product dur={T.product} />
      </Sequence>
      <Sequence from={step(T.end)} durationInFrames={T.end}>
        <End dur={T.end} />
      </Sequence>
      <Grain />
    </AbsoluteFill>
  );
};
