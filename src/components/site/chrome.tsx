import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const PHONE_DISPLAY = "(555) 214-8800";
export const PHONE_HREF = "tel:+15552148800";
export const COMPANY = "Northline Plumbing";

type Variant = "residential" | "commercial";

const NAV = [
  { label: "Residential", to: "/" },
  { label: "Commercial", to: "/commercial" },
  { label: "Services", to: "#services" },
  { label: "Projects", to: "#projects" },
  { label: "Reviews", to: "#reviews" },
  { label: "About", to: "#about" },
  { label: "Service Areas", to: "#areas" },
  { label: "Contact", to: "#contact" },
];

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
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
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

export function Btn({ children, href, to, kind = "primary", size = "md", className = "" }: BtnProps) {
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
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <a href={href ?? "#contact"} className={cls}>{children}</a>;
}

export function UtilityBar({ variant }: { variant: Variant }) {
  return (
    <div className="bg-ink text-ink-foreground">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-[0.74rem] tracking-wide">
        <p className="font-medium">
          {variant === "residential"
            ? "Same-Day Service Available"
            : "24-Hour Commercial Emergency Response"}
          <span className="mx-2 text-ink-foreground/35">|</span>
          <span className="text-ink-foreground/70">
            Serving [Primary Service Area] &amp; surrounding communities
          </span>
        </p>
        <a href={PHONE_HREF} className="font-display font-semibold uppercase tracking-[0.12em] text-signal">
          Call {PHONE_DISPLAY}
        </a>
      </Container>
    </div>
  );
}

export function SiteNav({ variant }: { variant: Variant }) {
  const cta = variant === "residential" ? "Schedule Service" : "Request a Quote";
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/95 backdrop-blur">
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-ink font-display text-sm font-bold text-ink-foreground">
            N
          </span>
          <span className="font-display text-base font-bold uppercase tracking-[0.14em]">
            Northline
          </span>
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
          <Btn kind="signal" href="#contact">
            {cta}
          </Btn>
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
        href="#contact"
        className="bg-signal py-4 text-center font-display text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-signal-foreground"
      >
        {variant === "residential" ? "Schedule Service" : "Request Quote"}
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
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-sm border border-hairline bg-surface p-6 shadow-card sm:p-8"
    >
      <p className="font-display text-lg font-bold">
        {variant === "residential" ? "Request service" : "Start a project conversation"}
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
            {variant === "residential" ? "Service Needed" : "Project / Service Type"}
          </span>
          <select className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-signal">
            {(variant === "residential"
              ? ["Emergency", "Drain cleaning", "Leak repair", "Water heater", "Sewer line", "Other"]
              : [
                  "Service call",
                  "Preventative maintenance",
                  "Tenant improvement",
                  "New construction",
                  "Other",
                ]
            ).map((o) => (
              <option key={o}>{o}</option>
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
        {variant === "residential" ? "Schedule Service" : "Request a Commercial Quote"}
      </Btn>
      <p className="mt-3 text-xs text-muted-foreground">
        Layout concept only — form is not connected.
      </p>
    </form>
  );
}

export function SiteFooter({ variant }: { variant: Variant }) {
  const cols = [
    {
      title: "Residential",
      links: [
        "Emergency Plumbing",
        "Drain Cleaning",
        "Leak Detection & Repair",
        "Water Heaters",
        "Sewer Lines",
        "Repiping",
      ],
    },
    {
      title: "Commercial",
      links: [
        "Service & Repair",
        "Preventative Maintenance",
        "Tenant Improvements",
        "New Construction",
        "Backflow & Testing",
        "Hydro Jetting",
      ],
    },
    {
      title: "Company",
      links: ["About", "Our Team", "Projects", "Reviews", "Financing", "Careers"],
    },
    {
      title: "Service Areas",
      links: ["[City]", "[City]", "[City]", "[City]", "[City]", "All Service Areas"],
    },
  ];

  return (
    <footer className="bg-ink text-ink-foreground">
      <Container className="py-16">
        <div className="flex flex-col gap-8 border-b border-hairline-inverse pb-12 md:flex-row md:items-end md:justify-between">
          <h2 className="display-xl max-w-xl text-3xl sm:text-4xl">
            {variant === "residential"
              ? "Need a plumber today?"
              : "Have a project or property to discuss?"}
          </h2>
          <div className="flex flex-wrap gap-3">
            <Btn kind="signal" size="lg" href="#contact">
              {variant === "residential" ? "Schedule Service" : "Request a Commercial Quote"}
            </Btn>
            <Btn kind="outline-invert" size="lg" href={PHONE_HREF}>
              Call {PHONE_DISPLAY}
            </Btn>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-display text-base font-bold uppercase tracking-[0.14em]">
              {COMPANY}
            </p>
            <dl className="mt-5 space-y-2 text-sm text-ink-foreground/70">
              <div>{PHONE_DISPLAY}</div>
              <div>service@northlineplumbing.com</div>
              <div>Mon–Fri 7:00a–6:00p</div>
              <div>Emergency service after hours</div>
              <div>License #[000000] · Bonded &amp; Insured</div>
            </dl>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink-foreground/70">
                {col.links.map((l, i) => (
                  <li key={`${col.title}-${i}`}>
                    <a href="#services" className="hover:text-ink-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-hairline-inverse pt-8 text-xs text-ink-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY}. Layout concept for proposal purposes.</p>
          <div className="flex gap-5">
            <a href="#contact" className="hover:text-ink-foreground">Privacy</a>
            <a href="#contact" className="hover:text-ink-foreground">Accessibility</a>
            <a href="#contact" className="hover:text-ink-foreground">Facebook</a>
            <a href="#contact" className="hover:text-ink-foreground">Instagram</a>
            <a href="#contact" className="hover:text-ink-foreground">LinkedIn</a>
          </div>
        </div>
      </Container>
      <div className="h-14 lg:hidden" />
    </footer>
  );
}

export function VariantSwitch({ variant }: { variant: Variant }) {
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
