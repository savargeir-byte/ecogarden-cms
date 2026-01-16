# 🚀 EcoGarden CMS - Complete Deployment Guide

**Last Updated:** January 15, 2026  
**Version:** 2.0 (WYSIWYG Overlay Mode)

---

## ✅ Pre-Deployment Checklist

### 1. Database Setup (Supabase)

Run these SQL files **in order** in Supabase SQL Editor:

1. **Main Schema:** `complete-cms-setup.sql`

   - Creates: pages, sections, products, analytics, section_versions
   - Sets up: RLS policies, default home page

2. **Additional Features:** `additional-features.sql`

   - Creates: media table, locale support

3. **Audit Trail:** `audit-trail-setup.sql`
   - Creates: audit_logs table with indexes

**Verify all tables exist:**

- [ ] `pages`
- [ ] `sections`
- [ ] `products`
- [ ] `analytics`
- [ ] `section_versions`
- [ ] `media`
- [ ] `audit_logs`

**Storage Setup:**

- [ ] Create bucket named `media` in Supabase Storage
- [ ] Set bucket to **Public** access
- [ ] Test upload from admin panel

### 2. Environment Variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://irqhaetqxulvylwolhqe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find keys:**

1. Supabase Dashboard → Project Settings → API
2. Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Local Testing

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

**Test checklist:**

- [ ] Visit `http://localhost:3000` - homepage loads
- [ ] Visit `http://localhost:3000/admin` - CMS loads
- [ ] Hover over section - green border appears
- [ ] Click Edit - modal opens with form
- [ ] Make changes - click Save
- [ ] Add new section - floating menu works
- [ ] Upload image - media library works
- [ ] Check `/admin/audit` - logs show
- [ ] Test build: `npm run build`

---

## 🌐 Vercel Deployment

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for production - WYSIWYG mode complete"
git push origin master
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select: `savargeir-byte/EcoGarden_DEV`
5. Framework: **Next.js** (auto-detected)
6. Root Directory: `./` (default)
7. Click **"Deploy"** ⚠️ _Will fail - need env vars first_

### Step 3: Configure Environment Variables

**In Vercel dashboard:**

1. Go to: Project → **Settings** → **Environment Variables**
2. Add these 3 variables:

| Key                             | Value                                      | Environments                            |
| ------------------------------- | ------------------------------------------ | --------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://irqhaetqxulvylwolhqe.supabase.co` | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key                              | ✅ Production ✅ Preview ✅ Development |
| `SUPABASE_SERVICE_ROLE_KEY`     | Your service role key                      | ✅ Production ✅ Preview ✅ Development |

3. Click **"Save"**
4. Go to: **Deployments** tab
5. Click **"Redeploy"** on latest deployment
6. Wait 2-3 minutes for build

### Step 4: Verify Deployment

Visit your Vercel URL (e.g., `https://ecogarden-cms.vercel.app`)

- [ ] Homepage loads with sections
- [ ] Go to `/admin` - WYSIWYG editor loads
- [ ] Hover over section - green border appears
- [ ] Click Edit - modal opens
- [ ] Make a change - save works
- [ ] Add section - floating menu works
- [ ] Upload image - media library works
- [ ] Check `/admin/audit` - logs appear
- [ ] Click Publish - page status changes

### Step 5: Custom Domain (Optional)

1. Vercel → Project Settings → **Domains**
2. Add your domain (e.g., `ecogarden.is`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

---

## 🔒 Security Checklist

- [ ] Service role key only in environment variables
- [ ] RLS policies enabled on ALL tables
- [ ] Media bucket has proper access policies
- [ ] `.env.local` in `.gitignore`
- [ ] No sensitive data in Git history
- [ ] Admin routes require authentication
- [ ] Audit logs tracking all changes

---

## 🐛 Troubleshooting

### Build fails: "Module not found"

**Error:** `Can't resolve '@/lib/...'`

**Fix:** Verify `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Database connection fails

**Error:** `Failed to fetch from Supabase`

**Fixes:**

1. Check environment variables in Vercel
2. Verify Supabase project is active (not paused)
3. Test: `curl https://irqhaetqxulvylwolhqe.supabase.co`
4. Check RLS policies allow reads

### Images won't upload

**Error:** `403 Forbidden`

**Fixes:**

1. Supabase → Storage → `media` bucket
2. Set to **Public**
3. Add policies:

```sql
-- Allow public SELECT
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Allow authenticated INSERT
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');
```

### Admin page blank

**Error:** White screen at `/admin`

**Fixes:**

1. Check browser console for errors
2. Verify `pages` table has home page
3. Run `sample-home-page.sql`
4. Check all tables exist

### Audit logs not showing

**Error:** `/admin/audit` empty

**Fixes:**

1. Run `audit-trail-setup.sql`
2. Verify `audit_logs` table exists
3. Check RLS policy allows authenticated reads
4. Test by editing - should create log entry

---

## 📊 Post-Deployment Monitoring

### 1. Vercel Analytics

- Dashboard → **Analytics** tab
- Monitor: page views, performance, Web Vitals
- Check for errors in real-time

### 2. Supabase Monitoring

- Dashboard → **Logs** → API requests
- Monitor slow queries
- Check storage usage
- Review authentication logs

### 3. Audit Trail

- Visit `/admin/audit` weekly
- Review all changes
- Look for suspicious activity
- Export logs if needed

---

## ⚡ Performance Optimization

### Enable Image Optimization

Update `next.config.ts`:

```typescript
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "irqhaetqxulvylwolhqe.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};
```

### Enable ISR (Incremental Static Regeneration)

```typescript
// In page.tsx
export const revalidate = 60; // Revalidate every 60 seconds
```

### Additional Optimizations

- [ ] Compress images before upload
- [ ] Use Next.js `<Image>` component
- [ ] Enable Vercel Edge Config
- [ ] Set up CDN for Supabase Storage
- [ ] Add caching headers
- [ ] Minimize bundle size

---

## 🎉 Success! You're Live!

**Your CMS is deployed at:**

- 🌐 **Public Site:** `https://ecogarden-cms.vercel.app`
- 🔐 **Admin Panel:** `https://ecogarden-cms.vercel.app/admin`
- 📊 **Analytics:** `https://ecogarden-cms.vercel.app/admin/analytics`
- 📋 **Audit Logs:** `https://ecogarden-cms.vercel.app/admin/audit`

### Next Steps

**1. Create Content**

- Add sections at `/admin`
- Upload products
- Add media to library
- Create additional pages

**2. Team Management**

- Visit `/admin/users`
- Create accounts for team members
- Assign roles (admin, editor, viewer)

**3. Regular Maintenance**

- Check analytics weekly
- Review audit logs
- Update content regularly
- Backup database monthly
- Monitor performance

---

## 📞 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Repo](https://github.com/savargeir-byte/EcoGarden_DEV)

---

## 🆘 Need Help?

**Common questions:**

- How to add users? → `/admin/users`
- How to see changes? → `/admin/audit`
- How to revert? → Use section_versions table
- How to add page? → Create in Supabase `pages` table

**Support:**

- Check documentation files in repo
- Review Supabase logs
- Check Vercel deployment logs
- Test locally first with `npm run dev`

---

**Deployed:** January 15, 2026  
**CMS Version:** 2.0  
**Mode:** WYSIWYG Overlay Editor
