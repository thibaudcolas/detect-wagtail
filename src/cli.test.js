import { describe, it, expect, beforeAll, afterAll } from "vitest";
import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cli = path.resolve(__dirname, "../cli.js");

const WAGTAIL_HTML = `<html><img src="/media/images/photo.width-600.png"></html>`;
const PLAIN_HTML = `<html><p>nothing here</p></html>`;

let server;
let baseUrl;

beforeAll(async () => {
  server = http.createServer((req, res) => {
    if (req.url === "/wagtail") {
      res.end(WAGTAIL_HTML);
    } else {
      res.end(PLAIN_HTML);
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  await new Promise((resolve) => server.close(resolve));
});

function run(args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [cli, ...args], {
      cwd: path.resolve(__dirname, ".."),
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));
    child.on("close", (status) => resolve({ status, stdout, stderr }));
  });
}

describe("detect-wagtail CLI", () => {
  it("detects Wagtail on a matching page", async () => {
    const { status, stdout } = await run([`${baseUrl}/wagtail`]);
    expect(status).toBe(0);
    expect(stdout).toContain("Wagtail detected");
  });

  it("reports no detection on a plain page", async () => {
    const { status, stdout } = await run([`${baseUrl}/plain`]);
    expect(status).toBe(1);
    expect(stdout).toContain("No Wagtail detected");
  });

  it("outputs JSON with the strictness code on detection", async () => {
    const { status, stdout } = await run(["--json", `${baseUrl}/wagtail`]);
    expect(status).toBe(0);
    expect(JSON.parse(stdout)).toEqual({
      url: `${baseUrl}/wagtail`,
      code: "strict",
      detected: true,
    });
  });

  it("fails with exit code 2 for an invalid URL", async () => {
    const { status, stderr } = await run(["notaurl"]);
    expect(status).toBe(2);
    expect(stderr).toContain("invalid URL");
  });

  it("fails with exit code 2 for an invalid strictness level", async () => {
    const { status, stderr } = await run([
      "--strictness",
      "bogus",
      `${baseUrl}/plain`,
    ]);
    expect(status).toBe(2);
    expect(stderr).toContain("Invalid strictness level");
  });

  it("prints usage with --help and exits 0", async () => {
    const { status, stdout } = await run(["--help"]);
    expect(status).toBe(0);
    expect(stdout).toContain("Usage:");
  });
});
