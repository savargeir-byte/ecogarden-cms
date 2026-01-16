# CMS Setup Guide

## 1. Supabase SQL Setup

Farðu í Supabase Dashboard → SQL Editor og keyrðu allt í `supabase-setup.sql` skránni.

Þetta býr til:
- `profiles` töflu fyrir notendur og role
- `pages` töflu fyrir content
- RLS policies
- Auto-trigger sem býr til profile þegar notandi skráir sig

## 2. Búa til fyrsta admin notandann

### Valkostur A: Handvirkt í Supabase
1. Farðu í Supabase → Authentication → Users
2. "Add user" → sláðu inn þinn email
3. Farðu í SQL Editor og keyrðu:

```sql
insert into profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'ÞITT_EMAIL@example.com'
on conflict (id) do update set role = 'admin';
```

### Valkostur B: Í gegnum Table Editor
1. Farðu í Table Editor → profiles
2. Insert row:
   - `id`: (copy úr auth.users)
   - `email`: þitt email
   - `role`: admin

## 3. Environment Variables

Í `.env.local` (local development):
```
NEXT_PUBLIC_SUPABASE_URL=https://irqhaetqxulvylwolhqe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_lqNK4M4NsxHhqRQA0_GPAQ_r7UsBhcp
SUPABASE_SERVICE_ROLE_KEY=eyJ... (frá Supabase Settings → API)
```

⚠️ **ALDREI committa .env.local**

## 4. Storage Setup (fyrir myndir)

1. Supabase → Storage → "New bucket"
2. Name: `images`
3. Public bucket: ✅
4. Búið til!

## 5. Keyra verkefnið

```bash
cd cms-site
npm run dev
```

Opnaðu http://localhost:3000

## 6. Fyrsta login

1. Farðu á `/login`
2. Sláðu inn þitt email (það sem þú gerðir að admin)
3. Athugaðu email fyrir magic link
4. Smelltu á linkinn
5. Farðu á `/admin`

## Núna virkar:
✅ Authentication með magic link
✅ Admin dashboard
✅ Breyta pages
✅ Bjóða nýjum notendum (admin only)
✅ Role-based access

## Næstu skref (optional):
- Deploy á Vercel
- Setja upp custom domain
- Bæta við fleiri features (media gallery, etc.)
