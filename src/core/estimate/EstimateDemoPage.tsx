/**
 * EstimateDemo — shared, local UI preview (Gate 4B).
 *
 * No form fields for personal information, no prices, no network, no storage,
 * and no implicit submissions. CTAs in A/B remain disabled until a later gate.
 * Only three in-memory presentation states are possible.
 */
import { useState } from "react";
import type { EstimateDemoModel } from "./estimate.model";
import "./estimate.css";

type Stage = "select" | "review" | "complete";

function Arrow({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d={reverse ? "M20 12H5m6-6-6 6 6 6" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function EstimateDemoPage({ model }: { model: EstimateDemoModel }) {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedId, setSelectedId] = useState<string | null>(model.service);
  const selectedService = model.services.find((service) => service.id === selectedId) ?? null;
  const stageIndex = model.steps.findIndex((step) => step.id === stage);

  function restart() {
    setSelectedId(model.service);
    setStage("select");
  }

  return (
    <main className={"ed ed--" + model.design} lang={model.locale}>
      <div className="ed__grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
      </div>

      <header className="ed-head">
        <div className="ed-head__brand">
          <span className="ed-micro">WEBINOW LABS / DESIGN PROPOSAL</span>
          <strong>{model.company}</strong>
        </div>
        <div className="ed-head__right">
          <span className="ed-micro">INTERACTIVE DEMONSTRATION</span>
          <a className="ed-link" href={model.backHref}><Arrow reverse /> Back to Concept {model.design.toUpperCase()}</a>
        </div>
      </header>

      <div className="ed-body">
        <div className="ed-intro">
          <p className="ed-eyebrow"><span>(00)</span> SERVICE REQUEST / PROTOTYPE</p>
          <h1>Let's start with<br /><em>your service.</em></h1>
          <p className="ed-intro__description">{model.demoNotice}</p>
        </div>

        <nav className="ed-progress" aria-label="Demo progress">
          <ol>
            {model.steps.map((step, index) => (
              <li key={step.id} className={index === stageIndex ? "ed-progress__current" : index < stageIndex ? "ed-progress__done" : ""} aria-current={index === stageIndex ? "step" : undefined}>
                <span className="ed-micro">{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.label}</strong>
              </li>
            ))}
          </ol>
        </nav>

        <section className="ed-stage" aria-labelledby="ed-stage-title">
          {stage === "select" && (
            <>
              <div className="ed-stage__heading">
                <span className="ed-micro">STEP 01 / 03</span>
                <h2 id="ed-stage-title">Which service do you need?</h2>
                <p>Choose one service to explore this demonstration. Your selection stays on this screen.</p>
              </div>
              {model.services.length > 0 ? (
                <fieldset className="ed-services">
                  <legend className="ed-sr-only">Select a service</legend>
                  {model.services.map((service, index) => (
                    <label key={service.id} className={"ed-service" + (selectedId === service.id ? " ed-service--selected" : "")}>
                      <input
                        type="radio"
                        name="estimate-demo-service"
                        value={service.id}
                        checked={selectedId === service.id}
                        onChange={() => setSelectedId(service.id)}
                      />
                      <span className="ed-micro ed-service__index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="ed-service__content"><strong>{service.title}</strong><small>{service.description}</small></span>
                      <span className="ed-service__mark" aria-hidden="true">{selectedId === service.id ? "●" : "○"}</span>
                    </label>
                  ))}
                </fieldset>
              ) : (
                <p className="ed-empty" role="status">No services are configured for this preview. Return to the concept or call the company directly.</p>
              )}
              <div className="ed-stage__actions">
                <button type="button" className="ed-button" disabled={!selectedService} onClick={() => setStage("review")}>
                  Continue to preview <Arrow />
                </button>
                <span className="ed-micro">NO INFORMATION IS SAVED</span>
              </div>
            </>
          )}

          {stage === "review" && selectedService && (
            <>
              <div className="ed-stage__heading">
                <span className="ed-micro">STEP 02 / 03</span>
                <h2 id="ed-stage-title">Review your selection.</h2>
                <p>This prototype illustrates a possible request journey. It cannot create an estimate or contact the company.</p>
              </div>
              <dl className="ed-review">
                <div><dt>Selected service</dt><dd>{selectedService.title}</dd></div>
                <div><dt>Service overview</dt><dd>{selectedService.description}</dd></div>
                <div><dt>Estimate status</dt><dd>Not calculated — demonstration only</dd></div>
                <div><dt>Request submission</dt><dd>Disabled — no data sent</dd></div>
              </dl>
              <div className="ed-stage__actions">
                <button type="button" className="ed-button" onClick={() => setStage("complete")}>
                  Finish demo <Arrow />
                </button>
                <button type="button" className="ed-button ed-button--outline" onClick={() => setStage("select")}>
                  <Arrow reverse /> Change service
                </button>
              </div>
            </>
          )}

          {stage === "complete" && (
            <>
              <div className="ed-complete">
                <span className="ed-complete__symbol" aria-hidden="true">✓</span>
                <span className="ed-micro">STEP 03 / 03</span>
                <h2 id="ed-stage-title">{model.completedMessage}</h2>
                <p>You explored a proposed service-selection experience for {model.company}. Nothing was transmitted, stored or booked.</p>
                {selectedService && <p className="ed-complete__service"><span className="ed-micro">YOUR DEMO SERVICE</span><strong>{selectedService.title}</strong></p>}
              </div>
              <div className="ed-stage__actions">
                <button type="button" className="ed-button" onClick={restart}>Start again <Arrow /></button>
                <a className="ed-button ed-button--outline" href={model.backHref}><Arrow reverse /> Back to Concept {model.design.toUpperCase()}</a>
              </div>
            </>
          )}
        </section>

        <aside className="ed-aside" aria-label="About this prototype">
          <span className="ed-micro">SERVICE SUPPORT</span>
          <h2>Need to speak<br />to the company?</h2>
          <p>This is not {model.company}'s official request system. To contact the actual business, use its published phone number.</p>
          <a className="ed-aside__phone" href={model.phone.href}>{model.phone.display} <Arrow /></a>
          <p className="ed-micro ed-aside__note">PHONE LINK OPENS YOUR DIALER. NOTHING IS SENT BY THIS DEMO.</p>
        </aside>
      </div>

      <footer className="ed-foot">
        <span>{model.disclaimer}</span>
        <span>Estimate demo · Concept {model.design.toUpperCase()} · No data collection</span>
      </footer>
    </main>
  );
}
