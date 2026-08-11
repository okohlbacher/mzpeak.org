# Examples & live data

A public, browsable corpus of real mzPeak files — converted from open datasets across vendors,
instruments, and modalities — is hosted for anyone to explore.

## Browse the corpus

- **[Example data index ↗](https://data.mzpeak.org/v09/index.html)** — dozens of real
  datasets, each `.mzpeak` alongside its original, organized by type:
  - **Imaging MS (MSI)** — imzML datasets with per-pixel spatial coordinates + optical images
  - **Mass spectrometry** — LC-/GC-MS across seven instrument classes from six vendors
  - **SDRF / ISA sample metadata** — studies shipping their sample-annotation alongside the data

Every `.mzpeak` opens **directly in a browser viewer over HTTP range requests — no download**.

## Open one in a viewer

From the index, click **▶ View** on any file — the **mzPeak Viewer** streams it in place, whether it's a
regular LC-/GC-MS run or an imaging (MSI) dataset.

## Try it right here

The viewer below is the **mzPeak Viewer**, running entirely in your browser. Click **Open demo** to load a
real run, or drop any `.mzpeak` file from the [corpus](https://data.mzpeak.org/v09/index.html)
onto it — the file is read in place over HTTP range requests and never leaves your machine.

<div class="viewer-embed">
  <iframe
    src="https://www.mzpeak.org/view/"
    title="mzPeak Viewer — interactive in-browser mzPeak viewer"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

[Open the viewer in a full window ↗](https://www.mzpeak.org/view/) — then pick any demo, or open a file from the [corpus](https://data.mzpeak.org/v09/index.html).

## Why it's compact

Across the benchmark corpus, mzPeak files are consistently a **fraction of the source mzML size**
(roughly **0.18–0.57×, average ~0.37×**), losslessly — the payoff of columnar Parquet storage. See the
[per-instrument numbers](/#performance) on the home page.

## A worked imaging example

The mouse urinary-bladder MS-imaging dataset reconstructs tissue anatomy *label-free* from lipid ion
images. Loaded in the **mzPeak Viewer** and assigned to RGB channels, three masses separate the bladder-wall
layers — urothelium, lamina propria, and muscle — straight from an mzPeak file in the browser.
