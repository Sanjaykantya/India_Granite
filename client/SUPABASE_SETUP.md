# Supabase Database Setup Guide

## Overview
This project uses Supabase PostgreSQL database with Drizzle ORM for data management.

## Configuration Steps

### 1. Get Your Supabase Credentials
You've provided:
- **Project URL**: https://lrytjwffbmenpyyozpec.supabase.co
- **Publishable Key**: sb_publishable_zhofnkgA8iPLcjnGvJ03pQ_oFgKhjJE
- **Host**: db.lrytjwffbmenpyyozpec.supabase.co

### 2. Get Your Database Password
The database password was set when you created your Supabase project. To find it:
1. Go to https://app.supabase.com/
2. Select your project "Sanjaykantya's Project"
3. Navigate to **Project Settings** → **Database**
4. Look for the database password (or reset it if you forgot it)

### 3. Update .env File
Edit the `.env` file and replace `YOUR_PASSWORD` with your actual Supabase database password:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.lrytjwffbmenpyyozpec.supabase.co:5432/postgres
SUPABASE_URL=https://lrytjwffbmenpyyozpec.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zhofnkgA8iPLcjnGvJ03pQ_oFgKhjJE
NODE_ENV=development
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Create Database Tables
Run the migration to create all necessary tables:
```bash
npm run db:push
```

This will:
- Create the `users` table for authentication
- Create the `granites` table for granite gallery
- Create the `tiles` table for tiles gallery
- Create the `enquiries` table for form submissions
- Create the `sliderImages` table for before/after sliders
- Create the `mapLocations` table for location data
- Create the `siteContent` table for dynamic content

### 6. Start the Development Server
```bash
npm run dev
```

## Database Tables Created

### users
- Stores admin and user accounts
- Fields: id, username, password, role

### granites
- Stores granite product information
- Fields: id, name, image, order, createdAt

### tiles
- Stores tile product information
- Fields: id, name, image, order, createdAt

### enquiries
- Stores customer inquiries/contact form submissions
- Fields: id, name, email, phone, message, status, createdAt

### sliderImages
- Stores before/after comparison images
- Fields: id, beforeImage, afterImage, order

### mapLocations
- Stores location information for the global map
- Fields: id, name, type, lat, lng, isComingSoon

### siteContent
- Stores dynamic content/settings for the website
- Fields: id, key, content

## Troubleshooting

### Connection Issues
If you get connection errors:
1. Verify the password is correct in the .env file
2. Check that your IP is whitelisted in Supabase (Project Settings → Database → Allowed connections)
3. Ensure DATABASE_URL environment variable is set correctly

### Migration Issues
If `npm run db:push` fails:
1. Make sure you have the correct database password
2. Check database connectivity with: `npm run check`
3. Check for any schema conflicts in your database

### Port Issues
The app runs on port 5000 by default. If port 5000 is in use:
- The dev server will tell you
- You can change the port in `server/index.ts` or run on a different port

## API Endpoints

### Public APIs (No Authentication Required)
- `GET /api/granites` - Get all granites
- `GET /api/tiles` - Get all tiles
- `GET /api/enquiries` - Get all enquiries
- `POST /api/enquiries` - Create new enquiry
- `GET /api/slider-images` - Get all before/after images
- `GET /api/map-locations` - Get all map locations
- `GET /api/site-content/:key` - Get specific site content

### Admin APIs (Authentication Required)
- `POST /api/granites` - Create granite
- `PATCH /api/granites/:id` - Update granite
- `DELETE /api/granites/:id` - Delete granite
- Similar endpoints for tiles, enquiries, slider images, map locations, and site content

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://postgres:password@host:5432/postgres |
| SUPABASE_URL | Supabase project URL | https://xxxxx.supabase.co |
| SUPABASE_ANON_KEY | Public API key for client-side operations | sb_publishable_xxxxx |
| NODE_ENV | Environment (development/production) | development |

## Notes
- Never commit the `.env` file to Git (it's already in .gitignore)
- The `.env.example` file shows the structure without secrets
- For production, use strong database passwords
- Consider using additional authentication mechanisms for admin endpoints
