from __future__ import annotations

import math
from dataclasses import dataclass

import cv2
import numpy as np

from .geometry import apply_H, nonuniform_y_positions


@dataclass
class ProjectedBumpedGrid:
    corners_img: np.ndarray
    n_vlines: int
    n_hlines: int
    bump_gaps_from_bottom: list[int]
    bump_factor: float

    def __post_init__(self):
        self.grid_cols = self.n_vlines - 1
        self.grid_rows = self.n_hlines - 1
        rect = np.array([[0, 0], [self.grid_cols, 0], [self.grid_cols, self.grid_rows], [0, self.grid_rows]], dtype=np.float32)
        self.H_rect2img = cv2.getPerspectiveTransform(rect, self.corners_img.astype(np.float32))

    def nodes(self) -> np.ndarray:
        xs = np.linspace(0, self.grid_cols, self.n_vlines)
        ys = nonuniform_y_positions(self.grid_rows, self.bump_gaps_from_bottom, self.bump_factor)
        pts = np.array([(x, y) for y in ys for x in xs], dtype=np.float64)
        return apply_H(self.H_rect2img, pts)

    def draw_overlay(self, image_bgr: np.ndarray, draw_nodes: bool = True) -> np.ndarray:
        out = image_bgr.copy()
        xs = np.linspace(0, self.grid_cols, self.n_vlines)
        ys = nonuniform_y_positions(self.grid_rows, self.bump_gaps_from_bottom, self.bump_factor)
        for x in xs:
            p = apply_H(self.H_rect2img, np.array([[x, ys[0]], [x, ys[-1]]]))
            cv2.line(out, tuple(np.int32(np.round(p[0]))), tuple(np.int32(np.round(p[1]))), (0, 255, 0), 1)
        for y in ys:
            p = apply_H(self.H_rect2img, np.array([[xs[0], y], [xs[-1], y]]))
            cv2.line(out, tuple(np.int32(np.round(p[0]))), tuple(np.int32(np.round(p[1]))), (255, 255, 0), 1)
        if draw_nodes:
            for p in self.nodes():
                cv2.circle(out, tuple(np.int32(np.round(p))), 2, (0, 0, 255), -1)
        return out


