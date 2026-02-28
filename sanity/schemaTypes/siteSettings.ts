import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Stillingar',
  type: 'document',
  fields: [
    // ── Almenn stillingar ──────────────────────────────────
    defineField({ name: 'siteName',       title: 'Heiti vefs',    type: 'string', initialValue: 'EcoGarden' }),
    defineField({ name: 'siteTagline_is', title: 'Slagorð (IS)',  type: 'string' }),
    defineField({ name: 'siteTagline_en', title: 'Slagorð (EN)',  type: 'string' }),

    // ── Um okkur hero ──────────────────────────────────────
    defineField({ name: 'aboutHeroTitle_is',    title: 'Um okkur — Hero titill (IS)',     type: 'string' }),
    defineField({ name: 'aboutHeroTitle_en',    title: 'Um okkur — Hero titill (EN)',     type: 'string' }),
    defineField({ name: 'aboutHeroSubtitle_is', title: 'Um okkur — Hero undirtitill (IS)', type: 'text', rows: 2 }),
    defineField({ name: 'aboutHeroSubtitle_en', title: 'Um okkur — Hero undirtitill (EN)', type: 'text', rows: 2 }),

    // ── Hafa samband hero ──────────────────────────────────
    defineField({ name: 'contactHeroTitle_is',    title: 'Hafa samband — Hero titill (IS)',     type: 'string' }),
    defineField({ name: 'contactHeroTitle_en',    title: 'Hafa samband — Hero titill (EN)',     type: 'string' }),
    defineField({ name: 'contactHeroSubtitle_is', title: 'Hafa samband — Hero undirtitill (IS)', type: 'text', rows: 2 }),
    defineField({ name: 'contactHeroSubtitle_en', title: 'Hafa samband — Hero undirtitill (EN)', type: 'text', rows: 2 }),

    // ── Samskiptaupplýsingar ───────────────────────────────
    defineField({ name: 'phone',           title: 'Símanúmer',          type: 'string' }),
    defineField({ name: 'email',           title: 'Netfang',            type: 'string' }),
    defineField({ name: 'address',         title: 'Heimilisfang',       type: 'string' }),
    defineField({ name: 'openingHours_is', title: 'Opnunartímar (IS)',  type: 'string' }),
    defineField({ name: 'openingHours_en', title: 'Opnunartímar (EN)',  type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'Stillingar' }),
  },
})
