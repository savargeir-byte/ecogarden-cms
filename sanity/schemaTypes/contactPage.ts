import { defineType, defineField } from 'sanity'

export const contactPageSchema = defineType({
  name: 'contactPage',
  title: 'Hafa samband síða',
  type: 'document',
  groups: [
    { name: 'hero',    title: 'Hero' },
    { name: 'info',    title: 'Sambandsupplýsingar' },
    { name: 'social',  title: 'Samfélagsmiðlar' },
    { name: 'map',     title: 'Kort' },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────
    defineField({ name: 'heroImage',      title: 'Hero bakgrunnsmynd',   type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroTitle_is',   title: 'Hero titill (IS)',      type: 'string', group: 'hero' }),
    defineField({ name: 'heroTitle_en',   title: 'Hero titill (EN)',      type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubtitle_is', title: 'Hero undirtexti (IS)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubtitle_en', title: 'Hero undirtexti (EN)', type: 'string', group: 'hero' }),

    // ── Sambandsupplýsingar ────────────────────────────────
    defineField({ name: 'address',        title: 'Heimilisfang',  type: 'string', group: 'info' }),
    defineField({ name: 'phone',          title: 'Sími',          type: 'string', group: 'info' }),
    defineField({ name: 'email',          title: 'Netfang',       type: 'string', group: 'info' }),
    defineField({ name: 'openingHours_is', title: 'Opnunartímar (IS)', type: 'string', group: 'info' }),
    defineField({ name: 'openingHours_en', title: 'Opnunartímar (EN)', type: 'string', group: 'info' }),

    // ── Samfélagsmiðlar ──────────────────────────────────
    defineField({ name: 'facebookUrl',  title: 'Facebook URL',  type: 'url', group: 'social' }),
    defineField({ name: 'linkedinUrl',  title: 'LinkedIn URL',  type: 'url', group: 'social' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'social' }),

    // ── Google Maps ──────────────────────────────────────
    defineField({ name: 'mapEmbedSrc', title: 'Google Maps embed src (URL)', type: 'url', group: 'map' }),
  ],
  preview: {
    prepare: () => ({ title: 'Hafa samband síða' }),
  },
})
