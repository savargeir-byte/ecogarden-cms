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
            S.listItem()
              .title('🌿 Vörur')
              .id('productsTree')
              .child(
                S.documentList()
                  .title('Veldu yfirflokk')
                  .filter('_type == "categoryNested" && !defined(parent)')
                  .child((parentId) =>
                    S.documentList()
                      .title('Veldu undirflokk')
                      .filter('_type == "categoryNested" && parent._ref == $parentId')
                      .params({ parentId })
                      .child((subCategoryId) =>
                        S.documentList()
                          .title('Vörur')
                          .filter('_type == "product" && subCategory._ref == $subCategoryId')
                          .params({ subCategoryId })
                          .child((productId) =>
                            S.document()
                              .schemaType('product')
                              .documentId(productId)
                          )
                      )
                  )
              ),
            S.listItem()
              .title('📂 Vöruflokkar')
              .id('categoryNestedTree')
              .child(
                S.documentList()
                  .title('Yfirflokkar')
                  .filter('_type == "categoryNested" && !defined(parent)')
                  .child((parentId) =>
                    S.list()
                      .title('Yfirflokkur')
                      .items([
                        S.listItem()
                          .title('✏️ Breyta yfirflokki')
                          .id(parentId + '-edit')
                          .child(S.document().schemaType('categoryNested').documentId(parentId)),
                        S.divider(),
                        S.listItem()
                          .title('📁 Undirflokkar')
                          .id(parentId + '-children')
                          .child(
                            S.documentList()
                              .title('Undirflokkar')
                              .filter('_type == "categoryNested" && parent._ref == $parentId')
                              .params({ parentId })
                              .child((childId) =>
                                S.document().schemaType('categoryNested').documentId(childId)
                              )
                          ),
                      ])
                  )
              ),
            S.divider(),
            // ── Fréttir ────────────────────────────────────
            S.documentTypeListItem('news').title('📰 Fréttir'),
          ]),
    }),
    visionTool(),
  ],
})
