/**
 * WEBINOW local-only media previews.
 *
 * Private user-provided originals belong at:
 *   .webinow-private/sites/{assetNamespace}/{name}.webp
 *
 * They are NEVER in Vite publicDir, imported as build assets, or served on
 * non-loopback interfaces. This is a development-only plugin; 'vite build'
 * intentionally excludes it (apply: "serve").
 */
import { createReadStream, statSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const root = resolve(process.cwd(), ".webinow-private", "sites");
const previewAsset = /^\/__internal-media\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9][a-z0-9_-]*\.webp)$/;
const localAddresses = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

export function internalMediaPreviewPlugin(): Plugin {
  return {
    name: "webinow-internal-media-preview",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== "GET" && req.method !== "HEAD") return next();
        let pathname: string;
        try {
          pathname = new URL(req.url ?? "/", "http://localhost").pathname;
        } catch {
          return next();
        }
        if (!pathname.startsWith("/__internal-media/")) return next();

        // Even if Vite reports a Network URL, these photos never leave the local machine.
        if (!localAddresses.has(req.socket.remoteAddress ?? "")) {
          res.writeHead(403, { "Cache-Control": "no-store" });
          res.end("Local media previews are not available over the network.");
          return;
        }

        const match = pathname.match(previewAsset);
        if (!match) {
          res.writeHead(404, { "Cache-Control": "no-store" });
          res.end("Private media path not found.");
          return;
        }

        const [, namespace, filename] = match;
        const filePath = resolve(root, namespace, filename);
        let size: number;
        try {
          const info = statSync(filePath);
          if (!info.isFile()) throw new Error("Not a regular file");
          size = info.size;
        } catch {
          res.writeHead(404, { "Cache-Control": "no-store" });
          res.end("Private media missing. Extract the internal media ZIP to .webinow-private/.");
          return;
        }

        res.writeHead(200, {
          "Content-Type": "image/webp",
          "Content-Length": size,
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
        });
        if (req.method === "HEAD") {
          res.end();
          return;
        }
        const stream = createReadStream(filePath);
        stream.on("error", () => {
          if (!res.headersSent) res.writeHead(500);
          res.destroy();
        });
        stream.pipe(res);
      });
    },
  };
}
