from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path

DEFAULT_PROMPT = "Can you adjust this image so the holds are all exactly white, and everything else in the image is exactly black? Don't adjust size or scaling or aspect ratio or anything else."


def _default_run(video: Path) -> Path:
    return Path("runs") / f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{video.stem}"


def build_parser():
    p = argparse.ArgumentParser(prog="moonboard")
    sp = p.add_subparsers(dest="cmd", required=True)

    c = sp.add_parser("calibrate")
    c.add_argument("--video", required=True)
    c.add_argument("--frame-index", type=int, default=10)
    c.add_argument("--target-size", type=int, default=1024)
    c.add_argument("--mask-method", choices=["replicate", "file", "auto"], default="auto")
    c.add_argument("--mask-image")
    c.add_argument("--replicate-model", default="google/nano-banana-pro")
    c.add_argument("--replicate-prompt", default=DEFAULT_PROMPT)
    c.add_argument("--threshold", type=int, default=200)
    c.add_argument("--min-area", type=int, default=20)
    c.add_argument("--median-area-factor", type=float, default=3.0)
    c.add_argument("--dot-radius", type=int, default=10)
    c.add_argument("--n-vlines", type=int, default=11)
    c.add_argument("--n-hlines", type=int, default=18)
    c.add_argument("--bump-gaps-from-bottom", type=int, nargs="+", default=[7, 13])
    c.add_argument("--bump-factor", type=float, default=1.10)
    c.add_argument("--steps", type=int, default=2200)
    c.add_argument("--lr", type=float, default=0.03)
    c.add_argument("--restarts", type=int, default=6)
    c.add_argument("--top-weight-alpha", type=float, default=2.0)
    c.add_argument("--weight-floor", type=float, default=0.1)
    c.add_argument("--fd-eps-px", type=float, default=0.2)
    c.add_argument("--print-every", type=int, default=150)
    c.add_argument("--run-dir")
    c.add_argument("--debug", action=argparse.BooleanOptionalAction, default=True)

    pose = sp.add_parser("pose")
    pose.add_argument("--video", required=True)
    pose.add_argument("--out-csv", required=True)
    pose.add_argument("--accuracy", action=argparse.BooleanOptionalAction, default=True)
    pose.add_argument("--vis-thresh", type=float, default=0.35)
    pose.add_argument("--alpha", type=float, default=0.5)
    pose.add_argument("--max-jump-frac", type=float, default=0.2)
    pose.add_argument("--resize-longside", type=int)
    pose.add_argument("--gamma", type=float)
    pose.add_argument("--refine-hands", action=argparse.BooleanOptionalAction, default=True)
    pose.add_argument("--hand-crop-px", type=int, default=240)
    pose.add_argument("--hand-min-conf", type=float, default=0.6)
    pose.add_argument("--interpolate-gaps", action=argparse.BooleanOptionalAction, default=True)
    pose.add_argument("--max-gap-s", type=float, default=0.20)

    a = sp.add_parser("analyze")
    a.add_argument("--detections-csv", required=True)
    a.add_argument("--calibration", required=True)
    a.add_argument("--out-csv", required=True)
    a.add_argument("--max-gap-s", type=float, default=0.20)
    a.add_argument("--keypoints", nargs="+", default=["LH", "RH", "LF", "RF"])

    r = sp.add_parser("render")
    r.add_argument("--video", required=True)
    r.add_argument("--analysis-csv", required=True)
    r.add_argument("--out-mp4", required=True)
    r.add_argument("--radius-frac", type=float, default=0.006)
    r.add_argument("--thickness", type=int, default=2)

    run = sp.add_parser("run")
    # calibration args
    for k, v in {
        "--video": dict(required=True),
        "--frame-index": dict(type=int, default=10),
        "--target-size": dict(type=int, default=1024),
        "--mask-method": dict(choices=["replicate", "file", "auto"], default="auto"),
        "--mask-image": dict(),
        "--replicate-model": dict(default="google/nano-banana-pro"),
        "--replicate-prompt": dict(default=DEFAULT_PROMPT),
        "--threshold": dict(type=int, default=200),
        "--min-area": dict(type=int, default=20),
        "--median-area-factor": dict(type=float, default=3.0),
        "--dot-radius": dict(type=int, default=10),
        "--n-vlines": dict(type=int, default=11),
        "--n-hlines": dict(type=int, default=18),
        "--bump-gaps-from-bottom": dict(type=int, nargs="+", default=[7, 13]),
        "--bump-factor": dict(type=float, default=1.10),
        "--steps": dict(type=int, default=2200),
        "--lr": dict(type=float, default=0.03),
        "--restarts": dict(type=int, default=6),
        "--top-weight-alpha": dict(type=float, default=2.0),
        "--weight-floor": dict(type=float, default=0.1),
        "--fd-eps-px": dict(type=float, default=0.2),
        "--print-every": dict(type=int, default=150),
        "--debug": dict(action=argparse.BooleanOptionalAction, default=True),
    }.items():
        run.add_argument(k, **v)
    # pose-ish args
    run.add_argument("--accuracy", action=argparse.BooleanOptionalAction, default=True)
    run.add_argument("--vis-thresh", type=float, default=0.35)
    run.add_argument("--alpha", type=float, default=0.5)
    run.add_argument("--max-jump-frac", type=float, default=0.2)
    run.add_argument("--resize-longside", type=int)
    run.add_argument("--gamma", type=float)
    run.add_argument("--refine-hands", action=argparse.BooleanOptionalAction, default=True)
    run.add_argument("--hand-crop-px", type=int, default=240)
    run.add_argument("--hand-min-conf", type=float, default=0.6)
    run.add_argument("--interpolate-gaps", action=argparse.BooleanOptionalAction, default=True)
    run.add_argument("--max-gap-s", type=float, default=0.20)
    run.add_argument("--run-dir")
    return p


