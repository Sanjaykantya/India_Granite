import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "public");

  if (!fs.existsSync(distPath)) {
    console.warn(`Warning: Could not find the build directory: ${distPath}`);
    return;
  }

  app.use(express.static(distPath));

  // Fallback for SPA routing
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/attached_assets')) {
      return next();
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
