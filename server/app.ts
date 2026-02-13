import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import path from "path";

export async function setupApp() {
    const app = express();
    const httpServer = createServer(app);

    // Body parsing with increased limit for image uploads
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: false, limit: "50mb" }));

    // Serve attached assets
    // In Vercel, this might not work as expected for uploads unless using /tmp or external storage (S3/Cloudinary)
    // For static assets in repo, it's fine.
    app.use("/attached_assets", express.static(path.resolve(process.cwd(), "attached_assets")));

    // Basic logging
    app.use((req, res, next) => {
        const start = Date.now();
        console.log(`${new Date().toLocaleTimeString()} [express] ${req.method} ${req.path}`);
        res.on("finish", () => {
            const duration = Date.now() - start;
            console.log(`${new Date().toLocaleTimeString()} [express] ${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
        });
        next();
    });

    // CSP Header to fix devtools connection errors
    app.use((_req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://* http://*;"
        );
        next();
    });

    // Routes
    await registerRoutes(httpServer, app);

    return { app, httpServer };
}