def main(argv=None):
    args = build_parser().parse_args(argv)
    if args.cmd == "calibrate":
        kw = vars(args).copy()
        kw.pop("cmd", None)
        if "mask_image" in kw:
            kw["mask_image_path"] = kw.pop("mask_image")
        from .calibration import calibrate
        out = calibrate(**kw)
        print(out)
    elif args.cmd == "pose":
        from .pose import extract_pose
        out = extract_pose(args.video, args.out_csv, accuracy=args.accuracy, vis_thresh=args.vis_thresh, alpha=args.alpha,
                           max_jump_frac=args.max_jump_frac, resize_longside=args.resize_longside, gamma=args.gamma,
                           refine_hands=args.refine_hands, hand_crop_px=args.hand_crop_px, hand_min_conf=args.hand_min_conf,
                           interpolate_gaps=args.interpolate_gaps, max_gap_s=args.max_gap_s)
        print(out)
    elif args.cmd == "analyze":
        from .analysis import analyze
        out = analyze(args.detections_csv, args.calibration, args.out_csv, max_gap_s=args.max_gap_s, keypoints=args.keypoints)
        print(out)
    elif args.cmd == "render":
        from .render import render_labeled_video
        out = render_labeled_video(args.video, args.analysis_csv, args.out_mp4, radius_frac=args.radius_frac, thickness=args.thickness)
        print(out)
    elif args.cmd == "run":
        from .analysis import analyze
        from .calibration import calibrate
        from .pose import extract_pose
        from .render import render_labeled_video
        video = Path(args.video)
        rd = Path(args.run_dir) if args.run_dir else _default_run(video)
        cal_keys = {"video", "frame_index", "target_size", "mask_method", "mask_image", "replicate_model", "replicate_prompt",
                    "threshold", "min_area", "median_area_factor", "dot_radius", "n_vlines", "n_hlines", "bump_gaps_from_bottom",
                    "bump_factor", "steps", "lr", "restarts", "top_weight_alpha", "weight_floor", "fd_eps_px", "print_every", "debug"}
        kw = {k: getattr(args, k) for k in cal_keys}
        kw["run_dir"] = rd
        kw["mask_image_path"] = kw.pop("mask_image")
        cal = calibrate(**kw)
        pose_csv = rd / "pose" / "detections.csv"
        extract_pose(args.video, pose_csv, accuracy=args.accuracy, vis_thresh=args.vis_thresh, alpha=args.alpha,
                     max_jump_frac=args.max_jump_frac, resize_longside=args.resize_longside, gamma=args.gamma,
                     refine_hands=args.refine_hands, hand_crop_px=args.hand_crop_px, hand_min_conf=args.hand_min_conf,
                     interpolate_gaps=args.interpolate_gaps, max_gap_s=args.max_gap_s)
        analysis_csv = rd / "analysis" / "analysis.csv"
        analyze(pose_csv, cal, analysis_csv, max_gap_s=args.max_gap_s)
        mp4 = rd / "render" / "labeled.mp4"
        render_labeled_video(args.video, analysis_csv, mp4)
        print(cal)
        print(pose_csv)
        print(analysis_csv)
        print(mp4)


if __name__ == "__main__":
    main()
