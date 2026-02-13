
import { setupApp } from "../server/app";

// Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
    const { app } = await setupApp();

    // Add error handler for serverless environment
    app.use((err: any, _req: any, res: any, next: any) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        console.error("Internal Server Error:", err);
        if (res.headersSent) return next(err);
        res.status(status).json({ message });
    });

    // Ensure we don't restart the server or anything, just use the app as handler.
    // Express apps are valid request handlers: (req, res) => ...
    app(req, res);
}
