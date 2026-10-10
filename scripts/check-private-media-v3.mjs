/**
 * Verify the three selected South Cooling images are installed ONLY in the
 * Git-ignored private folder. Does not copy, publish, or modify any photo.
 * Run from repo root: node scripts/check-private-media-v3.mjs
 */
import assert from "node:assert/strict";
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const base = join(root, ".webinow-private", "sites", "south-cooling");
const filenames = [
  "hero-fleet.webp",
  "commercial-rooftop.webp",
  "technician.webp",
];

try {
  const gitignore = readFileSync(join(root, ".gitignore"), "utf8");
  assert.match(gitignore, /^\.webinow-private\/$/m, "Private media must remain Git-ignored");

  for (const name of filenames) {
    const path = join(base, name);
    assert.ok(existsSync(path), "Missing " + name + " — extract the PRIVATE preview ZIP into the repository root");
    const stat = statSync(path);
    assert.ok(stat.isFile() && stat.size > 10_000, name + " must be a nonempty WebP file");
    const bytes = readFileSync(path);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF", name + " is not RIFF");
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP", name + " is not WebP");
    assert.ok(!existsSync(join(root, "public", "sites", "south-cooling", name)),
      name + " was found under public/: remove it before proceeding");
  }

  console.log("PASS: 3 selected preview files installed in Git-ignored private directory; no matching public media");
  console.log("NOT APPROVED FOR PUBLICATION: photo rights remain unconfirmed.");
} catch (error) {
  console.error("FAIL: South Cooling private media setup —", error.message);
  process.exitCode = 1;
}
