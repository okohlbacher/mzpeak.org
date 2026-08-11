<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
import {
  BookOpen, Github, Menu, X, FileText, Play,
  Minimize2, Cloud, Gauge, BrainCircuit, Unlock, Puzzle, ShieldCheck, ArrowLeftRight,
  Package, Table2, Tags, FileJson2, Layers,
  BookMarked, Binary, Repeat, ShieldCheck as ShieldCheck2, Activity,
  ArrowUpRight, ExternalLink,
} from 'lucide-vue-next'

const mark = withBase('/mark.png')

// The V0.9 specification is embedded on this site under /spec/ (built from the
// HUPO-PSI spec repo at deploy time). Point every "Specification" affordance there.
const SPEC = withBase('/spec/')
const WHITEPAPER = 'https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5c00435'
const EXAMPLES = 'https://data.mzpeak.org/v09/index.html'

// The three real, public dataset families in the mzML2mzPeak example corpus,
// each with its "size through the conversion chain" overview figure.
const families = [
  {
    img: '/figures/mass-spec-ratios.png',
    href: 'https://data.mzpeak.org/v09/mass-spec.html',
    name: 'General MS data',
    w: 941, h: 751,
    alt: 'Compression overview for general MS data: raw 100%, mzML ~181%, mzPeak ~50%.',
    desc: 'LC-/GC-MS across six instrument vendors. mzML typically inflates past the vendor raw file; mzPeak lands at about half of it.',
  },
  {
    img: '/figures/imaging-ratios.png',
    href: 'https://data.mzpeak.org/v09/imaging.html',
    name: 'Imaging MS (MSI)',
    w: 772, h: 751,
    alt: 'Compression overview for imaging MS: raw 100%, mzPeak ~35%.',
    desc: 'imzML imaging runs with per-pixel coordinates and embedded optical images — the whole image at roughly a third of the source.',
  },
  {
    img: '/figures/sdrf-ratios.png',
    href: 'https://data.mzpeak.org/v09/sdrf.html',
    name: 'Study-design embedding',
    w: 941, h: 751,
    alt: 'Compression overview for study-design datasets: raw 100%, mzML ~194%, mzPeak ~45%.',
    desc: 'Studies that carry their SDRF / ISA sample annotation alongside the data — kept in the archive, still near 45%.',
  },
]

// Hero figure carousel — figures from the mzPeak white paper / deck + live viewers.
const slides = [
  { src: '/hero/container.png', caption: 'Parquet tables in one container',
    alt: 'The mzPeak abstract figure: a shipping container labelled “mzPeak / Parquet” holding spectra and metadata.' },
  { src: '/hero/anatomy.png', caption: 'Anatomy of an mzPeak archive',
    alt: 'Diagram of an mzPeak archive: a JSON index plus Parquet tables for spectrum and chromatogram data and metadata, inside one container.' },
  { src: '/figures/corpus-ratios.png', caption: 'Smaller than mzML, losslessly',
    alt: 'Whole-corpus size comparison across 48 datasets: vendor raw at 100%, mzML averaging 132% (routinely larger than raw), and mzPeak at 45% (median 41%).' },
  { src: '/hero/explorer.png', caption: 'Open any file in your browser',
    alt: 'The mzPeak Viewer showing a loaded run — summary, spectra and chromatograms — streamed in the browser.' },
  { src: '/hero/mzpeakiv.png', caption: 'MS-imaging in the browser',
    alt: 'The mzPeak Viewer showing an ion image reconstructed from a mouse urinary-bladder MS-imaging dataset.' },
]
const menuOpen = ref(false)
const current = ref(0)
const playing = ref(true)
let timer: ReturnType<typeof setInterval> | undefined
const stop = () => { if (timer) clearInterval(timer); timer = undefined }
// only auto-advances while "playing" (the explicit toggle); hover still pauses.
const start = () => { stop(); if (playing.value) timer = setInterval(next, 5500) }
// Advancing (auto or manual) re-arms the dwell so a click doesn't get skipped.
const go = (i: number) => { current.value = (i + slides.length) % slides.length; if (timer) start() }
const next = () => go(current.value + 1)
const prev = () => go(current.value - 1)
const togglePlay = () => { playing.value = !playing.value; playing.value ? start() : stop() }
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) playing.value = false
  else start()
})
onUnmounted(stop)
</script>

