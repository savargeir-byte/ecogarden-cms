import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Stillingar',
  type: 'document',
  fields: [
    // ── About síða ─────────────────────────────────────────
    defineField({ name: 'aboutHeroTitle_is',    title: 'Um okkur – Hero titill (IS)',     type: 'string' }),
    defineField({ name: 'aboutHeroTitle_en',    title: 'Um okkur – Hero titill (EN)',     type: 'string' }),
    defineField({ name: 'aboutHeroSubtitle_is', title: 'Um okkur – Hero undirtexti (IS)', type: 'text', rows: 2 }),
    defineField({ name: 'aboutHeroSubtitle_en', title: 'Um okkur – Hero undirtexti (EN)', type: 'text', rows: 2 }),
    // ── Samband síða ───────────────────────────────────────
    defineField({ name: 'contactHeroTitle_is',    title: 'Samband – Hero titill (IS)',     type: 'string' }),
    defineField({ name: 'contactHeroTitle_en',    title: 'Samband – Hero titill (EN)',     type: 'string' }),
    defineField({ name: 'contactHeroSubtitle_is', title: 'Samband – Hero undirtexti (IS)', type: 'text', rows: 2 }),
    defineField({ name: 'contactHeroSubtitle_en', title: 'Samband – Hero undirtexti (EN)', type: 'text', rows: 2 }),
    // ── Tengingar ──────────────────────────────────────────
    defineField({ name: 'phone',   title: 'Símanúmer',  type: 'string' }),
    defineField({ name: 'email',   title: 'Netfang',    type: 'string' }),
    defineField({ name: 'address', title: 'Heimilisfang', type: 'string' }),
    defineField({ name: 'openingHours_is', title: 'Opnunartímar (IS)', type: 'string' }),
    defineField({ name: 'openingHours_en', title: 'Opnunartímar (EN)', type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'Stillingar' }),
  },
})
