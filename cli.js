#!/usr/bin/env node
"use strict";

const { renditions } = require("./src/detect-wagtail.js");

const LEVELS = Object.keys(renditions);

const usage = `Usage: detect-wagtail [options] <url>...

Detect whether a site or page is built with Wagtail.

Options:
  -j, --json                   Output machine-readable JSON.
  -s, --strictness <level>     Strictness level: ${LEVELS.join(", ")} (default: "strict").
  -h, --help                   Show this help.

Exit codes:
  0  Wagtail detected on every checked URL
  1  Wagtail not detected on at least one checked URL
  2  Error (invalid argument, invalid URL, or fetch failure)
`;

function fail(message, code) {
  console.error(message);
  process.exit(code);
}

const args = process.argv.slice(2);
let json = false;
let level = "strict";
const urls = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "-h" || arg === "--help") {
    console.log(usage);
    process.exit(0);
  } else if (arg === "-j" || arg === "--json") {
    json = true;
  } else if (arg === "-s" || arg === "--strictness") {
    level = args[++i];
    if (!(level in renditions)) {
      fail(
        `Invalid strictness level: ${level}. Expected one of: ${LEVELS.join(", ")}.`,
        2,
      );
    }
  } else {
    urls.push(arg);
  }
}

if (urls.length === 0) {
  fail(usage.trimEnd(), 2);
}

async function check(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`invalid URL`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`unsupported protocol: ${parsed.protocol}`);
  }
  const res = await fetch(parsed, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const html = await res.text();
  const match = renditions[level].test(html);
  return match ? level : "nope";
}

(async () => {
  const results = [];

  for (const url of urls) {
    try {
      const code = await check(url);
      results.push({ url, code, detected: code !== "nope" });
    } catch (err) {
      const reason =
        err && err.cause ? err.cause.message || String(err.cause) : err.message;
      results.push({ url, code: "error", detected: false });
      console.error(`✘ Error checking ${url}: ${reason}`);
    }
  }

  if (json) {
    const output = urls.length === 1 ? results[0] : results;
    console.log(JSON.stringify(output, null, 2));
  } else {
    for (const { url, code, detected } of results) {
      if (code === "error") {
        // Already reported to stderr above.
      } else if (detected) {
        console.log(`✔ Wagtail detected (${code}): ${url}`);
      } else {
        console.log(`✘ No Wagtail detected: ${url}`);
      }
    }
  }

  if (results.some((r) => r.code === "error")) {
    process.exit(2);
  } else if (results.some((r) => !r.detected)) {
    process.exit(1);
  }
  process.exit(0);
})();
