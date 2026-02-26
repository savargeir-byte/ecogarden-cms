import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Vara',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Heiti vöru',        type: 'string',  validation: R => R.required() }),
    defineField({ name: 'slug',        title: 'Slóð (slug)',        type: 'slug',    options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'description', title: 'Lýsing',            type: 'text',    rows: 3 }),
    defineField({ name: 'price',       title: 'Verð (kr.)',         type: 'number'  }),
    defineField({ name: 'image',       title: 'Aðalmynd',           type: 'image',   options: { hotspot: true } }),
    defineField({
      name: 'images',
      title: 'Fleiri myndir',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'Flokkur',
      type: 'string',
      options: {
        list: [
          { value: 'gardyrkjubaendur',        title: 'Garðyrkjubændur' },
          { value: 'landbunadur',             title: 'Landbúnaður' },
          { value: 'almennar-gardyrkjuvorur', title: 'Almennar Garðyrkjuvörur' },
        ],
      },
    }),
    defineField({ name: 'subcategory', title: 'Undirflokkur', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Staða',
      type: 'string',
      initialValue: 'published',
      options: {
        list: [
          { value: 'published', title: 'Birt' },
          { value: 'draft',     title: 'Drög' },
        ],
      },
    }),
    defineField({ name: 'featured', title: 'Útvalið á forsíðu?', type: 'boolean', initialValue: false }),
    defineField({
      name: 'features',
      title: 'Eiginleikar (punktar)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Tæknileg gögn',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'key',   type: 'string', title: 'Lykill' },
          { name: 'value', type: 'string', title: 'Gildi' },
        ],
      }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title',       type: 'string', title: 'SEO titill' },
        { name: 'description', type: 'text',   title: 'SEO lýsing', rows: 2 },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
})
