/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, Slug } from 'sanity'
import { withDocumentI18nPlugin } from '@sanity/document-internationalization'
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array"
import { codeInput } from "@sanity/code-input";
import { colorInput } from "@sanity/color-input";
import { table } from '@sanity/table';
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './src/lib/munaPlugin/src'
import SiteSettings from './src/lib/munaPlugin/src/schemas/classes/persistent/information/site/SiteSettings';

// @TODO: update next-sanity/studio to automatically set this when needed
const basePath = '/studio'

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

export default defineConfig({
  basePath,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  title:
    'Never-ending and temporary',
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      ...schemaTypes
    ],
  },
  plugins: withDocumentI18nPlugin([
    imageHotspotArrayPlugin(),
    codeInput(),
    colorInput(),
    table(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({
      defaultApiVersion: '2022-08-08',
    }),
  ], i18nConfig),
  document: {
    /* productionUrl: async (prev, { document }) => {
      const url = new URL('/api/preview', location.origin)
      const secret = process.env.NEXT_PUBLIC_PREVIEW_SECRET
      if (secret) {
        url.searchParams.set('secret', secret)
      }

      try {
        switch (document._type) {
          case settingsType.name:
            break
          case postType.name:
            url.searchParams.set('slug', (document.slug as Slug).current!)
            break
          default:
            return prev
        }
        return url.toString()
      } catch {
        return prev
      }
    }, */
    // Hide 'Settings' from new document options
    // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== SiteSettings.name
        )
      }

      return prev
    },
    // Removes the "duplicate" action on the "settings" singleton
    /* actions: (prev, { schemaType }) => {
      if (schemaType === SiteSettings.name) {
        return prev.filter(({ action }) => action !== 'duplicate')
      }

      return prev
    }, */
  },
})