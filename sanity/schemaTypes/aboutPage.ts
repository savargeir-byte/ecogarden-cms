import { defineType, defineField } from 'sanity'

const cardFields = [
  defineField({ name: 'emoji',    title: 'Emoji',       type: 'string' }),
  defineField({ name: 'title_is', title: 'Titill (IS)', type: 'string' }),
  defineField({ name: 'title_en', title: 'Titill (EN)', type: 'string' }),
  defineField({ name: 'text_is',  title: 'Texti (IS)',  type: 'text', rows: 2 }),
  defineField({ name: 'text_en',  title: 'Texti (EN)',  type: 'text', rows: 2 }),
]

const teamMemberFields = [
  defineField({ name: 'name',           title: 'Nafn',               type: 'string' }),
  defineField({ name: 'jobTitle_is',    title: 'Titill (IS)',         type: 'string' }),
  defineField({ name: 'jobTitle_en',    title: 'Titill (EN)',         type: 'string' }),
  defineField({ name: 'quote_is',       title: 'Tilvitnun (IS)',      type: 'text', rows: 2 }),
  defineField({ name: 'quote_en',       title: 'Tilvitnun (EN)',      type: 'text', rows: 2 }),
  defineField({ name: 'description_is', title: 'Lýsing (IS)',         type: 'text', rows: 2 }),
  defineField({ name: 'description_en', title: 'Lýsing (EN)',         type: 'text', rows: 2 }),
  defineField({ name: 'image',          title: 'Mynd',                type: 'image', options: { hotspot: true } }),
]

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'Um okkur síða',
  type: 'document',
  groups: [
    { name: 'hero',      title: 'Hero' },
    { name: 'trust',     title: 'Traust-ræma' },
    { name: 'why',       title: 'Af hverju' },
    { name: 'solutions', title: 'Lausnir' },
    { name: 'team',      title: 'Teymið' },
    { name: 'cta',       title: 'CTA neðst' },
  ],
  fields: [
    // ── Hero ─────────────────────────────────────────────────
    defineField({ name: 'heroTitle_is',    title: 'Hero titill (IS)',     type: 'string', group: 'hero' }),
    defineField({ name: 'heroTitle_en',    title: 'Hero titill (EN)',     type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubtitle_is', title: 'Hero undirtexti (IS)', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroSubtitle_en', title: 'Hero undirtexti (EN)', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroImage',       title: 'Hero bakgrunnsmynd',   type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({ name: 'heroBtn1_is',     title: 'Hnappur 1 (IS)',       type: 'string', group: 'hero' }),
    defineField({ name: 'heroBtn1_en',     title: 'Hnappur 1 (EN)',       type: 'string', group: 'hero' }),
    defineField({ name: 'heroBtn2_is',     title: 'Hnappur 2 (IS)',       type: 'string', group: 'hero' }),
    defineField({ name: 'heroBtn2_en',     title: 'Hnappur 2 (EN)',       type: 'string', group: 'hero' }),

    // ── Traust-ræma ─────────────────────────────────────────
    defineField({
      name: 'trustBadges',
      title: 'Traust-ræma (4 merki)',
      type: 'array',
      group: 'trust',
      of: [{
        type: 'object',
        fields: [
          { name: 'text_is', type: 'string', title: 'Texti (IS)' },
          { name: 'text_en', type: 'string', title: 'Texti (EN)' },
        ],
        preview: { select: { title: 'text_is' } },
      }],
    }),

    // ── Af hverju ───────────────────────────────────────────
    defineField({ name: 'whyHeading_is', title: '"Af hverju" fyrirsögn (IS)', type: 'string', group: 'why' }),
    defineField({ name: 'whyHeading_en', title: '"Af hverju" fyrirsögn (EN)', type: 'string', group: 'why' }),
    defineField({
      name: 'whyCards',
      title: 'Af hverju kort (3 stk)',
      type: 'array',
      group: 'why',
      of: [{ type: 'object', fields: cardFields, preview: { select: { title: 'title_is' } } }],
    }),

    // ── Lausnir ─────────────────────────────────────────────
    defineField({ name: 'solutionsHeading_is', title: '"Okkar lausnir" fyrirsögn (IS)', type: 'string', group: 'solutions' }),
    defineField({ name: 'solutionsHeading_en', title: '"Okkar lausnir" fyrirsögn (EN)', type: 'string', group: 'solutions' }),
    defineField({
      name: 'solutionCards',
      title: 'Lausna kort (3 stk)',
      type: 'array',
      group: 'solutions',
      of: [{ type: 'object', fields: cardFields, preview: { select: { title: 'title_is' } } }],
    }),

    // ── Teymið ──────────────────────────────────────────────
    defineField({ name: 'teamHeading_is',  title: 'Teymi fyrirsögn (IS)',  type: 'string', group: 'team' }),
    defineField({ name: 'teamHeading_en',  title: 'Teymi fyrirsögn (EN)',  type: 'string', group: 'team' }),
    defineField({ name: 'teamSubtitle_is', title: 'Teymi undirtexti (IS)', type: 'text', rows: 2, group: 'team' }),
    defineField({ name: 'teamSubtitle_en', title: 'Teymi undirtexti (EN)', type: 'text', rows: 2, group: 'team' }),
    defineField({
      name: 'teamMembers',
      title: 'Teymið (2+ meðlimir)',
      type: 'array',
      group: 'team',
      of: [{ type: 'object', fields: teamMemberFields, preview: { select: { title: 'name', media: 'image' } } }],
    }),

    // ── CTA neðst ───────────────────────────────────────────
    defineField({ name: 'ctaHeading_is', title: 'CTA fyrirsögn (IS)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaHeading_en', title: 'CTA fyrirsögn (EN)', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaText_is',    title: 'CTA texti (IS)',     type: 'text', rows: 2, group: 'cta' }),
    defineField({ name: 'ctaText_en',    title: 'CTA texti (EN)',     type: 'text', rows: 2, group: 'cta' }),
  ],
  preview: {
    prepare: () => ({ title: 'Um okkur síða' }),
  },
})