<template>
<div class="site">

  <a class="skip" href="#main">Skip to content</a>

  <!-- ── Header ─────────────────────────────────────────── -->
  <header class="hdr">
    <div class="wrap-wide hdr-in">
      <a class="brand" href="#top">
        <img :src="mark" alt="" />
        <b>mzPeak</b>
      </a>
      <nav class="hdr-nav" :class="{ open: menuOpen }" @click="menuOpen = false">
        <a :href="withBase('/why')">Why mzPeak</a>
        <a :href="SPEC" target="_self">Specification</a>
        <a :href="withBase('/tools')">Tools</a>
        <a :href="withBase('/examples')">Try it</a>
        <a :href="withBase('/faq')">FAQ</a>
        <a :href="withBase('/roadmap')">Roadmap</a>
        <a :href="withBase('/about')">Governance</a>
      </nav>
      <div class="hdr-actions">
        <a class="hdr-gh" href="https://github.com/HUPO-PSI" aria-label="mzPeak on GitHub"><Github /></a>
        <button class="hdr-burger" type="button" @click="menuOpen = !menuOpen"
                :aria-expanded="menuOpen" aria-label="Toggle navigation menu">
          <X v-if="menuOpen" /><Menu v-else />
        </button>
      </div>
    </div>
    <div class="hdr-spectrum"></div>
  </header>

  <main id="main">

  <!-- ── Hero ───────────────────────────────────────────── -->
  <section class="hero" id="top">
    <div class="wrap-wide hero-in">
      <div>
        <a class="eyebrow hero-eyebrow" :href="withBase('/roadmap')" style="text-decoration:none" title="See the status &amp; roadmap"><span class="dot"></span> Open standard (under development) · HUPO-PSI</a>
        <h1>The modern<br />mass&nbsp;spectrometry<br /><span class="acc">data format</span></h1>
        <p class="hero-lead">Compact, fast, and cloud-native — a Parquet-in-ZIP successor to mzML. Losslessly smaller, and randomly addressable straight over HTTP.</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" :href="withBase('/examples')"><Play />Open a file in your browser</a>
          <a class="btn btn-secondary btn-lg" :href="WHITEPAPER"><FileText />Read the white paper</a>
        </div>
        <div class="hero-trust">
          <span>Governed by <b>HUPO-PSI</b></span>
          <span class="sep"></span>
          <span>Reference implementations across <b>seven languages</b></span>
        </div>
      </div>

      <!-- hero visual: figure carousel from the white paper / HUPO pitch deck -->
      <div class="shots" @mouseenter="stop" @mouseleave="start"
           role="group" aria-roledescription="carousel" aria-label="mzPeak in figures">
        <div class="shots-frame">
          <img v-for="(s, i) in slides" :key="i" class="shot-img"
               :class="{ on: i === current }" :src="withBase(s.src)" :alt="s.alt"
               :aria-hidden="i !== current" />
          <button class="shots-arrow prev" type="button" @click="prev" aria-label="Previous figure">‹</button>
          <button class="shots-arrow next" type="button" @click="next" aria-label="Next figure">›</button>
        </div>
        <div class="shots-bar">
          <span class="shots-cap">{{ slides[current].caption }}</span>
          <span class="shots-dots">
            <button class="shots-play" type="button" @click="togglePlay"
                    :aria-label="playing ? 'Pause figure slideshow' : 'Play figure slideshow'"
                    :aria-pressed="!playing">{{ playing ? '❚❚' : '▶' }}</button>
            <button v-for="(s, i) in slides" :key="i" type="button" class="dot"
                    :class="{ on: i === current }" @click="go(i)"
                    :aria-current="i === current"
                    :aria-label="`Show figure ${i + 1}: ${s.caption}`"></button>
          </span>
        </div>
      </div>
    </div>
  </section>


  <!-- ── Features ───────────────────────────────────────── -->
  <section class="sec" id="why">
    <div class="wrap">
      <div class="sec-head center">
        <span class="eyebrow"><span class="dot"></span> Why mzPeak</span>
        <h2>Built for today's data volumes</h2>
        <p>Everything mzML can describe, stored in a layout built for terabyte archives, cloud workflows, and AI pipelines.</p>
      </div>
      <div class="feat-grid">
        <div class="feat">
          <span class="feat-ico"><Minimize2 /></span>
          <h3>Compact</h3>
          <p>Columnar Parquet compression makes a file typically a fraction of the equivalent mzML and between 30–100% of vendor formats — lossless.</p>
          <span class="tag">0.18–0.57× · lossless</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><Cloud /></span>
          <h3>Cloud-native</h3>
          <p>Designed for S3-compatible object storage and data lakes. Random access fetches only the bytes you need — so you pay for less egress and move less data.</p>
          <span class="tag">S3 · data lake</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><Gauge /></span>
          <h3>Fast</h3>
          <p>Open a 3&nbsp;GB file and read any spectrum near-instantly — under 1s locally, under 2s from remote S3. Ion images and XICs extract in seconds, in the browser.</p>
          <span class="tag">1 spectrum from 3 GB · &lt; 2s</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><BrainCircuit /></span>
          <h3>AI-ready</h3>
          <p>Built on Apache Parquet, the native format of modern AI/ML stacks. Read directly by pandas, Polars, Spark &amp; Arrow — no custom parser — and stream columns straight from the data lake into training.</p>
          <span class="tag">pandas · Polars · Spark</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><Unlock /></span>
          <h3>Open &amp; interoperable</h3>
          <p>ZIP-of-Parquet is language-independent, and the semantics are anchored in the PSI-MS controlled vocabulary — with a versioned conformance profile and validator.</p>
          <span class="tag">PSI-MS · validated</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><Puzzle /></span>
          <h3>Extensible</h3>
          <p>First-class extensions for MS imaging (per-pixel spatial data) and sample metadata (SDRF / ISA) — the format grows by extension, never by incompatible forks.</p>
          <span class="tag">MSI · SDRF / ISA</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><ShieldCheck /></span>
          <h3>Secure</h3>
          <p>Parquet's modular encryption can protect individual columns or files with AES-GCM, leaving the rest of the archive readable. How sensitive index fields and post-quantum-safe schemes are handled is an open design question.</p>
          <span class="tag">AES-GCM · per-column</span>
        </div>
        <div class="feat">
          <span class="feat-ico"><ArrowLeftRight /></span>
          <h3>Backwards-compatible</h3>
          <p>Metadata aligns with the HUPO-PSI mzML standard, so lossless mzML&nbsp;↔&nbsp;mzPeak conversion is tested on hundreds of datasets — with ProteoWizard support in preparation.</p>
          <span class="tag">mzML ↔ mzPeak</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Anatomy ────────────────────────────────────────── -->
  <section class="sec sec-alt" id="format">
    <div class="wrap">
      <div class="anatomy">
        <div>
          <span class="eyebrow"><span class="dot"></span> The idea in one line</span>
          <h2>A ZIP archive of Parquet tables, plus a small JSON index</h2>
          <p>Columnar, compressed, randomly addressable, and self-describing. Everything a reader needs to find one spectrum — without parsing the whole run — lives in the manifest.</p>
          <p>New kinds of data attach through documented <em>entity-type</em> and <em>data-kind</em> mechanisms, so optical images, sample metadata, and provenance all ride along in the same container.</p>
        </div>
        <div class="archive">
          <div class="archive-top">
            <Package />
            <span class="mono">run.mzpeak</span>
            <span class="zip">ZIP container</span>
          </div>
          <div class="member">
            <span class="member-ico m-data"><Table2 /></span>
            <div><div class="nm">*_data.parquet</div><div class="ds">The signal — m/z + intensity (and ion-mobility) as sorted, compressed columns.</div></div>
          </div>
          <div class="member">
            <span class="member-ico m-meta"><Tags /></span>
            <div><div class="nm">metadata</div><div class="ds">Instrument, software, samples, run description, and CV declarations.</div></div>
          </div>
          <div class="member">
            <span class="member-ico m-index"><FileJson2 /></span>
            <div><div class="nm">mzpeak_index.json</div><div class="ds">The manifest — what members exist and how to find them.</div></div>
          </div>
          <div class="member">
            <span class="member-ico m-other"><Layers /></span>
            <div><div class="nm">Other members</div><div class="ds">Optional embedded artifacts — optical images, SDRF / ISA sample metadata, provenance.</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Performance (real benchmark corpus from the white paper) ── -->
  <section class="sec" id="performance">
    <div class="wrap">
      <div class="sec-head">
        <span class="eyebrow"><span class="dot"></span> Performance · measured</span>
        <h2 style="font-size:var(--text-h2);font-weight:600;margin-top:14px">A fraction of the size — losslessly</h2>
        <p style="margin-top:16px;font-size:var(--text-lead);color:var(--text-secondary);line-height:1.5">Real datasets across seven instrument classes. Each bar is the mzPeak file size relative to the equivalent mzML — on average about 0.37×, and as small as 0.18×.</p>
      </div>
      <div class="bench">
        <div class="bench-row">
          <div class="bench-nm">Thermo LTQ FT Ultra <em>FT-ICR</em><span>30.2 → 5.5 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:18%"></div></div>
          <div class="bench-x">0.18×</div>
        </div>
        <div class="bench-row">
          <div class="bench-nm">SCIEX ZenoTOF 7600<span>89.8 → 50.9 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:57%"></div></div>
          <div class="bench-x">0.57×</div>
        </div>
        <div class="bench-row">
          <div class="bench-nm">Thermo LTQ XL <em>ion trap</em><span>173.5 → 55.6 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:32%"></div></div>
          <div class="bench-x">0.32×</div>
        </div>
        <div class="bench-row">
          <div class="bench-nm">Thermo Orbitrap Velos<span>429.2 → 101.5 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:24%"></div></div>
          <div class="bench-x">0.24×</div>
        </div>
        <div class="bench-row">
          <div class="bench-nm">Thermo Fusion Lumos<span>588.6 → 156.5 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:27%"></div></div>
          <div class="bench-x">0.27×</div>
        </div>
        <div class="bench-row">
          <div class="bench-nm">Bruker timsTOF Pro<span>1386.5 → 677.2 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:49%"></div></div>
          <div class="bench-x">0.49×</div>
        </div>
        <div class="bench-row">
          <div class="bench-nm">Thermo Orbitrap Astral<span>6118.4 → 3359.4 MB</span></div>
          <div class="bench-track"><div class="bench-fill" style="width:55%"></div></div>
          <div class="bench-x">0.55×</div>
        </div>
        <div class="bench-foot">// mzPeak ÷ mzML file size · lower is better · public benchmark corpus, peak type preserved on conversion. Source: mzPeak white paper, J. Proteome Res. 2025.</div>
      </div>

    </div>
  </section>

  <!-- ── Ecosystem ──────────────────────────────────────── -->
  <section class="sec sec-alt" id="ecosystem">
    <div class="wrap">
      <div class="sec-head">
        <span class="eyebrow"><span class="dot"></span> Tools &amp; ecosystem</span>
        <h2>Everything around mzPeak is open source</h2>
        <p>A specification, reference readers and writers, converters, a conformance validator, and in-browser viewers. <a :href="withBase('/tools')">Browse the Build hub →</a></p>
      </div>
      <div class="eco-grid">
        <a class="eco" :href="SPEC" target="_self">
          <div class="eco-h"><BookMarked /><span class="nm">Specification</span><ArrowUpRight class="arrow" /></div>
          <p>The canonical format spec — JSON Schemas, controlled-vocabulary rules, and prose.</p>
        </a>
        <a class="eco" href="https://github.com/mobiusklein/mzpeak_prototyping">
          <div class="eco-h"><Binary /><span class="nm">Reference impl</span><ArrowUpRight class="arrow" /></div>
          <p>The <span class="mono">mzpeak_prototyping</span> reader/writer — direct conversion from Thermo RAW and Bruker .TDF.</p>
          <div class="langs"><span class="lang">Rust</span><span class="lang">Python</span><span class="lang">R</span><span class="lang">C#</span><span class="lang">Java</span><span class="lang">TypeScript</span><span class="lang">C++</span></div>
        </a>
        <a class="eco" href="https://github.com/okohlbacher/mzML2mzPeak">
          <div class="eco-h"><Repeat /><span class="nm">Converters</span><ArrowUpRight class="arrow" /></div>
          <p>Convert imzML / mzML to mzPeak and back, with full round-trip verification.</p>
        </a>
        <a class="eco" href="https://github.com/okohlbacher/mzPeakValidator">
          <div class="eco-h"><ShieldCheck2 /><span class="nm">Validator</span><ArrowUpRight class="arrow" /></div>
          <p>A language-independent, profile-driven conformance validator. <span class="mono">mzpeak-validate file.mzpeak</span></p>
        </a>
        <a class="eco" href="https://github.com/okohlbacher/mzpeakviewer" id="examples">
          <div class="eco-h"><Activity /><span class="nm">mzPeak Viewer</span><ArrowUpRight class="arrow" /></div>
          <p>Open any <span class="mono">.mzpeak</span> directly in your browser, streamed over HTTP — no upload, no backend. Spectra and chromatograms for LC-/GC-MS, ion images for MS-imaging (MSI).</p>
        </a>
      </div>
    </div>
  </section>

  <!-- ── CTA ────────────────────────────────────────────── -->
  <section class="cta">
    <div class="wrap cta-in">
      <span class="eyebrow hero-eyebrow"><span class="dot"></span> Open &amp; community-governed</span>
      <h2 style="margin-top:16px">Build on the format</h2>
      <p>mzPeak is developed as an open community effort under HUPO-PSI. The specification is language-independent — start from the spec, validate against the conformance profile, and ship.</p>
      <div class="cta-btns">
        <a class="btn btn-primary btn-lg" :href="SPEC" target="_self"><BookOpen />Read the specification</a>
        <a class="btn btn-secondary btn-lg" href="https://www.psidev.info/mzpeak"><ExternalLink />mzPeak at HUPO-PSI</a>
      </div>
    </div>
  </section>

  </main>

  <!-- ── Footer ─────────────────────────────────────────── -->
  <footer class="ftr">
    <div class="wrap-wide">
      <div class="ftr-in">
        <div>
          <a class="brand" href="#top"><img :src="mark" alt="" style="height:24px" /><b>mzPeak</b></a>
          <p class="ftr-tag">A next-generation open file format for mass spectrometry data — Parquet-in-ZIP, CV-governed by HUPO-PSI.</p>
        </div>
        <div class="ftr-cols">
          <div class="ftr-col">
            <h4>Learn</h4>
            <a :href="withBase('/why')">Why mzPeak</a>
            <a :href="SPEC" target="_self">Specification</a>
            <a :href="withBase('/faq')">FAQ</a>
            <a :href="withBase('/roadmap')">Roadmap</a>
            <a :href="withBase('/why') + '#how-to-cite'">How to cite</a>
            <a :href="WHITEPAPER">White paper</a>
          </div>
          <div class="ftr-col">
            <h4>Tools</h4>
            <a href="https://github.com/mobiusklein/mzpeak_prototyping">Reference impl</a>
            <a href="https://github.com/okohlbacher/mzML2mzPeak">Converter</a>
            <a href="https://github.com/okohlbacher/mzPeakValidator">Validator</a>
            <a href="https://github.com/okohlbacher/mzpeakviewer">Viewer</a>
          </div>
          <div class="ftr-col">
            <h4>Community</h4>
            <a href="https://www.psidev.info/">HUPO-PSI</a>
            <a href="https://github.com/HUPO-PSI">GitHub</a>
            <a :href="withBase('/supporters')">Supporters</a>
            <a :href="withBase('/contact')">Contact</a>
          </div>
        </div>
      </div>
      <div class="ftr-base">
        <span>© 2026 HUPO Proteomics Standards Initiative · Specification v0.9 — HUPO-PSI standardization from 2026</span>
        <span class="mono">ZIP · Apache Parquet · PSI-MS CV</span>
      </div>
    </div>
  </footer>

