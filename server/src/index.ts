import "dotenv/config";
import { setupApp } from "./app.js";

import { type Request, Response, NextFunction } from "express";

const PORT = process.env.PORT || 5000;

let appInstance: any;

setupApp().then(({ app, httpServer }) => {
  appInstance = app;

  // Error handler (must come last)
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    res.status(status).json({ message });
  });

  httpServer.listen(PORT, () => {
    console.log(`${new Date().toLocaleTimeString()} [express] serving on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to setup app", err);
});

export { appInstance as app };
