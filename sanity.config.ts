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
      structure: async (S, context) => {
        const client = context.getClient({ apiVersion: '2024-01-01' })

        // Fetch yfirflokkar
        const parents: { _id: string; title_is: string }[] = await client.fetch(
          `*[_type == "categoryNested" && !defined(parent)] | order(title_is asc) { _id, title_is }`
        )

        // Build vörur tree: yfirflokkur → undirflokkur → vörur
        const parentItems = await Promise.all(
          parents.map(async (parent) => {
            const subs: { _id: string; title_is: string }[] = await client.fetch(
              `*[_type == "categoryNested" && parent._ref == $id] | order(title_is asc) { _id, title_is }`,
              { id: parent._id }
            )

            const subItems = subs.map((sub) =>
              S.listItem()
                .title(sub.title_is || 'Ónafngreint')
                .id('sub-' + sub._id)
                .child(
                  S.documentList()
                    .title('Vörur í ' + sub.title_is)
                    .filter('_type == "product" && subCategory._ref == $subId')
                    .params({ subId: sub._id })
                    .child((productId) =>
                      S.document().schemaType('product').documentId(productId)
                    )
                )
            )

            return S.listItem()
              .title(parent.title_is || 'Ónafngreint')
              .id('parent-' + parent._id)
              .child(
                S.list()
                  .title(parent.title_is)
                  .items(subItems.length > 0 ? subItems : [
                    S.listItem()
                      .title('Engir undirflokkar')
                      .id('empty-' + parent._id)
                      .child(S.documentList()
                        .title('Vörur')
                        .filter('_type == "product" && parentCategory._ref == $pId')
                        .params({ pId: parent._id })
                      )
                  ])
              )
          })
        )

        return S.list()
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
            // ── Vörur flokkað ──────────────────────────────
            S.listItem()
              .title('🌿 Vörur')
              .id('productsTree')
              .child(
                S.list()
                  .title('Veldu yfirflokk')
                  .items(parentItems)
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
            // ── Fréttir ────────────────────────────────────
            S.documentTypeListItem('news').title('📰 Fréttir'),
          ])
      },
    }),
    visionTool(),
  ],
})