</div>
</template>

<style scoped>
/* ============================================================
   mzPeak — marketing landing styles (ported from the design
   handoff's website.css). `scoped` keeps every selector here on
   the landing page so nothing leaks onto the default-theme doc
   pages (e.g. VitePress's own .lang code-block label).
   ============================================================ */

/* Visually-hidden skip link that becomes visible on focus. */
.skip {
  position: absolute; left: 12px; top: -48px; z-index: 100;
  padding: 8px 14px; border-radius: var(--radius-md);
  background: var(--accent); color: #fff; font-size: var(--text-md);
  font-weight: var(--weight-semibold); text-decoration: none;
  transition: top var(--dur-fast) var(--ease-standard);
}
.skip:focus { top: 12px; }

.site { font-family: var(--font-sans); color: var(--text-body); }
.site svg { stroke-width: 1.5; }
.wrap { max-width: var(--maxw-content); margin: 0 auto; padding: 0 24px; }
.wrap-wide { max-width: var(--maxw-wide); margin: 0 auto; padding: 0 24px; }
.site section { position: relative; }
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: var(--text-sm); font-weight: var(--weight-semibold);
  text-transform: uppercase; letter-spacing: var(--tracking-caps);
  color: var(--accent); white-space: nowrap;
}
.eyebrow .dot { width: 6px; height: 6px; border-radius: 999px; background: var(--accent); }
.site h1, .site h2, .site h3 { color: var(--text-heading); letter-spacing: var(--tracking-tight); line-height: 1.2; margin: 0; }
.mono { font-family: var(--font-mono); }

