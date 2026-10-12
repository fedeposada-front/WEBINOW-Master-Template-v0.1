/**
 * Gate 7 — stage only the three user-authorized South Cooling WebPs into an
 * ALREADY BUILT, Git-ignored .output/public directory.
 *
 * Permission scope: a limited WEBINOW design preview for Gonzalo only.
 * No images are added to Git, public/ source, or other customer namespaces.
 * Run AFTER npm run build and BEFORE auditing the preview artifact.
 *
 * node scripts/stage-authorized-preview-v3.mjs
 *
 * This script does not deploy, send emails, authenticate viewers, or claim a
 * general image license. The hosting/access gate remains separate.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import {
  copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceDir = join(root, ".webinow-private", "sites", "south-cooling");
const targetDir = join(root, ".output", "public", "sites", "south-cooling");
const allowed = [
  "hero-fleet.webp",
  "commercial-rooftop.webp",
  "technician.webp",
];

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

try {
  const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
  assert.match(gitignore, /^\.output(?:\/|$)/m, ".output must stay Git-ignored");
  assert.match(gitignore, /^\.webinow-private\/$/m, "Original photos must stay Git-ignored");
  assert.ok(!existsSync(join(root, "public", "sites", "south-cooling")),
    "Do not copy preview photos into the tracked public/ source directory");
  assert.ok(existsSync(join(root, ".output", "server", "index.mjs")),
    "No fresh Cloudflare build found; run npm run build first");
  assert.ok(existsSync(join(root, ".output", "public")),
    "No built static asset directory found");

  const selected = allowed.map((filename) => {
    const from = join(sourceDir, filename);
    assert.ok(existsSync(from), "Private source photo missing: " + filename);
    const info = lstatSync(from);
    assert.ok(info.isFile() && !info.isSymbolicLink(),
      "Private source must be a regular file (no symlinks): " + filename);
    assert.ok(info.size > 10_000, "Photo unexpectedly small: " + filename);
    const bytes = readFileSync(from);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF", "Invalid WebP RIFF header: " + filename);
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP", "Invalid WebP format header: " + filename);
    return { filename, from, hash: sha256(bytes) };
  });

  mkdirSync(targetDir, { recursive: true });
  for (const entry of selected) {
    const dest = join(targetDir, entry.filename);
    if (!existsSync(dest)) {
      copyFileSync(entry.from, dest, constants.COPYFILE_EXCL);
    }
    assert.ok(lstatSync(dest).isFile() && !lstatSync(dest).isSymbolicLink(),
      "Staged file must be regular: " + entry.filename);
    assert.equal(sha256(readFileSync(dest)), entry.hash,
      "Staged copy differs from authorized source: " + entry.filename);
  }

  console.log("PASS: authorized preview media staged — 3 WebPs verified in .output/public/sites/south-cooling");
  console.log("NOT DEPLOYED: photos remain out of Git; publication/access and outreach require separate approval.");
} catch (error) {
  console.error("FAIL: authorized preview media staging — " + error.message);
  console.error("DO NOT DEPLOY. Inspect and resolve the missing/invalid media.");
  process.exitCode = 1;
}
