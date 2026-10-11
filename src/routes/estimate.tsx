/**
 * Gate 4C — local-only shared EstimateDemo route for Concepts A and B.
 *
 * NOTE: Never deploy this branch. Legacy / and /commercial still render
 * prior-client examples; the demo itself never accepts or transmits PII.
 * No existing CTA is enabled in this gate.
 */
import { createFileRoute } from "@tanstack/react-router";

import { activeProspectV3 } from "@/core/config/v3/prospect";
import { EstimateDemoPage } from "@/core/estimate/EstimateDemoPage";
import { toEstimateDemoModel } from "@/core/estimate/estimate.model";

const title = activeProspectV3.brand.name + " — Interactive Estimate Demo | WEBINOW Labs";
const description =
  "Unofficial interactive service-selection demonstration. No quote is calculated and no request is submitted.";

export const Route = createFileRoute("/estimate")({
  validateSearch: (search: Record<string, unknown>) => ({
    design: search["design"] === "b" ? "b" : "a",
    service:
      typeof search["service"] === "string" &&
      search["service"].length <= 80 &&
      /^[a-z0-9][a-z0-9_-]*$/.test(search["service"])
        ? search["service"]
        : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: "WEBINOW Labs" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: EstimateRoute,
});

function EstimateRoute() {
  const search = Route.useSearch();
  const model = toEstimateDemoModel(activeProspectV3, search);
  return <EstimateDemoPage model={model} />;
}
