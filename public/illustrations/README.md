# Illustration brief

What ships today:

- `../logo.png` — the **official mzPeak wordmark** (blue peak mark + "mzPeak"), from the project deck →
  used as the nav logo + social/OG image.
- `../mark.png` — the peak mark alone (square, transparent) → favicon + brand accent.
- `format-diagram.svg` — hand-drawn "ZIP-of-Parquet + index" archive layout (home hero + About page);
  a placeholder to refine per item 1 below.

These are intentionally simple placeholders. Suggested **real** illustrations to commission/produce
(keep them light, flat, 2-color-accent to match the theme: blue `#1558d6`, green `#1a7f37`,
purple `#8250df`):

1. **Hero / format concept** — refine `format-diagram.svg`: the ZIP container with Parquet column
   stacks, the `metadata` block, the `index.json`, and optional `Other` members (image, SDRF). The
   single most important visual.
2. **mzML → mzPeak size shrink** — a before/after bar or a funnel showing ~0.1–0.6× size, lossless.
   *(Real data exists: a per-dataset compression benchmark — render it as a chart.)*
3. **Cloud-native random access** — a multi-GB file in object storage with one highlighted byte-range
   ("one spectrum") streaming to a browser. Sells the HTTP-range story.
4. **Ecosystem flow** — RAW / mzML → converter → `mzPeak` → {viewer, validator, analysis}. One row of
   labeled nodes.
5. **Imaging extension** — an RGB MS-imaging overlay (e.g. the mouse urinary-bladder lipid image:
   urothelium / lamina propria / muscle in three colors) rendered in mzPeakIV. From a public dataset.
6. **Sample metadata** — SDRF/ISA table → embedded as an `Other` member inside the archive, with the
   sample↔run binding drawn as an arrow.
7. **Screenshot** — mzPeak Explorer / mzPeakIV open on a real file (for the Examples page).

Format: SVG preferred for diagrams (crisp, tiny); PNG/screenshots for viewer captures. Avoid reproducing
any copyrighted figures — regenerate imaging visuals from the open datasets.
