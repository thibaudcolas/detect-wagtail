import { renditions } from "../src/detect-wagtail.js";

// Abort requests that take longer than 3 seconds.
const FETCH_TIMEOUT_MS = 3000;

export default async (req) => {
  const url = new URL(req.url).searchParams.get("url");

  const isValid =
    url !== null && (url.startsWith("http://") || url.startsWith("https://"));
  if (!isValid) {
    return Response.json(
      { target: url ?? null, code: "error" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    const html = await res.text();
    let code;

    if (renditions.strictest.test(html)) {
      code = "strictest";
    } else if (renditions.strict.test(html)) {
      code = "strict";
    } else if (renditions.lax.test(html)) {
      code = "lax";
    } else if (renditions.laxest.test(html)) {
      code = "laxest";
    } else {
      code = "nope";
    }

    return new Response(JSON.stringify({ target: url, code }, null, 2), {
      status: 200,
      headers: {
        "cache-control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ target: url, code: "error" }, null, 2),
      {
        status: 500,
      },
    );
  }
};
