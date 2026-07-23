-- Ksemya Estates — Supabase Schema
-- Run this in Supabase SQL Editor once your project exists (tomorrow).
-- Includes the is_featured column needed for the homepage carousel.

create extension if not exists "uuid-ossp";

-- ========== PROPERTIES ==========
create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  type text not null check (type in ('Coffee Plantation', 'Agricultural Land', 'Farm Land', 'Layout Plot')),
  price numeric,
  area text,
  location text,
  district text default '',
  lat numeric,
  lng numeric,
  status text not null default 'active' check (status in ('active', 'on-hold', 'sold')),
  youtube_url text,
  is_featured boolean not null default false,
  -- Optional extra details — all nullable, admin fills in only what's relevant
  survey_number text,
  khata_type text check (khata_type is null or khata_type in ('A', 'B')),
  facing text,
  road_width text,
  nearest_landmark text,
  price_negotiable boolean not null default false,
  owner_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ========== PROPERTY IMAGES ==========
create table if not exists property_images (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  image_url text not null,
  r2_key text,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ========== ENQUIRIES ==========
create table if not exists enquiries (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references properties(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  message text,
  created_at timestamptz not null default now()
);

-- ========== SITE SETTINGS ==========
-- Single-row table holding editable business profile info shown on the
-- public site (name, tagline, contact details, about us text). Logo is
-- intentionally not stored here — it stays a fixed file in /public.
create table if not exists site_settings (
  id boolean primary key default true check (id),
  business_name text not null default 'Ksemya Estates',
  tagline text not null default 'Where Land Meets Opportunity',
  email text not null default 'ksemyaestates@gmail.com',
  phone text not null default '918660727074',
  address text not null default '36, 1106, L&T Raintree Boulevard, Bellary Road, Hebbal, Bengaluru, Karnataka – 560092, India',
  about_us text not null default '',
  updated_at timestamptz not null default now()
);

insert into site_settings (id) values (true)
  on conflict (id) do nothing;

update site_settings set about_us = $about$
Since 2004, Ksemya Estates has worked as land developers, sellers, buyers, and aggregators — building a business rooted in the belief that land should be dealt with honestly, and understood firsthand before it's ever offered to a buyer.

We work across Karnataka's hill country, dealing directly in agricultural land, coffee plantations, and farm lands, with no layers of brokers in between. Beyond listings, we also handle layout and development work and turnkey housing construction projects, A to Z — from acquiring the right piece of land to handing over a finished home.

Our approach stays close to nature and grounded in development — respecting the land we sell while helping it grow into something more, whether that's a productive plantation, a well-planned layout, or a finished home. Every listing on this site has been personally visited — we know the soil, the water source, the access road, and the paperwork history of each property we list, not just what's written on a brochure.

Two decades on, that same hands-on, direct approach is still how we work — for every buyer, seller, and landowner we partner with.
$about$
where id = true and (about_us is null or about_us = '');

-- ========== ROW LEVEL SECURITY ==========
alter table properties enable row level security;
alter table property_images enable row level security;
alter table enquiries enable row level security;
alter table site_settings enable row level security;

-- Properties: public can read, only the authenticated owner can write
create policy "Public can view properties"
  on properties for select
  using (true);

create policy "Owner can insert properties"
  on properties for insert
  with check (auth.uid() is not null);

create policy "Owner can update properties"
  on properties for update
  using (auth.uid() is not null);

create policy "Owner can delete properties"
  on properties for delete
  using (auth.uid() is not null);

-- Property images: public can read, only owner can write
create policy "Public can view property images"
  on property_images for select
  using (true);

create policy "Owner can manage property images"
  on property_images for all
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Enquiries: anyone (including anonymous) can insert, only owner can read
create policy "Anyone can submit an enquiry"
  on enquiries for insert
  with check (true);

create policy "Owner can view enquiries"
  on enquiries for select
  using (auth.uid() is not null);

-- Site settings: public can read (site displays it), only owner can update
create policy "Public can view site settings"
  on site_settings for select
  using (true);

create policy "Owner can update site settings"
  on site_settings for update
  using (auth.uid() is not null);

-- Keep updated_at fresh on edits
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger properties_updated_at
  before update on properties
  for each row execute function set_updated_at();

create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function set_updated_at();
