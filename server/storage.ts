import {
  type User, type InsertUser,
  type Granite, type InsertGranite,
  type Tile, type InsertTile,
  type Enquiry, type InsertEnquiry,
  type SliderImage, type InsertSliderImage,
  type MapLocation, type InsertMapLocation,
  type SiteContent, type InsertSiteContent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, update: Partial<User>): Promise<User>;

  // Granites
  getGranites(): Promise<Granite[]>;
  createGranite(granite: InsertGranite): Promise<Granite>;
  updateGranite(id: string, granite: Partial<InsertGranite>): Promise<Granite>;
  deleteGranite(id: string): Promise<void>;

  // Tiles
  getTiles(): Promise<Tile[]>;
  createTile(tile: InsertTile): Promise<Tile>;
  updateTile(id: string, tile: Partial<InsertTile>): Promise<Tile>;
  deleteTile(id: string): Promise<void>;

  // Enquiries
  getEnquiries(): Promise<Enquiry[]>;
  createEnquiry(enquiry: InsertEnquiry): Promise<Enquiry>;
  updateEnquiryStatus(id: string, status: "new" | "contacted"): Promise<Enquiry>;
  deleteEnquiry(id: string): Promise<void>;

  // Slider Images
  getSliderImages(): Promise<SliderImage[]>;
  createSliderImage(image: InsertSliderImage): Promise<SliderImage>;
  updateSliderImage(id: string, image: Partial<InsertSliderImage>): Promise<SliderImage>;
  deleteSliderImage(id: string): Promise<void>;

  // Map Locations
  getMapLocations(): Promise<MapLocation[]>;
  createMapLocation(location: InsertMapLocation): Promise<MapLocation>;
  updateMapLocation(id: string, location: Partial<InsertMapLocation>): Promise<MapLocation>;
  deleteMapLocation(id: string): Promise<void>;

  // Site Content
  getSiteContent(key: string): Promise<SiteContent | undefined>;
  updateSiteContent(key: string, content: any): Promise<SiteContent>;

  // Seeding
  seedUser(user: InsertUser): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private granites: Map<string, Granite>;
  private tiles: Map<string, Tile>;
  private enquiries: Map<string, Enquiry>;
  private sliderImages: Map<string, SliderImage>;
  private mapLocations: Map<string, MapLocation>;
  private siteContent: Map<string, SiteContent>;

  constructor() {
    this.users = new Map();
    this.granites = new Map();
    this.tiles = new Map();
    this.enquiries = new Map();
    this.sliderImages = new Map();
    this.mapLocations = new Map();
    this.siteContent = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((u) => u.username === username);
  }
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      role: insertUser.role || "public"
    };
    this.users.set(id, user);
    return user;
  }
  async updateUser(id: string, update: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updated = { ...user, ...update };
    this.users.set(id, updated);
    return updated;
  }

  // Granite methods
  async getGranites(): Promise<Granite[]> {
    return Array.from(this.granites.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  async createGranite(insertGranite: InsertGranite): Promise<Granite> {
    const id = randomUUID();
    const granite: Granite = {
      id,
      name: insertGranite.name,
      image: insertGranite.image,
      order: insertGranite.order || 0,
      createdAt: new Date()
    };
    this.granites.set(id, granite);
    return granite;
  }
  async updateGranite(id: string, update: Partial<InsertGranite>): Promise<Granite> {
    const existing = this.granites.get(id);
    if (!existing) throw new Error("Granite not found");
    const updated = { ...existing, ...update };
    this.granites.set(id, updated);
    return updated;
  }
  async deleteGranite(id: string): Promise<void> {
    this.granites.delete(id);
  }

  // Tile methods
  async getTiles(): Promise<Tile[]> {
    return Array.from(this.tiles.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  async createTile(insertTile: InsertTile): Promise<Tile> {
    const id = randomUUID();
    const tile: Tile = {
      id,
      name: insertTile.name,
      image: insertTile.image,
      order: insertTile.order || 0,
      createdAt: new Date()
    };
    this.tiles.set(id, tile);
    return tile;
  }
  async updateTile(id: string, update: Partial<InsertTile>): Promise<Tile> {
    const existing = this.tiles.get(id);
    if (!existing) throw new Error("Tile not found");
    const updated = { ...existing, ...update };
    this.tiles.set(id, updated);
    return updated;
  }
  async deleteTile(id: string): Promise<void> {
    this.tiles.delete(id);
  }

  // Enquiry methods
  async getEnquiries(): Promise<Enquiry[]> {
    return Array.from(this.enquiries.values()).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  async createEnquiry(insertEnquiry: InsertEnquiry): Promise<Enquiry> {
    const id = randomUUID();
    const enquiry: Enquiry = { ...insertEnquiry, id, createdAt: new Date(), status: "new" };
    this.enquiries.set(id, enquiry);
    return enquiry;
  }
  async updateEnquiryStatus(id: string, status: "new" | "contacted"): Promise<Enquiry> {
    const existing = this.enquiries.get(id);
    if (!existing) throw new Error("Enquiry not found");
    const updated = { ...existing, status };
    this.enquiries.set(id, updated);
    return updated;
  }
  async deleteEnquiry(id: string): Promise<void> {
    this.enquiries.delete(id);
  }

  // Slider Image methods
  async getSliderImages(): Promise<SliderImage[]> {
    return Array.from(this.sliderImages.values()).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  async createSliderImage(insertImage: InsertSliderImage): Promise<SliderImage> {
    const id = randomUUID();
    const image: SliderImage = {
      id,
      beforeImage: insertImage.beforeImage,
      afterImage: insertImage.afterImage,
      order: insertImage.order || 0
    };
    this.sliderImages.set(id, image);
    return image;
  }
  async updateSliderImage(id: string, update: Partial<InsertSliderImage>): Promise<SliderImage> {
    const existing = this.sliderImages.get(id);
    if (!existing) throw new Error("Slider image not found");
    const updated = { ...existing, ...update };
    this.sliderImages.set(id, updated);
    return updated;
  }
  async deleteSliderImage(id: string): Promise<void> {
    this.sliderImages.delete(id);
  }

  // Map Location methods
  async getMapLocations(): Promise<MapLocation[]> {
    return Array.from(this.mapLocations.values());
  }
  async createMapLocation(insertLocation: InsertMapLocation): Promise<MapLocation> {
    const id = randomUUID();
    const location: MapLocation = { ...insertLocation, id, isComingSoon: insertLocation.isComingSoon || false };
    this.mapLocations.set(id, location);
    return location;
  }
  async updateMapLocation(id: string, update: Partial<InsertMapLocation>): Promise<MapLocation> {
    const existing = this.mapLocations.get(id);
    if (!existing) throw new Error("Map location not found");
    const updated = { ...existing, ...update };
    this.mapLocations.set(id, updated);
    return updated;
  }
  async deleteMapLocation(id: string): Promise<void> {
    this.mapLocations.delete(id);
  }

  // Site Content methods
  async getSiteContent(key: string): Promise<SiteContent | undefined> {
    return this.siteContent.get(key);
  }
  async updateSiteContent(key: string, content: any): Promise<SiteContent> {
    const existing = this.siteContent.get(key);
    if (existing) {
      const updated = { ...existing, content };
      this.siteContent.set(key, updated);
      return updated;
    } else {
      const id = randomUUID();
      const newsiteContent: SiteContent = { id, key, content };
      this.siteContent.set(key, newsiteContent);
      return newsiteContent;
    }
  }

  async seedUser(insertUser: InsertUser): Promise<void> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, role: insertUser.role || "public" };
    this.users.set(id, user);
  }
}

export const storage = new MemStorage();
