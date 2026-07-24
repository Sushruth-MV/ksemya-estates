# Ksemya Estates — Where Land Meets Opportunity

Property listing website for **Ksemya Estates** — dealing in agricultural
land, coffee plantations, and farm lands across Karnataka's hill country,
with layout, development, and turnkey housing construction as additional
services.

Live stack: **Next.js 14 (App Router)** + **Supabase** (database + auth) +
**Cloudflare R2** (photo storage), deployed on **Netlify**.

---

## Tech Stack

| Layer            | Choice                                            |
| ---------------- | -------------------------------------------------- |
| Framework        | Next.js 14, App Router, Server + Client Components |
| Styling          | Tailwind CSS, custom dark theme in `tailwind.config.js` |
| Fonts            | Playfair Display (headings), Montserrat (body) — `next/font/google` |
| Database + Auth  | Supabase (Postgres, Row Level Security, Auth)      |
| Photo storage    | Cloudflare R2 (S3-compatible), via `@aws-sdk/client-s3` |
| Image compression| `browser-image-compression` (client-side, before upload) |
| Hosting / CI-CD  | Netlify, connected to GitHub for auto-deploy on push |

---

## How Data Loading Works

Every public-facing data function (`lib/data.js`, `lib/settings.js`) tries
Supabase first and silently falls back to hardcoded sample data
(`lib/sampleData.js`) if the query fails or returns nothing. This means:

- The site is always browsable, even if Supabase has a hiccup.
- A brand-new deployment with an empty `properties` table will show sample
  listings until real ones are added via the admin panel — this is
  expected, not a bug.

---

## Project Structure

```
app/
  page.jsx                   Homepage
  properties/                Public property listing + detail pages
  about/, contact/           Static content pages
  admin/                     Owner dashboard (login, properties, enquiries, settings)
  api/
    upload-property-image/   POST — compress-then-upload a photo to R2 + save its URL
    delete-property-image/   POST — delete a photo from R2 + its DB row
components/                  Shared UI (Header, Footer, PropertyForm, EnquiryForm, ...)
lib/
  supabaseClient.js          Public (anon-key) Supabase client — safe for client components
  supabaseAdmin.js           Service-role Supabase client — server-only (API routes)
  r2Client.js                R2 upload/delete helpers
  data.js                    Property queries with sample-data fallback
  settings.js                Site settings (business name, contact info, About Us) with fallback
  whatsapp.js                wa.me deep-link builder
sql/schema.sql                Full Postgres schema + RLS policies — run once in Supabase SQL Editor
```

---

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without a configured `.env.local`, the site
runs on sample data and admin login won't work; every public page is still
browsable.

Other scripts:

```bash
npm run build   # production build
npm run start   # run a production build locally
npm run lint    # ESLint (next/core-web-vitals rules)
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in real values. **Never commit
`.env.local`** — it's git-ignored on purpose. In production (Netlify), the
same names are set under Project configuration → Environment variables
instead of a file.

| Variable | Purpose | Where to get it |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (anon/publishable) key — safe for the browser, restricted by RLS | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Full-access key — **server-only**, used by `lib/supabaseAdmin.js` in API routes to manage photos | Supabase → Settings → API |
| `R2_ACCOUNT_ID` | Cloudflare account ID | Cloudflare dashboard → R2 → Overview |
| `R2_ACCESS_KEY_ID` | R2 API token access key | Cloudflare → R2 → Manage API Tokens |
| `R2_SECRET_ACCESS_KEY` | R2 API token secret | Cloudflare → R2 → Manage API Tokens |
| `R2_BUCKET_NAME` | R2 bucket name | Cloudflare → R2 → your bucket |
| `R2_PUBLIC_URL_BASE` | Public base URL for uploaded photos | Cloudflare → R2 → bucket → Settings → Public Access |
| `NEXT_PUBLIC_OWNER_WHATSAPP` | Fallback WhatsApp number for enquiry buttons (before Admin → Settings has a value) | Business contact number |
| `NEXT_PUBLIC_OWNER_EMAIL` | Fallback contact email | Business email |

Business-facing details (name, tagline, phone, email, address, About Us
text) are editable live from **Admin → Settings** once Supabase is
connected — they don't require touching environment variables or
redeploying.

---

## Database Setup

Run `sql/schema.sql` once in the Supabase SQL Editor. It creates:

- `properties` — listings, including optional fields (survey number, khata
  type, facing, road width, nearest landmark, price negotiable)
- `property_images` — one row per photo, linked to a property
- `enquiries` — messages submitted via the public enquiry forms
- `site_settings` — singleton row for business info shown across the site

...plus Row Level Security policies (public read on listings/settings,
owner-only write, anyone can submit an enquiry) and an `updated_at`
trigger.

The admin login user is created separately in Supabase → Authentication →
Users, not via this schema.

---

## Deployment

Connected to Netlify via GitHub — pushing to `main` triggers an automatic
build and deploy (`netlify.toml` + `@netlify/plugin-nextjs`). All ten
environment variables above must be set in Netlify's site settings for the
live deployment to use real data instead of the sample-data fallback.
