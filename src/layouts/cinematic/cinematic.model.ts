/**
 * Industrial Cinematic: presentation adapter for the v0.3 prospect contract.
 *
 * Intentionally has NO route, no global CSS, no site-v0.2 imports and no
 * network access. Gate 2A: validate the content contract before porting JSX.
 *
 * Images must have approved rights to appear; existence of local files is
 * checked separately at the publishing gate. Null is a deliberate placeholder.
 */
import type { ProspectConfig } from "../../core/config/v3/prospect.schema.ts";

export interface CinematicImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface CinematicService {
  id: string;
  index: string;
  title: string;
  description: string;
  category: string | null;
  featured: boolean;
  image: CinematicImage | null;
}

export interface CinematicFact {
  id: string;
  text: string;
  sourceUrl: string | null;
}

export interface CinematicModel {
  prospectId: string;
  company: string;
  locale: string;
  brand: {
    logo: CinematicImage | null;
    colors: ProspectConfig["brand"]["colors"];
  };
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    image: CinematicImage | null;
  };
  serviceAreas: string[];
  phone: { display: string; href: string };
  services: CinematicService[];
  facts: CinematicFact[];
  estimate: {
    label: string;
    /** Remains null until the shared /estimate route is implemented and tested. */
    href: null;
    enabled: false;
  };
  disclaimer: string;
}

export function toCinematicModel(site: ProspectConfig): CinematicModel {
  const image = (assetId?: string | null): CinematicImage | null => {
    if (!assetId) return null;
    const asset = site.assets[assetId];
    if (!asset || asset.rights !== "approved" || asset.provenance === "placeholder") {
      return null;
    }
    const result: CinematicImage = { src: asset.src, alt: asset.alt };
    if (asset.objectPosition) result.objectPosition = asset.objectPosition;
    return result;
  };

  const enabledServiceSection = site.page.sections.find(
    (section) => section.enabled && section.type === "services",
  );
  const serviceIds =
    enabledServiceSection?.type === "services" && enabledServiceSection.serviceIds
      ? new Set(enabledServiceSection.serviceIds)
      : null;

  const services =
    enabledServiceSection == null
      ? []
      : site.services
          .filter((service) => serviceIds == null || serviceIds.has(service.id))
          .map((service, index): CinematicService => ({
            id: service.id,
            index: String(index + 1).padStart(2, "0"),
            title: service.title,
            description: service.description,
            category: service.category ?? null,
            featured: site.presentations.a.featuredServiceId === service.id,
            image: image(service.assetId),
          }));

  const enabledProofIds = new Set(
    site.page.sections
      .filter((section) => section.enabled && section.type === "proof")
      .flatMap((section) => (section.type === "proof" ? section.factIds : [])),
  );

  const facts = site.facts
    .filter(
      (fact) => enabledProofIds.has(fact.id) && fact.evidence !== "needs_review",
    )
    .map((fact): CinematicFact => ({
      id: fact.id,
      text: fact.text,
      sourceUrl: fact.sourceUrl ?? null,
    }));

  return {
    prospectId: site.id,
    company: site.brand.name,
    locale: site.locale,
    brand: { logo: image(site.brand.logoAssetId), colors: site.brand.colors },
    hero: {
      eyebrow: site.presentations.a.hero.eyebrow ?? "",
      headline: site.presentations.a.hero.headline,
      supporting: site.presentations.a.hero.supporting,
      image: image(site.presentations.a.hero.imageAssetId),
    },
    serviceAreas: [...site.business.serviceAreas],
    phone: {
      display: site.business.phoneDisplay,
      href: site.business.phoneHref,
    },
    services,
    facts,
    estimate: {
      label: site.conversion.primary.label,
      href: null,
      enabled: false,
    },
    disclaimer: "Unofficial design proposal by WEBINOW — Not the company's official website.",
  };
}
