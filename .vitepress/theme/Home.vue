<script setup lang="ts">
import { withBase } from 'vitepress'
import {
  BookOpen, Github, FileText, Play,
  Minimize2, Cloud, Gauge, BrainCircuit, Unlock, Puzzle, ShieldCheck, ArrowLeftRight,
  Package, Table2, Tags, FileJson2, Layers,
  BookMarked, Binary, Repeat, ShieldCheck as ShieldCheck2, Activity, Grid2x2,
  ArrowUpRight, ExternalLink,
} from 'lucide-vue-next'

const mark = withBase('/mark.png')

// We do not host the specification on mzpeak.org — it lives in the separate
// HUPO-PSI spec repo. Point every "Specification" affordance there.
const SPEC = 'https://hupo-psi.github.io/mzPeak-specification/'
const WHITEPAPER = 'https://pubs.acs.org/doi/full/10.1021/acs.jproteome.5c00435'
const EXAMPLES = 'https://object.storage.eu01.onstackit.cloud/v09/index.html'

// The three real, public dataset families in the mzML2mzPeak example corpus,
// each with its "size through the conversion chain" overview figure.
const families = [
  {
    img: '/figures/mass-spec-ratios.png',
    href: 'https://object.storage.eu01.onstackit.cloud/v09/mass-spec.html',
    name: 'General MS data',
    w: 941, h: 751,
    alt: 'Compression overview for general MS data: raw 100%, mzML ~181%, mzPeak ~50%.',
    desc: 'LC-/GC-MS across six instrument vendors. mzML typically inflates past the vendor raw file; mzPeak lands at about half of it.',
  },
  {
    img: '/figures/imaging-ratios.png',
    href: 'https://object.storage.eu01.onstackit.cloud/v09/imaging.html',
    name: 'Imaging MS (MSI)',
    w: 772, h: 751,
    alt: 'Compression overview for imaging MS: raw 100%, mzPeak ~35%.',
    desc: 'imzML imaging runs with per-pixel coordinates and embedded optical images — the whole image at roughly a third of the source.',
  },
  {
    img: '/figures/sdrf-ratios.png',
    href: 'https://object.storage.eu01.onstackit.cloud/v09/sdrf.html',
    name: 'Study-design embedding',
    w: 941, h: 751,
    alt: 'Compression overview for study-design datasets: raw 100%, mzML ~194%, mzPeak ~45%.',
    desc: 'Studies that carry their SDRF / ISA sample annotation alongside the data — kept in the archive, still near 45%.',
  },
]
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
      <nav class="hdr-nav">
        <a href="#format">Format</a>
        <a href="#performance">Performance</a>
        <a href="#ecosystem">Ecosystem</a>
        <a href="#examples">Examples</a>
      </nav>
      <div class="hdr-actions">
        <a class="btn btn-ghost" :href="SPEC"><BookOpen />Specification</a>
        <a class="btn btn-primary" href="https://github.com/HUPO-PSI"><Github />GitHub</a>
      </div>
    </div>
    <div class="hdr-spectrum"></div>
  </header>

  <main id="main">

  <!-- ── Hero ───────────────────────────────────────────── -->
  <section class="hero on-dark" id="top">
    <div class="wrap-wide hero-in">
      <div>
        <span class="eyebrow hero-eyebrow"><span class="dot"></span> Open standard · HUPO-PSI</span>
        <h1>The modern<br />mass&nbsp;spectrometry<br /><span class="acc">data format</span></h1>
        <p class="hero-lead">Compact, fast, and cloud-native — a Parquet-in-ZIP successor to mzML. Losslessly smaller, and randomly addressable straight over HTTP.</p>
        <div class="hero-cta">
          <a class="btn btn-primary btn-lg" :href="WHITEPAPER"><FileText />Read the white paper</a>
          <a class="btn btn-secondary btn-lg" :href="EXAMPLES"><Play />Browse live examples</a>
        </div>
        <div class="hero-trust">
          <span>Governed by <b>HUPO-PSI</b></span>
          <span class="sep"></span>
          <span>Reference implementations across <b>seven languages</b></span>
        </div>
      </div>

      <!-- hero visual: a spectrum on the data stage -->
      <div class="scope">
        <div class="scope-bar">
          <span class="t">spectrum</span>
          <span class="scope-tag">MS1 · profile</span>
          <span class="grow"></span>
          <span class="t mono">12_80.mzpeak</span>
        </div>
        <div class="scope-body">
          <div class="scope-read"><span class="k">m/z</span> 478.9213 · <span class="k">int</span> 1.42e8</div>
          <svg class="spec" viewBox="0 0 560 220" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="specfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(49,87,233,0.34)" />
                <stop offset="100%" stop-color="rgba(49,87,233,0)" />
              </linearGradient>
            </defs>
            <path class="spec-area" d="M0,212 L40,210 L80,205 L120,206 L150,180 L170,150 L185,196 L210,202 L240,120 L255,40 L268,150 L290,200 L320,188 L350,196 L380,150 L400,96 L412,18 L424,110 L450,190 L480,200 L520,208 L560,212 L560,220 L0,220 Z" />
            <path class="spec-line" d="M0,212 L40,210 L80,205 L120,206 L150,180 L170,150 L185,196 L210,202 L240,120 L255,40 L268,150 L290,200 L320,188 L350,196 L380,150 L400,96 L412,18 L424,110 L450,190 L480,200 L520,208 L560,212" />
            <line class="spec-marker" x1="412" y1="18" x2="412" y2="212" />
          </svg>
          <div class="scope-axis"><span>120</span><span>500</span><span>900</span><span>1400</span><span>1804 m/z</span></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Stat band ──────────────────────────────────────── -->
  <section class="stats">
    <div class="wrap-wide stats-in">
      <div class="stat"><div class="v">0.1–0.6<span class="u">×</span></div><div class="k">the size of the equivalent mzML — losslessly</div></div>
      <div class="stat"><div class="v">1 <span class="u">spectrum</span></div><div class="k">streamed from a multi-gigabyte file, no download</div></div>
      <div class="stat"><div class="v">7 <span class="u">langs</span></div><div class="k">reference SDKs — Rust, Python, R, C#, Java, TypeScript, C++</div></div>
      <div class="stat"><div class="v">100<span class="u">%</span></div><div class="k">CV-governed by the PSI-MS controlled vocabulary</div></div>
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
          <p>Columnar Parquet compression makes a file typically a fraction of the equivalent mzML — without losing a single data point.</p>
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
          <span class="tag">3 GB in &lt; 2s</span>
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
          <p>Encrypt any part of the file column-by-column — so sensitive clinical data is protected at rest, with TLS in transit. Uses AES-GCM with post-quantum-safe encryption.</p>
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

      <div class="families">
        <div class="families-head">
          <span class="eyebrow"><span class="dot"></span> Across the full corpus · three data families</span>
          <h3>The same pattern, across real datasets</h3>
          <p>The bars above are individual files; these plots summarise the full public mzML2mzPeak corpus across three kinds of data. Each tracks file size along the conversion chain — vendor raw at 100% — so the trend is easy to read: mzML often grows past the raw file, while mzPeak consistently shrinks it.</p>
        </div>
        <div class="families-grid">
          <figure class="family" v-for="f in families" :key="f.img">
            <a :href="f.href" target="_blank" rel="noopener">
              <img :src="withBase(f.img)" :alt="f.alt" loading="lazy" :width="f.w" :height="f.h" />
            </a>
            <figcaption>
              <span class="fam-name">{{ f.name }}</span>
              <p>{{ f.desc }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Ecosystem ──────────────────────────────────────── -->
  <section class="sec sec-alt" id="ecosystem">
    <div class="wrap">
      <div class="sec-head">
        <span class="eyebrow"><span class="dot"></span> Tools &amp; ecosystem</span>
        <h2>Everything around mzPeak is open source</h2>
        <p>A specification, reference readers and writers, converters, a conformance validator, and in-browser viewers.</p>
      </div>
      <div class="eco-grid">
        <a class="eco" :href="SPEC">
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
        <a class="eco" href="https://github.com/okohlbacher/mzPeakExplorer" id="examples">
          <div class="eco-h"><Activity /><span class="nm">mzPeak Explorer</span><ArrowUpRight class="arrow" /></div>
          <p>Open any <span class="mono">.mzpeak</span> directly in your browser, streamed over HTTP — no upload, no backend.</p>
        </a>
        <a class="eco" href="https://github.com/okohlbacher/mzPeakIV">
          <div class="eco-h"><Grid2x2 /><span class="nm">mzPeakIV</span><ArrowUpRight class="arrow" /></div>
          <p>An imaging viewer for MS-imaging (MSI) datasets — render ion images, click pixels to inspect spectra.</p>
        </a>
      </div>
    </div>
  </section>

  <!-- ── CTA ────────────────────────────────────────────── -->
  <section class="cta on-dark">
    <div class="wrap cta-in">
      <span class="eyebrow hero-eyebrow"><span class="dot"></span> Open &amp; community-governed</span>
      <h2 style="margin-top:16px">Build on the format</h2>
      <p>mzPeak is developed as an open community effort under HUPO-PSI. The specification is language-independent — start from the spec, validate against the conformance profile, and ship.</p>
      <div class="cta-btns">
        <a class="btn btn-primary btn-lg" :href="SPEC"><BookOpen />Read the specification</a>
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
            <h4>Format</h4>
            <a href="#format">What's inside</a>
            <a href="#performance">Performance</a>
            <a :href="SPEC">Specification</a>
            <a :href="WHITEPAPER">White paper</a>
          </div>
          <div class="ftr-col">
            <h4>Tools</h4>
            <a href="https://github.com/mobiusklein/mzpeak_prototyping">Reference impl</a>
            <a href="https://github.com/okohlbacher/mzML2mzPeak">Converter</a>
            <a href="https://github.com/okohlbacher/mzPeakValidator">Validator</a>
            <a href="https://github.com/okohlbacher/mzPeakExplorer">Explorer</a>
          </div>
          <div class="ftr-col">
            <h4>Community</h4>
            <a href="https://www.psidev.info/">HUPO-PSI</a>
            <a href="https://github.com/HUPO-PSI">GitHub</a>
            <a href="https://www.psidev.info/mailing-lists">Discuss</a>
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
.hdr-in { display: flex; align-items: center; gap: 28px; height: 60px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.brand img { height: 26px; display: block; }
.brand b { font-size: 18px; font-weight: var(--weight-semibold); color: var(--text-heading); letter-spacing: -0.01em; }
.hdr-nav { display: flex; gap: 22px; margin-left: 8px; }
.hdr-nav a { font-size: var(--text-md); font-weight: var(--weight-medium); color: var(--text-secondary); text-decoration: none; transition: var(--transition-ui); }
.hdr-nav a:hover { color: var(--accent); }
.hdr-actions { margin-left: auto; display: flex; align-items: center; gap: 12px; }
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
/* on dark */
.on-dark .btn-secondary { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.22); }
.on-dark .btn-secondary:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,0.12); }
.on-dark .btn-ghost { color: var(--text-on-stage); }
.on-dark .btn-ghost:hover { color: #fff; }

/* ── Hero (dark data stage) ─────────────────────────────── */
.hero {
  background-color: var(--ink);
  background-image: radial-gradient(rgba(86,117,240,0.12) 1px, transparent 1px);
  background-size: 22px 22px;
  color: var(--text-on-stage);
  overflow: hidden;
  border-bottom: 1px solid var(--ink-line);
}
.hero::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(120% 80% at 70% 0%, rgba(49,87,233,0.30), transparent 60%);
  pointer-events: none;
}
.hero-in { position: relative; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 48px; align-items: center; padding: 92px 0 84px; }
.hero h1 { color: #fff; font-size: var(--text-hero); font-weight: var(--weight-semibold); line-height: 1.02; }
.hero h1 .acc { color: var(--blue-300); }
.hero-lead { margin: 22px 0 0; font-size: var(--text-lead); line-height: 1.5; color: #c2cbd6; max-width: 33ch; }
.hero-cta { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
.hero-eyebrow { color: #9fb0f5; }
.hero-eyebrow .dot { background: #9fb0f5; }
.hero-trust { margin-top: 36px; display: flex; align-items: center; gap: 14px; font-size: var(--text-sm); color: var(--text-on-stage-muted); flex-wrap: wrap; }
.hero-trust .sep { width: 1px; height: 12px; background: var(--ink-line); }
.hero-trust b { color: #c2cbd6; font-weight: var(--weight-medium); }

/* hero visual — framed spectrum panel */
.scope {
  position: relative; background: rgba(13,17,22,0.6); border: 1px solid var(--ink-line);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-pop); overflow: hidden;
}
.scope-bar { display: flex; align-items: center; gap: 7px; padding: 9px 12px; border-bottom: 1px solid var(--ink-line); }
.scope-bar .t { font-family: var(--font-mono); font-size: 11px; color: var(--text-on-stage-muted); }
.scope-bar .grow { flex: 1; }
.scope-tag { font-family: var(--font-mono); font-size: 10px; color: var(--blue-300); border: 1px solid rgba(86,117,240,0.40); border-radius: 999px; padding: 2px 8px; }
.scope-body { position: relative; padding: 10px 12px 4px; }
.scope-read {
  position: absolute; top: 14px; right: 16px; z-index: 3;
  font-family: var(--font-mono); font-size: 11px; color: #fff;
  background: var(--tooltip-bg); border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-xs); padding: 4px 8px; line-height: 1.4;
}
.scope-read .k { color: var(--text-on-stage-muted); }
.scope svg.spec { display: block; width: 100%; height: 220px; }
.spec-line { fill: none; stroke: var(--blue-400); stroke-width: 2; }
.spec-area { fill: url(#specfill); stroke: none; }
.spec-marker { stroke: var(--signal); stroke-width: 1.5; stroke-dasharray: 4 4; }
.scope-axis { display: flex; justify-content: space-between; padding: 2px 12px 10px; font-family: var(--font-mono); font-size: 10px; color: var(--text-on-stage-muted); }

@media (prefers-reduced-motion: no-preference) {
  .spec-line { stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: draw 2.2s var(--ease-standard) 0.2s forwards; }
  .spec-area { opacity: 0; animation: fadein 1.2s ease 1.6s forwards; }
  @keyframes draw { to { stroke-dashoffset: 0; } }
  @keyframes fadein { to { opacity: 1; } }
}

/* ── Stat band ──────────────────────────────────────────── */
.stats { background: var(--gray-900); color: #fff; border-bottom: 1px solid var(--ink-line); }
.stats-in { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ink-line); }
.stat { background: var(--gray-900); padding: 30px 24px; }
.stat .v { font-family: var(--font-mono); font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: var(--weight-semibold); color: #fff; letter-spacing: -0.02em; }
.stat .v .u { color: var(--blue-300); }
.stat .k { margin-top: 6px; font-size: var(--text-sm); color: #8b97a3; line-height: var(--leading-snug); }

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
.cta { background-color: var(--ink); background-image: radial-gradient(rgba(86,117,240,0.12) 1px, transparent 1px); background-size: 22px 22px; color: #fff; text-align: center; overflow: hidden; }
.cta::before { content: ""; position: absolute; inset: 0; background: radial-gradient(100% 80% at 50% 0%, rgba(49,87,233,0.32), transparent 65%); pointer-events: none; }
.cta-in { position: relative; padding: 92px 0; }
.cta h2 { color: #fff; font-size: var(--text-h1); font-weight: var(--weight-semibold); }
.cta p { margin: 18px auto 0; max-width: 52ch; font-size: var(--text-lead); color: #c2cbd6; line-height: 1.5; }
.cta-btns { margin-top: 34px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── Footer ─────────────────────────────────────────────── */
.ftr { background: var(--gray-900); color: #8b97a3; padding: 52px 0 40px; }
.ftr-in { display: flex; gap: 40px; flex-wrap: wrap; justify-content: space-between; }
.ftr .brand b { color: #fff; }
.ftr .brand img { filter: none; }
.ftr-tag { margin-top: 14px; max-width: 30ch; font-size: var(--text-sm); line-height: 1.5; }
.ftr-cols { display: flex; gap: 56px; flex-wrap: wrap; }
.ftr-col h4 { font-size: var(--text-sm); text-transform: uppercase; letter-spacing: var(--tracking-caps); color: #c2cbd6; margin: 0 0 14px; }
.ftr-col a { display: block; font-size: var(--text-md); color: #8b97a3; text-decoration: none; margin-bottom: 9px; transition: var(--transition-ui); }
.ftr-col a:hover { color: #fff; }
.ftr-base { border-top: 1px solid var(--ink-line); margin-top: 40px; padding-top: 22px; font-size: var(--text-sm); display: flex; gap: 16px; justify-content: space-between; flex-wrap: wrap; }

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
  .hdr-nav { display: none; }
}
@media (max-width: 520px) {
  .stats-in { grid-template-columns: 1fr; }
  .sec { padding: 60px 0; }
}
</style>
