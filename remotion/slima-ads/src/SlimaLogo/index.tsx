import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Spotify-style build: the spark icon spins in (centered), then the whole
// lockup settles left as the "Slima" letters draw on. White on pure black.
export const SlimaLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const W = 392; // lockup render width (smaller = reads less heavy)
  const shift = W * 0.36; // px to keep the icon screen-centered during the build

  // ICON — spin + scale build
  const iSpring = spring({ frame, fps, config: { damping: 12, mass: 0.8, stiffness: 120 } });
  const iconScale = interpolate(iSpring, [0, 1], [0.25, 1]);
  const iconRot = interpolate(frame, [0, 28], [-200, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const iconOp = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // GROUP — icon-centered -> lockup-centered
  const settle = interpolate(frame, [30, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const groupX = interpolate(settle, [0, 1], [shift, 0]);

  // WORD — draw on left->right after the icon
  const wordR = interpolate(frame, [32, 60], [66, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const wordOp = interpolate(frame, [32, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breathe = frame > 64 ? 1 + 0.006 * Math.sin(((frame - 64) / fps) * 1.4) : 1;

  const icon = staticFile("slima-icon.svg");
  const word = staticFile("slima-word.svg");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: W, transform: `translateX(${groupX}px) scale(${breathe})` }}>
        {/* wordmark, revealed left-to-right */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${wordR}% 0 0)`, opacity: wordOp }}>
          <Img src={word} style={{ width: W, display: "block" }} />
        </div>
        {/* icon, spins in place around its own center */}
        <div
          style={{
            position: "relative",
            opacity: iconOp,
            transform: `rotate(${iconRot}deg) scale(${iconScale})`,
            transformOrigin: "14% 49%",
          }}
        >
          <Img src={icon} style={{ width: W, display: "block" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
