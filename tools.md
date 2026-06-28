# Build with mzPeak

Everything around mzPeak is open source — a specification, reference reader/writers across seven
languages, converters, a conformance validator, and an in-browser viewer. Pick a starting point.

<div class="build-grid">

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-spec">Specification</span></div>
    <strong class="build-title">mzPeak specification</strong>
    <p>The canonical format — JSON Schemas, controlled-vocabulary rules, and prose.</p>
    <div class="build-links">
      <a href="/spec/">Read the spec →</a>
      <a href="https://github.com/HUPO-PSI/mzPeak-specification" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-impl">Reference impls</span><span class="build-stat">seven languages</span></div>
    <strong class="build-title">Reference implementations</strong>
    <p>Read/write libraries across <strong>seven languages</strong> — Rust (reference, <code>mzpeak_prototyping</code>), Python, R, C#, JavaScript/TypeScript, C++, and Java — all built on Apache Arrow / Parquet.</p>
    <div class="build-links">
      <a href="/spec/implementations/">See all seven →</a>
      <a href="https://github.com/HUPO-PSI" target="_blank" rel="noopener">HUPO-PSI ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-view">Viewer</span></div>
    <strong class="build-title">mzPeak Viewer</strong>
    <p>Open any <code>.mzpeak</code> directly in your browser, streamed over HTTP — no upload, no backend. Inspect spectra and chromatograms for LC-/GC-MS runs, or render ion images and click pixels for MS-imaging (MSI) datasets.</p>
    <div class="build-links">
      <a href="https://www.mzpeak.org/view/" target="_blank" rel="noopener">Open viewer ↗</a>
      <a href="https://github.com/okohlbacher/mzpeakviewer" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-val">Validator</span></div>
    <strong class="build-title">mzPeakValidator</strong>
    <p>A language-independent, profile-driven conformance validator. Check a file in the browser — paste an HTTPS or <code>s3://</code> URL, or upload a <code>.mzpeak</code> (up to 1 GB) — or from the CLI: <code>mzpeak-validate file.mzpeak</code>.</p>
    <div class="build-links">
      <a href="https://validator.mzpeak.org" target="_blank" rel="noopener">Open validator ↗</a>
      <a href="https://github.com/okohlbacher/mzPeakValidator" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

</div>

> **On the roadmap:** a direct **vendor RAW → mzPeak** path (e.g. inside ProteoWizard `msconvert`) so every
> vendor format converts in one step, embedding the original acquisition method as provenance.

See the viewer in action on the [Try it](/examples) page.

> Building a tool that reads or writes mzPeak? The format is language-independent — start from the
> [specification](/spec/) and validate against mzPeakValidator. Contributions and feedback are welcome
> via the [HUPO-PSI repositories](https://github.com/HUPO-PSI).
