/**
 * Gate 3C — local-only Editorial Precision visual QA route.
 *
 * NOT deployment-ready. Legacy / and /commercial still expose prior-demo
 * content and must be isolated before any public release.
 * Unapproved photographs are previewed only on the developer's loopback
 * via a Vite serve-only plugin; the production bundle hides them.
 */
import { createFileRoute } from "@tanstack/react-router";

import { activeProspectV3 } from "@/core/config/v3/prospect";
import { EditorialPage } from "@/layouts/editorial/EditorialPage";
import { toEditorialModel } from "@/layouts/editorial/editorial.model";

const seoTitle = activeProspectV3.brand.name + " — Editorial Precision | Unofficial WEBINOW Design Proposal";
const seoDescription = activeProspectV3.seo.description;

export const Route = createFileRoute("/b")({
  head: () => ({
    meta: [
      { title: seoTitle },
      { name: "description", content: seoDescription },
      { name: "author", content: "WEBINOW Labs" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { property: "og:title", content: seoTitle },
      { property: "og:description", content: seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: seoTitle },
      { name: "twitter:description", content: seoDescription },
    ],
  }),
  component: ConceptBRoute,
});

function ConceptBRoute() {
  const model = toEditorialModel(activeProspectV3, {
    internalMediaPreview: import.meta.env.DEV,
  });
  return <EditorialPage model={model} />;
}
