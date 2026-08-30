import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import rateLimit from "express-rate-limit";
import { storage } from "./storage.js";
import { type User as SelectUser } from "./shared/schema.js";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
}

function sanitizeUser(user: SelectUser) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}

declare global {
    namespace Express {
        interface User extends SelectUser { }
    }
}

export function setupAuth(app: Express) {
    const isProduction = process.env.NODE_ENV === "production";
    if (!process.env.SESSION_SECRET) {
        console.warn(
            "SESSION_SECRET environment variable is not set. Using a random secret generated at startup " +
            "(sessions will not survive a server restart). Set SESSION_SECRET in production."
        );
    }
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || randomBytes(32).toString("hex"),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: isProduction,
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax", // 'none' required for cross-origin cookies
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        },
    };

    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
    }

    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await storage.getUserByUsername(username);
                if (!user || !(await comparePasswords(password, user.passwordHash))) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id: string, done) => {
        try {
            const user = await storage.getUser(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    // Note: there is no public /api/register endpoint. This app has a single
    // seeded admin account (see routes.ts); the frontend only exposes a login
    // form (client/src/pages/AuthPage.tsx). Adding self-registration back would
    // let anyone create an account — if that's ever needed, it must validate
    // the request body against insertUserSchema and hardcode role to "public",
    // never trust a client-supplied role.

    app.post("/api/login", loginLimiter, passport.authenticate("local"), (req, res) => {
        res.json(sanitizeUser(req.user!));
    });

    app.post("/api/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.sendStatus(200);
        });
    });

    app.get("/api/user", (req, res) => {
        if (!req.isAuthenticated()) return res.sendStatus(401);
        res.json(sanitizeUser(req.user));
    });
}

export { hashPassword, sanitizeUser };
