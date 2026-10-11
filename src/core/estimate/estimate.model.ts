/**
 * Shared EstimateDemo — Gate 4A, pure data adapter.
 *
 * A/B routes share this model. It does not collect, transmit or persist PII,
 * calculate prices, make promises, or produce a real quote.
 * /estimate and all CTA links remain disabled until a separate UI + QA gate.
 */
import type { DesignId, ProspectConfig } from "../config/v3/prospect.schema.ts";

export interface EstimateService {
  id: string;
  title: string;
  description: string;
}

export interface EstimateDemoModel {
  prospectId: string;
  company: string;
  locale: string;
  design: DesignId;
  backHref: "/a" | "/b";
  service: string | null;
  services: EstimateService[];
  steps: readonly [
    { id: "select"; label: string },
    { id: "review"; label: string },
    { id: "complete"; label: string },
  ];
  demoNotice: string;
  completedMessage: string;
  phone: { display: string; href: string };
  disclaimer: string;
}

export function toEstimateDemoModel(
  site: ProspectConfig,
  query: { design?: string | null; service?: string | null } = {},
): EstimateDemoModel {
  const design: DesignId = query.design === "b" ? "b" : "a";

  const section = site.page.sections.find((item) => item.type === "services" && item.enabled);
  const allowed =
    section?.type === "services" && section.serviceIds
      ? new Set(section.serviceIds)
      : null;
  const services: EstimateService[] = section
    ? site.services
        .filter((service) => allowed === null || allowed.has(service.id))
        .map((service) => ({
          id: service.id,
          title: service.title,
          description: service.description,
        }))
    : [];

  // Never reflect raw URL strings as rendered content or as a selected service.
  const selected = services.find((service) => service.id === query.service) ?? services[0];

  return {
    prospectId: site.id,
    company: site.brand.name,
    locale: site.locale,
    design,
    backHref: design === "b" ? "/b" : "/a",
    service: selected?.id ?? null,
    services,
    steps: [
      { id: "select", label: "Select a service" },
      { id: "review", label: "Preview the next steps" },
      { id: "complete", label: "Demo complete" },
    ],
    demoNotice: "Interactive demonstration only. No quote is calculated and no request is submitted.",
    completedMessage: "Demo only — no request sent.",
    phone: { display: site.business.phoneDisplay, href: site.business.phoneHref },
    disclaimer: "Unofficial design proposal by WEBINOW — Not the company's official website.",
  };
}
