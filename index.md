---
layout: home

hero:
  name: mzPeak
  text: The modern mass spectrometry data format
  tagline: Compact, fast, cloud-native — a Parquet-in-ZIP successor to mzML, open and CV-governed by HUPO-PSI.
  image:
    src: /illustrations/format-diagram.svg
    alt: An mzPeak archive — Parquet data columns plus metadata and an index, in one ZIP container.
  actions:
    - theme: brand
      text: What is mzPeak?
      link: /about
    - theme: alt
      text: Browse live examples
      link: /examples
    - theme: alt
      text: Specification ↗
      link: https://github.com/HUPO-PSI/mzPeak-specification

features:
  - icon: 🗜️
    title: Compact
    details: Columnar Parquet compression — typically 0.1–0.6× the size of the equivalent mzML, losslessly.
  - icon: ⚡
    title: Cloud-native & fast
    details: Random access over HTTP range requests — stream one spectrum out of a multi-gigabyte file in the browser, no download.
  - icon: 🔓
    title: Open & interoperable
    details: ZIP-of-Parquet, language-independent, governed by the PSI-MS controlled vocabulary — with a versioned conformance profile and validator.
  - icon: 🧩
    title: Extensible
    details: First-class extensions for MS imaging (per-pixel spatial data) and sample metadata (SDRF / ISA) — without forking the format.
---
