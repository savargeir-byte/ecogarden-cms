import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Stillingar',
  type: 'document',
  fields: [
    // ── Almenn stillingar (framvægur texti o.fl.) ──────────
    defineField({ name: 'siteName',    title: 'Heiti vefs',    type: 'string', initialValue: 'EcoGarden' }),
    defineField({ name: 'siteTagline_is', title: 'Slagorð (IS)', type: 'string' }),
    defineField({ name: 'siteTagline_en', title: 'Slagorð (EN)', type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'Stillingar' }),
  },
})
