import { setupApp } from "../server/app";

// Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
    const { app } = await setupApp();
    // Ensure we don't restart the server or anything, just use the app as handler.
    // Express apps are valid request handlers: (req, res) => ...
    app(req, res);
}
