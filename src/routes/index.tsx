/**
 * South Cooling release — neutral index for two WEBINOW design concepts.
 * No old v0.2 customer content, no form and no contact submission.
 */
import { createFileRoute } from "@tanstack/react-router";
import { activeProspectV3 } from "@/core/config/v3/prospect";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: activeProspectV3.brand.name + " — Design Proposals | WEBINOW Labs" },
      { name: "description", content: "Two unofficial WEBINOW website design proposals. No requests are collected." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: ProposalIndex,
});

function ProposalIndex() {
  return (
    <main style={{
      minHeight: "100svh",
      background: "#071b2d",
      color: "#f3f7f8",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "clamp(24px, 6vw, 96px)",
    }}>
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#76c9de" }}>
        WEBINOW LABS / UNOFFICIAL DESIGN PROPOSAL
      </p>
      <h1 style={{ fontSize: "clamp(38px, 7vw, 98px)", letterSpacing: "-0.065em", lineHeight: 1.05, maxWidth: 1000, margin: "36px 0 24px" }}>
        Two directions.<br/>One brand.
      </h1>
      <p style={{ maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "#b5cbd5", marginBottom: 45 }}>
        Design explorations for {activeProspectV3.brand.name}. Select a concept to review its presentation and interactive estimate demonstration.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <a href="/a" style={{
          flex: "1 1 260px", maxWidth: 460, padding: "30px 25px", border: "1px solid #76c9de", textDecoration: "none", color: "inherit",
        }}>
          <span style={{ display: "block", fontSize: 11, color: "#76c9de", letterSpacing: ".1em" }}>CONCEPT 01</span>
          <strong style={{ display: "block", fontSize: 28, margin: "12px 0" }}>Industrial Cinematic</strong>
          <span style={{ display: "block", fontSize: 14 }}>View Concept A →</span>
        </a>
        <a href="/b" style={{
          flex: "1 1 260px", maxWidth: 460, padding: "30px 25px", border: "1px solid #7898a8", textDecoration: "none", color: "inherit",
        }}>
          <span style={{ display: "block", fontSize: 11, color: "#76c9de", letterSpacing: ".1em" }}>CONCEPT 02</span>
          <strong style={{ display: "block", fontSize: 28, margin: "12px 0" }}>Editorial Precision</strong>
          <span style={{ display: "block", fontSize: 14 }}>View Concept B →</span>
        </a>
      </div>
      <p style={{ maxWidth: 800, marginTop: 55, fontSize: 12, lineHeight: 1.6, color: "#b5cbd5" }}>
        This is a design proposal, not the company's official website. Selected imagery is available for internal review only until usage rights are confirmed. No quote requests are submitted.
      </p>
    </main>
  );
}
