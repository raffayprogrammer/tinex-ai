import { ImageResponse } from "next/og";

/**
 * The browser-tab icon, generated at build time. Replaces the create-next-app
 * default (which was still shipping Vercel's triangle).
 *
 * If you later drop a real raster icon in, delete this file and add
 * `src/app/icon.png` instead — Next picks either one up automatically.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0E0D",
          borderRadius: 14,
        }}
      >
        {/* T-bar over the X waist, matching the site mark */}
        <svg width="42" height="46" viewBox="0 0 120 132" fill="none">
          <path
            d="M16 10 H104 V30 H74 V44 H46 V30 H16 Z"
            stroke="#D9A441"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M46 44 H74 L104 122 H76 L60 82 L44 122 H16 Z"
            stroke="#D9A441"
            strokeWidth="7"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
