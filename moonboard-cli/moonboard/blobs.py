from __future__ import annotations

import cv2
import numpy as np


def filter_blobs(bw_mask_pil_or_np, thresh=200, min_area=20, median_area_factor=3.0) -> np.ndarray:
    img = np.array(bw_mask_pil_or_np, dtype=np.uint8)
    if img.ndim == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, bw = cv2.threshold(img, thresh, 255, cv2.THRESH_BINARY)
    k = np.ones((3, 3), np.uint8)
    bw = cv2.morphologyEx(bw, cv2.MORPH_OPEN, k)
    bw = cv2.morphologyEx(bw, cv2.MORPH_CLOSE, k)

    n, labels, stats, _ = cv2.connectedComponentsWithStats(bw, connectivity=8)
    areas = [stats[i, cv2.CC_STAT_AREA] for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] >= min_area]
    if not areas:
        return np.zeros_like(bw)
    med = float(np.median(areas))
    lo = med / float(median_area_factor)
    hi = med * float(median_area_factor)

    out = np.zeros_like(bw)
    for i in range(1, n):
        a = stats[i, cv2.CC_STAT_AREA]
        if a >= min_area and lo <= a <= hi:
            out[labels == i] = 255
    return out


def centroid_dot_canvas(blobs_only_mask, min_area=20, dot_radius=10):
    m = np.array(blobs_only_mask, dtype=np.uint8)
    n, labels, stats, cent = cv2.connectedComponentsWithStats(m, connectivity=8)
    canvas = np.zeros_like(m)
    centers = []
    for i in range(1, n):
        a = stats[i, cv2.CC_STAT_AREA]
        if a < min_area:
            continue
        x, y = cent[i]
        centers.append((float(x), float(y)))
        cv2.circle(canvas, (int(round(x)), int(round(y))), int(dot_radius), 255, -1)
    return canvas, centers
