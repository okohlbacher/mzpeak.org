# Governance &amp; standardization

mzPeak is developed as an open community standard under **HUPO-PSI** (the Proteomics Standards
Initiative) — the same body that stewards mzML and the PSI-MS controlled vocabulary.

## Status

mzPeak is at **version 0.9 (working draft)**. It has **not yet been ratified** through the formal
HUPO-PSI document process: the container, signal-data layouts, index file, and metadata model are
specified and implemented, while a few normative questions remain open and are tracked in the
specification.

- Read the current draft — [Specification](/spec/)
- Follow or comment on the open questions — [HUPO-PSI/mzPeak-specification](https://github.com/HUPO-PSI/mzPeak-specification)

## How it's governed

The format is defined by a public specification and anchored in the **PSI-MS controlled vocabulary**, so
its semantics are the vocabulary the community already uses. Decisions are made in the open through the
HUPO-PSI working groups and a technical committee, with discussion on the public mailing list and GitHub.

## Why you can build on it

- **Open &amp; language-independent.** ZIP + Apache Parquet are ubiquitous; the on-disk structure is
  documented and not tied to a single core library.
- **Independently implemented.** Seven from-scratch implementations — the Rust reference plus Python, R,
  C#, Java, JavaScript/TypeScript and C++ — read and write the same archives. See [Build with mzPeak](/tools).
- **Verifiable.** A versioned, profile-driven conformance validator checks that files meet the spec.
- **Stewarded by a standards body.** Governance sits with HUPO-PSI, not a vendor.

## Get involved

mzPeak is a community effort and contributions are welcome — implementations, converters, test data, and
review of the open questions.

- Specification &amp; issues — [HUPO-PSI/mzPeak-specification](https://github.com/HUPO-PSI/mzPeak-specification)
- The wider project — [HUPO-PSI on GitHub](https://github.com/HUPO-PSI) · [psidev.info](https://www.psidev.info/)
- Questions — [info@mzpeak.org](mailto:info@mzpeak.org) (see [Contact](/contact))