/* ── Header ─────────────────────────────────────────────── */
.hdr {
  position: sticky; top: 0; z-index: 50;
  background: rgba(255,255,255,0.82); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-default);
}
.hdr-in { display: flex; align-items: center; gap: 28px; height: 64px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.brand img { height: 26px; display: block; }
.brand b { font-size: 18px; font-weight: var(--weight-semibold); color: var(--text-heading); letter-spacing: -0.01em; }
.hdr-nav { display: flex; gap: 22px; margin-left: auto; }
.hdr-nav a { font-size: var(--text-md); font-weight: var(--weight-medium); color: var(--text-secondary); text-decoration: none; transition: var(--transition-ui); }
.hdr-nav a:hover { color: var(--accent); }
.hdr-actions { display: flex; align-items: center; gap: 12px; }
.hdr-gh { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; color: var(--text-secondary); border-radius: var(--radius-md); transition: var(--transition-ui); }
.hdr-gh:hover { color: var(--accent); }
.hdr-gh svg { width: 20px; height: 20px; }
.hdr-burger { display: none; align-items: center; justify-content: center; width: 38px; height: 38px; padding: 0; border: 0; background: transparent; color: var(--text-heading); cursor: pointer; border-radius: var(--radius-md); }
.hdr-burger svg { width: 22px; height: 22px; }
.hdr-burger:hover { color: var(--accent); }
.hdr-spectrum { height: 2px; background: var(--openms-spectrum); }

/* ── Buttons ────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-sans); font-size: var(--text-md); font-weight: var(--weight-semibold);
  padding: 10px 18px; border-radius: var(--radius-md); border: 1px solid transparent;
  cursor: pointer; text-decoration: none; transition: var(--transition-ui), transform var(--dur-fast) var(--ease-standard);
  white-space: nowrap;
}
.btn svg { width: 16px; height: 16px; }
.btn-primary { background: var(--accent); color: var(--text-on-accent); border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.btn-secondary { background: var(--surface-card); color: var(--gray-700); border-color: var(--border-strong); }
.btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
.btn-ghost { background: transparent; color: var(--text-secondary); }
.btn-ghost:hover { color: var(--accent); }
.btn-lg { font-size: var(--text-section); padding: 13px 24px; }
/* ── Hero (light) ───────────────────────────────────────── */
.hero {
  background: linear-gradient(180deg, var(--gray-0) 0%, var(--gray-25) 100%);
  color: var(--text-body);
  overflow: hidden;
  border-bottom: 1px solid var(--border-default);
}
.hero::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(120% 80% at 78% -10%, rgba(49,87,233,0.08), transparent 60%);
  pointer-events: none;
}
.hero-in { position: relative; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: center; padding: 92px 0 84px; }
.hero h1 { color: var(--text-heading); font-size: var(--text-hero); font-weight: var(--weight-semibold); line-height: 1.02; }
.hero h1 .acc { color: var(--accent); }
.hero-lead { margin: 22px 0 0; font-size: var(--text-lead); line-height: 1.5; color: var(--text-secondary); max-width: 33ch; }
.hero-cta { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
.hero-eyebrow { color: var(--accent); }
.hero-eyebrow .dot { background: var(--accent); }
.hero-trust { margin-top: 36px; display: flex; align-items: center; gap: 14px; font-size: var(--text-sm); color: var(--text-muted); flex-wrap: wrap; }
.hero-trust .sep { width: 1px; height: 12px; background: var(--border-strong); }
.hero-trust b { color: var(--text-secondary); font-weight: var(--weight-medium); }

/* hero visual — figure carousel */
.shots { display: flex; flex-direction: column; gap: 12px; }
.shots-frame {
  position: relative; aspect-ratio: 16 / 9; background: #fff;
  border: 1px solid var(--border-default); border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2); overflow: hidden;
}
.shot-img {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: contain; display: block; background: #fff;
  opacity: 0; transition: opacity 0.45s ease;
}
.shot-img.on { opacity: 1; }
.shots-arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;
  font-size: 22px; line-height: 1; color: #fff; cursor: pointer; opacity: 0;
  background: rgba(13,17,22,0.55); border: 1px solid rgba(255,255,255,0.18); border-radius: 999px;
  transition: var(--transition-ui), opacity var(--dur-fast) var(--ease-standard);
}
.shots-frame:hover .shots-arrow, .shots-arrow:focus-visible { opacity: 1; }
.shots-arrow:hover { background: var(--accent); border-color: var(--accent); }
.shots-arrow.prev { left: 10px; }
.shots-arrow.next { right: 10px; }
.shots-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.shots-cap { font-size: var(--text-sm); color: var(--text-muted); }
.shots-dots { display: flex; gap: 8px; }
.shots-dots .dot {
  width: 8px; height: 8px; padding: 0; border: 0; border-radius: 999px; cursor: pointer;
  background: var(--border-strong); transition: var(--transition-ui);
}
.shots-dots .dot.on { background: var(--accent); }
.shots-dots .dot:hover { background: var(--text-muted); }
.shots-play {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; padding: 0; margin-right: 6px;
  border: 0; background: transparent; cursor: pointer;
  font-size: 9px; line-height: 1; color: var(--text-muted); transition: var(--transition-ui);
}
.shots-play:hover { color: var(--accent); }
@media (prefers-reduced-motion: reduce) { .shot-img { transition: none; } }

