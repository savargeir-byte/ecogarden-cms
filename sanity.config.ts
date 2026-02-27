'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: 'atu6hs4h',
  dataset: 'production',
  title: 'Eco Garden CMS',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Efni')
          .items([
            // ── Síður ──────────────────────────────────────
            S.listItem()
              .title('🏠 Forsíða')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('👥 Um okkur')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('📞 Hafa samband')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.listItem()
              .title('⚙️ Stillingar')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('🛋️ Vörur síða')
              .id('productsPage')
              .child(S.document().schemaType('productsPage').documentId('productsPage')),
            S.divider(),
            // ── Vörur & Flokkar ────────────────────────────
            S.documentTypeListItem('product').title('🌿 Vörur'),
            S.documentTypeListItem('categoryNested').title('📂 Vöruflokkar'),
            S.divider(),
            // ── Fréttir ────────────────────────────────────
            S.documentTypeListItem('news').title('📰 Fréttir'),
          ]),
    }),
    visionTool(),
  ],
})
