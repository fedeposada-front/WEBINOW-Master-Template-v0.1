/**
 * Industrial Cinematic — JSX port from Figma Make Concept A.
 * No route is enabled in this gate. Content must come from the v0.3 adapter.
 * Deliberately does not display pending images or send quote requests.
 */
import { useState, type CSSProperties } from "react";
import type { CinematicModel, CinematicService } from "./cinematic.model";
import "./cinematic.css";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/>
    </svg>
  );
}

function ServiceStage({ service, quoteLabel, quoteEnabled }: {
  service: CinematicService;
  quoteLabel: string;
  quoteEnabled: boolean;
}) {
  return (
    <div className="ca-stage__inside">
      <div className="ca-stage__plate" aria-label={service.image ? undefined : "Illustrative asset pending verification"}>
        {service.image ? (
          <img className="ca-stage__image" src={service.image.src} alt={service.image.alt} style={{ objectPosition: service.image.objectPosition }} />
        ) : (
          <>
            <span className="ca-stage__big" aria-hidden="true">{service.index}</span>
            <div className="ca-stage__missing">
              <span className="ca-tag">Photograph pending approval</span>
              <strong>{service.title}</strong>
              <small>An authentic company photograph will appear here after asset review.</small>
            </div>
          </>
        )}
      </div>
      <div className="ca-stage__copy">
        <p>{service.description}</p>
        {quoteEnabled ? (
          <span className="ca-btn ca-btn--primary" aria-label={quoteLabel}>{quoteLabel}<ArrowIcon /></span>
        ) : (
          <button className="ca-btn ca-btn--primary" disabled type="button" title="Estimate demo under development">
            {quoteLabel} <span aria-hidden="true">· Coming soon</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function CinematicPage({ model }: { model: CinematicModel }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const services = model.services;
  const active = services.find((service) => service.id === chosen) ?? services[0] ?? null;
  const headline = model.hero.headline.trim().split(/\s+/);
  const lastWord = headline.pop() ?? "";
  const tokenStyles = {
    "--ca-navy": model.brand.colors.dark,
    "--ca-cyan": model.brand.colors.accent,
  } as CSSProperties;

  return (
    <main className="ca" lang={model.locale} style={tokenStyles}>
      <section className="ca-hero" aria-labelledby="ca-title">
        {model.hero.image ? (
          <img className="ca-hero__photo" src={model.hero.image.src} alt={model.hero.image.alt} style={{ objectPosition: model.hero.image.objectPosition }} />
        ) : (
          <div className="ca-hero__photo ca-hero__photo--pending" aria-hidden="true"/>
        )}
        <div className="ca-hero__shade" aria-hidden="true"/>
        <header className="ca-nav">
          <div className="ca-plate" aria-label={model.company}>
            {model.brand.logo ? (
              <img src={model.brand.logo.src} alt={model.brand.logo.alt} />
            ) : (
              <span className="ca-plate__text">{model.company}</span>
            )}
          </div>
          <nav className="ca-nav__links" aria-label="Primary">
            {services.length > 0 && <a href="#ca-services">Services</a>}
            {model.facts.length > 0 && <a href="#ca-proof">Why us</a>}
            <a href="#ca-contact">Contact</a>
          </nav>
          <div className="ca-nav__actions">
            <a className="ca-nav__phone" href={model.phone.href}>
              <PhoneIcon /> {model.phone.display}
            </a>
          </div>
        </header>
        <div className="ca-hero__frame" aria-hidden="true"><i/><i/><i/><i/></div>
        <p className="ca-hero__rail" aria-hidden="true">{model.serviceAreas.join(" — ")}</p>
        <div className="ca-hero__body">
          <p className="ca-hero__services">
            {services.slice(0, 2).map((service, index) => (
              <span key={service.id}>{index > 0 && <span className="ca-plus" aria-hidden="true"> + </span>}{service.title}</span>
            ))}
          </p>
          {model.hero.eyebrow && <p className="ca-hero__eyebrow">{model.hero.eyebrow}</p>}
          <h1 id="ca-title" className="ca-hero__title">{headline.join(" ")} <em>{lastWord}</em></h1>
          <div className="ca-hero__foot">
            <p className="ca-hero__lede">{model.hero.supporting}</p>
            <div className="ca-hero__ctas">
              {model.estimate.enabled ? (
                <span className="ca-btn ca-btn--primary" aria-label={model.estimate.label}>{model.estimate.label}</span>
              ) : (
                <button type="button" className="ca-btn ca-btn--primary" disabled title="Estimate demo under development">
                  {model.estimate.label} <span aria-hidden="true">· Coming soon</span>
                </button>
              )}
              <a className="ca-btn ca-btn--ghost" href={model.phone.href}>
                <PhoneIcon /> Call {model.phone.display}
              </a>
            </div>
          </div>
        </div>
        <p className="ca-hero__caption"><span>Plate 01</span> Industrial Cinematic · Design proposal</p>
      </section>

      {model.facts.length > 0 && (
        <section id="ca-proof" className="ca-proof" aria-labelledby="ca-proof-title">
          <div className="ca-proof__evidence">
            <span className="ca-proof__monogram" aria-hidden="true">{model.company.split(/\s+/).map((word) => word[0]).slice(0, 2).join("")}</span>
            <p>Documented company information</p>
          </div>
          <div className="ca-proof__credits">
            <h2 id="ca-proof-title" className="ca-eyebrow"><span className="ca-eyebrow__line" /> Why {model.company}</h2>
            <dl className="ca-credits">
              {model.facts.map((fact, index) => (
                <div key={fact.id}>
                  <dt>{String(index + 1).padStart(2, "0")}</dt>
                  <dd><strong>{fact.text}</strong></dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {active && (
        <section id="ca-services" className="ca-services" aria-labelledby="ca-services-title">
          <div className="ca-services__index">
            <h2 id="ca-services-title" className="ca-eyebrow"><span className="ca-eyebrow__line" /> Select your service</h2>
            <div className="ca-picker" role="tablist" aria-label="Services">
              {services.map((service) => {
                const selected = service.id === active.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    id={"ca-tab-" + service.id}
                    aria-controls="ca-panel"
                    aria-selected={selected}
                    tabIndex={selected ? 0 : -1}
                    className={"ca-pick" + (service.featured ? " ca-pick--featured" : "")}
                    onClick={() => setChosen(service.id)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                      event.preventDefault();
                      const current = services.findIndex((s) => s.id === active.id);
                      const next = (current + (event.key === "ArrowDown" ? 1 : -1) + services.length) % services.length;
                      const nextService = services[next];
                      if (nextService) {
                        setChosen(nextService.id);
                        const root = (event.currentTarget.closest(".ca") as HTMLElement | null);
                        const button = root?.querySelector<HTMLElement>("#ca-tab-" + nextService.id);
                        button?.focus();
                      }
                    }}
                  >
                    <span className="ca-pick__index">{service.index}</span>
                    <span className="ca-pick__title">{service.title}</span>
                    <ArrowIcon/>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="ca-stage" id="ca-panel" role="tabpanel" aria-labelledby={"ca-tab-" + active.id}>
            <ServiceStage service={active} quoteLabel={model.estimate.label} quoteEnabled={model.estimate.enabled} />
          </div>
        </section>
      )}

      <section id="ca-contact" className="ca-contact">
        <p className="ca-eyebrow">Contact</p>
        <h2>Let's discuss your service needs.</h2>
        <a className="ca-btn ca-btn--primary" href={model.phone.href}><PhoneIcon/> Call {model.phone.display}</a>
      </section>
      <footer className="ca-note"><span>{model.disclaimer}</span><span>Concept A — Industrial Cinematic</span></footer>
    </main>
  );
}
