# Future Admin Dashboard Architectural Roadmap

This document outlines the professional architectural roadmap for adding a secure, production-grade Content Management & Administration Dashboard to this portfolio.

---

## 1. Why a Fake Frontend Login Was Not Built

Many portfolio templates include a visual `/login` form that checks credentials in client-side JavaScript or local storage. In a production engineering environment, this constitutes a serious anti-pattern:
1. **Zero Security**: Client-side authentication can be bypassed simply by inspecting browser source code or modifying local variables in DevTools.
2. **False Sense of Protection**: Anyone can view administrative routes if access is not verified on a protected backend.
3. **Data Immutability**: Static frontend sites hosted on CDNs (Vercel, Netlify, GitHub Pages) cannot persist write operations to filesystem data without an authenticated database or API layer.

To preserve strict engineering integrity, this portfolio separates static read architecture from administrative write architecture.

---

## 2. Recommended Infrastructure & Stack

To upgrade this portfolio into a full dynamic CMS, choose one of the following two standard backend paths:

### Option A: Serverless Backend-as-a-Service (Recommended for Speed & Cost)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with built-in Auth, Row Level Security, and Storage).
- **Authentication**: JWT-based session tokens with HTTP-only cookies, MFA (Multi-Factor Authentication) support.
- **Access Control**: PostgreSQL Row-Level Security (RLS) policies allowing `SELECT` publicly, but restricting `INSERT`, `UPDATE`, and `DELETE` strictly to authenticated admin users (`auth.uid() = admin_id`).
- **File Storage**: Supabase Storage buckets for uploading project images and CV PDFs with image transformations.
- **Estimated Running Cost**: Free tier (sufficient for single-user portfolio CMS).

### Option B: Custom Headless API & Node Backend
- **Framework**: Express / Fastify / NestJS with TypeScript.
- **Database**: PostgreSQL hosted on Neon, PlanetScale, or Supabase.
- **ORM**: Prisma or Drizzle ORM.
- **Authentication**: Lucia Auth or Auth0 with secure session management.
- **Estimated Running Cost**: $5–$15/month for managed database & container hosting (e.g. Render, Railway).

---

## 3. Proposed Administrative Modules

1. **Dashboard Overview**:
   - Total published projects, active skills, verified certifications.
   - Recent contact form inquiries with read/unread statuses.
   - Quick links to toggle site feature flags (`showTestimonials`, `showCertifications`).
2. **Project Manager**:
   - List, search, filter, and re-order projects (drag-and-drop priority).
   - Rich editor for project title, full description, category, and technologies.
   - Image uploader for project screenshots with WebP conversion.
   - Live preview toggle (`featured`, `published`).
3. **Skills & Capabilities Manager**:
   - Grouping by discipline (`Frontend`, `Languages`, `Design`, etc.).
   - Re-ordering and optional proficiency percentage sliders.
4. **Experience & Education Timeline**:
   - Timeline item editor (Company, Job Title, Dates, Bullet points for responsibilities and achievements).
5. **Services & Offerings Manager**:
   - Title, icon selector, deliverables checklist, and `confirmed` toggle.
6. **Inquiry Inbox (Contact Submissions)**:
   - Chronological table of inquiries submitted through the contact endpoint.
   - Ability to mark messages as replied, archive, or export to CSV.
7. **Resume Manager**:
   - Direct PDF drag-and-drop replacement.
   - Automatic version timestamp generation.

---

## 4. Data Migration Plan (`src/data/` -> Database)

The current portfolio architecture organizes content into strongly-typed TypeScript objects (`src/types/index.ts`). Migrating to a database requires only three steps:

### Step 1: SQL Schema Generation
Run a migration script to create tables matching the TypeScript types:
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  thumbnail_url TEXT NOT NULL,
  demo_url TEXT,
  source_url TEXT,
  featured BOOLEAN DEFAULT false,
  role TEXT NOT NULL,
  challenges TEXT,
  outcomes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Step 2: Seed Script
Create a simple Node CLI script (`scripts/seed-database.ts`) that imports `projectsData`, `skillsData`, and `experienceData` from `src/data/` and performs an upsert into PostgreSQL.

### Step 3: Swapping Data Layer
Because our React components receive typed data, we can replace the static imports with a React Query or SWR hook:
```typescript
// src/hooks/useProjects.ts
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as Project[];
    },
    initialData: projectsData, // Graceful fallback
  });
}
```

---

## 5. Security Architecture & Best Practices

- **Never Expose Service Role Keys**: Client applications must only possess the public anonymous key (`VITE_SUPABASE_ANON_KEY`). The secret service-role key must never touch frontend code or repository commits.
- **Strict Row-Level Security (RLS)**:
  ```sql
  -- Anyone can read published projects
  CREATE POLICY "Public projects are readable by all" ON projects
    FOR SELECT USING (true);

  -- Only authenticated admins can write
  CREATE POLICY "Admins can manage projects" ON projects
    FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
  ```
- **Rate Limiting**: Apply Redis or Cloudflare Turnstile to prevent spam attacks on contact forms and login endpoints.
- **Audit Log**: Keep an immutable log table recording timestamp, user ID, IP address, and change summary for all administrative mutations.

---

## 6. Implementation Phasing & Milestones

- **Phase 1**: Set up Supabase project, initialize tables, enable RLS policies.
- **Phase 2**: Run migration script seeding initial data from `src/data/`.
- **Phase 3**: Build protected route `/admin` with Supabase Auth (Magic Link or Email + Password + MFA).
- **Phase 4**: Develop Project and Skills management forms with React Hook Form + Zod.
- **Phase 5**: Implement S3 / Supabase storage bucket image uploading.
- **Phase 6**: Connect contact form submissions directly to a `contact_inquiries` database table with webhook email notifications.