/* ── Stat band (light) ──────────────────────────────────── */
.stats { background: var(--gray-25); border-top: 1px solid var(--border-soft); border-bottom: 1px solid var(--border-soft); }
.stats-in { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border-default); }
.stat { background: var(--gray-25); padding: 30px 24px; }
.stat .v { font-family: var(--font-mono); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: var(--weight-semibold); color: var(--text-heading); letter-spacing: -0.02em; }
.stat .v .u { color: var(--accent); }
.stat .k { margin-top: 6px; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); }

/* ── Generic section ────────────────────────────────────── */
.sec { padding: 88px 0; }
.sec-alt { background: var(--gray-25); border-top: 1px solid var(--border-soft); border-bottom: 1px solid var(--border-soft); }
.sec-head { max-width: 640px; margin-bottom: 44px; }
.sec-head.center { margin-left: auto; margin-right: auto; text-align: center; }
.sec-head h2 { font-size: var(--text-h2); font-weight: var(--weight-semibold); margin-top: 14px; }
.sec-head p { margin: 16px 0 0; font-size: var(--text-lead); color: var(--text-secondary); line-height: 1.5; }

/* ── Feature grid ───────────────────────────────────────── */
.feat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.feat {
  background: var(--surface-card); border: 1px solid var(--border-default);
  border-radius: var(--radius-xl); padding: 28px; transition: var(--transition-ui), transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
}
.feat:hover { transform: translateY(-3px); box-shadow: var(--shadow-3); border-color: var(--border-strong); }
.feat-ico {
  width: 44px; height: 44px; border-radius: var(--radius-md);
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--accent-soft); color: var(--accent); margin-bottom: 18px;
}
.feat-ico svg { width: 22px; height: 22px; }
.feat h3 { font-size: var(--text-title); font-weight: var(--weight-semibold); }
.feat p { margin: 10px 0 0; font-size: var(--text-md); color: var(--text-secondary); line-height: 1.55; }
.feat .tag { margin-top: 14px; display: inline-block; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--accent-active); background: var(--accent-soft); padding: 3px 9px; border-radius: var(--radius-pill); }

