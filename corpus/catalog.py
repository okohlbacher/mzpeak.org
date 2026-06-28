#!/usr/bin/env python3
"""Read/write the per-subset `_catalog.md` description files that live IN the data
tree (default ~/Claude/mzPeak/data, override $MZPEAK_DATA).

One `_catalog.md` per subset directory holds what used to be the hardcoded
`SUBSETS` + `DATASETS` dicts in make-s3-index.py:

    <data>/<prefix>/_catalog.md
    ---
    slug: mass-spec
    title: General MS Data
    icon: 📈
    accent: #1558d6
    imaging: false
    order: 1
    ---
    <blurb — one paragraph>

    <prov — one paragraph, optional>

    ## datasets

    ### <dataset-dir-name>
    <per-dataset description>

`load_catalogs()` is the inverse of `write_catalogs()` — round-tripping the real
dicts through the .md files is byte-stable (the migrator asserts it). Stdlib only.
"""
import os, re
from collections import OrderedDict

DEFAULT_DATA = os.path.expanduser("~/Claude/mzPeak/data")


def data_dir():
    return os.environ.get("MZPEAK_DATA", DEFAULT_DATA)


# ---- write (migration: dicts -> .md) ---------------------------------------
def _front(meta, order):
    return (
        "---\n"
        f"slug: {meta['slug']}\n"
        f"title: {meta['title']}\n"
        f"icon: {meta['icon']}\n"
        f"accent: {meta['accent']}\n"
        f"imaging: {'true' if meta.get('imaging') else 'false'}\n"
        f"order: {order}\n"
        "---\n"
    )


def write_catalog(path, meta, order, datasets):
    """datasets: ordered iterable of (name, description)."""
    out = [_front(meta, order), "\n", meta.get("blurb", "").strip(), "\n"]
    prov = meta.get("prov", "").strip()
    if prov:
        out += ["\n", prov, "\n"]
    out += ["\n## datasets\n"]
    for name, desc in datasets:
        out += ["\n### ", name, "\n", desc.strip(), "\n"]
    with open(path, "w") as f:
        f.write("".join(out))


# ---- read (.md -> dicts) ----------------------------------------------------
_DS_RE = re.compile(r"^### (.+?)\n(.*?)(?=\n### |\Z)", re.S | re.M)


def _parse(text):
    """Return (meta_dict, ordered_datasets) for one _catalog.md."""
    # text starts with "---\n<front>---\n<body>"
    _, front, body = text.split("---\n", 2)
    meta = {}
    for line in front.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    meta["imaging"] = meta.get("imaging", "false").lower() == "true"
    order = int(meta.pop("order", "999"))

    head, _, dsblock = body.partition("\n## datasets")
    paras = [p.strip() for p in head.strip().split("\n\n") if p.strip()]
    blurb = paras[0] if paras else ""
    prov = paras[1] if len(paras) > 1 else ""

    datasets = [(m.group(1).strip(), m.group(2).strip()) for m in _DS_RE.finditer(dsblock)]
    return (
        dict(slug=meta.get("slug"), title=meta.get("title"), icon=meta.get("icon"),
             accent=meta.get("accent"), imaging=meta["imaging"], blurb=blurb, prov=prov),
        order, datasets,
    )


def load_catalogs(data=None):
    """Scan <data>/*/_catalog.md → (SUBSETS OrderedDict by order, flat DATASETS dict).
    Reproduces the structures make-s3-index.py used to hardcode."""
    data = data or data_dir()
    found = []  # (order, prefix, meta, datasets)
    for prefix in sorted(os.listdir(data)):
        cat = os.path.join(data, prefix, "_catalog.md")
        if not os.path.isfile(cat):
            continue
        with open(cat) as f:
            meta, order, datasets = _parse(f.read())
        found.append((order, prefix, meta, datasets))
    found.sort(key=lambda x: x[0])

    subsets = OrderedDict((prefix, meta) for _, prefix, meta, _ in found)
    flat = {}
    for _, _, _, datasets in found:
        for name, desc in datasets:
            flat[name] = desc
    return subsets, flat
