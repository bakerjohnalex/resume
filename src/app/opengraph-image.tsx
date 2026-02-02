import { ImageResponse } from "next/og";
import { RESUME_DATA } from "../data/resume-data";

export const runtime = "edge";

export const alt = "Minimalist Resume";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const avatarUrl = new URL(
    RESUME_DATA.avatarUrl,
    RESUME_DATA.personalWebsiteUrl
  ).toString();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse context requires img element */}
      <img
        src={avatarUrl}
        alt={RESUME_DATA.name}
        style={{
          width: "1200px",
          height: "630px",
          objectFit: "cover",
        }}
      />
    </div>,
    {
      ...size,
    }
  );
}
