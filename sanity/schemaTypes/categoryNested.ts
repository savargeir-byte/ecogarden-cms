import { defineType, defineField } from 'sanity'

/**
 * Nested Category System
 * 
 * Stuðlar ótakmarkaða nesting:
 * Landbúnaður
 *   → Innréttingar
 *     → Innréttingar Fjós
 *       → Legubásainnréttingar
 *         → Plast
 *         → Stál
 */

export const categoryNestedSchema = defineType({
  name: 'categoryNested',
  title: 'Vöruflokkar (Nested)',
  type: 'document',
  icon: () => '📂',
  fields: [
    defineField({
      name: 'title_is',
      title: 'Nafn (íslenska)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
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
      options: {
        source: 'title_is',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Yfirflokkur',
      type: 'reference',
      to: [{ type: 'categoryNested' }],
      description: 'Ef þetta er undirflokkur, veldu yfirflokkinn. Skildu eftir autt fyrir aðalflokk.',
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
      title: 'Mynd',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Emoji tákn',
      type: 'string',
      description: 'T.d. 🌾, 🚜, 🏗️',
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
    defineField({
      name: 'showInMenu',
      title: 'Sýna í valmynd?',
      type: 'boolean',
      initialValue: true,
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
      parent: 'parent.title_is',
      icon: 'icon',
      media: 'image',
    },
    prepare({ title, parent, icon, media }: any) {
      // Sýna hierarchy í preview
      const subtitle = parent ? `↳ ${parent}` : '📁 Aðalflokkur'
      const displayTitle = icon ? `${icon} ${title}` : title
      
      return {
        title: displayTitle,
        subtitle,
        media,
      }
    },
  },
})
