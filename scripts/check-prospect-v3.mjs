/**
 * Validate v0.3 runtime schema without adding a new test framework.
 * Usage after npm install: node scripts/check-prospect-v3.mjs
 * The runner transpiles two isolated TS modules with the repo's TypeScript and
 * loads the repo's installed Zod dependency, then deletes its temporary files.
 */
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const temp = mkdtempSync(join(root, ".v3-check-"));

function makeModule(source, filename) {
  const input = readFileSync(resolve(root, source), "utf8");
  const result = ts.transpileModule(input, {
    fileName: filename,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter((diag) => diag.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `Transpilation failed: ${source}: ${errors.map((diag) => ts.flattenDiagnosticMessageText(diag.messageText, " ")).join("; ")}`);
  const path = join(temp, filename);
  writeFileSync(path, result.outputText);
  return path;
}

try {
  const schemaPath = makeModule("src/core/config/v3/prospect.schema.ts", "schema.mjs");
  const configPath = makeModule("src/sites/south-cooling/config.ts", "config.mjs");
  const { prospectSchema } = await import(pathToFileURL(schemaPath).href);
  const { southCoolingDraft } = await import(pathToFileURL(configPath).href);
  const valid = prospectSchema.safeParse(southCoolingDraft);
  assert.equal(valid.success, true, valid.success ? "" : JSON.stringify(valid.error.issues));

  function fails(name, change) {
    const data = structuredClone(southCoolingDraft);
    change(data);
    assert.equal(prospectSchema.safeParse(data).success, false, `${name} should fail`);
  }

  fails("duplicate service id", (data) => data.services.push({ ...data.services[0] }));
  fails("unknown featured service", (data) => { data.presentations.a.featuredServiceId = "unknown"; });
  fails("missing asset reference", (data) => { data.presentations.b.hero.imageAssetId = "missing"; });
  fails("unknown proof fact", (data) => { data.page.sections[0].factIds.push("missing-fact"); });
  fails("unverified proof claim", (data) => { data.facts[0].evidence = "needs_review"; });
  fails("invalid phone URI", (data) => { data.business.phoneHref = "tel:305-000"; });
  fails("unauthorized production", (data) => { data.mode = "production"; });
  fails("incomplete ready state", (data) => { data.readiness = "ready_for_internal_review"; });
  fails("asset namespace leak", (data) => {
    data.assets.other = { src: "/sites/another-company/img.webp", alt: "Photo", provenance: "placeholder", edited: false, rights: "unconfirmed" };
  });

  console.log("PASS: South Cooling v0.3 draft schema and 9 negative checks");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
