# Base44-style sunset ad

Aspirational "photo + one line" ad, modeled on Base44's sunset creative.

- `sunset-ad.html` / `sunset-ad-1200x628.png` — static version (gradient sky), Reddit landscape.
- `overlay-1080x1350.html` / `overlay-1080x1350.png` — transparent text overlay (scrim baked in).
- `sunset-c.mp4` — source footage (Pexels, free for commercial use, no attribution required). "Time-lapse video of sunset", pexels.com/video/time-lapse-video-of-sunset-1215939.
- `sunset-video-ad-1080x1350.mp4` — FINAL video ad. 8s, 1080x1350, 30fps, silent.
- `sunset-video-ad-still.png` — a still frame for preview / static fallback.

Copy: "Don't let your book stay stuck in your notes app. Write it in Slima and finish it this time."
Angle: finishing. Obeys brand rules (no em dash, no "manuscript", does not lead with AI). Link slima.ai.

Re-render: overlay from HTML via headless Chrome (2x, transparent bg), then ffmpeg crop=ih*4/5:ih,scale=1080:1350 + overlay + fade.
