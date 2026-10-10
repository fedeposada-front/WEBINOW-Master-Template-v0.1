/**
 * Gate 3A — Editorial Precision model tests. No route, JSX or deployment.
 * Usage: node scripts/check-editorial-v3.mjs
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const temp = mkdtempSync(join(root, ".v3-editorial-check-"));

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
  const errors = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, source + ": " + errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")).join("; "));
  const path = join(temp, output);
  writeFileSync(path, result.outputText);
  return pathToFileURL(path).href;
}

try {
  const modelFile = compile("src/layouts/editorial/editorial.model.ts", "model.mjs");
  const configFile = compile("src/sites/south-cooling/config.ts", "site.mjs");
  const { toEditorialModel } = await import(modelFile);
  const { southCoolingDraft } = await import(configFile);

  const model = toEditorialModel(southCoolingDraft);
  assert.equal(model.prospectId, southCoolingDraft.id);
  assert.equal(model.company, southCoolingDraft.brand.name);
  assert.equal(model.hero.headline, southCoolingDraft.presentations.b.hero.headline);
  assert.notEqual(model.hero.headline, southCoolingDraft.presentations.a.hero.headline);
  assert.equal(model.hero.supporting, southCoolingDraft.presentations.b.hero.supporting);
  assert.equal(model.contact.phone.href, "tel:+13054638866");
  assert.equal(model.contact.email, southCoolingDraft.business.email);
  assert.equal(model.contact.enabled, true);
  assert.deepEqual(model.serviceAreas, southCoolingDraft.business.serviceAreas);
  assert.deepEqual(model.services.map((service) => service.id), southCoolingDraft.services.map((service) => service.id));
  assert.equal(model.services.filter((service) => service.featured).length, 1);
  assert.equal(model.facts.length, 3);
  assert.equal(model.brand.logo, null, "No placeholder logo may be invented");
  assert.ok(model.services.every((service) => service.image === null), "Unapproved photos remain hidden by default");
  assert.equal(model.hero.image, null, "Unapproved hero must remain hidden by default");
  assert.deepEqual(model.estimate, {
    label: southCoolingDraft.conversion.primary.label, href: null, enabled: false,
  }, "Incomplete estimate form must remain disabled");

  const preview = toEditorialModel(southCoolingDraft, { internalMediaPreview: true });
  assert.equal(preview.services[0].image?.src, "/__internal-media/south-cooling/commercial-rooftop.webp");
  assert.equal(preview.services[0].image?.reviewOnly, true);
  assert.equal(preview.services[1].image?.src, "/__internal-media/south-cooling/technician.webp");
  assert.equal(preview.services[1].image?.reviewOnly, true);
  assert.equal(preview.hero.image, null, "No B hero image selected yet");

  const variant = structuredClone(southCoolingDraft);
  variant.id = "another_service_company";
  variant.brand.name = "Another Service Company";
  variant.presentations.b.hero.headline = "EDITORIAL ALTERNATIVE";
  variant.presentations.b.hero.imageAssetId = "hero-fleet";
  variant.services.push({
    id: "duct-repair", title: "Duct Repair", description: "Inspection and repair",
    prominence: "standard",
  });
  variant.page.sections[0].enabled = false;
  const variantModel = toEditorialModel(variant);
  assert.equal(variantModel.company, "Another Service Company");
  assert.equal(variantModel.hero.headline, "EDITORIAL ALTERNATIVE");
  assert.equal(variantModel.hero.image, null, "Selected but unapproved B hero must remain hidden");
  assert.equal(variantModel.services.length, 3, "Model supports N services");
  assert.equal(variantModel.facts.length, 0, "Disabled proof must not render");

  const variantPreview = toEditorialModel(variant, { internalMediaPreview: true });
  assert.equal(variantPreview.hero.image?.src, "/__internal-media/south-cooling/hero-fleet.webp");
  assert.equal(variantPreview.hero.image?.reviewOnly, true);
  variant.assets["hero-fleet"].rights = "approved";
  const approvedModel = toEditorialModel(variant);
  assert.equal(approvedModel.hero.image?.src, "/sites/south-cooling/hero-fleet.webp");
  assert.equal(approvedModel.hero.image?.reviewOnly, undefined);

  variant.page.sections.find((section) => section.type === "services").enabled = false;
  variant.page.sections.find((section) => section.type === "contact").enabled = false;
  const disabled = toEditorialModel(variant);
  assert.equal(disabled.services.length, 0, "Disabled service section must hide all services");
  assert.equal(disabled.contact.enabled, false, "Disabled contact section must be respected");

  console.log("PASS: Editorial Precision v0.3 model — shared schema, Concept B copy, variable services, section toggles, image rights and quote disabled");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
