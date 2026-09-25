import { createFileRoute } from "@tanstack/react-router";

import heroImg from "@/assets/hero-commercial.jpg";
import residentialImg from "@/assets/residential-block.jpg";
import commercialImg from "@/assets/commercial-block.jpg";
import teamImg from "@/assets/team.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
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

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Plumbing Contractor | Northline Plumbing" },
      {
        name: "description",
        content:
          "Commercial plumbing service, preventative maintenance, tenant improvements and new construction for property managers, GCs and developers throughout [Region].",
      },
      { property: "og:title", content: "Commercial Plumbing Contractor | Northline Plumbing" },
      {
        property: "og:description",
        content:
          "Responsive commercial plumbing service and project delivery for property managers, general contractors and developers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommercialHome,
});

const trust = [
  { big: "25+", small: "Years contracting" },
  { big: "$1.5M+", small: "Single-scope capacity" },
  { big: "Bonded", small: "& fully insured" },
  { big: "24-Hour", small: "Emergency response" },
  { big: "[N] Crews", small: "Service + construction" },
];

const markets = [
  { t: "Property Management", c: "Multi-site service agreements and single point of contact." },
  { t: "Multifamily", c: "Unit turns, risers, repipes and common-area systems." },
  { t: "Hospitality", c: "Occupied-building work scheduled around guests." },
  { t: "Restaurants", c: "Grease interceptors, jetting, health-inspection support." },
  { t: "Retail", c: "Rollouts and tenant improvements on landlord schedules." },
  { t: "Healthcare", c: "Medical gas, ICRA awareness, infection-control protocols." },
  { t: "Construction", c: "Ground-up plumbing scope with GCs and developers." },
  { t: "Industrial", c: "Process piping, backflow assemblies and compliance testing." },
];

const projects = [
  {
    img: project1,
    name: "[Hotel Project Name]",
    type: "Hospitality / New Construction",
    city: "[City, State]",
    scope: "Complete plumbing scope, 164 keys",
    gc: "[General Contractor]",
    size: "164 keys · 9 floors",
  },
  {
    img: project2,
    name: "[Restaurant Group Rollout]",
    type: "Restaurant / Tenant Improvement",
    city: "[City, State]",
    scope: "Kitchen rough-in, grease interceptor, gas piping",
    gc: "[General Contractor]",
    size: "6 locations",
  },
  {
    img: project3,
    name: "[Medical Office Campus]",
    type: "Healthcare / Renovation",
    city: "[City, State]",
    scope: "Med gas, domestic water, sanitary replacement",
    gc: "[General Contractor]",
    size: "48,000 SF",
  },
];

const capabilities = [
  {
    t: "Capacity & Manpower",
    c: "[N] service technicians and [N] construction crews, with foremen assigned per project and the ability to add manpower to hold a schedule.",
  },
  {
    t: "Project Management",
    c: "Dedicated PM on every project: submittals, RFIs, coordination drawings, look-ahead schedules and closeout documentation.",
  },
  {
    t: "Safety & Compliance",
    c: "Written safety program, OSHA-30 supervision, EMR of [0.00], and site-specific plans on request. Bonding available to $[amount].",
  },
  {
    t: "Responsiveness",
    c: "24-hour emergency dispatch for contract accounts with documented response targets and after-action reporting.",
  },
];

const services = [
  { name: "Commercial Service & Repair", copy: "Dispatched crews for occupied buildings and multi-site portfolios." },
  { name: "Preventative Maintenance", copy: "Scheduled jetting, inspections and backflow testing under contract." },
  { name: "Tenant Improvements", copy: "TI plumbing scope coordinated with landlord and GC schedules." },
  { name: "New Construction", copy: "Ground-up underground through trim-out and final inspection." },
  { name: "Hydro Jetting & Drains", copy: "High-volume sanitary and grease line cleaning with camera records." },
  { name: "Backflow & Compliance", copy: "Certified testing, repair and municipal reporting." },
  { name: "Water Heating Systems", copy: "Commercial boilers, tankless banks and recirculation systems." },
  { name: "Underground & Site Utilities", copy: "Site water, sanitary and storm tie-ins." },
];

