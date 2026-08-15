import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#14B8A6",
            marginBottom: 2,
          }}
        />
        <div
          style={{
            width: 7,
            height: 13,
            borderRadius: 4,
            background: "#FFFFFF",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
