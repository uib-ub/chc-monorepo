import { defineType } from 'sanity';

const i18nConfig = {
  base: "en",
  languages: [
    {
      "id": "en",
      "title": "English"
    },
    {
      "id": "no",
      "title": "Bokmål"
    }
  ]
}

export default defineType({
  name: 'LocalizedKeyword',
  type: 'object',
  title: 'Localized keyword',
  options: {
    semanticSanity: {
      exclude: true
    }
  },
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: i18nConfig.languages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'array',
    of: [{ type: 'string' }],
    options: {
      layout: 'tags',
      semanticSanity: {
        '@container': '@set',
      }
    },
    fieldset: lang.id === i18nConfig.base ? null : 'translations',
  })),
})
