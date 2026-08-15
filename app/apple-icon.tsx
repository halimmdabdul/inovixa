import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563EB",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#14B8A6",
            marginBottom: 12,
          }}
        />
        <div
          style={{
            width: 34,
            height: 68,
            borderRadius: 17,
            background: "#FFFFFF",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
