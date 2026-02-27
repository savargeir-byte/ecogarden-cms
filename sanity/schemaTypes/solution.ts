import { defineType, defineField } from 'sanity'

export const solutionSchema = defineType({
  name: 'solution',
  title: 'Lausn (Level 2)',
  type: 'document',
  icon: () => '🔧',
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
      name: 'industry',
      title: 'Tilheyrir rekstri',
      type: 'reference',
      to: [{ type: 'industry' }],
      validation: (Rule) => Rule.required(),
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
      industry: 'industry.title_is',
      media: 'image',
    },
    prepare({ title, industry, media }) {
      return {
        title,
        subtitle: industry ? `${industry}` : 'Enginn rekstur valinn',
        media,
      }
    },
  },
})
