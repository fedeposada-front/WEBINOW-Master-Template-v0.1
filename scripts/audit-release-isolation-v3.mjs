/**
 * South Cooling release isolation: FAIL-CLOSED on legacy routes/assets and
 * shared Cloudflare Worker names.
 *
 * Run ONLY after a fresh build in the per-prospect release branch:
 *   npm run build && node scripts/audit-release-isolation-v3.mjs
 *
 * This audit does not approve asset licensing, business claims, public
 * deployment, prospect outreach, or the accuracy of an existing Worker.
 */
import { existsSync, readFileSync, readdirSync, lstatSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, resolve, relative, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = join(root, ".output");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const read = (name) => {
  const file = join(root, name);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
};

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.isFile() ? [path] : [];
  });
}

// All file-based routes below src/routes/ become publicly routable.
// No vestigial v0.2 client-specific routes may remain there.
const routeDir = join(root, "src/routes");
const legacyRoute = read("src/routes/commercial.tsx");
check(!legacyRoute, "Legacy /commercial route is still present.");
const index = read("src/routes/index.tsx");
check(Boolean(index), "Release / homepage route is missing.");
check(!/[@/](?:config\/site|components\/site)|Comfort\s*(?:SOS|S\.O\.S)|Northline/i.test(index),
  "Release / homepage still imports or names a previous prospect.");

const rootRoute = read("src/routes/__root.tsx");
check(Boolean(rootRoute), "Release root route is missing.");
check(!/from\s*["']\.\.\/config\/site["']|STRUCTURED_DATA_JSON_LD|favicon\.ico/.test(rootRoute),
  "Root layout still imports old prospect metadata, JSON-LD or favicon.");

// Public files are copied even when React never imports them.
for (const path of ["public/brand/logo.png", "public/favicon.ico"]) {
  check(!existsSync(join(root, path)), "Old public brand asset remains: " + path);
}
const robots = read("public/robots.txt");
check(/^[ \t]*Disallow:[ \t]*\/[ \t]*$/mi.test(robots) && !/^[ \t]*Allow:[ \t]*\/[ \t]*$/mi.test(robots),
  "The proposal robots.txt must disallow crawling; no Allow: /.");

// Permission is scoped to sharing these three images with Gonzalo.
// Source images must never be tracked under public/; only the .output
// copy used for the reviewed build may contain them.
const previewAssets = ["hero-fleet.webp", "commercial-rooftop.webp", "technician.webp"];
const siteConfig = read("src/sites/south-cooling/config.ts");
check((siteConfig.match(/rights: "approved"/g) ?? []).length === previewAssets.length,
  "Expected exactly 3 South Cooling photos approved for this limited demo");
check(/^\.output(?:\/|$)/m.test(read(".gitignore")) && /^\.webinow-private\/$/m.test(read(".gitignore")),
  "Both private source and build output must remain Git-ignored");

for (const filename of previewAssets) {
  const source = join(root, ".webinow-private", "sites", "south-cooling", filename);
  const staged = join(root, ".output", "public", "sites", "south-cooling", filename);
  const publicSource = join(root, "public", "sites", "south-cooling", filename);
  check(!existsSync(publicSource), "Do not track authorized images in public/: " + filename);
  if (!existsSync(source)) {
    errors.push("Missing approved private image: " + filename);
    continue;
  }
  if (!existsSync(staged)) {
    errors.push("Approved image missing from the build: " + filename + " — run the staging script after building");
    continue;
  }
  if (!lstatSync(source).isFile() || lstatSync(source).isSymbolicLink() ||
      !lstatSync(staged).isFile() || lstatSync(staged).isSymbolicLink()) {
    errors.push("Unsafe photo type (symlink/non-file): " + filename);
    continue;
  }
  const original = readFileSync(source);
  const emitted = readFileSync(staged);
  const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
  check(original.toString("ascii", 0, 4) === "RIFF" && original.toString("ascii", 8, 12) === "WEBP",
    "Source file is not WebP: " + filename);
  check(hash(original) === hash(emitted),
    "Build photo differs from the approved original: " + filename);
}

const sourceWrangler = read("wrangler.json");
try {
  const sourceConfig = JSON.parse(sourceWrangler);
  check(sourceConfig.preview_urls === false,
    "Preview URLs must be explicitly disabled in the source wrangler.json");
} catch (error) {
  errors.push("Source wrangler.json is missing or invalid: " + error.message);
}

check(existsSync(join(output, "server/index.mjs")), "Cloudflare output missing; run npm run build first.");
check(existsSync(join(output, "public")), "Public output missing; run npm run build first.");

const wranglerPath = join(output, "server", "wrangler.json");
if (!existsSync(wranglerPath)) {
  errors.push("Generated Cloudflare wrangler.json missing.");
} else {
  try {
    const config = JSON.parse(readFileSync(wranglerPath, "utf8"));
    const expected = "webinow-south-cooling-proposal-v03";
    check(config.name === expected,
      "Cloudflare Worker name must be unique: expected " + expected + ", found " + String(config.name));
    check(config.preview_urls === false,
      "Generated Worker config must disable preview_urls; run npm run build after updating wrangler.json");
  } catch (error) {
    errors.push("Generated wrangler.json cannot be parsed: " + error.message);
  }
}

const bannedText = /\bComfort\s*(?:SOS|S\.O\.S\.?)\b|Northline(?:\s+Plumbing)?|CAC1819197|18333024080|book\.housecallpro\.com/i;
const bannedAsset = /^(?:hero-residential|hero-commercial|commercial-block|residential-block|project-[123]|team)(?:[-.]|$)/i;
const textExtensions = new Set([".mjs", ".js", ".json", ".html", ".css", ".txt", ".xml", ".svg", ".map"]);

for (const file of walk(output)) {
  const rel = relative(output, file).replaceAll("\\", "/");
  check(!bannedAsset.test(basename(file)), "Previous-prospect image emitted: " + rel);
  if (!textExtensions.has(extname(file).toLowerCase())) continue;
  const code = readFileSync(file, "utf8");
  check(!bannedText.test(code), "Previous-prospect text emitted: " + rel);
}

// We also block live publication on the current proposal contract.
// Legal rights and outreach consent are separate release approvals.
if (errors.length) {
  console.error("FAIL: South Cooling v0.3 release isolation (" + errors.length + " blocker(s))");
  errors.forEach((item, index) => console.error(String(index + 1).padStart(2, "0") + ". " + item));
  console.error("DO NOT DEPLOY. No files were changed by this audit.");
  process.exitCode = 1;
} else {
  console.log("PASS: release isolation — no legacy content, 3 authorized photos verified, noindex robots, unique Worker, preview URLs disabled");
  console.log("NOT VALIDATED BY THIS SCRIPT: remote Cloudflare Access rules, live access tests, or prospect outreach approval.");
}
