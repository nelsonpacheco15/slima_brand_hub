import { Composition } from "remotion";
import { SlimaAd } from "./SlimaAd";
import { BetaReaderAd } from "./BetaReaderAd";
import { SlimaLogo } from "./SlimaLogo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Logo sting — 16:9 */}
      <Composition
        id="SlimaLogo"
        component={SlimaLogo}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Logo sting — square */}
      <Composition
        id="SlimaLogo-1x1"
        component={SlimaLogo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* Master 16:9 */}
      <Composition
        id="SlimaAd"
        component={SlimaAd}
        durationInFrames={1120}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* Vertical 9:16 for Reels / Stories */}
      <Composition
        id="SlimaAd-9x16"
        component={SlimaAd}
        durationInFrames={1120}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Square 1:1 for feed */}
      <Composition
        id="SlimaAd-1x1"
        component={SlimaAd}
        durationInFrames={1120}
        fps={30}
        width={1080}
        height={1080}
      />
      {/* Beta Reader test ad — vertical 9:16 */}
      <Composition
        id="BetaReaderAd-9x16"
        component={BetaReaderAd}
        durationInFrames={305}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
