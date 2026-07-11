import React from "react";
import { GlyphBurst, Typewriter } from "./Polish";

// Opening: a blinking cursor on an empty line, then a first line types itself in
// while the editorial glyphs explode softly outward behind it. No title card.
export const Hook: React.FC = () => {
  return (
    <>
      <GlyphBurst start={18} />
      <Typewriter text="It always starts with one line." start={16} cps={1.6} />
    </>
  );
};
