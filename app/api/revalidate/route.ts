import { timingSafeEqual } from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RevalidationPayloadSchema = z.object({
  contentId: z.string().min(1),

  type: z.string().min(1).max(40),

  slug: z.string().min(1).max(200),

  publicPath: z.string().max(1_000).nullable(),

  version: z.number().int().positive().nullable(),

  action: z.string().min(1).max(40),
});

const indexPaths: Record<string, string> = {
  PAGE: "/",
  PROJECT: "/work",
  RESEARCH: "/research",
  FRAMEWORK: "/frameworks",
  WRITING: "/writing",
  MEDIA: "/media",
  ARCHIVE: "/archive",
};

function safeCompare(supplied: string, expected: string) {
  if (!supplied || !expected) {
    return false;
  }

  const suppliedBuffer = Buffer.from(supplied);

  const expectedBuffer = Buffer.from(expected);

  if (suppliedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(suppliedBuffer, expectedBuffer);
}

function readBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return "";
  }

  return authorization.slice(7).trim();
}

function createTags(type: string, slug: string) {
  return ["cms-content", `cms-type:${type}`, `cms-entry:${type}:${slug}`];
}

export async function POST(request: Request) {
  const suppliedSecret = readBearerToken(request);

  const expectedSecret = process.env.CMS_REVALIDATE_SECRET ?? "";

  if (!safeCompare(suppliedSecret, expectedSecret)) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        revalidated: false,

        message: "The request body must be valid JSON.",
      },
      {
        status: 400,
      },
    );
  }

  const parsed = RevalidationPayloadSchema.safeParse(requestBody);

  if (!parsed.success) {
    return NextResponse.json(
      {
        revalidated: false,

        message: "The revalidation payload is invalid.",

        errors: parsed.error.flatten().fieldErrors,
      },
      {
        status: 400,
      },
    );
  }

  const { type, slug, publicPath, action } = parsed.data;

  if (action === "FULL_SYNC" || type === "SYSTEM") {
    revalidateTag("cms-content", {
      expire: 0,
    });

    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");

    revalidatePath("/robots.txt");

    return NextResponse.json({
      revalidated: true,
      mode: "full",
      tags: ["cms-content"],
      paths: ["/"],
      now: new Date().toISOString(),
    });
  }

  const tags = createTags(type, slug);

  for (const tag of tags) {
    revalidateTag(tag, {
      expire: 0,
    });
  }

  const paths = new Set<string>();

  const indexPath = indexPaths[type];

  if (indexPath) {
    paths.add(indexPath);
  }

  if (publicPath && publicPath.startsWith("/")) {
    paths.add(publicPath);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    mode: "content",
    action,
    tags,
    paths: Array.from(paths),
    now: new Date().toISOString(),
  });
}
