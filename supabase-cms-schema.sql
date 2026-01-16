-- USERS / ROLES
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('admin', 'editor')) default 'editor',
  created_at timestamp default now()
);

alter table profiles enable row level security;

create policy "Admins can manage profiles"
on profiles for all
using (auth.uid() = id);

-- PAGES
create table pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamp default now()
);

-- PAGE SECTIONS (CMS BLOCKS)
create table page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references pages on delete cascade,
  type text not null,
  content jsonb not null,
  position int,
  created_at timestamp default now()
);

-- VERSION HISTORY
create table page_versions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid,
  snapshot jsonb,
  created_at timestamp default now()
);

-- STORAGE (images)
-- use Supabase Storage UI → bucket: "media"
