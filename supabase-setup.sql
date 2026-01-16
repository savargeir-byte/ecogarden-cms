-- 1. Búa til profiles töflu fyrir notendur
create table if not exists profiles (
  id uuid references auth.users on delete cascade,
  email text,
  role text default 'editor',
  primary key (id)
);

-- 2. Row Level Security fyrir profiles
alter table profiles enable row level security;

-- 3. Aðeins admin getur séð og breytt profiles
create policy "Admins only"
on profiles
for all
using (role = 'admin');

-- 4. Búa til pages töflu
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamptz,
  locale text default 'is',
  seo jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- 5. Búa til sections töflu
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references pages(id) on delete cascade not null,
  type text not null, -- hero | features | text | cta | image | banner | etc.
  content jsonb not null default '{}'::jsonb,
  position int not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Index fyrir betri performance
create index if not exists sections_page_id_idx on sections(page_id);
create index if not exists sections_position_idx on sections(page_id, position);

-- 7. RLS fyrir pages - allir geta lesið published, editors geta breytt
alter table pages enable row level security;

create policy "Anyone can read published pages"
on pages
for select
using (status = 'published' or exists (
  select 1 from profiles
  where profiles.id = auth.uid()
  and profiles.role in ('editor', 'admin')
));

create policy "Editors can manage pages"
on pages
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('editor', 'admin')
  )
);

-- 8. RLS fyrir sections - följer page permissions
alter table sections enable row level security;

create policy "Anyone can read published sections"
on sections
for select
using (
  exists (
    select 1 from pages
    where pages.id = sections.page_id
    and (pages.status = 'published' or exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('editor', 'admin')
    ))
  )
);

create policy "Editors can manage sections"
on sections
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('editor', 'admin')
  )
);

-- 9. Setja inn test data
insert into pages (slug, title, locale, status)
values ('home', 'Velkomin', 'is', 'published')
on conflict (slug) do nothing;

-- 10. Búa til products töflu
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  image text,
  category text,
  price numeric(10,2),
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamptz,
  blocks jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 11. RLS fyrir products
alter table products enable row level security;

create policy "Anyone can read published products"
on products
for select
using (status = 'published' or exists (
  select 1 from profiles
  where profiles.id = auth.uid()
  and profiles.role in ('editor', 'admin')
));

create policy "Editors can manage products"
on products
for all
using (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role in ('editor', 'admin')
  )
);

-- 12. Búa til page_versions töflu fyrir version history
create table if not exists page_versions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references pages(id) on delete cascade,
  sections_snapshot jsonb,
  created_at timestamptz default now(),
  created_by uuid references profiles(id)
);

-- 13. Búa til page_views töflu fyrir analytics
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  slug text,
  user_agent text,
  created_at timestamptz default now()
);

-- 14. Búa til product_views töflu fyrir analytics
create table if not exists product_views (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  slug text,
  user_agent text,
  created_at timestamptz default now()
);

-- 15. Function til að búa til profile sjálfkrafa þegar notandi skráir sig
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor');
  return new;
end;
$$ language plpgsql security definer;

-- 16. Trigger sem keyrir þegar nýr notandi er búinn til
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 17. Storage bucket fyrir images (keyrðu þetta handvirkt í Supabase eða nota Storage UI)
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);

-- 18. Storage policy fyrir public read
-- create policy "Public read access"
-- on storage.objects for select
-- using ( bucket_id = 'media' );

-- 19. Storage policy fyrir authenticated upload
-- create policy "Authenticated users can upload"
-- on storage.objects for insert
-- with check ( bucket_id = 'media' and auth.role() = 'authenticated' );
