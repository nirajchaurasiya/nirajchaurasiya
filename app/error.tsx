"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global website error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",

            display: "grid",

            placeItems: "center",

            padding: "32px",

            background: "#0c0c0d",

            color: "#f5f5f5",

            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              width: "min(560px, 100%)",

              padding: "32px",

              border: "1px solid rgba(255,255,255,0.15)",

              borderRadius: "18px",

              background: "rgba(255,255,255,0.04)",
            }}
          >
            <p
              style={{
                margin: "0 0 12px",

                color: "rgba(255,255,255,0.55)",

                fontSize: "12px",

                fontWeight: 700,

                letterSpacing: "0.09em",

                textTransform: "uppercase",
              }}
            >
              System interruption
            </p>

            <h1
              style={{
                margin: 0,

                fontSize: "clamp(2.2rem, 7vw, 4.8rem)",

                letterSpacing: "-0.065em",

                lineHeight: 0.95,
              }}
            >
              The website reached an unexpected state.
            </h1>

            <p
              style={{
                margin: "24px 0 0",

                color: "rgba(255,255,255,0.68)",

                lineHeight: 1.7,
              }}
            >
              Reload the application to begin again. No public data has been
              changed.
            </p>

            <button
              type="button"
              onClick={reset}
              style={{
                minHeight: "44px",

                marginTop: "28px",

                padding: "0 17px",

                border: 0,

                borderRadius: "10px",

                background: "#f5f5f5",

                color: "#0c0c0d",

                cursor: "pointer",

                font: "inherit",

                fontSize: "13px",

                fontWeight: 700,
              }}
            >
              Reload website
            </button>

            {error.digest && (
              <p
                style={{
                  margin: "20px 0 0",

                  color: "rgba(255,255,255,0.4)",

                  fontSize: "11px",
                }}
              >
                Reference: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
