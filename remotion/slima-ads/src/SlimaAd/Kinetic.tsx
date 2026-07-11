import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { C } from "../lib/theme";
import { serif, sans } from "../lib/fonts";

const rise = (frame: number, fps: number, delay: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return { opacity: s, transform: `translateY(${interpolate(s, [0, 1], [26, 0])}px)` };
};

// Two staggered lines for the opening ("Some plan every beat. / Some just begin.")
export const IntroLines: React.FC<{ a: string; b: string; emA?: string; emB?: string }> = ({
  a,
  b,
  emA,
  emB,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const base: React.CSSProperties = {
    fontFamily: serif,
    fontWeight: 400,
    fontSize: 96,
    lineHeight: 1.08,
    color: C.ink,
    textAlign: "center",
    margin: 0,
  };
  return (
    <div style={{ maxWidth: 1400 }}>
      <p style={{ ...base, ...rise(frame, fps, 4) }}>
        {a} {emA && <em style={{ fontStyle: "italic" }}>{emA}</em>}
      </p>
      <p style={{ ...base, marginTop: 14, ...rise(frame, fps, 26) }}>
        {b} {emB && <em style={{ fontStyle: "italic" }}>{emB}</em>}
      </p>
    </div>
  );
};

// A single big line with one italic phrase.
export const BigLine: React.FC<{ pre: string; em: string }> = ({ pre, em }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <p
      style={{
        fontFamily: serif,
        fontWeight: 400,
        fontSize: 110,
        lineHeight: 1.05,
        color: C.ink,
        textAlign: "center",
        maxWidth: 1500,
        margin: 0,
        ...rise(frame, fps, 4),
      }}
    >
      {pre} <em style={{ fontStyle: "italic" }}>{em}</em>
    </p>
  );
};

// Small caption that sits under a screen.
export const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        fontFamily: serif,
        fontStyle: "italic",
        fontSize: 40,
        color: C.ink3,
        textAlign: "center",
        marginTop: 44,
        ...rise(frame, fps, 16),
      }}
    >
      {children}
    </div>
  );
};

// The explaining line under each product screen (the VO, made visible).
export const VOLine: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        fontFamily: serif,
        fontWeight: 400,
        fontSize: 58,
        lineHeight: 1.12,
        color: C.ink,
        textAlign: "center",
        maxWidth: 1300,
        ...rise(frame, fps, 6),
      }}
    >
      {children}
    </div>
  );
};

// Final brand card: logo lockup + tagline + url.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: frame - 4, fps, config: { damping: 200 } });
  const tag = rise(frame, fps, 20);
  const url = rise(frame, fps, 30);
  return (
    <div style={{ textAlign: "center" }}>
      <Img
        src={staticFile("logo-slima.png")}
        style={{
          height: 150,
          opacity: logo,
          transform: `scale(${interpolate(logo, [0, 1], [0.92, 1])})`,
        }}
      />
      <p
        style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 64,
          color: C.ink,
          margin: "44px 0 0",
          ...tag,
        }}
      >
        Write it your way.
      </p>
      <p
        style={{
          fontFamily: sans,
          fontSize: 30,
          color: C.ink4,
          margin: "26px 0 0",
          letterSpacing: ".02em",
          ...url,
        }}
      >
        app.slima.ai
      </p>
    </div>
  );
};
