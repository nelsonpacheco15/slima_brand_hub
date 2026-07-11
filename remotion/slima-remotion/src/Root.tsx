import { Composition } from "remotion";
import { Slima } from "./Slima";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Slima"
      component={Slima}
      durationInFrames={720}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
