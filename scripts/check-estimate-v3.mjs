/**
 * Gate 4A — shared EstimateDemo contract, no route/UI/requests.
 * Usage: node scripts/check-estimate-v3.mjs
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const temp = mkdtempSync(join(root, ".v3-estimate-check-"));

function compile(source, output) {
  const result = ts.transpileModule(readFileSync(resolve(root, source), "utf8"), {
    fileName: source,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, source + ": " + errors.map((e) => ts.flattenDiagnosticMessageText(e.messageText, " ")).join("; "));
  const dest = join(temp, output);
  writeFileSync(dest, result.outputText);
  return pathToFileURL(dest).href;
}

try {
  const modelFile = compile("src/core/estimate/estimate.model.ts", "model.mjs");
  const configFile = compile("src/sites/south-cooling/config.ts", "config.mjs");
  const { toEstimateDemoModel } = await import(modelFile);
  const { southCoolingDraft } = await import(configFile);

  const a = toEstimateDemoModel(southCoolingDraft, {
    design: "a", service: "commercial-refrigeration",
  });
  assert.equal(a.design, "a");
  assert.equal(a.backHref, "/a");
  assert.equal(a.service, "commercial-refrigeration");
  assert.equal(a.company, "South Cooling LLC");
  assert.equal(a.phone.href, "tel:+13054638866");
  assert.equal(a.steps.length, 3);
  assert.equal(a.completedMessage, "Demo only — no request sent.");
  assert.match(a.demoNotice, /No quote is calculated/i);
  assert.deepEqual(a.services.map((s) => s.id), ["commercial-refrigeration", "residential-ac"]);

  const b = toEstimateDemoModel(southCoolingDraft, { design: "b", service: "residential-ac" });
  assert.equal(b.design, "b");
  assert.equal(b.backHref, "/b");
  assert.equal(b.service, "residential-ac");

  const invalid = toEstimateDemoModel(southCoolingDraft, {
    design: "<script>", service: "__invalid__",
  });
  assert.equal(invalid.design, "a", "Malformed design must resolve to a known layout");
  assert.equal(invalid.service, "commercial-refrigeration", "Malformed service must resolve to configured service");
  assert.ok(!JSON.stringify(invalid).includes("<script>"), "Invalid URL input must never leak to model");

  const changed = structuredClone(southCoolingDraft);
  changed.id = "another_prospect";
  changed.brand.name = "Another Prospect";
  changed.services.push({
    id: "emergency", title: "Emergency", description: "Emergency diagnostics", prominence: "standard",
  });
  const other = toEstimateDemoModel(changed, { design: "b", service: "emergency" });
  assert.equal(other.company, "Another Prospect");
  assert.equal(other.services.length, 3, "Must support N services");
  assert.equal(other.service, "emergency");
  assert.equal(other.phone.href, changed.business.phoneHref);

  changed.page.sections.find((section) => section.type === "services").serviceIds = ["residential-ac"];
  const restricted = toEstimateDemoModel(changed, { service: "commercial-refrigeration" });
  assert.deepEqual(restricted.services.map((s) => s.id), ["residential-ac"]);
  assert.equal(restricted.service, "residential-ac");

  changed.page.sections.find((section) => section.type === "services").enabled = false;
  const empty = toEstimateDemoModel(changed, { service: "residential-ac" });
  assert.equal(empty.services.length, 0);
  assert.equal(empty.service, null, "Disabled section must not expose any selectable services");

  const source = readFileSync(resolve(root, "src/core/estimate/estimate.model.ts"), "utf8");
  assert.doesNotMatch(source, /\b(fetch|localStorage|sessionStorage|sendBeacon|XMLHttpRequest)\b/, "Model must remain offline");
  assert.doesNotMatch(source, /\b(name|address)\s*:\s*(?:string|z\.)/, "Model must not acquire personal fields");
  console.log("PASS: EstimateDemo v0.3 model — safe A/B and service query parsing, dynamic services, no PII, no network, demo-only outcome");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
