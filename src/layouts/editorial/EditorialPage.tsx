/**
 * Editorial Precision — Concept B React port from the original Figma Make export.
 * Only data from the v0.3 EditorialModel; never v0.2 global site config.
 * Route /b is NOT enabled in this gate. The estimate demo is NOT functional.
 * Media is explicitly labeled whenever rights are unconfirmed.
 */
import type { CSSProperties } from "react";
import type { EditorialImage, EditorialModel, EditorialService } from "./editorial.model";
import "./editorial.css";

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="18" height="18">
      <path d="M4 12h15M13 6l6 6-6 6"/>
    </svg>
  );
}

function DisabledEstimate({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <button type="button" disabled className={"cb-btn" + (compact ? " cb-btn--sm" : "")} title="Estimate demo under development">
      <span>{label} <small>· Coming soon</small></span>
      <ArrowRight />
    </button>
  );
}

function EditorialPhoto({
  image, label, aspect,
}: {
  image: EditorialImage | null;
  label: string;
  aspect: "wide" | "tall" | "hero";
}) {
  return (
    <div className={"cb-plate cb-plate--" + aspect}>
      {image ? (
        <>
          <img className="cb-plate__image" src={image.src} alt={image.alt} style={{ objectPosition: image.objectPosition }} loading={aspect === "hero" ? "eager" : "lazy"}/>
          {image.reviewOnly && (
            <span className="cb-plate__review">INTERNAL IMAGE REVIEW · RIGHTS UNCONFIRMED</span>
          )}
        </>
      ) : (
        <>
          <span className="cb-reg cb-reg--br" aria-hidden="true"/>
          <div className="cb-plate__note">
            <span className="cb-mono cb-mono--accent">{label} · Photograph pending</span>
            <strong>Company image pending rights verification.</strong>
            <span className="cb-mono">No substitute photography used in this proposal.</span>
          </div>
        </>
      )}
    </div>
  );
}

function Headline({ text }: { text: string }) {
  // Use sentence punctuation as a presentation hint, not prospect-specific words.
  const lines = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((line) => line.trim()).filter(Boolean) ?? [text];
  return (
    <h1 id="cb-title" className="cb-hero__title">
      {lines.map((line, index) => {
        const words = line.split(/\s+/);
        const accent = words.pop() ?? "";
        return (
          <span key={index} className={"cb-line" + (index % 2 === 1 ? " cb-line--offset" : "")}>
            {words.length ? words.join(" ") + " " : ""}<em>{accent}</em>
          </span>
        );
      })}
    </h1>
  );
}

function ServiceCard({ service, index, estimateLabel }: {
  service: EditorialService;
  index: number;
  estimateLabel: string;
}) {
  const featured = service.featured;
  return (
    <article className={"cb-svc" + (featured ? " cb-svc--featured" : " cb-svc--standard")} id={"cb-service-" + service.id}>
      <EditorialPhoto image={service.image} label={"Plate " + String(index + 2).padStart(2, "0")} aspect={featured ? "wide" : "tall"}/>
      <div className="cb-svc__body">
        <span className="cb-svc__num cb-mono">{String(index + 1).padStart(2, "0")}</span>
        <h3>{service.title}</h3>
        {featured && <span className="cb-svc__badge cb-mono">Featured service</span>}
        <p>{service.description}</p>
        {service.category && <span className="cb-svc__category cb-mono">{service.category}</span>}
        <DisabledEstimate compact={!featured} label={estimateLabel}/>
      </div>
    </article>
  );
}

