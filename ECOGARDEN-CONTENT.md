# Eco Garden Content Guide

## 🪴 About Eco Garden

**Business Overview:**
Eco Garden sells environmentally friendly garden products for consumers and commercial clients, including eco-friendly pest control, fertilizers, seeds, and composting products.

**Key Suppliers:**
- EcoFective (pest control)
- VivaGreen (biological protection)
- Biolan (composting)
- DLF (grass seeds)

**Core Values:**
- ~30 years combined experience in garden product sales
- Focus on sustainable, eco-friendly solutions
- Service for both homeowners and commercial clients (golf courses, municipalities, farms)

---

## 📋 Content Structure

### Homepage (`slug: 'home'`)
Execute [sample-home-page.sql](sample-home-page.sql) to create:

1. **Hero Section**
   - Title: "Eco Garden – Vistvænar lausnir fyrir garð og ræktun"
   - Subtitle: "Hágæða garðvörur sem virka – fyrir heimili, bændur og græna drauma"

2. **Intro Text**
   - Description of eco-friendly products
   - Emphasis on quality and environmental respect

3. **Feature List** (3 cards)
   - Umhverfisvænar vörur
   - Fyrir heimili & atvinnu
   - Reynsla og þekking

4. **Image Gallery** (3 images)
   - Grass cultivation
   - Eco-friendly fertilizers
   - Healthy plants

5. **CTA**
   - Link to /products

---

## 🛍️ Product Categories

Execute [sample-products-ecogarden.sql](sample-products-ecogarden.sql) to create 5 sample products:

### 1. Fljótandi Áburðir (Liquid Fertilizers)
**Product: Grasamín**
- Fast-acting liquid fertilizer
- For grass, lawns, golf courses
- NPK 10-5-5
- Available in 1L, 5L, 10L

### 2. Varnarefni (Pest Control)
**Products: EcoFective Mosaeyðir, VivaGreen**
- Moss killer for decks and walkways
- Biological pest control
- 100% natural ingredients
- Safe for children and pets

### 3. Moltugerðarvörur (Composting)
**Product: Biolan Moltugerðarbox**
- Home composting bin
- 200L or 400L capacity
- Converts kitchen waste to compost
- 4-6 month processing time

### 4. Fræ (Seeds)
**Product: DLF Grasfræ**
- Professional grass seed blends
- For golf courses and sports fields
- Icelandic weather resistant
- 15kg, 25kg packages

### 5. Viðbótarvörur
- Palla- og götustígahreinsiefni (deck cleaners)
- Umhverfisvæn sápa og hreinsiefni
- Sérvörur fyrir stórnotendur

---

## 🎨 Design Philosophy

**Based on standard-cow-mat (Teemore) structure:**
1. Hero (product image + headline)
2. Intro/overview text
3. Visual + text split (benefits)
4. Feature blocks
5. Specs/details
6. Supporting images
7. CTA

**But with modern improvements:**
- More whitespace (py-24, py-28)
- Stronger typography (text-5xl, font-semibold)
- Better mobile experience (responsive grids)
- CMS editable (every section from admin)

---

## 📸 Images

### Current Approach
Using Unsplash as placeholder:
- Professional garden/agriculture photos
- Green, natural aesthetic
- High quality, properly sized

### Future Enhancement
Upload real Eco Garden images to Supabase Storage:
1. Go to Supabase Dashboard → Storage
2. Create "images" bucket (public)
3. Upload product photos, hero images
4. Update blocks with `/images/filename.jpg` URLs

**Recommended Images to Capture:**
- Product packaging (fertilizers, seeds)
- Application examples (spraying, sowing)
- Before/after comparisons
- Commercial installations (golf courses)
- Customer testimonials with photos

---

## 🔧 CMS Editing

### How to Edit Homepage
1. Login to `/admin`
2. Click "Pages" in sidebar
3. Find "home" page
4. Edit blocks:
   - Update text in Hero
   - Change feature descriptions
   - Upload new gallery images
   - Adjust CTA link

### How to Add Products
1. Go to `/admin/products`
2. Click "New Product"
3. Fill in:
   - Title (e.g., "Grasamín")
   - Category (e.g., "Áburður")
   - Slug (auto-generated)
4. Add blocks using block editor:
   - Hero with product image
   - Text description
   - FeatureList with benefits
   - SpecsTable with technical details
   - CTA to contact page

---

## 📊 Content Strategy

### For Consumers (Heimilisgörðum)
- Simple language
- Focus on ease of use
- Safety for children/pets
- Visible results
- Small packaging sizes

### For Commercial (Stórnotendur)
- Technical specifications
- Bulk pricing
- Professional results
- Case studies (golf courses, municipalities)
- Large format packaging

### SEO Keywords (Icelandic)
- vistvænar garðvörur
- umhverfisvænir áburðir
- lífræn varnarefni
- grasfræ fyrir golfvelli
- moltugerðarbox
- mosaeyðir
- eco garden ísland

---

## 🚀 Next Steps

1. **Execute SQL files:**
   - [sample-home-page.sql](sample-home-page.sql)
   - [sample-products-ecogarden.sql](sample-products-ecogarden.sql)

2. **Upload real images:**
   - Create Supabase Storage bucket
   - Upload product photos
   - Update image URLs in blocks

3. **Expand product catalog:**
   - Add more EcoFective products
   - Create VivaGreen product pages
   - Add DLF grass varieties
   - Create bundle offers

4. **Create additional pages:**
   - About Us (`slug: 'about'`)
   - Contact (`slug: 'contact'`)
   - FAQ (`slug: 'faq'`)
   - Commercial Services (`slug: 'commercial'`)

5. **Test and refine:**
   - Visit `http://localhost:3000`
   - Check mobile responsiveness
   - Verify all links work
   - Test admin editing workflow
