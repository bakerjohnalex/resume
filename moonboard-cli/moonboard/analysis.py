from __future__ import annotations

import json
from pathlib import Path

import cv2
import numpy as np
import pandas as pd

from .geometry import apply_H, nonuniform_y_positions


def analyze(detections_csv, calibration_json, out_csv, max_gap_s=0.20, keypoints=None):
    keypoints = keypoints or ["LH", "RH", "LF", "RF"]
    det = pd.read_csv(detections_csv)
    det = det[det["keypoint"].isin(keypoints)].copy()

    cal = json.loads(Path(calibration_json).read_text())
    corners = np.array(cal["corners_orig"], dtype=np.float32)
    n_vlines = cal["grid"]["n_vlines"]
    n_hlines = cal["grid"]["n_hlines"]
    grid_cols = n_vlines - 1
    grid_rows = n_hlines - 1
    rect = np.array([[0, 0], [grid_cols, 0], [grid_cols, grid_rows], [0, grid_rows]], dtype=np.float32)
    H_img2rect = cv2.getPerspectiveTransform(corners, rect)
    H_rect2img = cv2.getPerspectiveTransform(rect, corners)

    pts = det[["img_x", "img_y"]].to_numpy(dtype=np.float64)
    rect_xy = apply_H(H_img2rect, pts)
    det["rect_x"] = rect_xy[:, 0]
    det["rect_y"] = rect_xy[:, 1]

    if "time_s" in det:
        fps = 1.0 / np.median(np.diff(np.sort(det["time_s"].unique()))) if det["time_s"].nunique() > 1 else 30.0
        lim = int(round(max_gap_s * fps))
        chunks = []
        for kp, g in det.groupby("keypoint", sort=False):
            g = g.sort_values("frame").copy()
            g[["rect_x", "rect_y"]] = g[["rect_x", "rect_y"]].interpolate(limit=lim, limit_direction="both")
            chunks.append(g)
        det = pd.concat(chunks, ignore_index=True)

    ys = nonuniform_y_positions(grid_rows, cal["grid"]["bump_gaps_from_bottom"], cal["grid"]["bump_factor"])
    letters = [chr(ord("A") + i) for i in range(n_vlines)]

    cx = np.clip(np.floor(np.clip(det["rect_x"], 0, grid_cols) + 0.5).astype(int), 0, grid_cols)
    yarr = det["rect_y"].to_numpy(dtype=np.float64)
    ridx = np.argmin(np.abs(yarr[:, None] - ys[None, :]), axis=1)
    det["grid_col_idx"] = cx
    det["grid_col_letter"] = [letters[i] for i in cx]
    det["grid_row_idx_top"] = ridx
    det["grid_row_disp"] = n_hlines - ridx
    det["grid_label"] = det["grid_col_letter"] + det["grid_row_disp"].astype(str)
    det["grid_center_x"] = cx.astype(float)
    det["grid_center_y"] = ys[ridx]

    cimg = apply_H(H_rect2img, det[["grid_center_x", "grid_center_y"]].to_numpy(dtype=np.float64))
    det["grid_center_img_x"] = cimg[:, 0]
    det["grid_center_img_y"] = cimg[:, 1]
    det["dist_to_intersection_rect"] = np.hypot(det["rect_x"] - det["grid_center_x"], det["rect_y"] - det["grid_center_y"])
    det["dist_to_intersection_px"] = np.hypot(det["img_x"] - det["grid_center_img_x"], det["img_y"] - det["grid_center_img_y"])

    out_csv = Path(out_csv)
    out_csv.parent.mkdir(parents=True, exist_ok=True)
    det.to_csv(out_csv, index=False)
    return out_csv
