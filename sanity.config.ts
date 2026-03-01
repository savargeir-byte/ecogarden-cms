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
  document: {
    actions: (prev) => prev,
  },
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Efni')
          .items([
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
            // ── Vörur: Yfirflokkur → Undirflokkur → Vörur ──
            S.listItem()
              .title('🌿 Vörur')
              .id('product')
              .child(
                S.documentList()
                  .id('yfirflokkar')
                  .title('Veldu yfirflokk')
                  .filter('_type == "categoryNested" && !defined(parent)')
                  .child((parentId) =>
                    S.documentList()
                      .id(`undirflokkar-${parentId}`)
                      .title('Veldu undirflokk')
                      .filter('_type == "categoryNested" && parent._ref == $parentId')
                      .params({ parentId })
                      .child((subCatId) =>
                        S.documentList()
                          .id(`vorur-${subCatId}`)
                          .title('Vörur')
                          .filter('_type == "product" && subCategory._ref == $subCatId')
                          .params({ subCatId })
                      )
                  )
              ),
            // ── Vöruflokkar ──
            S.listItem()
              .title('📂 Vöruflokkar')
              .id('categoryNestedTree')
              .child(
                S.documentList()
                  .id('allCategories')
                  .title('Vöruflokkar')
                  .filter('_type == "categoryNested"')
              ),
            S.divider(),
            S.documentTypeListItem('news').title('📰 Fréttir'),
          ]),
    }),
    visionTool(),
  ],
})
