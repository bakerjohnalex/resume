# moonboard-cli

CLI-first Moonboard pipeline extracted from notebook logic into reusable modules.

## What this project does

Two-stage pipeline:
1. **Calibration**: fit a perspective + bumped-row grid to Moonboard hold centroids and save calibration corners.
2. **Pose + analysis**: detect climber keypoints, map into rectified board space, snap to nearest grid intersections, and render labeled video.

## Install

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e .
```

Optional Replicate support:
```bash
pip install -e .[replicate]
```

> `mediapipe` may require system OpenGL/video libs depending on your OS.

## Quickstart

```bash
moonboard calibrate --video /path/to/video.mp4 --mask-method file --mask-image /path/to/mask.png
moonboard pose --video /path/to/video.mp4 --out-csv runs/demo/pose/detections.csv
moonboard analyze --detections-csv runs/demo/pose/detections.csv --calibration runs/demo/calibration/calibration.json --out-csv runs/demo/analysis/analysis.csv
moonboard render --video /path/to/video.mp4 --analysis-csv runs/demo/analysis/analysis.csv --out-mp4 runs/demo/render/labeled.mp4
moonboard run --video /path/to/video.mp4 --mask-method file --mask-image /path/to/mask.png
```

Also works as module:
```bash
python -m moonboard --help
python -m moonboard calibrate --video /path/to/video.mp4 --mask-method file --mask-image /path/to/mask.png
```

## Outputs

`runs/<run_id>/`
- `calibration/calibration.json`
- `calibration/frame_orig.png`
- `calibration/frame_square.png`
- `calibration/mask_bw.png`
- `calibration/blobs_only.png`
- `calibration/centroid_dots.png`
- `calibration/grid_overlay_on_centroids.png`
- `calibration/grid_overlay_on_frame.png`
- `calibration/grid_overlay_labeled.png`
- `pose/detections.csv`
- `analysis/analysis.csv`
- `render/labeled.mp4`

## Debugging workflow

1. Run `calibrate` with debug enabled (default).
2. Inspect `mask_bw.png` first.
3. Inspect `blobs_only.png` and `centroid_dots.png`.
4. Inspect `grid_overlay_on_centroids.png` and `grid_overlay_on_frame.png`.
5. Validate `analysis.csv` columns `dist_to_intersection_rect` and `dist_to_intersection_px`.

Fast calibration iteration tips:
- adjust `--threshold`, `--min-area`, `--median-area-factor`, `--dot-radius`
- tune row geometry with `--bump-gaps-from-bottom` and `--bump-factor`
- reduce runtime via fewer `--steps` or `--restarts`

## Configuration knobs

- **Bumps**: `--bump-gaps-from-bottom`, `--bump-factor` to model nonuniform vertical spacing.
- **Top weighting**: `--top-weight-alpha` and `--weight-floor` biases fitting toward upper rows.
- **Optimizer**: `--steps`, `--restarts`, `--lr`, `--fd-eps-px`.
- **Pose profile**: `--accuracy/--fast`.

## Replicate usage

```bash
export REPLICATE_API_TOKEN=...
moonboard calibrate --video /path/to/video.mp4 --mask-method replicate
```

Without Replicate:
```bash
moonboard calibrate --video /path/to/video.mp4 --mask-method file --mask-image /path/to/mask.png
```

## Troubleshooting

- **No dots found**: lower threshold or improve binary mask.
- **Replicate failed**: verify token, model name, and install extras.
- **Grid mirrored/collapsed**: tune bumps, increase restarts, inspect centroid dots.
- **Pose coords don’t align**: this refactor maps preprocessed pose coordinates back to original video pixel space before CSV output (fixing notebook resize misalignment).
