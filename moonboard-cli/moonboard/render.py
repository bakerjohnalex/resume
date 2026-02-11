from __future__ import annotations

from pathlib import Path

import cv2
import pandas as pd

COLORS = {"LH": (50, 220, 80), "RH": (80, 180, 255), "LF": (255, 120, 80), "RF": (220, 50, 220)}


def render_labeled_video(video_path, analysis_csv, out_mp4, radius_frac=0.006, thickness=2):
    df = pd.read_csv(analysis_csv)
    by_frame = {int(k): g for k, g in df.groupby("frame")}

    cap = cv2.VideoCapture(str(video_path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    out_mp4 = Path(out_mp4)
    out_mp4.parent.mkdir(parents=True, exist_ok=True)
    writer = cv2.VideoWriter(str(out_mp4), cv2.VideoWriter_fourcc(*"mp4v"), fps, (W, H))
    r = max(2, int(round(radius_frac * max(W, H))))

    fi = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if fi in by_frame:
            for _, row in by_frame[fi].iterrows():
                x, y = int(round(row["img_x"])), int(round(row["img_y"]))
                kp = row["keypoint"]
                label = f"{kp} {row['grid_label']}"
                c = COLORS.get(kp, (255, 255, 255))
                cv2.circle(frame, (x, y), r, c, thickness)
                (tw, th), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.45, 1)
                cv2.rectangle(frame, (x + r + 2, y - th - 6), (x + r + 6 + tw, y - 2), (0, 0, 0), -1)
                cv2.putText(frame, label, (x + r + 4, y - 4), cv2.FONT_HERSHEY_SIMPLEX, 0.45, c, 1, cv2.LINE_AA)
        writer.write(frame)
        fi += 1

    cap.release()
    writer.release()
    return out_mp4
