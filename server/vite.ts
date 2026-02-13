import { type Express } from "express";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const viteLogger = createLogger();

export async function setupVite(server: Server, app: Express) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server, path: "/vite-hmr" },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        console.error("[Vite Fatal Error]", msg);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  console.log(`[Vite] Setup with root: ${viteConfig.root}`);
  console.log(`[Vite] import.meta.dirname: ${import.meta.dirname}`);

  app.use((req, res, next) => {
    // console.log(`[Vite] Middleware stack reached: ${req.method} ${req.url}`);
    next();
  });

  app.use(vite.middlewares);

  // Serve index.html for all other routes
  app.use(async (req, res, next) => {
    // Only handle GET requests or requests that didn't match anything else
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/attached_assets')) {
      return next();
    }

    const url = req.originalUrl;
    console.log(`[Vite] Catch-all handling: ${url}`);

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      if (!fs.existsSync(clientTemplate)) {
        console.error(`[Vite] Template not found at: ${clientTemplate}`);
        return next(new Error("Index.html not found"));
      }

      console.log(`[Vite] Serving index.html for ${url} from ${clientTemplate}`);

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      console.error("[Vite] Error serving index.html:", e);
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