const reviews = [
  {
    text: "They carried three of our properties through a bad freeze weekend and gave us a written report per building on Monday. That's what we pay a contractor for.",
    name: "[Name]",
    detail: "Regional Manager, [Property Management Co.]",
  },
  {
    text: "Submittals were in on time, coordination drawings were clean, and they never became the reason we lost a day on the schedule.",
    name: "[Name]",
    detail: "Project Manager, [General Contractor]",
  },
  {
    text: "Kitchen went down mid-service. Crew arrived within the hour, jetted the line and had us open for dinner.",
    name: "[Name]",
    detail: "Owner, [Restaurant Group]",
  },
];

const steps = [
  { n: "1", t: "Scope Review", c: "Walk the site or review drawings. We flag constraints before they become change orders." },
  { n: "2", t: "Proposal & Schedule", c: "Line-item pricing, exclusions stated plainly, and a durations-based schedule commitment." },
  { n: "3", t: "Execution & Closeout", c: "Assigned foreman, weekly reporting, and full closeout documentation at turnover." },
];

const faqs = [
  { q: "Do you work on commercial properties?", a: "Commercial and multifamily work is a core part of our business — service, maintenance, tenant improvements and ground-up construction." },
  { q: "Are you bonded and insured?", a: "Bonded to $[amount] and insured at $[amount] general liability with additional insured endorsements available." },
  { q: "Do you offer preventative maintenance agreements?", a: "Yes — scheduled jetting, inspections, backflow testing and priority response, priced per property or per portfolio." },
  { q: "What is your emergency response time?", a: "Contract accounts receive documented response targets, typically [N] hours within our primary service area." },
  { q: "Can you handle multi-site portfolios?", a: "Yes, with a single point of contact, standardized reporting and consolidated invoicing by property." },
  { q: "Do you provide prevailing wage or public works?", a: "We perform public works and prevailing-wage projects with certified payroll reporting." },
];

