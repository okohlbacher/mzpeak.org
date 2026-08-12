# Benchmarks

How mzPeak's size and access claims were measured, and how to reproduce them. The headline
figures come from the peer-reviewed white paper (Van Den Bossche et al., *J. Proteome Res.*
2025 — see [How to cite](/why#how-to-cite)); the **public corpus is the reproducible artifact**:
every dataset ships each `.mzpeak` alongside its original, so anyone can re-measure the ratios.

## Compression — per instrument

File size of the mzPeak archive as a fraction of the **equivalent mzML** (lower is better),
across seven instrument classes. Peak type (profile / centroid) is preserved on conversion, so
these are lossless conversions, not down-sampling.

| Instrument | mzML | mzPeak | mzPeak ÷ mzML |
| --- | --- | --- | --- |
| Thermo LTQ FT Ultra (FT-ICR) | 30.2 MB | 5.5 MB | **0.18×** |
| Thermo Orbitrap Velos | 429.2 MB | 101.5 MB | **0.24×** |
| Thermo Fusion Lumos | 588.6 MB | 156.5 MB | **0.27×** |
| Thermo LTQ XL (ion trap) | 173.5 MB | 55.6 MB | **0.32×** |
| Bruker timsTOF Pro | 1386.5 MB | 677.2 MB | **0.49×** |
| Thermo Orbitrap Astral | 6118.4 MB | 3359.4 MB | **0.55×** |
| SCIEX ZenoTOF 7600 | 89.8 MB | 50.9 MB | **0.57×** |

Across this set, mzPeak is **0.18×–0.57× of the equivalent mzML, averaging ~0.37×** — and since
mzML is XML text that frequently inflates *past* the vendor RAW file, mzPeak also lands below the
original RAW.

## Compression — whole corpus

Against the **vendor RAW** baseline across the broader corpus (n = 48 datasets with a RAW
reference), mzML routinely exceeds 100 % of RAW while mzPeak stays well below both:

![mzPeak corpus — compression vs vendor RAW (RAW = 100%, n = 48): mzML averages 132%, mzPeak 45% (median 41%)](/figures/corpus-ratios.png)

## Random access

mzPeak stores spectra in Apache Parquet inside a ZIP, with a small JSON index — so a reader can
fetch **one spectrum from a multi-GB file directly over HTTP range requests, without downloading
the whole file**. The white paper reports opening a 3 GB file and reading a spectrum in **under
~2 s** (local and from remote object storage). The full test setup — hardware, network, reader
version, and query definition — is in the paper; treat the corpus below as the reproducible
size/access artifact rather than a re-statement of those timings.

## Reproduce it yourself

1. Pick any dataset from the [public corpus](https://data.mzpeak.org/v09/index.html) — ~79 real
   datasets across six vendors and seven instrument classes, each `.mzpeak` next to its original.
2. Compare the file sizes directly (the index lists both).
3. Convert your own mzML with [mzML2mzPeak](https://github.com/okohlbacher/mzML2mzPeak) and measure
   the result — conversion is lossless (shared PSI-MS controlled vocabulary).
4. Stream a single spectrum over HTTP with the [mzPeak Viewer](https://www.mzpeak.org/view/) or any
   reference library to see range-based random access in action.

Methodology and the primary measurements are documented in the white paper
([10.1021/acs.jproteome.5c00435](https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5c00435)).
