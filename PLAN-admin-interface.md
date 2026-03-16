# Admin Interface Plan — Big Sexy's Brine Co.

## Current State

- **Framework**: Next.js 16 (App Router) on Vercel
- **Data**: Static JSON files (`products.json`, `events.json`, `class.json`, `testimonials.json`)
- **Auth**: None
- **Database**: None (JSON files)
- **Storage**: Static images in `/public/images/`
- **UI**: shadcn/ui + Tailwind CSS v4

## Recommendation: Supabase (All-in-One)

### Why Supabase over piecemeal Vercel services

| Concern | Supabase Free Tier | Vercel Piecemeal (Blob + Postgres + Better Auth) |
|---|---|---|
| **Auth** | Built-in (email/password, OAuth, magic link) — unlimited MAUs on free tier | Better Auth requires manual setup, session management, adapter config |
| **Database** | Postgres with 500MB, unlimited API requests | Vercel Postgres (Neon): 256MB storage, limited compute hours |
| **Object Storage** | 1GB storage, 2GB bandwidth/month | Vercel Blob: 250MB free |
| **Admin UI** | Supabase Studio (built-in table editor) | Nothing built-in |
| **Complexity** | 1 service, 1 dashboard, 1 SDK | 3+ services, multiple configs, multiple SDKs |
| **Cost at scale** | $25/mo Pro tier if needed | Costs add up across multiple services |
| **Row Level Security** | Built-in RLS policies | Must implement manually |

**Verdict**: Supabase wins for this use case. One service handles auth, database, and image storage. The free tier is generous enough for a small business site (1-2 admins, ~15 products, handful of events).

---

## Architecture Overview

```
Public Site (existing)          Admin Dashboard (new)
─────────────────────          ─────────────────────
/products                       /admin
/events                         /admin/products
/about                          /admin/events
/contact                        /admin/testimonials
/gallery                        /admin/class
                                /admin/gallery

Both read from Supabase ←→ Supabase (Postgres + Auth + Storage)
```

### Key Architectural Decision

Migrate from static JSON files to Supabase Postgres. The public site will read from Supabase at build time (ISR/SSG) or via server components, and the admin will perform CRUD operations against Supabase directly.

---

## Implementation Plan

### Phase 1: Supabase Setup & Data Migration