/* ── Anatomy ────────────────────────────────────────────── */
.anatomy { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
.anatomy h2 { font-size: var(--text-h2); font-weight: var(--weight-semibold); margin-top: 14px; }
.anatomy p { margin: 16px 0 0; font-size: var(--text-md); color: var(--text-secondary); line-height: 1.6; }
.archive {
  background: var(--surface-card); border: 1px solid var(--border-default);
  border-radius: var(--radius-lg); padding: 16px; box-shadow: var(--shadow-2);
}
.archive-top { display: flex; align-items: center; gap: 8px; padding: 4px 6px 14px; border-bottom: 1px dashed var(--border-strong); margin-bottom: 12px; color: var(--text-muted); }
.archive-top .mono { color: var(--text-heading); font-weight: var(--weight-semibold); font-size: var(--text-md); }
.archive-top .zip { margin-left: auto; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--accent); background: var(--accent-soft); border-radius: var(--radius-pill); padding: 2px 9px; }
.member { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border-radius: var(--radius-md); transition: var(--transition-ui); }
.member:hover { background: var(--surface-panel); }
.member + .member { margin-top: 2px; }
.member-ico { width: 30px; height: 30px; border-radius: var(--radius-sm); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.member-ico svg { width: 16px; height: 16px; }
.member .nm { font-family: var(--font-mono); font-size: var(--text-md); color: var(--text-heading); font-weight: var(--weight-medium); }
.member .ds { font-size: var(--text-sm); color: var(--text-muted); margin-top: 2px; line-height: var(--leading-snug); }
.m-data { background: var(--accent-soft); color: var(--accent); }
.m-meta { background: #f6ecfb; color: var(--openms-purple); }
.m-index { background: #e7f3e8; color: var(--green-700); }
.m-other { background: var(--surface-panel); color: var(--text-muted); }

/* ── Data families (mzML2mzPeak corpus overview figures) ─── */
.families { margin-top: 72px; }
.families-head { max-width: 680px; }
.families-head h3 { font-size: clamp(1.4rem, 2vw, 1.75rem); font-weight: var(--weight-semibold); margin-top: 14px; }
.families-head p { margin: 16px 0 0; font-size: var(--text-md); color: var(--text-secondary); line-height: 1.6; }
.families-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 36px; }
.family {
  margin: 0; display: flex; flex-direction: column;
  background: var(--surface-card); border: 1px solid var(--border-default);
  border-radius: var(--radius-lg); padding: 14px;
  transition: var(--transition-ui), transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
}
.family:hover { transform: translateY(-2px); box-shadow: var(--shadow-2); border-color: var(--border-strong); }
.family a { display: block; }
.family img { width: 100%; height: auto; display: block; border-radius: var(--radius-md); background: #fff; }
.family figcaption { padding: 14px 6px 4px; }
.family .fam-name { font-size: var(--text-title); font-weight: var(--weight-semibold); color: var(--text-heading); }
.family figcaption p { margin: 6px 0 0; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); }

/* ── Benchmark chart (real corpus) ──────────────────────── */
.bench { margin-top: 46px; display: flex; flex-direction: column; gap: 13px; }
.bench-row { display: grid; grid-template-columns: 244px 1fr 66px; gap: 20px; align-items: center; }
.bench-nm { font-size: var(--text-md); font-weight: var(--weight-semibold); color: var(--text-heading); display: flex; flex-direction: column; line-height: 1.25; }
.bench-nm em { font-style: normal; font-weight: 400; color: var(--text-muted); font-size: var(--text-sm); }
.bench-nm span { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 400; color: var(--text-muted); margin-top: 3px; }
.bench-track { height: 28px; background: var(--surface-panel); border: 1px solid var(--border-soft); border-radius: var(--radius-sm); overflow: hidden; }
.bench-fill { height: 100%; background: var(--accent); border-radius: var(--radius-sm) 0 0 var(--radius-sm); min-width: 4px; }
.bench-x { font-family: var(--font-mono); font-size: var(--text-section); font-weight: var(--weight-semibold); color: var(--accent); text-align: right; }
.bench-foot { margin-top: 10px; padding-top: 14px; border-top: 1px solid var(--border-soft); font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-muted); line-height: 1.5; }

/* ── Ecosystem ──────────────────────────────────────────── */
.eco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.eco {
  display: block; text-decoration: none; background: var(--surface-card);
  border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 22px;
  transition: var(--transition-ui), transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
}
.eco:hover { transform: translateY(-2px); box-shadow: var(--shadow-2); border-color: var(--accent); }
.eco-h { display: flex; align-items: center; gap: 10px; }
.eco-h svg { width: 18px; height: 18px; color: var(--accent); }
.eco-h .nm { font-size: var(--text-title); font-weight: var(--weight-semibold); color: var(--text-heading); }
.eco-h .arrow { margin-left: auto; color: var(--text-faint); transition: var(--transition-ui); }
.eco:hover .arrow { color: var(--accent); }
.eco p { margin: 10px 0 0; font-size: var(--text-md); color: var(--text-secondary); line-height: 1.5; }
.eco .langs { margin-top: 12px; display: flex; gap: 6px; flex-wrap: wrap; }
.lang { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-secondary); border: 1px solid var(--border-default); border-radius: var(--radius-pill); padding: 2px 9px; }
.lang.soon { color: var(--text-faint); border-style: dashed; }

