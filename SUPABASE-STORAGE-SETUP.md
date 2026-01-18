# Supabase Storage Setup fyrir CMS

## 1. Búa til Storage Bucket

Farðu á Supabase Dashboard → Storage → Create Bucket

### Bucket stillingar:
- **Bucket Name:** `media`
- **Public bucket:** ✅ (hakað við)
- **File size limit:** 5MB
- **Allowed MIME types:** `image/*`

## 2. Bucket Policies

Farðu á Storage → Policies → Create Policy fyrir "media" bucket

### Policy 1: Public Read Access
```sql
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');
```

### Policy 2: Authenticated Upload
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);
```

### Policy 3: Authenticated Delete
```sql
CREATE POLICY "Authenticated users can delete own files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media'
  AND auth.role() = 'authenticated'
);
```

## 3. Test Upload

1. Farðu á `/admin`
2. Veldu section til að breyta
3. Smelltu á "Edit" 
4. Veldu mynd frá tölvu (max 5MB)
5. Myndin uploaðast í Supabase Storage og URL kemur sjálfkrafa

## 4. Image URLs

Allar myndir fá public URL í forminu:
```
https://[project-ref].supabase.co/storage/v1/object/public/media/images/[filename]
```

## 5. Troubleshooting

### Ef upload virkar ekki:

1. **Athugaðu Supabase credentials í `.env.local`:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://irqhaetqxulvylwolhqe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Athugaðu bucket policies** - þær þurfa að vera virkar

3. **Athugaðu File size** - max 5MB

4. **Athugaðu File type** - aðeins image/* formats

5. **Console errors** - opnaðu browser console fyrir error messages

## 6. Features í Admin CMS

✅ **Image upload með drag & drop**
- Drag mynd inn í input field
- Preview sést strax
- Automatic compression (optional)

✅ **Multiple section support:**
- Hero background images
- ImageGrid item images  
- Product images
- Gallery images

✅ **Image management:**
- Preview current image
- Replace with new upload
- Delete old images
- Automatic cleanup

✅ **Rich text editor með myndum:**
- Paste image URL
- Embed external images
- Responsive images

## 7. Næstu skref

Ef þú vilt bæta við fleiri features:

1. **Image optimization:**
   - Install `sharp` package
   - Automatic resize on upload
   - WebP conversion

2. **Image library:**
   - Browse uploaded images
   - Search functionality
   - Reuse images across sections

3. **Drag & drop upload:**
   - Drop zone component
   - Multiple file upload
   - Progress bars

4. **CDN integration:**
   - Cloudflare/Cloudinary
   - Automatic image optimization
   - Global delivery
