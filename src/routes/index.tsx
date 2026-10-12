/**
 * WEBINOW preview index — two visual directions, one intuitive comparison.
 * Scope: homepage only. /a, /b and /estimate remain independent.
 * All data and authorized imagery come from the active v0.3 prospect contract.
 * Accessible native range allows pointer, touch and keyboard comparison.
 */
import { useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { activeProspectV3 } from "@/core/config/v3/prospect";
import { toCinematicModel } from "@/layouts/cinematic/cinematic.model";
import { toEditorialModel } from "@/layouts/editorial/editorial.model";
import "./index.css";

const conceptA = toCinematicModel(activeProspectV3, {
  internalMediaPreview: import.meta.env.DEV,
});
const conceptB = toEditorialModel(activeProspectV3, {
  internalMediaPreview: import.meta.env.DEV,
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: activeProspectV3.brand.name + " — Compare Design Concepts | WEBINOW Labs" },
      { name: "description", content: "Compare two unofficial WEBINOW website design directions. Interactive visual preview only; no requests are collected." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: ComparisonHome,
});

function ComparisonHome() {
  const [split, setSplit] = useState(50);
  const splitStyle = { "--sc-split": split + "%" } as CSSProperties;

  return (
    <main className="sc-compare" lang={activeProspectV3.locale}>
      <div className="sc-compare__shell">
        <header className="sc-compare__top">
          <span className="sc-compare__wordmark">DESIGN EXPLORER <span>01 / 02</span></span>
          <span className="sc-compare__top-note">Private design review <span aria-hidden="true">/</span> {activeProspectV3.brand.name}</span>
        </header>

        <div className="sc-compare__intro">
          <p className="sc-compare__eyebrow"><span className="sc-compare__status" aria-hidden="true"/> 02 DESIGN DIRECTIONS</p>
          <h1>One brand. <em>Two directions.</em></h1>
          <p>Move the divider to compare the visual styles, then open the design you want to explore.</p>
        </div>

        <section className="sc-compare__comparison" aria-label="Compare Concept A and Concept B">
          <div className="sc-compare__names" aria-hidden="true">
            <span><b>A</b> Industrial Cinematic</span>
            <span>Editorial Precision <b>B</b></span>
          </div>

          <div className="sc-compare__stage" style={splitStyle}>
            <div className="sc-compare__design sc-compare__design--a" aria-hidden="true">
              {conceptA.hero.image && (
                <img className="sc-compare__image sc-compare__image--a"
                  src={conceptA.hero.image.src} alt="" draggable={false}/>
              )}
              <div className="sc-compare__a-top">
                <span className="sc-compare__a-logo">{conceptA.company}</span>
                <span className="sc-compare__a-meta">DESIGN A / {conceptA.serviceAreas.join(" · ")}</span>
              </div>
              <div className="sc-compare__a-copy">
                <span className="sc-compare__a-eyebrow">{conceptA.hero.eyebrow}</span>
                <h2>{conceptA.hero.headline}</h2>
                <p>{conceptA.hero.supporting}</p>
              </div>
              <span className="sc-compare__a-bottom">01 — INDUSTRIAL CINEMATIC</span>
            </div>

            <div className="sc-compare__design sc-compare__design--b" aria-hidden="true">
              <div className="sc-compare__b-rules"/>
              <div className="sc-compare__b-meta">EDITORIAL PRECISION <span> / DESIGN B</span></div>
              <div className="sc-compare__b-top">
                <span className="sc-compare__b-logo">{conceptB.company}</span>
                <span className="sc-compare__b-count">02 / 02</span>
              </div>
              <div className="sc-compare__b-content">
                <span className="sc-compare__b-eyebrow">{conceptB.hero.eyebrow}</span>
                <h2>{conceptB.hero.headline}</h2>
                <p>{conceptB.hero.supporting}</p>
              </div>
              <div className="sc-compare__b-photo">
                {conceptB.hero.image && (
                  <img className="sc-compare__image sc-compare__image--b"
                    src={conceptB.hero.image.src} alt="" draggable={false}/>
                )}
                <span>FIG. 01 / {conceptB.company.toUpperCase()}</span>
              </div>
              <span className="sc-compare__b-bottom">02 — EDITORIAL PRECISION</span>
            </div>

            <div className="sc-compare__divider" aria-hidden="true"/>
            <div className="sc-compare__handle" aria-hidden="true">
              <span className="sc-compare__chevron sc-compare__chevron--left">‹</span>
              <span className="sc-compare__handle-line"/>
              <span className="sc-compare__chevron sc-compare__chevron--right">›</span>
            </div>
            <input
              className="sc-compare__slider"
              type="range"
              min="0"
              max="100"
              step="1"
              value={split}
              onChange={(event) => setSplit(Number(event.currentTarget.value))}
              aria-label="Reveal more of Concept A or Concept B"
              aria-valuetext={split + "% Concept A, " + (100 - split) + "% Concept B"}
              aria-describedby="sc-compare-instructions"
            />
          </div>
          <p className="sc-compare__hint" id="sc-compare-instructions">
            <span className="sc-compare__hint-icon" aria-hidden="true">↔</span>
            Drag the center handle to compare. You can also use the arrow keys.
          </p>
        </section>

        <nav className="sc-compare__choices" aria-label="Explore a complete design">
          <a className="sc-compare__choice sc-compare__choice--a" href="/a">
            <span className="sc-compare__choice-label">01 / CONCEPT A</span>
            <span className="sc-compare__choice-name">Industrial Cinematic</span>
            <span className="sc-compare__choice-action">Explore Design A <span aria-hidden="true">↗</span></span>
          </a>
          <a className="sc-compare__choice sc-compare__choice--b" href="/b">
            <span className="sc-compare__choice-label">02 / CONCEPT B</span>
            <span className="sc-compare__choice-name">Editorial Precision</span>
            <span className="sc-compare__choice-action">Explore Design B <span aria-hidden="true">↗</span></span>
          </a>
        </nav>

        <footer className="sc-compare__footer">
          <span>Unofficial design proposal by WEBINOW. Not the company's official website.</span>
          <span>Interactive estimate is a demo — no requests are submitted.</span>
        </footer>
      </div>
    </main>
  );
}
