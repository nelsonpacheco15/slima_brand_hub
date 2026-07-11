import { loadFont as loadSerif } from "@remotion/google-fonts/IBMPlexSerif";
import { loadFont as loadSans } from "@remotion/google-fonts/IBMPlexSans";

// IBM Plex Serif (headlines, regular weight + italic) and IBM Plex Sans (UI/labels).
export const serif = loadSerif().fontFamily;
export const sans = loadSans().fontFamily;
