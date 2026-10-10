/**
 * WEBINOW Core v0.3 - prospect contract (pilot proposal only).
 * This file is deliberately independent from src/config/site.schema.ts (v0.2).
 */
import { z } from "zod";

const id = z.string().regex(/^[a-z0-9][a-z0-9_-]*$/, "Use a stable lowercase ID");
const httpUrl = z.string().url().refine((value) => /^https?:\/\//.test(value), "Use an absolute HTTP(S) URL");
const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex color");
const localAssetPath = z.string().regex(/^\/sites\/[a-z0-9-]+\/[a-zA-Z0-9_./-]+$/, "Use a local /sites/{namespace}/... asset path").refine(
  (value) => !value.split("/").includes("..") && !value.split("/").includes("."),
  "Asset paths must not contain traversal segments",
);
const optionalId = id.nullable();

const assetSchema = z.object({
  src: localAssetPath,
  alt: z.string().min(1),
  sourceUrl: httpUrl.optional(),
  provenance: z.enum(["official_site", "company_provided", "third_party", "placeholder"]),
  edited: z.boolean(),
  rights: z.enum(["approved", "unconfirmed"]),
  objectPosition: z.string().optional(),
}).strict();

const serviceSchema = z.object({
  id,
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().optional(),
  prominence: z.enum(["primary", "standard"]).default("standard"),
  assetId: id.optional(),
}).strict();

const factSchema = z.object({
  id,
  text: z.string().min(1),
  sourceUrl: httpUrl.optional(),
  evidence: z.enum(["company_stated", "independently_verified", "needs_review"]),
}).strict();

const proofSection = z.object({
  id,
  type: z.literal("proof"),
  enabled: z.boolean(),
  factIds: z.array(id).min(1),
}).strict();

const servicesSection = z.object({
  id,
  type: z.literal("services"),
  enabled: z.boolean(),
  serviceIds: z.array(id).min(1).optional(),
}).strict();

const contactSection = z.object({
  id,
  type: z.literal("contact"),
  enabled: z.boolean(),
}).strict();

const sectionSchema = z.discriminatedUnion("type", [proofSection, servicesSection, contactSection]);

const presentationSchema = z.object({
  hero: z.object({
    eyebrow: z.string().optional(),
    headline: z.string().min(1),
    supporting: z.string().min(1),
    imageAssetId: optionalId,
  }).strict(),
  featuredServiceId: id.optional(),
}).strict();

const draftSchema = z.object({
  schemaVersion: z.literal("0.3"),
  id,
  assetNamespace: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  /** Proposal only. A production release requires a separate approval gate and schema. */
  mode: z.literal("proposal"),
  readiness: z.enum(["draft", "ready_for_internal_review"]),
  locale: z.enum(["en-US", "es-US"]),
  brand: z.object({
    name: z.string().min(1),
    logoAssetId: optionalId,
    colors: z.object({
      primary: hexColor,
      dark: hexColor,
      accent: hexColor,
      surface: hexColor,
    }).strict(),
  }).strict(),
  business: z.object({
    vertical: z.string().min(1),
    phoneDisplay: z.string().min(1),
    phoneHref: z.string().regex(/^tel:\+[1-9]\d{7,14}$/, "Use an international E.164 tel: URI"),
    email: z.string().email().optional(),
    serviceAreas: z.array(z.string().min(1)).min(1),
    websiteUrl: httpUrl,
  }).strict(),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    /** Preview-only contract: canonical is deliberately not set. */
    canonicalUrl: z.null(),
  }).strict(),
  services: z.array(serviceSchema).min(1),
  facts: z.array(factSchema),
  assets: z.record(id, assetSchema),
  page: z.object({ sections: z.array(sectionSchema) }).strict(),
  presentations: z.object({
    a: presentationSchema,
    b: presentationSchema,
  }).strict(),
  conversion: z.object({
    primary: z.object({ kind: z.literal("estimate_demo"), label: z.string().min(1) }).strict(),
    secondary: z.object({ kind: z.literal("phone"), label: z.string().min(1) }).strict(),
  }).strict(),
}).strict();

/**
 * Verify referential integrity at the content boundary, before rendering.
 * File existence and rights approval are enforced at the publishing gate.
 */
