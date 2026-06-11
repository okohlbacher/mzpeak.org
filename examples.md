# Examples & live data

A public, browsable corpus of real mzPeak files — converted from open datasets across vendors,
instruments, and modalities — is hosted for anyone to explore.

## Browse the corpus

- **[Example data index ↗](https://object.storage.eu01.onstackit.cloud/v09/index.html)** — hundreds of
  `.mzpeak` files alongside their originals, organized by type:
  - **Imaging MS (MSI)** — imzML datasets with per-pixel spatial coordinates + optical images
  - **Mass spectrometry** — LC-/GC-MS across six vendors and every major analyzer class
  - **SDRF / ISA sample metadata** — studies shipping their sample-annotation alongside the data

Every `.mzpeak` opens **directly in a browser viewer over HTTP range requests — no download**.

## Open one in a viewer

From the index, click **▶ Explorer** on any file (or **▦ mzPeakIV** for imaging datasets). Both viewers
stream the file in place.

## Try it right here

The viewer below is **mzPeak Explorer**, running entirely in your browser. Click **Open demo** to load a
real run, or drop any `.mzpeak` file from the [corpus](https://object.storage.eu01.onstackit.cloud/v09/index.html)
onto it — the file is read in place over HTTP range requests and never leaves your machine.

<div class="viewer-embed">
  <iframe
    src="https://okohlbacher.github.io/mzPeakExplorer/"
    title="mzPeak Explorer — interactive in-browser mzPeak viewer"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

[Open a real dataset in a full window ↗](https://okohlbacher.github.io/mzPeakExplorer/?file=https%3A%2F%2Fobject.storage.eu01.onstackit.cloud%2Fv09%2FmzML-examples%2Fagilent-6490-triplequad%2FREC-2349_P2_F1.mzpeak)

## Why it's compact

Across the benchmark corpus, mzPeak files are consistently a **fraction of the source mzML size**
(roughly 0.1–0.6×), losslessly — the payoff of columnar Parquet storage. See the
[per-instrument numbers](/#performance) on the home page.

## A worked imaging example

The mouse urinary-bladder MS-imaging dataset reconstructs tissue anatomy *label-free* from lipid ion
images. Loaded in **mzPeakIV** and assigned to RGB channels, three masses separate the bladder-wall
layers — urothelium, lamina propria, and muscle — straight from an mzPeak file in the browser.
