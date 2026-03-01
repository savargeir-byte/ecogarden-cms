'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

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
            // ── Vörur flokkað: Yfirflokkur → Undirflokkur → Vörur ──
            S.listItem()
              .title('🌿 Vörur')
              .id('product')
              .child(() =>
                sanityClient
                  .fetch(`*[_type == "categoryNested" && !defined(parent)] | order(title_is asc) { _id, title_is }`)
                  .then((parents: any[]) =>
                    S.list()
                      .title('Veldu yfirflokk')
                      .id('parentCatList')
                      .items(
                        parents.map((p: any) =>
                          S.listItem()
                            .title(p.title_is || 'Ónafngreint')
                            .id('p-' + p._id.replace(/\./g, '-'))
                            .child(() =>
                              sanityClient
                                .fetch(
                                  `*[_type == "categoryNested" && parent._ref == $pid] | order(title_is asc) { _id, title_is }`,
                                  { pid: p._id }
                                )
                                .then((subs: any[]) => {
                                  if (subs.length === 0) {
                                    return S.documentList()
                                      .id('products-in-' + p._id.replace(/\./g, '-'))
                                      .title('Vörur í ' + p.title_is)
                                      .filter('_type == "product" && parentCategory._ref == $pid')
                                      .params({ pid: p._id })
                                  }
                                  return S.list()
                                    .title(p.title_is)
                                    .id('subs-' + p._id.replace(/\./g, '-'))
                                    .items(
                                      subs.map((sub: any) =>
                                        S.listItem()
                                          .title(sub.title_is || 'Ónafngreint')
                                          .id('sub-' + sub._id.replace(/\./g, '-'))
                                          .child(
                                            S.documentList()
                                              .id('products-in-' + sub._id.replace(/\./g, '-'))
                                              .title('Vörur í ' + sub.title_is)
                                              .filter('_type == "product" && subCategory._ref == $subId')
                                              .params({ subId: sub._id })
                                          )
                                      )
                                    )
                                })
                            )
                        )
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