export const prospectSchema = draftSchema.superRefine((site, ctx) => {
  const add = (path: (string | number)[], message: string) => {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path, message });
  };
  const unique = (values: string[], path: (string | number)[]) => {
    const seen = new Set<string>();
    values.forEach((value, index) => {
      if (seen.has(value)) add([...path, index], `Duplicate ID: ${value}`);
      seen.add(value);
    });
  };

  unique(site.services.map((service) => service.id), ["services"]);
  unique(site.facts.map((fact) => fact.id), ["facts"]);
  unique(site.page.sections.map((section) => section.id), ["page", "sections"]);

  const serviceIds = new Set(site.services.map((service) => service.id));
  const facts = new Map(site.facts.map((fact) => [fact.id, fact]));
  const assetIds = new Set(Object.keys(site.assets));
  const assetRef = (assetId: string | null | undefined, path: (string | number)[]) => {
    if (assetId && !assetIds.has(assetId)) add(path, `Unknown asset: ${assetId}`);
  };
  assetRef(site.brand.logoAssetId, ["brand", "logoAssetId"]);

  for (const [key, asset] of Object.entries(site.assets)) {
    if (!asset.src.startsWith(`/sites/${site.assetNamespace}/`)) {
      add(["assets", key, "src"], "Asset must belong to this prospect namespace");
    }
    if ((asset.provenance === "official_site" || asset.provenance === "third_party") && !asset.sourceUrl) {
      add(["assets", key, "sourceUrl"], "Source URL is required for web-sourced assets");
    }
  }

  site.services.forEach((service, index) => assetRef(service.assetId, ["services", index, "assetId"]));

  site.page.sections.forEach((section, index) => {
    if (section.type === "proof") {
      unique(section.factIds, ["page", "sections", index, "factIds"]);
      section.factIds.forEach((factId, factIndex) => {
        const fact = facts.get(factId);
        if (!fact) add(["page", "sections", index, "factIds", factIndex], `Unknown fact: ${factId}`);
        if (section.enabled && fact?.evidence === "needs_review") {
          add(["page", "sections", index, "factIds", factIndex], `Unverified fact cannot appear in an enabled proof section: ${factId}`);
        }
      });
    }
    if (section.type === "services" && section.serviceIds) {
      unique(section.serviceIds, ["page", "sections", index, "serviceIds"]);
      section.serviceIds.forEach((serviceId, serviceIndex) => {
        if (!serviceIds.has(serviceId)) add(["page", "sections", index, "serviceIds", serviceIndex], `Unknown service: ${serviceId}`);
      });
    }
  });

  for (const variant of ["a", "b"] as const) {
    const presentation = site.presentations[variant];
    assetRef(presentation.hero.imageAssetId, ["presentations", variant, "hero", "imageAssetId"]);
    if (presentation.featuredServiceId && !serviceIds.has(presentation.featuredServiceId)) {
      add(["presentations", variant, "featuredServiceId"], `Unknown featured service: ${presentation.featuredServiceId}`);
    }
  }

  if (site.readiness === "ready_for_internal_review") {
    const requiredAssets = [site.brand.logoAssetId, site.presentations.a.hero.imageAssetId, site.presentations.b.hero.imageAssetId];
    requiredAssets.forEach((assetId, index) => {
      if (!assetId) add(index === 0 ? ["brand", "logoAssetId"] : ["presentations", index === 1 ? "a" : "b", "hero", "imageAssetId"], "Original brand/hero asset required for review");
    });
    for (const [key, asset] of Object.entries(site.assets)) {
      if (asset.provenance === "placeholder" || asset.rights !== "approved") {
        add(["assets", key], "Review-ready assets must be genuine and have approved usage rights");
      }
    }
    for (const [index, fact] of site.facts.entries()) {
      if (fact.evidence === "needs_review") add(["facts", index], "Unverified claim blocks review-ready state");
      if (!fact.sourceUrl) add(["facts", index, "sourceUrl"], "Review-ready claims require a source URL");
    }
  }
});

export type ProspectConfigInput = z.input<typeof prospectSchema>;
export type ProspectConfig = z.output<typeof prospectSchema>;
export type DesignId = "a" | "b";
export type SectionType = z.infer<typeof sectionSchema>["type"];
