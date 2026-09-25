import { createFileRoute } from "@tanstack/react-router";

import heroImg from "@/assets/hero-residential.jpg";
import residentialImg from "@/assets/residential-block.jpg";
import commercialImg from "@/assets/commercial-block.jpg";
import teamImg from "@/assets/team.jpg";
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
  VariantSwitch,
} from "@/components/site/chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plumbing for Homes & Businesses | Northline Plumbing" },
      {
        name: "description",
        content:
          "Residential plumbing repairs, drain cleaning, water heaters and repiping throughout [Service Area]. Licensed, insured and same-day service available.",
      },
      { property: "og:title", content: "Plumbing for Homes & Businesses | Northline Plumbing" },
      {
        property: "og:description",
        content:
          "Reliable plumbing repairs and installations from technicians who show up prepared, explain the work and get it done right.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResidentialHome,
});

const trust = [
  { big: "25+", small: "Years in business" },
  { big: "4.9 ★", small: "487 Google reviews" },
  { big: "Licensed", small: "& fully insured" },
  { big: "Same-Day", small: "Service available" },
  { big: "Res + Com", small: "One team, both" },
];

const services = [
  { name: "Emergency Plumbing", copy: "Burst pipes, backups and failures that can't wait for morning." },
  { name: "Clogged Drains", copy: "Kitchen, bath and main line drains cleared and camera-checked." },
  { name: "Leaks & Pipe Repair", copy: "Located accurately, repaired properly, drywall respected." },
  { name: "Water Heaters", copy: "Repair, replacement and tankless conversions, same-day when possible." },
  { name: "Sewer Lines", copy: "Camera inspection, hydro jetting, spot repair and replacement." },
  { name: "Repiping", copy: "Full-home repipes for failing galvanized and polybutylene systems." },
  { name: "Fixtures & Toilets", copy: "Faucets, toilets, disposals and shut-off valves." },
  { name: "Commercial Plumbing", copy: "Service, maintenance and project work for business properties." },
];

const why = [
  {
    title: "We Show Up Ready",
    copy: "Technicians arrive with the parts and diagnostic equipment for the job described on the call — not to schedule a second visit.",
  },
  {
    title: "Clear Communication",
    copy: "You see what we found, the options available and the price in writing before any work begins.",
  },
  {
    title: "Respect for Your Property",
    copy: "Floor protection, drop cloths and shoe covers on every call. We leave the space as we found it.",
  },
  {
    title: "Work We Stand Behind",
    copy: "Workmanship backed by [Company's actual warranty], with parts warranties documented on the invoice.",
  },
];

const reviews = [
  {
    text: "Water heater failed on a Saturday. They answered, gave me a two-hour window, and had a new unit in before dinner. Priced exactly what was quoted.",
    name: "Marisa T.",
    detail: "Water heater replacement · [City]",
  },
  {
    text: "Third plumber I'd called about a slab leak. First one to actually locate it instead of guessing. Cut one small access hole and patched it back.",
    name: "Dan R.",
    detail: "Leak detection · [City]",
  },
  {
    text: "They repiped our 1962 house over four days, kept water on every evening, and cleaned up nightly. The crew explained everything.",
    name: "The Alvarez family",
    detail: "Whole-home repipe · [City]",
  },
  {
    text: "Called about a kitchen drain, they found the real problem in the main line and showed me the camera footage. No pressure, no upsell.",
    name: "Priya S.",
    detail: "Drain cleaning · [City]",
  },
];

const steps = [
  { n: "1", t: "Tell Us What's Happening", c: "Call or request service online. We'll confirm an arrival window." },
  { n: "2", t: "We Diagnose the Problem", c: "An experienced technician evaluates the issue and explains your options and pricing." },
  { n: "3", t: "We Get It Fixed", c: "Approve the work and we complete it professionally, then clean up behind us." },
];

const faqs = [
  { q: "Do you provide same-day plumbing service?", a: "Same-day appointments are available most weekdays. Call before noon for the best chance of a same-day window." },
  { q: "Do you offer emergency plumbing?", a: "Yes. After-hours emergency dispatch is available for active leaks, sewer backups and no-water situations." },
  { q: "Are you licensed and insured?", a: "Licensed under #[000000], bonded and fully insured. Certificates available on request." },
  { q: "Do you provide estimates before beginning work?", a: "Every job is quoted in writing before work starts, so you approve the price, not a surprise." },
  { q: "What areas do you serve?", a: "[Primary City] and surrounding communities across [Region]. Call if you're unsure whether you're in range." },
  { q: "Do you repair and install water heaters?", a: "Tank, tankless and hybrid units — repair, replacement and code-compliant installation." },
];

