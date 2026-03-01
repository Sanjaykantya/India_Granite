import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const roles = ["developer", "admin", "public"];
export const users = pgTable("users", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    role: text("role", { enum: roles }).notNull().default("public"),
});
export const granites = pgTable("granites", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    image: text("image").notNull(),
    order: integer("order").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
});
export const tiles = pgTable("tiles", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    image: text("image").notNull(),
    order: integer("order").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
});
export const enquiries = pgTable("enquiries", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    message: text("message").notNull(),
    status: text("status", { enum: ["new", "contacted"] }).notNull().default("new"),
    createdAt: timestamp("created_at").defaultNow(),
});
export const sliderImages = pgTable("slider_images", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    beforeImage: text("before_image").notNull(),
    afterImage: text("after_image").notNull(),
    order: integer("order").notNull().default(0),
});
export const mapLocations = pgTable("map_locations", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    name: text("name").notNull(),
    type: text("type", { enum: ["domestic", "international"] }).notNull(),
    lat: text("lat").notNull(),
    lng: text("lng").notNull(),
    isComingSoon: boolean("is_coming_soon").default(false),
});
export const siteContent = pgTable("site_content", {
    id: varchar("id").primaryKey().default(sql `gen_random_uuid()`),
    key: text("key").notNull().unique(),
    content: jsonb("content").notNull(),
});
// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
    username: true,
    password: true,
    role: true,
});
export const insertGraniteSchema = createInsertSchema(granites).omit({ id: true, createdAt: true });
export const insertTileSchema = createInsertSchema(tiles).omit({ id: true, createdAt: true });
export const insertEnquirySchema = createInsertSchema(enquiries).omit({ id: true, createdAt: true });
export const insertSliderImageSchema = createInsertSchema(sliderImages).omit({ id: true });
export const insertMapLocationSchema = createInsertSchema(mapLocations).omit({ id: true });
export const insertSiteContentSchema = createInsertSchema(siteContent).omit({ id: true });
