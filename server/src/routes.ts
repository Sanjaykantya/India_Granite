import type { Express, Request, Response, NextFunction } from "express";
import { type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage.js";
import { setupAuth } from "./auth.js";
import {
  insertGraniteSchema, insertTileSchema, insertEnquirySchema,
  insertSliderImageSchema, insertMapLocationSchema, insertSiteContentSchema,
  type User
} from "./shared/schema.js";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB, decoded

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware for RBAC
function checkRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (!roles.includes(req.user!.role)) return res.sendStatus(403);
    next();
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed default users
  const adminExists = await storage.getUserByUsername("Admin");
  if (!adminExists) {
    const { hashPassword } = await import("./auth.js");
    const hashedAdmin = await hashPassword("admin");
    await storage.seedUser({
      username: "Admin",
      passwordHash: hashedAdmin,
      role: "admin",
      name: "Administrator",
    });
  }



  // Explicit redirect for /admin to /auth
  app.get("/admin", (_req, res) => res.redirect("/auth"));

  // setup auth
  setupAuth(app);

  // --- Public APIs ---

  // Granites
  app.get("/api/granites", async (_req, res) => {
    const granites = await storage.getGranites();
    res.json(granites);
  });

  // Tiles
  app.get("/api/tiles", async (_req, res) => {
    const tiles = await storage.getTiles();
    res.json(tiles);
  });

  // Slider Images
  app.get("/api/slider-images", async (_req, res) => {
    const images = await storage.getSliderImages();
    res.json(images);
  });

  // Map Locations
  app.get("/api/map-locations", async (_req, res) => {
    const locations = await storage.getMapLocations();
    res.json(locations);
  });

  // Site Content
  app.get("/api/content/:key", async (req, res) => {
    const content = await storage.getSiteContent(req.params.key);
    res.json(content || { content: {} });
  });

  // Enquiries (Create)
  app.post("/api/enquiries", async (req, res) => {
    const result = insertEnquirySchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);
    const enquiry = await storage.createEnquiry(result.data);
    res.status(201).json(enquiry);
  });

  // --- Admin APIs (FULL CMS CONTROL) ---
  const isAdmin = checkRole(["admin"]);

  // Granites CMS
  app.post("/api/granites", isAdmin, async (req, res) => {
    const result = insertGraniteSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);
    const granite = await storage.createGranite(result.data);
    res.status(201).json(granite);
  });

  app.patch("/api/granites/:id", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    const granite = await storage.updateGranite(id, req.body);
    res.json(granite);
  });

  app.delete("/api/granites/:id", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    await storage.deleteGranite(id);
    res.sendStatus(204);
  });

  // Tiles CMS
  app.post("/api/tiles", isAdmin, async (req, res) => {
    const result = insertTileSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);
    const tile = await storage.createTile(result.data);
    res.status(201).json(tile);
  });

  app.patch("/api/tiles/:id", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    const tile = await storage.updateTile(id, req.body);
    res.json(tile);
  });

  app.delete("/api/tiles/:id", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    await storage.deleteTile(id);
    res.sendStatus(204);
  });

  // Slider Images CMS
  app.post("/api/slider-images", isAdmin, async (req, res) => {
    const result = insertSliderImageSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);
    const image = await storage.createSliderImage(result.data);
    res.status(201).json(image);
  });

  app.delete("/api/slider-images/:id", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    await storage.deleteSliderImage(id);
    res.sendStatus(204);
  });

  // Map Locations CMS
  app.post("/api/map-locations", isAdmin, async (req, res) => {
    const result = insertMapLocationSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json(result.error);
    const location = await storage.createMapLocation(result.data);
    res.status(201).json(location);
  });

  // Site Content CMS
  app.post("/api/content/:key", isAdmin, async (req, res) => {
    const key = String(req.params.key);
    const content = await storage.updateSiteContent(key, req.body.content);
    res.json(content);
  });

  // Generic Image Upload (Public — used by the contact form's reference-image
  // field and the admin "click to edit" feature, so it can't require auth).
  app.post("/api/upload", uploadLimiter, async (req, res) => {
    const image = req.body.image;
    if (typeof image !== "string" || !/^data:image\/(png|jpe?g|webp|gif);base64,/.test(image)) {
      return res.status(400).send("Image must be a base64-encoded PNG, JPEG, WEBP, or GIF data URL");
    }
    const base64Length = image.length - image.indexOf(",") - 1;
    const approxBytes = base64Length * 0.75;
    if (approxBytes > MAX_UPLOAD_BYTES) {
      return res.status(413).send("Image is too large (max 8MB)");
    }
    // In a real app, this would save to disk/S3. Here we just return the data URL or a mock path.
    // For the "Click to edit" feature, we'll store the provided data as is.
    res.json({ url: image });
  });

  // Profile Management

  app.patch("/api/user/profile", isAdmin, async (req, res) => {
    const { username, password } = req.body;
    const user = req.user!;

    let update: Partial<User> = {};
    if (username) update.username = username;
    const { hashPassword, sanitizeUser } = await import("./auth.js");
    if (password) {
      update.passwordHash = await hashPassword(password);
    }

    const updatedUser = await storage.updateUser(user.id, update);
    res.json(sanitizeUser(updatedUser));
  });

  // --- Admin APIs (ENQUIRIES ONLY) ---

  app.get("/api/admin/enquiries", isAdmin, async (_req, res) => {
    const enquiries = await storage.getEnquiries();
    res.json(enquiries);
  });

  app.patch("/api/admin/enquiries/:id/status", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    if (req.body.status !== "new" && req.body.status !== "contacted") {
      return res.status(400).send('status must be "new" or "contacted"');
    }
    const enquiry = await storage.updateEnquiryStatus(id, req.body.status);
    res.json(enquiry);
  });

  app.delete("/api/admin/enquiries/:id", isAdmin, async (req, res) => {
    const id = String(req.params.id);
    await storage.deleteEnquiry(id);
    res.sendStatus(204);
  });

  return httpServer;
}
