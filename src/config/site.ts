import type { CSSProperties } from "react";

import rawSiteConfig from "./site.config.json";
import { siteSchema } from "./site.schema";

export const site = siteSchema.parse(rawSiteConfig);

export const COMPANY = site.brand.name;
export const PHONE_DISPLAY = site.business.phoneDisplay;
export const PHONE_HREF = site.business.phoneHref;
export const SITE_LOCALE = site.locale;

export const PRIMARY_CONVERSION = site.conversion.primary;
export const SECONDARY_CONVERSION = site.conversion.secondary;

export const IS_PROPOSAL = site.mode === "proposal";
export const IS_PRODUCTION = site.mode === "production";
export const SEO_ROBOTS = IS_PROPOSAL ? "noindex, nofollow" : "index, follow";
export const CANONICAL_URL =
  IS_PRODUCTION && site.seo.canonicalUrl ? site.seo.canonicalUrl : null;
export const OG_IMAGE_URL = site.seo.ogImageUrl;

const hasPhysicalAddress = Boolean(site.business.address.streetAddress);

export const STRUCTURED_DATA_JSON_LD = IS_PRODUCTION
  ? hasPhysicalAddress
    ? {
        "@context": "https://schema.org",
        "@type": site.business.schemaType,
        "@id": CANONICAL_URL ? `${CANONICAL_URL}#business` : undefined,
        name: site.brand.name,
        description: site.seo.description,
        url: CANONICAL_URL ?? undefined,
        telephone: site.business.phoneHref.replace(/^tel:/, ""),
        email: site.business.email ?? undefined,
        image: OG_IMAGE_URL ?? undefined,
        hasMap: site.business.mapsUrl ?? undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.business.address.streetAddress,
          addressLocality: site.business.address.locality,
          addressRegion: site.business.address.region,
          postalCode: site.business.address.postalCode ?? undefined,
          addressCountry: site.business.address.countryCode,
        },
        areaServed: site.serviceAreas.areas.map((area) => ({
          "@type": "Place",
          name: area,
        })),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": CANONICAL_URL ? `${CANONICAL_URL}#organization` : undefined,
        name: site.brand.name,
        description: site.seo.description,
        url: CANONICAL_URL ?? undefined,
        telephone: site.business.phoneHref.replace(/^tel:/, ""),
        email: site.business.email ?? undefined,
        image: OG_IMAGE_URL ?? undefined,
      }
  : null;

export const siteThemeStyle = {
  "--background": site.theme.background,
  "--foreground": site.theme.foreground,
  "--surface": site.theme.surface,
  "--surface-2": site.theme.surface2,
  "--ink": site.theme.ink,
  "--ink-foreground": site.theme.inkForeground,
  "--primary": site.theme.primary,
  "--accent": site.theme.accent,
  "--accent-foreground": site.theme.accentForeground,
  "--signal": site.theme.signal,
  "--signal-foreground": site.theme.signalForeground,
  "--border": site.theme.border,
  "--input": site.theme.border,
  "--hairline": site.theme.border,
  "--ring": site.theme.ring
} as CSSProperties;

export function siteNavItems() {
  return [
    ...(site.features.commercialEnabled
      ? [
          { label: "Residential", to: "/" },
          { label: "Commercial", to: "/commercial" }
        ]
      : []),
    { label: "Services", to: "#services" },
    ...(site.features.showReviews && site.reviews.length > 0
      ? [{ label: "Reviews", to: "#reviews" }]
      : []),
    ...(site.features.showAbout ? [{ label: "About", to: "#about" }] : []),
    ...(site.features.showServiceAreas
      ? [{ label: "Service Area", to: "#areas" }]
      : []),
    { label: "Contact", to: "#contact" }
  ];
}
