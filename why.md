# Why mzPeak

mzPeak stores mass spectra as [Apache Parquet](https://parquet.apache.org/) tables inside a ZIP
archive, alongside a small JSON index. It is designed as a modern successor to mzML: a columnar,
analytics-native layout that is dramatically smaller on disk, supports partial reads directly over
HTTP, and maps losslessly onto the HUPO-PSI mzML / PSI-MS controlled vocabulary. The format is
governed by HUPO-PSI and is currently at **v0.9, Draft 5 — a working draft, not yet ratified**
through the HUPO-PSI Document Process; standardization is proceeding via HUPO-PSI from 2026. This
page is meant to help you evaluate mzPeak honestly, get hands-on quickly, and cite the work.

## mzPeak vs mzML

| Dimension | mzML | mzPeak |
| --- | --- | --- |
| Typical file size | XML text; frequently *inflates past* the vendor RAW size | 0.18×–0.57× of the equivalent mzML (average ~0.37×), losslessly — and smaller than the vendor RAW file too |
| Random access / partial reads over HTTP | Indexed, but generally read as a whole file | Read a single spectrum from a multi-GB file over HTTP range requests, without downloading the whole file |
| Columnar analytics (Arrow / Pandas / Polars) | Not columnar; requires parsing into other structures | Native — Parquet reads directly into Apache Arrow, Pandas, or Polars |
| Metadata model (PSI-MS CV) | HUPO-PSI mzML / PSI-MS controlled vocabulary | Aligns with the same PSI-MS controlled vocabulary, so mzML↔mzPeak conversion is lossless |
| Imaging (MSI) support | Handled separately (imzML) | Spectra, chromatograms, and ion images for MS-imaging in one format |
| Streaming write maturity | Mature, universal | Rust and C# read+write; Java read+write (proof-of-concept); other languages read-only so far |
| Standardization status | Ratified, universal HUPO-PSI standard | v0.9, Draft 5 working draft; HUPO-PSI standardization from 2026 |
| Tool ecosystem breadth | Decades of tools across the field | Growing — libraries in seven languages, in-browser viewer, validator, and an mzML converter |

### Implementation maturity

All implementations are built on Apache Arrow / Parquet.

| Language | Capability |
| --- | --- |
| Rust | Reference implementation, read + write |
| C# | Read + write |
| Java | Read + write (proof-of-concept) |
| Python | Read |
| R | Read |
| JavaScript / TypeScript | Read |
| C++ | Read |

### What mzML still does better today

mzML is a ratified, universal HUPO-PSI standard with decades of tool support across essentially the
whole field — it will read anywhere. mzPeak is a v0.9 working draft: most of its libraries are
read-only so far, and there is not yet a direct vendor-RAW converter (see the roadmap note below).
If you need maximum compatibility with existing pipelines right now, mzML remains the safe default;
mzPeak is the choice when file size, partial HTTP access, or columnar analytics matter.

## Quickstart

1. **Grab a `.mzpeak` file.** The public corpus has ~79 real datasets, each mzPeak alongside its
   original, at [data.mzpeak.org/v09](https://data.mzpeak.org/v09/index.html).
2. **Open it in the browser viewer.** Go to the [mzPeak Viewer](https://www.mzpeak.org/view/) and
   drag-and-drop your file, or use "Open demo" — no install, no upload. It streams over HTTP range
   requests and shows spectra and chromatograms for LC-/GC-MS, and ion images for MS-imaging.
3. **Validate it** with the [mzPeak Validator](https://www.mzpeak.org/validator/) — either in the
   browser (upload up to 1 GB, or paste an HTTPS/`s3://` URL) or with the CLI:

   ```bash
   mzpeak-validate file.mzpeak
   ```
4. **Make your own** by converting an existing mzML with
   [mzML2mzPeak](https://github.com/okohlbacher/mzML2mzPeak). Because both formats share the PSI-MS
   controlled vocabulary, this conversion is lossless. See the repository for build and usage
   details.

> A direct **vendor RAW → mzPeak** path (via ProteoWizard msconvert) is on the roadmap, not yet
> available. For now, convert vendor RAW to mzML first, then use mzML2mzPeak.

## How to cite

If you use mzPeak in your work, please cite:

Tim Van Den Bossche, Theodore Alexandrov, Aivett Bilbao, Wout Bittremieux, Federico Ivan Brigante,
Matthew Chase Chambers, Joshua Charkow, Eric Deutsch, Andrew W. Dowsey, Yasin El Abiead, Ralf
Gabriels, Helge Hecht, Steffen Heuckeroth, Joshua A. Klein, Michael Knierman, Lennart Martens,
Robert L. Moritz, Laura-Isobel McCall, Steffen Neumann, Yasset Perez-Riverol, Hannes L. Röst,
Elliott J. Price, Jim Shofstahl, David L. Tabb, Julian Uszkoreit, Juan Antonio Vizcaíno, Mingxun
Wang, Sander Willems, Dirk Winkelhardt, Oliver Kohlbacher, Samuel P. Wein. "mzPeak: Designing a
Scalable, Interoperable, and Future-Ready Mass Spectrometry Data Format." *Journal of Proteome
Research*, 2025, 24(11), 5329–5335. DOI:
[10.1021/acs.jproteome.5c00435](https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5c00435).

```bibtex
@article{vandenbossche2025mzpeak,
  author  = {Tim Van Den Bossche and Theodore Alexandrov and Aivett Bilbao and Wout Bittremieux and Federico Ivan Brigante and Matthew Chase Chambers and Joshua Charkow and Eric Deutsch and Andrew W. Dowsey and Yasin El Abiead and Ralf Gabriels and Helge Hecht and Steffen Heuckeroth and Joshua A. Klein and Michael Knierman and Lennart Martens and Robert L. Moritz and Laura-Isobel McCall and Steffen Neumann and Yasset Perez-Riverol and Hannes L. R{\"o}st and Elliott J. Price and Jim Shofstahl and David L. Tabb and Julian Uszkoreit and Juan Antonio Vizca{\'i}no and Mingxun Wang and Sander Willems and Dirk Winkelhardt and Oliver Kohlbacher and Samuel P. Wein},
  title   = {mzPeak: Designing a Scalable, Interoperable, and Future-Ready Mass Spectrometry Data Format},
  journal = {Journal of Proteome Research},
  year    = {2025},
  volume  = {24},
  number  = {11},
  pages   = {5329--5335},
  doi     = {10.1021/acs.jproteome.5c00435},
  url     = {https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5c00435}
}
```

The mzPeak specification is currently licensed under CC-BY-ND 4.0.
