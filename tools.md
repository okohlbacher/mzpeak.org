# Build with mzPeak

Everything around mzPeak is open source — a specification, reference reader/writers across seven
languages, converters, a conformance validator, and in-browser viewers. Pick a starting point.

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
    <div class="build-head"><span class="build-badge b-impl">Reference impl</span><span class="build-stat">Rust · read/write</span></div>
    <strong class="build-title">HUPO-PSI/mzPeak</strong>
    <p><code>mzpeak_prototyping</code> — the reference reader and writer, with direct Thermo RAW and Bruker .TDF reading.</p>
    <div class="build-links">
      <a href="https://github.com/HUPO-PSI/mzPeak" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-conv">Converter</span></div>
    <strong class="build-title">mzML2mzPeak</strong>
    <p>Convert imzML / mzML to mzPeak and back, with full round-trip verification. Reads via <code>mzdata</code>.</p>
    <div class="build-links">
      <a href="https://github.com/okohlbacher/mzML2mzPeak" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-val">Validator</span></div>
    <strong class="build-title">mzPeakValidator</strong>
    <p>A language-independent, profile-driven conformance validator: <code>mzpeak-validate file.mzpeak</code>.</p>
    <div class="build-links">
      <a href="https://github.com/okohlbacher/mzPeakValidator" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-view">Viewer</span></div>
    <strong class="build-title">mzPeak Explorer</strong>
    <p>Open any <code>.mzpeak</code> directly in your browser, streamed over HTTP — no upload, no backend.</p>
    <div class="build-links">
      <a href="https://www.mzpeak.org/view/" target="_blank" rel="noopener">Open viewer ↗</a>
      <a href="https://github.com/okohlbacher/mzPeakExplorer" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

  <div class="build-card">
    <div class="build-head"><span class="build-badge b-view">Viewer · MSI</span></div>
    <strong class="build-title">mzPeakIV</strong>
    <p>An imaging viewer for MS-imaging (MSI) datasets — render ion images, click pixels to inspect spectra.</p>
    <div class="build-links">
      <a href="https://www.mzpeak.org/IV/" target="_blank" rel="noopener">Open viewer ↗</a>
      <a href="https://github.com/okohlbacher/mzPeakIV" target="_blank" rel="noopener">GitHub ↗</a>
    </div>
  </div>

</div>

> **On the roadmap:** a direct **vendor RAW → mzPeak** path (e.g. inside ProteoWizard `msconvert`) so every
> vendor format converts in one step, embedding the original acquisition method as provenance.

See the viewers in action on the [Try it](/examples) page.

> Building a tool that reads or writes mzPeak? The format is language-independent — start from the
> [specification](/spec/) and validate against mzPeakValidator. Contributions and feedback are welcome
> via the [HUPO-PSI repositories](https://github.com/HUPO-PSI).
