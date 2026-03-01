import { defineType, defineField } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Vara',
  type: 'document',
  icon: () => '🛒',
  groups: [
    { name: 'grunnur',    title: '📋 Grunnupplýsingar', default: true },
    { name: 'myndir',     title: '🖼️ Myndir' },
    { name: 'flokkur',    title: '📂 Flokkur & Staða' },
    { name: 'eiginleikar', title: '✅ Eiginleikar & Gögn' },
    { name: 'skjol',      title: '📄 PDF & Vídeó' },
    { name: 'seo',        title: '🔍 SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Heiti vöru',
      type: 'string',
      group: 'grunnur',
      description: 'Fullt nafn vörunnar eins og það birtist á síðunni. T.d. "Agrocrop Evolution Rúlluplast 750m"',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slóð (slug)',
      type: 'slug',
      group: 'grunnur',
      description: 'Einkvæm vefslóð fyrir vöruna. Smelltu á "Generate" til að búa til sjálfkrafa úr heitinu.',
      options: { source: 'title' },
      validation: R => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Lýsing',
      type: 'text',
      rows: 5,
      group: 'grunnur',
      description: 'Aðallýsing vörunnar. Útskýrðu hvað varan er, hvernig hún virkar og hvers vegna hún er góð. Hér má skrifa nokkrar málsgreinar.',
    }),
    defineField({
      name: 'price',
      title: 'Verð (kr.)',
      type: 'number',
      group: 'grunnur',
      description: 'Verð í íslenskum krónum. Skildu eftir autt ef verð er "Verð eftir fyrirspurn".',
    }),
    defineField({
      name: 'image',
      title: 'Aðalmynd',
      type: 'image',
      group: 'myndir',
      description: 'Aðalmynd vörunnar sem birtist á vörukortum og efst á vörusíðunni. Nota ætti hlutfall 4:3 eða 16:9.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Fleiri myndir (myndasafn)',
      type: 'array',
      group: 'myndir',
      description: 'Viðbótarmyndir sem birtast í myndasafni á vörusíðunni. Smelltu á "+ Add Item" til að bæta við mynd.',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    // NEW: Nested Category System
    defineField({
      name: 'parentCategory',
      title: 'Aðalflokkur',
      type: 'reference',
      to: [{ type: 'categoryNested' }],
      group: 'flokkur',
      description: 'Veldu fyrst aðalflokk — t.d. "Landbúnaður" eða "Garðyrkjubændur".',
      options: {
        filter: '!defined(parent)',
        disableNew: true,
      },
    }),
    defineField({
      name: 'subCategory',
      title: 'Undirflokkur',
      type: 'reference',
      to: [{ type: 'categoryNested' }],
      group: 'flokkur',
      description: 'Veldu undirflokk sem passar við aðalflokk. Sýnir eingöngu undirflokka þess aðalflokks.',
      options: {
        filter: ({ document }: { document: { parentCategory?: { _ref?: string } } }) => {
          const parentRef = document?.parentCategory?._ref
          if (!parentRef) return { filter: 'defined(parent)', params: {} }
          return {
            filter: 'parent._ref == $parentRef',
            params: { parentRef },
          }
        },
        disableNew: true,
      },
    }),
    // Keep old categories array hidden for backwards compat
    defineField({
      name: 'categories',
      title: 'Flokkar (gamalt)',
      type: 'array',
      group: 'flokkur',
      hidden: true,
      of: [{ type: 'reference', to: [{ type: 'categoryNested' }] }],
    }),
    // ALTERNATIVE: ProductType system (Level 1-2-3)
    defineField({
      name: 'productType',
      title: 'Vörutegund (gamalt kerfi)',
      type: 'reference',
      to: [{ type: 'productType' }],
      group: 'flokkur',
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
      group: 'flokkur',
      description: '"Birt" þýðir að varan sést á síðunni. "Drög" felur vöruna þar til hún er tilbúin.',
      initialValue: 'published',
      options: {
        list: [
          { value: 'published', title: '🟢 Birt — sýnileg á síðunni' },
          { value: 'draft',     title: '🟡 Drög — falin fyrir gestum' },
        ],
      },
    }),
    defineField({ name: 'featured', title: 'Útvalið á forsíðu?', type: 'boolean', group: 'flokkur', description: 'Ef kveikt, birtist þessi vara í "Útvaldar vörur" hlutanum á forsíðunni.', initialValue: false }),
    defineField({
      name: 'features',
      title: 'Eiginleikar (punktalisti)',
      type: 'array',
      group: 'eiginleikar',
      description: 'Listi af helstu eiginleikum vörunnar. Hvert atriði birtist sem ✓ punktur á vörusíðunni. T.d. "5 laga plastlag", "750m á rúllu", "UV-vernd".',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'specifications',
      title: 'Tæknileg gögn (tafla)',
      type: 'array',
      group: 'eiginleikar',
      description: 'Tæknilegar upplýsingar sem birtast í töflu á vörusíðunni. Smelltu á "+ Add Item" og fylltu inn "Lykill" (t.d. "Þyngd") og "Gildi" (t.d. "24,8 kg").',
      of: [{
        type: 'object',
        fields: [
          { name: 'key',   type: 'string', title: 'Lykill (t.d. "Þyngd", "Lengd", "Litur")' },
          { name: 'value', type: 'string', title: 'Gildi (t.d. "24,8 kg", "750 m", "Ljósgrænn")' },
        ],
      }],
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube / Vimeo tengill',
      type: 'url',
      group: 'skjol',
      description: 'Tengill á kynningarvídeó af vörunni. T.d. https://www.youtube.com/watch?v=xxxxx — vídeóið birtist sjálfkrafa á vörusíðunni.',
    }),
    defineField({
      name: 'pdfBrochure',
      title: 'PDF skjal (gagnablað / bæklingur)',
      type: 'file',
      group: 'skjol',
      description: 'Hladdu upp PDF gagnablaði, leiðbeiningum eða kynningarbæklingi. Birtist sem niðurhalshnappum á vörusíðunni.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'pdfLabel',
      title: 'Texti á PDF hnappi',
      type: 'string',
      group: 'skjol',
      description: 'Þessi texti birtist á niðurhalshnappinum. T.d. "Sækja gagnablað", "Sækja leiðbeiningar" eða "Sækja tæknilegar upplýsingar".',
      initialValue: 'Sækja gagnablað',
    }),
    defineField({
      name: 'seo',
      title: 'SEO stillingar',
      type: 'object',
      group: 'seo',
      description: 'Þessar upplýsingar birtast í leitarniðurstöðum Google. Skildu eftir autt til að nota sjálfgefið heiti og lýsingu vörunnar.',
      fields: [
        { name: 'title',       type: 'string', title: 'SEO titill (birtist í Google — helst 50-60 stafir)' },
        { name: 'description', type: 'text',   title: 'SEO lýsing (birtist undir titli í Google — helst 150-160 stafir)', rows: 3 },
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
