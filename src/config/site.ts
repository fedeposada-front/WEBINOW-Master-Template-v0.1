import type { CSSProperties } from "react";

import rawSiteConfig from "./site.config.json";
import { siteSchema } from "./site.schema";

export const site = siteSchema.parse(rawSiteConfig);

export const COMPANY = site.brand.name;
export const PHONE_DISPLAY = site.business.phoneDisplay;
export const PHONE_HREF = site.business.phoneHref;

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
    { label: "About", to: "#about" },
    { label: "Service Area", to: "#areas" },
    { label: "Contact", to: "#contact" }
  ];
}
