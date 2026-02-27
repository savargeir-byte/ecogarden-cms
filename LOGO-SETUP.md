# 🎨 Logo Uppsetning - EcoGarden

## Hvað þarf að gera:

### 1️⃣ Afrita logo skrána

Opnaðu **PowerShell** eða **Command Prompt** og keyrðu:

```powershell
# Afrita logo úr Google Drive í public möppu
Copy-Item "G:\My Drive\ECO-GARDEN\logo.png" "C:\GitHub\EcoCarden\EcoGardenWEB\ecogarden-cms\public\logo.png"
```

**EÐA** ef logo-ið er SVG:

```powershell
Copy-Item "G:\My Drive\ECO-GARDEN\logo.svg" "C:\GitHub\EcoCarden\EcoGardenWEB\ecogarden-cms\public\logo.svg"
```

**EÐA** gera það handvirkt:

1. Opnaðu `G:\My Drive\ECO-GARDEN\`
2. Finndu `logo` skrána
3. Afritaðu hana
4. Opnaðu `C:\GitHub\EcoCarden\EcoGardenWEB\ecogarden-cms\public\`
5. Límdu sem `logo.png` (eða `.svg`)

---

### 2️⃣ Athuga skráarheiti

Ef logo-ið heitir eitthvað annað en `logo.png`, þá:

**Valkostur A:** Endurnefna skrána í `logo.png`

**Valkostur B:** Breyta kóðanum:

Opnaðu `components/Navbar.tsx` og breyttu línu 50:

```tsx
// Frá:
src="/logo.png"

// Í (dæmi):
src="/ecogarden-logo.png"
```

---

### 3️⃣ Ef logo er SVG (mælt með!)

SVG er betri fyrir logo vegna þess að það er skalanleg án þess að missa gæði.

Ef þú ert með `.svg` skrá:

1. Afritaðu sem `logo.svg`
2. Uppfærðu `components/Navbar.tsx` línu 50:

```tsx
src="/logo.svg"
```

---

### 4️⃣ Stilla stærð

Ef logo-ið er of stórt/lítið, breyttu stærðinni í `components/Navbar.tsx` línu 50-51:

```tsx
width={scrolled ? 140 : 180}    // Breyttu þessum tölum
height={scrolled ? 40 : 50}     // Breyttu þessum tölum
```

**Dæmi fyrir breiðara logo:**
```tsx
width={scrolled ? 160 : 220}
height={scrolled ? 50 : 65}
```

---

### 5️⃣ Test-a

Keyrðu development server:

```bash
npm run dev
```

Opnaðu http://localhost:3000 og sjáðu nýja logo-ið!

---

## 🎨 Mismunandi stærðir fyrir mismunandi tæki

Ef þú vilt sérstakar útgáfur fyrir desktop/mobile:

```tsx
{/* Desktop logo */}
<div className="hidden md:block">
  <Image
    src="/logo-desktop.png"
    alt="EcoGarden"
    width={180}
    height={50}
    priority
  />
</div>

{/* Mobile logo */}
<div className="block md:hidden">
  <Image
    src="/logo-mobile.png"
    alt="EcoGarden"
    width={120}
    height={35}
    priority
  />
</div>
```

---

## ❓ Algengar spurningar

### Logo birtist ekki?

1. **Athugaðu skráarnafnið** - Verður að vera NÁKVÆMLEGA `logo.png` (ekki `logo.PNG` eða `Logo.png`)
2. **Endurræstu dev server** - `Ctrl+C` og svo `npm run dev` aftur
3. **Hard refresh í browser** - `Ctrl+Shift+R` (Windows) eða `Cmd+Shift+R` (Mac)

### Logo er of stórt/lítið?

Breyttu `width` og `height` gildum í Navbar.tsx

### Logo er með rangan lit bakgrunn?

- PNG með gegnsæjum bakgrunni virkar best
- Eða breyttu `className` til að bæta við bakgrunnslit

---

## 🚀 Næstu skref

1. Afritaðu logo skrána í `/public/`
2. Keyrðu `npm run dev`
3. Opnaðu localhost:3000
4. Fínstilltu stærð ef þörf krefur

✅ **Kóðinn er nú þegar uppfærður í Navbar.tsx!**
