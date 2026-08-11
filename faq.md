# Frequently asked questions

Honest answers to the questions a careful evaluator asks before adopting a new data
format. mzPeak is a working draft, and this page says so plainly. For the fuller
argument and a side-by-side comparison with mzML, see [Why mzPeak](/why); for
governance, see [Governance](/about).

## What is mzPeak, in one paragraph?

mzPeak stores mass spectra as [Apache Parquet](https://parquet.apache.org/) tables inside a
ZIP archive, together with a small JSON index. It is designed as a modern successor to mzML:
a columnar, analytics-native layout that is much smaller on disk, supports partial reads
directly over HTTP, and maps losslessly onto the HUPO-PSI mzML / PSI-MS controlled
vocabulary. The format is developed openly under HUPO-PSI and is currently at **v0.9,
Draft 5 — a working draft, not yet ratified**; standardization is proceeding via HUPO-PSI
from 2026.

## Is it really lossless? Will I lose metadata compared to mzML?

No metadata is lost. mzPeak's metadata model aligns with the same HUPO-PSI mzML / PSI-MS
controlled vocabulary that mzML uses, so the two formats describe the data with identical
semantics. Round-trip mzML↔mzPeak conversion is lossless, and this has been tested across
the public corpus.

## Why Parquet-in-a-ZIP, and not just Parquet, or HDF5, or mzMLb?

These are design trade-offs rather than a claim that one container is universally best. The
ZIP wrapper gives a single, self-contained file — signal tables plus a JSON index for random
access — instead of a directory of loose Parquet parts to keep together. Parquet itself
brings columnar compression and direct reads into the Apache Arrow ecosystem (Arrow, Pandas,
Polars), which is what makes the files both small and analytics-native. HDF5 and mzMLb are
reasonable alternatives with their own strengths; mzPeak's choice is to build on the widely
deployed ZIP + Parquet + Arrow stack so the on-disk structure is documented and not tied to a
single core library.

## How much smaller are files, really?

Across the benchmark corpus, mzPeak files are **0.18×–0.57× of the equivalent mzML (average
about 0.37×)**, losslessly. They are smaller than the original vendor RAW file too — mzML is XML
text and frequently inflates *past* the RAW size, whereas mzPeak lands well below both.

## Can my existing tools open mzPeak today?

Partly, and this is growing. There are read libraries in seven languages — Rust, C#, Python,
R, JavaScript/TypeScript, C++, and Java — all built on Apache Arrow / Parquet, plus a browser
[Viewer](https://www.mzpeak.org/view/) and a conformance [Validator](https://www.mzpeak.org/validator/).
Writing mzPeak is available in Rust (the reference implementation) and C# today, with a Java
read+write proof-of-concept; the other language bindings are read-only for now. Broad
integration into established pipelines is still in progress. If you need maximum compatibility
with existing tooling right now, mzML remains the safe default.

## How do I convert my data to mzPeak?

Today, convert an existing **mzML** file with
[mzML2mzPeak](https://github.com/okohlbacher/mzML2mzPeak); because both formats share the
PSI-MS controlled vocabulary, the conversion is lossless. A direct **vendor RAW → mzPeak**
path (via ProteoWizard `msconvert`) is on the roadmap but not yet available, and broader
ProteoWizard support is in preparation. For now, convert vendor RAW to mzML first, then run
mzML2mzPeak. See the [Tools](/tools) page for the full toolchain.

## Is v0.9 safe to adopt, or will the format still change?

Be clear-eyed about the status: v0.9, Draft 5 is a **working draft, not yet ratified**, so
some normative questions are still open and the format can change before ratification. What
makes it a reasonable early bet is that it is developed in the open under HUPO-PSI, backed by
seven independent implementations and a conformance validator, and anchored in the PSI-MS
controlled vocabulary the community already uses. For production-critical archives that must
be stable today, treat mzPeak as complementary to mzML rather than a replacement.

## Who governs mzPeak, and who is behind it?

Governance sits with **HUPO-PSI** — the Proteomics Standards Initiative, the same body that
stewards mzML and the PSI-MS controlled vocabulary — through its public working groups, not a
vendor. The design is described in a peer-reviewed paper by Van Den Bossche et al. (see
[How do I cite mzPeak?](#how-do-i-cite-mzpeak)), authored by a broad group of contributors
from across the mass-spectrometry and proteomics community.

## Is it a ratified standard yet?

No. mzPeak has not yet been ratified through the formal HUPO-PSI document process. It is a
v0.9 working draft on the HUPO-PSI standardization track, with ratification proceeding from
2026. See [Governance](/about) for the current status and how to follow the open questions.

## Who is already using it in production?

There are currently no publicly named production adopters, and we will not pretend otherwise —
mzPeak is an emerging draft. The concrete evidence available today is the public corpus of
**~79 real datasets spanning six vendors and seven instrument classes**, each mzPeak file
provided alongside its original, at
[data.mzpeak.org/v09](https://data.mzpeak.org/v09/index.html). Early adopters and implementers
are welcome.

## Who pays for data.mzpeak.org, and is my data private in the viewer?

The corpus at data.mzpeak.org is **public example data** — converted from open datasets and
hosted for anyone to explore. The [mzPeak Viewer](https://www.mzpeak.org/view/) reads files
directly in your browser over HTTP range requests; when you open your own `.mzpeak` file it is
read in place and **never leaves your machine** — there is no upload and no backend. This is
stated on the [Try it](/examples) page, where you can open a file to see it for yourself.

## How do I cite mzPeak?

Cite the paper:

Van Den Bossche et al., "mzPeak: Designing a Scalable, Interoperable, and Future-Ready Mass
Spectrometry Data Format." *Journal of Proteome Research*, 2025, 24(11), 5329–5335. DOI:
[10.1021/acs.jproteome.5c00435](https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5c00435).

A ready-to-use BibTeX entry and the full author list are on the
[How to cite](/why#how-to-cite) section of the Why page.
