# Big Sexy's Brine Co. — Agent Setup Instructions

## Project Overview

Next.js 16 (App Router) website for an artisanal pickling/brining business. Includes a public-facing product catalog, events, gallery, classes, testimonials, and a protected admin dashboard for managing all content. Uses Supabase for database, auth, and image storage.

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Database/Auth/Storage**: Supabase (Postgres + Auth + Storage)
- **Email**: Resend API
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion, Embla Carousel
- **Hosting**: Vercel

## Prerequisites

- Node.js 18+
- npm
- A Supabase project (free tier is sufficient)
- A Resend API key (for contact form)

## Local Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (Settings > API) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase anon/public key (Settings > API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key — server-side only (Settings > API) |
| `RESEND_API_KEY` | Resend email API key (resend.com) |
| `CONTACT_EMAIL` | Email to receive contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (use `http://localhost:3000` for local dev) |

### 3. Set up Supabase database

Run the SQL files in the Supabase SQL Editor in this order:

1. **Schema** — `supabase/schema.sql` — Creates all tables, RLS policies, triggers, and storage bucket
2. **Seed data** — `supabase/seed.sql` — Populates tables with initial product, event, testimonial, and class data

You can also paste both files together as one block — schema first, then seed.

### 4. Create an admin user

In the Supabase dashboard, go to **Authentication > Users > Add User** and create an email/password user. This user will have authenticated access to the admin dashboard (`/admin`).

### 5. Start the dev server

```bash
npm run dev
```

The site runs at `http://localhost:3000`. The admin dashboard is at `http://localhost:3000/admin`.

## Project Structure

```
src/
├── app/
│   ├── (public)/              # Public pages (products, events, gallery, etc.)
│   ├── admin/                 # Protected admin dashboard
│   │   ├── login/             # Admin login page
│   │   ├── products/          # Product CRUD (list, new, [id]/edit)
│   │   ├── events/            # Event CRUD
│   │   ├── testimonials/      # Testimonial CRUD
│   │   ├── class/             # Class info editor (single record)
│   │   └── gallery/           # Gallery image management
│   └── api/                   # API routes (contact, contest, admin revalidation)
├── components/
│   ├── admin/                 # Admin-specific components (forms, tables, sidebar)
│   ├── forms/                 # Public form components
│   ├── gallery/               # Gallery components
│   ├── layout/                # Header, footer, navigation
│   ├── products/              # Product display components
│   ├── seo/                   # SEO/meta components
│   └── ui/                    # shadcn/ui primitives
├── lib/
│   └── supabase/              # Supabase client utilities (client.ts, server.ts, middleware.ts)
├── content/                   # Static content files
├── types/                     # TypeScript type definitions
└── middleware.ts              # Next.js middleware (auth guard for /admin routes)
```

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser-side Supabase client |
| `src/lib/supabase/server.ts` | Server component Supabase client |
| `src/lib/supabase/middleware.ts` | Auth session refresh middleware |
| `src/middleware.ts` | Protects `/admin/*` routes — redirects unauthenticated users to `/admin/login` |
| `src/lib/data.ts` | Data fetching functions used by public pages (reads from Supabase) |
| `supabase/schema.sql` | Full database schema with RLS policies |
| `supabase/seed.sql` | Seed data for all tables |

## Database Schema

Five tables with Row Level Security:

- **products** — Pickled product catalog (name, slug, ingredients, heat level, category, etc.)
- **events** — Farmers markets, festivals, pop-ups, classes
- **testimonials** — Customer quotes with optional product reference
- **class_info** — Single-row table for the "Learn to Preserve" class details
- **gallery_images** — Image URLs with sort order

**RLS policies**: Public `SELECT` on all tables. Authenticated users get full `INSERT`, `UPDATE`, `DELETE`.

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build (also generates sitemap via postbuild)
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture Notes

- **Public pages** use Next.js server components to fetch from Supabase at request time
- **Admin pages** perform CRUD via Supabase client SDK with authenticated sessions
- **Image uploads** go to the Supabase Storage `images` bucket
- **Revalidation**: Admin CRUD operations trigger `revalidatePath()` so public pages reflect changes immediately
- **Auth flow**: Email/password only — no public registration. Admin users are created manually in Supabase dashboard
- Product categories: `Signature`, `Non-Spicy`, `Spicy`, `Garlic`, `Sweet Heat`, `Traditional`, `Specialty`
- Heat levels: 0 (no heat) to 4 (hottest)
