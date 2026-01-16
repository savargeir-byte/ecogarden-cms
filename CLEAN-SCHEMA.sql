-- ============================================
-- 🏗️ ECOGARDEN CMS - CLEAN SCHEMA
-- Single Source of Truth
-- ============================================

-- ============================================
-- 1️⃣ CORE TABLES
-- ============================================

-- PAGES
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  status text check (status in ('draft','published')) default 'draft',
  updated_at timestamptz default now()
);

-- SECTIONS (single source of truth for content)
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references pages(id) on delete cascade,
  type text not null, -- hero | text | products | cta | features | etc.
  content jsonb not null,
  position int not null,
  created_at timestamptz default now()
);

-- PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image text,
  category text,
  published boolean default true
);

-- ============================================
-- 2️⃣ USER MANAGEMENT (Optional - for admin)
-- ============================================

-- PROFILES (if you need role-based admin access)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'editor' -- 'admin' or 'editor'
);

-- ============================================
-- 3️⃣ INDEXES (Performance)
-- ============================================

create index if not exists sections_page_id_idx on sections(page_id);
create index if not exists sections_position_idx on sections(page_id, position);

-- ============================================
-- 4️⃣ ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
alter table pages enable row level security;
alter table sections enable row level security;
alter table products enable row level security;

-- PAGES: Public can read published, authenticated can edit
create policy "Anyone can read published pages"
on pages for select
using (status = 'published' or auth.role() = 'authenticated');

create policy "Authenticated users can manage pages"
on pages for all
using (auth.role() = 'authenticated');

-- SECTIONS: Follow page permissions
create policy "Anyone can read published sections"
on sections for select
using (
  exists (
    select 1 from pages
    where pages.id = sections.page_id
    and (pages.status = 'published' or auth.role() = 'authenticated')
  )
);

create policy "Authenticated users can manage sections"
on sections for all
using (auth.role() = 'authenticated');

-- PRODUCTS: Public can read published
create policy "Anyone can read published products"
on products for select
using (published = true or auth.role() = 'authenticated');

create policy "Authenticated users can manage products"
on products for all
using (auth.role() = 'authenticated');

-- ============================================
-- 5️⃣ SAMPLE DATA (Optional)
-- ============================================

-- Insert home page
insert into pages (slug, title, status)
values ('home', 'Velkomin', 'draft')
on conflict (slug) do nothing;

-- ============================================
-- 6️⃣ STORAGE BUCKET (Run in Storage UI)
-- ============================================

-- Create 'media' bucket manually in Supabase Storage UI
-- Make it PUBLIC
-- Or run:
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);

-- ============================================
-- 7️⃣ FUNCTIONS (Optional - Auto-create profiles)
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- ✅ DONE!
-- ============================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Create 'media' bucket in Storage
-- 3. Add your first admin user
-- 4. Start building!
