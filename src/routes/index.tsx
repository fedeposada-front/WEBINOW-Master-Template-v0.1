import { createFileRoute } from "@tanstack/react-router";

import fallbackWideImg from "@/assets/hero-residential.jpg";
import fallbackFeatureImg from "@/assets/residential-block.jpg";
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

  const heroImage = site.media.heroImageUrl ?? fallbackWideImg;
  const wideImage = site.media.wideImageUrl ?? fallbackWideImg;
  const featureImage = site.media.featureImageUrl ?? fallbackFeatureImg;

  return (
    <div className="min-h-screen bg-background font-sans" style={siteThemeStyle}>
      <UtilityBar variant="residential" />
      <SiteNav variant="residential" />

      {/* Editorial hero */}
      <section className="overflow-hidden bg-surface">
        <Container className="grid min-h-[76vh] gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
          <div className="relative z-10">
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1 className="display-xl mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-[4.9rem]">
              {site.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
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

          <div className="relative min-h-[520px] overflow-hidden rounded-sm bg-ink shadow-lift lg:min-h-[620px]">
            <img
              src={heroImage}
              alt={site.media.heroImageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
              style={{ objectPosition: site.media.heroImagePosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-ink-foreground sm:p-10">
              <p className="eyebrow text-signal">Local HVAC service</p>
              <p className="display-xl mt-3 max-w-lg text-3xl sm:text-4xl">
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

      {/* Compact proof strip */}
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

      {/* Services as an editorial list, not a card grid */}
      <Section id="services" tone="surface">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Services"
              title="A clearer service path."
              intro="Start with the type of heating or cooling help you need, then contact Comfort SOS to confirm availability."
            />
            <div className="mt-8">
              <Btn kind="outline" href="#contact">Request service</Btn>
            </div>
          </div>

          <div className="border-t border-hairline">
            {site.services.map((service, index) => (
              <a
                key={service.title}
                href="#contact"
                className="group grid gap-4 border-b border-hairline py-8 transition-colors hover:bg-surface-2 sm:grid-cols-[72px_0.75fr_1.25fr_auto] sm:items-start sm:px-4"
              >
                <span className="font-display text-sm font-bold text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold">{service.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {service.body}
                </p>
                <span className="text-signal transition-transform group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Full-bleed image CTA: the deliberate break in rhythm Gonzalo asked for */}
      <section className="relative min-h-[68vh] overflow-hidden bg-ink text-ink-foreground">
        <img
          src={wideImage}
          alt={site.media.wideImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
        <Container className="relative flex min-h-[68vh] items-end py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-signal">Available when you need help</p>
            <h2 className="display-xl mt-5 text-5xl sm:text-6xl lg:text-7xl">
              Your comfort system should not make you wait.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
              Comfort SOS is listed as open 24 hours. Start with a quick call or book service online
              and confirm the right next step for your property.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href={site.hero.primaryCta.href}>
                {site.hero.primaryCta.label}
              </Btn>
              <Btn kind="outline-invert" size="lg" href={PHONE_HREF}>
                Call {PHONE_DISPLAY}
              </Btn>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <Section tone="page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={site.process.eyebrow}
            title={site.process.title}
          />
          <p className="max-w-md text-muted-foreground">
            One clear path from the first question to the next action.
          </p>
        </div>
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-3">
          {site.process.steps.map((step) => (
            <div key={step.number} className="bg-background p-8 sm:p-10">
              <p className="font-display text-6xl font-bold text-signal">{step.number}</p>
              <h3 className="mt-8 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Image-led company section */}
      <Section id="about" tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="relative min-h-[520px] overflow-hidden rounded-sm bg-ink">
            <img
              src={featureImage}
              alt={site.media.featureImageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between gap-10 py-2 lg:py-8">
            <div>
              <SectionHeading
                eyebrow={site.about.eyebrow}
                title={site.about.title}
                intro={site.about.body}
              />
            </div>

            <dl className="grid gap-6 text-sm">
              {site.about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-hairline pt-5">
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Service area */}
      <Section id="areas" tone="page">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow={site.serviceAreas.eyebrow}
            title={site.serviceAreas.title}
            intro={site.serviceAreas.intro}
          />
          <div className="flex flex-wrap gap-3">
            {site.serviceAreas.areas.map((area) => (
              <div key={area} className="min-w-48 border border-hairline bg-surface p-6">
                <p className="font-display text-base font-semibold">{area}</p>
                <p className="mt-1 text-xs text-muted-foreground">Confirm availability by phone</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow={site.faq.eyebrow} title={site.faq.title} />
        <FaqList items={faqItems} />
      </Section>

      {/* Contact */}
      <Section id="contact" tone="page">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
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
