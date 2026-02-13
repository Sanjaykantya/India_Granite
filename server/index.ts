import { setupApp } from "./app";
import { serveStatic } from "./static";

import { type Request, Response, NextFunction } from "express";

(async () => {
  const { app, httpServer } = await setupApp();

  // Vite or Static
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // 404 Handler - Log unhandled requests
  app.use((req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith("/api")) {
      // API 404
      return res.status(404).json({ message: "Not Found" });
    }
    console.log(`[express] 404 Not Found: ${req.method} ${url}`);
    next(); // Pass to error handler or just send 404 page?
    // If we call next(), it goes to error handler? No, error handler takes 4args.
    // If we want to return 404 page from express default, we can just return or send status.
    res.status(404).send("Not Found");
  });

  // Error handler (must comes last)
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    res.status(status).json({ message });
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`${new Date().toLocaleTimeString()} [express] serving on port ${port}`);
  });
})();
