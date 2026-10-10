/**
 * WEBINOW Core v0.3 — publishing boundary (private media gate).
 * Usage: node scripts/audit-private-build-v3.mjs
 *
 * Requires an existing npm run build and the three local private WebPs.
 * This checks byte-for-byte media copies and same-name files; it does NOT
 * certify licensing, isolate legacy routes, or approve publishing.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const privateDir = join(root, ".webinow-private", "sites", "south-cooling");
const outputDir = join(root, ".output");
const publicDir = join(root, "public");
const selected = ["hero-fleet.webp", "commercial-rooftop.webp", "technician.webp"];

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.isFile() ? [path] : [];
  });
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

try {
  assert.ok(existsSync(join(outputDir, "public")), "Build output is missing; run npm run build first");
  assert.ok(existsSync(join(outputDir, "server", "index.mjs")), "Cloudflare worker build missing; run npm run build first");
  assert.match(
    readFileSync(join(root, ".gitignore"), "utf8"),
    /^\.webinow-private\/$/m,
    "Private asset directory must be ignored by Git",
  );

  const assets = selected.map((filename) => {
    const source = join(privateDir, filename);
    assert.ok(existsSync(source), "Missing private asset " + filename);
    assert.ok(!existsSync(join(publicDir, "sites", "south-cooling", filename)),
      "Private asset leaked into public/: " + filename);
    const contents = readFileSync(source);
    assert.equal(contents.toString("ascii", 0, 4), "RIFF");
    assert.equal(contents.toString("ascii", 8, 12), "WEBP");
    return { filename, size: contents.length, hash: sha256(contents) };
  });

  const emittedFiles = walk(outputDir);
  assert.ok(emittedFiles.length > 0, "Build output is empty");
  for (const file of emittedFiles) {
    const name = basename(file);
    assert.ok(!assets.some((asset) => asset.filename === name),
      "Private filename found in build: " + relative(root, file));

    const size = statSync(file).size;
    const candidates = assets.filter((asset) => asset.size === size);
    if (candidates.length === 0) continue;
    const hash = sha256(readFileSync(file));
    assert.ok(!candidates.some((asset) => asset.hash === hash),
      "Private image copied into build under another filename: " + relative(root, file));
  }

  console.log("PASS: Private media build audit — 3 WebPs absent from public/ and .output by filename and SHA-256");
  console.log("Scanned build files: " + emittedFiles.length);
  console.log("NOT CHECKED: transformed/embedded image data, legacy client routes/assets, licensing or deployed Worker");
  console.log("PUBLICATION STILL BLOCKED: legacy routes and unconfirmed image rights.");
} catch (error) {
  console.error("FAIL: Private media build audit — " + error.message);
  process.exitCode = 1;
}
