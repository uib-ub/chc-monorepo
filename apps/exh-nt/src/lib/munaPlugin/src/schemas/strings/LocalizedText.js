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
  name: 'LocalizedText',
  type: 'object',
  title: 'Localized text',
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
    type: 'text',
    fieldset: lang.id === i18nConfig.base ? null : 'translations',
  })),
})
