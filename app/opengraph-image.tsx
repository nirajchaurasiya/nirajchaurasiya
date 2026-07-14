import {
  ImageResponse,
} from "next/og";
import { siteConfig } from "@/content/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f5",
          color: "#171715",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "#171715",
              color: "#f7f7f5",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            NC
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {siteConfig.name}
            </div>

            <div
              style={{
                color: "#70706a",
                fontSize: 16,
              }}
            >
              Mechanical engineering · Software · Research
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 930,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 75,
              fontWeight: 700,
              letterSpacing: "-5px",
              lineHeight: 0.98,
            }}
          >
            Building systems
          </div>

          <div
            style={{
              marginTop: 4,
              color: "#8b8b84",
              fontSize: 75,
              fontWeight: 700,
              letterSpacing: "-5px",
              lineHeight: 0.98,
            }}
          >
            under uncertainty.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#70706a",
            fontSize: 18,
          }}
        >
          <span>
            Projects · Research · Frameworks · Writing
          </span>

          <span>
            nirajchaurasiya.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}