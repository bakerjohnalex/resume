from __future__ import annotations

from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np
import pandas as pd

KEYPOINTS = {
    "LH": mp.solutions.pose.PoseLandmark.LEFT_INDEX,
    "RH": mp.solutions.pose.PoseLandmark.RIGHT_INDEX,
    "LF": mp.solutions.pose.PoseLandmark.LEFT_FOOT_INDEX,
    "RF": mp.solutions.pose.PoseLandmark.RIGHT_FOOT_INDEX,
}


def _preprocess(frame_bgr, resize_longside=None, gamma=None):
    h0, w0 = frame_bgr.shape[:2]
    frame = frame_bgr
    scale = 1.0
    if resize_longside and max(h0, w0) < resize_longside:
        scale = resize_longside / max(h0, w0)
        frame = cv2.resize(frame, (int(round(w0 * scale)), int(round(h0 * scale))), interpolation=cv2.INTER_CUBIC)
    if gamma and gamma > 0:
        lut = np.array([((i / 255.0) ** (1.0 / gamma)) * 255 for i in range(256)], dtype=np.uint8)
        frame = cv2.LUT(frame, lut)

    def to_orig(x, y):
        return x / scale, y / scale

    return frame, to_orig


def extract_pose(video_path, out_csv, accuracy=True, vis_thresh=0.35, alpha=0.5, max_jump_frac=0.2,
                 resize_longside=None, gamma=None, refine_hands=True, hand_crop_px=240, hand_min_conf=0.6,
                 interpolate_gaps=True, max_gap_s=0.20):
    if accuracy:
        resize_longside = 1280 if resize_longside is None else resize_longside
        gamma = 1.2 if gamma is None else gamma
    else:
        resize_longside = resize_longside
        gamma = gamma
        if refine_hands is None:
            refine_hands = False

    cap = cv2.VideoCapture(str(video_path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 1)
    H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 1)
    max_jump = max_jump_frac * max(W, H)

    pose = mp.solutions.pose.Pose(model_complexity=2 if accuracy else 1,
                                  min_detection_confidence=0.55 if accuracy else 0.5,
                                  min_tracking_confidence=0.55 if accuracy else 0.5)

    prev = {k: None for k in KEYPOINTS}
    rows = []
    i = 0
    while True:
        ok, frame_bgr = cap.read()
        if not ok:
            break
        prep, to_orig = _preprocess(frame_bgr, resize_longside=resize_longside, gamma=gamma)
        rgb = cv2.cvtColor(prep, cv2.COLOR_BGR2RGB)
        res = pose.process(rgb)
        lms = res.pose_landmarks.landmark if res.pose_landmarks else None

        for name, lm_idx in KEYPOINTS.items():
            if lms is None:
                x0 = y0 = np.nan; vis = 0.0
            else:
                lm = lms[lm_idx]
                x = lm.x * prep.shape[1]
                y = lm.y * prep.shape[0]
                vis = float(lm.visibility)
                ox, oy = to_orig(float(x), float(y))  # bugfix: map back to original coordinates
                x0, y0 = ox, oy

            if np.isfinite(x0) and prev[name] is not None:
                px, py = prev[name]
                if np.hypot(x0 - px, y0 - py) > max_jump:
                    x0, y0 = px, py
            if prev[name] is not None and np.isfinite(x0):
                x0 = alpha * x0 + (1 - alpha) * prev[name][0]
                y0 = alpha * y0 + (1 - alpha) * prev[name][1]
            if np.isfinite(x0):
                prev[name] = (x0, y0)

            rows.append({
                "frame": i,
                "time_s": i / fps,
                "keypoint": name,
                "img_x": x0,
                "img_y": y0,
                "visibility": vis,
            })
        i += 1

    cap.release()
    pose.close()
    df = pd.DataFrame(rows)

    if interpolate_gaps and not df.empty:
        max_frames = int(round(max_gap_s * fps))
        out = []
        for kp, g in df.groupby("keypoint", sort=False):
            g = g.sort_values("frame").copy()
            bad = g["visibility"] < vis_thresh
            g.loc[bad, ["img_x", "img_y"]] = np.nan
            g[["img_x", "img_y"]] = g[["img_x", "img_y"]].interpolate(limit=max_frames, limit_direction="both")
            g[["img_x", "img_y"]] = g[["img_x", "img_y"]].ffill(limit=max_frames).bfill(limit=max_frames)
            out.append(g)
        df = pd.concat(out, ignore_index=True)

    out_csv = Path(out_csv)
    out_csv.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(out_csv, index=False)
    return out_csv