class ContinuousIntersectionFitter:
    def __init__(self, centroid_img: np.ndarray, n_vlines=11, n_hlines=18, bump_gaps_from_bottom=None, bump_factor=1.10,
                 top_weight_alpha=2.0, weight_floor=0.1, fd_eps_px=0.2):
        self.img = centroid_img
        self.h, self.w = centroid_img.shape[:2]
        self.n_vlines = n_vlines
        self.n_hlines = n_hlines
        self.bump_gaps_from_bottom = bump_gaps_from_bottom or [7, 13]
        self.bump_factor = bump_factor
        self.alpha = top_weight_alpha
        self.weight_floor = weight_floor
        self.fd_eps = fd_eps_px
        self.dots = self._extract_dots()
        if len(self.dots) == 0:
            raise RuntimeError("No dots found in centroid image")
        self.dot_radius_px = self._estimate_dot_radius()

    def _extract_dots(self):
        n, _, stats, cent = cv2.connectedComponentsWithStats(self.img, connectivity=8)
        return np.array([cent[i] for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] > 0], dtype=np.float64)

    def _estimate_dot_radius(self):
        n, _, stats, _ = cv2.connectedComponentsWithStats(self.img, connectivity=8)
        areas = [stats[i, cv2.CC_STAT_AREA] for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] > 0]
        med = np.median(areas) if areas else 25.0
        return float(np.sqrt(med / np.pi))

    def _init_corners(self):
        return np.array([[0.1*self.w, 0.1*self.h], [0.9*self.w, 0.1*self.h], [0.9*self.w, 0.9*self.h], [0.1*self.w, 0.9*self.h]], dtype=np.float64)

    def _weights(self):
        y_norm = self.dots[:, 1] / max(1, self.h - 1)
        w = np.exp(-self.alpha * y_norm)
        w = np.maximum(w, self.weight_floor)
        return w / np.mean(w)

    def _loss(self, corners, tau, sigma2=4.0):
        grid = ProjectedBumpedGrid(corners, self.n_vlines, self.n_hlines, self.bump_gaps_from_bottom, self.bump_factor)
        nodes = grid.nodes()
        d2 = ((nodes[:, None, :] - self.dots[None, :, :]) ** 2).sum(axis=2)
        softmin = -tau * np.log(np.exp(-d2 / tau).mean(axis=0) + 1e-12)
        l = np.log1p(softmin / sigma2)
        return float((l * self._weights()).mean())

    def _hard_score(self, corners, tol_px):
        nodes = ProjectedBumpedGrid(corners, self.n_vlines, self.n_hlines, self.bump_gaps_from_bottom, self.bump_factor).nodes()
        d2 = ((nodes[:, None, :] - self.dots[None, :, :]) ** 2).sum(axis=2)
        pairs = [(d2[i, j], i, j) for i in range(d2.shape[0]) for j in range(d2.shape[1]) if d2[i, j] <= tol_px**2]
        pairs.sort(key=lambda x: x[0])
        used_i, used_j, ds = set(), set(), []
        for d, i, j in pairs:
            if i in used_i or j in used_j:
                continue
            used_i.add(i); used_j.add(j); ds.append(math.sqrt(d))
        return len(ds), float(np.mean(ds)) if ds else float("inf")

    def optimize(self, steps=2200, lr=0.03, n_restarts=6, print_every=150):
        best = None
        for r in range(n_restarts):
            c = self._init_corners() + np.random.randn(4, 2) * (0.02 * min(self.w, self.h))
            m = np.zeros_like(c); v = np.zeros_like(c)
            b1, b2 = 0.9, 0.999
            for t in range(1, steps + 1):
                tau0 = (3 * self.dot_radius_px) ** 2
                tau1 = (0.6 * self.dot_radius_px) ** 2
                tau = tau0 + (tau1 - tau0) * (t - 1) / max(1, steps - 1)
                grad = np.zeros_like(c)
                base = self._loss(c, tau)
                for i in range(4):
                    for j in range(2):
                        cp = c.copy(); cp[i, j] += self.fd_eps
                        cm = c.copy(); cm[i, j] -= self.fd_eps
                        grad[i, j] = (self._loss(cp, tau) - self._loss(cm, tau)) / (2 * self.fd_eps)
                m = b1 * m + (1 - b1) * grad
                v = b2 * v + (1 - b2) * (grad * grad)
                mhat = m / (1 - b1 ** t)
                vhat = v / (1 - b2 ** t)
                c -= lr * mhat / (np.sqrt(vhat) + 1e-8)
                c[:, 0] = np.clip(c[:, 0], 0, self.w - 1)
                c[:, 1] = np.clip(c[:, 1], 0, self.h - 1)
                if print_every and t % print_every == 0:
                    pass
            score, md = self._hard_score(c, 1.15 * self.dot_radius_px)
            item = {"corners": c, "hard_score": score, "mean_match_dist": md, "dot_radius_px": self.dot_radius_px, "loss": base}
            if best is None or (item["hard_score"], -item["mean_match_dist"]) > (best["hard_score"], -best["mean_match_dist"]):
                best = item
        return best


def fit_grid(centroid_canvas_uint8, grid_config, opt_config):
    fitter = ContinuousIntersectionFitter(
        centroid_canvas_uint8,
        n_vlines=grid_config["n_vlines"],
        n_hlines=grid_config["n_hlines"],
        bump_gaps_from_bottom=grid_config["bump_gaps_from_bottom"],
        bump_factor=grid_config["bump_factor"],
        top_weight_alpha=opt_config["top_weight_alpha"],
        weight_floor=opt_config["weight_floor"],
        fd_eps_px=opt_config["fd_eps_px"],
    )
    best = fitter.optimize(steps=opt_config["steps"], lr=opt_config["lr"], n_restarts=opt_config["restarts"], print_every=opt_config["print_every"])
    return {
        "best_corners_square": best["corners"].tolist(),
        "hard_score": best["hard_score"],
        "mean_match_dist": best["mean_match_dist"],
        "dot_radius_px": best["dot_radius_px"],
    }
