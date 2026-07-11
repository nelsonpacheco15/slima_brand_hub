# Slima — Brand Source of Truth

The single, organized home for everything Slima: brand, voice, website, videos, social, decks, and collateral. If it's a finished Slima asset or a decision about how Slima looks and sounds, it lives here.

**Slima** is the AI writing environment that remembers your entire manuscript — a writing app for long-form work (novels, memoir, nonfiction, screenplays). Full-book memory, native version control, and AI beta readers that show where real readers lose interest.
Site: [slima.ai](https://slima.ai) · App: app.slima.ai

---

## How this repo is organized

```
slima_truth/
├── brand/            ← START HERE. Who Slima is + how it looks and sounds
│   ├── 01-brand-guidelines.md         Positioning, audience, 3 pillars, VOICE & TONE, visual system
│   ├── 02-product-marketing-context.md Product/marketing brief
│   ├── 03-ad-campaign-plan.md          Segments, channels, budget, launch creatives
│   ├── 04-feature-animations-spec.md   Feature motion specs
│   ├── 05-communication-direction.md   GO-FORWARD: illustration-only social (old style retired)
│   ├── logos/                          Vector marks (svg) + raster (png) — footer-only usage
│   └── source/                         Editable design source (Illustrator)
│
├── website/          The static marketing site (HTML/CSS/JS) — the site we built
│
├── videos/           Final produced videos
│   ├── presentation/  Tim & Chia — intro + onboarding (captioned, graded, mixed)
│   ├── logo-animation/ Slima logo sting
│   └── ad/            Beta-reader ad
│
├── social-media/
│   ├── ads/           Ad creatives: ads.html (the builder) + ad-images/ (exported PNGs, 4:5 / 1:1 / 9:16)
│   └── posts/         ILLUSTRATION posts only — editable .ai/.af + exported carousels (1x/)
│
├── remotion/         Remotion project sources (slima-ads, slima-remotion) — kept for future reference;
│                     node_modules + render output excluded (run `npm install` to build)
├── decks/            Pitch decks (education deck: PDF + editable .pen)
├── materials/        Print collateral (business cards, bookmark)
└── copy/             Ad copy, headlines, social handles & bio
```

**Communication is illustration-only from now on** — see `brand/05-communication-direction.md`. The old mixed style (AI-generated hero images, product-screenshot posts) is retired and removed from this repo.

## Where to find things fast

| I need… | Go to |
|---|---|
| The rules for how Slima writes and sounds | `brand/01-brand-guidelines.md` → *Voice & tone* + the *DON'T* sections |
| Colors, type, logo usage | `brand/01-brand-guidelines.md` → *Visual system* |
| Logo files | `brand/logos/` |
| The website | `website/` (open `index.html`) |
| The finished presentation videos | `videos/presentation/` |
| Ad images to post | `social-media/ads/ad-images/` |
| To build a new ad | `social-media/ads/ads.html` (see brand skill / README inside) |
| Approved ad copy + our social @handle | `copy/ad-copy-and-social.md` |

## Non-negotiable brand rules (full list in `brand/01-brand-guidelines.md`)
- **Never lead with "AI."** Slima is a writing studio; the intelligence is implied. Say what the writer *gets*.
- **No em-dashes** in customer-facing copy. Use periods and commas.
- **No "forgets by chapter N"** trope, no chapter numbers in headlines.
- **Plain language always.** If a stranger wouldn't get it in one read, rewrite it.
- Logo in the **footer only**, small. White background for static ads. Generous whitespace.

---

*Not included here on purpose:* raw camera footage (20 GB+), `node_modules`, the Rails backend, and any working temp files. This repo is the curated finals only.
