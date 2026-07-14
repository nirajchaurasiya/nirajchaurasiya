import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  reason?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as ContactPayload;

    const name = readString(body.name);
    const email = readString(body.email);
    const reason = readString(body.reason);
    const subject = readString(body.subject);
    const message = readString(body.message);
    const company = readString(body.company);

    // Honeypot field. Bots often complete hidden fields.
    if (company) {
      return NextResponse.json({
        message:
          "Your message was received.",
      });
    }

    if (
      name.length < 2 ||
      name.length > 100
    ) {
      return NextResponse.json(
        {
          message:
            "Please provide a valid name.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      email.length > 180 ||
      !emailPattern.test(email)
    ) {
      return NextResponse.json(
        {
          message:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      reason.length < 2 ||
      reason.length > 80
    ) {
      return NextResponse.json(
        {
          message:
            "Please select a reason for contacting.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      subject.length < 3 ||
      subject.length > 160
    ) {
      return NextResponse.json(
        {
          message:
            "The subject must contain between 3 and 160 characters.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      message.length < 20 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          message:
            "The message must contain between 20 and 5,000 characters.",
        },
        {
          status: 400,
        },
      );
    }

    const webhookUrl =
      process.env.CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        {
          message:
            "The contact system has not been connected yet. Please use the direct email option.",
        },
        {
          status: 503,
        },
      );
    }

    const webhookSecret =
      process.env.CONTACT_WEBHOOK_SECRET;

    const webhookResponse = await fetch(
      webhookUrl,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          ...(webhookSecret
            ? {
                Authorization:
                  `Bearer ${webhookSecret}`,
              }
            : {}),
        },

        body: JSON.stringify({
          name,
          email,
          reason,
          subject,
          message,

          source:
            "nirajchaurasiya.com",

          submittedAt:
            new Date().toISOString(),
        }),

        cache: "no-store",
      },
    );

    if (!webhookResponse.ok) {
      console.error(
        "Contact webhook failed:",
        webhookResponse.status,
      );

      return NextResponse.json(
        {
          message:
            "The message could not be delivered. Please try again or use the direct email option.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      message:
        "Your message was sent successfully.",
    });
  } catch (error) {
    console.error(
      "Contact route error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "The message could not be processed.",
      },
      {
        status: 500,
      },
    );
  }
}