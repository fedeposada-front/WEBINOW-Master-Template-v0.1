/**
 * South Cooling — DRAFT content data for the v0.3 pilot.
 * Phone, services and claims are sourced from the company's public website.
 * Selected photos are mapped for PRIVATE localhost design review only.
 * Their usage rights remain unconfirmed; no media is packaged in GitHub or production.
 * This file does NOT affect any existing v0.2 route or SEO metadata.
 */
import type { ProspectConfigInput } from "../../core/config/v3/prospect.schema.ts";

export const southCoolingDraft = {
  schemaVersion: "0.3",
  id: "south_cooling_llc_hialeah_fl",
  assetNamespace: "south-cooling",
  mode: "proposal",
  readiness: "draft",
  locale: "en-US",
  brand: {
    name: "South Cooling LLC",
    logoAssetId: null,
    colors: {
      primary: "#158AB5",
      dark: "#092D43",
      accent: "#74C5DB",
      surface: "#EEF6F8",
    },
  },
  business: {
    vertical: "HVAC and Commercial Refrigeration",
    phoneDisplay: "(305) 463-8866",
    phoneHref: "tel:+13054638866",
    email: "info@southcooling.com",
    serviceAreas: ["Miami-Dade", "Broward", "Palm Beach"],
    websiteUrl: "https://southcooling.com/",
  },
  seo: {
    title: "South Cooling — Unofficial WEBINOW Design Proposal",
    description: "Unofficial proposal demonstrating alternative ways to present South Cooling's commercial refrigeration and residential A/C services.",
    canonicalUrl: null,
  },
  services: [
    {
      id: "commercial-refrigeration",
      title: "Commercial Refrigeration",
      description: "Walk-in coolers, freezers and ice machines; installation, repair and maintenance.",
      category: "commercial",
      prominence: "primary",
      assetId: "commercial-rooftop",
    },
    {
      id: "residential-ac",
      title: "Residential A/C",
      description: "Air-conditioning installation, repairs and preventive maintenance for homeowners.",
      category: "residential",
      prominence: "standard",
      assetId: "technician",
    },
  ],
  facts: [
    { id: "since-2011", text: "Serving South Florida since 2011", evidence: "company_stated", sourceUrl: "https://southcooling.com/" },
    { id: "local-coverage", text: "Miami-Dade, Broward and Palm Beach", evidence: "company_stated", sourceUrl: "https://southcooling.com/" },
    { id: "license", text: "Florida Contractor License CAC-1818770", evidence: "company_stated", sourceUrl: "https://southcooling.com/" },
  ],
  // These are local *references*, not files tracked in Git.
  // No rights approval is asserted. Public builds continue hiding them.
  assets: {
    "hero-fleet": {
      src: "/sites/south-cooling/hero-fleet.webp",
      alt: "South Cooling service vehicles parked outside a commercial facility",
      sourceUrl: "https://southcooling.com/",
      provenance: "official_site",
      edited: true,
      rights: "unconfirmed",
      objectPosition: "center center",
    },
    "commercial-rooftop": {
      src: "/sites/south-cooling/commercial-rooftop.webp",
      alt: "Commercial rooftop HVAC and ventilation equipment",
      sourceUrl: "https://southcooling.com/",
      provenance: "official_site",
      edited: true,
      rights: "unconfirmed",
    },
    technician: {
      src: "/sites/south-cooling/technician.webp",
      alt: "HVAC technician servicing an indoor cooling system",
      sourceUrl: "https://southcooling.com/",
      provenance: "official_site",
      edited: true,
      rights: "unconfirmed",
      objectPosition: "center center",
    },
  },
  page: {
    sections: [
      { id: "trust", type: "proof", enabled: true, factIds: ["since-2011", "local-coverage", "license"] },
      { id: "service-choices", type: "services", enabled: true },
      { id: "contact", type: "contact", enabled: true },
    ],
  },
  presentations: {
    a: {
      hero: {
        eyebrow: "SOUTH FLORIDA / SINCE 2011",
        headline: "BUILT FOR THE HEAT.",
        supporting: "Commercial refrigeration and residential A/C services across South Florida.",
        imageAssetId: "hero-fleet",
      },
      featuredServiceId: "commercial-refrigeration",
    },
    b: {
      hero: {
        eyebrow: "PRECISION COOLING / SOUTH FLORIDA",
        headline: "Commercial cold. Residential calm.",
        supporting: "Refrigeration for businesses and A/C care for homes, with a simpler path to service.",
        imageAssetId: null,
      },
      featuredServiceId: "commercial-refrigeration",
    },
  },
  conversion: {
    primary: { kind: "estimate_demo", label: "Request an Estimate" },
    secondary: { kind: "phone", label: "Call South Cooling" },
  },
} satisfies ProspectConfigInput;
