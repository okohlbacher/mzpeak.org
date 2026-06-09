# Tools & ecosystem

Everything around mzPeak is open source.

## Specification

- **[HUPO-PSI/mzPeak-specification](https://github.com/HUPO-PSI/mzPeak-specification)** — the canonical
  format specification (schemas + controlled-vocabulary rules + prose).

## Reference implementation

- **[HUPO-PSI/mzPeak](https://github.com/HUPO-PSI/mzPeak)** (`mzpeak_prototyping`) — the reference reader
  and writer, in Rust.

## Converters

- **mzML2mzPeak** — convert imzML / mzML to mzPeak (and back), with full round-trip verification.
  Reads via [`mzdata`](https://github.com/mobiusklein/mzdata).
- *Roadmap:* a direct **vendor RAW → mzPeak** path (e.g. inside ProteoWizard `msconvert`) so every vendor
  format converts in one step, embedding the original acquisition method as provenance.

## Validation

- **mzPeakValidator** — a language-independent, profile-driven conformance validator
  (`mzpeak-validate file.mzpeak`).

## Viewers

- **mzPeak Explorer** — open any `.mzpeak` directly in your browser, streamed over HTTP.
- **mzPeakIV** — an imaging viewer for MS-imaging (MSI) datasets.

See them in action on the [Examples](/examples) page.

> Building a tool that reads or writes mzPeak? The format is language-independent — start from the
> [specification](https://github.com/HUPO-PSI/mzPeak-specification) and validate against
> mzPeakValidator. Contributions and feedback are welcome via the HUPO-PSI repositories.
