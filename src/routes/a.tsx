/**
 * Gate 2C — local-only Concept A visual QA route.
 *
 * IMPORTANT: this branch is not deployment-ready. Legacy / and /commercial
 * still render prior demo content and must be isolated before a public deploy.
 */
import { createFileRoute } from "@tanstack/react-router";

import { activeProspectV3 } from "@/core/config/v3/prospect";
import { CinematicPage } from "@/layouts/cinematic/CinematicPage";
import { toCinematicModel } from "@/layouts/cinematic/cinematic.model";

export const Route = createFileRoute("/a")({
  head: () => ({
    meta: [
      { title: activeProspectV3.seo.title },
      { name: "description", content: activeProspectV3.seo.description },
      { name: "author", content: "WEBINOW Labs" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { property: "og:title", content: activeProspectV3.seo.title },
      { property: "og:description", content: activeProspectV3.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: activeProspectV3.seo.title },
      { name: "twitter:description", content: activeProspectV3.seo.description },
    ],
  }),
  component: ConceptARoute,
});

function ConceptARoute() {
  // Only vite dev can request unapproved photos through the private loopback media plugin.
  // Production SSR and build have no media files and never render these references.
  const model = toCinematicModel(activeProspectV3, {
    internalMediaPreview: import.meta.env.DEV,
  });
  return <CinematicPage model={model} />;
}
