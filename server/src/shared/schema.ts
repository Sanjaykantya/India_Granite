import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const roles = ["developer", "admin", "public"] as const;

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(),
  name: text("name").notNull(),
});

export const granites = pgTable("granites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  image: text("image").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tiles = pgTable("tiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  image: text("image").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email").notNull(),
  location: text("location"),
  projectType: text("project_type"),
  graniteInterest: text("granite_interest"),
  quantity: text("quantity"),
  referenceImageUrl: text("reference_image_url"),
  message: text("message"),
  status: text("status", { enum: ["new", "contacted"] }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sliderImages = pgTable("slider_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  beforeImage: text("before_image").notNull(),
  afterImage: text("after_image").notNull(),
  order: integer("order").notNull().default(0),
});

export const mapLocations = pgTable("map_locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type", { enum: ["domestic", "international"] }).notNull(),
  lat: text("lat").notNull(),
  lng: text("lng").notNull(),
  isComingSoon: boolean("is_coming_soon").default(false),
});

export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  content: jsonb("content").notNull(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  passwordHash: true, // ✅ FIXED
  role: true,
  name: true,
});

export const insertGraniteSchema = createInsertSchema(granites).omit({ id: true, createdAt: true });
export const insertTileSchema = createInsertSchema(tiles).omit({ id: true, createdAt: true });
export const insertEnquirySchema =
  createInsertSchema(enquiries).omit({ id: true, createdAt: true });
export const insertSliderImageSchema = createInsertSchema(sliderImages).omit({ id: true });
export const insertMapLocationSchema = createInsertSchema(mapLocations).omit({ id: true });
export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Granite = typeof granites.$inferSelect;
export type InsertGranite = z.infer<typeof insertGraniteSchema>;
export type Tile = typeof tiles.$inferSelect;
export type InsertTile = z.infer<typeof insertTileSchema>;
export type Enquiry = typeof enquiries.$inferSelect;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type SliderImage = typeof sliderImages.$inferSelect;
export type InsertSliderImage = z.infer<typeof insertSliderImageSchema>;
export type MapLocation = typeof mapLocations.$inferSelect;
export type InsertMapLocation = z.infer<typeof insertMapLocationSchema>;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
