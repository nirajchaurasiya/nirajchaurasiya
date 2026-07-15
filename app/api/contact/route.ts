import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),

  email: z.string().trim().email("Enter a valid email address.").max(200),

  subject: z.string().trim().min(3, "Enter a subject.").max(160),

  message: z
    .string()
    .trim()
    .min(20, "Please provide a little more context.")
    .max(5_000),

  sourcePath: z.string().trim().max(300).catch("/contact"),
});

function getConfiguration() {
  const apiUrl = process.env.CMS_MESSAGE_API_URL?.trim();

  const intakeSecret = process.env.CMS_MESSAGE_INTAKE_SECRET?.trim();

  if (!apiUrl || !intakeSecret) {
    throw new Error("Contact intake is not configured.");
  }

  return {
    apiUrl,
    intakeSecret,
  };
}

export async function POST(request: Request) {
  try {
    const rawBody: unknown = await request.json();

    const parsed = contactSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: parsed.error.issues[0]?.message ?? "Invalid contact form.",
        },

        {
          status: 400,
        },
      );
    }

    /*
     * Silently accept bot submissions
     * without forwarding them.
     */

    const { apiUrl, intakeSecret } = getConfiguration();

    const forwardedFor = request.headers.get("x-forwarded-for");

    const userAgent = request.headers.get("user-agent");

    const response = await fetch(apiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Accept: "application/json",

        /*
         * Both are sent so this works
         * with either common intake
         * authentication convention.
         */
        Authorization: `Bearer ${intakeSecret}`,

        "x-intake-secret": intakeSecret,

        ...(forwardedFor
          ? {
              "x-forwarded-for": forwardedFor,
            }
          : {}),

        ...(userAgent
          ? {
              "user-agent": userAgent,
            }
          : {}),
      },

      body: JSON.stringify({
        name: parsed.data.name,

        email: parsed.data.email,

        subject: parsed.data.subject,

        message: parsed.data.message,

        sourcePath: parsed.data.sourcePath,
      }),

      cache: "no-store",
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");

      console.error("CMS contact intake failed:", response.status, body);

      return NextResponse.json(
        {
          message:
            process.env.NODE_ENV === "development"
              ? `Analytics intake failed (${response.status}): ${body}`
              : "The message could not be delivered. Please try again.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Your message was received.",
      },

      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Contact route failed:", error);

    return NextResponse.json(
      {
        message: "The contact system is temporarily unavailable.",
      },

      {
        status: 500,
      },
    );
  }
}
