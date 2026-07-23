# Ksemya Estates — Where Land Meets Opportunity

Property listing website for **Ksemya Estates** — dealing in agricultural
land, coffee plantations, and farm lands across Karnataka's hill country, with layout,
development, and turnkey housing construction as additional services.
Logo is already in `public/logo.png` and used in the site header.

## What's Built Today (No Accounts Needed)

**Public Website**
- Homepage — hero, featured carousel, recently listed, trust section
- All Properties — grid with type/location filters and price sort
- Property Detail — gallery, YouTube embed, enquiry form, WhatsApp button
- About Us
- Contact Us — general enquiry form + WhatsApp button

**Admin Dashboard**
- Login (Supabase Auth wired, needs real project tomorrow)
- Dashboard home — stats (total properties, featured count, enquiries)
- Property list — inline featured toggle, edit, delete
- Add/Edit Property form — all fields, photo upload + compression, YouTube URL field, featured toggle
- Enquiries list — shows property-specific vs general enquiries

**Backend Code (ready, just needs credentials tomorrow)**
- `sql/schema.sql` — full schema incl. `is_featured` column + RLS policies
- `lib/supabaseClient.js` — Supabase client
- `lib/r2Client.js` — Cloudflare R2 upload/delete
- `app/api/upload-property-image/route.js` — photo upload endpoint
- `lib/whatsapp.js` — WhatsApp deep-link builder

Every page tries to fetch real data from Supabase first, and falls back
to placeholder sample properties (`lib/sampleData.js`) so you can browse
the entire site today even without any accounts connected. Once you add
real credentials tomorrow, real data takes over automatically — no code
changes needed.

---

## How to Run This Today (Preview with Sample Data)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll see the site fully working with the
3 placeholder properties. Admin login won't work yet (needs Supabase),
but every public page is browsable.

---

## What You Do Tomorrow (Manual Steps)

1. **Create Supabase project** → SQL Editor → paste and run `sql/schema.sql`
2. **Create Cloudflare R2 bucket** → generate access keys → enable public access
3. **Copy `.env.example` to `.env.local`** → fill in all values (Supabase URL/keys, R2 keys, owner's WhatsApp number and email)
4. **Create the owner's login** in Supabase Auth (Authentication → Users → Add User) using `ksemyaestates@gmail.com` and the agreed admin password
5. **Create the owner's YouTube channel** (for unlisted property videos)
6. Restart `npm run dev` — the site now runs on real data instead of samples

Once that's done we'll move to Netlify deployment (Phase 6 in the plan doc).

---

## Design Notes

Palette and type reflect a "nature & development" identity (deep forest
green, earthy soil brown, soft off-white, warm gold accent; Fraunces for
display, Work Sans for body) — defined in `tailwind.config.js`. Replace the
sample property photos with real listings before launch.
