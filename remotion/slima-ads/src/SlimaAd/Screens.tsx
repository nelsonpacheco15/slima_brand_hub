import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C } from "../lib/theme";
import { serif, sans } from "../lib/fonts";

// ---- shared bits -------------------------------------------------------------

const Card: React.FC<{ children: React.ReactNode; width?: number }> = ({
  children,
  width = 1180,
}) => (
  <div
    style={{
      width,
      background: C.soft,
      border: `1px solid ${C.line}`,
      borderRadius: 30,
      padding: 52,
      boxShadow: "0 40px 90px -50px rgba(20,20,50,.28)",
    }}
  >
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: sans,
      fontSize: 19,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: C.ink4,
      marginBottom: 26,
    }}
  >
    {children}
  </div>
);

// reveal a row by index, staggered
const useRowReveal = (index: number, startAt = 6, stagger = 7) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - (startAt + index * stagger),
    fps,
    config: { damping: 200 },
  });
  return {
    opacity: s,
    transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
  };
};

const tile: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${C.line}`,
  borderRadius: 16,
  padding: "20px 26px",
  display: "flex",
  alignItems: "center",
  gap: 18,
  fontFamily: sans,
  fontSize: 28,
  color: C.ink2,
};

const dot = (bg: string): React.CSSProperties => ({
  width: 38,
  height: 38,
  borderRadius: "50%",
  background: bg,
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  flexShrink: 0,
});

const chip: React.CSSProperties = {
  marginLeft: "auto",
  fontFamily: sans,
  fontSize: 20,
  color: C.ink4,
  background: C.soft,
  padding: "6px 14px",
  borderRadius: 9,
};

// ---- 1. Project tree (a whole book, in one place) ----------------------------

export const ProjectTree: React.FC = () => {
  const rows = [
    { t: "▾  Chapters", on: true, ind: false },
    { t: "Prologue", ind: true },
    { t: "1. The Contract", ind: true },
    { t: "2. Rooftops", ind: true },
    { t: "›  People", ind: false },
    { t: "›  Timeline", ind: false },
    { t: "›  Outline & notes", ind: false },
  ];
  const head = useRowReveal(0, 4, 0);
  return (
    <Card width={900}>
      <div
        style={{
          fontFamily: serif,
          fontSize: 40,
          color: C.ink,
          marginBottom: 30,
          ...head,
        }}
      >
        ✳&nbsp;&nbsp;The Assassin
      </div>
      {rows.map((r, i) => {
        const st = useRowReveal(i, 12, 6);
        return (
          <div
            key={i}
            style={{
              fontFamily: sans,
              fontSize: 30,
              color: r.on ? C.ink : r.ind ? C.ink3 : C.ink2,
              padding: "14px 0",
              paddingLeft: r.ind ? 36 : 0,
              ...st,
            }}
          >
            {r.t}
          </div>
        );
      })}
    </Card>
  );
};

// ---- 1b. Scatter: the same writing, spread across drafts, notes, tabs --------
// Plays under "Scattered across drafts, notes, a dozen open tabs." — literal
// fragments of one book living in too many places, tilted and overlapping.

const Frag: React.FC<{
  i: number;
  x: number;
  y: number;
  r: number;
  w: number;
  children: React.ReactNode;
  bg?: string;
  border?: string;
}> = ({ i, x, y, r, w, children, bg = "#fff", border = C.line }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - (10 + i * 9), fps, config: { damping: 18, mass: 0.9, stiffness: 90 } });
  const sc = interpolate(s, [0, 1], [0.82, 1]);
  const rot = interpolate(s, [0, 1], [r + (r > 0 ? 6 : -6), r]);
  const drift = Math.sin((frame + i * 20) / 36) * 6;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 18,
        padding: "20px 24px",
        boxShadow: "0 30px 70px -42px rgba(20,20,50,.4)",
        transform: `translate(-50%,-50%) translate(${x}px, ${y + drift}px) rotate(${rot}deg) scale(${sc})`,
        opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      {children}
    </div>
  );
};

const FileBadge: React.FC<{ color: string; name: string }> = ({ color, name }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
    <span style={{ width: 18, height: 22, borderRadius: 4, background: color, flexShrink: 0 }} />
    <span style={{ fontFamily: sans, fontSize: 19, color: C.ink4, letterSpacing: ".01em" }}>{name}</span>
  </div>
);

export const Scatter: React.FC = () => {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* a manuscript draft */}
      <Frag i={0} x={-540} y={-200} r={-7} w={420}>
        <FileBadge color={C.indigo} name="draft_v7_FINAL.docx" />
        <div style={{ fontFamily: serif, fontSize: 25, lineHeight: 1.45, color: C.ink3 }}>
          He closed the door behind him. The city, for once, was quiet&hellip;
        </div>
      </Frag>

      {/* a sticky note */}
      <Frag i={1} x={520} y={-250} r={6} w={300} bg="#f4e6a8" border="#e6d27f">
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 27, lineHeight: 1.4, color: "#5a4a17" }}>
          Elena&rsquo;s locket &mdash; plant it in Ch.&nbsp;1!
        </div>
      </Frag>

      {/* a dozen open browser tabs */}
      <Frag i={2} x={-70} y={-330} r={-2} w={560} border={C.line}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Research: 1840s", "Thesaurus", "Map of Vienna", "Untitled"].map((t, k) => (
            <span
              key={k}
              style={{
                fontFamily: sans,
                fontSize: 17,
                color: k === 0 ? C.ink2 : C.ink4,
                background: k === 0 ? "#fff" : C.soft,
                border: `1px solid ${C.line}`,
                borderRadius: "8px 8px 0 0",
                padding: "10px 14px",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
          <span style={{ fontFamily: sans, fontSize: 17, color: C.ink4, paddingLeft: 4 }}>+9</span>
        </div>
      </Frag>

      {/* a notes-app snippet */}
      <Frag i={3} x={500} y={150} r={-5} w={360}>
        <FileBadge color={C.green} name="Notes" />
        <div style={{ fontFamily: sans, fontSize: 24, lineHeight: 1.4, color: C.ink2 }}>
          Rooftop chase &mdash; should it be raining? check Ch.&nbsp;2 weather
        </div>
      </Frag>

      {/* a scribbled index card */}
      <Frag i={4} x={-520} y={210} r={8} w={330} bg={C.paper}>
        <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 28, lineHeight: 1.45, color: C.ink2 }}>
          Marcus &mdash; teacher? or&nbsp;lawyer??
        </div>
      </Frag>

      {/* another draft file */}
      <Frag i={5} x={120} y={250} r={4} w={400}>
        <FileBadge color={C.amber} name="chapter_2_rewrite.md" />
        <div style={{ fontFamily: serif, fontSize: 25, lineHeight: 1.45, color: C.ink3 }}>
          They met again at dusk, neither of them willing to speak first.
        </div>
      </Frag>
    </div>
  );
};

// ---- 2. The coach (it has read every word) -----------------------------------

export const CoachChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ask = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const ans = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  return (
    <Card width={1000}>
      <Label>Writing coach · has read every word</Label>
      <div
        style={{
          alignSelf: "flex-end",
          marginLeft: "auto",
          maxWidth: "78%",
          background: C.ink,
          color: "#fff",
          borderRadius: "26px 26px 10px 26px",
          padding: "22px 30px",
          fontFamily: sans,
          fontSize: 30,
          opacity: ask,
          transform: `translateY(${interpolate(ask, [0, 1], [14, 0])}px)`,
        }}
      >
        Is Elena&rsquo;s vow consistent across the book?
      </div>
      <div
        style={{
          maxWidth: "88%",
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: "26px 26px 26px 10px",
          padding: "22px 30px",
          marginTop: 22,
          fontFamily: sans,
          fontSize: 30,
          lineHeight: 1.4,
          color: C.ink2,
          opacity: ans,
          transform: `translateY(${interpolate(ans, [0, 1], [14, 0])}px)`,
        }}
      >
        Mostly. Her vow early on reads softer than her betrayal later. Want the
        lines?
      </div>
    </Card>
  );
};

// ---- 3. Continuity (catches what changed) ------------------------------------

export const ContinuityCheck: React.FC = () => {
  const rows = [
    { ok: true, t: "Elena's locket, planted early", chip: "pays off later" },
    { ok: false, t: "Marcus: teacher, then lawyer", chip: "look again" },
    { ok: true, t: "Timeline consistent", chip: "March to September" },
  ];
  return (
    <Card>
      <Label>Continuity · checked across the whole book</Label>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {rows.map((r, i) => {
          const st = useRowReveal(i, 8, 9);
          return (
            <div key={i} style={{ ...tile, ...st }}>
              <span style={dot(r.ok ? C.green : C.amber)}>{r.ok ? "✓" : "!"}</span>
              {r.t}
              <span style={chip}>{r.chip}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// ---- 4. Beta readers (an honest read) ----------------------------------------

const Stat: React.FC<{ l: string; v: string; warn?: boolean; star?: boolean; st: React.CSSProperties }> = ({
  l,
  v,
  warn,
  star,
  st,
}) => (
  <div
    style={{
      background: "#fff",
      border: `1px solid ${C.line}`,
      borderRadius: 18,
      padding: "26px 30px",
      ...st,
    }}
  >
    <div style={{ fontFamily: sans, fontSize: 22, color: C.ink4 }}>{l}</div>
    <div
      style={{
        fontFamily: serif,
        fontSize: 48,
        marginTop: 8,
        color: warn || star ? C.amber : C.ink,
      }}
    >
      {star ? "★ " : ""}
      {v}
    </div>
  </div>
);

export const BetaReaders: React.FC = () => {
  const frame = useCurrentFrame();
  const a = useRowReveal(0, 6, 8);
  const b = useRowReveal(1, 6, 8);
  const c2 = useRowReveal(2, 6, 8);
  const d = useRowReveal(3, 6, 8);
  // attention curve draw-on
  const draw = interpolate(frame, [20, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const path =
    "M10,40 C70,20 110,90 170,40 C230,0 250,150 320,150 C380,150 410,40 470,40 C500,40 510,160 530,160 C560,160 590,40 640,40 C690,40 720,150 750,90";
  return (
    <Card>
      <Label>Beta readers · eight tastes, one honest read</Label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 24,
        }}
      >
        <Stat l="Continue reading" v="5.7 / 10" warn st={a} />
        <Stat l="Recommendation" v="4.7 / 10" warn st={b} />
        <Stat l="Stop-reading risk" v="Medium" warn st={c2} />
        <Stat l="Reader rating" v="3.2" star st={d} />
      </div>
      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.line}`,
          borderRadius: 18,
          padding: "28px 30px",
          opacity: interpolate(frame, [16, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div style={{ fontFamily: serif, fontSize: 26, marginBottom: 6 }}>
          Attention curve
        </div>
        <svg viewBox="0 0 760 190" style={{ width: "100%", display: "block" }}>
          <rect x="470" y="0" width="60" height="190" fill="#f7eccb" />
          <path
            d={path}
            fill="none"
            stroke={C.indigo}
            strokeWidth={6}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={draw}
          />
          <circle cx="530" cy="160" r="9" fill={C.red} opacity={1 - draw} />
        </svg>
      </div>
    </Card>
  );
};

