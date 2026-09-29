import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import {
  COMPANY,
  PHONE_DISPLAY,
  PHONE_HREF,
  site,
  siteNavItems,
} from "@/config/site";

export { COMPANY, PHONE_DISPLAY, PHONE_HREF };

export type Variant = "residential" | "commercial";

const NAV = siteNavItems();

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  id,
  tone = "page",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  tone?: "page" | "surface" | "muted" | "ink";
  className?: string;
}) {
  const tones = {
    page: "bg-background text-foreground",
    surface: "bg-surface text-foreground",
    muted: "bg-surface-2 text-foreground",
    ink: "bg-ink text-ink-foreground",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className={`eyebrow ${invert ? "text-signal" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2 className="display-xl mt-4 text-4xl sm:text-5xl">{title}</h2>
      {intro ? (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            invert ? "text-ink-foreground/70" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  kind?: "primary" | "signal" | "outline" | "ghost" | "outline-invert";
  size?: "md" | "lg";
  className?: string;
};

export function Btn({
  children,
  href,
  to,
  kind = "primary",
  size = "md",
  className = "",
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold uppercase tracking-[0.09em] transition-colors duration-150";
  const sizes = { md: "px-5 py-3 text-[0.78rem]", lg: "px-7 py-4 text-sm" } as const;
  const kinds = {
    primary: "bg-ink text-ink-foreground hover:bg-slate-deep",
    signal: "bg-signal text-signal-foreground hover:brightness-95",
    outline: "border border-ink/25 text-foreground hover:bg-ink hover:text-ink-foreground",
    "outline-invert":
      "border border-hairline-inverse text-ink-foreground hover:bg-ink-foreground hover:text-ink",
    ghost: "text-foreground hover:text-signal",
  } as const;
  const cls = `${base} ${sizes[size]} ${kinds[kind]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href ?? "#contact"} className={cls}>
      {children}
    </a>
  );
}

export function UtilityBar({ variant }: { variant: Variant }) {
  const message =
    variant === "commercial"
      ? "Commercial HVAC conversations"
      : `${site.business.vertical} service`;

  return (
    <div className="bg-ink text-ink-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[0.74rem] tracking-wide">
        <p className="font-medium">
          {message}
          <span className="mx-2 text-ink-foreground/35">|</span>
          <span className="text-ink-foreground/70">{site.business.serviceArea}</span>
        </p>
        <a
          href={PHONE_HREF}
          className="font-display font-semibold uppercase tracking-[0.12em] text-signal"
        >
          Call {PHONE_DISPLAY}
        </a>
      </Container>
    </div>
  );
}

export function SiteNav({ variant }: { variant: Variant }) {
  const cta = variant === "residential" ? site.hero.primaryCta.label : "Request a Quote";

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/95 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          {site.brand.logoUrl ? (
            <>
              <img
                src={site.brand.logoUrl}
                alt={site.brand.logoAlt}
                className="h-10 w-[68px] shrink-0 rounded-sm bg-white object-contain object-center"
              />
              <span className="truncate font-display text-sm font-bold uppercase tracking-[0.08em] sm:text-base">
                {site.brand.shortName}
              </span>
            </>
          ) : (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-ink font-display text-xs font-bold text-ink-foreground">
                {site.brand.mark}
              </span>
              <span className="truncate font-display text-sm font-bold uppercase tracking-[0.1em] sm:text-base">
                {site.brand.shortName}
              </span>
            </>
          )}
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV.map((item) =>
            item.to.startsWith("#") ? (
              <a
                key={item.label}
                href={item.to}
                className="text-[0.82rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.to}
                className="text-[0.82rem] font-semibold transition-colors hover:text-signal"
                activeProps={{ className: "text-[0.82rem] font-semibold text-signal" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="hidden font-display text-sm font-semibold tracking-tight sm:block"
          >
            {PHONE_DISPLAY}
          </a>
          <div className="hidden sm:block">
            <Btn kind="signal" href={site.hero.primaryCta.href}>
              {cta}
            </Btn>
          </div>
        </div>
      </Container>
    </header>
  );
}

export function MobileActionBar({ variant }: { variant: Variant }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-hairline-inverse lg:hidden">
      <a
        href={PHONE_HREF}
        className="bg-ink py-4 text-center font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-ink-foreground"
      >
        Call Now
      </a>
      <a
        href={variant === "residential" ? site.hero.primaryCta.href : "#contact"}
        className="bg-signal py-4 text-center font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-signal-foreground"
      >
        {variant === "residential" ? site.hero.primaryCta.label : "Request Quote"}
      </a>
    </div>
  );
}

export function LeadForm({ variant }: { variant: Variant }) {
  const fields = [
    { label: "Name", type: "text" },
    { label: "Phone", type: "tel" },
    { label: "Email", type: "email" },
    { label: "ZIP / City", type: "text" },
  ];

  const options =
    variant === "residential"
      ? site.contact.formOptions
      : ["Service call", "Maintenance", "Project work", "Other"];

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-sm border border-hairline bg-surface p-6 shadow-card sm:p-8"
    >
      <p className="font-display text-lg font-bold">
        {variant === "residential" ? site.contact.formTitle : "Start a project conversation"}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.label} className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {f.label}
            </span>
            <input
              type={f.type}
              className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-signal"
            />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Service Needed
          </span>
          <select className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-signal">
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Message
          </span>
          <textarea
            rows={4}
            className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-signal"
          />
        </label>
      </div>
      <Btn kind="signal" size="lg" className="mt-6 w-full" href="#contact">
        {variant === "residential" ? site.hero.primaryCta.label : "Request a Quote"}
      </Btn>
      <p className="mt-3 text-xs text-muted-foreground">
        Preview form — activated when the website goes live.
      </p>
    </form>
  );
}

export function SiteFooter({ variant }: { variant: Variant }) {
  const serviceLinks = site.services.slice(0, 6).map((item) => item.title);
  const areaLinks = site.serviceAreas.areas.slice(0, 6);

  const cols = [
    { title: "Services", links: serviceLinks },
    { title: "Company", links: ["About", "Contact"] },
    { title: "Service Area", links: areaLinks },
  ];

  return (
    <footer className="bg-ink text-ink-foreground">
      <Container className="py-16">
        <div className="flex flex-col gap-8 border-b border-hairline-inverse pb-12 md:flex-row md:items-end md:justify-between">
          <h2 className="display-xl max-w-xl text-3xl sm:text-4xl">
            {variant === "residential"
              ? site.contact.title
              : "Have a property or project to discuss?"}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Btn kind="signal" size="lg" href={site.hero.primaryCta.href}>
              {site.hero.primaryCta.label}
            </Btn>
            <Btn kind="outline-invert" size="lg" href={PHONE_HREF}>
              Call {PHONE_DISPLAY}
            </Btn>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-base font-bold uppercase tracking-[0.14em]">
              {COMPANY}
            </p>
            <dl className="mt-5 space-y-2 text-sm text-ink-foreground/70">
              <div>{PHONE_DISPLAY}</div>
              {site.business.email ? <div>{site.business.email}</div> : null}
              <div>{site.business.city}, {site.business.region}</div>
              {site.footer.hours ? <div>{site.footer.hours}</div> : null}
            </dl>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink-foreground/70">
                {col.links.map((label) => (
                  <li key={label}>
                    <a href="#contact" className="hover:text-ink-foreground">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-hairline-inverse pt-8 text-xs text-ink-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY}. {site.footer.note ?? ""}
          </p>
          <p>WEBINOW proposal preview</p>
        </div>
      </Container>
      <div className="h-14 lg:hidden" />
    </footer>
  );
}

export function VariantSwitch({ variant }: { variant: Variant }) {
  if (!site.features.commercialEnabled) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 hidden items-center gap-1 rounded-sm border border-hairline bg-surface p-1 shadow-lift lg:bottom-5 lg:flex">
      <span className="px-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Version
      </span>
      <Link
        to="/"
        className={`rounded-sm px-3 py-1.5 text-xs font-semibold ${
          variant === "residential" ? "bg-ink text-ink-foreground" : "text-muted-foreground"
        }`}
      >
        Residential
      </Link>
      <Link
        to="/commercial"
        className={`rounded-sm px-3 py-1.5 text-xs font-semibold ${
          variant === "commercial" ? "bg-ink text-ink-foreground" : "text-muted-foreground"
        }`}
      >
        Commercial
      </Link>
    </div>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mt-12 divide-y divide-hairline border-y border-hairline">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer items-center justify-between gap-6 font-display text-lg font-semibold">
            {item.q}
            <span className="text-signal transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-3xl text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
