import React from "react";
import { Audio, Sequence, staticFile, interpolate } from "remotion";

// Scene starts (frames @30fps): hook0 scatter130 tree295 coach430 cont565 beta700 payoff850 end970 (total 1120)
// Voiceover (Brooks), one clip per line, placed slower with room to breathe.
const vo = [
  { f: 25, n: "1" }, // It always starts with one line.       (types in)
  { f: 148, n: "2" }, // Scattered across drafts, notes, a dozen open tabs.
  { f: 309, n: "3" }, // Slima brings all of it into one place.
  { f: 444, n: "4" }, // A writing partner that has read every word.
  { f: 579, n: "5" }, // It remembers / notices what changed / where a reader gets lost.
  { f: 866, n: "6" }, // So you finish what you set out to write.
  { f: 992, n: "7" }, // Slima. Write it your way.
];

const whoosh = [
  { f: 128, rate: 0.92, vol: 0.4 }, // -> scatter
  { f: 293, rate: 1.08, vol: 0.34 }, // -> tree
  { f: 428, rate: 0.98, vol: 0.38 }, // -> coach
  { f: 563, rate: 1.14, vol: 0.32 }, // -> continuity
  { f: 698, rate: 0.9, vol: 0.42 }, // -> beta
  { f: 848, rate: 1.04, vol: 0.36 }, // -> payoff
  { f: 968, rate: 0.96, vol: 0.36 }, // -> end
];
const pop = [
  { f: 30, rate: 1.0, vol: 0.2 }, // typing taps
  { f: 46, rate: 1.16, vol: 0.18 },
  { f: 150, rate: 0.9, vol: 0.2 }, // scatter fragments
  { f: 168, rate: 1.1, vol: 0.18 },
  { f: 186, rate: 0.96, vol: 0.2 },
  { f: 204, rate: 1.2, vol: 0.18 },
  { f: 222, rate: 0.88, vol: 0.2 },
  { f: 240, rate: 1.14, vol: 0.18 },
  { f: 309, rate: 0.9, vol: 0.24 }, // tree rows
  { f: 327, rate: 1.12, vol: 0.2 },
  { f: 345, rate: 1.2, vol: 0.18 },
  { f: 444, rate: 1.0, vol: 0.22 }, // coach
  { f: 462, rate: 1.2, vol: 0.2 },
  { f: 579, rate: 0.94, vol: 0.24 }, // continuity
  { f: 597, rate: 1.1, vol: 0.2 },
  { f: 715, rate: 1.0, vol: 0.22 }, // beta rows
  { f: 733, rate: 0.9, vol: 0.24 },
  { f: 751, rate: 1.14, vol: 0.2 },
];
const confirm = [
  { f: 645, rate: 1.0, vol: 0.28 }, // continuity pass
  { f: 785, rate: 0.92, vol: 0.26 }, // beta score
  { f: 995, rate: 1.06, vol: 0.3 }, // end logo
];

export const Sound: React.FC = () => {
  return (
    <>
      {/* piano bed, ducked low under the VO */}
      <Audio
        src={staticFile("music/inspiring-piano-leberch.mp3")}
        volume={(f) =>
          interpolate(f, [0, 24, 1075, 1120], [0, 0.17, 0.17, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {/* voiceover */}
      {vo.map((v) => (
        <Sequence key={`vo${v.n}`} from={v.f}>
          <Audio src={staticFile(`vo/${v.n}.mp3`)} volume={1} />
        </Sequence>
      ))}

      {/* opening riser */}
      <Sequence from={0} durationInFrames={90}>
        <Audio src={staticFile("sfx/riser.mp3")} volume={0.5} />
      </Sequence>

      {whoosh.map((w, i) => (
        <Sequence key={`w${i}`} from={w.f} durationInFrames={24}>
          <Audio src={staticFile("sfx/whoosh.mp3")} volume={w.vol} playbackRate={w.rate} />
        </Sequence>
      ))}

      {pop.map((p, i) => (
        <Sequence key={`p${i}`} from={p.f} durationInFrames={12}>
          <Audio src={staticFile("sfx/pop.mp3")} volume={p.vol} playbackRate={p.rate} />
        </Sequence>
      ))}

      {confirm.map((c, i) => (
        <Sequence key={`c${i}`} from={c.f} durationInFrames={34}>
          <Audio src={staticFile("sfx/confirm.mp3")} volume={c.vol} playbackRate={c.rate} />
        </Sequence>
      ))}
    </>
  );
};
