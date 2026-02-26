import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Flokkar',
  type: 'document',
  fields: [
    defineField({ name: 'title_is', title: 'Nafn (IS)', type: 'string', validation: R => R.required() }),
    defineField({ name: 'title_en', title: 'Nafn (EN)', type: 'string' }),
    defineField({ name: 'slug',     title: 'Slóð (slug)', type: 'slug', options: { source: 'title_is' }, validation: R => R.required() }),
    defineField({ name: 'image',    title: 'Mynd',        type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order',    title: 'Röð',         type: 'number', initialValue: 0 }),
    defineField({
      name: 'subcategories',
      title: 'Undirflokkar',
      type: 'array',
      of: [{
        type: 'object',
        name: 'subcategory',
        title: 'Undirflokkur',
        fields: [
          { name: 'title_is',      type: 'string', title: 'Nafn (IS)' },
          { name: 'title_en',      type: 'string', title: 'Nafn (EN)' },
          { name: 'slug',          type: 'string', title: 'Slóð (t.d. grodur-hus)' },
          { name: 'description_is', type: 'text',  title: 'Lýsing (IS)', rows: 3 },
          { name: 'description_en', type: 'text',  title: 'Lýsing (EN)', rows: 3 },
          { name: 'image',          type: 'image', title: 'Aðalmynd', options: { hotspot: true } },
          {
            name: 'images',
            type: 'array',
            title: 'Margar myndir',
            of: [{ type: 'image', options: { hotspot: true } }],
          },
        ],
        preview: {
          select: { title: 'title_is', media: 'image' },
        },
      }],
    }),
  ],
  orderings: [{ name: 'orderAsc', title: 'Röð', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title_is', media: 'image' },
  },
})
