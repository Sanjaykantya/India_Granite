import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

export async function setupApp() {
    const app = express();
    const httpServer = createServer(app);

    app.use(cors({
        origin(origin, callback) {
            // Allow same-origin/non-browser requests (no Origin header) and any
            // explicitly allowed origin. Everything else is rejected — this
            // previously reflected ANY origin with credentials enabled, which
            // let any website read authenticated responses from a logged-in
            // admin's browser (session hijack / enquiry data theft).
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error(`Origin ${origin} not allowed by CORS`));
        },
        credentials: true,
    }));

    // General rate limit as a baseline against abuse/scraping
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 300,
        standardHeaders: true,
        legacyHeaders: false,
    }));

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

    // CSP for this API's own responses (the frontend is a separate static
    // site on Vercel and sets its own CSP; this only covers this Express app).
    app.use((_req, res, next) => {
        res.setHeader(
            "Content-Security-Policy",
            "default-src 'none'; frame-ancestors 'none'"
        );
        next();
    });

    // Routes
    await registerRoutes(httpServer, app);

    return { app, httpServer };
}
