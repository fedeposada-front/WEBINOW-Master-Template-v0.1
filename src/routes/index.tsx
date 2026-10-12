/**
 * South Cooling WEBINOW presentation — fullscreen live A/B comparison.
 *
 * /a and /b are loaded as same-origin, non-interactive previews so the
 * comparison displays the ACTUAL designs at full viewport width.
 * Both layers have independent clipping: no text/image bleed.
 * Navigation remains explicit, keyboard accessible and outside the curtain.
 * This page never collects leads, sends requests or deploys anything.
 */
import { useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { activeProspectV3 } from "@/core/config/v3/prospect";
import "./index.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: activeProspectV3.brand.name + " — Compare Design Concepts | WEBINOW Labs" },
      {
        name: "description",
        content: "An unofficial WEBINOW design comparison of two South Cooling concepts. No service requests are collected.",
      },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: CompareDesigns,
});

function CompareDesigns() {
  const [split, setSplit] = useState(50);
  const splitStyle = { "--sc-split": split + "%" } as CSSProperties;

  const setFromPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width <= 0) return;
    const ratio = (event.clientX - bounds.left) / bounds.width;
    setSplit(Math.round(Math.min(100, Math.max(0, ratio * 100))));
  };

  const endDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <main className="sc-compare" lang={activeProspectV3.locale} aria-label="Compare South Cooling design concepts">
      <section
        className="sc-compare__stage"
        style={splitStyle}
        aria-label="Interactive before-and-after style website comparison"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            setFromPointer(event);
          }
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="sc-compare__layer sc-compare__layer--a" aria-hidden="true" inert>
          <iframe
            className="sc-compare__frame"
            src="/a"
            title="Concept A — Industrial Cinematic, full website preview"
            tabIndex={-1}
            loading="eager"
          />
        </div>
        <div className="sc-compare__layer sc-compare__layer--b" aria-hidden="true" inert>
          <iframe
            className="sc-compare__frame"
            src="/b"
            title="Concept B — Editorial Precision, full website preview"
            tabIndex={-1}
            loading="eager"
          />
        </div>
        <div className="sc-compare__divider" aria-hidden="true" />
        <div className="sc-compare__handle" aria-hidden="true">
          <span className="sc-compare__chevron sc-compare__chevron--left">‹</span>
          <span className="sc-compare__handle-rule" />
          <span className="sc-compare__chevron sc-compare__chevron--right">›</span>
        </div>
        <span className="sc-compare__drag-hint" aria-hidden="true">DRAG TO COMPARE</span>
        <input
          type="range"
          className="sc-compare__keyboard"
          min={0}
          max={100}
          step={1}
          value={split}
          onChange={(event) => setSplit(Number(event.currentTarget.value))}
          aria-label="Compare Concept A and Concept B"
          aria-valuetext={split + "% Concept A, " + (100 - split) + "% Concept B"}
          aria-describedby="sc-compare-help"
        />
      </section>
      <div className="sc-compare__overlay">
        <div className="sc-compare__top" aria-hidden="true">
          <span className="sc-compare__tag"><b>A</b><span>Industrial Cinematic</span></span>
          <span className="sc-compare__tag"><span>Editorial Precision</span><b>B</b></span>
        </div>

        <nav className="sc-compare__bottom" aria-label="Open a full design">
          <a className="sc-compare__link sc-compare__link--a" href="/a">
            <span><strong>Open A</strong><small>Industrial Cinematic</small></span>
            <span aria-hidden="true">↗</span>
          </a>
          <a className="sc-compare__link sc-compare__link--b" href="/b">
            <span><strong>Open B</strong><small>Editorial Precision</small></span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
        <p id="sc-compare-help" className="sc-compare__sr-only">
          Drag anywhere on the comparison, or focus the slider and use the left and right arrow keys.
          Open A and Open B display the full interactive website. This is an unofficial design proposal.
        </p>
      </div>
    </main>
  );
}
