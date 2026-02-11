from __future__ import annotations

import os
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image


def save_pil_as_png_temp(img: Image.Image) -> str:
    fd, path = tempfile.mkstemp(suffix=".png")
    os.close(fd)
    img.save(path, format="PNG")
    return path


def load_output_image(output) -> Image.Image:
    if isinstance(output, (str, Path)):
        return Image.open(output).convert("RGB")
    if isinstance(output, list) and output:
        return load_output_image(output[0])
    raise ValueError(f"Unsupported replicate output type: {type(output)}")


def run_nano_banana_edit(img: Image.Image, model: str, prompt: str) -> Image.Image:
    token = os.getenv("REPLICATE_API_TOKEN")
    if not token:
        raise RuntimeError("REPLICATE_API_TOKEN is missing. Use --mask-method file --mask-image <path>.")
    try:
        import replicate
    except ImportError as exc:
        raise RuntimeError("replicate package not installed. Install with: pip install -e .[replicate]") from exc

    temp_path = save_pil_as_png_temp(img)
    with open(temp_path, "rb") as f:
        out = replicate.run(model, input={
            "prompt": prompt,
            "image_input": [f],
            "output_format": "png",
        })
    return load_output_image(out)


def _to_binary(gray: np.ndarray, threshold: int) -> np.ndarray:
    return np.where(gray >= int(threshold), 255, 0).astype(np.uint8)


def make_bw_hold_mask(prepped_frame_pil: Image.Image, mask_method: str, mask_image_path: str | None, threshold: int,
                      replicate_model: str, replicate_prompt: str) -> Image.Image:
    if mask_method == "replicate":
        masked_rgb = run_nano_banana_edit(prepped_frame_pil.convert("RGB"), replicate_model, replicate_prompt)
        gray = np.array(masked_rgb.convert("L"), dtype=np.uint8)
    elif mask_method == "file":
        if not mask_image_path:
            raise ValueError("--mask-image is required when --mask-method=file")
        gray = np.array(Image.open(mask_image_path).convert("L"), dtype=np.uint8)
    else:
        raise ValueError(f"Unknown mask method: {mask_method}")

    bw = _to_binary(gray, threshold)
    return Image.fromarray(bw, mode="L")
