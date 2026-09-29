import { z } from "zod";

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const contentCardSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const siteSchema = z.object({
  id: z.string().min(1),
  mode: z.enum(["proposal", "production"]),
  variant: z.enum(["residential", "commercial"]),
  brand: z.object({
    name: z.string().min(1),
    shortName: z.string().min(1),
    mark: z.string().min(1).max(4),
    logoUrl: z.string().nullable(),
    logoAlt: z.string().min(1),
  }),
  business: z.object({
    vertical: z.string().min(1),
    phoneDisplay: z.string().min(1),
    phoneHref: z.string().min(1),
    email: z.string().nullable(),
    city: z.string().min(1),
    region: z.string().min(1),
    serviceArea: z.string().min(1),
    websiteUrl: z.string().nullable(),
    bookingUrl: z.string().nullable(),
  }),
  features: z.object({
    commercialEnabled: z.boolean(),
    showReviews: z.boolean(),
  }),
  media: z.object({
    heroImageUrl: z.string().nullable(),
    heroImageAlt: z.string().min(1),
    heroImagePosition: z.string().min(1),
    wideImageUrl: z.string().nullable(),
    wideImageAlt: z.string().min(1),
    featureImageUrl: z.string().nullable(),
    featureImageAlt: z.string().min(1),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  theme: z.object({
    background: z.string().min(1),
    foreground: z.string().min(1),
    surface: z.string().min(1),
    surface2: z.string().min(1),
    ink: z.string().min(1),
    inkForeground: z.string().min(1),
    primary: z.string().min(1),
    accent: z.string().min(1),
    accentForeground: z.string().min(1),
    signal: z.string().min(1),
    signalForeground: z.string().min(1),
    border: z.string().min(1),
    ring: z.string().min(1),
  }),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    proofLine: z.string().min(1),
    imageAlt: z.string().min(1),
  }),
  trust: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
    }),
  ).min(1),
  audiences: z.array(
    z.object({
      tag: z.string().min(1),
      title: z.string().min(1),
      body: z.string().min(1),
      cta: z.string().min(1),
      href: z.string().min(1),
    }),
  ),
  services: z.array(contentCardSchema).min(1),
  whyUs: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    intro: z.string().min(1),
    items: z.array(contentCardSchema).min(1),
  }),
  reviews: z.array(
    z.object({
      text: z.string().min(1),
      name: z.string().min(1),
      detail: z.string().min(1),
    }),
  ),
  process: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    steps: z.array(
      z.object({
        number: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    ).min(1),
  }),
  about: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    facts: z.array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    ).min(1),
    imageAlt: z.string().min(1),
  }),
  serviceAreas: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    intro: z.string().min(1),
    areas: z.array(z.string().min(1)).min(1),
  }),
  faq: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    items: z.array(faqSchema).min(1),
  }),
  contact: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    primaryCta: ctaSchema,
    formTitle: z.string().min(1),
    formOptions: z.array(z.string().min(1)).min(1),
  }),
  footer: z.object({
    hours: z.string().nullable(),
    note: z.string().nullable(),
  }),
  dataQuality: z.object({
    verifiedFields: z.array(z.string()),
    needsReview: z.array(z.string()),
  }),
});

export type SiteConfig = z.infer<typeof siteSchema>;
