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
      structure: (S, context) => {
        const client = context.getClient({ apiVersion: '2024-01-01' })

        return S.list()
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
            // Vörur: Yfirflokkur → Undirflokkur → Vörur
            S.listItem()
              .title('🌿 Vörur')
              .id('product')
              .child(() =>
                client
                  .fetch<{_id: string; title_is: string}[]>(
                    `*[_type == "categoryNested" && !defined(parent)] | order(title_is asc) { _id, title_is }`
                  )
                  .then((parents) =>
                    S.list()
                      .title('Veldu yfirflokk')
                      .id('parentList')
                      .items(
                        parents.map((p) =>
                          S.listItem()
                            .title(p.title_is || 'Ónafngreint')
                            .id('p-' + p._id)
                            .child(() =>
                              client
                                .fetch<{_id: string; title_is: string}[]>(
                                  `*[_type == "categoryNested" && parent._ref == $id] | order(title_is asc) { _id, title_is }`,
                                  { id: p._id }
                                )
                                .then((subs) =>
                                  S.list()
                                    .title(p.title_is)
                                    .id('subs-' + p._id)
                                    .items(
                                      subs.map((sub) =>
                                        S.listItem()
                                          .title(sub.title_is || 'Ónafngreint')
                                          .id('sub-' + sub._id)
                                          .child(
                                            S.documentList()
                                              .title('Vörur í ' + sub.title_is)
                                              .filter('_type == "product" && subCategory._ref == $subId')
                                              .params({ subId: sub._id })
                                          )
                                      )
                                    )
                                )
                            )
                        )
                      )
                  )
              ),
            S.listItem()
              .title('📂 Vöruflokkar')
              .id('categoryNestedTree')
              .child(
                S.documentList()
                  .title('Vöruflokkar')
                  .filter('_type == "categoryNested"')
                  .child((catId) =>
                    S.document().schemaType('categoryNested').documentId(catId)
                  )
              ),
            S.divider(),
            S.documentTypeListItem('news').title('📰 Fréttir'),
          ])
      },
    }),
    visionTool(),
  ],
})
