import { createFileRoute } from "@tanstack/react-router";

import {
  Btn,
  Container,
  FaqList,
  LeadForm,
  MobileActionBar,
  PHONE_DISPLAY,
  PHONE_HREF,
  Section,
  SectionHeading,
  SiteFooter,
  SiteNav,
  UtilityBar,
} from "@/components/site/chrome";
import { site, siteThemeStyle } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: site.seo.title },
      { name: "description", content: site.seo.description },
      { property: "og:title", content: site.seo.title },
      { property: "og:description", content: site.seo.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResidentialHome,
});

function ResidentialHome() {
  const faqItems = site.faq.items.map((item) => ({
    q: item.question,
    a: item.answer,
  }));

  return (
    <div className="min-h-screen bg-background font-sans" style={siteThemeStyle}>
      <UtilityBar variant="residential" />
      <SiteNav variant="residential" />

      <section className="overflow-hidden bg-surface">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1 className="display-xl mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-[4.7rem]">
              {site.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {site.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href={site.hero.primaryCta.href}>
                {site.hero.primaryCta.label}
              </Btn>
              <Btn kind="outline" size="lg" href={site.hero.secondaryCta.href}>
                {site.hero.secondaryCta.label}
              </Btn>
            </div>
            <p className="mt-8 text-sm font-medium text-muted-foreground">
              {site.hero.proofLine}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-sm bg-ink p-8 text-ink-foreground shadow-lift sm:p-10">
            <p className="eyebrow text-signal">WEBINOW concept</p>
            <p className="display-xl mt-5 text-4xl">Built around the next customer action.</p>
            <p className="mt-5 text-base leading-relaxed text-ink-foreground/70">
              This proposal uses only verified business details from the current prospect record.
              Unverified claims such as licenses, reviews, warranties, pricing and years in business
              are intentionally excluded.
            </p>
            <div className="mt-10 border-t border-hairline-inverse pt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-foreground/50">
                Verified contact
              </p>
              <a href={PHONE_HREF} className="mt-2 block font-display text-3xl font-bold text-signal">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-y border-hairline bg-surface-2">
        <Container className="grid grid-cols-1 divide-hairline sm:grid-cols-3 sm:divide-x">
          {site.trust.map((item) => (
            <div key={item.label} className="px-4 py-7 text-center">
              <p className="font-display text-2xl font-bold">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </Container>
      </div>

      <Section id="services" tone="surface">
        <SectionHeading
          eyebrow="Services"
          title="A clearer service path."
          intro="This proof keeps service categories broad until Comfort SOS confirms its exact service scope."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((service) => (
            <article key={service.title} className="bg-surface p-7">
              <div className="h-1 w-8 bg-signal" />
              <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
              <a href="#contact" className="mt-5 inline-block text-sm font-semibold text-signal">
                Request service →
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="page">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow={site.whyUs.eyebrow}
            title={site.whyUs.title}
            intro={site.whyUs.intro}
          />
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {site.whyUs.items.map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-ink py-20 text-ink-foreground">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-signal">Need HVAC help?</p>
            <h2 className="display-xl mt-4 text-4xl sm:text-5xl">
              Start with a direct conversation.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-foreground/70">
              Share your location and a short description of the issue so Comfort SOS can confirm
              availability and the next step.
            </p>
          </div>
          <Btn kind="signal" size="lg" href={PHONE_HREF}>
            Call {PHONE_DISPLAY}
          </Btn>
        </Container>
      </section>

      <Section tone="page">
        <SectionHeading
          eyebrow={site.process.eyebrow}
          title={site.process.title}
        />
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-3">
          {site.process.steps.map((step) => (
            <div key={step.number} className="bg-background p-8">
              <p className="font-display text-5xl font-bold text-signal">{step.number}</p>
              <h3 className="mt-5 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={site.about.eyebrow}
              title={site.about.title}
              intro={site.about.body}
            />
            <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
              {site.about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-sm border border-hairline bg-surface p-8 shadow-card">
            <p className="eyebrow">Data quality</p>
            <h3 className="mt-4 font-display text-2xl font-bold">No invented proof.</h3>
            <p className="mt-3 text-muted-foreground">
              Reviews, licenses, warranties, pricing, certifications and operating hours stay out
              of the public proof until they are verified.
            </p>
          </div>
        </div>
      </Section>

      <Section id="areas" tone="page">
        <SectionHeading
          eyebrow={site.serviceAreas.eyebrow}
          title={site.serviceAreas.title}
          intro={site.serviceAreas.intro}
        />
        <div className="mt-10 grid gap-px bg-hairline sm:grid-cols-3">
          {site.serviceAreas.areas.map((area) => (
            <div key={area} className="bg-background p-6">
              <p className="font-display text-base font-semibold">{area}</p>
              <p className="mt-1 text-xs text-muted-foreground">Confirm availability by phone</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={site.faq.eyebrow} title={site.faq.title} />
        <FaqList items={faqItems} />
      </Section>

      <Section id="contact" tone="page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow={site.contact.eyebrow}
              title={site.contact.title}
              intro={site.contact.body}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href={site.contact.primaryCta.href}>
                {site.contact.primaryCta.label}
              </Btn>
              <Btn kind="outline" size="lg" href={PHONE_HREF}>
                Call {PHONE_DISPLAY}
              </Btn>
            </div>
          </div>
          <LeadForm variant="residential" />
        </div>
      </Section>

      <SiteFooter variant="residential" />
      <MobileActionBar variant="residential" />
    </div>
  );
}
