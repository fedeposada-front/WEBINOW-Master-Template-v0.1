/**
 * Editorial Precision — Concept B data adapter (Gate 3A).
 * No routes, CSS or React UI in this gate.
 * Never consumes the v0.2 site configuration or changes Concept A.
 * Unconfirmed photos are hidden by default; explicit local-dev previews
 * use the loopback-only Vite private media middleware.
 */
import type { ProspectConfig } from "../../core/config/v3/prospect.schema.ts";

export interface EditorialImage {
  src: string;
  alt: string;
  objectPosition?: string;
  reviewOnly?: true;
}

export interface EditorialService {
  id: string;
  title: string;
  description: string;
  category: string | null;
  featured: boolean;
  image: EditorialImage | null;
}

export interface EditorialFact {
  id: string;
  text: string;
  sourceUrl: string | null;
}

export interface EditorialModel {
  prospectId: string;
  company: string;
  locale: string;
  brand: {
    logo: EditorialImage | null;
    colors: ProspectConfig["brand"]["colors"];
  };
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    image: EditorialImage | null;
  };
  serviceAreas: string[];
  services: EditorialService[];
  facts: EditorialFact[];
  contact: {
    enabled: boolean;
    phone: { display: string; href: string };
    email: string | null;
  };
  estimate: {
    label: string;
    enabled: false;
    href: null;
  };
  disclaimer: string;
}

export function toEditorialModel(
  site: ProspectConfig,
  options: { internalMediaPreview?: boolean } = {},
): EditorialModel {
  const image = (assetId?: string | null): EditorialImage | null => {
    if (!assetId) return null;
    const asset = site.assets[assetId];
    if (!asset || asset.provenance === "placeholder") return null;
    const reviewOnly = asset.rights !== "approved";
    if (reviewOnly && !options.internalMediaPreview) return null;

    const src = reviewOnly
      ? asset.src.replace(/^\/sites\//, "/__internal-media/")
      : asset.src;
    const result: EditorialImage = { src, alt: asset.alt };
    if (asset.objectPosition) result.objectPosition = asset.objectPosition;
    if (reviewOnly) result.reviewOnly = true;
    return result;
  };

  const presentation = site.presentations.b;
  const serviceSection = site.page.sections.find(
    (section) => section.type === "services" && section.enabled,
  );
  const visibleIds =
    serviceSection?.type === "services" && serviceSection.serviceIds
      ? new Set(serviceSection.serviceIds)
      : null;

  const services: EditorialService[] = serviceSection
    ? site.services
        .filter((service) => visibleIds === null || visibleIds.has(service.id))
        .map((service) => ({
          id: service.id,
          title: service.title,
          description: service.description,
          category: service.category ?? null,
          featured: service.id === presentation.featuredServiceId,
          image: image(service.assetId),
        }))
    : [];

  const verifiedFactIds = new Set(
    site.page.sections
      .filter((section) => section.type === "proof" && section.enabled)
      .flatMap((section) => (section.type === "proof" ? section.factIds : [])),
  );
  const facts: EditorialFact[] = site.facts
    .filter((fact) => verifiedFactIds.has(fact.id) && fact.evidence !== "needs_review")
    .map((fact) => ({ id: fact.id, text: fact.text, sourceUrl: fact.sourceUrl ?? null }));

  return {
    prospectId: site.id,
    company: site.brand.name,
    locale: site.locale,
    brand: {
      logo: image(site.brand.logoAssetId),
      colors: site.brand.colors,
    },
    hero: {
      eyebrow: presentation.hero.eyebrow ?? "",
      headline: presentation.hero.headline,
      supporting: presentation.hero.supporting,
      image: image(presentation.hero.imageAssetId),
    },
    serviceAreas: [...site.business.serviceAreas],
    services,
    facts,
    contact: {
      enabled: site.page.sections.some((section) => section.type === "contact" && section.enabled),
      phone: { display: site.business.phoneDisplay, href: site.business.phoneHref },
      email: site.business.email ?? null,
    },
    estimate: {
      label: site.conversion.primary.label,
      href: null,
      enabled: false,
    },
    disclaimer: "Unofficial design proposal by WEBINOW — Not the company's official website.",
  };
}
