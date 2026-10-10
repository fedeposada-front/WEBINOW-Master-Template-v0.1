/**
 * Gate 2C: audit served HTML for the South Cooling /a proposal.
 * This is a LOCAL SSR smoke test, not a production publishing approval.
 *
 * Run with a dev server already running:
 *   node scripts/audit-proposal-html-v3.mjs http://localhost:3000/a
 *
 * This checks rendered HTML (not only source files). Route isolation, deployed
 * public assets, favicon and all legacy routes need a separate publishing gate.
 */
import assert from "node:assert/strict";

const address = process.argv[2] ?? "http://localhost:3000/a";
let url;
try {
  url = new URL(address);
  assert.ok(["http:", "https:"].includes(url.protocol), "Expected HTTP(S) URL");
  assert.equal(url.pathname, "/a", "Audit /a, not an unrelated page");
  // Prevent a URL pasted from a live deployment from being audited as local QA.
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(url.hostname), "Only local URLs are accepted");
} catch (error) {
  console.error("FAIL: invalid local /a URL:", error.message);
  process.exitCode = 1;
}

if (url && process.exitCode !== 1) {
  try {
    const res = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(12000) });
    assert.equal(res.status, 200, "Expected HTTP 200 for the proposal route");
    assert.match(res.headers.get("content-type") ?? "", /text\/html/i, "Expected HTML content type");
    const html = await res.text();
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
    assert.ok(head, "No server-rendered <head> element");

    function tags(name) {
      return [...head.matchAll(new RegExp("<" + name + "\\b[^>]*>", "gi"))].map(m => m[0]);
    }
    function attr(tag, key) {
      const match = tag.match(new RegExp("\\b" + key + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
      return match?.[2] ?? null;
    }
    function meta(key, value) {
      return tags("meta").filter(t => attr(t, key)?.toLowerCase() === value.toLowerCase());
    }

    const titles = [...head.matchAll(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/gi)];
    assert.equal(titles.length, 1, "Expected exactly one <title> on /a");
    assert.match(titles[0][1], /South Cooling/i, "Page title is not South Cooling");
    assert.doesNotMatch(titles[0][1], /Comfort\s*(?:SOS|S\.O\.S\.)|Northline/i);

    const description = meta("name", "description");
    assert.equal(description.length, 1, "Expected one description tag");
    assert.match(attr(description[0], "content") ?? "", /South Cooling/i);

    const authors = meta("name", "author");
    assert.equal(authors.length, 1, "Expected one author");
    assert.match(attr(authors[0], "content") ?? "", /WEBINOW/i);

    const robots = meta("name", "robots");
    assert.equal(robots.length, 1, "Expected one robots meta tag");
    const robotsValue = attr(robots[0], "content") ?? "";
    assert.match(robotsValue, /\bnoindex\b/i);
    assert.match(robotsValue, /\bnofollow\b/i);

    const ogTitles = meta("property", "og:title");
    assert.equal(ogTitles.length, 1, "Expected one og:title");
    assert.match(attr(ogTitles[0], "content") ?? "", /South Cooling/i);

    const ogDescriptions = meta("property", "og:description");
    assert.equal(ogDescriptions.length, 1, "Expected one og:description");
    assert.match(attr(ogDescriptions[0], "content") ?? "", /South Cooling/i);

    for (const key of ["twitter:title", "twitter:description"]) {
      const items = meta("name", key);
      assert.equal(items.length, 1, "Expected one " + key);
      assert.match(attr(items[0], "content") ?? "", /South Cooling/i);
    }

    assert.equal(tags("link").filter(t => attr(t, "rel")?.toLowerCase() === "canonical").length, 0, "Proposal must not claim a canonical");
    assert.equal(tags("script").filter(t => attr(t, "type") === "application/ld+json").length, 0, "Proposal must not include business JSON-LD");

    const oldClient = /Comfort\s*(?:SOS|S\.O\.S\.)|Northline(?:\s+Plumbing)?|CAC1819197|18333024080|book\.housecallpro\.com/i;
    assert.doesNotMatch(html, oldClient, "Old prospect data leaked into /a HTML");

    assert.match(html, /South Cooling/i, "SSR body does not include South Cooling");
    assert.match(html, /BUILT\s*FOR/i, "SSR body does not contain Concept A");
    assert.match(html, /tel:\+13054638866/i, "Expected South Cooling telephone link");

    console.log("PASS: /a SSR HTML — South Cooling SEO, one set of tags, noindex, no canonical or JSON-LD, no legacy client data");
    console.log("NOT CHECKED: favicon contents, legacy / and /commercial routes, static assets and real production deployment");
  } catch (error) {
    console.error("FAIL: /a SSR HTML audit —", error.message);
    if (error.cause) console.error("Cause:", error.cause.message ?? error.cause);
    process.exitCode = 1;
  }
}
