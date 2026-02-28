import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Vara',
  type: 'document',
  icon: () => '🛒',
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
    // NEW: Nested Category System
    defineField({
      name: 'categories',
      title: 'Flokkar',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'categoryNested' }] }],
      description: 'Veldu alla viðeigandi flokka (t.d. Landbúnaður → Innréttingar → Átgrindur)',
    }),
    // ALTERNATIVE: ProductType system (Level 1-2-3)
    defineField({
      name: 'productType',
      title: 'Vörutegund (gamalt kerfi)',
      type: 'reference',
      to: [{ type: 'productType' }],
      description: 'GAMALT: Veldu vörutegund',
      hidden: true,
    }),
    // DEPRECATED: Keep for backwards compatibility during migration
    defineField({
      name: 'category',
      title: 'Flokkur (GAMALT - notist ekki)',
      type: 'string',
      hidden: true,
      options: {
        list: [
          { value: 'gardyrkjubaendur',        title: 'Garðyrkjubændur' },
          { value: 'landbunadur',             title: 'Landbúnaður' },
          { value: 'almennar-gardyrkjuvorur', title: 'Almennar Garðyrkjuvörur' },
        ],
      },
    }),
    defineField({
      name: 'subcategory',
      title: 'Undirflokkur (GAMALT - notist ekki)',
      type: 'string',
      hidden: true,
      options: {
        list: [
          // Garðyrkjubændur
          { value: 'grodur hus',           title: 'Gróðurhús (Garðyrkjubændur)' },
          { value: 'varmast yring',         title: 'Varmastýring (Garðyrkjubændur)' },
          { value: 'raektunarkassar',       title: 'Ræktunarkassar (Garðyrkjubændur)' },
          { value: 'vokvunarkerfi',         title: 'Vökvunarkerfi (Garðyrkjubændur)' },
          { value: 'led-ljosabunadur',      title: 'LED ljósabúnaður (Garðyrkjubændur)' },
          { value: 'hitastigar-og-maelar',  title: 'Hitastigar og mælar (Garðyrkjubændur)' },
          // Landbúnaður
          { value: 'gardyrkjuvelar',  title: 'Garðyrkjuvélar (Landbúnaður)' },
          { value: 'slatturvelar',    title: 'Slátturvélar (Landbúnaður)' },
          { value: 'saningabunadur',  title: 'Sáningabúnaður (Landbúnaður)' },
          { value: 'heyvinnsla',      title: 'Heyvinnsla (Landbúnaður)' },
          { value: 'girdingaefni',    title: 'Girðingaefni (Landbúnaður)' },
          { value: 'hladabunadur',    title: 'Hlaðabúnaður (Landbúnaður)' },
          // Almennar Garðyrkjuvörur
          { value: 'gardverkfaeri',       title: 'Garðverkfæri (Almennar)' },
          { value: 'gardhusgo gn',        title: 'Garðhúsgögn (Almennar)' },
          { value: 'pottaplantur',        title: 'Pottaplöntur (Almennar)' },
          { value: 'jardvegur-aburur',    title: 'Jarðvegur og áburður (Almennar)' },
          { value: 'girdingar-skreyting', title: 'Girðingar og skreyting (Almennar)' },
          { value: 'vatnsslongur',        title: 'Vatnsslöngur (Almennar)' },
        ],
      },
    }),
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
      name: 'videoUrl',
      title: 'YouTube / Vimeo tengill',
      type: 'url',
      description: 'T.d. https://www.youtube.com/watch?v=xxxxx',
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
    select: {
      title: 'title',
      productType: 'productType.title_is',
      solution: 'productType.solution.title_is',
      industry: 'productType.solution.industry.title_is',
      media: 'image',
    },
    prepare({ title, productType, solution, industry, media }) {
      const subtitle = [industry, solution, productType].filter(Boolean).join(' → ')
      return {
        title,
        subtitle: subtitle || 'Engin vörutegund valin',
        media,
      }
    },
  },
})
