<script setup>
import { withBase } from 'vitepress'
</script>

# What is mzPeak?

**mzPeak** is a next-generation open file format for mass spectrometry data — designed as the
successor to [mzML](https://www.psidev.info/mzML). It keeps everything mzML can describe, but stores it
in a layout built for today's data volumes and cloud workflows.

## The idea in one line

> An mzPeak file is a **ZIP archive of [Apache Parquet](https://parquet.apache.org/) tables plus a small
> JSON index** — columnar, compressed, randomly addressable, and self-describing.

![An mzPeak archive: Parquet data columns, metadata, and an index, inside one ZIP container.](/illustrations/format-diagram.svg)

## Why a new format?

- **Size.** Spectra are columnar and compressed, so a file is typically a fraction of the equivalent
  mzML — without losing a single data point.
- **Speed & cloud-native access.** Parquet's column + row-group layout means a reader can fetch *just the
  bytes it needs* over an HTTP range request. Open one spectrum from a multi-gigabyte run in a browser,
  with no download.
- **Interoperable by design.** The structure is language-independent (ZIP + Parquet are everywhere), and
  the semantics are anchored in the **PSI-MS controlled vocabulary** — the same vocabulary the community
  already uses. A versioned validator checks conformance.
- **Extensible without forking.** New kinds of data attach through documented *entity-type* and
  *data-kind* mechanisms, so the format grows by extension rather than by incompatible variants.

## Smaller, on real data

Across three families of public datasets, mzPeak is consistently about half the size of the original
vendor raw file — and a fraction of the equivalent mzML. [Browse the example data ↗](https://object.storage.eu01.onstackit.cloud/v09/index.html),
or see the [per-instrument numbers](/#performance) on the home page.

<div class="ratio-figs">
  <a href="https://object.storage.eu01.onstackit.cloud/v09/mass-spec.html" target="_blank" rel="noopener"><img :src="withBase('/figures/mass-spec-ratios.png')" alt="General MS data: mzPeak about 50% of the vendor raw size" /></a>
  <a href="https://object.storage.eu01.onstackit.cloud/v09/imaging.html" target="_blank" rel="noopener"><img :src="withBase('/figures/imaging-ratios.png')" alt="Imaging MS (MSI): mzPeak about 35% of the vendor raw size" /></a>
  <a href="https://object.storage.eu01.onstackit.cloud/v09/sdrf.html" target="_blank" rel="noopener"><img :src="withBase('/figures/sdrf-ratios.png')" alt="Study-design embedding: mzPeak about 45% of the vendor raw size" /></a>
</div>

## What's inside an archive

| Member | What it holds |
|---|---|
| `*_data.parquet` | the signal: m/z + intensity (and ion-mobility, etc.) as sorted columns |
| `metadata` | instrument, software, samples, run description, controlled-vocabulary declarations |
| `mzpeak_index.json` | the manifest — what members exist and how to find them |
| `Other` members | optional embedded artifacts: optical images, **SDRF/ISA sample metadata**, provenance |

## Governance

mzPeak is developed as an open community effort under **[HUPO-PSI](https://www.psidev.info/)** (the
Proteomics Standards Initiative). The canonical specification and the reference implementation are public
— see [Tools](/tools).
