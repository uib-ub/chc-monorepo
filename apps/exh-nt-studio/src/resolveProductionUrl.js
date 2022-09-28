import { replace } from "lodash"
import { publicDocumentTypes } from "./publicDocumentTypes"
import sanityClient from 'part:@sanity/base/client'

const client = sanityClient.withConfig({ apiVersion: '2021-03-25' })

// Replace `remoteUrl` with your deployed Next.js site
// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = '53e5d496-e783-45e0-96a7-d56613284ca0'
// const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET
const remoteUrl = `https://decriminalizing-history.vercel.app`
//const remoteUrl = process.env.SANITY_STUDIO_PREVIEW_DOMAIN
const basePath = process.env.SANITY_STUDIO_PREVIEW_URL_BASE_PATH
const localUrl = `http://localhost:3000`


export default async function resolveProductionUrl(doc) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl

  const previewUrl = new URL(baseUrl)
  const previewTypes = ['Route', ...publicDocumentTypes]

  // Only preview a predefines list of types
  if (!previewTypes.includes(doc._type)) {
    return null
  }

  // If a document is referenced by a route use that, else we have a WIP text that will use the /id/[id].js page
  const getSlug = async (document) => {
    if (document._type === 'Route') {
      return document.slug?.current || document.route || document.link
    }

    if (!['LinguisticDocument', 'Page'].includes(document._type)) {
      return `id/${replace(document._id, "drafts.", "")}`
    }

    const query = '*[_type == "Route" && references($id)].slug.current'
    const params = { id: replace(document._id, "drafts.", "") }
    const route = await client.fetch(query, params).then(res => res)
    return route.length > 0
      ? route
      : `id/${replace(document._id, "drafts.", "")}`
  }

  const slug = await getSlug(doc)

  previewUrl.pathname = `/api/preview`
  previewUrl.searchParams.append(`secret`, previewSecret)
  previewUrl.searchParams.append(`slug`, slug ?? `/`)

  return previewUrl.toString()
}