function CommercialHome() {
  return (
    <div className="theme-commercial min-h-screen bg-background font-sans">
      <UtilityBar variant="commercial" />
      <SiteNav variant="commercial" />

      {/* 3. HERO — portfolio-forward, architectural */}
      <section className="relative bg-ink text-ink-foreground">
        <img
          src={heroImg}
          alt="Commercial plumbing crew working on large-diameter piping in a mechanical room"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="relative">
          <Container className="max-w-none py-24 lg:py-36">
            <p className="eyebrow text-signal">Commercial Plumbing Contractor · [Region]</p>
            <h1 className="display-xl mt-6 max-w-4xl text-5xl sm:text-6xl lg:text-[5rem]">
              Plumbing scope delivered without becoming your problem.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/75">
              Northline provides commercial plumbing service, preventative maintenance and project
              delivery for property managers, general contractors, developers and business owners
              throughout [Region].
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href="#contact">
                Request a Commercial Quote
              </Btn>
              <Btn kind="outline-invert" size="lg" href="#projects">
                View Our Projects
              </Btn>
            </div>
            <p className="mt-10 text-sm font-medium text-ink-foreground/60">
              Licensed · Bonded · Insured · 24-Hour Emergency Response · Prevailing Wage Capable
            </p>
          </Container>
        </div>
      </section>

      {/* 4. TRUST BAR */}
      <div className="border-b border-hairline bg-surface">
        <Container className="grid grid-cols-2 divide-hairline sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {trust.map((t) => (
            <div key={t.small} className="px-2 py-8 lg:px-6">
              <p className="font-display text-2xl font-bold">{t.big}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {t.small}
              </p>
            </div>
          ))}
        </Container>
      </div>

      {/* 10 (moved up). CAPABILITIES */}
      <Section tone="page">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Capabilities"
            title="Built for schedule, scope and accountability."
            intro="Downtime and delays cost money. Our commercial group is organized around responsiveness, documentation and holding the dates we commit to."
          />
          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.t}>
                <div className="h-1 w-8 bg-signal" />
                <h3 className="mt-4 font-display text-lg font-bold">{c.t}</h3>
                <p className="mt-2 text-muted-foreground">{c.c}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 11 (moved up). PROJECTS */}
      <Section id="projects" tone="ink">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected projects"
            title="Proven in the field."
            intro="Recognizable project types, real general contractors and actual project scale."
            invert
          />
          <Btn kind="outline-invert" href="#projects">
            View All Projects
          </Btn>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.name} className="group">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                width={1200}
                height={800}
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="border-t border-hairline-inverse pt-5">
                <p className="text-xs uppercase tracking-[0.14em] text-signal">{p.type}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{p.name}</h3>
                <dl className="mt-4 space-y-1.5 text-sm text-ink-foreground/70">
                  <div>{p.city}</div>
                  <div>Scope: {p.scope}</div>
                  <div>General Contractor: {p.gc}</div>
                  <div>Project Size: {p.size}</div>
                </dl>
                <a href="#projects" className="mt-5 inline-block text-sm font-semibold text-signal">
                  View Project →
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 border-t border-hairline-inverse pt-10">
          <p className="eyebrow text-ink-foreground/50">
            General contractors &amp; developers we've worked with
          </p>
          <div className="mt-6 grid grid-cols-2 gap-px bg-hairline-inverse sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-20 items-center justify-center bg-ink text-xs uppercase tracking-[0.14em] text-ink-foreground/45"
              >
                [Client Logo]
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. MARKETS SERVED */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Markets served"
          title="Industries we know how to work in."
          intro="Every building type carries its own access, code and scheduling realities. These are the environments our crews work in every week."
        />
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((m) => (
            <a key={m.t} href="#contact" className="bg-surface p-7 transition-colors hover:bg-surface-2">
              <h3 className="font-display text-base font-bold uppercase tracking-[0.06em]">{m.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.c}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* 6. SERVICES */}
      <Section id="services" tone="page">
        <SectionHeading
          eyebrow="Services"
          title="Service, maintenance and project delivery."
          intro="One contractor across the full lifecycle of a property's plumbing systems — from an after-hours call to a ground-up scope."
        />
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <a key={s.name} href="#contact" className="bg-background p-7 hover:bg-surface">
              <h3 className="font-display text-lg font-bold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </a>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Btn kind="primary" href="#contact">
            Discuss Your Project
          </Btn>
          <Btn kind="outline" href="#contact">
            Ask About a Service Plan
          </Btn>
        </div>
      </Section>

      {/* 8. REVIEWS / CLIENT VOICES */}
      <Section id="reviews" tone="muted">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Client feedback"
            title="What property pros and GCs say."
            intro="Reputation in commercial work travels by reference. Here is what ours sounds like."
          />
          <div className="shrink-0 rounded-sm border border-hairline bg-surface px-7 py-6">
            <p className="font-display text-4xl font-bold">4.9 ★</p>
            <p className="mt-1 text-sm text-muted-foreground">Based on 487 Google reviews</p>
            <a href="#reviews" className="mt-3 inline-block text-sm font-semibold text-signal">
              Read our reviews →
            </a>
          </div>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((r) => (
            <blockquote key={r.detail} className="border-t-2 border-signal bg-surface p-7">
              <p className="text-[1.05rem] leading-relaxed">{r.text}</p>
              <footer className="mt-5 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="block text-muted-foreground">{r.detail}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* 9. EMERGENCY CTA */}
      <section className="bg-signal py-16 text-signal-foreground">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow text-signal-foreground/70">24-hour response</p>
            <h2 className="display-xl mt-3 text-4xl">Building down? Get a crew moving.</h2>
            <p className="mt-3 max-w-2xl text-signal-foreground/80">
              Sewer backups, failed risers and no-water events shut down operations. Our dispatch
              line reaches an on-call foreman, not a voicemail box.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn kind="primary" size="lg" href={PHONE_HREF}>
              Call {PHONE_DISPLAY}
            </Btn>
          </div>
        </Container>
      </section>

      {/* 12. PROCESS */}
      <Section tone="page">
        <SectionHeading eyebrow="How we work" title="Predictable from bid to closeout." />
        <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-8">
              <p className="font-display text-5xl font-bold text-signal">{s.n}</p>
              <h3 className="mt-5 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.c}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 13. TEAM */}
      <Section id="about" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <img
            src={teamImg}
            alt="Northline Plumbing field and office team"
            loading="lazy"
            width={1600}
            height={900}
            className="aspect-[16/10] w-full object-cover"
          />
          <div>
            <SectionHeading
              eyebrow="About"
              title="The people who run your job."
              intro="Northline is [Owner Name], [N] field technicians, [N] licensed journeymen and a project management group operating out of [City]. You will know your foreman by name."
            />
            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
              {[
                ["Founded", "[Year]"],
                ["Field staff", "[N]"],
                ["EMR", "[0.00]"],
                ["Bonding capacity", "$[amount]"],
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

      {/* RESIDENTIAL CROSS-LINK */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              img: commercialImg,
              tag: "Commercial",
              title: "Project & Property Work",
              copy: "Service agreements, maintenance, tenant improvements and new construction for commercial and multifamily properties.",
              cta: "Request a Commercial Quote",
              href: "#contact",
            },
            {
              img: residentialImg,
              tag: "Residential",
              title: "Homeowner Services",
              copy: "Our residential division handles repairs, water heaters, drains and repiping for homeowners across [Service Area].",
              cta: "Visit Residential Site",
              href: "/",
            },
          ].map((b) => (
            <article key={b.title} className="overflow-hidden bg-surface shadow-card">
              <img
                src={b.img}
                alt={b.title}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-7 sm:p-9">
                <p className="eyebrow">{b.tag}</p>
                <h3 className="display-xl mt-3 text-3xl">{b.title}</h3>
                <p className="mt-4 text-muted-foreground">{b.copy}</p>
                <a
                  href={b.href}
                  className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.1em] text-signal"
                >
                  {b.cta} <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 14. SERVICE AREAS */}
      <Section id="areas" tone="page">
        <SectionHeading
          eyebrow="Coverage"
          title="Working throughout [Region]."
          intro="Service crews dispatch daily across our primary coverage area; project work extends regionally."
        />
        <div className="mt-10 grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-6">
          {["[City]", "[City]", "[City]", "[City]", "[City]", "[City]"].map((c, i) => (
            <a key={i} href="#areas" className="bg-background p-6 hover:bg-surface">
              <p className="font-display text-base font-semibold">{c}</p>
              <p className="mt-1 text-xs text-muted-foreground">Commercial service</p>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <Btn kind="outline" href="#areas">
            View All Service Areas
          </Btn>
        </div>
      </Section>

      {/* 15. FAQ */}
      <Section tone="muted">
        <SectionHeading eyebrow="FAQ" title="What property pros and GCs ask." />
        <FaqList items={faqs} />
      </Section>

      {/* 16. FINAL CTA + FORM */}
      <Section id="contact" tone="page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let's talk scope, schedule and coverage."
              intro="Whether you need a service agreement across a portfolio or pricing on a plumbing scope, send the details and we'll get the right person on it."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn kind="signal" size="lg" href="#contact">
                Request a Commercial Quote
              </Btn>
              <Btn kind="outline" size="lg" href={PHONE_HREF}>
                Call {PHONE_DISPLAY}
              </Btn>
            </div>
            <dl className="mt-10 grid gap-5 text-sm sm:grid-cols-2">
              {[
                ["Estimating", "bids@northlineplumbing.com"],
                ["Service dispatch", PHONE_DISPLAY],
                ["Prequalification packets", "On request"],
                ["Insurance certificates", "Same-day"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <LeadForm variant="commercial" />
        </div>
      </Section>

      <SiteFooter variant="commercial" />
      <MobileActionBar variant="commercial" />
      <VariantSwitch variant="commercial" />
    </div>
  );
}