export function EditorialPage({ model }: { model: EditorialModel }) {
  const styles = {
    "--cb-blue": model.brand.colors.primary,
    "--cb-cyan": model.brand.colors.accent,
  } as CSSProperties;

  const year = model.facts
    .map((fact) => fact.text.match(/\bsince\s+((?:19|20)\d{2})\b/i)?.[1])
    .find((match) => match != null);

  const hasCredentials = model.facts.length > 0 || model.serviceAreas.length > 0;
  const hasServices = model.services.length > 0;

  return (
    <main className="cb" lang={model.locale} style={styles}>
      <div className="cb-columns" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index}/>)}
      </div>

      <div className="cb-meta cb-mono">
        <span>{model.company}</span>
        <span>Design proposal · Editorial Precision</span>
        <span>{model.serviceAreas.join(" / ")}</span>
        <span>{year ? "Serving since " + year : "Service provider"}</span>
        <span>Unofficial proposal — WEBINOW</span>
      </div>

      <header className="cb-nav">
        <a className="cb-logo" href="#cb-title" aria-label={model.company + " — top of page"}>
          {model.brand.logo ? (
            <img src={model.brand.logo.src} alt={model.brand.logo.alt} />
          ) : (
            <strong>{model.company}</strong>
          )}
          {model.brand.logo?.reviewOnly && <span className="cb-mono">Internal logo review</span>}
        </a>

        <nav className="cb-nav__links" aria-label="Primary">
          {hasServices && <a href="#cb-services"><sup>01</sup>Services</a>}
          {hasCredentials && <a href="#cb-credentials"><sup>02</sup>Service area</a>}
          {model.contact.enabled && <a href="#cb-contact"><sup>03</sup>Contact</a>}
        </nav>
        <div className="cb-nav__actions">
          {model.contact.enabled && <a className="cb-phone" href={model.contact.phone.href}><span className="cb-mono">Call</span>{model.contact.phone.display}</a>}
          <DisabledEstimate compact label={model.estimate.label}/>
        </div>
      </header>

      <section className="cb-hero" aria-labelledby="cb-title">
        <p className="cb-hero__index cb-mono"><span>(01)</span>{model.hero.eyebrow || "Editorial Precision"}</p>
        <Headline text={model.hero.headline} />
        <div className="cb-hero__lower">
          <div className="cb-hero__intro">
            <p>{model.hero.supporting}</p>
            <div className="cb-hero__ctas">
              <DisabledEstimate label={model.estimate.label}/>
              {model.contact.enabled && <a className="cb-textlink" href={model.contact.phone.href}>or call {model.contact.phone.display}</a>}
            </div>
            <p className="cb-mono cb-hero__fine">Unofficial design proposal · No requests collected</p>
          </div>
          <figure className="cb-hero__figure">
            <EditorialPhoto image={model.hero.image} label="Fig. 01" aspect="hero"/>
            <figcaption className="cb-mono">
              <span>Fig. 01</span>
              <span>{model.company} — design proposal.</span>
              <span>{model.hero.image?.reviewOnly ? "Image rights unconfirmed" : "Image pending review"}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {hasCredentials && (
        <section id="cb-credentials" className="cb-cred" aria-labelledby="cb-cred-title">
          <div className="cb-cred__label">
            <p className="cb-mono"><span>(02)</span>Credentials</p>
            <h2 id="cb-cred-title">Company-stated information, on record.</h2>
          </div>
          <div className="cb-cred__year">
            <span className="cb-mono">{year ? "Serving since" : "Service areas"}</span>
            <strong>{year ?? String(model.serviceAreas.length).padStart(2, "0")}</strong>
          </div>
          {model.serviceAreas.length > 0 && (
            <ul className="cb-cred__counties" aria-label="Areas served">
              {model.serviceAreas.map((area, index) => (
                <li key={area}><span className="cb-mono">{String(index + 1).padStart(2, "0")}</span>{area}</li>
              ))}
            </ul>
          )}
          {model.facts.length > 0 && (
            <dl className="cb-cred__spec">
              {model.facts.map((fact, index) => (
                <div key={fact.id}>
                  <dt className="cb-mono">Fact {String(index + 1).padStart(2, "0")}</dt>
                  <dd>{fact.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      )}

      {hasServices && (
        <section id="cb-services" className="cb-services" aria-labelledby="cb-services-title">
          <header className="cb-services__head">
            <p className="cb-mono"><span>(03)</span>Services</p>
            <h2 id="cb-services-title">{model.services.length === 2 ? "Two disciplines." : model.services.length + " services."}<br/><span>Choose where to start.</span></h2>
          </header>
          {model.services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} estimateLabel={model.estimate.label}/>
          ))}
        </section>
      )}

      {model.contact.enabled && (
        <section className="cb-contact" id="cb-contact" aria-labelledby="cb-contact-title">
          <p className="cb-mono">Contact</p>
          <h2 id="cb-contact-title">A conversation starts here.</h2>
          <a href={model.contact.phone.href} className="cb-contact__phone">{model.contact.phone.display} <ArrowRight/></a>
          {model.contact.email && <a className="cb-contact__mail" href={"mailto:" + model.contact.email}>{model.contact.email}</a>}
        </section>
      )}

      <footer className="cb-foot cb-mono">
        <span>{model.disclaimer}</span>
        <span>Concept B — Editorial Precision · Internal review</span>
      </footer>
    </main>
  );
}
