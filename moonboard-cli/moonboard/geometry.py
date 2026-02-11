from __future__ import annotations

from typing import Iterable

import numpy as np
from PIL import Image, ImageOps


def apply_H(H: np.ndarray, pts_xy: np.ndarray) -> np.ndarray:
    pts = np.asarray(pts_xy, dtype=np.float64)
    ones = np.ones((pts.shape[0], 1), dtype=np.float64)
    hp = np.hstack([pts, ones]) @ H.T
    return hp[:, :2] / np.clip(hp[:, 2:3], 1e-12, None)


def nonuniform_y_positions(h: int, bumps_from_bottom: Iterable[int], bump_factor: float) -> np.ndarray:
    gaps = np.ones(h, dtype=np.float64)
    for g in bumps_from_bottom:
        idx = h - int(g)
        if 0 <= idx < h:
            gaps[idx] *= float(bump_factor)
    y = np.concatenate([[0.0], np.cumsum(gaps)])
    return y * (h / y[-1])


def pad_to_square_and_resize(frame_rgb_np: np.ndarray, target_size: int):
    pil = Image.fromarray(frame_rgb_np)
    w, h = pil.size
    side = max(w, h)
    pad_left = (side - w) // 2
    pad_top = (side - h) // 2
    pad_right = side - w - pad_left
    pad_bottom = side - h - pad_top
    square = ImageOps.expand(pil, border=(pad_left, pad_top, pad_right, pad_bottom), fill=(0, 0, 0))
    resized = square.resize((target_size, target_size), Image.Resampling.LANCZOS)
    geom = {
        "orig_width": w,
        "orig_height": h,
        "square_side": side,
        "pad_left": pad_left,
        "pad_top": pad_top,
        "target_size": target_size,
    }
    return square, resized, geom


def map_coords_back_to_original(points_xy, geom) -> list[tuple[float, float]]:
    pts = np.asarray(points_xy, dtype=np.float64)
    s = float(geom["square_side"])
    t = float(geom["target_size"])
    x_sq = pts[:, 0] * s / t
    y_sq = pts[:, 1] * s / t
    x = x_sq - float(geom["pad_left"])
    y = y_sq - float(geom["pad_top"])
    return list(map(tuple, np.stack([x, y], axis=1)))