/* ── CTA ────────────────────────────────────────────────── */
.cta { background: linear-gradient(180deg, var(--blue-50) 0%, var(--gray-25) 100%); color: var(--text-body); text-align: center; overflow: hidden; border-top: 1px solid var(--border-soft); border-bottom: 1px solid var(--border-soft); }
.cta::before { content: ""; position: absolute; inset: 0; background: radial-gradient(100% 80% at 50% -10%, rgba(49,87,233,0.10), transparent 65%); pointer-events: none; }
.cta-in { position: relative; padding: 92px 0; }
.cta h2 { color: var(--text-heading); font-size: var(--text-h1); font-weight: var(--weight-semibold); }
.cta p { margin: 18px auto 0; max-width: 52ch; font-size: var(--text-lead); color: var(--text-secondary); line-height: 1.5; }
.cta-btns { margin-top: 34px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── Footer ─────────────────────────────────────────────── */
.ftr { background: var(--gray-25); color: var(--text-muted); padding: 52px 0 40px; border-top: 1px solid var(--border-default); }
.ftr-in { display: flex; gap: 40px; flex-wrap: wrap; justify-content: space-between; }
.ftr .brand b { color: var(--text-heading); }
.ftr .brand img { filter: none; }
.ftr-tag { margin-top: 14px; max-width: 30ch; font-size: var(--text-sm); line-height: 1.5; }
.ftr-cols { display: flex; gap: 56px; flex-wrap: wrap; }
.ftr-col h4 { font-size: var(--text-sm); text-transform: uppercase; letter-spacing: var(--tracking-caps); color: var(--text-secondary); margin: 0 0 14px; }
.ftr-col a { display: block; font-size: var(--text-md); color: var(--text-muted); text-decoration: none; margin-bottom: 9px; transition: var(--transition-ui); }
.ftr-col a:hover { color: var(--accent); }
.ftr-base { border-top: 1px solid var(--border-default); margin-top: 40px; padding-top: 22px; font-size: var(--text-sm); display: flex; gap: 16px; justify-content: space-between; flex-wrap: wrap; }

/* ── Responsive ─────────────────────────────────────────── */
@media (max-width: 920px) {
  .hero-in { grid-template-columns: 1fr; gap: 40px; padding: 64px 0 56px; }
  .hero-lead { max-width: none; }
  .stats-in { grid-template-columns: repeat(2, 1fr); }
  .feat-grid { grid-template-columns: 1fr; }
  .anatomy { grid-template-columns: 1fr; gap: 36px; }
  .families-grid { grid-template-columns: 1fr; max-width: 460px; }
  .bench-row { grid-template-columns: 150px 1fr 52px; gap: 12px; }
  .bench-x { font-size: var(--text-md); }
  .eco-grid { grid-template-columns: 1fr; }
  /* mobile: collapse the nav into a hamburger dropdown */
  .hdr-burger { display: inline-flex; }
  .hdr-nav {
    display: none; position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; align-items: stretch; gap: 0; margin: 0;
    padding: 6px 24px 14px;
    background: rgba(255,255,255,0.97); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-default); box-shadow: var(--shadow-2);
  }
  .hdr-nav.open { display: flex; }
  .hdr-nav a { padding: 12px 2px; font-size: var(--text-section); }
  .hdr-nav a + a { border-top: 1px solid var(--border-soft); }
}
@media (max-width: 600px) {
  .hdr-in { gap: 12px; }
  .btn-lg { font-size: var(--text-md); padding: 11px 18px; }
}
@media (max-width: 520px) {
  .stats-in { grid-template-columns: 1fr; }
  .sec { padding: 60px 0; }
}
</style>
