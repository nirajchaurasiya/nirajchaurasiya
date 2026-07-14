import {
  NextResponse,
} from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PublicAnalyticsSchema =
  z.object({
    eventName:
      z.enum([
        "PAGE_VIEW",
        "EXTERNAL_CLICK",
        "CONTACT_SUBMIT",
        "SEARCH",
      ]),

    path:
      z
        .string()
        .trim()
        .max(500)
        .optional(),

    targetUrl:
      z
        .string()
        .trim()
        .max(2_000)
        .optional(),

    referrer:
      z
        .string()
        .trim()
        .max(2_000)
        .optional(),

    sessionId:
      z
        .string()
        .trim()
        .min(8)
        .max(200),

    metadata:
      z
        .record(
          z.string(),
          z.unknown(),
        )
        .optional(),
  });

export async function POST(
  request: Request,
) {
  const ingestUrl =
    process.env
      .ANALYTICS_INGEST_URL;

  const ingestSecret =
    process.env
      .ANALYTICS_INGEST_SECRET;

  if (
    !ingestUrl ||
    !ingestSecret
  ) {
    return NextResponse.json(
      {
        message:
          "Analytics is not configured.",
      },
      {
        status: 503,
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        message:
          "Invalid JSON.",
      },
      {
        status: 400,
      },
    );
  }

  const parsed =
    PublicAnalyticsSchema.safeParse(
      body,
    );

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          "Invalid analytics event.",
      },
      {
        status: 400,
      },
    );
  }

  const response = await fetch(
    ingestUrl,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${ingestSecret}`,

        "User-Agent":
          request.headers.get(
            "user-agent",
          ) ?? "",

        "CF-IPCountry":
          request.headers.get(
            "cf-ipcountry",
          ) ?? "",

        "X-Vercel-IP-Country":
          request.headers.get(
            "x-vercel-ip-country",
          ) ?? "",
      },

      body: JSON.stringify(
        parsed.data,
      ),

      cache: "no-store",
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message:
          "The analytics event could not be delivered.",
      },
      {
        status: 502,
      },
    );
  }

  return NextResponse.json({
    received: true,
  });
}