// ---- 5. The payoff: a clean editor, the last line typed ----------------------

export const EditorPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = [
    "He closed the door behind him.",
    "For the first time in years, the city was quiet.",
    "He had done the thing he set out to do.",
  ];
  const end = spring({ frame: frame - 44, fps, config: { damping: 200 } });
  const cursorOn = Math.floor(frame / 14) % 2 === 0;
  return (
    <Card width={1040}>
      <Label>Writing Studio · The Assassin</Label>
      {lines.map((t, i) => {
        const st = useRowReveal(i, 6, 7);
        return (
          <div
            key={i}
            style={{
              fontFamily: serif,
              fontSize: 34,
              lineHeight: 1.5,
              color: C.ink3,
              marginBottom: 14,
              ...st,
            }}
          >
            {t}
          </div>
        );
      })}
      <div
        style={{
          fontFamily: serif,
          fontSize: 34,
          color: C.ink,
          marginTop: 10,
          opacity: end,
          transform: `translateY(${interpolate(end, [0, 1], [12, 0])}px)`,
        }}
      >
        The End.
        <span
          style={{
            display: "inline-block",
            width: 14,
            height: 30,
            marginLeft: 6,
            background: C.ink,
            verticalAlign: "-4px",
            opacity: cursorOn ? 1 : 0,
          }}
        />
      </div>
    </Card>
  );
};
