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

          <div className="relative min-h-[430px] overflow-hidden rounded-sm bg-ink shadow-lift">
            {site.media.heroImageUrl ? (
              <img
                src={site.media.heroImageUrl}
                alt={site.media.heroImageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: site.media.heroImagePosition }}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-ink-foreground sm:p-9">
              <p className="eyebrow text-signal">Local HVAC service</p>
              <p className="display-xl mt-3 max-w-md text-3xl sm:text-4xl">
                Comfort starts with a clear next step.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-foreground/80">
                <span>4.9 Google rating</span>
                <span>Open 24 hours</span>
                <a href={PHONE_HREF} className="font-semibold text-signal">
                  {PHONE_DISPLAY}
                </a>
              </div>
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
          intro="Start with the type of heating or cooling help you need, then contact Comfort SOS to confirm availability."
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
        <div className="max-w-4xl">
          <SectionHeading
            eyebrow={site.about.eyebrow}
            title={site.about.title}
            intro={site.about.body}
          />
          <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
            {site.about.facts.map((fact) => (
              <div key={fact.label} className="border-t border-hairline pt-4">
                <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="areas" tone="page">
        <SectionHeading
          eyebrow={site.serviceAreas.eyebrow}
          title={site.serviceAreas.title}
          intro={site.serviceAreas.intro}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {site.serviceAreas.areas.map((area) => (
            <div key={area} className="min-w-48 border border-hairline bg-background p-6">
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
