import { createFileRoute } from "@tanstack/react-router";

import fallbackWideImg from "@/assets/hero-residential.jpg";
import fallbackFeatureImg from "@/assets/residential-block.jpg";
import {
  Btn,
  Container,
  FaqList,
  LeadForm,
  MobileActionBar,
  Section,
  SectionHeading,
  SiteFooter,
  SiteNav,
  UtilityBar,
} from "@/components/site/chrome";
import {
  PRIMARY_CONVERSION,
  SECONDARY_CONVERSION,
  site,
  siteThemeStyle,
} from "@/config/site";

export const Route = createFileRoute("/")({
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

      <section className="relative min-h-[calc(100svh-112px)] overflow-hidden bg-ink text-ink-foreground">
        <img
          src={heroImage}
          alt={site.media.heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: site.media.heroImagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        <Container className="relative flex min-h-[calc(100svh-112px)] items-end py-14 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <p className="eyebrow text-signal">{site.hero.eyebrow}</p>
            <h1 className="display-xl mt-5 max-w-4xl text-5xl text-ink-foreground sm:text-7xl lg:text-[6.25rem]">
              {site.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/78 sm:text-xl">
              {site.hero.body}
            </p>
            <div className="mt-8 hidden flex-wrap gap-3 sm:flex">
              <Btn kind="signal" size="lg" href={PRIMARY_CONVERSION.href}>
                {PRIMARY_CONVERSION.label}
              </Btn>
              <Btn kind="outline-invert" size="lg" href={SECONDARY_CONVERSION.href}>
                {SECONDARY_CONVERSION.label}
              </Btn>
            </div>
            <a href="#services" className="mt-8 inline-flex border-b border-signal pb-2 font-display text-sm font-semibold uppercase tracking-[0.1em] text-ink-foreground sm:hidden">Explore services →</a>
            {site.hero.proofLine ? (
              <div className="mt-10 border-t border-hairline-inverse pt-5 text-sm text-ink-foreground/72">
                {site.hero.proofLine}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {site.features.showTrust && site.trust.length > 0 ? (
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
      ) : null}

      <Section id="services" tone="surface">
        <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow={site.servicesSection.eyebrow}
              title={site.servicesSection.title}
              intro={site.servicesSection.intro}
            />
            <div className="mt-8">
              <Btn kind="outline" href={PRIMARY_CONVERSION.href}>
                {PRIMARY_CONVERSION.label}
              </Btn>
            </div>
          </div>

          <div className="border-t border-hairline">
            {site.services.map((service, index) => (
              <a
                key={service.id}
                href={PRIMARY_CONVERSION.href}
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

      {site.features.showWideCta ? (
        <section className="relative min-h-[58vh] overflow-hidden bg-ink text-ink-foreground sm:min-h-[64vh]">
          <img
            src={wideImage}
            alt={site.media.wideImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: site.media.wideImagePosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/68 to-ink/10" />
          <Container className="relative flex min-h-[58vh] items-end py-14 sm:min-h-[64vh] sm:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow text-signal">{site.wideCta.eyebrow}</p>
              <h2 className="display-xl mt-5 text-5xl sm:text-6xl lg:text-7xl">
                {site.wideCta.title}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
                {site.wideCta.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn kind="signal" size="lg" href={PRIMARY_CONVERSION.href}>
                  {PRIMARY_CONVERSION.label}
                </Btn>
                <Btn kind="outline-invert" size="lg" href={SECONDARY_CONVERSION.href}>
                  {SECONDARY_CONVERSION.label}
                </Btn>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {site.features.showProcess && site.process.steps.length > 0 ? (
        <Section tone="page">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow={site.process.eyebrow}
                title={site.process.title}
                intro={site.process.intro}
              />
            </div>
            <div className="space-y-0">
              {site.process.steps.map((step, index) => (
                <div
                  key={step.number}
                  className="grid gap-5 border-t border-hairline py-8 sm:grid-cols-[88px_0.8fr_1.2fr] sm:items-start"
                >
                  <p className="font-display text-5xl font-bold text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                  <p className="max-w-xl text-muted-foreground">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null}

      {site.features.showAbout ? (
        <Section id="about" tone="muted">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="relative min-h-[520px] overflow-hidden rounded-sm bg-ink">
              <img
                src={featureImage}
                alt={site.media.featureImageAlt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: site.media.featureImagePosition }}
              />
            </div>

            <div className="flex flex-col justify-between gap-10 py-2 lg:py-8">
              <SectionHeading
                eyebrow={site.about.eyebrow}
                title={site.about.title}
                intro={site.about.body}
              />

              {site.about.facts.length > 0 ? (
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
              ) : null}
            </div>
          </div>
        </Section>
      ) : null}

      {site.features.showReviews && site.reviews.length > 0 ? (
        <Section id="reviews" tone="surface">
          <SectionHeading
            eyebrow="Reviews"
            title="What customers say."
            intro="Verified customer feedback can provide the strongest proof when it is available."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {site.reviews.map((review) => (
              <figure key={`${review.name}-${review.detail}`} className="border-t border-hairline pt-6">
                <blockquote className="text-lg leading-relaxed">“{review.text}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{review.name}</span>
                  <span className="block">{review.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ) : null}

      {site.features.showServiceAreas && site.serviceAreas.areas.length > 0 ? (
        <section
          id="areas"
          className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="eyebrow text-signal">{site.serviceAreas.eyebrow}</p>
                <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-foreground/55">
                  {site.business.serviceArea}
                </p>
                <h2 className="display-xl mt-3 text-6xl leading-[0.9] text-ink-foreground sm:text-7xl lg:text-8xl">
                  {site.serviceAreas.title}
                </h2>
              </div>
              <div className="max-w-xl border-t border-hairline-inverse pt-6 lg:mb-2">
                <p className="text-xl leading-relaxed text-ink-foreground/78">
                  {site.serviceAreas.intro}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn kind="signal" size="lg" href={PRIMARY_CONVERSION.href}>
                    {PRIMARY_CONVERSION.label}
                  </Btn>
                  <Btn kind="outline-invert" size="lg" href={SECONDARY_CONVERSION.href}>
                    {SECONDARY_CONVERSION.label}
                  </Btn>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {site.features.showFaq && faqItems.length > 0 ? (
        <Section tone="muted">
          <SectionHeading eyebrow={site.faq.eyebrow} title={site.faq.title} />
          <FaqList items={faqItems} />
        </Section>
      ) : null}

      <section id="contact" className="bg-surface py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">{site.contact.eyebrow}</p>
              <h2 className="display-xl mt-4 max-w-xl text-5xl sm:text-6xl">
                {site.contact.title}
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {site.contact.body}
              </p>
            </div>

            <div className="border-t border-hairline pt-8 sm:pt-10">
              <p className="font-display text-2xl font-bold">{site.contact.choiceTitle}</p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                {site.contact.choiceBody}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Btn kind="signal" size="lg" href={PRIMARY_CONVERSION.href}>
                  {PRIMARY_CONVERSION.label}
                </Btn>
                <Btn kind="outline" size="lg" href={SECONDARY_CONVERSION.href}>
                  {SECONDARY_CONVERSION.label}
                </Btn>
              </div>

              {site.contact.facts.length > 0 ? (
                <dl className="mt-10 grid gap-6 border-t border-hairline pt-7 text-sm sm:grid-cols-2">
                  {site.contact.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {fact.label}
                      </dt>
                      <dd className="mt-2 font-display text-lg font-semibold">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {site.features.showContactForm ? (
                <div className="mt-10">
                  <LeadForm variant="residential" />
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter variant="residential" />
      <MobileActionBar variant="residential" />
    </div>
  );
}