function ResidentialHome() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <UtilityBar variant="residential" />
      <SiteNav variant="residential" />

      {/* 3. HERO */}
      <section className="bg-surface">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">Residential &amp; Commercial Plumbing · [Service Area]</p>
            <h1 className="display-xl mt-5 text-5xl sm:text-6xl lg:text-[4.4rem]">
              Professional plumbing for homes &amp; businesses.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Reliable repairs, installations and plumbing solutions throughout [Service Area],
              delivered by experienced professionals who show up prepared and get the job done right.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href="#contact">
                Schedule Service
              </Btn>
              <Btn kind="outline" size="lg" href={PHONE_HREF}>
                Call {PHONE_DISPLAY}
              </Btn>
            </div>
            <p className="mt-8 text-sm font-medium text-muted-foreground">
              Licensed &amp; Insured · Same-Day Service · Upfront Pricing · Workmanship Guaranteed
            </p>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Plumbing technician beside a branded service van in a residential driveway"
              width={1600}
              height={1104}
              className="aspect-[4/3] w-full rounded-sm object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-6 hidden rounded-sm bg-ink px-6 py-5 text-ink-foreground sm:block">
              <p className="font-display text-2xl font-bold">2-hour</p>
              <p className="text-xs uppercase tracking-[0.14em] text-ink-foreground/60">
                Arrival windows
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. TRUST BAR */}
      <div className="border-y border-hairline bg-surface-2">
        <Container className="grid grid-cols-2 divide-hairline sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {trust.map((t) => (
            <div key={t.small} className="px-2 py-7 text-center lg:px-6">
              <p className="font-display text-2xl font-bold">{t.big}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {t.small}
              </p>
            </div>
          ))}
        </Container>
      </div>

      {/* 5. RESIDENTIAL / COMMERCIAL SPLIT */}
      <Section tone="page">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              img: residentialImg,
              tag: "Homeowners",
              title: "Residential Plumbing",
              copy: "Plumbing problems shouldn't become household emergencies. From leaks and clogged drains to water heaters and repiping, our team provides dependable solutions designed to get your home back to normal quickly.",
              cta: "Explore Residential Services",
            },
            {
              img: commercialImg,
              tag: "Businesses & Property Pros",
              title: "Commercial Plumbing",
              copy: "From emergency repairs and ongoing maintenance to tenant improvements and new construction, we help businesses and property professionals keep plumbing systems operating reliably.",
              cta: "Explore Commercial Services",
            },
          ].map((b) => (
            <article key={b.title} className="group overflow-hidden rounded-sm bg-surface shadow-card">
              <img
                src={b.img}
                alt={b.title}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="p-7 sm:p-9">
                <p className="eyebrow">{b.tag}</p>
                <h3 className="display-xl mt-3 text-3xl">{b.title}</h3>
                <p className="mt-4 text-muted-foreground">{b.copy}</p>
                <a
                  href="#services"
                  className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.1em] text-signal"
                >
                  {b.cta} <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 6. SERVICES */}
      <Section id="services" tone="surface">
        <SectionHeading
          eyebrow="Services"
          title="How can we help?"
          intro="From routine repairs to complex plumbing projects, we handle the systems your home or business depends on every day."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <a
              key={s.name}
              href="#contact"
              className="group bg-surface p-7 transition-colors hover:bg-surface-2"
            >
              <div className="h-1 w-8 bg-signal" />
              <h3 className="mt-5 font-display text-lg font-bold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-signal opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <Btn kind="outline" href="#services">
            View All Plumbing Services
          </Btn>
        </div>
      </Section>

      {/* 7. WHY CHOOSE US */}
      <Section tone="page">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Why choose us"
            title="Plumbing done differently."
            intro="Every plumber claims quality and integrity. Here's what ours actually looks like on your property."
          />
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {why.map((w) => (
              <div key={w.title}>
                <h3 className="font-display text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-muted-foreground">{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 8. REVIEWS */}
      <Section id="reviews" tone="muted">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Reviews"
            title="Trusted by homeowners across [Service Area]."
            intro="Great service isn't what we say about ourselves — it's what customers say after the job is finished."
          />
          <div className="shrink-0 rounded-sm border border-hairline bg-surface px-7 py-6">
            <p className="font-display text-4xl font-bold">4.9 ★</p>
            <p className="mt-1 text-sm text-muted-foreground">Based on 487 Google reviews</p>
            <a href="#reviews" className="mt-3 inline-block text-sm font-semibold text-signal">
              Read our Google reviews →
            </a>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.map((r) => (
            <blockquote key={r.name} className="rounded-sm bg-surface p-7 shadow-card">
              <p className="text-signal">★★★★★</p>
              <p className="mt-4 text-[1.05rem] leading-relaxed">{r.text}</p>
              <footer className="mt-5 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted-foreground"> · {r.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* 9. EMERGENCY CTA */}
      <section className="bg-ink py-20 text-ink-foreground">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-signal">Emergency service</p>
            <h2 className="display-xl mt-4 text-4xl sm:text-5xl">Plumbing emergency?</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-foreground/70">
              Leaks, backups and plumbing failures don't wait for a convenient time. When you need
              help quickly, we're ready to respond.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn kind="signal" size="lg" href={PHONE_HREF}>
              Get a Plumber On the Way
            </Btn>
            <Btn kind="outline-invert" size="lg" href="#contact">
              Request Emergency Service
            </Btn>
          </div>
        </Container>
      </section>

      {/* 10. COMMERCIAL CAPABILITIES (secondary on residential version) */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Commercial"
              title="Plumbing solutions built for business."
              intro="Property managers, contractors and business owners need a plumbing partner who understands that downtime costs money. We provide responsive service, preventative maintenance and project support."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="primary" to="/commercial">
                Explore Commercial Plumbing
              </Btn>
              <Btn kind="outline" href="#contact">
                Request a Commercial Quote
              </Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3">
            {[
              "Property Management",
              "Hospitality",
              "Restaurants",
              "Retail",
              "Multifamily",
              "Healthcare",
            ].map((m) => (
              <div key={m} className="bg-surface p-6">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.08em]">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 12. PROCESS */}
      <Section tone="page">
        <SectionHeading
          eyebrow="What happens next"
          title="Getting your plumbing fixed should be simple."
        />
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8">
              <p className="font-display text-5xl font-bold text-signal">{s.n}</p>
              <h3 className="mt-5 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.c}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Btn kind="signal" size="lg" href="#contact">
            Schedule Your Service
          </Btn>
        </div>
      </Section>

      {/* 13. REAL TEAM */}
      <Section id="about" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <img
            src={teamImg}
            alt="The Northline Plumbing team in front of their service vans"
            loading="lazy"
            width={1600}
            height={900}
            className="aspect-[16/10] w-full rounded-sm object-cover shadow-card"
          />
          <div>
            <SectionHeading
              eyebrow="About"
              title="Your local plumbing team."
              intro="Northline is [Owner Name] and [N] technicians working out of one shop in [City]. Real people, real trucks, real jobs — the same crew you'll see in your driveway."
            />
            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
              {[
                ["Founded", "[Year] in [City]"],
                ["Team", "[N] technicians"],
                ["Fleet", "[N] stocked trucks"],
                ["Certifications", "[List]"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <Btn kind="outline" href="#about">
                Meet Our Team
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      {/* 14. SERVICE AREAS */}
      <Section id="areas" tone="page">
        <SectionHeading
          eyebrow="Service areas"
          title="Proudly serving [Region]."
          intro="Looking for a plumber near you? Our team serves homes and businesses throughout:"
        />
        <div className="mt-10 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-6">
          {["[City]", "[City]", "[City]", "[City]", "[City]", "[City]"].map((c, i) => (
            <a key={i} href="#areas" className="bg-background p-6 hover:bg-surface-2">
              <p className="font-display text-base font-semibold">{c}</p>
              <p className="mt-1 text-xs text-muted-foreground">Plumbing services</p>
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn kind="outline" href="#areas">
            View All Service Areas
          </Btn>
          <Btn kind="ghost" href={PHONE_HREF}>
            Not sure? Call {PHONE_DISPLAY}
          </Btn>
        </div>
      </Section>

      {/* 15. FINANCING / MAINTENANCE */}
      <Section tone="surface">
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              t: "Financing Available",
              c: "Larger repairs like repipes, sewer replacements and water heaters can be financed with approved credit through [Provider].",
              cta: "See Financing Options",
            },
            {
              t: "Ask About a Service Plan",
              c: "Annual plumbing inspections, drain maintenance and priority scheduling for members. Designed to prevent the emergency call.",
              cta: "Ask About a Service Plan",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-sm border border-hairline p-8">
              <h3 className="font-display text-2xl font-bold">{c.t}</h3>
              <p className="mt-3 text-muted-foreground">{c.c}</p>
              <a href="#contact" className="mt-5 inline-block text-sm font-semibold text-signal">
                {c.cta} →
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* 16. FAQ */}
      <Section tone="page">
        <SectionHeading eyebrow="FAQ" title="Questions homeowners ask us." />
        <FaqList items={faqs} />
      </Section>

      {/* 17. FINAL CTA + FORM */}
      <Section id="contact" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Need a plumber? Let's get it fixed."
              intro="Whether you're dealing with a plumbing problem today or planning a larger project, our team is ready to help. Tell us what you need and we'll take it from there."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href="#contact">
                Schedule Service
              </Btn>
              <Btn kind="outline" size="lg" href={PHONE_HREF}>
                Call {PHONE_DISPLAY}
              </Btn>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Business owner or property manager?{" "}
              <a href="/commercial" className="font-semibold text-signal">
                Request a commercial quote →
              </a>
            </p>
          </div>
          <LeadForm variant="residential" />
        </div>
      </Section>

      <SiteFooter variant="residential" />
      <MobileActionBar variant="residential" />
      <VariantSwitch variant="residential" />
    </div>
  );
}
