import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { C } from "../lib/theme";
import { ProjectTree, Scatter, CoachChat, ContinuityCheck, BetaReaders, EditorPayoff } from "./Screens";
import { EndCard } from "./Kinetic";
import { Hook } from "./Hook";
import { Grain, Float, GlyphBurst } from "./Polish";
import { Sound } from "./Sound";

// scene durations (frames @30fps) -> total 1120 = 37.3s, timed slower to the VO
const T = {
  hook: 130, // VO 1 — "It always starts with one line." (typewriter)
  scatter: 165, // VO 2 — "Scattered across drafts, notes, a dozen open tabs."
  tree: 135, // VO 3 — "Slima brings all of it into one place." (real file tree)
  coach: 135, // VO 4
  cont: 135, // VO 5 (spans cont + beta)
  beta: 150,
  payoff: 120, // VO 6
  end: 150, // VO 7
};

const fadeFor = (frame: number, dur: number) =>
  interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// A floating product screen, centred, no caption (the VO carries the story).
const Beat: React.FC<{ dur: number; seed?: number; children: React.ReactNode }> = ({
  dur,
  seed = 0,
  children,
}) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, dur], [1, 1.03]);
  const grow = interpolate(frame, [0, 16], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "transparent", justifyContent: "center", alignItems: "center", opacity: fadeFor(frame, dur) }}>
      <Float seed={seed}>
        <div style={{ transform: `scale(${0.86 * push * grow})` }}>{children}</div>
      </Float>
    </AbsoluteFill>
  );
};

const Center: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ background: "transparent", justifyContent: "center", alignItems: "center", padding: 120, opacity: fadeFor(frame, dur) }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Full-frame scene (no single card) — used for the scattered fragments.
const FullScene: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "transparent", opacity: fadeFor(frame, dur) }}>
      {children}
    </AbsoluteFill>
  );
};

export const SlimaAd: React.FC = () => {
  let at = 0;
  const step = (d: number) => {
    const from = at;
    at += d;
    return from;
  };
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <Sequence from={step(T.hook)} durationInFrames={T.hook}>
        <Center dur={T.hook}>
          <Hook />
        </Center>
      </Sequence>

      <Sequence from={step(T.scatter)} durationInFrames={T.scatter}>
        <FullScene dur={T.scatter}>
          <Scatter />
        </FullScene>
      </Sequence>

      <Sequence from={step(T.tree)} durationInFrames={T.tree}>
        <Beat dur={T.tree} seed={4}>
          <ProjectTree />
        </Beat>
      </Sequence>

      <Sequence from={step(T.coach)} durationInFrames={T.coach}>
        <Beat dur={T.coach} seed={8}>
          <CoachChat />
        </Beat>
      </Sequence>

      <Sequence from={step(T.cont)} durationInFrames={T.cont}>
        <Beat dur={T.cont} seed={20}>
          <ContinuityCheck />
        </Beat>
      </Sequence>

      <Sequence from={step(T.beta)} durationInFrames={T.beta}>
        <Beat dur={T.beta} seed={34}>
          <BetaReaders />
        </Beat>
      </Sequence>

      <Sequence from={step(T.payoff)} durationInFrames={T.payoff}>
        <Beat dur={T.payoff} seed={12}>
          <EditorPayoff />
        </Beat>
      </Sequence>

      <Sequence from={step(T.end)} durationInFrames={T.end}>
        <Center dur={T.end}>
          <GlyphBurst start={4} />
          <EndCard />
        </Center>
      </Sequence>

      <Grain />
      <Sound />
    </AbsoluteFill>
  );
};
