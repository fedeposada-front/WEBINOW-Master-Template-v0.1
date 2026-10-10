/**
 * Gate 2A: isolated model tests. No routes or uploads involved.
 * Usage: node scripts/check-cinematic-v3.mjs
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const temp = mkdtempSync(join(root, ".v3-cinematic-check-"));

function compile(source, output) {
  const input = readFileSync(resolve(root, source), "utf8");
  const result = ts.transpileModule(input, {
    fileName: source,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  assert.equal(
    errors.length,
    0,
    `Transpile failed: ${source}: ${errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")).join("; ")}`,
  );
  const path = join(temp, output);
  writeFileSync(path, result.outputText);
  return pathToFileURL(path).href;
}

try {
  const modelFile = compile("src/layouts/cinematic/cinematic.model.ts", "model.mjs");
  const configFile = compile("src/sites/south-cooling/config.ts", "site.mjs");
  const { toCinematicModel } = await import(modelFile);
  const { southCoolingDraft } = await import(configFile);

  const model = toCinematicModel(southCoolingDraft);
  assert.equal(model.prospectId, southCoolingDraft.id);
  assert.equal(model.company, southCoolingDraft.brand.name);
  assert.equal(model.hero.headline, southCoolingDraft.presentations.a.hero.headline);
  assert.equal(model.phone.href, southCoolingDraft.business.phoneHref);
  assert.deepEqual(model.services.map((service) => service.id), southCoolingDraft.services.map((service) => service.id));
  assert.equal(model.facts.length, 3);
  assert.equal(model.hero.image, null, "Unapproved or missing media must never render by default");
  assert.equal(model.services[0].image, null, "Unapproved commercial image must be hidden by default");
  assert.equal(model.services[1].image, null, "Unapproved residential image must be hidden by default");

  const privatePreview = toCinematicModel(southCoolingDraft, { internalMediaPreview: true });
  assert.deepEqual(privatePreview.hero.image, {
    src: "/__internal-media/south-cooling/hero-fleet.webp",
    alt: southCoolingDraft.assets["hero-fleet"].alt,
    reviewOnly: true,
    objectPosition: "center center",
  });
  assert.equal(privatePreview.services[0].image?.src, "/__internal-media/south-cooling/commercial-rooftop.webp");
  assert.equal(privatePreview.services[0].image?.reviewOnly, true);
  assert.equal(privatePreview.services[1].image?.src, "/__internal-media/south-cooling/technician.webp");
  assert.equal(privatePreview.services[1].image?.reviewOnly, true);
  assert.equal(model.brand.logo, null, "Missing logo must not be invented");
  assert.equal(model.estimate.href, null, "Broken /estimate route must not be exposed");
  assert.equal(model.estimate.enabled, false);

  const another = structuredClone(southCoolingDraft);
  another.id = "another_service_company";
  another.brand.name = "Another Service Company";
  another.services.push({ id: "duct-repair", title: "Duct Repair", description: "Inspection and repair", prominence: "standard" });
  another.presentations.a.hero.headline = "CUSTOM HEADLINE";
  another.page.sections[0].enabled = false;
  const varied = toCinematicModel(another);
  assert.equal(varied.company, "Another Service Company");
  assert.equal(varied.services.length, 3, "Must support N services");
  assert.equal(varied.hero.headline, "CUSTOM HEADLINE");
  assert.equal(varied.facts.length, 0, "Disabled proof module must not render");
  assert.ok(varied.services.every((service, index) => service.index === String(index + 1).padStart(2, "0")));
  
  const withMedia = structuredClone(another);
  withMedia.assets.fleet = {
    src: "/sites/south-cooling/fleet.webp",
    alt: "Company fleet",
    sourceUrl: "https://southcooling.com/",
    provenance: "official_site",
    edited: true,
    rights: "unconfirmed",
  };
  withMedia.presentations.a.hero.imageAssetId = "fleet";
  assert.equal(toCinematicModel(withMedia).hero.image, null, "Unapproved photo must stay hidden");
  withMedia.assets.fleet.rights = "approved";
  assert.deepEqual(toCinematicModel(withMedia).hero.image, {
    src: "/sites/south-cooling/fleet.webp",
    alt: "Company fleet",
  });
  const withApprovedMedia = toCinematicModel(withMedia, { internalMediaPreview: true });
  assert.equal(withApprovedMedia.hero.image?.reviewOnly, undefined, "Approved media must not carry the review label");
  assert.equal(withApprovedMedia.hero.image?.src, "/sites/south-cooling/fleet.webp");

  console.log("PASS: Industrial Cinematic v0.3 model — private media preview opt-in, unapproved hidden by default, N services and quote disabled");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
