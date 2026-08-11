# Status & roadmap

mzPeak is currently a **v0.9 draft (Draft 5)** — a working specification under active revision, on a governed standardization track through the HUPO-PSI (Proteomics Standards Initiative) Document Process. It is not yet ratified. This page separates what is already stable and safe to build on from what may still change before v1.0, and lays out the path to ratification. The short version: the core data model, tooling, and libraries are usable today; the specification text and some newer areas remain in flux until the draft is finalized.

## Where mzPeak is today

| Stable / usable now | Draft / may change |
| --- | --- |
| Container model — Parquet tables inside a ZIP archive with a JSON index | The specification text itself, pending HUPO-PSI ratification |
| JSON Schemas and controlled-vocabulary (CV) rules | Details that may be refined during the draft phase |
| Lossless mzML ↔ mzPeak mapping, aligned with the PSI-MS CV | Broader write support beyond the current implementations |
| Reference Rust reader/writer | Encryption / security design (open question, see below) |
| Read libraries in seven languages: Rust, Python, R, C#, JS/TS, C++, Java | Write support in Python, R, JS/TS, C++ (read-only today) |
| In-browser viewer (`/view/`) and conformance validator (`/validator/`) | Java library (currently proof-of-concept) |
| Public corpus of ~79 datasets across six vendors | |

Read support is broad and mature; **write support is currently limited to Rust and C#**. Python, R, JS/TS, and C++ libraries are read-only today, and the Java library is a proof-of-concept.

## On the roadmap

No firm dates are attached to these items; they are stated as goals under active work.

- **Finalizing the draft toward ratification** through the HUPO-PSI Document Process.
- **Broader write support** beyond Rust and C# — extending the Python, R, JS/TS, and C++ libraries from read-only to full read/write, and maturing the Java library beyond proof-of-concept.
- **Direct vendor RAW → mzPeak conversion** via ProteoWizard `msconvert`; ProteoWizard support is in preparation.
- **Encryption / security** — Parquet's AES-GCM encryption is available as a Parquet feature and is noted as an option. A post-quantum-safe design remains an **open design question**, not a shipped feature.

## Standardization

mzPeak is being standardized through **HUPO-PSI** (the Proteomics Standards Initiative), following its formal Document Process. Standardization is proceeding via HUPO-PSI **from 2026**. The current v0.9 draft is being taken through this process, and **v1.0 will follow ratification** — no specific release date is set.

The specification is currently published under the CC-BY-ND 4.0 license.

For more on the Proteomics Standards Initiative and its process, see [psidev.info](https://www.psidev.info/).

## Using the draft safely

The v0.9 draft is suitable for evaluation and practical use today — you can convert data into mzPeak, read it across seven language ecosystems, view files in the browser, and check conformance with the validator. A few honest caveats:

- **Treat v0.9 as a draft that may change** before ratification. During the draft phase, expect refinements to the specification and some newer areas.
- **Pin to a specific version.** The format is versioned (currently 0.9); record which version your files and pipelines target so you can migrate deliberately.
- **A stability/versioning policy will accompany ratification.** There is no formal deprecation policy during the draft phase — plan for the possibility of refinements as the draft advances toward v1.0.

In short: evaluate, convert, and read now, but keep an eye on version changes until v1.0 is ratified.
