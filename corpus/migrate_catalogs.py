#!/usr/bin/env python3
"""One-shot: lift SUBSETS + DATASETS out of the original make-s3-index.py into
per-subset `_catalog.md` files in the data tree — then assert the round-trip
through catalog.load_catalogs() reproduces the originals exactly.

Run once:  python corpus/migrate_catalogs.py [path/to/old-make-s3-index.py]
Idempotent (overwrites the .md). Stdlib only.
"""
import os, sys
import catalog

GOLD = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(
    "~/Claude/mzML2mzPeak/scripts/make-s3-index.py")
DATA = catalog.data_dir()

# The gold script's prefix (everything before it reads stdin) only DEFINES things
# — dicts, helpers, env lookups — with no I/O side effects, so exec is safe.
src = open(GOLD).read()
prefix = src.split("# ---- read + bucket-organise")[0]
ns = {}
exec(compile(prefix, GOLD, "exec"), ns)
SUBSETS, DATASETS = ns["SUBSETS"], ns["DATASETS"]

# Group DATASETS by which subset directory actually contains that dataset dir.
assigned = set()
for i, (prefix_name, meta) in enumerate(SUBSETS.items(), start=1):
    subdir = os.path.join(DATA, prefix_name)
    if not os.path.isdir(subdir):
        print(f"  !! missing data dir: {subdir} (writing catalog anyway)")
        dirs = set()
    else:
        dirs = {d for d in os.listdir(subdir) if os.path.isdir(os.path.join(subdir, d))}
    # preserve DATASETS dict insertion order, keep only datasets present in this subset
    datasets = [(k, DATASETS[k]) for k in DATASETS if k in dirs]
    assigned.update(k for k, _ in datasets)
    os.makedirs(subdir, exist_ok=True)
    catalog.write_catalog(os.path.join(subdir, "_catalog.md"), meta, i, datasets)
    print(f"  wrote {prefix_name}/_catalog.md ({len(datasets)} datasets)")

leftover = set(DATASETS) - assigned
if leftover:
    print(f"  !! {len(leftover)} DATASETS entries matched no data dir: {sorted(leftover)}")

# ---- round-trip assertion --------------------------------------------------
rt_subsets, rt_datasets = catalog.load_catalogs(DATA)

assert list(rt_subsets) == list(SUBSETS), (
    f"subset order/keys differ:\n  got {list(rt_subsets)}\n  want {list(SUBSETS)}")
for k, want in SUBSETS.items():
    got = rt_subsets[k]
    for field in ("slug", "title", "icon", "accent", "imaging", "blurb", "prov"):
        assert got[field] == want[field], f"{k}.{field} differs:\n  got  {got[field]!r}\n  want {want[field]!r}"
# every DATASETS entry whose dir exists must round-trip identically
for k in assigned:
    assert rt_datasets.get(k) == DATASETS[k], f"DATASETS[{k}] differs:\n  got  {rt_datasets.get(k)!r}\n  want {DATASETS[k]!r}"

print(f"OK round-trip: {len(rt_subsets)} subsets, {len(assigned)}/{len(DATASETS)} datasets reproduced exactly.")
