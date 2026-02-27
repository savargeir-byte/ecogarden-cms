import { defineType, defineField } from 'sanity'

export const industrySchema = defineType({
  name: 'industry',
  title: 'Rekstur (Level 1)',
  type: 'document',
  icon: () => '🏭',
  fields: [
    defineField({
      name: 'title_is',
      title: 'Nafn (íslenska)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Nafn (enska)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slóð (slug)',
      type: 'slug',
      options: { source: 'title_is', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Emoji tákn',
      type: 'string',
      description: 'T.d. 🐄, 🐑, 🐎, 🌾',
    }),
    defineField({
      name: 'description_is',
      title: 'Lýsing (íslenska)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_en',
      title: 'Lýsing (enska)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Aðalmynd',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Röð',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Birta á forsíðu?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      name: 'orderAsc',
      title: 'Röð',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title_is',
      subtitle: 'icon',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${subtitle || ''} ${title}`,
        media,
      }
    },
  },
})
