import { defineType, defineField } from 'sanity'

export const productsPageSchema = defineType({
  name: 'productsPage',
  title: 'Vörur síða',
  type: 'document',
  fields: [
    defineField({ name: 'heroImage',       title: 'Hero bakgrunnsmynd',   type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroTitle_is',    title: 'Hero titill (IS)',      type: 'string' }),
    defineField({ name: 'heroTitle_en',    title: 'Hero titill (EN)',      type: 'string' }),
    defineField({ name: 'heroSubtitle_is', title: 'Hero undirtexti (IS)',  type: 'string' }),
    defineField({ name: 'heroSubtitle_en', title: 'Hero undirtexti (EN)',  type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'Vörur síða' }),
  },
})
