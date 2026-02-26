import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Stillingar',
  type: 'document',
  fields: [
    // ── Samskiptaupplýsingar ────────────────────────────────
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