1. **Create Supabase project** (free tier)
2. **Design database schema:**

   ```sql
   -- Products table
   CREATE TABLE products (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     size TEXT NOT NULL,
     tagline TEXT NOT NULL,
     description TEXT NOT NULL,
     ingredients TEXT[] NOT NULL,
     heat INTEGER DEFAULT 0,
     category TEXT NOT NULL CHECK (category IN ('Signature', 'Non-Spicy', 'Spicy', 'Garlic', 'Sweet Heat', 'Traditional', 'Specialty')),
     image_url TEXT,
     featured BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Events table
   CREATE TABLE events (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     date DATE NOT NULL,
     time TEXT NOT NULL,
     location TEXT NOT NULL,
     address TEXT,
     type TEXT NOT NULL CHECK (type IN ('market', 'festival', 'pop-up', 'class')),
     description TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Testimonials table
   CREATE TABLE testimonials (
     id SERIAL PRIMARY KEY,
     quote TEXT NOT NULL,
     author TEXT NOT NULL,
     product TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Class info table (single row)
   CREATE TABLE class_info (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     price NUMERIC(10,2) NOT NULL,
     duration TEXT NOT NULL,
     description TEXT NOT NULL,
     what_you_learn TEXT[] NOT NULL,
     what_you_get TEXT[] NOT NULL,
     max_students INTEGER NOT NULL
   );

   -- Gallery images table
   CREATE TABLE gallery_images (
     id SERIAL PRIMARY KEY,
     url TEXT NOT NULL,
     alt TEXT,
     sort_order INTEGER DEFAULT 0,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

3. **Seed database** with existing JSON data
4. **Set up Supabase Storage** bucket for product/gallery images
5. **Configure Row Level Security (RLS)**:
   - Public: `SELECT` on all tables (for the website)
   - Authenticated admin: Full CRUD

### Phase 2: Auth & Admin Layout

1. **Install dependencies:**
   ```
   @supabase/supabase-js
   @supabase/ssr
   ```

2. **Supabase client setup:**
   - `src/lib/supabase/client.ts` — browser client
   - `src/lib/supabase/server.ts` — server component client
   - `src/lib/supabase/middleware.ts` — auth session refresh

3. **Admin auth flow:**
   - `/admin/login` — email/password login (no public registration)
   - Admin users created manually in Supabase dashboard
   - Middleware protects all `/admin/*` routes
   - Session handled via Supabase SSR cookies

4. **Admin layout:**
   - `src/app/admin/layout.tsx` — sidebar nav, dark theme matching brand
   - Sidebar links: Dashboard, Products, Events, Testimonials, Class, Gallery
   - Mobile-responsive with collapsible sidebar

### Phase 3: Admin CRUD Pages

Each admin section follows the same pattern:

#### Products (`/admin/products`)
- **List view**: Table with name, category, heat, featured badge, edit/delete actions
- **Create/Edit**: Form with all product fields, image upload to Supabase Storage, slug auto-generation from name
- **Delete**: Confirmation dialog, cascading image cleanup

#### Events (`/admin/events`)
- **List view**: Table sorted by date, with type badges
- **Create/Edit**: Form with date picker, location, type dropdown
- **Delete**: Confirmation dialog

#### Testimonials (`/admin/testimonials`)
- **List view**: Cards showing quote preview, author
- **Create/Edit**: Simple form with quote, author, optional product reference
- **Delete**: Confirmation dialog

#### Class Info (`/admin/class`)
- **Single edit view**: Form for class details (title, price, duration, description)
- **Dynamic list management** for "what you learn" and "what you get" arrays

#### Gallery (`/admin/gallery`)
- **Grid view**: Drag-and-drop reorderable image grid
- **Upload**: Multi-image upload to Supabase Storage
- **Delete**: Remove image from storage + database

### Phase 4: Migrate Public Site to Supabase

1. **Update `src/lib/data.ts`** to fetch from Supabase instead of JSON imports
2. **Use server components** for data fetching (no client-side queries on public pages)
3. **Add ISR (Incremental Static Regeneration)** or on-demand revalidation:
   - Admin CRUD operations trigger `revalidatePath()` / `revalidateTag()` so public pages update immediately
4. **Update image references** from `/images/products/...` to Supabase Storage URLs
5. **Remove JSON files** from `src/content/` once migration is verified
6. **Keep TypeScript types** in `src/types/index.ts` (update if schema changes)

### Phase 5: Admin Dashboard & Polish

- **Dashboard page** (`/admin`): Quick stats (product count, upcoming events, recent testimonials)
- **Toast notifications** for CRUD success/error (shadcn/ui toast)
- **Loading states** and optimistic updates
- **Form validation** with Zod (reuse existing pattern)

---

## Environment Variables (New)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Server-side only, for admin operations
```

## File Structure (New Files)

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx              # Admin shell (sidebar, auth guard)
│   │   ├── page.tsx                # Dashboard
│   │   ├── login/
│   │   │   └── page.tsx            # Login form
│   │   ├── products/
│   │   │   ├── page.tsx            # Product list
│   │   │   ├── new/page.tsx        # Create product
│   │   │   └── [id]/edit/page.tsx  # Edit product
│   │   ├── events/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── testimonials/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── class/
│   │   │   └── page.tsx            # Single edit form
│   │   └── gallery/
│   │       └── page.tsx            # Grid + upload
│   └── api/
│       └── admin/
│           └── revalidate/route.ts # On-demand revalidation endpoint
├── components/
│   └── admin/
│       ├── sidebar.tsx
│       ├── data-table.tsx
│       ├── image-upload.tsx
│       ├── product-form.tsx
│       ├── event-form.tsx
│       ├── testimonial-form.tsx
│       ├── class-form.tsx
│       └── gallery-grid.tsx
├── lib/
│   └── supabase/
│       ├── client.ts               # Browser client
│       ├── server.ts               # Server client
│       └── middleware.ts            # Auth middleware
└── middleware.ts                    # Next.js middleware (auth guard for /admin)
```

## Migration Strategy

1. Set up Supabase and seed data **alongside** existing JSON files
2. Build admin interface writing to Supabase
3. Switch public site reads from JSON to Supabase
4. Verify everything works
5. Remove JSON files

This approach ensures zero downtime — the public site keeps working throughout the migration.

## Estimated Scope

- **Phase 1** (Supabase + Schema): Foundation
- **Phase 2** (Auth + Layout): Admin shell
- **Phase 3** (CRUD Pages): Core admin functionality
- **Phase 4** (Migration): Switch public site to Supabase
- **Phase 5** (Polish): Dashboard, UX improvements

## Free Tier Adequacy

For Big Sexy's Brine Co. (1-2 admins, ~15 products, <100 events/year, handful of testimonials):

- **Supabase Free Tier**: 500MB database, 1GB storage, unlimited auth — more than sufficient
- **Vercel Free Tier**: Handles the Next.js hosting as it does today
- **Total cost: $0/month** for the foreseeable future
