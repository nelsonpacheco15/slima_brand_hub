# Feature Animations — Rive / Lottie build spec

Goal: three crisp, perfectly-looping UI motion graphics for the homepage feature rows. Each **recreates the real Slima (light-mode) UI** for one feature — not abstract shapes. They sit in a square panel (`.fpanel > .fscreen.sq`) on a soft glass-gradient background, with lots of white space.

## Shared specs
- **Artboard:** 1000 × 1000 (1:1, square). Responsive scale to container.
- **Background:** white (#ffffff) — never black. Transparent also OK (panel is white behind).
- **Type:** headings IBM Plex Serif 500; UI text Inter 400/500.
- **Palette (brand tokens):** ink #0a0a0a · secondary #5a5a60 · hairline #ECECEA · indigo #6366f1 · green #4ea87a · amber #d97706 · red #d0463a · soft bg #FAF9F6.
- **Motion feel:** calm, smooth, premium. Ease-in-out. Nothing frenetic. Generous padding (~7% inset).
- **Loop:** seamless (first frame == last frame). 6–7s each.
- **Export:** Rive → `.riv` (embed `@rive-app/canvas`, autoplay+loop). Lottie → JSON/dotLottie (embed `lottie-web` / `@dotlottie/player-component`, autoplay loop).

---

## 1. Full-book memory  →  "Continuity check"
Recreates the AI continuity-check panel.
- **Static frame:** card header "Continuity check · Chapter 40"; below it 4 result rows, each = round icon + label + small chapter chip on the right.
  1. ✓ (green) "Elena's eyes — green" · chip "ch. 2"
  2. ! (amber) "Marcus: teacher → lawyer" · chip "ch. 7"  ← the caught inconsistency
  3. ✓ (green) "Timeline consistent" · chip "Mar–Sept"
  4. ✓ (green) "Locket set up before payoff" · chip "ch. 9"
- **Timeline (6s):**
  - 0.0–0.8s header fades/slides in.
  - 0.8–3.2s rows reveal one-by-one (fade + 8px slide up); each icon pops (scale 0→1, slight overshoot).
  - Row 2 (the flag) gets a soft amber background pulse, twice.
  - Continuous: a faint indigo "scan" band sweeps top→bottom behind the rows (4–5s cycle) = the AI re-reading.
  - 5.4–6s gentle settle → loop.

## 2. AI Beta Readers  →  "Attention curve + reader scores"
Recreates the report's attention curve + reader feedback.
- **Static frame:** small label "Reader report"; an attention-curve chart (thin indigo line, gentle rise then dip); a red dot + "DNF risk" chip at the dip; below, 3 reader rows: name + thin fill bar + score.
  - Alex — bar 78% — 7.8
  - Victoria — bar 60% — 6.0
  - Olivia — bar 42% (amber) — 4.2
- **Timeline (7s):**
  - 0.0–2.4s curve draws left→right (path trim/stroke-dashoffset); dips ~70% across.
  - 2.2–2.8s red DNF dot scales in at the dip; "DNF risk" chip fades in and softly pulses.
  - 2.6–5.0s the 3 reader rows fade in; bars fill to width; scores count is optional.
  - Continuous: a soft dot travels along the curve (6s linear loop).
  - 6.4–7s settle → loop.

## 3. Native version control  →  "Branch & snapshot"
Recreates the version graph.
- **Static frame:** a git-style graph. Vertical "main" spine with nodes; two curved branches to labeled nodes; one snapshot node.
  - ● Current draft — tag "main" (indigo)
  - ○ Darker ending — tag "branch" (amber)  (curves off main)
  - ○ First-person POV — tag "branch" (amber)  (curves off main)
  - ○ v3 — before the cut — tag "snapshot" (grey)
- **Timeline (6s):**
  - 0.0–1.4s main spine draws downward.
  - 1.2–3.6s nodes pop in sequence; the two branch curves draw out sideways as their nodes appear.
  - Continuous: a soft indigo pulse travels down the spine (4.5s loop).
  - 5.4–6s settle → loop.

---

## Integration notes
- Drop the exported file's player into the existing slot:
  `<div class="fpanel"><div class="fscreen sq"><!-- rive/lottie player here --></div></div>`
- Keep each animation's own background white/transparent; the panel provides the glass-gradient frame.
- One file per feature: `feature-memory`, `feature-beta`, `feature-version`.

## Fast path (no designer needed)
The same result can be built as hand-authored **animated SVG + CSS** directly in the page — vector, seamless loop, ~a few KB, accurate to the real UI. Recommended to ship now; swap to `.riv`/Lottie later if desired with zero layout change (same slot).
