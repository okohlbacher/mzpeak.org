# corpus/ — example-data index + S3 sync harness

Builds the browsable corpus site (`index.html` + per-class subpages + `README.md`) for
`s3://v09` and mirrors the data to the bucket. Lives in the **mzpeak.org** site repo; the
**data** lives separately at `~/Claude/mzPeak/data` (override with `$MZPEAK_DATA`).

## Separation of concerns
- **Data** → `~/Claude/mzPeak/data` (302 GB; not in any repo). Each subset dir carries a
  `_catalog.md` with that subset's card metadata + per-dataset descriptions.
- **Descriptions** → `_catalog.md` *next to the data*. Edit blurbs/provenance there, not in code.
- **Harness** (this dir) → reads the catalogs, renders the site, syncs to S3.
- **Validators** (`check-mzpeak-metadata.py`, `check-sdrf-injection.py`) → stay in the
  converter repo `~/Claude/mzML2mzPeak` (override with `$MZML2MZPEAK`); referenced, not copied.

## Files
| file | role |
|---|---|
| `catalog.py` | parse/write the `_catalog.md` files → `SUBSETS` + `DATASETS` (stdlib only) |
| `make-s3-index.py` | generate the multi-page site from a bucket listing + the catalogs |
| `make-ratio-plots.py` | per-category Raw/mzML/mzPeak size plots (needs matplotlib) |
| `push-index-stackit.sh` | re-list bucket → regenerate site → upload pages (the index sync) |
| `push-data-stackit.sh` | mirror `$MZPEAK_DATA` originals + mzpeak to the bucket, then call the above |
| `migrate_catalogs.py` | one-shot: lifted the old hardcoded dicts into `_catalog.md` (round-trip asserted) |

## Usage
```bash
# regenerate + deploy just the site (descriptions come from $MZPEAK_DATA/*/_catalog.md)
DRYRUN=1 bash corpus/push-index-stackit.sh   # generate locally, no upload
bash corpus/push-index-stackit.sh            # regenerate + upload

# full data mirror (+ site at the end)
DRYRUN=1 bash corpus/push-data-stackit.sh
bash corpus/push-data-stackit.sh
```

## Editing descriptions
Open `~/Claude/mzPeak/data/<subset>/_catalog.md`, edit the frontmatter (card title/icon/accent),
the blurb/provenance paragraphs, or a `### <dataset-dir>` description, then re-run
`push-index-stackit.sh`. A dataset directory with no `### ` entry simply renders with no blurb.

> Adding a new subset: create `~/Claude/mzPeak/data/<new>/_catalog.md` with `order:` set, and
> the loader picks it up. `UNLISTED` / `HIDE_PREFIXES` / `SKIP_GROUP_NAMES` remain in
> `make-s3-index.py` (generator behavior, not per-dataset data).
