from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

from .blobs import centroid_dot_canvas, filter_blobs
from .geometry import map_coords_back_to_original, pad_to_square_and_resize
from .grid_fit import ProjectedBumpedGrid, fit_grid
from .mask import make_bw_hold_mask

DEFAULT_PROMPT = "Can you adjust this image so the holds are all exactly white, and everything else in the image is exactly black? Don't adjust size or scaling or aspect ratio or anything else."


def _default_run_dir(video_path: Path) -> Path:
    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    return Path("runs") / f"{stamp}_{video_path.stem}"


def _save_gray(path: Path, arr):
    Image.fromarray(np.array(arr, dtype=np.uint8), mode="L").save(path)


def calibrate(video_path, frame_index=10, target_size=1024, mask_method="auto", mask_image_path=None, threshold=200,
              replicate_model="google/nano-banana-pro", replicate_prompt=DEFAULT_PROMPT,
              min_area=20, median_area_factor=3.0, dot_radius=10,
              n_vlines=11, n_hlines=18, bump_gaps_from_bottom=None, bump_factor=1.10,
              steps=2200, lr=0.03, restarts=6, top_weight_alpha=2.0, weight_floor=0.1, fd_eps_px=0.2,
              print_every=150, run_dir=None, debug=True) -> Path:
    video_path = Path(video_path)
    run_dir = Path(run_dir) if run_dir else _default_run_dir(video_path)
    out = run_dir / "calibration"
    out.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(video_path))
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
    ok, frame_bgr = cap.read()
    cap.release()
    if not ok:
        raise RuntimeError(f"Failed to read frame {frame_index} from {video_path}")
    frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)

    square_pil, resized_pil, geom = pad_to_square_and_resize(frame_rgb, target_size)
    geom["frame_index"] = frame_index

    if mask_method == "auto":
        import os
        mask_method = "replicate" if os.getenv("REPLICATE_API_TOKEN") else "file"

    bw_mask = make_bw_hold_mask(resized_pil, mask_method, str(mask_image_path) if mask_image_path else None, threshold,
                                replicate_model, replicate_prompt)
    blobs_only = filter_blobs(np.array(bw_mask), thresh=threshold, min_area=min_area, median_area_factor=median_area_factor)
    centroid_img, _ = centroid_dot_canvas(blobs_only, min_area=min_area, dot_radius=dot_radius)

    grid_config = {
        "n_vlines": n_vlines,
        "n_hlines": n_hlines,
        "bump_gaps_from_bottom": bump_gaps_from_bottom or [7, 13],
        "bump_factor": bump_factor,
    }
    opt_config = {
        "steps": steps,
        "lr": lr,
        "restarts": restarts,
        "top_weight_alpha": top_weight_alpha,
        "weight_floor": weight_floor,
        "fd_eps_px": fd_eps_px,
        "print_every": print_every,
    }
    fit = fit_grid(centroid_img, grid_config, opt_config)
    corners_sq = np.array(fit["best_corners_square"], dtype=np.float64)
    corners_orig = map_coords_back_to_original(corners_sq, geom)

    if debug:
        Image.fromarray(frame_rgb).save(out / "frame_orig.png")
        square_pil.save(out / "frame_square.png")
        _save_gray(out / "mask_bw.png", np.array(bw_mask))
        _save_gray(out / "blobs_only.png", blobs_only)
        _save_gray(out / "centroid_dots.png", centroid_img)
        cent_bgr = cv2.cvtColor(centroid_img, cv2.COLOR_GRAY2BGR)
        overlay_cent = ProjectedBumpedGrid(corners_sq, **grid_config).draw_overlay(cent_bgr, draw_nodes=True)
        cv2.imwrite(str(out / "grid_overlay_on_centroids.png"), overlay_cent)
        frame_resized = np.array(resized_pil.convert("RGB"))[:, :, ::-1]
        overlay_frame = ProjectedBumpedGrid(corners_sq, **grid_config).draw_overlay(frame_resized, draw_nodes=True)
        cv2.imwrite(str(out / "grid_overlay_on_frame.png"), overlay_frame)
        labeled = overlay_frame.copy()
        for i, (x, y) in enumerate(np.int32(np.round(corners_sq))):
            cv2.putText(labeled, f"C{i}", (x + 6, y - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 1)
        cv2.imwrite(str(out / "grid_overlay_labeled.png"), labeled)

    payload = {
        "video_path": str(video_path),
        "frame_index": frame_index,
        "target_size": target_size,
        "geom": geom,
        "grid": grid_config,
        "optimizer": opt_config,
        "corners_square": corners_sq.tolist(),
        "corners_orig": corners_orig,
        "diagnostics": {k: v for k, v in fit.items() if k != "best_corners_square"},
    }
    cal_path = out / "calibration.json"
    cal_path.write_text(json.dumps(payload, indent=2))
    return cal_path
